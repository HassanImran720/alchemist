// Format Templates for different output types
// These templates provide structured formats for generating specific types of content

export interface FormatTemplate {
  name: string;
  key: string;
  structure: string;
  description: string;
}

export const FORMAT_TEMPLATES: Record<string, FormatTemplate> = {
  "email": {
    name: "Email",
    key: "email",
    description: "Professional email with clear structure",
    structure: `
**Email Structure:**
Subject Line: [Clear, specific subject]
Greeting: [Personalized, concise greeting]
Main Point: [Single sentence summarizing the purpose]
Key Points:
- [Point 1]
- [Point 2]
- [Point 3]
Next Steps: [Direct CTA or action request]
Closing: [Friendly, professional sign-off]
    `.trim()
  },

  "blog": {
    name: "Blog Post",
    key: "blog",
    description: "SEO-friendly blog post with clear sections",
    structure: `
**Blog Post Structure:**
Title: [Clear, SEO-friendly headline]
Introduction: [1–2 sentence hook stating the purpose]
Key Sections:
- [Subheading 1]: [1–2 sentence insight or data point]
- [Subheading 2]: [1–2 sentence insight or data point]
- [Subheading 3]: [1–2 sentence insight or data point]
Conclusion: [1 sentence summary + CTA or takeaway]
    `.trim()
  },

  "twitter-post": {
    name: "Twitter Thread",
    key: "twitter-post",
    description: "Twitter thread with engaging hook and clear points",
    structure: `
**Twitter Thread Structure:**
Tweet 1 (Hook): [Grab attention in <280 characters]
Tweets 2–5:
- [Key Point 1]
- [Key Point 2]
- [Key Point 3]
- [Optional Bonus Tip or CTA]
Final Tweet: [Wrap-up + Call to Action or Question]
    `.trim()
  },

  "script": {
    name: "Script",
    key: "script",
    description: "Script format for video or presentation",
    structure: `
**Script Structure:**
[Opening Line]: [Hook the audience]
[Scene or Segment 1]: [Brief dialogue or narration]
[Scene or Segment 2]: [Next point or explanation]
[Closing Line]: [Memorable closing statement or CTA]
    `.trim()
  },

  "academic-essay": {
    name: "Academic Essay",
    key: "academic-essay",
    description: "Formal academic essay with thesis and arguments",
    structure: `
**Academic Essay Structure:**
Title: [Formal title reflecting thesis]
Introduction: [Thesis statement, no fluff]
Main Arguments:
- [Argument 1]: [1–2 supporting facts or citations]
- [Argument 2]: [1–2 supporting facts or citations]
- [Argument 3]: [1–2 supporting facts or citations]
Conclusion: [Restate thesis + 1-sentence implication]
Sources: [List of references, minimal formatting]
    `.trim()
  },

  "social-media-post": {
    name: "Social Media Post",
    key: "social-media-post",
    description: "Engaging social media post with hook and CTA",
    structure: `
**Social Media Post Structure:**
Hook: [1 sentence attention grabber]
Main Point: [1–2 sentences of insight or message]
CTA: [Engagement prompt, question, or action request]
Hashtags: #[Relevant] #[Minimal] #[Focused]
    `.trim()
  },

  "presentation": {
    name: "Presentation",
    key: "presentation",
    description: "Structured presentation with clear flow",
    structure: `
**Presentation Structure:**
Title Slide: [Presentation title + subtitle/author]
Introduction: [1–2 sentence overview of purpose or theme]
Key Messages:
- [Message 1]: [Brief supporting detail or phrase]
- [Message 2]: [Brief supporting detail or phrase]
- [Message 3]: [Brief supporting detail or phrase]
Supporting Evidence:
- [Data point 1]: [Brief context]
- [Data point 2]: [Brief context]
- [Data point 3]: [Brief context]
Implications:
- [Implication 1]: [Why it matters]
- [Implication 2]: [Why it matters]
Next Steps:
- [Action 1]: [Owner or timeline]
- [Action 2]: [Owner or timeline]
Closing: [Memorable 1–2 sentence summary or CTA]
Sources: [URLs, citations, or brief references]
    `.trim()
  },

  "report": {
    name: "Report",
    key: "report",
    description: "Professional report with findings and recommendations",
    structure: `
**Report Structure:**
Title: [Report title + subtitle/author]
Executive Summary: [1–2 sentence overview of purpose, findings, and recommendations]
Key Findings:
- [Finding 1]: [Brief supporting detail]
- [Finding 2]: [Brief supporting detail]
- [Finding 3]: [Brief supporting detail]
Analysis & Insights:
- [Insight 1]: [Why it matters]
- [Insight 2]: [Why it matters]
- [Insight 3]: [Why it matters]
Opportunity Gaps:
- [Gap 1]: [Brief description]
- [Gap 2]: [Brief description]
Recommendations:
- [Action 1]: [Impact + feasibility + rationale]
- [Action 2]: [Impact + feasibility + rationale]
Conclusion: [1–2 sentence summary or next step direction]
Sources: [URLs, citations, or brief references]
    `.trim()
  },

  "landing-page": {
    name: "Checklist/SOP",
    key: "landing-page",
    description: "Step-by-step checklist or standard operating procedure",
    structure: `
**Checklist/SOP Structure:**
Title: [Name of process or checklist]
Objective: [1–2 sentence description of the intended outcome]
Steps:
- Step 1: [Action] → [Expected result]
- Step 2: [Action] → [Expected result]
- Step 3: [Action] → [Expected result]
- Step 4: [Action] → [Expected result]
Exceptions/Notes:
- [Condition 1]: [Adjustment or alternative step]
- [Condition 2]: [Adjustment or alternative step]
Verification:
- [Check 1]: [How to confirm completion]
- [Check 2]: [How to confirm completion]
Owner/Timeline: [Person or role responsible + due date]
    `.trim()
  },

  "product-description": {
    name: "SEO Keywords",
    key: "product-description",
    description: "SEO keyword strategy and content optimization",
    structure: `
**SEO Keywords Structure:**
Target Keyword(s): [Primary keyword + secondary variations]
Search Intent: [Informational / Navigational / Transactional / Commercial]
Meta Title: [≤ 60 characters, keyword included]
Meta Description: [≤ 160 characters, keyword included]
Headings:
- H1: [Primary keyword phrase]
- H2: [Supporting keyword phrase]
- H3: [Long-tail variation or related query]
Content Placement:
- [Intro]: [Where and how to use keyword]
- [Body]: [Density / distribution strategy]
- [Conclusion]: [Closing keyword use + CTA]
Internal Links: [Relevant internal pages / anchors]
External References: [High-authority sources or citations]
    `.trim()
  }
};

// Helper function to get format template by key
export function getFormatTemplate(formatKey: string): FormatTemplate | null {
  return FORMAT_TEMPLATES[formatKey] || null;
}

// Helper function to get all available format options
export function getAvailableFormats(): FormatTemplate[] {
  return Object.values(FORMAT_TEMPLATES);
}

// Helper function to build format-specific instruction
export function buildFormatInstruction(formatKey: string): string {
  const template = getFormatTemplate(formatKey);
  if (!template) {
    return "Please format the output appropriately for the intended use case.";
  }
  
  return `Please structure your response using the following ${template.name} format:\n\n${template.structure}\n\nEnsure each section is clearly addressed and follows the specified structure.`;
}
