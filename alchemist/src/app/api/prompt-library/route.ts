import { NextRequest, NextResponse } from "next/server";
import { withAuth, AuthenticatedUser } from "../../../lib/auth";
import UserModel from "../../../db/models/User";
import PromptLibraryModel from "../../../db/models/PromptLibrary";
import dbConnect from "../../../db/dbConnect";

// GET - Fetch prompts by project for authenticated user
async function getPromptLibraryHandler(req: NextRequest, user: AuthenticatedUser) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const projectName = searchParams.get('project');
    
    console.log("📚 Fetching prompt library for user:", user.email);
    console.log("📁 Project filter:", projectName);

    // First, get user's projects to validate
    const userData = await UserModel.findById(user.id).select('projects');
    
    if (!userData) {
      console.error("❌ User not found:", user.id);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // If specific project requested, validate it exists for user
    if (projectName && !userData.projects.includes(projectName)) {
      return NextResponse.json({ 
        error: "Project not found or not accessible" 
      }, { status: 404 });
    }

    // Build query
    const query: any = { userId: user.id };
    if (projectName) {
      query.project = projectName;
    }

    // Fetch prompts with limited fields for performance
    // Include iterations.evaluation.totalScore so we can compute bestScore and iteration count without loading full iterations
    const rawPrompts = await PromptLibraryModel.find(query)
      .select('title project notes createdAt updatedAt usageCount bestScore iterations.evaluation.totalScore')
      .sort({ createdAt: -1 })
      .lean();

    // Enrich prompts with computed bestScore and iteration length
    const prompts = rawPrompts.map((p: any) => {
      const iterations = Array.isArray(p.iterations) ? p.iterations : [];
      const scores = iterations
        .map((it: any) => it?.evaluation?.totalScore)
        .filter((s: any) => typeof s === 'number') as number[];
      const computedBest = scores.length ? Math.max(...scores) : null;
      return {
        ...p,
        // Prefer computed best score from iterations; fall back to stored bestScore if present
        bestScore: computedBest ?? (typeof p.bestScore === 'number' ? p.bestScore : null),
      };
    });

    console.log(`✅ Found ${prompts.length} prompts`);

    // If no project specified, group by project
    if (!projectName) {
      const groupedPrompts: Record<string, any[]> = {};
      
      // Initialize with user's projects
      userData.projects.forEach((project: string) => {
        groupedPrompts[project] = [];
      });

      // Group prompts by project
      prompts.forEach((prompt: any) => {
        const projectKey = prompt.project || 'My Prompts';
        if (!groupedPrompts[projectKey]) {
          groupedPrompts[projectKey] = [];
        }
        groupedPrompts[projectKey].push(prompt);
      });

      return NextResponse.json({
        success: true,
        projects: userData.projects,
        groupedPrompts,
        totalPrompts: prompts.length
      });
    } else {
      // Return prompts for specific project
      return NextResponse.json({
        success: true,
        project: projectName,
        prompts,
        totalPrompts: prompts.length
      });
    }

  } catch (err: any) {
    console.error("❌ Error fetching prompt library:", err);
    return NextResponse.json({ 
      error: err.message || String(err) 
    }, { status: 500 });
  }
}

// POST - Create a new prompt in library (if needed)
async function createPromptHandler(req: NextRequest, user: AuthenticatedUser) {
  try {
    await dbConnect();
    
    const body = await req.json();
    const { 
      title, 
      fullPromptContent, 
      taskObjective, 
      mode, 
      project = 'My Prompts',
      ...otherFields 
    } = body;

    // Validate required fields
    if (!title || !fullPromptContent || !taskObjective || !mode) {
      return NextResponse.json({ 
        error: "Missing required fields: title, fullPromptContent, taskObjective, mode" 
      }, { status: 400 });
    }

    // Verify user exists and project is valid
    const userData = await UserModel.findById(user.id).select('projects');
    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!userData.projects.includes(project)) {
      return NextResponse.json({ 
        error: "Project not found in user's projects" 
      }, { status: 400 });
    }

    // Create new prompt
    const newPrompt = new PromptLibraryModel({
      title,
      fullPromptContent,
      taskObjective,
      mode,
      project,
      userId: user.id,
      ...otherFields
    });

    await newPrompt.save();

    console.log("✅ Created new prompt:", newPrompt.title);

    return NextResponse.json({
      success: true,
      message: "Prompt created successfully",
      prompt: {
        id: newPrompt._id,
        title: newPrompt.title,
        project: newPrompt.project,
        createdAt: newPrompt.createdAt
      }
    }, { status: 201 });

  } catch (err: any) {
    console.error("❌ Error creating prompt:", err);
    return NextResponse.json({ 
      error: err.message || String(err) 
    }, { status: 500 });
  }
}

// DELETE - Delete a prompt from library
async function deletePromptHandler(req: NextRequest, user: AuthenticatedUser) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const promptId = searchParams.get('id');

    if (!promptId) {
      return NextResponse.json({ 
        error: "Prompt ID is required" 
      }, { status: 400 });
    }

    console.log("🗑️ Deleting prompt:", promptId, "for user:", user.email);

    // Find the prompt and verify ownership
    const prompt = await PromptLibraryModel.findOne({ 
      _id: promptId, 
      userId: user.id 
    });

    if (!prompt) {
      return NextResponse.json({ 
        error: "Prompt not found or you don't have permission to delete it" 
      }, { status: 404 });
    }

    // Delete the prompt
    await PromptLibraryModel.deleteOne({ _id: promptId });

    console.log("✅ Prompt deleted successfully:", promptId);

    return NextResponse.json({
      success: true,
      message: "Prompt deleted successfully"
    });

  } catch (err: any) {
    console.error("❌ Error deleting prompt:", err);
    return NextResponse.json({ 
      error: err.message || String(err) 
    }, { status: 500 });
  }
}

export const GET = withAuth(getPromptLibraryHandler);
export const POST = withAuth(createPromptHandler);
export const DELETE = withAuth(deletePromptHandler);