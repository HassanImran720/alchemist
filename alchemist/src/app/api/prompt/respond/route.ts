import { NextRequest, NextResponse } from "next/server";
import { generateResponseWithModel } from "../../../../lib/aiModels";
import { withAuth, AuthenticatedUser } from "../../../../lib/auth";

type Body = {
  prompt: string;
  model: string; // Make model required
  maxTokens?: number;
  temperature?: number;
};

async function respondHandler(req: NextRequest, user: AuthenticatedUser) {
  try {
    const body: Body = await req.json();

    console.log("👤 Authenticated User:", user.email);
    console.log("🤖 Response Request:", JSON.stringify(body, null, 2));

    if (!body.prompt) {
      return NextResponse.json({ error: "prompt is required" }, { status: 400 });
    }

    if (!body.model) {
      return NextResponse.json({ error: "model is required" }, { status: 400 });
    }

    // Use the modular AI system to generate response
    const result = await generateResponseWithModel({
      prompt: body.prompt,
      model: body.model,
      maxTokens: body.maxTokens ?? 800,
      temperature: body.temperature ?? 0.7,
    });

    if (!result.success) {
      console.log("❌ Model Response Error:", result.error);
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    console.log("✅ Response Generated Successfully");
    return NextResponse.json({ text: result.text });
  } catch (err: any) {
    console.error("💥 Server Error:", err.message || err);
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}

// Export the protected POST handler
export const POST = withAuth(respondHandler);
