// import { NextResponse } from "next/server";
// import { buildGuidedPrompt, callGenerateText } from "../../../../lib/aiClient";

// type Body = {
//   mode: "guided" | "flow";
//   schema?: "sales" | "marketing" | "content";
//   task?: string;
//   fields?: Record<string, any>;
//   contextData?: Record<string, any>;
//   references?: string;
//   insertReferences?: string;
//   format?: string;
//   toneData?: string[];
//   promptStructure?: string;
//   length?: string;
//   model?: string;
// };

// export async function POST(req: Request) {
//   try {
//     const body: Body = await req.json();

//     if (!body.mode) {
//       return NextResponse.json({ error: "mode is required" }, { status: 400 });
//     }

//     if (body.mode === "flow") {
//       // flow: returns the user's freeform input as-is
//       const prompt = body.task || "";
//       return NextResponse.json({ prompt });
//     }

//     // guided mode: build a structured prompt and ask AI to refine it
//     const schema = body.schema || "content";
//     const task = body.task || "";
//     // prefer contextData.dynamicFields if present, otherwise use fields
//     const fields = (body.contextData && body.contextData.dynamicFields) || body.fields || body.contextData || {};
//     const insertRefs = body.insertReferences || body.references || "";
//     const format = body.format || "";
//     const tone = (body.toneData || []).join(", ");
//     const promptStructure = body.promptStructure || "";
//     const length = body.length || "";

//     let rawPrompt = buildGuidedPrompt({
//       schema,
//       task,
//       fields,
//       references: insertRefs,
//       format,
//     });

//     // append extra directives for tone, structure and length so the refined
//     // prompt includes those constraints
//     if (tone) rawPrompt += `\n\n<Tone> ${tone} </Tone>`;
//     if (promptStructure) rawPrompt += `\n\n<structure> ${promptStructure} </structure>`;
//     if (length) rawPrompt += `\n\n<length> ${length} </length>`;

//     // call the AI SDK to refine/expand the prompt
//     const refined = await callGenerateText({
//       prompt: `Refine and return only the final optimized prompt for use with an LLM.\n\nInput Prompt:\n${rawPrompt}`,
//       model: body.model,
//       maxTokens: 800,
//     });

//     return NextResponse.json({ prompt: refined });
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
//   }
// }


// import { NextResponse } from "next/server";
// import { buildGuidedPrompt, callGenerateText } from "../../../../lib/aiClient";

// type Body = {
//   mode: "guided" | "flow";
//   schema?: "sales" | "marketing" | "content";
//   task?: string;
//   fields?: Record<string, string>;
//   contextData?: Record<string, any>;
//   references?: string;
//   insertReferences?: string;
//   format?: string;
//   toneData?: string[];
//   promptStructure?: string;
//   length?: string;
//   model?: string;
// };

// export async function POST(req: Request) {
//   try {
//     const body: Body = await req.json();

//     if (!body.mode) {
//       return NextResponse.json({ error: "mode is required" }, { status: 400 });
//     }

//     if (body.mode === "flow") {
//       // flow mode: no restrictions, returns the user's freeform input as-is
//       const prompt = body.task || "";
//       return NextResponse.json({ prompt });
//     }
    
//     // guided mode: build a structured prompt with XML tags
//     const schema = body.schema || "content";
//     const task = body.task || "";
//     // prefer contextData.dynamicFields if present, otherwise use fields
//     const fields = (body.contextData && body.contextData.dynamicFields) || body.fields || body.contextData || {};
//     const insertRefs = body.insertReferences || body.references || "";
//     const format = body.format || "";
//     const tone = (body.toneData || []).join(", ");
//     const promptStructure = body.promptStructure || "";
//     const length = body.length || "";

//     // Build the structured prompt with XML tags
//     let rawPrompt = buildGuidedPrompt({
//       schema,
//       task,
//       fields,
//       references: insertRefs,
//       format,
//       tone,
//       promptStructure,
//       length,
//     });

//     // call the AI SDK to refine/expand the prompt
//     const refined = await callGenerateText({
//       prompt: `Refine and return only the final optimized prompt for use with an LLM.\n\nInput Prompt:\n${rawPrompt}`,
//       model: body.model,
//       maxTokens: 800,
//     });
     
//     return NextResponse.json({ prompt: refined });
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import { buildGuidedPrompt, callGenerateText } from "../../../../lib/aiClient";

type Body = {
  mode: "guided" | "flow";
  schema?: "sales" | "marketing" | "content";
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
};

export async function POST(req: Request) {
  try {
    const body: Body = await req.json();

    console.log("🟢 Incoming Request Body:", JSON.stringify(body, null, 2));

    if (!body.mode) {
      console.error("❌ Error: mode is required");
      return NextResponse.json({ error: "mode is required" }, { status: 400 });
    }

    // FLOW MODE
    if (body.mode === "flow") {
      const prompt = body.task || "";
      console.log("🌀 Flow Mode Prompt:", prompt);
      return NextResponse.json({ prompt });
    }

    // GUIDED MODE
    const schema = body.schema || "content";
    const task = body.task || "";
    const fields =
      (body.contextData && body.contextData.dynamicFields) ||
      body.fields ||
      body.contextData ||
      {};
    const insertRefs = body.insertReferences || body.references || "";
    const format = body.format || "";
    const tone = (body.toneData || []).join(", ");
    const promptStructure = body.promptStructure || "";
    const length = body.length || "";

    console.log("🧩 Building Structured Prompt with:", {
      schema,
      task,
      fields,
      insertRefs,
      format,
      tone,
      promptStructure,
      length,
    });

    let rawPrompt = buildGuidedPrompt({
      schema,
      task,
      fields,
      references: insertRefs,
      format,
      tone,
      promptStructure,
      length,
    });

    console.log("📜 Raw Prompt Generated:\n", rawPrompt);

    // Refine prompt using AI SDK
    const refined = await callGenerateText({
      prompt: `Refine and return only the final optimized prompt for use with an LLM.\n\nInput Prompt:\n${rawPrompt}`,
      model: body.model,
      maxTokens: 800,
    });

    console.log("✨ Refined Prompt Response from AI SDK:\n", refined);

    // Success Response
    return NextResponse.json({ prompt: refined });
  } catch (err: any) {
    console.error("💥 Server Error:", err.message || err);
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
