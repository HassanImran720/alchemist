import { NextRequest, NextResponse } from "next/server";
import { withAuth, AuthenticatedUser } from "../../../../lib/auth";
import dbConnect from "../../../../db/dbConnect";
import PromptLibraryModel from "../../../../db/models/PromptLibrary";

type SavePromptBody = {
  title: string;
  
  // ✅ Iterations data - each iteration has its own complete data
  iterations?: Array<{
    iterationNumber: number;
    prompt: string;
    response: string;
    evaluation: Record<string, any> | null;
    aiModel: string;
    promptStructure?: string;
    timestamp: Date;
  }>;
  
  taskObjective?: string;
  category?: string;
  contextData?: Record<string, any>;
  insertReferences?: string;
  references?: string;
  outputFormat?: string;
  length?: string;
  toneData?: string[];
  project?: string;
  notes?: string;
  tags?: string[];
};

async function savePromptHandler(req: NextRequest, user: AuthenticatedUser) {
  try {
    await dbConnect();

    const body: SavePromptBody = await req.json();

    console.log("💾 Saving prompt to library for user:", user.email);
    console.log("📝 Prompt data:", JSON.stringify(body, null, 2));

    // Validate required fields
    if (!body.title?.trim()) {
      return NextResponse.json(
        { error: "Title is required" }, 
        { status: 400 }
      );
    }

    // Check if a prompt with the same title already exists for this user
    const existingPrompt = await PromptLibraryModel.findOne({
      userId: user.id,
      title: body.title.trim()
    });

    if (existingPrompt) {
      return NextResponse.json(
        { error: "A prompt with this title already exists in your library" }, 
        { status: 409 }
      );
    }

    // Calculate best score from all iterations
    let bestScore = 0;
    if (body.iterations && body.iterations.length > 0) {
      body.iterations.forEach(iteration => {
        if (iteration.evaluation && iteration.evaluation.totalScore) {
          bestScore = Math.max(bestScore, iteration.evaluation.totalScore);
        }
      });
    }

    // Create new prompt library entry
    const promptLibraryData = {
      title: body.title.trim(),
      userId: user.id,
      
      // ✅ Save all iterations with complete data
      iterations: body.iterations || [],
      bestScore: bestScore > 0 ? bestScore : undefined,
      
      taskObjective: body.taskObjective || "",
      category: body.category || "",
      contextData: body.contextData || {},
      insertReferences: body.insertReferences || "",
      references: body.references || "",
      outputFormat: body.outputFormat || "",
      length: body.length || "",
      toneData: body.toneData || [],
      project: body.project || "My Prompts",
      notes: body.notes || "",
      tags: body.tags || [],
      usageCount: 0
    };

    console.log("💾 Saving to database with", body.iterations?.length || 0, "iterations");
    console.log("📊 Best Score:", bestScore);
    console.log("📊 Project:", promptLibraryData.project);

    const savedPrompt = await PromptLibraryModel.create(promptLibraryData);

    console.log("✅ Prompt saved successfully:", savedPrompt._id);
    console.log("📊 Saved prompt details:", {
      id: savedPrompt._id,
      title: savedPrompt.title,
      userId: savedPrompt.userId,
      project: savedPrompt.project,
      category: savedPrompt.category,
      iterationsCount: savedPrompt.iterations?.length || 0,
      bestScore: savedPrompt.bestScore,
      createdAt: savedPrompt.createdAt
    });

    return NextResponse.json({
      success: true,
      message: "Prompt saved to library successfully",
      promptId: savedPrompt._id,
      title: savedPrompt.title,
      project: savedPrompt.project
    });

  } catch (err: any) {
    console.error("💥 Error saving prompt to library:", err.message || err);
    
    // Handle specific MongoDB errors
    if (err.code === 11000) {
      return NextResponse.json(
        { error: "A prompt with this title already exists in your library" }, 
        { status: 409 }
      );
    }

    if (err.name === 'ValidationError') {
      const validationErrors = Object.values(err.errors).map((e: any) => e.message);
      return NextResponse.json(
        { error: `Validation error: ${validationErrors.join(', ')}` }, 
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: err.message || "Failed to save prompt to library" }, 
      { status: 500 }
    );
  }
}

// Export the protected POST handler
export const POST = withAuth(savePromptHandler);