// type FieldType =
//   | "text"
//   | "dropdown"
//   | "checkbox"
//   | "multiselect"
//   | "file"
//   | "date"
//   | "toggle"
//   | "link"
//   | "upload"
//   | "daterange"
//   | "number";


// interface FieldConfig {
//   label: string;
//   type: FieldType;
//   placeholder?: string;
//   options?: string[];
// }

// interface OptionFieldsConfig {
//   [key: string]: {
//     group: string;
//     fields: FieldConfig[];
//   }[];
// }

// export const optionFieldsConfigData : OptionFieldsConfig = {
//   "Sales & Outreach": [
//     {
//       group: "Prospect Profile",
//       fields: [
//         { label: "Name", type: "text", placeholder: "Name" },
//         { label: "Job Title", type: "text", placeholder: "e.g., VP of Marketing" },
//         {
//           label: "Seniority",
//           type: "dropdown",
//           options: ["C-suite", "VP", "Director", "Manager", "IC"],
//         },
//         {
//           label: "Department / Function",
//           type: "text",
//           placeholder: "Populates Prefilled Roles",
//         },
//         { label: "Pain / Priority", type: "text" },
//         {
//           label: "Buying Power / Decision Role",
//           type: "dropdown",
//           options: ["Decision Maker", "Influencer", "Champion"],
//         },
//         {
//           label: "Past Tech Stack or Vendors",
//           type: "dropdown",
//           options: ["Prefilled Tech 1", "Prefilled Tech 2"],
//         },
//         {
//           label: "Psychographics",
//           type: "dropdown",
//           options: ["risk-averse", "innovation-driven", "data-oriented"],
//         },
//       ],
//     },
//     {
//       group: "Company Context",
//       fields: [
//         { label: "Company Name", type: "text", placeholder: "Company Name" },
//         {
//           label: "Industry",
//           type: "dropdown",
//           options: ["Tech", "Healthcare", "Finance", "Education"],
//         },
//         {
//           label: "Funding Stage",
//           type: "dropdown",
//           options: ["Bootstrapped", "Pre-seed", "Series A–D", "IPO"],
//         },
//         {
//           label: "Company Size",
//           type: "dropdown",
//           options: [
//             "0-1",
//             "2-10",
//             "11-50",
//             "51-200",
//             "201-500",
//             "501-1000",
//             "1001-10,000",
//             "10,000+",
//           ],
//         },
//         {
//           label: "Revenue Range",
//           type: "dropdown",
//           options: ["<1M", "1M-10M", "10M+"],
//         },
//         {
//           label: "Tech Stack",
//           type: "multiselect",
//           options: ["AWS", "GCP", "Azure"],
//         },
//         { label: "Growth Signals", type: "text" },
//         { label: "Current Initiatives", type: "text" },
//         { label: "Competitors", type: "text" },
//       ],
//     },
//     {
//       group: "Trigger Data",
//       fields: [
//         { label: "Recent Activity", type: "text", placeholder: "e.g., LinkedIn post" },
//         { label: "Job Change / Promotion / Job Anniversary", type: "checkbox" },
//         { label: "New Funding", type: "checkbox" },
//         { label: "Tool Adoption", type: "checkbox" },
//         { label: "Hiring Spree in X Department", type: "text" },
//         { label: "Churned a Competitor", type: "checkbox" },
//         { label: "Open Roles", type: "text", placeholder: "gap indicator" },
//         { label: "Ad Spend Spike", type: "text" },
//         { label: "New Office / Geo Expansion", type: "text" },
//       ],
//     },
//     {
//       group: "Message Strategy",
//       fields: [
//         {
//           label: "Problem Framing",
//           type: "dropdown",
//           options: ["Symptom", "Root Cause"],
//         },
//         {
//           label: "Pain Point",
//           type: "dropdown",
//           options: ["Explicit", "Implied"],
//         },
//         {
//           label: "Benefit / Value Proposition",
//           type: "dropdown",
//           options: ["ROI", "Time", "Cost", "Risk"],
//         },
//         {
//           label: "Emotional Trigger",
//           type: "dropdown",
//           options: ["Fear", "Ambition", "Efficiency", "Control", "Peace of Mind"],
//         },
//         {
//           label: "Tone",
//           type: "dropdown",
//           options: ["Spartan", "Casual", "Consultative", "Challenger"],
//         },
//         {
//           label: "Temperature",
//           type: "dropdown",
//           options: ["Low", "Medium", "High"],
//         },
//         {
//           label: "CTA Type",
//           type: "dropdown",
//           options: ["Book a demo", "Ask a question", "Send a resource"],
//         },
//         { label: "Objection Handling", type: "text", placeholder: 'e.g., "we’re happy with X"' },
//       ],
//     },
//     {
//       group: "Outreach Variables",
//       fields: [
//         {
//           label: "Channel",
//           type: "dropdown",
//           options: ["Email", "LinkedIn DM", "Voicemail", "SMS", "Video"],
//         },
//         {
//           label: "Length",
//           type: "dropdown",
//           options: ["Short", "Long"],
//         },
//         {
//           label: "Structure",
//           type: "dropdown",
//           options: ["Hook-Pain-Insight-CTA", "PAS", "AIDA"],
//         },
//         { label: "First Line Personalization", type: "text", placeholder: "Custom hook" },
//         {
//           label: "Media Type",
//           type: "dropdown",
//           options: ["GIF", "Loom", "Static Image", "Quote"],
//         },
//         {
//           label: "Follow-Up Sequence Position",
//           type: "dropdown",
//           options: ["1st Touch", "4th Bump"],
//         },
//       ],
//     },
//     {
//       group: "Reference & Authority Variables",
//       fields: [
//         { label: "Mutual Connection", type: "checkbox" },
//         { label: "Past Interaction", type: "checkbox" },
//         // { label: "Case Study Match", type: "file" },
//         { label: "Shared Community or Event", type: "text" },
//         { label: "Awards / Credibility Signals", type: "text" },
//         // { label: "Data Proof", type: "file" },
//       ],
//     },
//     {
//       group: "Prompt Engine Logic Variables",
//       fields: [
//         {
//           label: "Prompt Objective",
//           type: "dropdown",
//           options: ["Generate", "Rewrite", "Personalize", "Summarize"],
//         },
//         {
//           label: "Persona Type",
//           type: "dropdown",
//           options: ["Curious Buyer", "Skeptic", "Budget-Conscious"],
//         },
//         {
//           label: "Tone Instruction",
//           type: "dropdown",
//           options: ["Bold", "Witty", "Warm", "Spartan"],
//         },
//         {
//           label: "Confidence Level",
//           type: "dropdown",
//           options: ["Soft Sell", "Hard Assertive CTA"],
//         },
//         {
//           label: "Prompt Output Format",
//           type: "dropdown",
//           options: ["Bullet Email", "Conversation Starter", "Full Sequence"],
//         },
//         { label: "Reply Anticipation", type: "text", placeholder: "Possible objection/reply" },
//       ],
//     },
//   ],

// "Marketing":[
//   {
//     group: "Campaign Goals",
//     fields: [
//       { label: "Funnel Stage", type: "dropdown", options: ["Awareness", "Consideration", "Conversion", "Retention"] },
//       { label: "Campaign Goal", type: "dropdown", options: ["Lead Gen", "Brand Awareness", "Product Launch", "Community Growth"] },
//       { label: "Primary KPI + Measurement Window", type: "text" },
//       { label: "Guardrail Metric (e.g., Max CPA, Min CTR)", type: "text" },
//       { label: "Custom Field", type: "text" }
//     ]
//   },
//   {
//     group: "Audience Targeting",
//     fields: [
//       { label: "Segment Type", type: "dropdown", options: ["Demographic", "Behavioral", "Psychographic", "Firmographic"] },
//       { label: "Buyer Journey Stage", type: "dropdown", options: ["Problem-Aware", "Solution-Aware", "Product-Aware"] },
//       { label: "ICP Snapshot", type: "text" },
//       { label: "Exclusions / Negative Targeting", type: "text" },
//       { label: "Custom Field", type: "text" }
//     ]
//   },
//   {
//     group: "Channel Strategy",
//     fields: [
//       { label: "Primary Channel", type: "dropdown", options: ["Email", "Social", "Paid Ads", "SEO", "Events", "Partnerships"] },
//       { label: "Multi-Touch Path", type: "dropdown", options: ["Ad → Landing Page → Nurture Sequence", "Email → Social → Ad", "Other"] },
//       { label: "Cadence / Frequency", type: "text" },
//       { label: "Budget Allocation", type: "text" },
//       { label: "Custom Field", type: "text" }
//     ]
//   },
//   {
//     group: "Message Positioning",
//     fields: [
//       { label: "Value Proposition Type", type: "dropdown", options: ["ROI", "Emotional", "Social Proof", "Differentiation"] },
//       { label: "Emotional Hook", type: "dropdown", options: ["Urgency", "Curiosity", "Trust", "FOMO", "Aspirational"] },
//       { label: "Core Message / Theme", type: "text" },
//       { label: "Primary Objection to Overcome", type: "text" },
//       { label: "Custom Field", type: "text" }
//     ]
//   },
//   {
//     group: "Campaign Variables",
//     fields: [
//       { label: "Campaign Type", type: "dropdown", options: ["Evergreen", "Seasonal", "Product Launch", "Event-Based"] },
//       { label: "Timeline", type: "dropdown", options: ["1 Week", "1 Month", "1 Quarter", "Ongoing"] },
//       { label: "Offer / Incentive", type: "text" },
//       { label: "Success Criteria / Guardrail Alignment", type: "text" },
//       { label: "Custom Field", type: "text" }
//     ]
//   },
//   {
//     group: "AI-Generated",
//     fields: [
//       { label: "Template 1", type: "text" },
//       { label: "Template 2", type: "text" },
//       { label: "Template 3", type: "text" },
//       { label: "Template 4", type: "text" }
//     ]
//   }
// ],


