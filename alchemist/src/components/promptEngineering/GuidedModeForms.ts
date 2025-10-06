type FieldType =
  | "text"
  | "dropdown"
  | "checkbox"
  | "multiselect"
  | "file"
  | "date"
  | "toggle"
  | "link"
  | "upload"
  | "daterange"
  | "number";


interface FieldConfig {
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];
}

interface OptionFieldsConfig {
  [key: string]: {
    group: string;
    fields: FieldConfig[];
  }[];
}

export const optionFieldsConfigData : OptionFieldsConfig = {
  "Sales & Outreach": [
    {
      group: "Prospect Profile",
      fields: [
        { label: "Name", type: "text", placeholder: "Name" },
        { label: "Job Title", type: "text", placeholder: "e.g., VP of Marketing" },
        {
          label: "Seniority",
          type: "dropdown",
          options: ["C-suite", "VP", "Director", "Manager", "IC"],
        },
        {
          label: "Department / Function",
          type: "text",
          placeholder: "Populates Prefilled Roles",
        },
        { label: "Pain / Priority", type: "text" },
        {
          label: "Buying Power / Decision Role",
          type: "dropdown",
          options: ["Decision Maker", "Influencer", "Champion"],
        },
        {
          label: "Past Tech Stack or Vendors",
          type: "dropdown",
          options: ["Prefilled Tech 1", "Prefilled Tech 2"],
        },
        {
          label: "Psychographics",
          type: "dropdown",
          options: ["risk-averse", "innovation-driven", "data-oriented"],
        },
      ],
    },
    {
      group: "Company Context",
      fields: [
        { label: "Company Name", type: "text", placeholder: "Company Name" },
        {
          label: "Industry",
          type: "dropdown",
          options: ["Tech", "Healthcare", "Finance", "Education"],
        },
        {
          label: "Funding Stage",
          type: "dropdown",
          options: ["Bootstrapped", "Pre-seed", "Series A–D", "IPO"],
        },
        {
          label: "Company Size",
          type: "dropdown",
          options: [
            "0-1",
            "2-10",
            "11-50",
            "51-200",
            "201-500",
            "501-1000",
            "1001-10,000",
            "10,000+",
          ],
        },
        {
          label: "Revenue Range",
          type: "dropdown",
          options: ["<1M", "1M-10M", "10M+"],
        },
        {
          label: "Tech Stack",
          type: "multiselect",
          options: ["AWS", "GCP", "Azure"],
        },
        { label: "Growth Signals", type: "text" },
        { label: "Current Initiatives", type: "text" },
        { label: "Competitors", type: "text" },
      ],
    },
    {
      group: "Trigger Data",
      fields: [
        { label: "Recent Activity", type: "text", placeholder: "e.g., LinkedIn post" },
        { label: "Job Change / Promotion / Job Anniversary", type: "checkbox" },
        { label: "New Funding", type: "checkbox" },
        { label: "Tool Adoption", type: "checkbox" },
        { label: "Hiring Spree in X Department", type: "text" },
        { label: "Churned a Competitor", type: "checkbox" },
        { label: "Open Roles", type: "text", placeholder: "gap indicator" },
        { label: "Ad Spend Spike", type: "text" },
        { label: "New Office / Geo Expansion", type: "text" },
      ],
    },
    {
      group: "Message Strategy",
      fields: [
        {
          label: "Problem Framing",
          type: "dropdown",
          options: ["Symptom", "Root Cause"],
        },
        {
          label: "Pain Point",
          type: "dropdown",
          options: ["Explicit", "Implied"],
        },
        {
          label: "Benefit / Value Proposition",
          type: "dropdown",
          options: ["ROI", "Time", "Cost", "Risk"],
        },
        {
          label: "Emotional Trigger",
          type: "dropdown",
          options: ["Fear", "Ambition", "Efficiency", "Control", "Peace of Mind"],
        },
        {
          label: "Tone",
          type: "dropdown",
          options: ["Spartan", "Casual", "Consultative", "Challenger"],
        },
        {
          label: "Temperature",
          type: "dropdown",
          options: ["Low", "Medium", "High"],
        },
        {
          label: "CTA Type",
          type: "dropdown",
          options: ["Book a demo", "Ask a question", "Send a resource"],
        },
        { label: "Objection Handling", type: "text", placeholder: 'e.g., "we’re happy with X"' },
      ],
    },
    {
      group: "Outreach Variables",
      fields: [
        {
          label: "Channel",
          type: "dropdown",
          options: ["Email", "LinkedIn DM", "Voicemail", "SMS", "Video"],
        },
        {
          label: "Length",
          type: "dropdown",
          options: ["Short", "Long"],
        },
        {
          label: "Structure",
          type: "dropdown",
          options: ["Hook-Pain-Insight-CTA", "PAS", "AIDA"],
        },
        { label: "First Line Personalization", type: "text", placeholder: "Custom hook" },
        {
          label: "Media Type",
          type: "dropdown",
          options: ["GIF", "Loom", "Static Image", "Quote"],
        },
        {
          label: "Follow-Up Sequence Position",
          type: "dropdown",
          options: ["1st Touch", "4th Bump"],
        },
      ],
    },
    {
      group: "Reference & Authority Variables",
      fields: [
        { label: "Mutual Connection", type: "checkbox" },
        { label: "Past Interaction", type: "checkbox" },
        // { label: "Case Study Match", type: "file" },
        { label: "Shared Community or Event", type: "text" },
        { label: "Awards / Credibility Signals", type: "text" },
        // { label: "Data Proof", type: "file" },
      ],
    },
    {
      group: "Prompt Engine Logic Variables",
      fields: [
        {
          label: "Prompt Objective",
          type: "dropdown",
          options: ["Generate", "Rewrite", "Personalize", "Summarize"],
        },
        {
          label: "Persona Type",
          type: "dropdown",
          options: ["Curious Buyer", "Skeptic", "Budget-Conscious"],
        },
        {
          label: "Tone Instruction",
          type: "dropdown",
          options: ["Bold", "Witty", "Warm", "Spartan"],
        },
        {
          label: "Confidence Level",
          type: "dropdown",
          options: ["Soft Sell", "Hard Assertive CTA"],
        },
        {
          label: "Prompt Output Format",
          type: "dropdown",
          options: ["Bullet Email", "Conversation Starter", "Full Sequence"],
        },
        { label: "Reply Anticipation", type: "text", placeholder: "Possible objection/reply" },
      ],
    },
  ],

"Marketing":[
  {
    group: "Campaign Goals",
    fields: [
      { label: "Funnel Stage", type: "dropdown", options: ["Awareness", "Consideration", "Conversion", "Retention"] },
      { label: "Campaign Goal", type: "dropdown", options: ["Lead Gen", "Brand Awareness", "Product Launch", "Community Growth"] },
      { label: "Primary KPI + Measurement Window", type: "text" },
      { label: "Guardrail Metric (e.g., Max CPA, Min CTR)", type: "text" },
      { label: "Custom Field", type: "text" }
    ]
  },
  {
    group: "Audience Targeting",
    fields: [
      { label: "Segment Type", type: "dropdown", options: ["Demographic", "Behavioral", "Psychographic", "Firmographic"] },
      { label: "Buyer Journey Stage", type: "dropdown", options: ["Problem-Aware", "Solution-Aware", "Product-Aware"] },
      { label: "ICP Snapshot", type: "text" },
      { label: "Exclusions / Negative Targeting", type: "text" },
      { label: "Custom Field", type: "text" }
    ]
  },
  {
    group: "Channel Strategy",
    fields: [
      { label: "Primary Channel", type: "dropdown", options: ["Email", "Social", "Paid Ads", "SEO", "Events", "Partnerships"] },
      { label: "Multi-Touch Path", type: "dropdown", options: ["Ad → Landing Page → Nurture Sequence", "Email → Social → Ad", "Other"] },
      { label: "Cadence / Frequency", type: "text" },
      { label: "Budget Allocation", type: "text" },
      { label: "Custom Field", type: "text" }
    ]
  },
  {
    group: "Message Positioning",
    fields: [
      { label: "Value Proposition Type", type: "dropdown", options: ["ROI", "Emotional", "Social Proof", "Differentiation"] },
      { label: "Emotional Hook", type: "dropdown", options: ["Urgency", "Curiosity", "Trust", "FOMO", "Aspirational"] },
      { label: "Core Message / Theme", type: "text" },
      { label: "Primary Objection to Overcome", type: "text" },
      { label: "Custom Field", type: "text" }
    ]
  },
  {
    group: "Campaign Variables",
    fields: [
      { label: "Campaign Type", type: "dropdown", options: ["Evergreen", "Seasonal", "Product Launch", "Event-Based"] },
      { label: "Timeline", type: "dropdown", options: ["1 Week", "1 Month", "1 Quarter", "Ongoing"] },
      { label: "Offer / Incentive", type: "text" },
      { label: "Success Criteria / Guardrail Alignment", type: "text" },
      { label: "Custom Field", type: "text" }
    ]
  },
  {
    group: "AI-Generated",
    fields: [
      { label: "Template 1", type: "text" },
      { label: "Template 2", type: "text" },
      { label: "Template 3", type: "text" },
      { label: "Template 4", type: "text" }
    ]
  }
],


"Content Creation": [
  {
    group: "Objective & Strategy",
    fields: [
      { label: "Goal Type", type: "dropdown", options: ["Brand Awareness", "Lead Generation", "Engagement", "Conversion"] },
      { label: "Content Type", type: "dropdown", options: ["Social Post", "Blog", "Newsletter", "Podcast", "Video"] },
      { label: "Primary Success Metric", type: "text" },
      { label: "Desired Audience Action", type: "text" },
      { label: "Custom Field", type: "text" }
    ]
  },
  {
    group: "Audience Targeting",
    fields: [
      { label: "Audience Profile Type", type: "dropdown", options: ["Demographic", "Behavioral", "Psychographic", "Firmographic"] },
      { label: "Awareness Level", type: "dropdown", options: ["Problem-Aware", "Solution-Aware", "Product-Aware"] },
      { label: "ICP Snapshot / Audience Description", type: "text" },
      { label: "Consumption Environment or Mood", type: "text" },
      { label: "Custom Field", type: "text" }
    ]
  },
  {
    group: "Creative Direction",
    fields: [
      { label: "Content Framework", type: "dropdown", options: ["How-To", "Storytelling", "Listicle", "Case Study"] },
      { label: "Length Expectation", type: "dropdown", options: ["Short", "Medium", "Long", "Series"] },
      { label: "Hook Type", type: "dropdown", options: ["Curiosity", "Data-Driven", "Emotional", "Contrarian"] },
      { label: "Call-to-Action Placement & Style", type: "dropdown", options: ["Front", "Mid", "End", "Integrated"] },
      { label: "Custom Field", type: "text" }
    ]
  },
  {
    group: "Message Positioning",
    fields: [
      { label: "Angle Type", type: "dropdown", options: ["Authority", "Relatability", "Aspirational", "Humor", "Story-Driven"] },
      { label: "Proof Device", type: "dropdown", options: ["Testimonial", "Data Point", "Social Proof", "Case Study"] },
      { label: "Core Message / Key Idea", type: "text" },
      { label: "Reader Takeaway", type: "text" },
      { label: "Custom Field", type: "text" }
    ]
  },
  {
    group: "Channel & Distribution",
    fields: [
      { label: "Primary Channel", type: "dropdown", options: ["Instagram", "LinkedIn", "YouTube", "Blog", "Email", "Podcast"] },
      { label: "Repurposing Option", type: "dropdown", options: ["Carousel", "Reel", "Thread", "Clip", "Newsletter Segment"] },
      { label: "Discovery Anchor", type: "text" },
      { label: "Format Constraints", type: "text" },
      { label: "Custom Field", type: "text" }
    ]
  },
  {
    group: "AI-Generated",
    fields: [
      { label: "Template 1", type: "text" },
      { label: "Template 2", type: "text" },
      { label: "Template 3", type: "text" },
      { label: "Template 4", type: "text" }
    ]
  }
],



//   "Customer Support & Service": [
//     {
//       group: "Customer Profile",
//       fields: [
//         { label: "Name", type: "text" },
//         { label: "Account ID / Customer ID", type: "text" },
//         {
//           label: "Plan / Tier",
//           type: "dropdown",
//           options: ["Free", "Pro", "Enterprise"],
//         },
//         {
//           label: "Tenure",
//           type: "dropdown",
//           options: ["New Customer", "Loyal", "Churn Risk"],
//         },
//         {
//           label: "Region / Time Zone",
//           type: "dropdown",
//           options: ["US", "EU", "Asia", "Other"],
//         },
//         {
//           label: "Language Preference",
//           type: "dropdown",
//           options: ["English", "Spanish", "French", "Other"],
//         },
//         { label: "Support History", type: "text" },
//         {
//           label: "Sentiment Score",
//           type: "dropdown",
//           options: ["Positive", "Neutral", "Frustrated", "Angry"],
//         },
//         // { label: "NPS Score / CSAT History", type: "number" },
//         { label: "Purchase History / Product Usage", type: "text" },
//       ],
//     },
//     {
//       group: "Issue Context",
//       fields: [
//         {
//           label: "Ticket Type",
//           type: "dropdown",
//           options: ["Bug", "Billing", "Feature Request", "Other"],
//         },
//         {
//           label: "Priority Level",
//           type: "dropdown",
//           options: ["Urgent", "Normal", "Low"],
//         },
//         {
//           label: "Channel Origin",
//           type: "dropdown",
//           options: ["Email", "Chat", "Phone", "Other"],
//         },
//         {
//           label: "Submission Time",
//           type: "dropdown",
//           options: ["Business Hours", "After Hours"],
//         },
//         { label: "Device / Platform", type: "text" },
//         { label: "Browser / App Version", type: "text" },
//         {
//           label: "Issue Reproducibility",
//           type: "dropdown",
//           options: ["One-off", "Recurring", "Edge Case"],
//         },
//         { label: "Time Since Last Response", type: "text" },
//         {
//           label: "Escalation Status",
//           type: "dropdown",
//           options: ["Level 1", "Level 2", "Other"],
//         },
//       ],
//     },
//     {
//       group: "Response Logic",
//       fields: [
//         {
//           label: "Response Goal",
//           type: "dropdown",
//           options: ["Inform", "Resolve", "Apologize", "Escalate", "Confirm", "Delay"],
//         },
//         {
//           label: "Tone",
//           type: "dropdown",
//           options: ["Empathetic", "Professional", "Playful", "Assertive", "Apologetic"],
//         },
//         { label: "Agent Role Prompt", type: "text" },
//         {
//           label: "Personalization Level",
//           type: "dropdown",
//           options: ["Low", "Medium", "High"],
//         },
//         { label: "Knowledge Base Context", type: "link" },
//         {
//           label: "Expected Customer Reaction",
//           type: "dropdown",
//           options: ["Positive", "Neutral", "Negative"],
//         },
//         {
//           label: "Required Legal Language",
//           type: "dropdown",
//           options: ["Yes", "No"],
//         },
//       ],
//     },
//     {
//       group: "Support Content",
//       fields: [
//         { label: "Product Feature Mentioned", type: "text" },
//         { label: "Documentation Link / Article", type: "link" },
//         { label: "Troubleshooting Steps", type: "text" },
//         { label: "Common Resolutions", type: "text" },
//         {
//           label: "Template Type",
//           type: "dropdown",
//           options: ["First Response", "Follow-up", "Closure", "Apology"],
//         },
//         { label: "Embedded Media", type: "upload" },
//         { label: "Multi-lingual Output", type: "toggle" },
//       ],
//     },
//     {
//       group: "Billing / Payment",
//       fields: [
//         { label: "Invoice Number", type: "text" },
//         { label: "Payment Method", type: "text" },
//         { label: "Last Payment Date", type: "date" },
//         { label: "Subscription Start / End", type: "daterange" },
//         { label: "Discount Code / Promo Applied", type: "text" },
//         { label: "Refund Eligibility", type: "toggle" },
//         { label: "Trial Period Status", type: "toggle" },
//         { label: "Past Disputes", type: "text" },
//       ],
//     },
//     {
//       group: "System & Workflow",
//       fields: [
//         {
//           label: "Support Platform Used",
//           type: "dropdown",
//           options: ["Zendesk", "Intercom", "Freshdesk", "HelpScout"],
//         },
//         { label: "SLAs", type: "text" },
//         { label: "Agent Handling It", type: "text" },
//         {
//           label: "Tags / Categories",
//           type: "multiselect",
//           options: ["Billing", "Technical", "Feature Request", "Bug"],
//         },
//         {
//           label: "Workflow Stage",
//           type: "dropdown",
//           options: ["Open", "Pending", "Solved", "Other"],
//         },
//         { label: "Follow-up Trigger", type: "toggle" },
//         { label: "Escalation Path", type: "text" },
//       ],
//     },
//     {
//       group: "Analytics & Feedback",
//       fields: [
//         { label: "Resolution Time", type: "number" },
//         { label: "Time to First Response", type: "number" },
//         { label: "Reopen Count", type: "number" },
//         { label: "Agent Rating", type: "number" },
//         { label: "Customer Feedback", type: "text" },
//         { label: "Recurring Issue Flag", type: "toggle" },
//         { label: "Support Volume Trends", type: "text" },
//         { label: "Response Tone", type: "text" },
//       ],
//     },
//     {
//       group: "Agent Training Prompts (Meta)",
//       fields: [
//         { label: "System Message Role", type: "text", placeholder: 'e.g., "You are a friendly, empathetic support rep for a B2B SaaS."' },
//         { label: "Few-shot Prompts", type: "text", placeholder: "e.g., frustrated refund, confused login" },
//         {
//           label: "Output Format",
//           type: "dropdown",
//           options: ["Short Email", "Long-form", "FAQ"],
//         },
//         { label: "Temperature Control", type: "text", placeholder: "tone-sensitive generation" },
//         { label: "Do/Don't", type: "text", placeholder: "e.g., use empathy, avoid technical jargon" },
//         {
//           label: "Persona Modes",
//           type: "dropdown",
//           options: ["Novice", "Technical", "Power User"],
//         },
//       ],
//     },
//   ],

 

//   "Operations & Workflow Management" : [
//   {
//     group: "Team & Role Context",
//     fields: [
//       { label: "Team or Department Name", type: "text", placeholder: "e.g., IT Ops, BizOps, People, RevOps" },
//       { label: "Function Focus", type: "dropdown", options: ["process design", "automation", "vendor mgmt", "reporting"] },
//       { label: "Org Type", type: "dropdown", options: ["startup", "scale-up", "enterprise", "agency", "nonprofit"] },
//       { label: "Stakeholder Level", type: "dropdown", options: ["C-suite", "VP", "Director", "Team Lead", "IC"] },
//       { label: "Process Owner", type: "text", placeholder: "Name or role" },
//       { label: "Cross-Functional Dependencies", type: "text", placeholder: "e.g., works with Finance, HR, Legal" }
//     ]
//   },
//   {
//     group: "Workflow Objective",
//     fields: [
//       { label: "Prompt Use Case", type: "dropdown", options: ["generate SOP", "summarize process", "automate task", "QA draft", "review doc"] },
//       { label: "Target Outcome", type: "dropdown", options: ["efficiency", "consistency", "compliance", "clarity"] },
//       { label: "Workflow Type", type: "text", placeholder: "e.g., onboarding, procurement, content publishing" },
//       { label: "Current Tools Involved", type: "dropdown", options: ["Airtable", "Notion", "Slack", "Zapier", "ClickUp"] },
//       { label: "Known Bottlenecks or Gaps", type: "text" },
//       { label: "Cross-Tool Automation Required", type: "checkbox" },
//       { label: "Recurrence", type: "dropdown", options: ["one-off", "daily", "weekly", "monthly", "ad-hoc"] }
//     ]
//   },
//   {
//     group: "Data & Process Inputs",
//     fields: [
//       { label: "Input Format", type: "dropdown", options: ["meeting notes", "spreadsheet", "system log", "checklist", "form response"] },
//       { label: "Source Document or System", type: "text", placeholder: "URL or file reference (optional)" },
//       { label: "Process Clarity Level", type: "dropdown", options: ["defined", "partially mapped", "undocumented"] },
//       { label: "Includes Metrics or KPIs", type: "checkbox" },
//       { label: "Key Inputs or Rules", type: "text" },
//       { label: "Known Failure Points / Audit Flags", type: "text" },
//       { label: "Collaboration Need", type: "dropdown", options: ["solo", "multi-team", "async", "real-time"] }
//     ]
//   },
//   {
//     group: "Framing Logic",
//     fields: [
//       { label: "Prompt Goal", type: "dropdown", options: ["summarize", "improve", "document", "analyze", "simplify"] },
//       { label: "Task Type", type: "dropdown", options: ["admin", "reporting", "systems", "QA", "handoff", "training"] },
//       { label: "Language Style", type: "dropdown", options: ["direct", "instructional", "visual", "step-by-step"] },
//       { label: "Tone", type: "dropdown", options: ["compliance-heavy", "collaborative", "informal", "technical", "consultative"] },
//       { label: "Required Output Format", type: "text", placeholder: "e.g., SOP, checklist, dashboard draft" },
//       { label: "Audience Type", type: "dropdown", options: ["ICs", "team leads", "execs", "cross-functional teams"] }
//     ]
//   },
//   {
//     group: "Operational Sensitivity",
//     fields: [
//       { label: "Confidentiality Level", type: "dropdown", options: ["public", "internal", "sensitive", "legal/audit"] },
//       { label: "Security/Compliance Relevance", type: "checkbox" },
//       { label: "Requires Legal/HR Approval", type: "checkbox" },
//       { label: "Stakeholder Risks or Constraints", type: "text" },
//       { label: "Time-Sensitive Task", type: "checkbox" },
//       { label: "Version Control Notes or Ownership Flags", type: "text" }
//     ]
//   },
//   {
//     group: "Output Delivery Format",
//     fields: [
//       { label: "Output Format", type: "dropdown", options: ["SOP doc", "wiki entry", "Slack message", "form instructions", "task brief"] },
//       { label: "Output Length", type: "dropdown", options: ["one-pager", "overview", "full process"] },
//       { label: "Visual Add-Ons", type: "dropdown", options: ["flowchart", "decision tree", "checklist", "diagram"] },
//       { label: "Platform Compatibility", type: "dropdown", options: ["Notion", "Confluence", "Slide", "PDF", "Markdown"] },
//       { label: "Export / Integration Preference", type: "text" }
//     ]
//   },
//   {
//     group: "Reference & Alignment",
//     fields: [
//       { label: "Existing SOP or Template", type: "text", placeholder: "File link or text" },
//       { label: "Linked Workflow or Tool", type: "text", placeholder: "e.g., Zapier flow, Jira board" },
//       { label: "Owner of Reference System", type: "text" },
//       { label: "Desired Best Practice Source", type: "dropdown", options: ["industry standard", "internal doc", "external template"] },
//       { label: "Benchmark or Comparison Requested", type: "checkbox" },
//       { label: "Style Match", type: "text", placeholder: "Match tone of X doc or team" }
//     ]
//   },
//   {
//     group: "Prompt Engine Logic Variables",
//     fields: [
//       { label: "Prompt Objective", type: "dropdown", options: ["generate", "rewrite", "improve", "QA", "visualize"] },
//       { label: "Confidence Level", type: "dropdown", options: ["strictly defined", "flexible suggestion"] },
//       { label: "Tone Instruction", type: "dropdown", options: ["formal", "collaborative", "plain language", "detailed"] },
//       { label: "Output Format", type: "dropdown", options: ["step-by-step", "chart", "summary", "checklist", "table"] },
//       { label: "Intended Action After Output", type: "text", placeholder: "publish, delegate, review, automate" }
//     ]
//   }
//   ],

//   "Audience & Role Context" : [
//   {
//     group: "Audience & Role Context",
//     fields: [
//       { label: "Team or Department", type: "text", placeholder: "e.g., Sales, Product, Customer Success, HR" },
//       { label: "Audience Type", type: "dropdown", options: ["new hire", "IC", "manager", "executive", "cross-functional"] },
//       { label: "Communication Style", type: "dropdown", options: ["directive", "collaborative", "informative", "motivational"] },
//       { label: "Sender Perspective", type: "text", placeholder: "e.g., People Ops, Enablement Lead, CX Director" },
//       { label: "Use Case", type: "dropdown", options: ["training", "announcement", "documentation", "culture alignment", "async update"] }
//     ]
//   },
//   {
//     group: "Objective & Learning Goal",
//     fields: [
//       { label: "Topic or Initiative", type: "text", placeholder: "e.g., product update, onboarding flow, values rollout" },
//       { label: "Training Type", type: "dropdown", options: ["SOP", "FAQ", "onboarding", "how-to guide", "video script", "live deck"] },
//       { label: "Intended Behavior or Understanding Shift", type: "text" },
//       { label: "Learning Goal Format", type: "dropdown", options: ["step-by-step", "story-based", "use-case driven", "compliance-focused"] },
//       { label: "Key Takeaways or Must-Know Info", type: "text" },
//       { label: "Include Quiz or Knowledge Check", type: "checkbox" }
//     ]
//   },
//   {
//     group: "Contextual Inputs",
//     fields: [
//       { label: "Source Material", type: "text", placeholder: "slide, doc, product brief, policy draft" },
//       { label: "Content Maturity", type: "dropdown", options: ["draft", "final", "outdated", "partial"] },
//       { label: "Includes Metrics / KPIs", type: "checkbox" },
//       { label: "Existing Confusions or Misalignment", type: "text" },
//       { label: "Stakeholder Feedback / Concerns to Address", type: "text" },
//       { label: "Systems or Tools Mentioned", type: "text", placeholder: "Slack, Notion, LMS, CRM, etc." }
//     ]
//   },
//   {
//     group: "Communication Framing",
//     fields: [
//       { label: "Tone", type: "dropdown", options: ["warm", "clear", "professional", "culture-first", "humorous"] },
//       { label: "Instruction Style", type: "dropdown", options: ["bullet-pointed", "FAQ", "visual-first", "step-by-step"] },
//       { label: "Format Type", type: "dropdown", options: ["memo", "async update", "script", "announcement", "onboarding flow", "deck outline"] },
//       { label: "Internal CTA or Behavior Prompt", type: "text", placeholder: "e.g., read by Friday, click to acknowledge, follow-up training required" },
//       { label: "Comms Channel", type: "dropdown", options: ["email", "Slack", "Notion", "LMS", "video", "doc"] }
//     ]
//   },
//   {
//     group: "Delivery Details",
//     fields: [
//       { label: "Length Preference", type: "dropdown", options: ["short-form", "overview", "full deep-dive"] },
//       { label: "Media Element", type: "dropdown", options: ["GIF", "Loom", "embedded link", "diagram", "quiz embed"] },
//       { label: "Timing / Cadence", type: "dropdown", options: ["one-time", "weekly", "pre-launch", "recurring reminder"] },
//       { label: "Follow-up Plan", type: "text", placeholder: "survey, Slack thread, team sync, manager 1:1" },
//       { label: "Output Format", type: "dropdown", options: ["Notion page", "Google Doc", "Slide deck", "internal post", "email draft"] }
//     ]
//   },
//   {
//     group: "Prompt Engine Logic Variables",
//     fields: [
//       { label: "Prompt Objective", type: "dropdown", options: ["summarize", "rewrite", "create", "convert format", "personalize"] },
//       { label: "Persona Style", type: "dropdown", options: ["first-time learner", "overwhelmed reader", "team leader", "skeptical stakeholder"] },
//       { label: "Confidence Level", type: "dropdown", options: ["assertive", "nurturing", "passive", "neutral"] },
//       { label: "Instruction Clarity", type: "dropdown", options: ["high-detail", "brief", "scaffolded", "with analogies"] },
//       { label: "Anticipated Confusion or Objection", type: "text" },
//       { label: "Output Format", type: "dropdown", options: ["FAQ", "checklist", "email", "slide", "doc", "async script"] }
//     ]
//   }
//   ],

//   "Other (Custom or Experimental Use)" : [
//   {
//     group: "User Intent & Context",
//     fields: [
//       { label: "Describe the Goal or Use Case", type: "text", placeholder: "e.g., experiment, custom logic, brainstorm, niche workflow" },
//       { label: "Output Purpose", type: "dropdown", options: ["ideation", "reflection", "automation", "documentation", "exploration"] },
//       { label: "User Type", type: "dropdown", options: ["freelancer", "researcher", "founder", "educator", "hobbyist", "unknown"] },
//       { label: "Real-World Application or Scenario", type: "text" },
//       { label: "Outcome Priority", type: "dropdown", options: ["clarity", "speed", "creativity", "technical precision", "emotional depth"] }
//     ]
//   },
//   {
//     group: "Input & Reference Layer",
//     fields: [
//       { label: "Source Material", type: "text", placeholder: "link, file, example, rough draft, brief" },
//       { label: "Input Structure", type: "dropdown", options: ["unstructured notes", "idea map", "structured brief", "question list"] },
//       { label: "Keywords, Themes, or Entities to Include", type: "text" },
//       { label: "Required Fidelity", type: "dropdown", options: ["rough sketch", "polished output"] },
//       { label: "Includes Technical/Creative Blend", type: "checkbox" },
//       { label: "Optional Constraints or Guardrails", type: "text", placeholder: "e.g., length limit, no AI-sounding phrases" }
//     ]
//   },
//   {
//     group: "Prompt Strategy Layer",
//     fields: [
//       { label: "Prompt Type", type: "dropdown", options: ["generate", "transform", "critique", "stylize", "summarize", "remix"] },
//       { label: "Instruction Style", type: "dropdown", options: ["directive", "open-ended", "chain-of-thought", "exploratory"] },
//       { label: "Output Format", type: "dropdown", options: ["email", "poem", "explainer", "joke", "prototype", "question set", "combo"] },
//       { label: "Creativity Temperature", type: "dropdown", options: ["neutral", "flexible", "experimental", "unhinged"] },
//       { label: "Audience Clarity", type: "dropdown", options: ["just for me", "for review", "for clients", "for public"] },
//       { label: "Post-Output Action", type: "text", placeholder: "e.g., publish, discuss, test, discard, iterate" }
//     ]
//   },
//   {
//     group: "Output Delivery & Framing",
//     fields: [
//       { label: "Channel / Medium", type: "dropdown", options: ["doc", "note", "tweet", "blog", "DM", "none"] },
//       { label: "Tone", type: "dropdown", options: ["neutral", "playful", "poetic", "assertive", "cryptic", "branded"] },
//       { label: "Structure Preference", type: "dropdown", options: ["bullets", "paragraphs", "dialogue", "visual-first", "hybrid"] },
//       { label: "First Line or Opening Hook", type: "text" },
//       { label: "Add-On Format", type: "dropdown", options: ["meme", "quote", "stat", "analogy", "metaphor", "challenge prompt"] }
//     ]
//   },
//   {
//     group: "Prompt Engine Logic Variables",
//     fields: [
//       { label: "Prompt Objective", type: "dropdown", options: ["ideate", "generate", "reframe", "extend", "debug", "contrast"] },
//       { label: "Perspective or Voice", type: "dropdown", options: ["AI assistant", "philosopher", "critic", "fan", "founder", "wildcard"] },
//       { label: "Risk Level", type: "dropdown", options: ["safe", "edgy", "absurd", "reflective"] },
//       { label: "What Should the Output Feel Like?", type: "text" }
//     ]
//   }
// ],


};




