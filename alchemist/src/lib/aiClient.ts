import OpenAI from "openai";

function getClient() {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OPENAI_API_KEY not configured in environment");
  return new OpenAI({ apiKey: key });
}

export async function callGenerateText({
  prompt,
  model,
  maxTokens = 800,
}: {
  prompt: string;
  model?: string;
  maxTokens?: number;
}) {
  const sdk = getClient();
  const modelName = model || "gpt-4o-mini"; // default modern OpenAI model

  const resp = await sdk.chat.completions.create({
    model: modelName,
    messages: [{ role: "user", content: prompt }],
    max_tokens: maxTokens,
    temperature: 0.7,
  });

  const text = resp?.choices?.[0]?.message?.content ?? "";
  return text;
}

// aiClient.ts is intentionally small: it only contains functions that call external AI APIs.
// Prompt building has been moved to `promptBuilder.ts`.