// "Content Creation": [
//   {
//     group: "Objective & Strategy",
//     fields: [
//       { label: "Goal Type", type: "dropdown", options: ["Brand Awareness", "Lead Generation", "Engagement", "Conversion"] },
//       { label: "Content Type", type: "dropdown", options: ["Social Post", "Blog", "Newsletter", "Podcast", "Video"] },
//       { label: "Primary Success Metric", type: "text" },
//       { label: "Desired Audience Action", type: "text" },
//       { label: "Custom Field", type: "text" }
//     ]
//   },
//   {
//     group: "Audience Targeting",
//     fields: [
//       { label: "Audience Profile Type", type: "dropdown", options: ["Demographic", "Behavioral", "Psychographic", "Firmographic"] },
//       { label: "Awareness Level", type: "dropdown", options: ["Problem-Aware", "Solution-Aware", "Product-Aware"] },
//       { label: "ICP Snapshot / Audience Description", type: "text" },
//       { label: "Consumption Environment or Mood", type: "text" },
//       { label: "Custom Field", type: "text" }
//     ]
//   },
//   {
//     group: "Creative Direction",
//     fields: [
//       { label: "Content Framework", type: "dropdown", options: ["How-To", "Storytelling", "Listicle", "Case Study"] },
//       { label: "Length Expectation", type: "dropdown", options: ["Short", "Medium", "Long", "Series"] },
//       { label: "Hook Type", type: "dropdown", options: ["Curiosity", "Data-Driven", "Emotional", "Contrarian"] },
//       { label: "Call-to-Action Placement & Style", type: "dropdown", options: ["Front", "Mid", "End", "Integrated"] },
//       { label: "Custom Field", type: "text" }
//     ]
//   },
//   {
//     group: "Message Positioning",
//     fields: [
//       { label: "Angle Type", type: "dropdown", options: ["Authority", "Relatability", "Aspirational", "Humor", "Story-Driven"] },
//       { label: "Proof Device", type: "dropdown", options: ["Testimonial", "Data Point", "Social Proof", "Case Study"] },
//       { label: "Core Message / Key Idea", type: "text" },
//       { label: "Reader Takeaway", type: "text" },
//       { label: "Custom Field", type: "text" }
//     ]
//   },
//   {
//     group: "Channel & Distribution",
//     fields: [
//       { label: "Primary Channel", type: "dropdown", options: ["Instagram", "LinkedIn", "YouTube", "Blog", "Email", "Podcast"] },
//       { label: "Repurposing Option", type: "dropdown", options: ["Carousel", "Reel", "Thread", "Clip", "Newsletter Segment"] },
//       { label: "Discovery Anchor", type: "text" },
//       { label: "Format Constraints", type: "text" },
//       { label: "Custom Field", type: "text" }
//     ]
//   },
//   {
//     group: "AI-Generated",
//     fields: [
//       { label: "Template 1", type: "text" },
//       { label: "Template 2", type: "text" },
//       { label: "Template 3", type: "text" },
//       { label: "Template 4", type: "text" }
//     ]
//   }
// ],



// //   "Customer Support & Service": [
// //     {
// //       group: "Customer Profile",
// //       fields: [
// //         { label: "Name", type: "text" },
// //         { label: "Account ID / Customer ID", type: "text" },
// //         {
// //           label: "Plan / Tier",
// //           type: "dropdown",
// //           options: ["Free", "Pro", "Enterprise"],
// //         },
// //         {
// //           label: "Tenure",
// //           type: "dropdown",
// //           options: ["New Customer", "Loyal", "Churn Risk"],
// //         },
// //         {
// //           label: "Region / Time Zone",
// //           type: "dropdown",
// //           options: ["US", "EU", "Asia", "Other"],
// //         },
// //         {
// //           label: "Language Preference",
// //           type: "dropdown",
// //           options: ["English", "Spanish", "French", "Other"],
// //         },
// //         { label: "Support History", type: "text" },
// //         {
// //           label: "Sentiment Score",
// //           type: "dropdown",
// //           options: ["Positive", "Neutral", "Frustrated", "Angry"],
// //         },
// //         // { label: "NPS Score / CSAT History", type: "number" },
// //         { label: "Purchase History / Product Usage", type: "text" },
// //       ],
// //     },
// //     {
// //       group: "Issue Context",
// //       fields: [
// //         {
// //           label: "Ticket Type",
// //           type: "dropdown",
// //           options: ["Bug", "Billing", "Feature Request", "Other"],
// //         },
// //         {
// //           label: "Priority Level",
// //           type: "dropdown",
// //           options: ["Urgent", "Normal", "Low"],
// //         },
// //         {
// //           label: "Channel Origin",
// //           type: "dropdown",
// //           options: ["Email", "Chat", "Phone", "Other"],
// //         },
// //         {
// //           label: "Submission Time",
// //           type: "dropdown",
// //           options: ["Business Hours", "After Hours"],
// //         },
// //         { label: "Device / Platform", type: "text" },
// //         { label: "Browser / App Version", type: "text" },
// //         {
// //           label: "Issue Reproducibility",
// //           type: "dropdown",
// //           options: ["One-off", "Recurring", "Edge Case"],
// //         },
// //         { label: "Time Since Last Response", type: "text" },
// //         {
// //           label: "Escalation Status",
// //           type: "dropdown",
// //           options: ["Level 1", "Level 2", "Other"],
// //         },
// //       ],
// //     },
// //     {
// //       group: "Response Logic",
// //       fields: [
// //         {
// //           label: "Response Goal",
// //           type: "dropdown",
// //           options: ["Inform", "Resolve", "Apologize", "Escalate", "Confirm", "Delay"],
// //         },
// //         {
// //           label: "Tone",
// //           type: "dropdown",
// //           options: ["Empathetic", "Professional", "Playful", "Assertive", "Apologetic"],
// //         },
// //         { label: "Agent Role Prompt", type: "text" },
// //         {
// //           label: "Personalization Level",
// //           type: "dropdown",
// //           options: ["Low", "Medium", "High"],
// //         },
// //         { label: "Knowledge Base Context", type: "link" },
// //         {
// //           label: "Expected Customer Reaction",
// //           type: "dropdown",
// //           options: ["Positive", "Neutral", "Negative"],
// //         },
// //         {
// //           label: "Required Legal Language",
// //           type: "dropdown",
// //           options: ["Yes", "No"],
// //         },
// //       ],
// //     },
// //     {
// //       group: "Support Content",
// //       fields: [
// //         { label: "Product Feature Mentioned", type: "text" },
// //         { label: "Documentation Link / Article", type: "link" },
// //         { label: "Troubleshooting Steps", type: "text" },
// //         { label: "Common Resolutions", type: "text" },
// //         {
// //           label: "Template Type",
// //           type: "dropdown",
// //           options: ["First Response", "Follow-up", "Closure", "Apology"],
// //         },
// //         { label: "Embedded Media", type: "upload" },
// //         { label: "Multi-lingual Output", type: "toggle" },
// //       ],
// //     },
// //     {
// //       group: "Billing / Payment",
// //       fields: [
// //         { label: "Invoice Number", type: "text" },
// //         { label: "Payment Method", type: "text" },
// //         { label: "Last Payment Date", type: "date" },
// //         { label: "Subscription Start / End", type: "daterange" },
// //         { label: "Discount Code / Promo Applied", type: "text" },
// //         { label: "Refund Eligibility", type: "toggle" },
// //         { label: "Trial Period Status", type: "toggle" },
// //         { label: "Past Disputes", type: "text" },
// //       ],
// //     },
// //     {
// //       group: "System & Workflow",
// //       fields: [
// //         {
// //           label: "Support Platform Used",
// //           type: "dropdown",
// //           options: ["Zendesk", "Intercom", "Freshdesk", "HelpScout"],
// //         },
// //         { label: "SLAs", type: "text" },
// //         { label: "Agent Handling It", type: "text" },
// //         {
// //           label: "Tags / Categories",
// //           type: "multiselect",
// //           options: ["Billing", "Technical", "Feature Request", "Bug"],
// //         },
// //         {
// //           label: "Workflow Stage",
// //           type: "dropdown",
// //           options: ["Open", "Pending", "Solved", "Other"],
// //         },
// //         { label: "Follow-up Trigger", type: "toggle" },
// //         { label: "Escalation Path", type: "text" },
// //       ],
// //     },
// //     {
// //       group: "Analytics & Feedback",
// //       fields: [
// //         { label: "Resolution Time", type: "number" },
// //         { label: "Time to First Response", type: "number" },
// //         { label: "Reopen Count", type: "number" },
// //         { label: "Agent Rating", type: "number" },
// //         { label: "Customer Feedback", type: "text" },
// //         { label: "Recurring Issue Flag", type: "toggle" },
// //         { label: "Support Volume Trends", type: "text" },
// //         { label: "Response Tone", type: "text" },
// //       ],
// //     },
// //     {
// //       group: "Agent Training Prompts (Meta)",
// //       fields: [
// //         { label: "System Message Role", type: "text", placeholder: 'e.g., "You are a friendly, empathetic support rep for a B2B SaaS."' },
// //         { label: "Few-shot Prompts", type: "text", placeholder: "e.g., frustrated refund, confused login" },
// //         {
// //           label: "Output Format",
// //           type: "dropdown",
// //           options: ["Short Email", "Long-form", "FAQ"],
// //         },
// //         { label: "Temperature Control", type: "text", placeholder: "tone-sensitive generation" },
// //         { label: "Do/Don't", type: "text", placeholder: "e.g., use empathy, avoid technical jargon" },
// //         {
// //           label: "Persona Modes",
// //           type: "dropdown",
// //           options: ["Novice", "Technical", "Power User"],
// //         },
// //       ],
// //     },
// //   ],

 

