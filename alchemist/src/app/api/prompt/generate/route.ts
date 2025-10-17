import { NextRequest, NextResponse } from "next/server";
import { buildGuidedPrompt, buildFlowModePrompt } from "../../../../lib/promptBuilder";
import { callGenerateText } from "../../../../lib/aiClient";
import { withAuth, AuthenticatedUser } from "../../../../lib/auth";
import { buildFormatInstruction, getFormatTemplate } from "../../../../lib/formatTemplates";

type Body = {
  mode: "guided" | "flow";
  task?: string;
  fields?: Record<string, string>;
  contextData?: Record<string, any>;
  references?: string;
  insertReferences?: string;
  format?: string;
  toneData?: string[];
  promptStructure?: string;
  length?: string;
  model?: string;
  selectedCategory?: string; // For guided mode - the selected category from dropdown
  includeEmojis?: boolean; // For emoji inclusion
};

async function generateHandler(req: NextRequest, user: AuthenticatedUser) {
  try {
    const body: Body = await req.json();

    console.log("🟢 Incoming Request Body:", JSON.stringify(body, null, 2));
    console.log("👤 Authenticated User:", user.email);

    if (!body.mode) {
      console.error("❌ Error: mode is required");
      return NextResponse.json({ error: "mode is required" }, { status: 400 });
    }

    // FLOW MODE
    if (body.mode === "flow") {
      const task = body.task || "";
      const format = body.format || "";
      const tone = (body.toneData || []).join(", ");
      const length = body.length || "";
      const promptStructure = body.promptStructure || "aichemist-formula";
      const includeEmojis = body.includeEmojis || false;

      console.log("🌀 Flow Mode - Building Structured Prompt with:", {
        task,
        format,
        tone,
        length,
        promptStructure,
        includeEmojis
      });

      // Build structured prompt for flow mode
      const structuredPrompt = buildFlowModePrompt({
        task,
        format,
        tone,
        length,
        promptStructure,
        includeEmojis,
      });

      console.log("📜 Flow Mode Structured Prompt Generated:\n", structuredPrompt);

      // Return the structured prompt directly (no refinement needed as it's already structured)
      return NextResponse.json({ prompt: structuredPrompt });
    }

  // GUIDED MODE
  const task = body.task || "";
    const fields =
      (body.contextData && body.contextData.dynamicFields) ||
      body.fields ||
      body.contextData ||
      {};
    const insertRefs = body.insertReferences || body.references || "";
    const format = body.format || "";
    const tone = (body.toneData || []).join(", ");
    const promptStructure = body.promptStructure || "aichemist-formula";
    const length = body.length || "";
    const selectedCategory = body.selectedCategory || "";
    const includeEmojis = body.includeEmojis || false;

    console.log("🧩 Building Structured Guided Prompt with:", {
      task,
      fields,
      insertRefs,
      format,
      tone,
      promptStructure,
      length,
      selectedCategory,
      includeEmojis,
    });

    // Build structured prompt for guided mode
    const structuredPrompt = buildGuidedPrompt({
      selectedCategory,
      task,
      fields,
      references: insertRefs,
      format,
      tone,
      promptStructure,
      length,
      includeEmojis,
    });

    console.log("📜 Guided Mode Structured Prompt Generated:\n", structuredPrompt);

    // Return the structured prompt directly
    return NextResponse.json({ prompt: structuredPrompt });
  } catch (err: any) {
    console.error("💥 Server Error:", err.message || err);
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}

// Export the protected POST handler
export const POST = withAuth(generateHandler);
