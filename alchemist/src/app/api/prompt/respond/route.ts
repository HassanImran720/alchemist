import { NextResponse } from "next/server";
import { callGenerateText } from "../../../../lib/aiClient";

type Body = {
  prompt: string;
  model?: string;
  maxTokens?: number;
};

export async function POST(req: Request) {
  try {
    const body: Body = await req.json();

    if (!body.prompt) {
      return NextResponse.json({ error: "prompt is required" }, { status: 400 });
    }

    const text = await callGenerateText({
      prompt: body.prompt,
      model: body.model,
      maxTokens: body.maxTokens ?? 800,
    });

    return NextResponse.json({ text });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
