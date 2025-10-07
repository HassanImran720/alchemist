import { NextResponse } from 'next/server';
import { callGenerateText } from '@/lib/aiClient';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { originalPrompt, evaluation, references, format } = body || {};

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

    const systemPrompt = `You are a high-performance prompt engineer. Given an original prompt and evaluation notes, produce a short reiteration prompt that follows the structure: <Role>, <Objective>, <Method>, <Inputs>, <Completeness>, <Tone>, <Presentation>, <Verbosity>, <Other>, <References>, <Format>. Only include sections that require changes; for unchanged sections use "No Change". Keep each section to 1-2 sentences max and use concise, high-impact phrasing.`;

    const userMessage = `Original Prompt:\n${originalPrompt}\n\nEvaluation Summary:\n${reiterationInstruction}\n\nReferences:\n${references || 'No References'}\n\nFormat:\n${format || 'No Format'}\n\nProduce the reiteration prompt now.`;

    const aiResult = await callGenerateText({ prompt: `${systemPrompt}\n\n${userMessage}`, model: 'gpt-4o-mini', maxTokens: 400 });

    const improved = aiResult?.trim?.() || '';
    console.log('Improved Prompt:', improved);
    return NextResponse.json({ prompt: improved });
  } catch (err: any) {
    console.error('improve route error', err);
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
}