// //   "Operations & Workflow Management" : [
// //   {
// //     group: "Team & Role Context",
// //     fields: [
// //       { label: "Team or Department Name", type: "text", placeholder: "e.g., IT Ops, BizOps, People, RevOps" },
// //       { label: "Function Focus", type: "dropdown", options: ["process design", "automation", "vendor mgmt", "reporting"] },
// //       { label: "Org Type", type: "dropdown", options: ["startup", "scale-up", "enterprise", "agency", "nonprofit"] },
// //       { label: "Stakeholder Level", type: "dropdown", options: ["C-suite", "VP", "Director", "Team Lead", "IC"] },
// //       { label: "Process Owner", type: "text", placeholder: "Name or role" },
// //       { label: "Cross-Functional Dependencies", type: "text", placeholder: "e.g., works with Finance, HR, Legal" }
// //     ]
// //   },
// //   {
// //     group: "Workflow Objective",
// //     fields: [
// //       { label: "Prompt Use Case", type: "dropdown", options: ["generate SOP", "summarize process", "automate task", "QA draft", "review doc"] },
// //       { label: "Target Outcome", type: "dropdown", options: ["efficiency", "consistency", "compliance", "clarity"] },
// //       { label: "Workflow Type", type: "text", placeholder: "e.g., onboarding, procurement, content publishing" },
// //       { label: "Current Tools Involved", type: "dropdown", options: ["Airtable", "Notion", "Slack", "Zapier", "ClickUp"] },
// //       { label: "Known Bottlenecks or Gaps", type: "text" },
// //       { label: "Cross-Tool Automation Required", type: "checkbox" },
// //       { label: "Recurrence", type: "dropdown", options: ["one-off", "daily", "weekly", "monthly", "ad-hoc"] }
// //     ]
// //   },
// //   {
// //     group: "Data & Process Inputs",
// //     fields: [
// //       { label: "Input Format", type: "dropdown", options: ["meeting notes", "spreadsheet", "system log", "checklist", "form response"] },
// //       { label: "Source Document or System", type: "text", placeholder: "URL or file reference (optional)" },
// //       { label: "Process Clarity Level", type: "dropdown", options: ["defined", "partially mapped", "undocumented"] },
// //       { label: "Includes Metrics or KPIs", type: "checkbox" },
// //       { label: "Key Inputs or Rules", type: "text" },
// //       { label: "Known Failure Points / Audit Flags", type: "text" },
// //       { label: "Collaboration Need", type: "dropdown", options: ["solo", "multi-team", "async", "real-time"] }
// //     ]
// //   },
// //   {
// //     group: "Framing Logic",
// //     fields: [
// //       { label: "Prompt Goal", type: "dropdown", options: ["summarize", "improve", "document", "analyze", "simplify"] },
// //       { label: "Task Type", type: "dropdown", options: ["admin", "reporting", "systems", "QA", "handoff", "training"] },
// //       { label: "Language Style", type: "dropdown", options: ["direct", "instructional", "visual", "step-by-step"] },
// //       { label: "Tone", type: "dropdown", options: ["compliance-heavy", "collaborative", "informal", "technical", "consultative"] },
// //       { label: "Required Output Format", type: "text", placeholder: "e.g., SOP, checklist, dashboard draft" },
// //       { label: "Audience Type", type: "dropdown", options: ["ICs", "team leads", "execs", "cross-functional teams"] }
// //     ]
// //   },
// //   {
// //     group: "Operational Sensitivity",
// //     fields: [
// //       { label: "Confidentiality Level", type: "dropdown", options: ["public", "internal", "sensitive", "legal/audit"] },
// //       { label: "Security/Compliance Relevance", type: "checkbox" },
// //       { label: "Requires Legal/HR Approval", type: "checkbox" },
// //       { label: "Stakeholder Risks or Constraints", type: "text" },
// //       { label: "Time-Sensitive Task", type: "checkbox" },
// //       { label: "Version Control Notes or Ownership Flags", type: "text" }
// //     ]
// //   },
// //   {
// //     group: "Output Delivery Format",
// //     fields: [
// //       { label: "Output Format", type: "dropdown", options: ["SOP doc", "wiki entry", "Slack message", "form instructions", "task brief"] },
// //       { label: "Output Length", type: "dropdown", options: ["one-pager", "overview", "full process"] },
// //       { label: "Visual Add-Ons", type: "dropdown", options: ["flowchart", "decision tree", "checklist", "diagram"] },
// //       { label: "Platform Compatibility", type: "dropdown", options: ["Notion", "Confluence", "Slide", "PDF", "Markdown"] },
// //       { label: "Export / Integration Preference", type: "text" }
// //     ]
// //   },
// //   {
// //     group: "Reference & Alignment",
// //     fields: [
// //       { label: "Existing SOP or Template", type: "text", placeholder: "File link or text" },
// //       { label: "Linked Workflow or Tool", type: "text", placeholder: "e.g., Zapier flow, Jira board" },
// //       { label: "Owner of Reference System", type: "text" },
// //       { label: "Desired Best Practice Source", type: "dropdown", options: ["industry standard", "internal doc", "external template"] },
// //       { label: "Benchmark or Comparison Requested", type: "checkbox" },
// //       { label: "Style Match", type: "text", placeholder: "Match tone of X doc or team" }
// //     ]
// //   },
// //   {
// //     group: "Prompt Engine Logic Variables",
// //     fields: [
// //       { label: "Prompt Objective", type: "dropdown", options: ["generate", "rewrite", "improve", "QA", "visualize"] },
// //       { label: "Confidence Level", type: "dropdown", options: ["strictly defined", "flexible suggestion"] },
// //       { label: "Tone Instruction", type: "dropdown", options: ["formal", "collaborative", "plain language", "detailed"] },
// //       { label: "Output Format", type: "dropdown", options: ["step-by-step", "chart", "summary", "checklist", "table"] },
// //       { label: "Intended Action After Output", type: "text", placeholder: "publish, delegate, review, automate" }
// //     ]
// //   }
// //   ],

// //   "Audience & Role Context" : [
// //   {
// //     group: "Audience & Role Context",
// //     fields: [
// //       { label: "Team or Department", type: "text", placeholder: "e.g., Sales, Product, Customer Success, HR" },
// //       { label: "Audience Type", type: "dropdown", options: ["new hire", "IC", "manager", "executive", "cross-functional"] },
// //       { label: "Communication Style", type: "dropdown", options: ["directive", "collaborative", "informative", "motivational"] },
// //       { label: "Sender Perspective", type: "text", placeholder: "e.g., People Ops, Enablement Lead, CX Director" },
// //       { label: "Use Case", type: "dropdown", options: ["training", "announcement", "documentation", "culture alignment", "async update"] }
// //     ]
// //   },
// //   {
// //     group: "Objective & Learning Goal",
// //     fields: [
// //       { label: "Topic or Initiative", type: "text", placeholder: "e.g., product update, onboarding flow, values rollout" },
// //       { label: "Training Type", type: "dropdown", options: ["SOP", "FAQ", "onboarding", "how-to guide", "video script", "live deck"] },
// //       { label: "Intended Behavior or Understanding Shift", type: "text" },
// //       { label: "Learning Goal Format", type: "dropdown", options: ["step-by-step", "story-based", "use-case driven", "compliance-focused"] },
// //       { label: "Key Takeaways or Must-Know Info", type: "text" },
// //       { label: "Include Quiz or Knowledge Check", type: "checkbox" }
// //     ]
// //   },
// //   {
// //     group: "Contextual Inputs",
// //     fields: [
// //       { label: "Source Material", type: "text", placeholder: "slide, doc, product brief, policy draft" },
// //       { label: "Content Maturity", type: "dropdown", options: ["draft", "final", "outdated", "partial"] },
// //       { label: "Includes Metrics / KPIs", type: "checkbox" },
// //       { label: "Existing Confusions or Misalignment", type: "text" },
// //       { label: "Stakeholder Feedback / Concerns to Address", type: "text" },
// //       { label: "Systems or Tools Mentioned", type: "text", placeholder: "Slack, Notion, LMS, CRM, etc." }
// //     ]
// //   },
// //   {
// //     group: "Communication Framing",
// //     fields: [
// //       { label: "Tone", type: "dropdown", options: ["warm", "clear", "professional", "culture-first", "humorous"] },
// //       { label: "Instruction Style", type: "dropdown", options: ["bullet-pointed", "FAQ", "visual-first", "step-by-step"] },
// //       { label: "Format Type", type: "dropdown", options: ["memo", "async update", "script", "announcement", "onboarding flow", "deck outline"] },
// //       { label: "Internal CTA or Behavior Prompt", type: "text", placeholder: "e.g., read by Friday, click to acknowledge, follow-up training required" },
// //       { label: "Comms Channel", type: "dropdown", options: ["email", "Slack", "Notion", "LMS", "video", "doc"] }
// //     ]
// //   },
// //   {
// //     group: "Delivery Details",
// //     fields: [
// //       { label: "Length Preference", type: "dropdown", options: ["short-form", "overview", "full deep-dive"] },
// //       { label: "Media Element", type: "dropdown", options: ["GIF", "Loom", "embedded link", "diagram", "quiz embed"] },
// //       { label: "Timing / Cadence", type: "dropdown", options: ["one-time", "weekly", "pre-launch", "recurring reminder"] },
// //       { label: "Follow-up Plan", type: "text", placeholder: "survey, Slack thread, team sync, manager 1:1" },
// //       { label: "Output Format", type: "dropdown", options: ["Notion page", "Google Doc", "Slide deck", "internal post", "email draft"] }
// //     ]
// //   },
// //   {
// //     group: "Prompt Engine Logic Variables",
// //     fields: [
// //       { label: "Prompt Objective", type: "dropdown", options: ["summarize", "rewrite", "create", "convert format", "personalize"] },
// //       { label: "Persona Style", type: "dropdown", options: ["first-time learner", "overwhelmed reader", "team leader", "skeptical stakeholder"] },
// //       { label: "Confidence Level", type: "dropdown", options: ["assertive", "nurturing", "passive", "neutral"] },
// //       { label: "Instruction Clarity", type: "dropdown", options: ["high-detail", "brief", "scaffolded", "with analogies"] },
// //       { label: "Anticipated Confusion or Objection", type: "text" },
// //       { label: "Output Format", type: "dropdown", options: ["FAQ", "checklist", "email", "slide", "doc", "async script"] }
// //     ]
// //   }
// //   ],

// //   "Other (Custom or Experimental Use)" : [
// //   {
// //     group: "User Intent & Context",
// //     fields: [
// //       { label: "Describe the Goal or Use Case", type: "text", placeholder: "e.g., experiment, custom logic, brainstorm, niche workflow" },
// //       { label: "Output Purpose", type: "dropdown", options: ["ideation", "reflection", "automation", "documentation", "exploration"] },
// //       { label: "User Type", type: "dropdown", options: ["freelancer", "researcher", "founder", "educator", "hobbyist", "unknown"] },
// //       { label: "Real-World Application or Scenario", type: "text" },
// //       { label: "Outcome Priority", type: "dropdown", options: ["clarity", "speed", "creativity", "technical precision", "emotional depth"] }
// //     ]
// //   },
// //   {
// //     group: "Input & Reference Layer",
// //     fields: [
// //       { label: "Source Material", type: "text", placeholder: "link, file, example, rough draft, brief" },
// //       { label: "Input Structure", type: "dropdown", options: ["unstructured notes", "idea map", "structured brief", "question list"] },
// //       { label: "Keywords, Themes, or Entities to Include", type: "text" },
// //       { label: "Required Fidelity", type: "dropdown", options: ["rough sketch", "polished output"] },
// //       { label: "Includes Technical/Creative Blend", type: "checkbox" },
// //       { label: "Optional Constraints or Guardrails", type: "text", placeholder: "e.g., length limit, no AI-sounding phrases" }
// //     ]
// //   },
// //   {
// //     group: "Prompt Strategy Layer",
// //     fields: [
// //       { label: "Prompt Type", type: "dropdown", options: ["generate", "transform", "critique", "stylize", "summarize", "remix"] },
// //       { label: "Instruction Style", type: "dropdown", options: ["directive", "open-ended", "chain-of-thought", "exploratory"] },
// //       { label: "Output Format", type: "dropdown", options: ["email", "poem", "explainer", "joke", "prototype", "question set", "combo"] },
// //       { label: "Creativity Temperature", type: "dropdown", options: ["neutral", "flexible", "experimental", "unhinged"] },
// //       { label: "Audience Clarity", type: "dropdown", options: ["just for me", "for review", "for clients", "for public"] },
// //       { label: "Post-Output Action", type: "text", placeholder: "e.g., publish, discuss, test, discard, iterate" }
// //     ]
// //   },
// //   {
// //     group: "Output Delivery & Framing",
// //     fields: [
// //       { label: "Channel / Medium", type: "dropdown", options: ["doc", "note", "tweet", "blog", "DM", "none"] },
// //       { label: "Tone", type: "dropdown", options: ["neutral", "playful", "poetic", "assertive", "cryptic", "branded"] },
// //       { label: "Structure Preference", type: "dropdown", options: ["bullets", "paragraphs", "dialogue", "visual-first", "hybrid"] },
// //       { label: "First Line or Opening Hook", type: "text" },
// //       { label: "Add-On Format", type: "dropdown", options: ["meme", "quote", "stat", "analogy", "metaphor", "challenge prompt"] }
// //     ]
// //   },
// //   {
// //     group: "Prompt Engine Logic Variables",
// //     fields: [
// //       { label: "Prompt Objective", type: "dropdown", options: ["ideate", "generate", "reframe", "extend", "debug", "contrast"] },
// //       { label: "Perspective or Voice", type: "dropdown", options: ["AI assistant", "philosopher", "critic", "fan", "founder", "wildcard"] },
// //       { label: "Risk Level", type: "dropdown", options: ["safe", "edgy", "absurd", "reflective"] },
// //       { label: "What Should the Output Feel Like?", type: "text" }
// //     ]
// //   }
// // ],


// };




