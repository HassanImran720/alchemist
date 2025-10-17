import { NextRequest, NextResponse } from 'next/server';
import { callGenerateText } from '@/lib/aiClient';
import { withAuth, AuthenticatedUser } from '@/lib/auth';

async function improveHandler(req: NextRequest, user: AuthenticatedUser) {
  try {
  const body = await req.json();
  console.log("🟢 Improve Prompt Request Body:", body);
  const { originalPrompt, evaluation, references, format, aiResponse, taskObjective, promptStructure } = body || {};

    console.log("👤 Authenticated User:", user.email);

    if (!originalPrompt) {
      return NextResponse.json({ error: 'originalPrompt is required' }, { status: 400 });
    }

    // Build a concise reiteration instruction using the evaluation object
    // The prompt we send to the AI should follow the "Reiterate Section Template" the user provided.
    const buildReiteration = (evaluationObj: any) => {
      const sections: string[] = [];

      // Objective
      if (evaluationObj.objective === false) {
        sections.push(`<Objective>: REWRITE OBJECTIVE — ${evaluationObj.rewrittenObjective || 'Please provide a new objective.'}`);
      } else {
        sections.push(`<Objective>: No Change`);
      }

      // Inputs
      const inputLines: string[] = [];
      for (const [key, val] of Object.entries(evaluationObj.inputs || {})) {
        const status = (val as any).status;
        const issues = (val as any).issues || [];
        if (status === 'No Issues') {
          inputLines.push(`${key}: No Change`);
        } else if (status === 'Minor Issues') {
          inputLines.push(`${key}: Minor — ${issues.join('; ') || 'Minor tweaks required'}`);
        } else {
          inputLines.push(`${key}: Major — ${issues.join('; ') || 'Major revision required'}`);
        }
      }
      sections.push(`<Inputs>: ${inputLines.join(' | ')}`);

      // Categories
      const categories = ['completeness','tone','presentation','verbosity','other'];
      const catLines: string[] = [];
      for (const c of categories) {
        const score = evaluationObj[c] ?? 0;
        const issues = (evaluationObj.categoryIssues && evaluationObj.categoryIssues[c]) || [];
        if (score >= 5) {
          catLines.push(`${c}: No Change`);
        } else if (score >= 3) {
          catLines.push(`${c}: Minor — ${issues.join('; ') || 'Minor refinement'}`);
        } else {
          catLines.push(`${c}: Major — ${issues.join('; ') || 'Major revision'}`);
        }
      }
      sections.push(`<Categories>: ${catLines.join(' | ')}`);

      return sections.join('\n');
    };

    const reiterationInstruction = buildReiteration(evaluation);

  const systemPrompt = `You are a high-performance prompt engineer. Produce a reiteration prompt that EXACTLY follows the labeled structure below:\n\n<Role>\n<Objective>\n<Method>\n<Inputs>\n<Completeness>\n<Tone>\n<Presentation>\n<Verbosity>\n<Other>\n<References>\n<Format>\n\nRules:\n- Include only the 11 labeled sections above, in that order.\n- For sections that require no change, write the section heading then the words: No Change.\n- For Objective: if the evaluation indicates the objective failed, include a one-line labeled subsection 'REWRITE OBJECTIVE' with the new objective text.\n- Every section's content must be 1-2 sentences. Do NOT produce more than 2 sentences per section.\n- Do not include any extra commentary, explanation, or metadata. Output must be only the 11 labeled sections and their short content.`;

  const userMessage = `Original Prompt:\n${originalPrompt}\n\nPrevious AI Response:\n${aiResponse || 'No previous response provided.'}\n\nTask Objective (user may have rewritten):\n${taskObjective || 'No objective provided.'}\n\nEvaluation Summary:\n${reiterationInstruction}\n\nPreferred Output Structure:\n${promptStructure || 'unspecified'}\n\nReferences:\n${references || 'No References'}\n\nFormat:\n${format || 'No Format'}\n\nImportant: follow the system prompt rules exactly. Pay special attention to the verbosity score and adjust length/detail accordingly. If Objective needs rewriting, include a 'REWRITE OBJECTIVE' line under <Objective> with the new text. Include any tags/headings from the original prompt into the appropriate sections if relevant. Produce the reiteration prompt now.`;

    const aiResult = await callGenerateText({ prompt: `${systemPrompt}\n\n${userMessage}`, model: 'gpt-4o-mini', maxTokens: 400 });

    const improved = aiResult?.trim?.() || '';
    console.log('Improved Prompt:', improved);
    return NextResponse.json({ prompt: improved });
  } catch (err: any) {
    console.error('improve route error', err);
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
}

// Export the protected POST handler
export const POST = withAuth(improveHandler);
