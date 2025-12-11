import { NextRequest, NextResponse } from "next/server";
import { callGenerateText } from "@/lib/aiClient";
import { withAuth, AuthenticatedUser } from "@/lib/auth";

async function improveHandler(req: NextRequest, user: AuthenticatedUser) {
  try {
    const body = await req.json();
    const {
      originalPrompt,
      evaluation,
      references,
      format,
      aiResponse,
      taskObjective,
      promptStructure,
    } = body || {};

    if (!originalPrompt) {
      return NextResponse.json(
        { error: "originalPrompt is required" },
        { status: 400 }
      );
    }

    // Note: promptStructure is accepted from the frontend but specific format specs
    // are no longer used server-side. Keep the original prompt and evaluation payloads.

    // Build reiteration instruction following the new formula
    const buildReiteration = (evaluationObj: any) => {
      const sections: string[] = [];
      const frontendSections: string[] = []; // ✅ User-facing sections only

      const correctInputs: string[] = [];
      const inputIssues: Array<{
        category: string;
        description: string;
        problematicText?: string;
      }> = [];
      const additionalIssuesList: Array<{
        description: string;
        problematicText?: string;
      }> = [];

      // Categorize inputs by status
      for (const [key, val] of Object.entries(evaluationObj.inputs || {})) {
        const status = (val as any).status;
        const issues = (val as any).issues || [];

        if (status === "No Issues") {
          correctInputs.push(key);
        } else if (status === "Has Issues") {
          // Each issue now has description and optional problematicText
          issues.forEach((issue: any) => {
            inputIssues.push({
              category: key,
              description: issue.description,
              problematicText: issue.problematicText,
            });
          });
        }
      }

      // Collect additional issues separately
      if (
        evaluationObj.additionalIssues &&
        evaluationObj.additionalIssues.length > 0
      ) {
        evaluationObj.additionalIssues.forEach((issue: any) => {
          additionalIssuesList.push({
            description: issue.description,
            problematicText: issue.problematicText,
          });
        });
      }

      // Build backend instruction (for AI processing)
      if (correctInputs.length > 0) {
        sections.push(
          `This prompt did a fantastic job adhering to the following guidelines:\n${correctInputs.join(
            ", "
          )}\n\nPlease maintain this level of alignment. Focus your changes only on the items described below.`
        );
      }

      // Format input issues (for both frontend and backend) — use softer wording
      if (inputIssues.length > 0) {
        const issueLines = inputIssues
          .map((item, index) => {
            let line = `${index + 1}. ${item.description}`;
            if (item.problematicText && item.problematicText.trim()) {
              line += `\n   Problematic Text (please avoid or reduce, for example): "${item.problematicText}"`;
            }
            return line;
          })
          .join("\n\n"); // ✅ Add double line breaks for readability

        const issueSection = `${issueLines}`;
        sections.push(issueSection);
        // Add a short user-facing preface before Input Issues for frontend clarity
        frontendSections.push(`Please address the issues highlighted below:\n`);
        frontendSections.push(issueSection); // ✅ Add to frontend
      }

      // Format additional issues (for both frontend and backend)
      if (additionalIssuesList.length > 0) {
        const additionalLines = additionalIssuesList
          .map((item, index) => {
            let line = `${index + 1}. ${item.description}`;
            if (item.problematicText && item.problematicText.trim()) {
              line += `\n   Problematic Text: "${item.problematicText}"`;
            }
            return line;
          })
          .join("\n\n"); // ✅ Add double line breaks for readability

        const additionalSection = `${additionalLines}`;
        sections.push(additionalSection);
        // Add a short user-facing preface before Additional Issues
        frontendSections.push(
          `\nPlease address the following additional issues:\n`
        );
        frontendSections.push(additionalSection); // ✅ Add to frontend
      }

      // Add "What I Love" section (for both frontend and backend)
      if (evaluationObj.whatILove && evaluationObj.whatILove.length > 0) {
        const lovedItems = evaluationObj.whatILove
          .map((text: string, index: number) => `${index + 1}. ${text}`)
          .join("\n\n"); // ✅ Add double line breaks for readability

        const loveSection = `${lovedItems}`;
        sections.push(
          `${loveSection}\n\nPlease maintain these elements verbatim in the reiteration.`
        );
        // Add a short user-facing preface before the What I Love section
        frontendSections.push(
          `\nI loved the following elements from the initial response; please maintain the following text verbatim:\n`
        );
        frontendSections.push(loveSection); // ✅ Add to frontend
      }

      return {
        fullInstruction: sections.join("\n\n"), // For AI backend
        frontendDisplay: frontendSections.join("\n"), // ✅ For user frontend with single line breaks
      };
    };

    const reiterationData = buildReiteration(evaluation);

    const systemPrompt = `You are an expert prompt engineer providing iterative refinement feedback.

CRITICAL INSTRUCTIONS:
1. This is a REITERATION response, NOT a full prompt regeneration
2. DO NOT output a complete prompt with Role, Method, References, Context, Tone, Format sections
3. Output ONLY specific refinements and corrections based on the feedback provided
4. Focus exclusively on addressing the issues mentioned in the evaluation
5. Keep your response concise and targeted - only what needs to change

WHAT TO OUTPUT:
- Specific improvements for sections with Minor Issues
- Complete rewrites for sections with Major Issues
- Targeted refinements addressing the exact feedback points
- Plain text corrections without full structural sections

WHAT NOT TO OUTPUT:
- Full prompt structure with all sections (Role, Objective, Method, Context, Tone, References, Format)
- Sections that had "No Issues" (these are already perfect)
- Meta-commentary or explanations
- Markdown code fences
- Any content generated FROM the prompt

YOUR RESPONSE FORMAT:
Provide only the corrected/improved parts that address the specific issues. For example:
- If Context has minor issues, provide the improved context details only
- If Objective has major issues, provide the rewritten objective only
- Do not include sections that are already working well`;

    const userMessage = `PREVIOUS AI RESPONSE (for context):
${aiResponse || "Not available"}

REITERATION FEEDBACK:
${reiterationData.fullInstruction}

TASK OBJECTIVE:
${taskObjective || "Not specified"}

---

YOUR TASK:
Based on the reiteration feedback above, provide ONLY the specific improvements needed. Do not regenerate the entire prompt. Focus exclusively on fixing the issues mentioned.`;

    const aiResult = await callGenerateText({
      prompt: `${systemPrompt}\n\n${userMessage}`,
      model: "gpt-4o-mini",
      maxTokens: 800,
    });

    const improved = aiResult?.trim?.() || "";

    // Return the frontend display for user and full instruction for backend
    return NextResponse.json({
      prompt: reiterationData.frontendDisplay, // ✅ Show only user-facing sections on frontend
      aiGeneratedFixes: improved, // AI's specific fixes
      basePrompt: aiResponse || originalPrompt,
      isReiteration: true,
    });
  } catch (err: any) {
    console.error("improve route error", err);
    return NextResponse.json(
      { error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}

// Export the protected POST handler
export const POST = withAuth(improveHandler);