// //  "Marketing and Content Creation":[
// //   {
// //     group: "Audience & Persona Variables",
// //     fields: [
// //       { label: "Audience Segment", type: "text", placeholder: "e.g., Gen Z founders, SaaS CMOs" },
// //       { label: "Content Goal", type: "text", placeholder: "e.g., brand awareness, lead gen" },
// //       { label: "Funnel Stage", type: "dropdown", options: ["TOFU", "MOFU", "BOFU"] },
// //       { label: "Persona Motivation", type: "dropdown", options: ["status", "efficiency", "impact", "community", "creativity"] },
// //       { label: "Buying Intent", type: "dropdown", options: ["low", "warm", "high"] },
// //       { label: "Pain / Obsession / Curiosity Point", type: "text" },
// //       { label: "Emotional Levers", type: "dropdown", options: ["inspiration", "validation", "FOMO", "clarity", "fear", "trust"] },
// //       { label: "Tone / Voice Match", type: "dropdown", options: ["playful", "expert", "empathetic", "disruptive", "hype"] }
// //     ]
// //   },
// //   {
// //     group: "Brand & Product Context",
// //     fields: [
// //       { label: "Company Name", type: "text" },
// //       { label: "Industry / Niche", type: "dropdown", options: [] },
// //       { label: "Product or Offer (headline version)", type: "text" },
// //       { label: "Offer Type", type: "dropdown", options: ["SaaS", "course", "service", "physical product", "community"] },
// //       { label: "Current Positioning", type: "dropdown", options: ["premium", "affordable", "cutting-edge", "friendly"] },
// //       { label: "Value Proposition or Big Idea", type: "text" },
// //       { label: "Core Differentiator", type: "text" },
// //       { label: "Call to Action", type: "text" }
// //     ]
// //   },
// //   {
// //     group: "Strategy & Channel Inputs",
// //     fields: [
// //       { label: "Content Type", type: "dropdown", options: ["social post", "blog", "email", "ad", "video script", "landing page"] },
// //       { label: "Distribution Channel", type: "dropdown", options: ["LinkedIn", "Instagram", "Twitter", "TikTok", "Email", "Blog"] },
// //       { label: "Content Framework", type: "dropdown", options: ["story-driven", "listicle", "insight drop", "how-to", "PSA"] },
// //       { label: "Post Format", type: "dropdown", options: ["carousel", "thread", "meme", "static visual", "infographic", "reel"] },
// //       { label: "Campaign Style", type: "dropdown", options: ["evergreen", "seasonal", "launch", "teaser"] },
// //       { label: "Publishing Cadence / Time Sensitivity", type: "text" },
// //       { label: "Repurpose from Existing Asset", type: "checkbox" },
// //       { label: "Source Inspiration", type: "text", placeholder: "URL, file link, or paste copy" }
// //     ]
// //   },
// //   {
// //     group: "Message Framing Logic",
// //     fields: [
// //       { label: "Narrative Device", type: "dropdown", options: ["origin story", "testimonial", "hot take", "before/after", "analogy"] },
// //       { label: "Hook Style", type: "dropdown", options: ["question", "stat", "polarizing claim", "pain visual", "curiosity opener"] },
// //       { label: "CTA Type", type: "dropdown", options: ["comment bait", "link click", "save/share", "reply prompt"] },
// //       { label: "Persuasion Focus", type: "dropdown", options: ["authority", "likability", "logic", "scarcity", "novelty"] },
// //       { label: "Tone", type: "dropdown", options: ["spartan", "magnetic", "ironic", "poetic", "satirical", "warm"] },
// //       { label: "Temperature", type: "dropdown", options: ["safe", "edgy", "controversial", "unfiltered", "emotional"] },
// //       { label: "Objection Reframe", type: "text", placeholder: "e.g., 'But won’t this take too long?'" }
// //     ]
// //   },
// //   {
// //     group: "Audience Relevance & SEO",
// //     fields: [
// //       { label: "Keyword Focus", type: "dropdown", options: ["short-tail", "long-tail", "question-based", "branded"] },
// //       { label: "Audience Language or Slang", type: "text" },
// //       { label: "Competitor Mentions or Comparisons", type: "text" },
// //       { label: "Cultural Reference or Trend Tie-In", type: "text" },
// //       { label: "Community Hashtags / Tag Targets", type: "text" }
// //     ]
// //   },
// //   {
// //     group: "Delivery Format",
// //     fields: [
// //       { label: "Output Format", type: "dropdown", options: ["tweet thread", "IG carousel", "blog post", "cold ad", "landing copy", "CTA headline", "story script"] },
// //       { label: "Length Preference", type: "dropdown", options: ["1-liner", "short form", "mid", "long form"] },
// //       { label: "Visual Element Type", type: "dropdown", options: ["meme", "quote image", "reel idea", "infographic", "stat visual"] },
// //       { label: "Opening Line", type: "text" },
// //       { label: "Series Context", type: "dropdown", options: ["standalone", "part 1 of 3", "daily drop"] },
// //       { label: "Platform-Specific Constraint", type: "dropdown", options: ["character limit", "hashtag format", "caption flow"] }
// //     ]
// //   },
// //   {
// //     group: "Reference & Authority Signals",
// //     fields: [
// //       { label: "Social Proof Mention", type: "checkbox" },
// //       { label: "Testimonial, Review, or Quote", type: "text" },
// //       { label: "Named Source or Stat", type: "text" },
// //       { label: "Case Study / Content Inspiration", type: "text" },
// //       { label: "Community Mention or Influencer Reference", type: "checkbox" },
// //       { label: "Industry Event / Cultural Tie-In", type: "text" }
// //     ]
// //   },
// //   {
// //     group: "Prompt Engine Logic Variables",
// //     fields: [
// //       { label: "Prompt Objective", type: "dropdown", options: ["generate", "rewrite", "personalize", "ideate", "summarize"] },
// //       { label: "Confidence Level", type: "dropdown", options: ["assertive", "subtle", "bold"] },
// //       { label: "Tone Instruction", type: "dropdown", options: ["empowering", "snarky", "smart", "educational"] },
// //       { label: "Persona Archetype", type: "dropdown", options: ["visionary", "skeptic", "builder", "trendspotter"] },
// //       { label: "Output Format", type: "dropdown", options: ["social caption", "script", "email", "thread", "headline options"] },
// //       { label: "Expected Reaction or Engagement Type", type: "text", placeholder: "comment, click, save, follow" }
// //     ]
// //   }
// //   ],








export type FieldType =
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
  | "number"
  | "textarea";


export interface FieldConfig {
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];
}

export interface OptionFieldsConfig {
  [key: string]: {
    group: string;
    fields: FieldConfig[];
  }[];
}

