import { NextRequest, NextResponse } from "next/server";
import { buildGuidedPrompt, buildFlowModePrompt } from "../../../../lib/promptBuilder";
import { callGenerateText } from "../../../../lib/aiClient";
import { withAuth, AuthenticatedUser } from "../../../../lib/auth";
import { buildFormatInstruction, getFormatTemplate } from "../../../../lib/formatTemplates";

type Body = {
  // mode: "guided" | "flow"; // ❌ Removed - using category instead
  category?: string; // ✅ The selected category (General, Content Creation, Sales, etc.)
  selectedCategory?: string; // Keep for backward compatibility
  task?: string;
  fields?: Record<string, string>;
  contextData?: Record<string, any>;
  references?: string;
  insertReferences?: string;
  referencesUsage?: string;
  format?: string;
  toneData?: string[];
  promptStructure?: string;
  length?: string;
  model?: string;
  includeEmojis?: boolean; // For emoji inclusion
};

async function generateHandler(req: NextRequest, user: AuthenticatedUser) {
  try {
    const body: Body = await req.json();

    console.log("🟢 Incoming Request Body:", JSON.stringify(body, null, 2));
    console.log("👤 Authenticated User:", user.email);

    // Get category - could be in category or selectedCategory field
    const category = body.category || body.selectedCategory || "";

    if (!category) {
      console.error("❌ Error: category is required");
      return NextResponse.json({ error: "category is required" }, { status: 400 });
    }

    console.log("📂 Selected Category:", category);

    // GENERAL CATEGORY (freeform text)
    if (category === "General") {
      const task = body.task || "";
      const contextDescription = body.contextData?.dynamicFields?.['Context Description'] || "";
      const format = body.format || "";
      // ✅ toneData now contains full textarea content (tones + brand voice combined)
      const tone = (body.toneData && body.toneData.length > 0) ? body.toneData[0] : "Professional";
      const length = body.length || "";
  const promptStructure = body.promptStructure || "plain-text"; // ✅ default to plain-text to match UI
      const includeEmojis = body.includeEmojis || false;

      console.log("🌀 General Category - Building Freeform Prompt with:", {
        task,
        contextDescription,
        format,
        tone,
        length,
        promptStructure,
        includeEmojis
      });

      // Build structured prompt for General category (similar to old flow mode)
      const structuredPrompt = buildFlowModePrompt({
        task: contextDescription, // Use the freeform context as the task
        format,
        tone,
        length,
        promptStructure,
        includeEmojis,
      });

      console.log("📜 General Category Structured Prompt Generated:\n", structuredPrompt);

      // Return the structured prompt directly
      return NextResponse.json({ prompt: structuredPrompt });
    }

  // ALL OTHER CATEGORIES (guided mode with structured fields)
  const task = body.task || "";
    const fields =
      (body.contextData && body.contextData.dynamicFields) ||
      body.fields ||
      body.contextData ||
      {};
    
    // Also include custom fields from customFieldsByGroup
    const customFieldsByGroup = body.contextData?.customFieldsByGroup || {};
    const customFieldsFlattened: Record<string, string> = {};
    Object.entries(customFieldsByGroup).forEach(([group, fieldArray]) => {
      (fieldArray as string[]).forEach((fieldValue, index) => {
        if (fieldValue && fieldValue.trim()) {
          // Use the actual field value as the label instead of generic "Custom Field X"
          const fieldLabel = fieldValue.length > 50 ? `${fieldValue.substring(0, 47)}...` : fieldValue;
          customFieldsFlattened[`${group} - ${fieldLabel}`] = fieldValue;
        }
      });
    });
    
    // Merge custom fields with regular fields
    const allFields = { ...fields, ...customFieldsFlattened };
    
    const insertRefs = body.insertReferences || body.references || "";
    const referencesUsage = body.referencesUsage || "";
    const format = body.format || "";
    // ✅ toneData now contains full textarea content (tones + brand voice combined)
    const tone = (body.toneData && body.toneData.length > 0) ? body.toneData[0] : "Professional";
  const promptStructure = body.promptStructure || "plain-text"; // ✅ default to plain-text to match UI
    const length = body.length || "";
    const selectedCategory = body.selectedCategory || "";
    const includeEmojis = body.includeEmojis || false;

    console.log("🧩 Building Structured Guided Prompt with:", {
      task,
      fields: allFields,
      insertRefs,
      referencesUsage,
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
      fields: allFields,
      references: insertRefs,
      referencesUsage,
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
