import React, { useState } from "react";
import { ContextData } from "./PromptEngSection";

interface Props {
  contextData: ContextData;
  setContextData: React.Dispatch<React.SetStateAction<ContextData>>;
}

type FieldType = "text" | "dropdown" | "checkbox" | "multiselect" | "file" | "date" | "toggle" | "link" | "upload" | "daterange" | "number";

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


const optionFieldsConfig: OptionFieldsConfig = {
  "Sales & Lead Generation": [
    {
      group: "🧩 Sales and Lead Generation - 🎯 Buyer Persona Variables",
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
      group: "Sales Intent & Trigger Data",
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
      group: "Message Framing",
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
      group: "Delivery Format",
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

  "Customer Support & Service": [
    {
      group: "Customer Profile",
      fields: [
        { label: "Name", type: "text" },
        { label: "Account ID / Customer ID", type: "text" },
        {
          label: "Plan / Tier",
          type: "dropdown",
          options: ["Free", "Pro", "Enterprise"],
        },
        {
          label: "Tenure",
          type: "dropdown",
          options: ["New Customer", "Loyal", "Churn Risk"],
        },
        {
          label: "Region / Time Zone",
          type: "dropdown",
          options: ["US", "EU", "Asia", "Other"],
        },
        {
          label: "Language Preference",
          type: "dropdown",
          options: ["English", "Spanish", "French", "Other"],
        },
        { label: "Support History", type: "text" },
        {
          label: "Sentiment Score",
          type: "dropdown",
          options: ["Positive", "Neutral", "Frustrated", "Angry"],
        },
        // { label: "NPS Score / CSAT History", type: "number" },
        { label: "Purchase History / Product Usage", type: "text" },
      ],
    },
    {
      group: "Issue Context",
      fields: [
        {
          label: "Ticket Type",
          type: "dropdown",
          options: ["Bug", "Billing", "Feature Request", "Other"],
        },
        {
          label: "Priority Level",
          type: "dropdown",
          options: ["Urgent", "Normal", "Low"],
        },
        {
          label: "Channel Origin",
          type: "dropdown",
          options: ["Email", "Chat", "Phone", "Other"],
        },
        {
          label: "Submission Time",
          type: "dropdown",
          options: ["Business Hours", "After Hours"],
        },
        { label: "Device / Platform", type: "text" },
        { label: "Browser / App Version", type: "text" },
        {
          label: "Issue Reproducibility",
          type: "dropdown",
          options: ["One-off", "Recurring", "Edge Case"],
        },
        { label: "Time Since Last Response", type: "text" },
        {
          label: "Escalation Status",
          type: "dropdown",
          options: ["Level 1", "Level 2", "Other"],
        },
      ],
    },
    {
      group: "Response Logic",
      fields: [
        {
          label: "Response Goal",
          type: "dropdown",
          options: ["Inform", "Resolve", "Apologize", "Escalate", "Confirm", "Delay"],
        },
        {
          label: "Tone",
          type: "dropdown",
          options: ["Empathetic", "Professional", "Playful", "Assertive", "Apologetic"],
        },
        { label: "Agent Role Prompt", type: "text" },
        {
          label: "Personalization Level",
          type: "dropdown",
          options: ["Low", "Medium", "High"],
        },
        { label: "Knowledge Base Context", type: "link" },
        {
          label: "Expected Customer Reaction",
          type: "dropdown",
          options: ["Positive", "Neutral", "Negative"],
        },
        {
          label: "Required Legal Language",
          type: "dropdown",
          options: ["Yes", "No"],
        },
      ],
    },
    {
      group: "Support Content",
      fields: [
        { label: "Product Feature Mentioned", type: "text" },
        { label: "Documentation Link / Article", type: "link" },
        { label: "Troubleshooting Steps", type: "text" },
        { label: "Common Resolutions", type: "text" },
        {
          label: "Template Type",
          type: "dropdown",
          options: ["First Response", "Follow-up", "Closure", "Apology"],
        },
        { label: "Embedded Media", type: "upload" },
        { label: "Multi-lingual Output", type: "toggle" },
      ],
    },
    {
      group: "Billing / Payment",
      fields: [
        { label: "Invoice Number", type: "text" },
        { label: "Payment Method", type: "text" },
        { label: "Last Payment Date", type: "date" },
        { label: "Subscription Start / End", type: "daterange" },
        { label: "Discount Code / Promo Applied", type: "text" },
        { label: "Refund Eligibility", type: "toggle" },
        { label: "Trial Period Status", type: "toggle" },
        { label: "Past Disputes", type: "text" },
      ],
    },
    {
      group: "System & Workflow",
      fields: [
        {
          label: "Support Platform Used",
          type: "dropdown",
          options: ["Zendesk", "Intercom", "Freshdesk", "HelpScout"],
        },
        { label: "SLAs", type: "text" },
        { label: "Agent Handling It", type: "text" },
        {
          label: "Tags / Categories",
          type: "multiselect",
          options: ["Billing", "Technical", "Feature Request", "Bug"],
        },
        {
          label: "Workflow Stage",
          type: "dropdown",
          options: ["Open", "Pending", "Solved", "Other"],
        },
        { label: "Follow-up Trigger", type: "toggle" },
        { label: "Escalation Path", type: "text" },
      ],
    },
    {
      group: "Analytics & Feedback",
      fields: [
        { label: "Resolution Time", type: "number" },
        { label: "Time to First Response", type: "number" },
        { label: "Reopen Count", type: "number" },
        { label: "Agent Rating", type: "number" },
        { label: "Customer Feedback", type: "text" },
        { label: "Recurring Issue Flag", type: "toggle" },
        { label: "Support Volume Trends", type: "text" },
        { label: "Response Tone", type: "text" },
      ],
    },
    {
      group: "Agent Training Prompts (Meta)",
      fields: [
        { label: "System Message Role", type: "text", placeholder: 'e.g., "You are a friendly, empathetic support rep for a B2B SaaS."' },
        { label: "Few-shot Prompts", type: "text", placeholder: "e.g., frustrated refund, confused login" },
        {
          label: "Output Format",
          type: "dropdown",
          options: ["Short Email", "Long-form", "FAQ"],
        },
        { label: "Temperature Control", type: "text", placeholder: "tone-sensitive generation" },
        { label: "Do/Don't", type: "text", placeholder: "e.g., use empathy, avoid technical jargon" },
        {
          label: "Persona Modes",
          type: "dropdown",
          options: ["Novice", "Technical", "Power User"],
        },
      ],
    },
  ],

  "Marketing and Content Creation":[
  {
    group: "Audience & Persona Variables",
    fields: [
      { label: "Audience Segment", type: "text", placeholder: "e.g., Gen Z founders, SaaS CMOs" },
      { label: "Content Goal", type: "text", placeholder: "e.g., brand awareness, lead gen" },
      { label: "Funnel Stage", type: "dropdown", options: ["TOFU", "MOFU", "BOFU"] },
      { label: "Persona Motivation", type: "dropdown", options: ["status", "efficiency", "impact", "community", "creativity"] },
      { label: "Buying Intent", type: "dropdown", options: ["low", "warm", "high"] },
      { label: "Pain / Obsession / Curiosity Point", type: "text" },
      { label: "Emotional Levers", type: "dropdown", options: ["inspiration", "validation", "FOMO", "clarity", "fear", "trust"] },
      { label: "Tone / Voice Match", type: "dropdown", options: ["playful", "expert", "empathetic", "disruptive", "hype"] }
    ]
  },
  {
    group: "Brand & Product Context",
    fields: [
      { label: "Company Name", type: "text" },
      { label: "Industry / Niche", type: "dropdown", options: [] },
      { label: "Product or Offer (headline version)", type: "text" },
      { label: "Offer Type", type: "dropdown", options: ["SaaS", "course", "service", "physical product", "community"] },
      { label: "Current Positioning", type: "dropdown", options: ["premium", "affordable", "cutting-edge", "friendly"] },
      { label: "Value Proposition or Big Idea", type: "text" },
      { label: "Core Differentiator", type: "text" },
      { label: "Call to Action", type: "text" }
    ]
  },
  {
    group: "Strategy & Channel Inputs",
    fields: [
      { label: "Content Type", type: "dropdown", options: ["social post", "blog", "email", "ad", "video script", "landing page"] },
      { label: "Distribution Channel", type: "dropdown", options: ["LinkedIn", "Instagram", "Twitter", "TikTok", "Email", "Blog"] },
      { label: "Content Framework", type: "dropdown", options: ["story-driven", "listicle", "insight drop", "how-to", "PSA"] },
      { label: "Post Format", type: "dropdown", options: ["carousel", "thread", "meme", "static visual", "infographic", "reel"] },
      { label: "Campaign Style", type: "dropdown", options: ["evergreen", "seasonal", "launch", "teaser"] },
      { label: "Publishing Cadence / Time Sensitivity", type: "text" },
      { label: "Repurpose from Existing Asset", type: "checkbox" },
      { label: "Source Inspiration", type: "text", placeholder: "URL, file link, or paste copy" }
    ]
  },
  {
    group: "Message Framing Logic",
    fields: [
      { label: "Narrative Device", type: "dropdown", options: ["origin story", "testimonial", "hot take", "before/after", "analogy"] },
      { label: "Hook Style", type: "dropdown", options: ["question", "stat", "polarizing claim", "pain visual", "curiosity opener"] },
      { label: "CTA Type", type: "dropdown", options: ["comment bait", "link click", "save/share", "reply prompt"] },
      { label: "Persuasion Focus", type: "dropdown", options: ["authority", "likability", "logic", "scarcity", "novelty"] },
      { label: "Tone", type: "dropdown", options: ["spartan", "magnetic", "ironic", "poetic", "satirical", "warm"] },
      { label: "Temperature", type: "dropdown", options: ["safe", "edgy", "controversial", "unfiltered", "emotional"] },
      { label: "Objection Reframe", type: "text", placeholder: "e.g., 'But won’t this take too long?'" }
    ]
  },
  {
    group: "Audience Relevance & SEO",
    fields: [
      { label: "Keyword Focus", type: "dropdown", options: ["short-tail", "long-tail", "question-based", "branded"] },
      { label: "Audience Language or Slang", type: "text" },
      { label: "Competitor Mentions or Comparisons", type: "text" },
      { label: "Cultural Reference or Trend Tie-In", type: "text" },
      { label: "Community Hashtags / Tag Targets", type: "text" }
    ]
  },
  {
    group: "Delivery Format",
    fields: [
      { label: "Output Format", type: "dropdown", options: ["tweet thread", "IG carousel", "blog post", "cold ad", "landing copy", "CTA headline", "story script"] },
      { label: "Length Preference", type: "dropdown", options: ["1-liner", "short form", "mid", "long form"] },
      { label: "Visual Element Type", type: "dropdown", options: ["meme", "quote image", "reel idea", "infographic", "stat visual"] },
      { label: "Opening Line", type: "text" },
      { label: "Series Context", type: "dropdown", options: ["standalone", "part 1 of 3", "daily drop"] },
      { label: "Platform-Specific Constraint", type: "dropdown", options: ["character limit", "hashtag format", "caption flow"] }
    ]
  },
  {
    group: "Reference & Authority Signals",
    fields: [
      { label: "Social Proof Mention", type: "checkbox" },
      { label: "Testimonial, Review, or Quote", type: "text" },
      { label: "Named Source or Stat", type: "text" },
      { label: "Case Study / Content Inspiration", type: "text" },
      { label: "Community Mention or Influencer Reference", type: "checkbox" },
      { label: "Industry Event / Cultural Tie-In", type: "text" }
    ]
  },
  {
    group: "Prompt Engine Logic Variables",
    fields: [
      { label: "Prompt Objective", type: "dropdown", options: ["generate", "rewrite", "personalize", "ideate", "summarize"] },
      { label: "Confidence Level", type: "dropdown", options: ["assertive", "subtle", "bold"] },
      { label: "Tone Instruction", type: "dropdown", options: ["empowering", "snarky", "smart", "educational"] },
      { label: "Persona Archetype", type: "dropdown", options: ["visionary", "skeptic", "builder", "trendspotter"] },
      { label: "Output Format", type: "dropdown", options: ["social caption", "script", "email", "thread", "headline options"] },
      { label: "Expected Reaction or Engagement Type", type: "text", placeholder: "comment, click, save, follow" }
    ]
  }
  ],

  "Operations & Workflow Management" : [
  {
    group: "Team & Role Context",
    fields: [
      { label: "Team or Department Name", type: "text", placeholder: "e.g., IT Ops, BizOps, People, RevOps" },
      { label: "Function Focus", type: "dropdown", options: ["process design", "automation", "vendor mgmt", "reporting"] },
      { label: "Org Type", type: "dropdown", options: ["startup", "scale-up", "enterprise", "agency", "nonprofit"] },
      { label: "Stakeholder Level", type: "dropdown", options: ["C-suite", "VP", "Director", "Team Lead", "IC"] },
      { label: "Process Owner", type: "text", placeholder: "Name or role" },
      { label: "Cross-Functional Dependencies", type: "text", placeholder: "e.g., works with Finance, HR, Legal" }
    ]
  },
  {
    group: "Workflow Objective",
    fields: [
      { label: "Prompt Use Case", type: "dropdown", options: ["generate SOP", "summarize process", "automate task", "QA draft", "review doc"] },
      { label: "Target Outcome", type: "dropdown", options: ["efficiency", "consistency", "compliance", "clarity"] },
      { label: "Workflow Type", type: "text", placeholder: "e.g., onboarding, procurement, content publishing" },
      { label: "Current Tools Involved", type: "dropdown", options: ["Airtable", "Notion", "Slack", "Zapier", "ClickUp"] },
      { label: "Known Bottlenecks or Gaps", type: "text" },
      { label: "Cross-Tool Automation Required", type: "checkbox" },
      { label: "Recurrence", type: "dropdown", options: ["one-off", "daily", "weekly", "monthly", "ad-hoc"] }
    ]
  },
  {
    group: "Data & Process Inputs",
    fields: [
      { label: "Input Format", type: "dropdown", options: ["meeting notes", "spreadsheet", "system log", "checklist", "form response"] },
      { label: "Source Document or System", type: "text", placeholder: "URL or file reference (optional)" },
      { label: "Process Clarity Level", type: "dropdown", options: ["defined", "partially mapped", "undocumented"] },
      { label: "Includes Metrics or KPIs", type: "checkbox" },
      { label: "Key Inputs or Rules", type: "text" },
      { label: "Known Failure Points / Audit Flags", type: "text" },
      { label: "Collaboration Need", type: "dropdown", options: ["solo", "multi-team", "async", "real-time"] }
    ]
  },
  {
    group: "Framing Logic",
    fields: [
      { label: "Prompt Goal", type: "dropdown", options: ["summarize", "improve", "document", "analyze", "simplify"] },
      { label: "Task Type", type: "dropdown", options: ["admin", "reporting", "systems", "QA", "handoff", "training"] },
      { label: "Language Style", type: "dropdown", options: ["direct", "instructional", "visual", "step-by-step"] },
      { label: "Tone", type: "dropdown", options: ["compliance-heavy", "collaborative", "informal", "technical", "consultative"] },
      { label: "Required Output Format", type: "text", placeholder: "e.g., SOP, checklist, dashboard draft" },
      { label: "Audience Type", type: "dropdown", options: ["ICs", "team leads", "execs", "cross-functional teams"] }
    ]
  },
  {
    group: "Operational Sensitivity",
    fields: [
      { label: "Confidentiality Level", type: "dropdown", options: ["public", "internal", "sensitive", "legal/audit"] },
      { label: "Security/Compliance Relevance", type: "checkbox" },
      { label: "Requires Legal/HR Approval", type: "checkbox" },
      { label: "Stakeholder Risks or Constraints", type: "text" },
      { label: "Time-Sensitive Task", type: "checkbox" },
      { label: "Version Control Notes or Ownership Flags", type: "text" }
    ]
  },
  {
    group: "Output Delivery Format",
    fields: [
      { label: "Output Format", type: "dropdown", options: ["SOP doc", "wiki entry", "Slack message", "form instructions", "task brief"] },
      { label: "Output Length", type: "dropdown", options: ["one-pager", "overview", "full process"] },
      { label: "Visual Add-Ons", type: "dropdown", options: ["flowchart", "decision tree", "checklist", "diagram"] },
      { label: "Platform Compatibility", type: "dropdown", options: ["Notion", "Confluence", "Slide", "PDF", "Markdown"] },
      { label: "Export / Integration Preference", type: "text" }
    ]
  },
  {
    group: "Reference & Alignment",
    fields: [
      { label: "Existing SOP or Template", type: "text", placeholder: "File link or text" },
      { label: "Linked Workflow or Tool", type: "text", placeholder: "e.g., Zapier flow, Jira board" },
      { label: "Owner of Reference System", type: "text" },
      { label: "Desired Best Practice Source", type: "dropdown", options: ["industry standard", "internal doc", "external template"] },
      { label: "Benchmark or Comparison Requested", type: "checkbox" },
      { label: "Style Match", type: "text", placeholder: "Match tone of X doc or team" }
    ]
  },
  {
    group: "Prompt Engine Logic Variables",
    fields: [
      { label: "Prompt Objective", type: "dropdown", options: ["generate", "rewrite", "improve", "QA", "visualize"] },
      { label: "Confidence Level", type: "dropdown", options: ["strictly defined", "flexible suggestion"] },
      { label: "Tone Instruction", type: "dropdown", options: ["formal", "collaborative", "plain language", "detailed"] },
      { label: "Output Format", type: "dropdown", options: ["step-by-step", "chart", "summary", "checklist", "table"] },
      { label: "Intended Action After Output", type: "text", placeholder: "publish, delegate, review, automate" }
    ]
  }
  ],

  "Audience & Role Context" : [
  {
    group: "Audience & Role Context",
    fields: [
      { label: "Team or Department", type: "text", placeholder: "e.g., Sales, Product, Customer Success, HR" },
      { label: "Audience Type", type: "dropdown", options: ["new hire", "IC", "manager", "executive", "cross-functional"] },
      { label: "Communication Style", type: "dropdown", options: ["directive", "collaborative", "informative", "motivational"] },
      { label: "Sender Perspective", type: "text", placeholder: "e.g., People Ops, Enablement Lead, CX Director" },
      { label: "Use Case", type: "dropdown", options: ["training", "announcement", "documentation", "culture alignment", "async update"] }
    ]
  },
  {
    group: "Objective & Learning Goal",
    fields: [
      { label: "Topic or Initiative", type: "text", placeholder: "e.g., product update, onboarding flow, values rollout" },
      { label: "Training Type", type: "dropdown", options: ["SOP", "FAQ", "onboarding", "how-to guide", "video script", "live deck"] },
      { label: "Intended Behavior or Understanding Shift", type: "text" },
      { label: "Learning Goal Format", type: "dropdown", options: ["step-by-step", "story-based", "use-case driven", "compliance-focused"] },
      { label: "Key Takeaways or Must-Know Info", type: "text" },
      { label: "Include Quiz or Knowledge Check", type: "checkbox" }
    ]
  },
  {
    group: "Contextual Inputs",
    fields: [
      { label: "Source Material", type: "text", placeholder: "slide, doc, product brief, policy draft" },
      { label: "Content Maturity", type: "dropdown", options: ["draft", "final", "outdated", "partial"] },
      { label: "Includes Metrics / KPIs", type: "checkbox" },
      { label: "Existing Confusions or Misalignment", type: "text" },
      { label: "Stakeholder Feedback / Concerns to Address", type: "text" },
      { label: "Systems or Tools Mentioned", type: "text", placeholder: "Slack, Notion, LMS, CRM, etc." }
    ]
  },
  {
    group: "Communication Framing",
    fields: [
      { label: "Tone", type: "dropdown", options: ["warm", "clear", "professional", "culture-first", "humorous"] },
      { label: "Instruction Style", type: "dropdown", options: ["bullet-pointed", "FAQ", "visual-first", "step-by-step"] },
      { label: "Format Type", type: "dropdown", options: ["memo", "async update", "script", "announcement", "onboarding flow", "deck outline"] },
      { label: "Internal CTA or Behavior Prompt", type: "text", placeholder: "e.g., read by Friday, click to acknowledge, follow-up training required" },
      { label: "Comms Channel", type: "dropdown", options: ["email", "Slack", "Notion", "LMS", "video", "doc"] }
    ]
  },
  {
    group: "Delivery Details",
    fields: [
      { label: "Length Preference", type: "dropdown", options: ["short-form", "overview", "full deep-dive"] },
      { label: "Media Element", type: "dropdown", options: ["GIF", "Loom", "embedded link", "diagram", "quiz embed"] },
      { label: "Timing / Cadence", type: "dropdown", options: ["one-time", "weekly", "pre-launch", "recurring reminder"] },
      { label: "Follow-up Plan", type: "text", placeholder: "survey, Slack thread, team sync, manager 1:1" },
      { label: "Output Format", type: "dropdown", options: ["Notion page", "Google Doc", "Slide deck", "internal post", "email draft"] }
    ]
  },
  {
    group: "Prompt Engine Logic Variables",
    fields: [
      { label: "Prompt Objective", type: "dropdown", options: ["summarize", "rewrite", "create", "convert format", "personalize"] },
      { label: "Persona Style", type: "dropdown", options: ["first-time learner", "overwhelmed reader", "team leader", "skeptical stakeholder"] },
      { label: "Confidence Level", type: "dropdown", options: ["assertive", "nurturing", "passive", "neutral"] },
      { label: "Instruction Clarity", type: "dropdown", options: ["high-detail", "brief", "scaffolded", "with analogies"] },
      { label: "Anticipated Confusion or Objection", type: "text" },
      { label: "Output Format", type: "dropdown", options: ["FAQ", "checklist", "email", "slide", "doc", "async script"] }
    ]
  }
  ],

  "Other (Custom or Experimental Use)" : [
  {
    group: "User Intent & Context",
    fields: [
      { label: "Describe the Goal or Use Case", type: "text", placeholder: "e.g., experiment, custom logic, brainstorm, niche workflow" },
      { label: "Output Purpose", type: "dropdown", options: ["ideation", "reflection", "automation", "documentation", "exploration"] },
      { label: "User Type", type: "dropdown", options: ["freelancer", "researcher", "founder", "educator", "hobbyist", "unknown"] },
      { label: "Real-World Application or Scenario", type: "text" },
      { label: "Outcome Priority", type: "dropdown", options: ["clarity", "speed", "creativity", "technical precision", "emotional depth"] }
    ]
  },
  {
    group: "Input & Reference Layer",
    fields: [
      { label: "Source Material", type: "text", placeholder: "link, file, example, rough draft, brief" },
      { label: "Input Structure", type: "dropdown", options: ["unstructured notes", "idea map", "structured brief", "question list"] },
      { label: "Keywords, Themes, or Entities to Include", type: "text" },
      { label: "Required Fidelity", type: "dropdown", options: ["rough sketch", "polished output"] },
      { label: "Includes Technical/Creative Blend", type: "checkbox" },
      { label: "Optional Constraints or Guardrails", type: "text", placeholder: "e.g., length limit, no AI-sounding phrases" }
    ]
  },
  {
    group: "Prompt Strategy Layer",
    fields: [
      { label: "Prompt Type", type: "dropdown", options: ["generate", "transform", "critique", "stylize", "summarize", "remix"] },
      { label: "Instruction Style", type: "dropdown", options: ["directive", "open-ended", "chain-of-thought", "exploratory"] },
      { label: "Output Format", type: "dropdown", options: ["email", "poem", "explainer", "joke", "prototype", "question set", "combo"] },
      { label: "Creativity Temperature", type: "dropdown", options: ["neutral", "flexible", "experimental", "unhinged"] },
      { label: "Audience Clarity", type: "dropdown", options: ["just for me", "for review", "for clients", "for public"] },
      { label: "Post-Output Action", type: "text", placeholder: "e.g., publish, discuss, test, discard, iterate" }
    ]
  },
  {
    group: "Output Delivery & Framing",
    fields: [
      { label: "Channel / Medium", type: "dropdown", options: ["doc", "note", "tweet", "blog", "DM", "none"] },
      { label: "Tone", type: "dropdown", options: ["neutral", "playful", "poetic", "assertive", "cryptic", "branded"] },
      { label: "Structure Preference", type: "dropdown", options: ["bullets", "paragraphs", "dialogue", "visual-first", "hybrid"] },
      { label: "First Line or Opening Hook", type: "text" },
      { label: "Add-On Format", type: "dropdown", options: ["meme", "quote", "stat", "analogy", "metaphor", "challenge prompt"] }
    ]
  },
  {
    group: "Prompt Engine Logic Variables",
    fields: [
      { label: "Prompt Objective", type: "dropdown", options: ["ideate", "generate", "reframe", "extend", "debug", "contrast"] },
      { label: "Perspective or Voice", type: "dropdown", options: ["AI assistant", "philosopher", "critic", "fan", "founder", "wildcard"] },
      { label: "Risk Level", type: "dropdown", options: ["safe", "edgy", "absurd", "reflective"] },
      { label: "What Should the Output Feel Like?", type: "text" }
    ]
  }
],


};


const BusinessContextStep: React.FC<Props> = ({
  contextData,
  setContextData,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const updateFieldValue = (label: string, value: any) => {
    setContextData((prev) => ({
      ...prev,
      dynamicFields: { ...(prev.dynamicFields || {}), [label]: value },
    }));
  };

  const addCustomField = () => {
    setContextData((prev) => ({
      ...prev,
      customFields: [...(prev.customFields || []), ""],
    }));
  };

  const updateCustomField = (index: number, value: string) => {
    setContextData((prev) => {
      const updated = [...(prev.customFields || [])];
      updated[index] = value;
      return { ...prev, customFields: updated };
    });
  };

  const removeCustomField = (index: number) => {
    setContextData((prev) => {
      const updated = [...(prev.customFields || [])];
      updated.splice(index, 1);
      return { ...prev, customFields: updated };
    });
  };

 return (
  <div className="rounded-lg shadow-sm border-[0.5px] border-gold/30 p-4 sm:p-6 mb-6">
    {/* Category Selector */}
    <div className="mb-4">
      <label className="block mb-1 text-sm font-medium text-black">
        Select Business Category
      </label>
      <select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        className="w-full p-2 border-[0.5px] border-gold/30 rounded-md bg-ivory"
      >
        <option value="">Choose an option...</option>
        {Object.keys(optionFieldsConfig).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>

    {/* Dynamic Fields */}
    {selectedOption &&
      optionFieldsConfig[selectedOption]?.map((group, idx) => (
        <div
          key={idx}
          className="mb-6 border-t-[0.5px] border-gold/30 pt-4"
        >
          <h3 className="text-base sm:text-lg font-semibold mb-3">
            ➤ {group.group}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {group.fields.map((field, i) => (
              <div key={i} className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">
                  {field.label}
                </label>

                {/* Text */}
                {field.type === "text" && (
                  <input
                    type="text"
                    placeholder={field.placeholder || ""}
                    className="px-3 py-2 border-[0.5px] border-gold/30 rounded-md 
                               focus:ring-2 focus:ring-gold focus:border-gold text-sm bg-ivory w-full"
                    onChange={(e) =>
                      updateFieldValue(field.label, e.target.value)
                    }
                  />
                )}

                {/* Number */}
                {field.type === "number" && (
                  <input
                    type="number"
                    className="px-3 py-2 border-[0.5px] border-gold/30 rounded-md 
                               focus:ring-2 focus:ring-gold focus:border-gold text-sm bg-ivory w-full"
                    onChange={(e) =>
                      updateFieldValue(field.label, Number(e.target.value))
                    }
                  />
                )}

                {/* Dropdown */}
                {field.type === "dropdown" && (
                  <select
                    className="px-3 py-2 border-[0.5px] border-gold/30 rounded-md 
                               focus:ring-2 focus:ring-gold focus:border-gold text-sm bg-ivory w-full"
                    onChange={(e) =>
                      updateFieldValue(field.label, e.target.value)
                    }
                  >
                    <option value="">Select...</option>
                    {field.options?.map((opt, oi) => (
                      <option key={oi} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                )}

                {/* Multi-select */}
                {field.type === "multiselect" && (
                  <div className="border-[0.5px] border-gold/30 rounded-md p-2 flex flex-wrap gap-2 min-h-[42px] bg-ivory">
                    {(contextData.dynamicFields?.[field.label] || []).map(
                      (item: string, index: number) => (
                        <span
                          key={index}
                          className="flex items-center gap-1 bg-gold/20 text-gold px-2 py-1 rounded-full text-sm"
                        >
                          {item}
                          <button
                            type="button"
                            onClick={() => {
                              const currentValues =
                                contextData.dynamicFields?.[field.label] || [];
                              updateFieldValue(
                                field.label,
                                currentValues.filter(
                                  (val: string) => val !== item
                                )
                              );
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </span>
                      )
                    )}
                    <select
                      className="border-0 focus:ring-0 outline-none bg-transparent text-sm"
                      onChange={(e) => {
                        const value = e.target.value;
                        const currentValues =
                          contextData.dynamicFields?.[field.label] || [];
                        if (value && !currentValues.includes(value)) {
                          updateFieldValue(field.label, [
                            ...currentValues,
                            value,
                          ]);
                        }
                        e.target.value = "";
                      }}
                    >
                      <option value="">Select...</option>
                      {field.options?.map((opt, oi) => (
                        <option key={oi} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Checkbox */}
                {field.type === "checkbox" && (
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="checkbox"
                      id={`${field.label}-${i}`}
                      className="h-4 w-4 border-gray-300 rounded text-gold focus:ring-gold"
                      onChange={(e) =>
                        updateFieldValue(field.label, e.target.checked)
                      }
                    />
                    <label
                      htmlFor={`${field.label}-${i}`}
                      className="text-sm text-gray-700"
                    >
                      {field.label}
                    </label>
                  </div>
                )}

                {/* Date */}
                {field.type === "date" && (
                  <input
                    type="date"
                    className="px-3 py-2 border-[0.5px] border-gold/30 rounded-md 
                               focus:ring-2 focus:ring-gold focus:border-gold text-sm bg-ivory w-full"
                    onChange={(e) =>
                      updateFieldValue(field.label, e.target.value)
                    }
                  />
                )}

                {/* Toggle */}
                {field.type === "toggle" && (
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      onChange={(e) =>
                        updateFieldValue(field.label, e.target.checked)
                      }
                    />
                    <div className="w-11 h-6 bg-ivory border-[0.5px] border-gold/30 rounded-full peer peer-checked:bg-gold 
                                    after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                                    after:bg-ivory after:border-gray after:border after:rounded-full 
                                    after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                  </label>
                )}

                {/* Link */}
                {field.type === "link" && (
                  <input
                    type="url"
                    placeholder="https://..."
                    className="px-3 py-2 border-[0.5px] border-gold/30 rounded-md 
                               focus:ring-2 focus:ring-gold focus:border-gold text-sm bg-ivory w-full"
                    onChange={(e) =>
                      updateFieldValue(field.label, e.target.value)
                    }
                  />
                )}

                {/* Upload */}
                {field.type === "upload" && (
                  <input
                    type="file"
                    className="text-sm w-full"
                    onChange={(e) =>
                      updateFieldValue(
                        field.label,
                        e.target.files?.[0] || null
                      )
                    }
                  />
                )}

                {/* Date Range */}
                {field.type === "daterange" && (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="date"
                      className="px-3 py-2 border-[0.5px] border-gold/30 rounded-md 
                                focus:ring-2 focus:ring-gold focus:border-gold text-sm bg-ivory flex-1"
                      onChange={(e) => {
                        const end =
                          contextData.dynamicFields?.[field.label]?.[1] || "";
                        updateFieldValue(field.label, [e.target.value, end]);
                      }}
                    />
                    <input
                      type="date"
                      className="px-3 py-2 border-[0.5px] border-gold/30 rounded-md 
                                focus:ring-2 focus:ring-gold focus:border-gold text-sm bg-ivory flex-1"
                      onChange={(e) => {
                        const start =
                          contextData.dynamicFields?.[field.label]?.[0] || "";
                        updateFieldValue(field.label, [start, e.target.value]);
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

    {/* Custom Fields */}
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-sm font-medium text-black">Custom Fields</h4>
        <button
          className="inline-flex items-center px-3 py-1.5 border-[0.5px] border-gold/30 rounded-md text-gray"
          type="button"
          onClick={addCustomField}
        >
          + Add Field
        </button>
      </div>

      <div className="space-y-2">
        {(contextData.customFields || []).map((field, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              value={field}
              onChange={(e) => updateCustomField(i, e.target.value)}
              className="flex-1 px-3 py-2 border-[0.5px] border-gold/30 rounded-md text-gray bg-ivory focus:ring-gold focus:border-gold"
              placeholder="Custom field name..."
            />
            <button
              type="button"
              onClick={() => removeCustomField(i)}
              className="flex items-center justify-center px-3 py-1.5 border-[0.5px] border-gold/30 rounded-md"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

};

export default BusinessContextStep;