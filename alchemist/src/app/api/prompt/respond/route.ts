import { NextRequest, NextResponse } from "next/server";
import { generateResponseWithModel } from "../../../../lib/aiModels";
import { withAuth, AuthenticatedUser } from "../../../../lib/auth";

type Body = {
  prompt: string;
  model: string;
  maxTokens?: number;
  temperature?: number;
};

async function respondHandler(req: NextRequest, user: AuthenticatedUser) {
  try {
    const body: Body = await req.json();

    console.log("👤 Authenticated User:", user.email);
    // Log the incoming prompt for debugging — truncate to first 2000 chars to avoid huge logs
    try {
      const promptPreview =
        typeof body.prompt === "string" ? body.prompt.slice(0, 2000) : "";
      console.log(
        "🤖 Response Request (preview):",
        JSON.stringify({ ...body, prompt: promptPreview }, null, 2)
      );
      if (
        typeof body.prompt === "string" &&
        body.prompt.includes("---REITERATION REFINEMENTS---")
      ) {
        console.log(
          "🔁 Detected reiteration combined with base prompt (marker present).",
          body.prompt
        );
      }
    } catch (e) {
      console.log("Could not log prompt preview", e);
    }

    if (!body.prompt) {
      return NextResponse.json(
        { error: "prompt is required" },
        { status: 400 }
      );
    }

    if (!body.model) {
      return NextResponse.json({ error: "model is required" }, { status: 400 });
    }

    // System prompt: high-level assistant behavior (keeps output ready-to-use)
    const systemPrompt = `You are an assistant designed to adhere to the following specifications: Role, Objective, Method, User Customizations, Tone, and Output. Your primary purpose is to create content that is copy and pasteable, ready-to-use. This means that you do not include pleasantries, avoid conversational language, refrain from follow up questions, unless the user specifically uses language that indicates a conversation (for example, "what do you think?"). Reiterations will be common, and you will do them without explaining your work, unless the user asks for explanations as to why you made certain changes.`;

    // Use the modular AI system to generate response
    const result = await generateResponseWithModel({
      prompt: body.prompt,
      model: body.model,
      maxTokens: body.maxTokens ?? 800,
      temperature: body.temperature ?? 0.7,
      systemPrompt,
    });

    if (!result.success) {
      console.log("❌ Model Response Error:", result.error);
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    console.log("✅ Response Generated Successfully", result.text);
    return NextResponse.json({ text: result.text });
  } catch (err: any) {
    console.error("💥 Server Error:", err.message || err);
    return NextResponse.json(
      { error: err.message || String(err) },
      { status: 500 }
    );
  }
}

// Export the protected POST handler
export const POST = withAuth(respondHandler);