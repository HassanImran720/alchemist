import { NextRequest, NextResponse } from "next/server";
import { withAuth, AuthenticatedUser } from "../../../lib/auth";
import UserModel from "../../../db/models/User";
import PromptLibraryModel from "../../../db/models/PromptLibrary";
import dbConnect from "../../../db/dbConnect";

// GET - Fetch all projects for the authenticated user
async function getProjectsHandler(req: NextRequest, user: AuthenticatedUser) {
  try {
    await dbConnect();
    
    console.log("📂 Fetching projects for user:", user.email);
    
    const userData = await UserModel.findById(user.id).select('projects');
    
    if (!userData) {
      console.error("❌ User not found:", user.id);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("🔍 Current user projects:", userData.projects);
    console.log("🔍 Type check:", typeof userData.projects, Array.isArray(userData.projects));
    
    // Check if projects field actually exists in database (not just default value)
    const hasProjectsField = userData.toObject().hasOwnProperty('projects');
    console.log("🔍 Projects field exists in DB:", hasProjectsField);
    
    // Initialize projects array if field doesn't exist in DB or is empty
    if (!hasProjectsField || !userData.projects || !Array.isArray(userData.projects) || userData.projects.length === 0) {
      console.log("⚠️ Condition triggered - initializing projects (field missing or empty)");
      userData.projects = ['My Prompts'];
      await userData.save();
      console.log("➕ Initialized projects with 'My Prompts' - saved to database");
    } else {
      // Check if "My Prompts" exists in the projects array for existing users
      const hasMyPrompts = userData.projects.includes('My Prompts');
      if (!hasMyPrompts) {
        console.log("⚠️ Adding 'My Prompts' to existing user's projects");
        userData.projects.unshift('My Prompts'); // Add at the beginning
        await userData.save();
        console.log("➕ Added 'My Prompts' to existing user - saved to database");
      } else {
        console.log("ℹ️ Projects field exists and has data, no initialization needed");
      }
    }

    const userProjects = userData.projects;

    console.log("✅ Returning projects:", userProjects);

    return NextResponse.json({ 
      projects: userProjects
    });
  } catch (err: any) {
    console.error("❌ Error fetching projects:", err);
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}

// POST - Create a new project
async function createProjectHandler(req: NextRequest, user: AuthenticatedUser) {
  try {
    await dbConnect();
    
    const body = await req.json();
    const { projectName } = body;

    console.log("🆕 Creating project for user:", user.email);
    console.log("📦 Project name:", projectName);

    if (!projectName || typeof projectName !== 'string' || !projectName.trim()) {
      return NextResponse.json({ error: "Project name is required" }, { status: 400 });
    }

    const trimmedName = projectName.trim();

    // Validate project name length
    if (trimmedName.length > 100) {
      return NextResponse.json({ error: "Project name must be less than 100 characters" }, { status: 400 });
    }

    const userData = await UserModel.findById(user.id);
    
    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("👤 Current user projects:", userData.projects);

    // Initialize projects array if it doesn't exist (null, undefined, empty array, or not an array)
    if (!userData.projects || !Array.isArray(userData.projects) || userData.projects.length === 0) {
      userData.projects = ['My Prompts'];
      console.log("➕ Initialized projects with 'My Prompts' during project creation");
    }

    // Check if project already exists (case-insensitive)
    const existingProject = userData.projects.find(
      (p: string) => p.toLowerCase() === trimmedName.toLowerCase()
    );
    
    if (existingProject) {
      return NextResponse.json({ 
        error: `Project "${existingProject}" already exists (names are case-insensitive)` 
      }, { status: 409 });
    }
    
    userData.projects.push(trimmedName);
    await userData.save();

    console.log("✅ Project created. Updated projects:", userData.projects);

    return NextResponse.json({ 
      message: "Project created successfully",
      projectName: trimmedName,
      projects: userData.projects
    }, { status: 201 });
  } catch (err: any) {
    console.error("❌ Error creating project:", err);
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}

// DELETE - Delete a project and all associated prompts
async function deleteProjectHandler(req: NextRequest, user: AuthenticatedUser) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const projectName = searchParams.get('name');

    if (!projectName) {
      return NextResponse.json({ error: "Project name is required" }, { status: 400 });
    }

    // Prevent deletion of My Prompts (case-insensitive)
    if (projectName.toLowerCase() === 'my prompts') {
      return NextResponse.json({ error: "Cannot delete My Prompts" }, { status: 400 });
    }

    console.log("🗑️ Deleting project:", projectName, "for user:", user.email);

    const userData = await UserModel.findById(user.id);
    
    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Delete all prompts associated with this project
    const deleteResult = await PromptLibraryModel.deleteMany({
      userId: user.id,
      project: projectName
    });

    console.log(`🗑️ Deleted ${deleteResult.deletedCount} prompts from project: ${projectName}`);

    // Remove project from user's projects array
    if (userData.projects) {
      userData.projects = userData.projects.filter((p: string) => p !== projectName);
      await userData.save();
    }

    console.log("✅ Project deleted successfully:", projectName);

    return NextResponse.json({ 
      message: "Project and associated prompts deleted successfully",
      deletedPrompts: deleteResult.deletedCount,
      projects: userData.projects
    });
  } catch (err: any) {
    console.error("❌ Error deleting project:", err);
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}

// PATCH - Rename a project and update all associated prompts
async function renameProjectHandler(req: NextRequest, user: AuthenticatedUser) {
  try {
    await dbConnect();
    
    const body = await req.json();
    const { oldName, newName } = body;

    console.log("✏️ Renaming project for user:", user.email);
    console.log("📝 Old name:", oldName, "-> New name:", newName);

    if (!oldName || typeof oldName !== 'string' || !oldName.trim()) {
      return NextResponse.json({ error: "Old project name is required" }, { status: 400 });
    }

    if (!newName || typeof newName !== 'string' || !newName.trim()) {
      return NextResponse.json({ error: "New project name is required" }, { status: 400 });
    }

    const trimmedOldName = oldName.trim();
    const trimmedNewName = newName.trim();

    // Prevent renaming My Prompts (case-insensitive)
    if (trimmedOldName.toLowerCase() === 'my prompts') {
      return NextResponse.json({ error: "Cannot rename My Prompts" }, { status: 400 });
    }

    // Validate new project name length
    if (trimmedNewName.length > 100) {
      return NextResponse.json({ error: "Project name must be less than 100 characters" }, { status: 400 });
    }

    const userData = await UserModel.findById(user.id);
    
    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if old project exists
    const oldProjectIndex = userData.projects.findIndex((p: string) => p === trimmedOldName);
    if (oldProjectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Check if new project name already exists (case-insensitive)
    const existingProject = userData.projects.find(
      (p: string) => p.toLowerCase() === trimmedNewName.toLowerCase() && p !== trimmedOldName
    );
    
    if (existingProject) {
      return NextResponse.json({ 
        error: `Project "${existingProject}" already exists (names are case-insensitive)` 
      }, { status: 409 });
    }

    // Update all prompts with the old project name to the new project name
    const updateResult = await PromptLibraryModel.updateMany(
      { userId: user.id, project: trimmedOldName },
      { $set: { project: trimmedNewName } }
    );

    console.log(`📝 Updated ${updateResult.modifiedCount} prompts from "${trimmedOldName}" to "${trimmedNewName}"`);

    // Update project name in user's projects array
    userData.projects[oldProjectIndex] = trimmedNewName;
    await userData.save();

    console.log("✅ Project renamed successfully");

    return NextResponse.json({ 
      message: "Project renamed successfully",
      oldName: trimmedOldName,
      newName: trimmedNewName,
      updatedPrompts: updateResult.modifiedCount,
      projects: userData.projects
    });
  } catch (err: any) {
    console.error("❌ Error renaming project:", err);
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}

export const GET = withAuth(getProjectsHandler);
export const POST = withAuth(createProjectHandler);
export const DELETE = withAuth(deleteProjectHandler);
export const PATCH = withAuth(renameProjectHandler);