export const optionFieldsConfigData: OptionFieldsConfig = {
  
  "Content Creation": [
    {
      group: "Goal & Audience",
      fields: [
        { label: "Goal Type", type: "dropdown", options: ["Brand Awareness", "Lead Generation", "Engagement", "Conversion"] },
        { label: "Audience Priorities", type: "multiselect", options: ["Saving time", "Saving money", "Learning something new", "Feeling inspired", "Solving a problem", "Feeling secure/trusted", "Getting recognition/status", "Connecting with others"] },
        { label: "Target Audience / ICP Snapshot", type: "text", placeholder: "Busy solopreneurs who want to automate content creation." },
        { label: "Desired Audience Action", type: "text", placeholder: "Click to download our free template or Share this carousel with their team." },
        { label: "Custom Field", type: "text" }
      ]
    },
    {
      group: "Message & Creative Direction",
      fields: [
        { label: "Content Type", type: "dropdown", options: ["Social Post", "Blog", "Newsletter", "Video", "Podcast"] },
        { label: "Content Framework", type: "dropdown", options: ["How-To / Tips", "Storytelling", "List / Quick Wins", "Case Study / Example", "Opinion / Hot Take", "Behind the Scenes"] },
        { label: "Core Message / Key Idea", type: "text", placeholder: "Save 5 hours a week by batching your content creation." },
        { label: "Hook Type", type: "text", placeholder: "Did you know most creators waste 40% of their time on formatting?" },
        { label: "Custom Field", type: "text" }
      ]
    },
    {
      group: "Proof & Positioning",
      fields: [
        { label: "Angle Type", type: "dropdown", options: ["Authority", "Relatability", "Aspirational", "Humor", "Story-Driven"] },
        { label: "Evidence Type", type: "dropdown", options: ["Real-life Example or Story", "Data Point / Statistic", "Customer Quote / Testimonial", "Before-and-After Result", "Industry Trend"] },
        { label: "Why It's Believable", type: "text", placeholder: "We've helped 2,000 customers automate their social media posts." },
        { label: "How It Helps the Audience", type: "text", placeholder: "This saves you an average of 5 hours a week you can use to grow your business." },
        { label: "Custom Field", type: "text" }
      ]
    },
    {
      group: "Channel & Distribution",
      fields: [
        { label: "Primary Channel", type: "dropdown", options: ["Instagram", "LinkedIn", "YouTube", "Blog", "Email", "Podcast"] },
        { label: "Repurposing Option", type: "dropdown", options: ["Carousel", "Reel", "Thread", "Clip", "Newsletter Segment"] },
        { label: "How People Find It", type: "text", placeholder: "#ContentAutomation #MarketingTips or Keyword: AI content creation." },
        { label: "Discovery Anchor Add-On (Optional)", type: "text" },
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

  "Sales Research": [
    {
      group: "Prospect Profile",
      fields: [
        { label: "Persona", type: "dropdown", options: ["IT Director", "CFO", "VP Sales", "Head of Operations", "Other"] },
        { label: "Job Title(s)", type: "text", placeholder: "Account Executive – Enterprise SaaS" },
        { label: "Seniority", type: "dropdown", options: ["C-Suite", "VP", "Director", "Manager", "Independent Contractor"] },
        { label: "Decision Role", type: "dropdown", options: ["Decision Maker", "Influencer", "Champion", "End-User"] },
        { label: "Pain / Priority", type: "text", placeholder: "Struggling with long onboarding times for new hires" },
        { label: "Location", type: "text", placeholder: "Chicago, IL" },
        { label: "Lead Source", type: "dropdown", options: ["Inbound", "Outbound", "Referral", "Event"] },
        { label: "Custom Field", type: "text" }
      ]
    },
    {
      group: "Company Context",
      fields: [
        { label: "Industry", type: "text", placeholder: "Healthcare – SaaS platform for hospitals" },
        { label: "Company Size", type: "dropdown", options: ["1-10", "11-50", "51-200", "201-500", "501-1,000", "1,000+"] },
        { label: "Funding Stage", type: "dropdown", options: ["Bootstrapped", "Pre-Seed", "Seed", "Series A", "Series B", "Series C+", "IPO"] },
        { label: "Company Name", type: "text", placeholder: "MediTech Solutions" },
        { label: "Growth Signals", type: "text", placeholder: "Announced $15M Series A funding round last quarter" },
        { label: "Industry Keywords", type: "text", placeholder: "Telehealth, HIPAA Compliance, EMR Integrations" },
        { label: "Deal Size", type: "text", placeholder: "$50–100k ARR" },
        { label: "Custom Field", type: "text" }
      ]
    },
    {
      group: "Trigger Data",
      fields: [
        { label: "Intent Signals", type: "multiselect", options: ["Hiring Spike", "Funding Round", "Product Launch", "Website Visits", "Competitive Activity", "Partnership Announcement", "Leadership Change"] },
        { label: "Intent Source", type: "dropdown", options: ["LinkedIn", "Bombora", "6Sense", "Google Analytics", "Apollo", "Other"] },
        { label: "Signal Recency", type: "dropdown", options: ["Last 7 Days", "Last 30 Days", "Last 90 Days"] },
        { label: "Trigger Event Date", type: "date" },
        { label: "Key Observations / Notes", type: "text", placeholder: "Recently hired new VP of Engineering; indicates expansion" },
        { label: "Custom Field", type: "text" }
      ]
    },
    {
      group: "Research & Opportunities",
      fields: [
        { label: "Research Summary", type: "textarea", placeholder: "Company expanding into the EU market; potential need for compliance solutions" },
        { label: "Potential Opportunity", type: "text", placeholder: "Could use our platform to automate cross-border data transfer compliance" },
        { label: "Lead Fit Score", type: "dropdown", options: ["A", "B", "C", "D"] },
        { label: "Engagement History", type: "text", placeholder: "Attended our security webinar on 8/20/25" },
        { label: "Custom Field", type: "text" }
      ]
    },
    {
      group: "Final Notes",
      fields: [
        { label: "Notes", type: "textarea", placeholder: "Prospect seemed interested in pricing during call; follow up with proposal draft." }
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

  "Sales Copy": [
    {
      group: "Prospect Profile",
      fields: [
        { label: "Persona", type: "dropdown", options: ["IT Director", "CFO", "VP Sales", "Head of Operations", "Other"] },
        { label: "Job Title(s)", type: "text", placeholder: "Head of Procurement – FinTech Startup" },
        { label: "Seniority", type: "dropdown", options: ["C-Suite", "VP", "Director", "Manager", "IC (Independent Contractor)"] },
        { label: "Decision Role", type: "dropdown", options: ["Decision Maker", "Influencer", "Champion", "End-User"] },
        { label: "Pain / Priority", type: "text", placeholder: "Needs to reduce vendor onboarding from 60 to 30 days" },
        { label: "Location", type: "text", placeholder: "London, UK" },
        { label: "Lead Source", type: "dropdown", options: ["Inbound", "Outbound", "Referral", "Event"] },
        { label: "Custom Field", type: "text" }
      ]
    },
    {
      group: "Company Context",
      fields: [
        { label: "Industry", type: "text", placeholder: "eCommerce SaaS Platform" },
        { label: "Company Size", type: "dropdown", options: ["1-10", "11-50", "51-200", "201-500", "501-1,000", "1,000+"] },
        { label: "Funding Stage", type: "dropdown", options: ["Bootstrapped", "Pre-Seed", "Seed", "Series A", "Series B", "Series C+", "IPO"] },
        { label: "Company Name", type: "text", placeholder: "SwiftCart" },
        { label: "Growth Signals", type: "text", placeholder: "Recently launched in three new European markets" },
        { label: "Industry Keywords", type: "text", placeholder: "Conversion optimization, supply chain, mobile checkout" },
        { label: "Deal Size", type: "text", placeholder: "$75k–$150k ARR" },
        { label: "Custom Field", type: "text" }
      ]
    },
    {
      group: "Trigger & Intent",
      fields: [
        { label: "Trigger Event", type: "dropdown", options: ["Growth & Scaling", "Financial Activity", "Product Launch", "Compliance/Regulatory Change", "Competitive Activity", "Retention/Churn Signals", "Crisis or Negative Signal", "Event or Milestone"] },
        { label: "Trigger Recency", type: "dropdown", options: ["Last 7 Days", "Last 30 Days", "Last 90 Days"] },
        { label: "Date of Trigger", type: "date" },
        { label: "Recent Activity Notes", type: "text", placeholder: "Attended our webinar on digital transformation" },
        { label: "Message Objective", type: "multiselect", options: ["Build Trust", "Educate", "Overcome Objection", "Re-Engage", "Start Conversation", "Close Deal"] },
        { label: "Desired Action (CTA)", type: "multiselect", options: ["Book Demo", "Ask a Question", "Request Resource", "Schedule a Call"] },
        { label: "Custom Field", type: "text" }
      ]
    },
    {
      group: "Message Framing",
      fields: [
        { label: "Problem Framing", type: "dropdown", options: ["Symptom vs. Root Cause"] },
        { label: "Value Proposition", type: "dropdown", options: ["Revenue & Growth", "Time Savings & Efficiency", "Risk Reduction & Reliability", "Competitive Advantage / Differentiation", "Relationship Building & Trust", "Insights & Decision Support", "Emotional or Aspirational Motivation"] },
        { label: "Emotional Trigger", type: "text", placeholder: "Frustration with current vendor's downtime" },
        { label: "Objection Handling Notes", type: "text", placeholder: "Budget constraints — highlight ROI within 6 months" },
        { label: "Proof Point / Case Study Reference", type: "text", placeholder: "Case study: Reduced onboarding time by 40% for Client X" },
        { label: "Custom Field", type: "text" }
      ]
    },
    {
      group: "Copywriting Style",
      fields: [
        { label: "Tone", type: "dropdown", options: ["Conversational", "Direct", "Empathetic", "Playful", "Professional"] },
        { label: "Message Length", type: "dropdown", options: ["Ultra-Short (1–2 sentences)", "Short (3–5 sentences)", "Medium (1 paragraph)", "Long-Form (2–3 paragraphs)"] },
        { label: "Language Style Notes", type: "text", placeholder: "Use short, punchy sentences under 10 words" },
        { label: "First Line Personalization", type: "text", placeholder: "Saw your LinkedIn post about scaling logistics — impressive growth!" },
        { label: "Custom Field", type: "text" }
      ]
    },
    {
      group: "Final Notes",
      fields: [
        { label: "Notes", type: "textarea", placeholder: "Prospect indicated high urgency but awaiting board approval — follow up next week." }
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

  "Discovery & Qualification": [
    {
      group: "Prospect Profile",
      fields: [
        { label: "Persona", type: "text", placeholder: "IT Director – Healthcare SaaS" },
        { label: "Job Title(s)", type: "text", placeholder: "Senior Procurement Manager – Enterprise Software" },
        { label: "Seniority", type: "dropdown", options: ["C-Suite", "VP", "Director", "Manager", "IC (Independent Contractor)"] },
        { label: "Decision Role", type: "dropdown", options: ["Decision Maker", "Influencer", "Champion", "End-User"] },
        { label: "Pain / Priority", type: "text", placeholder: "Need to consolidate multiple vendors into one platform" },
        { label: "Location", type: "text", placeholder: "Austin, TX" },
        { label: "Lead Source", type: "dropdown", options: ["Inbound", "Outbound", "Referral", "Event"] },
        { label: "Custom Field", type: "text" }
      ]
    },
    {
      group: "Company Context",
      fields: [
        { label: "Industry", type: "text", placeholder: "Cloud Security" },
        { label: "Company Size", type: "dropdown", options: ["1-10", "11-50", "51-200", "201-500", "501-1,000", "1,000+"] },
        { label: "Funding Stage", type: "dropdown", options: ["Bootstrapped", "Pre-Seed", "Seed", "Series A", "Series B", "Series C+", "IPO"] },
        { label: "Company Name", type: "text", placeholder: "SecureNet" },
        { label: "Growth Signals", type: "text", placeholder: "Hired 20 new sales reps in Q3" },
        { label: "Industry Keywords", type: "text", placeholder: "Zero Trust, Data Encryption, Compliance" },
        { label: "Deal Size", type: "text", placeholder: "$80k–$120k ARR" },
        { label: "Custom Field", type: "text" }
      ]
    },
    {
      group: "Discovery Prep",
      fields: [
        { label: "Discovery Goals", type: "multiselect", options: ["Uncover Pain Points", "Identify Timeline", "Build Rapport", "Confirm Budget", "Validate Fit"] },
        { label: "Methodologies", type: "multiselect", options: ["SPIN", "BANT", "MEDDIC", "MEDDPIC", "GPCTBA", "NEAT", "Challenger"] },
        { label: "Known Priorities", type: "text", placeholder: "Implementing new CRM system within the next quarter" },
        { label: "Competitors Mentioned", type: "text", placeholder: "Salesforce, HubSpot" },
        { label: "Research Notes", type: "text", placeholder: "Liked several LinkedIn posts about automation and cost-cutting" },
        { label: "Custom Field", type: "text" }
      ]
    },
    {
      group: "Call Prep Variables",
      fields: [
        { label: "Call Type", type: "dropdown", options: ["Discovery", "Demo", "Negotiation", "Renewal"] },
        { label: "Expected Outcome", type: "dropdown", options: ["Schedule Demo", "Confirm Budget", "Secure Champion", "Close Deal"] },
        { label: "Call Agenda", type: "text", placeholder: "Discuss current vendor issues, introduce our solution, outline next steps" },
        { label: "Call Duration", type: "dropdown", options: ["15 min", "30 min", "45 min", "60 min"] },
        { label: "Preferred Meeting Format", type: "dropdown", options: ["Video", "Phone", "In-Person"] },
        { label: "Custom Field", type: "text" }
      ]
    },
    {
      group: "Qualification Criteria",
      fields: [
        { label: "Qualification Framework", type: "multiselect", options: ["SPIN", "BANT", "MEDDIC", "MEDDPIC", "GPCTBA", "NEAT", "Challenger"] },
        { label: "Budget Range", type: "text", placeholder: "$50k–$100k for annual subscription" },
        { label: "Decision Timeline", type: "dropdown", options: ["1 Week", "30 Days", "90 Days", "6+ Months"] },
        { label: "Qualification Score", type: "dropdown", options: ["High", "Medium", "Low"] },
        { label: "Custom Field", type: "text" }
      ]
    },
    {
      group: "Final Notes",
      fields: [
        { label: "Notes", type: "textarea", placeholder: "Prospect indicated high urgency but awaiting board approval — follow up next week." }
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

  "Objection Handling": [
    {
      group: "Prospect Profile",
      fields: [
        { label: "Persona", type: "text", placeholder: "Operations Manager – Logistics SaaS" },
        { label: "Job Title(s)", type: "text", placeholder: "Director of IT Procurement" },
        { label: "Seniority", type: "dropdown", options: ["C-Suite", "VP", "Director", "Manager", "IC (Independent Contractor)"] },
        { label: "Decision Role", type: "dropdown", options: ["Decision Maker", "Influencer", "Champion", "End-User"] },
        { label: "Pain / Priority", type: "text", placeholder: "Looking to consolidate multiple analytics tools" },
        { label: "Location", type: "text", placeholder: "San Francisco, CA" },
        { label: "Lead Source", type: "dropdown", options: ["Inbound", "Outbound", "Referral", "Event"] },
        { label: "Custom Field", type: "text" }
      ]
    },
    {
      group: "Company Context",
      fields: [
        { label: "Industry", type: "text", placeholder: "Financial Technology" },
        { label: "Company Size", type: "dropdown", options: ["1-10", "11-50", "51-200", "201-500", "501-1,000", "1,000+"] },
        { label: "Funding Stage", type: "dropdown", options: ["Bootstrapped", "Pre-Seed", "Seed", "Series A", "Series B", "Series C+", "IPO"] },
        { label: "Company Name", type: "text", placeholder: "FinEdge" },
        { label: "Growth Signals", type: "text", placeholder: "Expanded to APAC market this quarter" },
        { label: "Industry Keywords", type: "text", placeholder: "Payments, Fraud Detection, AML Compliance" },
        { label: "Deal Size", type: "text", placeholder: "$100k ARR" },
        { label: "Custom Field", type: "text" }
      ]
    },
    {
      group: "Objection Context",
      fields: [
        { label: "Objection Type", type: "dropdown", options: ["Price", "Competitor", "Timing", "Internal Buy-In", "Feature Gap", "No Need"] },
        { label: "Objection Statement", type: "text", placeholder: "We're happy with our current vendor and not looking to switch." },
        { label: "Role Raising Objection", type: "dropdown", options: ["Decision Maker", "Influencer", "Champion"] },
        { label: "Objection Severity", type: "dropdown", options: ["High", "Medium", "Low"] },
        { label: "Objection Stage", type: "dropdown", options: ["Early", "Mid", "Late"] },
        { label: "Custom Field", type: "text" }
      ]
    },
    {
      group: "Response Framing",
      fields: [
        { label: "Approach", type: "dropdown", options: ["Empathetic", "Assertive", "Consultative", "Data-Driven"] },
        { label: "Key Value Points", type: "text", placeholder: "Our platform integrates seamlessly with your existing ERP and cuts manual processing by 40%." },
        { label: "Supporting Proof / Data", type: "text", placeholder: "Based on a study with 50 enterprise clients, average savings = $250k/year." },
        { label: "Case Study Reference", type: "text", placeholder: "Client X moved from Competitor Y and achieved 30% cost reduction." },
        { label: "Custom Field", type: "text" }
      ]
    },
    {
      group: "Delivery Variables",
      fields: [
        { label: "Channel", type: "dropdown", options: ["Email", "Phone", "In-Person", "Video", "Chat"] },
        { label: "Next Step", type: "dropdown", options: ["Schedule Demo", "Send Case Study", "Book Call", "Trial Sign-Up"] },
        { label: "Follow-Up Timeline", type: "dropdown", options: ["Immediately", "1 Day", "3 Days", "1 Week"] },
        { label: "Custom Field", type: "text" }
      ]
    },
    {
      group: "Final Notes",
      fields: [
        { label: "Notes", type: "textarea", placeholder: "Prospect raised pricing objection mid-demo; send cost comparison sheet tomorrow." }
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

  "Sales Enablement Content": [
    {
      group: "Prospect Profile",
      fields: [
        { label: "Persona", type: "text", placeholder: "Marketing Director – SaaS Startup" },
        { label: "Job Title(s)", type: "text", placeholder: "Head of Demand Generation" },
        { label: "Seniority", type: "dropdown", options: ["C-Suite", "VP", "Director", "Manager", "IC (Independent Contractor)"] },
        { label: "Decision Role", type: "dropdown", options: ["Decision Maker", "Influencer", "Champion", "End-User"] },
        { label: "Pain / Priority", type: "text", placeholder: "Struggling to generate qualified leads for sales pipeline" },
        { label: "Location", type: "text", placeholder: "New York, NY" },
        { label: "Lead Source", type: "dropdown", options: ["Inbound", "Outbound", "Referral", "Event"] },
        { label: "Custom Field", type: "text" }
      ]
    },
    {
      group: "Company Context",
      fields: [
        { label: "Industry", type: "text", placeholder: "Cybersecurity SaaS" },
        { label: "Company Size", type: "dropdown", options: ["1-10", "11-50", "51-200", "201-500", "501-1,000", "1,000+"] },
        { label: "Funding Stage", type: "dropdown", options: ["Bootstrapped", "Pre-Seed", "Seed", "Series A", "Series B", "Series C+", "IPO"] },
        { label: "Company Name", type: "text", placeholder: "ShieldTech" },
        { label: "Growth Signals", type: "text", placeholder: "Raised $10M Series A in June" },
        { label: "Industry Keywords", type: "text", placeholder: "Threat Detection, Cloud Security, Compliance" },
        { label: "Deal Size", type: "text", placeholder: "$40k–$90k ARR" },
        { label: "Custom Field", type: "text" }
      ]
    },
    {
      group: "Asset Details",
      fields: [
        { label: "Asset Type", type: "dropdown", options: ["Case Study", "Playbook", "One-Pager", "Battle Card", "Demo Script", "FAQ Sheet", "Whitepaper", "Slide Deck"] },
        { label: "Asset Title", type: "text", placeholder: "Mid-Market Battle Card for Competitive Positioning" },
        { label: "Funnel Stage", type: "dropdown", options: ["Top-of-Funnel (TOFU)", "Middle-of-Funnel (MOFU)", "Bottom-of-Funnel (BOFU)"] },
        { label: "Content Format", type: "dropdown", options: ["PDF", "Slide", "Blog Post", "Video", "Interactive Tool"] },
        { label: "Distribution Channel", type: "dropdown", options: ["Email", "Sales Portal", "Website", "Social Media"] },
        { label: "Production Deadline", type: "date" },
        { label: "Custom Field", type: "text" }
      ]
    },
    {
      group: "Buyer Context",
      fields: [
        { label: "Target Audience Role", type: "dropdown", options: ["Marketing", "Sales", "Operations", "Finance", "IT", "Other"] },
        { label: "Industry", type: "dropdown", options: ["Tech", "Healthcare", "Finance", "Education", "Other"] },
        { label: "Primary Pain Point", type: "text", placeholder: "Difficulty educating prospects on compliance requirements" },
        { label: "Segment", type: "dropdown", options: ["Enterprise", "Mid-Market", "SMB", "Startup"] },
        { label: "Custom Field", type: "text" }
      ]
    },
    {
      group: "Messaging Style",
      fields: [
        { label: "Tone", type: "dropdown", options: ["Formal", "Conversational", "Data-Driven", "Empathetic", "Bold"] },
        { label: "Value Type", type: "dropdown", options: ["ROI", "Cost Savings", "Time Efficiency", "Risk Mitigation"] },
        { label: "Key Metrics / Stats", type: "text", placeholder: "Include stat: 75% of customers see ROI within 6 months" },
        { label: "Creative Hook", type: "text", placeholder: "Use analogy of a digital shield protecting customer data" },
        { label: "Custom Field", type: "text" }
      ]
    },
    {
      group: "Final Notes",
      fields: [
        { label: "Notes", type: "textarea", placeholder: "Need design approval from marketing team by 10/05 before production deadline." }
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

  "Campaign & Sequence Planning": [
    {
      group: "Prospect Profile",
      fields: [
        { label: "Persona", type: "text", placeholder: "Sales Development Rep – Enterprise SaaS" },
        { label: "Job Title(s)", type: "text", placeholder: "Outbound SDR – Mid-Market" },
        { label: "Seniority", type: "dropdown", options: ["C-Suite", "VP", "Director", "Manager", "IC (Independent Contractor)"] },
        { label: "Decision Role", type: "dropdown", options: ["Decision Maker", "Influencer", "Champion", "End-User"] },
        { label: "Pain / Priority", type: "text", placeholder: "Struggling to book meetings with VP-level prospects" },
        { label: "Location", type: "text", placeholder: "Toronto, ON" },
        { label: "Lead Source", type: "dropdown", options: ["Inbound", "Outbound", "Referral", "Event"] },
        { label: "Custom Field", type: "text" }
      ]
    },
    {
      group: "Company Context",
      fields: [
        { label: "Industry", type: "text", placeholder: "B2B Marketing Platform" },
        { label: "Company Size", type: "dropdown", options: ["1-10", "11-50", "51-200", "201-500", "501-1,000", "1,000+"] },
        { label: "Funding Stage", type: "dropdown", options: ["Bootstrapped", "Pre-Seed", "Seed", "Series A", "Series B", "Series C+", "IPO"] },
        { label: "Company Name", type: "text", placeholder: "MarketPulse" },
        { label: "Growth Signals", type: "text", placeholder: "Recently expanded sales team to 50+ reps" },
        { label: "Industry Keywords", type: "text", placeholder: "Lead Generation, ABM, SaaS Tools" },
        { label: "Deal Size", type: "text", placeholder: "$20k–$50k ARR" },
        { label: "Custom Field", type: "text" }
      ]
    },
    {
      group: "Sequence Design",
      fields: [
        { label: "Number of Emails", type: "number", placeholder: "6" },
        { label: "Number of Calls", type: "number", placeholder: "3" },
        { label: "Number of Social Touches", type: "number", placeholder: "4" },
        { label: "Number of SMS/Texts", type: "number", placeholder: "2" },
        { label: "Sequence Duration (Days)", type: "number", placeholder: "14" },
        { label: "Number of Steps / Touchpoints", type: "number", placeholder: "10" },
        { label: "Spacing Pattern (Days Between Touches)", type: "number", placeholder: "2" },
        { label: "Manual vs. Automated Tasks", type: "text", placeholder: "Manual: 5 / Automated: 7" },
        { label: "Theme", type: "dropdown", options: ["Seasonal", "Launch", "Account-Based Marketing (ABM)", "Evergreen", "Event-Driven"] },
        { label: "Cadence Type", type: "dropdown", options: ["Auto/Manual Mix", "All Manual", "All Automated"] },
        { label: "KPI / Goal", type: "text", placeholder: "Book 5 demos with Enterprise prospects" },
        { label: "A/B Test Variation", type: "dropdown", options: ["Yes", "No"] },
        { label: "Start Date", type: "date" },
        { label: "End Date", type: "date" },
        { label: "Custom Field", type: "text" }
      ]
    },
    {
      group: "Final Notes",
      fields: [
        { label: "Notes", type: "textarea", placeholder: "Sequence tested on small pilot group — adjust spacing after week 1 based on reply rates." }
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

  "Analytics & Optimization": [
    {
      group: "Performance Data",
      fields: [
        { label: "Campaign Name", type: "text", placeholder: "Q4 Outbound ABM Sequence" },
        { label: "Channel", type: "dropdown", options: ["Email", "LinkedIn", "Call", "SMS", "Video", "Mixed"] },
        { label: "Segment", type: "dropdown", options: ["Persona", "Industry", "Deal Size", "Region"] },
        { label: "Timeframe Start Date", type: "date" },
        { label: "Timeframe End Date", type: "date" },
        { label: "Metrics to Analyze", type: "multiselect", options: ["Open Rate", "Reply Rate", "Bounce Rate", "Conversion Rate", "Meeting Rate", "Opt-Outs", "Click-Through Rate"] },
        { label: "Variant/Test Name", type: "text", placeholder: "Subject Line A/B Test — Q4 Outreach" },
        { label: "Custom Field", type: "text" }
      ]
    },
    {
      group: "Insights & Optimization",
      fields: [
        { label: "Optimization Goal", type: "dropdown", options: ["Increase Open Rate", "Boost Reply Rate", "Reduce Bounce", "Increase Meetings", "Improve Conversion", "Shorten Sales Cycle"] },
        { label: "Observed Issues", type: "text", placeholder: "High bounce rate on day 2 emails" },
        { label: "Recommendations", type: "text", placeholder: "Clean the email list and update LinkedIn messaging tone" },
        { label: "Hypothesis", type: "text", placeholder: "Using personalized subject lines will increase open rates by 15%" },
        { label: "Experiment Duration (Days)", type: "number", placeholder: "14" },
        { label: "Custom Field", type: "text" }
      ]
    },
    {
      group: "Final Notes",
      fields: [
        { label: "Notes", type: "textarea", placeholder: "After running test for two weeks, open rates improved but replies remained flat — try new CTA in week 3." }
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

  "Market & Audience Research": [
    {
      group: "Goal & Audience",
      fields: [
        { label: "Research Goal", type: "dropdown", options: ["Audience Insights", "Competitive Landscape", "Market Sizing", "Concept Validation"] },
        { label: "Key Question You're Answering", type: "text", placeholder: "Which features are most important to small business owners?" },
        { label: "Target Group / Segment", type: "text", placeholder: "Owners of U.S. small businesses with under 50 employees." },
        { label: "Desired Participant Action", type: "text", placeholder: "Complete a 5-minute online survey." },
        { label: "Custom Field", type: "text", placeholder: "Include freelancers who act as consultants." }
      ]
    },
    {
      group: "Research Plan & Methods",
      fields: [
        { label: "Research Type", type: "dropdown", options: ["Quantitative (Survey)", "Qualitative (Interviews)", "Desk/Secondary Research", "Competitor Review"] },
        { label: "Data Collection Method", type: "multiselect", options: ["Online Form", "Phone Interview", "Social Media Poll", "Web Analytics", "Industry Reports"] },
        { label: "Sample Size or Scope", type: "text", placeholder: "Survey at least 150 respondents across three segments." },
        { label: "Timing", type: "dropdown", options: ["This Week", "This Month", "This Quarter"] },
        { label: "Custom Field", type: "text", placeholder: "What pain points lead users to switch to new software?" }
      ]
    },
    {
      group: "Data & Validation",
      fields: [
        { label: "Data Sources", type: "dropdown", options: ["Public Reports", "Social Media Insights", "CRM/Customer Data", "Competitor Websites"] },
        { label: "Working Assumptions / Hypotheses", type: "text", placeholder: "Segment A values ease of use more than price." },
        { label: "Segmentation Basis", type: "multiselect", options: ["Demographics", "Firmographics", "Psychographics", "Behaviors", "Needs"] },
        { label: "Data Quality Checks", type: "text", placeholder: "Check that responses aren't all from one region." },
        { label: "Privacy Considerations", type: "text", placeholder: "Collect responses anonymously and store securely." }
      ]
    },
    {
      group: "Results & Communication",
      fields: [
        { label: "Planned Deliverables", type: "dropdown", options: ["Executive Summary", "Persona Profiles", "Segmentation Matrix", "Competitive Matrix", "Slide Deck"] },
        { label: "Storage / Sharing Location", type: "dropdown", options: ["Google Docs", "Excel Sheet", "PowerPoint", "Internal Knowledge Base"] },
        { label: "Key Stakeholders", type: "text", placeholder: "Marketing director, product team lead, and CEO." },
        { label: "Tags / Keywords", type: "text", placeholder: "market research, productivity app, SMB owners" }
      ]
    },
    {
      group: "AI-Generated",
      fields: [
        { label: "Template 1", type: "text", placeholder: "Generate 10 research questions to uncover needs, challenges, and motivations of the target group." },
        { label: "Template 2", type: "text", placeholder: "Create a concise competitor comparison table showing pricing, features, and positioning." },
        { label: "Template 3", type: "text", placeholder: "Summarize collected data into a one-page insight brief with key takeaways." },
        { label: "Template 4", type: "text", placeholder: "Draft three clear persona profiles based on research findings." }
      ]
    }
  ],

  "Brand Strategy & Positioning": [
    {
      group: "Brand Identity",
      fields: [
        { label: "Your Persona", type: "text", placeholder: "Innovative startup founder seeking to disrupt traditional banking." },
        { label: "Mission Statement", type: "text", placeholder: "To make financial tools simple and accessible for small businesses." },
        { label: "Vision Statement", type: "text", placeholder: "Becoming the go-to financial platform for 1 million small businesses worldwide." },
        { label: "Core Values", type: "text", placeholder: "Transparency, innovation, customer-first, inclusivity." },
        { label: "Tagline / Slogan", type: "text", placeholder: "Banking reimagined for small businesses." },
        { label: "Brand Voice", type: "dropdown", options: ["Professional", "Friendly", "Bold", "Witty", "Compassionate", "Innovative", "Other"] },
        { label: "Custom Field", type: "text", placeholder: "Use storytelling and plain language in all messaging." }
      ]
    },
    {
      group: "Target Audience",
      fields: [
        { label: "Primary Persona", type: "text", placeholder: "Small business owners aged 25–45 looking for better financial tools." },
        { label: "Secondary Personas", type: "text", placeholder: "Freelancers and gig-economy workers seeking easier invoicing." },
        { label: "Audience Segment", type: "dropdown", options: ["B2B", "B2C", "B2G", "Nonprofit", "Startup", "Enterprise", "Other"] },
        { label: "Audience Aspirations / Challenges", type: "text", placeholder: "Want faster, easier access to credit; struggle with complex bank processes." },
        { label: "Custom Field", type: "text", placeholder: "Include early adopters who are tech-savvy but cost-sensitive." }
      ]
    },
    {
      group: "Positioning & Messaging",
      fields: [
        { label: "Unique Selling Proposition / Value Proposition", type: "text", placeholder: "We save small businesses time and money with one easy-to-use platform." },
        { label: "Key Messaging Pillars", type: "text", placeholder: "Ease of Use, Cost Savings, Personal Support, Security." },
        { label: "Brand Differentiators", type: "text", placeholder: "Faster approval times, no hidden fees, built-in analytics." },
        { label: "Competitive Landscape", type: "text", placeholder: "Main competitors include X and Y, but they lack integrated analytics." },
        { label: "Brand Goal", type: "dropdown", options: ["Awareness", "Consideration", "Preference", "Loyalty", "Advocacy", "Other"] },
        { label: "Custom Field", type: "text", placeholder: "Focus on emotional benefits (peace of mind) and functional benefits (faster results)." }
      ]
    },
    {
      group: "Brand Channels & Assets",
      fields: [
        { label: "Primary Channels", type: "multiselect", options: ["Website", "Blog", "Social Media", "Email", "Events", "Print", "Podcast", "Video", "PR", "Other"] },
        { label: "Visual Identity Guidelines", type: "text", placeholder: "Use deep blue and white as primary colors, sans-serif fonts, and geometric logo." },
        { label: "Tone & Style Guidelines", type: "text", placeholder: "Write in a conversational but confident tone, focusing on clarity and trust." },
        { label: "Crisis / Reputation Considerations", type: "text", placeholder: "Prepare a press statement template for product outages and security breaches." },
        { label: "Custom Field", type: "text", placeholder: "Quarterly community events for customer engagement." }
      ]
    },
    {
      group: "Final Notes",
      fields: [
        { label: "Notes", type: "textarea", placeholder: "Our brand strategy should evolve every 6 months with new customer insights." }
      ]
    },
    {
      group: "AI-Generated",
      fields: [
        { label: "Template 1", type: "text", placeholder: "Draft a mission and vision statement based on our product and audience." },
        { label: "Template 2", type: "text", placeholder: "Create 5 tagline options aligned with our brand values." },
        { label: "Template 3", type: "text", placeholder: "Summarize the top three competitors and their positioning." },
        { label: "Template 4", type: "text", placeholder: "Generate a one-page brand voice guide including tone, style, and sample phrases." }
      ]
    }
  ]
  ,

  "Copywriting": [
    {
      group: "Audience & Offer Context",
      fields: [
        { label: "Target Persona", type: "text", placeholder: "Young professionals who want a faster way to manage finances." },
        { label: "Pain Point / Desire", type: "text", placeholder: "Hates spending hours balancing spreadsheets." },
        { label: "Offer / Product Being Promoted", type: "text", placeholder: "New budgeting app with auto-categorization and one-tap reports." },
        { label: "Key Benefit / Main Promise", type: "text", placeholder: "Save 3 hours per week managing your money." },
        { label: "Price / Incentive / Deadline (if applicable)", type: "text", placeholder: "$9.99/month, first 30 days free." },
        { label: "Buyer Journey Stage", type: "dropdown", options: ["Awareness", "Consideration", "Decision", "Retention", "Loyalty"] }
      ]
    },
    {
      group: "Core Copy Elements for the Ad",
      fields: [
        { label: "Primary Headline / Hook", type: "text", placeholder: "Take Back Your Time — Automate Your Budget Today." },
        { label: "Supporting Copy / Body Text", type: "textarea", placeholder: "Our app automatically tracks expenses, categorizes spending, and gives you instant insights — all from your phone." },
        { label: "Call to Action (CTA)", type: "text", placeholder: "Start Your Free Trial Now." },
        { label: "Proof / Credibility", type: "text", placeholder: "Trusted by 10,000+ customers with a 4.9-star rating." },
        { label: "Urgency or Scarcity", type: "text", placeholder: "Offer ends September 30th." },
        { label: "Legal / Compliance Notes (if needed)", type: "text", placeholder: "Include disclaimers required by finance regulations." }
      ]
    },
    {
      group: "Creative & Channel Guidelines",
      fields: [
        { label: "Ad Format", type: "multiselect", options: ["Facebook/Instagram Ad", "Google Search Ad", "Display Banner", "Email Subject Line", "Landing Page Hero", "Print Ad", "Other"] },
        { label: "Length / Character Limits", type: "text", placeholder: "Headline ≤ 40 characters, body ≤ 90 characters." },
        { label: "Image or Visual Cue Notes", type: "text", placeholder: "Use lifestyle photo of young professional at a coffee shop." },
        { label: "Placement / Target Channel", type: "text", placeholder: "Instagram Stories" },
        { label: "Compliance / Brand Requirements", type: "text", placeholder: "Use the official color palette and logo." }
      ]
    },
    {
      group: "SEO & Keywords (Optional)",
      fields: [
        { label: "Primary Keyword", type: "text", placeholder: "budgeting app" },
        { label: "Secondary Keywords", type: "text", placeholder: "personal finance app, money management tool" },
        { label: "Search Intent", type: "dropdown", options: ["Informational", "Transactional", "Navigational", "Commercial"] },
        { label: "Meta Title / Description (if used on web)", type: "text", placeholder: "Save Time With Our Budgeting App — Free Trial." },
        { label: "Internal / External Links (if applicable)", type: "text", placeholder: "Link to landing page / pricing page." }
      ]
    },
    {
      group: "Variations & Testing",
      fields: [
        { label: "Alternate Headlines", type: "text", placeholder: "• Automate Your Budget • Save 3 Hours Per Week • Simplify Your Money." },
        { label: "Alternate CTAs", type: "text", placeholder: "Try It Free / Get Started / Join Now." },
        { label: "A/B Test Ideas", type: "text", placeholder: "Test urgency vs. no urgency in the CTA." },
        { label: "Key Metrics to Track", type: "multiselect", options: ["Click-Through Rate", "Conversions", "Cost Per Lead", "Engagement Rate"] }
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

  "SEO & Organic Traffic": [
    {
      group: "Essential SEO Information",
      fields: [
        { label: "Target Page / URL", type: "text", placeholder: "https://example.com/product-page" },
        { label: "Primary Keyword", type: "text", placeholder: "Suggest 5 target keywords for this page." },
        { label: "Search Intent", type: "dropdown", options: ["Informational", "Transactional", "Navigational", "Commercial"] },
        { label: "Meta Title", type: "text", placeholder: "Write a meta title using the primary keyword." },
        { label: "Meta Description", type: "text", placeholder: "Write a 150-character meta description with a clear benefit." },
        { label: "Content Gaps / Suggestions", type: "textarea", placeholder: "Identify 3 missing topics we should cover on this page." },
        { label: "Internal Links", type: "text", placeholder: "List 3 relevant internal pages to link to." },
        { label: "External Links", type: "text", placeholder: "List 2–3 reputable external sources to reference." },
        { label: "SEO Goal", type: "dropdown", options: ["Increase Rankings", "Increase Organic Traffic", "Improve Domain Authority", "Drive Conversions"] }
      ]
    },
    {
      group: "Optional (Advanced) SEO Information",
      fields: [
        { label: "Secondary Keywords", type: "text", placeholder: "Suggest 3–5 supporting keywords for this page." },
        { label: "Heading Structure (H1/H2)", type: "text", placeholder: "Recommend H1 and H2 tags for this page." },
        { label: "Current Ranking / Traffic", type: "text", placeholder: "This page currently ranks #12 with 1,200 monthly visits." },
        { label: "Technical Focus", type: "multiselect", options: ["Site Speed", "Mobile-Friendly", "Structured Data", "HTTPS", "Crawl Errors"] },
        { label: "Technical Notes", type: "text", placeholder: "Suggest one technical fix to improve page speed." },
        { label: "Off-Page Opportunities", type: "text", placeholder: "Suggest 3 sites where we can request backlinks." },
        { label: "Anchor Text Strategy", type: "text", placeholder: "Recommend anchor text for internal and external links." },
        { label: "KPIs", type: "multiselect", options: ["Organic Traffic", "Keyword Rankings", "Backlink Growth", "Click-Through Rate", "Bounce Rate", "Conversions"] },
        { label: "Reporting Frequency", type: "text", placeholder: "Monthly SEO performance check." }
      ]
    },
    {
      group: "AI-Generated",
      fields: [
        { label: "Template 1", type: "text", placeholder: "Generate a meta title and description for the primary keyword." },
        { label: "Template 2", type: "text", placeholder: "Suggest 5 content gaps to improve SEO for this page." },
        { label: "Template 3", type: "text", placeholder: "List internal and external link opportunities for this page." },
        { label: "Template 4", type: "text", placeholder: "Identify one quick technical SEO fix to improve performance." }
      ]
    }
  ],

  "Email & Lifecycle Marketing": [
    {
      group: "Audience & Segmentation",
      fields: [
        { label: "Your Persona", type: "text", placeholder: "First-time trial user of our app." },
        { label: "Audience Segment", type: "multiselect", options: ["New Leads", "Trial Users", "Prospects", "New Customers", "Loyal Customers", "Inactive Customers"] },
        { label: "How You Got This List", type: "text", placeholder: "Signed up on website form." },
        { label: "Tags or Notes About This Group", type: "text", placeholder: "Interested in automation features." }
      ]
    },
    {
      group: "Campaign & Purpose",
      fields: [
        { label: "Campaign Name", type: "text", placeholder: "Welcome Email #1" },
        { label: "Email Type", type: "dropdown", options: ["Newsletter", "Promotional", "Nurture Sequence", "Welcome Series", "Re-Engagement"] },
        { label: "Goal of This Email", type: "dropdown", options: ["Educate", "Engage", "Convert", "Upsell", "Retain"] },
        { label: "How You’ll Measure Success", type: "dropdown", options: ["Opens", "Clicks", "Conversions"] }
      ]
    },
    {
      group: "Content & Personalization",
      fields: [
        { label: "Subject Line", type: "text", placeholder: "Welcome to [Product] — Let’s Get Started" },
        { label: "Preview Text", type: "text", placeholder: "Quick tips to help you get the most out of your free trial." },
        { label: "Body Content Outline", type: "textarea", placeholder: "Say hello, show main benefit, give 1 action step." },
        { label: "Offer or Link", type: "text", placeholder: "Free guide download or quick start video." },
        { label: "CTA (Call to Action)", type: "dropdown", options: ["Read More", "Download", "Sign Up", "Book Demo"] },
        { label: "Personalization", type: "multiselect", options: ["First Name", "Company Name", "Location"] }
      ]
    },
    {
      group: "Timing & Automation",
      fields: [
        { label: "Send Date / Time", type: "text", placeholder: "October 15 at 10 AM" },
        { label: "Frequency / Cadence", type: "text", placeholder: "Send once, then follow up in 3 days." },
        { label: "Automation Trigger (Optional)", type: "text", placeholder: "User signs up for free trial." }
      ]
    },
    {
      group: "Testing & Compliance",
      fields: [
        { label: "A/B Test Item (Optional)", type: "text", placeholder: "Test two subject lines." },
        { label: "Compliance", type: "dropdown", options: ["Include Unsubscribe Link", "GDPR Consent"] }
      ]
    },
    {
      group: "Final Notes",
      fields: [
        { label: "Notes", type: "textarea", placeholder: "Highlight the main benefit in the first sentence." }
      ]
    },
    {
      group: "AI-Generated",
      fields: [
        { label: "Template 1", type: "text", placeholder: "Write 3 subject line ideas for this email." },
        { label: "Template 2", type: "text", placeholder: "Draft a short welcome email body with a CTA." },
        { label: "Template 3", type: "text", placeholder: "Suggest a follow-up email to send 3 days later." },
        { label: "Template 4", type: "text", placeholder: "Write an A/B test idea to improve clicks." }
      ]
    }
  ],

  "Marketing Analytics & Optimization": [
    {
      group: "Project & Scope",
      fields: [
        { label: "Project / Campaign Name", type: "text", placeholder: "Spring Email Promo" },
        { label: "Where You’ll Get Data", type: "multiselect", options: ["Google Analytics", "Email Tool", "Social Media Analytics"] },
        { label: "Time Frame", type: "dropdown", options: ["Last 7 Days", "Last 30 Days", "Last Quarter"] },
        { label: "Audience / Segment Focus (Optional)", type: "text", placeholder: "Traffic from Instagram ads." },
        { label: "Add Custom Field", type: "text", placeholder: "Additional Scope Details" }
      ]
    },
    {
      group: "Key Metrics & Goals",
      fields: [
        { label: "Main Metric You’re Watching", type: "dropdown", options: ["Website Traffic", "Clicks", "Conversions"] },
        { label: "Current Performance", type: "text", placeholder: "CTR 2%, Conversion Rate 3%." },
        { label: "Goal / Target", type: "text", placeholder: "CTR 3.5%, Conversion Rate 4%." },
        { label: "Add Custom Field", type: "text", placeholder: "Other Goal Notes" }
      ]
    },
    {
      group: "Insights & Takeaways",
      fields: [
        { label: "One Key Insight", type: "text", placeholder: "Email with short subject line got 20% more opens." },
        { label: "One Problem / Challenge", type: "text", placeholder: "Landing page load time is slow on mobile." },
        { label: "Add Custom Field", type: "text", placeholder: "Other Insight Notes" }
      ]
    },
    {
      group: "Testing & Experimentation (Optional)",
      fields: [
        { label: "What You Want to Test", type: "text", placeholder: "Try new CTA text." },
        { label: "How You’ll Test It", type: "dropdown", options: ["A/B Test", "Quick Pilot", "Manual Compare"] },
        { label: "Add Custom Field", type: "text", placeholder: "Additional Testing Details" }
      ]
    },
    {
      group: "Recommendations & Action",
      fields: [
        { label: "One Improvement to Try", type: "text", placeholder: "Add testimonials above the CTA button." },
        { label: "When You’ll Review Results", type: "text", placeholder: "Check metrics in 2 weeks." },
        { label: "Add Custom Field", type: "text", placeholder: "Further Recommendations" }
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

  "Launch Product": [
    {
      group: "Launch Basics",
      fields: [
        { label: "Product / Launch Name", type: "text", placeholder: "Smart Home Hub Launch Q4 2025" },
        { label: "Launch Objective", type: "dropdown", options: ["Awareness", "Feature Release", "Partnership Announcement", "Product Upgrade"] },
        { label: "Key Message / Value Proposition", type: "text", placeholder: "Introducing our AI-powered Smart Home Hub to simplify home management." },
        { label: "Target Audience", type: "text", placeholder: "Tech-savvy homeowners aged 25–45." },
        { label: "Launch Date", type: "date", placeholder: "November 15, 2025" },
        { label: "Add Custom Field", type: "text", placeholder: "Extra Launch Details" }
      ]
    },
    {
      group: "Messaging & Assets",
      fields: [
        { label: "Core Benefits (Bulleted)", type: "text", placeholder: "• Saves time • Integrates with existing devices • Affordable price point." },
        { label: "Story Angle / Narrative", type: "text", placeholder: "Focus on how this product saves time and reduces energy costs." },
        { label: "Supporting Assets", type: "text", placeholder: "Product photos, demo video, FAQs, landing page copy." },
        { label: "Press Release / Blog Announcement (Optional)", type: "text", placeholder: "Write a launch blog post introducing the product and its benefits." },
        { label: "Add Custom Field", type: "text", placeholder: "Additional Messaging Notes" }
      ]
    },
    {
      group: "Distribution Plan",
      fields: [
        { label: "Primary Channels", type: "multiselect", options: ["Email", "Social Media", "Blog Post", "Website Banner", "Paid Ads", "Influencer Collaboration"] },
        { label: "Audience / Stakeholders to Notify", type: "text", placeholder: "VIP customers, partners, and internal teams." },
        { label: "Launch Schedule / Cadence", type: "text", placeholder: "Teaser campaign 2 weeks before launch, main launch on date, follow-up 1 week later." },
        { label: "Add Custom Field", type: "text", placeholder: "Other Distribution Details" }
      ]
    },
    {
      group: "Engagement & Follow-Up",
      fields: [
        { label: "Post-Launch Nurture", type: "text", placeholder: "Send thank-you email with product demo link." },
        { label: "Monitoring & Response Strategy", type: "text", placeholder: "Track social sentiment and respond quickly." },
        { label: "Customer Activation Plan", type: "text", placeholder: "Offer special discount for first 500 sign-ups." },
        { label: "Add Custom Field", type: "text", placeholder: "Engagement Notes" }
      ]
    },
    {
      group: "Success Metrics",
      fields: [
        { label: "KPIs", type: "multiselect", options: ["Sign-Ups", "Website Traffic", "Social Mentions", "Leads Generated", "Product Sales"] },
        { label: "Benchmark / Target", type: "text", placeholder: "500 sign-ups and 1,000 new customers within 30 days." },
        { label: "Reporting Timeline", type: "text", placeholder: "Review metrics 2 weeks after launch, full report after 30 days." },
        { label: "Add Custom Field", type: "text", placeholder: "Metric Notes" }
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
  ]
};