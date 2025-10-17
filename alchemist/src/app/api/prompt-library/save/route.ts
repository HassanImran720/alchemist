import { NextRequest, NextResponse } from "next/server";
import { withAuth, AuthenticatedUser } from "../../../../lib/auth";
import dbConnect from "../../../../db/dbConnect";
import PromptLibraryModel from "../../../../db/models/PromptLibrary";

type SavePromptBody = {
  title: string;
//   rawPrompt: string;
//   refinedPrompt: string;
  fullPromptContent: string;
  taskObjective: string;
  mode: 'guided' | 'flow';
  promptSchema?: string;
  contextData?: Record<string, any>;
  insertReferences?: string;
  references?: string;
  outputFormat?: string;
  promptStructure?: string;
  length?: string;
  toneData?: string[];
  aiResponse?: string;
  evaluation?: Record<string, any>;
  totalScore?: number;
  aiModel?: string;
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

    if (!body.fullPromptContent?.trim()) {
      return NextResponse.json(
        { error: "Prompt content is required" }, 
        { status: 400 }
      );
    }

    if (!body.taskObjective?.trim()) {
      return NextResponse.json(
        { error: "Task objective is required" }, 
        { status: 400 }
      );
    }

    if (!body.mode || !['guided', 'flow'].includes(body.mode)) {
      return NextResponse.json(
        { error: "Valid mode (guided/flow) is required" }, 
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

    // Create new prompt library entry
    const promptLibraryData = {
      title: body.title.trim(),
      userId: user.id,
    //   rawPrompt: body.rawPrompt || "",
    //   refinedPrompt: body.refinedPrompt || "",
      fullPromptContent: body.fullPromptContent,
      taskObjective: body.taskObjective,
      mode: body.mode,
      promptSchema: body.promptSchema || "",
      contextData: body.contextData || {},
      insertReferences: body.insertReferences || "",
      references: body.references || "",
      outputFormat: body.outputFormat || "",
      promptStructure: body.promptStructure || "",
      length: body.length || "",
      toneData: body.toneData || [],
      aiResponse: body.aiResponse || "",
  evaluation: body.evaluation || {},
  totalScore: typeof body.totalScore === 'number' ? body.totalScore : undefined,
      aiModel: body.aiModel || "gpt-4",
      project: body.project || "Default Project",
      notes: body.notes || "",
      tags: body.tags || [],
      usageCount: 0
    };

    const savedPrompt = await PromptLibraryModel.create(promptLibraryData);

    console.log("✅ Prompt saved successfully:", savedPrompt._id);

    return NextResponse.json({
      success: true,
      message: "Prompt saved to library successfully",
      promptId: savedPrompt._id,
      title: savedPrompt.title
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