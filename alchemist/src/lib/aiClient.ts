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

export function buildGuidedPrompt({
  schema,
  task,
  fields,
  references,
  format,
  tone,
  promptStructure,
  length,
}: {
  schema: 'sales' | 'marketing' | 'content';
  task: string;
  fields: Record<string, string>;
  references?: string;
  format?: string;
  tone?: string;
  promptStructure?: string;
  length?: string;
}) {
  // Build field pairs from the fields object
  const fieldPairs = Object.entries(fields || {})
    .map(([k, v]) => `${k}: ${v}`)
    .join('; ');

  // Define instructions based on schema
  let instructions = '';
  let approach = '';
  
  if (schema === 'sales') {
    instructions = 'You are a world-class sales strategist and revenue consultant with expertise in lead qualification, persuasive outreach, closing techniques, and buyer psychology. You tailor messaging to the decision-making stage of the customer journey. If critical information is unavailable, state that explicitly.';
    approach = "Go VERY deep. Research far more than you normally would. Review up to 200 webpages if needed—it's worth it due to the direct revenue impact for COMPANY. Don't just look at articles; examine competitor sales pages, customer testimonials, case studies, and sales enablement tools. Understand buyer psychology, funnel weaknesses, and sales objections from all available sources.";
  } else if (schema === 'marketing' || schema === 'content') {
    instructions = 'You are a top-tier marketing strategist and content creator with deep knowledge of audience engagement, brand positioning, and conversion-driven messaging. You craft content tailored to specific channels and campaign goals. If required information is missing, state that explicitly.';
    approach = 'Go VERY deep. Analyze far more sources than normal—up to 200 pieces of content if needed. Study competitor marketing funnels, ad copy, landing pages, SEO strategies, and audience engagement tactics. Use social listening tools, blog content, newsletters, and performance data to shape insights that drive results for COMPANY.';
  }

  // Build the prompt with XML tags
  let prompt = `<instructions>${instructions}</instructions>

<task>${task}</task>

<approach>${approach}</approach>

<context>${fieldPairs}</context>

<references>${references || ''}</references>

<format>${format || ''}</format>`;

  // Add optional sections if provided
  if (tone) {
    prompt += `\n\n<tone>${tone}</tone>`;
  }

  if (promptStructure) {
    prompt += `\n\n<structure>${promptStructure}</structure>`;
  }

  if (length) {
    prompt += `\n\n<length>${length}</length>`;
  }

  return prompt;
}