//  "Marketing and Content Creation":[
//   {
//     group: "Audience & Persona Variables",
//     fields: [
//       { label: "Audience Segment", type: "text", placeholder: "e.g., Gen Z founders, SaaS CMOs" },
//       { label: "Content Goal", type: "text", placeholder: "e.g., brand awareness, lead gen" },
//       { label: "Funnel Stage", type: "dropdown", options: ["TOFU", "MOFU", "BOFU"] },
//       { label: "Persona Motivation", type: "dropdown", options: ["status", "efficiency", "impact", "community", "creativity"] },
//       { label: "Buying Intent", type: "dropdown", options: ["low", "warm", "high"] },
//       { label: "Pain / Obsession / Curiosity Point", type: "text" },
//       { label: "Emotional Levers", type: "dropdown", options: ["inspiration", "validation", "FOMO", "clarity", "fear", "trust"] },
//       { label: "Tone / Voice Match", type: "dropdown", options: ["playful", "expert", "empathetic", "disruptive", "hype"] }
//     ]
//   },
//   {
//     group: "Brand & Product Context",
//     fields: [
//       { label: "Company Name", type: "text" },
//       { label: "Industry / Niche", type: "dropdown", options: [] },
//       { label: "Product or Offer (headline version)", type: "text" },
//       { label: "Offer Type", type: "dropdown", options: ["SaaS", "course", "service", "physical product", "community"] },
//       { label: "Current Positioning", type: "dropdown", options: ["premium", "affordable", "cutting-edge", "friendly"] },
//       { label: "Value Proposition or Big Idea", type: "text" },
//       { label: "Core Differentiator", type: "text" },
//       { label: "Call to Action", type: "text" }
//     ]
//   },
//   {
//     group: "Strategy & Channel Inputs",
//     fields: [
//       { label: "Content Type", type: "dropdown", options: ["social post", "blog", "email", "ad", "video script", "landing page"] },
//       { label: "Distribution Channel", type: "dropdown", options: ["LinkedIn", "Instagram", "Twitter", "TikTok", "Email", "Blog"] },
//       { label: "Content Framework", type: "dropdown", options: ["story-driven", "listicle", "insight drop", "how-to", "PSA"] },
//       { label: "Post Format", type: "dropdown", options: ["carousel", "thread", "meme", "static visual", "infographic", "reel"] },
//       { label: "Campaign Style", type: "dropdown", options: ["evergreen", "seasonal", "launch", "teaser"] },
//       { label: "Publishing Cadence / Time Sensitivity", type: "text" },
//       { label: "Repurpose from Existing Asset", type: "checkbox" },
//       { label: "Source Inspiration", type: "text", placeholder: "URL, file link, or paste copy" }
//     ]
//   },
//   {
//     group: "Message Framing Logic",
//     fields: [
//       { label: "Narrative Device", type: "dropdown", options: ["origin story", "testimonial", "hot take", "before/after", "analogy"] },
//       { label: "Hook Style", type: "dropdown", options: ["question", "stat", "polarizing claim", "pain visual", "curiosity opener"] },
//       { label: "CTA Type", type: "dropdown", options: ["comment bait", "link click", "save/share", "reply prompt"] },
//       { label: "Persuasion Focus", type: "dropdown", options: ["authority", "likability", "logic", "scarcity", "novelty"] },
//       { label: "Tone", type: "dropdown", options: ["spartan", "magnetic", "ironic", "poetic", "satirical", "warm"] },
//       { label: "Temperature", type: "dropdown", options: ["safe", "edgy", "controversial", "unfiltered", "emotional"] },
//       { label: "Objection Reframe", type: "text", placeholder: "e.g., 'But won’t this take too long?'" }
//     ]
//   },
//   {
//     group: "Audience Relevance & SEO",
//     fields: [
//       { label: "Keyword Focus", type: "dropdown", options: ["short-tail", "long-tail", "question-based", "branded"] },
//       { label: "Audience Language or Slang", type: "text" },
//       { label: "Competitor Mentions or Comparisons", type: "text" },
//       { label: "Cultural Reference or Trend Tie-In", type: "text" },
//       { label: "Community Hashtags / Tag Targets", type: "text" }
//     ]
//   },
//   {
//     group: "Delivery Format",
//     fields: [
//       { label: "Output Format", type: "dropdown", options: ["tweet thread", "IG carousel", "blog post", "cold ad", "landing copy", "CTA headline", "story script"] },
//       { label: "Length Preference", type: "dropdown", options: ["1-liner", "short form", "mid", "long form"] },
//       { label: "Visual Element Type", type: "dropdown", options: ["meme", "quote image", "reel idea", "infographic", "stat visual"] },
//       { label: "Opening Line", type: "text" },
//       { label: "Series Context", type: "dropdown", options: ["standalone", "part 1 of 3", "daily drop"] },
//       { label: "Platform-Specific Constraint", type: "dropdown", options: ["character limit", "hashtag format", "caption flow"] }
//     ]
//   },
//   {
//     group: "Reference & Authority Signals",
//     fields: [
//       { label: "Social Proof Mention", type: "checkbox" },
//       { label: "Testimonial, Review, or Quote", type: "text" },
//       { label: "Named Source or Stat", type: "text" },
//       { label: "Case Study / Content Inspiration", type: "text" },
//       { label: "Community Mention or Influencer Reference", type: "checkbox" },
//       { label: "Industry Event / Cultural Tie-In", type: "text" }
//     ]
//   },
//   {
//     group: "Prompt Engine Logic Variables",
//     fields: [
//       { label: "Prompt Objective", type: "dropdown", options: ["generate", "rewrite", "personalize", "ideate", "summarize"] },
//       { label: "Confidence Level", type: "dropdown", options: ["assertive", "subtle", "bold"] },
//       { label: "Tone Instruction", type: "dropdown", options: ["empowering", "snarky", "smart", "educational"] },
//       { label: "Persona Archetype", type: "dropdown", options: ["visionary", "skeptic", "builder", "trendspotter"] },
//       { label: "Output Format", type: "dropdown", options: ["social caption", "script", "email", "thread", "headline options"] },
//       { label: "Expected Reaction or Engagement Type", type: "text", placeholder: "comment, click, save, follow" }
//     ]
//   }
//   ],