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
  | "textarea"
  | "nested-dropdown"
  | "nested-single-dropdown";


export interface FieldConfig {
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];
  nestedOptions?: { [key: string]: string[] };
  conditionalOn?: { field: string; value: string }; // For conditional field rendering
}

export interface GroupConfig {
  group: string;
  fields: FieldConfig[];
  promptTemplate?: string | ((mode: string, data: Record<string, string>) => string); // Template text or function
}

export interface OptionFieldsConfig {
  [key: string]: GroupConfig[];
}

// Generic templates for common group types
export const GROUP_TEMPLATES: Record<string, string> = {
  // Content Creation
  "Content Goal & Audience": "I will need you to consider my Content Goal & Audience, and address each of the following areas:",
  "Message & Creative Direction": "You need to embody my Messaging & Creative Direction, incorporating the following:",
  "Messaging & Creative Direction": "You need to embody my Messaging & Creative Direction, incorporating the following:",
  "Proof & Positioning": "Consider my Proof & Positioning elements to strengthen credibility and value:",
  "Channel & Distribution": "Format the response according to my Channel & Distribution, which incorporates:",
  "Final Notes": "Consider these additional notes when generating the response:",
  
  // Idea Generation
  "Idea Foundations": "These are my Idea Foundations, they are absolutely crucial to the output and must be considered thoughtfully:",
  "Constraints & Considerations": "Deeply consider my Constraints & Considerations, knowing that your response is ONLY valuable if it adheres to the following requirements:",
  "Output Specifications": "Your response may be informational, but it is only actionable if I can comprehend it. You will adhere to these Output Specifications:",
  
  // General Request
  "Background Context": "You will need to consider the following Background Context, which is absolutely essential for you to deliver a satisfactory response:",
  "Constraints": "There are hard Constraints that you MUST adhere to when generating the response to my query:",
  
  // Sales & Copywriting
  "Audience & Offer Context": "I will need you to consider my Audience & Offer Context, be sure to address each of the following areas:",
  "Core Copy Elements": "I am sharing the following Core Copy Elements in a raw form. Please organize each of these elements thoughtfully into copy:",
  "Core Copy Elements for the Ad": "I am sharing the following Core Copy Elements in a raw form. Please organize each of these elements thoughtfully into copy:",
  "Creative & Channel Guidelines": "Design the output so that it's compatible with the following Placement / Target Channel:",
  "SEO & Keywords": "It is important that SEO & Keywords are accounted for, relevant to the information that I'm presenting in this prompt. The entire output should be optimized for SEO, but you must incorporate my requirements in the copy:",
  "SEO & Keywords (Optional)": "It is important that SEO & Keywords are accounted for, relevant to the information that I'm presenting in this prompt. The entire output should be optimized for SEO, but you must incorporate my requirements in the copy:",
  
  // Research & Company
  "Prospect Profile": "Consider the following Prospect Profile information:",
  "Company Context": "Account for the Company Context in your response:",
  "Trigger Data": "Use the following Trigger Data to inform your approach:",
  "Trigger & Intent": "Use the following Trigger & Intent signals:",
  
  // Discovery & Qualification
  "Discovery Prep": "Prepare for discovery using the following information:",
  "Call Prep Variables": "Consider these Call Prep Variables:",
  "Qualification Criteria": "Apply the following Qualification Criteria:",
  
  // Objection Handling
  "Objection Context": "Understand the Objection Context:",
  "Response Framing": "Frame the response according to:",
  "Delivery Variables": "Consider these Delivery Variables:",
  
  // Campaign & Sequence
  "Sequence Design": "Structure the sequence according to the following design:",
  "Performance Data": "Analyze the following Performance Data:",
  "Insights & Optimization": "Provide Insights & Optimization based on:",
  
  // Testing & Variations
  "Variations & Testing": "Consider these variations and testing parameters:",
  
  // General catch-all templates
  "Goal & Audience": "I will need you to consider my Goal & Audience, and address each of the following areas:",
  "Research Plan & Methods": "Follow this Research Plan & Methods:",
  "Data & Validation": "Use the following Data & Validation criteria:",
  "Results & Communication": "Present Results & Communication according to:",
  "Brand Identity": "Align with the following Brand Identity:",
  "Target Audience": "Tailor the response to the following Target Audience:",
  "Positioning & Messaging": "Incorporate this Positioning & Messaging:",
  "Launch Basics": "Consider these Launch Basics:",
  "Messaging & Assets": "Use the following Messaging & Assets:",
  "Distribution Plan": "Execute according to this Distribution Plan:",
  "Engagement & Follow-Up": "Plan Engagement & Follow-Up as follows:",
  "Success Metrics": "Track these Success Metrics:",
};

// Helper to get template for a group (with fallback)
export function getTemplateForGroup(groupName: string): string | undefined {
  return GROUP_TEMPLATES[groupName];
}

// ========================================
// ALL GROUP CONFIGURATIONS (REUSABLE)
// ========================================
// Define all groups once here, then reference them in categories

export const ALL_GROUPS: Record<string, GroupConfig> = {
  // ============ COMMON GROUPS ============
  
  "Prospect Profile": {
    group: "Prospect Profile",
    fields: [
      { label: "Persona", type: "dropdown", options: ["IT Director", "CFO", "VP Sales", "Head of Operations", "Other"] },
      { 
        label: "Job Title", 
        type: "nested-single-dropdown", 
        options: [
          "Executive & Leadership",
          "Sales & Business Development",
          "Marketing & Growth",
          "Operations & Procurement",
          "Finance & Purchasing",
          "IT & Technology",
          "Customer Success & Service",
          "HR & Talent"
        ],
        nestedOptions: {
          "Executive & Leadership": [
            "CEO (Chief Executive Officer)",
            "COO (Chief Operating Officer)",
            "CFO (Chief Financial Officer)",
            "CIO / CTO (Chief Information/Technology Officer)",
            "CMO (Chief Marketing Officer)",
            "CRO (Chief Revenue Officer)",
            "President",
            "Founder / Co-Founder",
            "Managing Director",
            "Vice President (VP) of Sales / Marketing / Operations"
          ],
          "Sales & Business Development": [
            "VP / Director of Sales",
            "Sales Manager",
            "Business Development Manager",
            "Account Executive",
            "Sales Engineer",
            "Channel / Partner Manager"
          ],
          "Marketing & Growth": [
            "VP / Director of Marketing",
            "Marketing Manager",
            "Product Marketing Manager",
            "Demand Generation / Growth Manager",
            "Content / Brand Manager",
            "Digital Marketing Specialist"
          ],
          "Operations & Procurement": [
            "VP / Director of Operations",
            "Operations Manager",
            "Procurement Manager",
            "Supply Chain Manager",
            "Logistics Manager"
          ],
          "Finance & Purchasing": [
            "VP / Director of Finance",
            "Finance Manager",
            "Controller",
            "Purchasing Manager",
            "Budget Analyst"
          ],
          "IT & Technology": [
            "VP / Director of IT",
            "IT Manager",
            "Systems Administrator",
            "DevOps / Infrastructure Manager",
            "Security / Compliance Manager"
          ],
          "Customer Success & Service": [
            "VP / Director of Customer Success",
            "Customer Success Manager",
            "Account Manager",
            "Support Manager",
            "Implementation / Onboarding Manager"
          ],
          "HR & Talent": [
            "VP / Director of HR",
            "HR Manager",
            "Talent Acquisition Manager",
            "Recruiter",
            "People Operations Manager"
          ]
        }
      },
      { label: "Company Size", type: "dropdown", options: ["1-50", "51-200", "201-1000", "1000+"] },
      { label: "Industry", type: "text", placeholder: "Software, Healthcare, Retail, etc." },
      { label: "Location (if relevant)", type: "text", placeholder: "San Francisco, Remote, North America" }
    ]
  },

  "Company Context": {
    group: "Company Context",
    fields: [
      { label: "Company Name", type: "text", placeholder: "Acme Corp" },
      { label: "Industry", type: "text", placeholder: "SaaS, Healthcare, eCommerce" },
      { label: "Size", type: "dropdown", options: ["Startup (1-50)", "Small Business (51-200)", "Mid-Market (201-1000)", "Enterprise (1000+)"] },
      { label: "Recent News / Funding / Expansion", type: "text", placeholder: "Recently raised Series B, expanding to EMEA" },
      { label: "Known Pain Points / Challenges", type: "text", placeholder: "Scaling operations, integrating systems" }
    ]
  },

  "Final Notes": {
    group: "Final Notes",
    fields: [
      { 
        label: "Final Notes", 
        type: "textarea", 
        placeholder: "Add any additional context, instructions, things to avoid, or specific asks..." 
      }
    ]
  },

  // ============ CONTENT CREATION GROUPS ============
  
  "Freeform Context": {
    group: "Freeform Context",
    fields: [
      { 
        label: "Context Description", 
        type: "textarea", 
        placeholder: "Enter any context, background information, or details for your prompt..." 
      }
    ]
  },

  "Content Goal & Audience": {
    group: "Content Goal & Audience",
    fields: [
      { label: "Goal Type", type: "dropdown", options: ["Awareness", "Lead Generation", "Engagement", "Conversion", "Trust", "Education", "Community", "Demand", "Other"] },
      { label: "What My Audience Values", type: "multiselect", options: ["Saving time", "Saving money", "Learning something new", "Feeling inspired", "Solving a problem", "Feeling supported/understood", "Gaining recognition/status", "Connecting with others", "Other"] },
      { label: "Audience Level", type: "multiselect", options: ["Beginner", "Intermediate", "Advanced", "Generalist", "Technical"] },
      { label: "Target Audience / ICP", type: "text", placeholder: "Busy solopreneurs who want to automate content creation." },
      { 
        label: "CTA (Call to Action)", 
        type: "nested-dropdown", 
        options: [
          "General Engagement",
          "Lead Generation",
          "Conversion / Sales",
          "Event & Community",
          "Retention & Upsell",
          "Social & Engagement",
          "Personalized / Conversational"
        ],
        nestedOptions: {
          "General Engagement": [
            "Learn More",
            "Read the Full Story",
            "Explore Now",
            "See How It Works",
            "Discover More",
            "Watch the Video"
          ],
          "Lead Generation": [
            "Sign Up",
            "Join the Waitlist",
            "Get Early Access",
            "Subscribe Now",
            "Download the Guide",
            "Claim Your Free Resource"
          ],
          "Conversion / Sales": [
            "Buy Now",
            "Start Free Trial",
            "Book a Demo",
            "Get a Quote",
            "Request a Consultation",
            "Add to Cart"
          ],
          "Event & Community": [
            "Register for the Webinar",
            "Save Your Seat",
            "Join the Event",
            "RSVP Now",
            "Join the Community"
          ],
          "Retention & Upsell": [
            "Upgrade Plan",
            "Refer a Friend",
            "Leave a Review",
            "Try a New Feature",
            "Renew Subscription"
          ],
          "Social & Engagement": [
            "Follow Us",
            "Share This",
            "Comment Below",
            "Tag a Friend",
            "Join the Conversation"
          ],
          "Personalized / Conversational": [
            "Let's Chat",
            "Talk to a Specialist",
            "See Your Results",
            "Continue Where You Left Off",
            "Unlock Your Offer"
          ]
        }
      },
    ]
  },

  "Message & Creative Direction": {
    group: "Message & Creative Direction",
    fields: [
      { label: "Core Message / Key Idea", type: "text", placeholder: "The biggest growth unlock comes from simplifying your workflow." },
      { label: "Supporting Ideas", type: "text", placeholder: "Break tasks into steps, remove distractions, focus on high-impact actions." },
      { label: "Content Framework", type: "dropdown", options: ["How-To / Tips", "Storytelling", "List / Quick Wins", "Case Study / Example", "Opinion / Hot Take", "Behind the Scenes", "Educational Breakdown", "Other"] },
      { label: "Hook Selection", type: "dropdown", options: ["AI Generated Hook", "Custom Hook"] },
      { label: "Hook Type", type: "dropdown", options: ["Curiosity Hook", "Bold Claim / Contrarian Hook", "Relatable Story Hook", "Open a Loop Hook", "Future Pace Hook", "List / Framework Hook", "Humor / Unexpected Hook", "Empathy / Pain Point Hook", "Other"], conditionalOn: { field: "Hook Selection", value: "AI Generated Hook" } },
      { label: "Custom Hook (If Applicable)", type: "text", placeholder: "What if the only thing holding you back is doing too much?", conditionalOn: { field: "Hook Selection", value: "Custom Hook" } },
    ]
  },

  "Proof & Positioning": {
    group: "Proof & Positioning",
    fields: [
      { label: "Content Angle Type", type: "dropdown", options: ["Authority", "Relatability", "Aspirational", "Humor", "Story-Driven"] },
      { label: "Storytelling Type", type: "dropdown", options: ["Real-life Example or Story", "Data Point / Statistic", "Customer Quote / Testimonial", "Before-and-After Result", "Industry Trend"] },
      { label: "Your Credibility", type: "text", placeholder: "We've helped 2,000 customers automate their social media posts." },
      { 
        label: "Your Value Add", 
        type: "nested-dropdown", 
        options: [
          "Efficiency & Productivity",
          "Revenue & Growth",
          "Customer Experience",
          "Data & Insights",
          "Cost Savings",
          "Competitive Advantage",
          "Reliability & Trust",
          "Innovation & Modernization",
          "Flexibility & Scalability"
        ],
        nestedOptions: {
          "Efficiency & Productivity": [
            "Save Time with Automation",
            "Eliminate Manual Tasks",
            "Streamline Your Workflow",
            "Shorten Sales Cycles",
            "Improve Team Collaboration",
            "Reduce Operational Bottlenecks",
            "Simplify Complex Processes"
          ],
          "Revenue & Growth": [
            "Increase Lead Conversions",
            "Drive Predictable Revenue",
            "Maximize ROI on Every Campaign",
            "Scale Without Adding Headcount",
            "Unlock New Revenue Streams",
            "Boost Customer Lifetime Value",
            "Accelerate Pipeline Growth"
          ],
          "Customer Experience": [
            "Deliver a Seamless Experience",
            "Personalize Every Interaction",
            "Improve Response Times",
            "Enhance Customer Satisfaction",
            "Strengthen Brand Loyalty",
            "Turn Buyers into Advocates"
          ],
          "Data & Insights": [
            "Make Smarter, Data-Driven Decisions",
            "Gain Real-Time Visibility",
            "Forecast with Confidence",
            "Identify Growth Opportunities Faster",
            "Centralize Your Analytics"
          ],
          "Cost Savings": [
            "Reduce Overhead",
            "Consolidate Tools and Subscriptions",
            "Lower Customer Acquisition Costs",
            "Prevent Costly Errors",
            "Increase Profit Margins"
          ],
          "Competitive Advantage": [
            "Stay Ahead of Industry Trends",
            "Outperform Competitors",
            "Modernize with AI and Automation",
            "Respond Faster to Market Changes",
            "Build a Scalable Advantage"
          ],
          "Reliability & Trust": [
            "Backed by Proven Results",
            "Secure and Compliant",
            "Trusted by Industry Leaders",
            "Transparent Performance Metrics",
            "Consistent Support and Delivery"
          ],
          "Innovation & Modernization": [
            "Transform Outdated Processes",
            "Adopt Future-Ready Technology",
            "Empower Teams with AI",
            "Drive Digital Transformation",
            "Lead with Innovation, Not Imitation"
          ],
          "Flexibility & Scalability": [
            "Adapt to Your Growth Needs",
            "Customizable to Any Workflow",
            "Easy Integration with Existing Tools",
            "Built to Scale with You",
            "Works Across Teams and Industries"
          ]
        }
      },
    ]
  },

  "Channel & Distribution": {
    group: "Channel & Distribution",
    fields: [
      { label: "Primary Channel", type: "dropdown", options: ["Instagram", "LinkedIn", "YouTube", "Blog", "Email", "Podcast", "Other"] },
      { label: "Content Format", type: "dropdown", options: ["Short video", "Long video", "Carousel", "Tweet-style text", "Long-form article", "Meme", "Infographic", "Tutorial", "Script", "Caption-only", "Newsletter", "Other"] },
      { label: "Hashtag Count", type: "text", placeholder: "Use 3–5 hashtags for reach without clutter." },
    ]
  },

  // ============ SALES GROUPS ============

  "Trigger Data": {
    group: "Trigger Data",
    fields: [
      { label: "Intent Signals", type: "multiselect", options: ["Hiring Spike", "Funding Round", "Product Launch", "Website Visits", "Competitive Activity", "Partnership Announcement", "Leadership Change"] },
      { label: "Intent Source", type: "dropdown", options: ["LinkedIn", "Bombora", "6Sense", "Google Analytics", "Apollo", "Other"] },
      { label: "Signal Recency", type: "dropdown", options: ["Last 7 Days", "Last 30 Days", "Last 90 Days"] },
      { label: "Trigger Event Date", type: "date" },
      { label: "Key Observations / Notes", type: "text", placeholder: "Recently hired new VP of Engineering; indicates expansion" },
    ]
  },

  "Research & Opportunities": {
    group: "Research & Opportunities",
    fields: [
      { label: "Research Summary", type: "textarea", placeholder: "Company expanding into the EU market; potential need for compliance solutions" },
      { label: "Potential Opportunity", type: "text", placeholder: "Could use our platform to automate cross-border data transfer compliance" },
      { label: "Lead Fit Score", type: "dropdown", options: ["A", "B", "C", "D"] },
      { label: "Engagement History", type: "text", placeholder: "Attended our security webinar on 8/20/25" },
    ]
  },

  // ============ SALES COPY GROUPS ============

  "Trigger & Intent": {
    group: "Trigger & Intent",
    fields: [
      { label: "Trigger Event", type: "dropdown", options: ["Growth & Scaling", "Financial Activity", "Product Launch", "Compliance/Regulatory Change", "Competitive Activity", "Retention/Churn Signals", "Crisis or Negative Signal", "Event or Milestone"] },
      { label: "Trigger Recency", type: "dropdown", options: ["Last 7 Days", "Last 30 Days", "Last 90 Days"] },
      { label: "Date of Trigger", type: "date" },
      { label: "Recent Activity Notes", type: "text", placeholder: "Attended our webinar on digital transformation" },
      { label: "Message Objective", type: "multiselect", options: ["Build Trust", "Educate", "Overcome Objection", "Re-Engage", "Start Conversation", "Close Deal"] },
      { label: "Desired Action (CTA)", type: "multiselect", options: ["Book Demo", "Ask a Question", "Request Resource", "Schedule a Call"] },
    ]
  },

  "Message Framing": {
    group: "Message Framing",
    fields: [
      { label: "Problem Framing", type: "dropdown", options: ["Symptom vs. Root Cause"] },
      { label: "Value Proposition", type: "dropdown", options: ["Revenue & Growth", "Time Savings & Efficiency", "Risk Reduction & Reliability", "Competitive Advantage / Differentiation", "Relationship Building & Trust", "Insights & Decision Support", "Emotional or Aspirational Motivation"] },
      { label: "Emotional Trigger", type: "text", placeholder: "Frustration with current vendor's downtime" },
      { label: "Objection Handling Notes", type: "text", placeholder: "Budget constraints — highlight ROI within 6 months" },
      { label: "Proof Point / Case Study Reference", type: "text", placeholder: "Case study: Reduced onboarding time by 40% for Client X" },
    ]
  },

  "Copywriting Style": {
    group: "Copywriting Style",
    fields: [
      { label: "Tone", type: "dropdown", options: ["Conversational", "Direct", "Empathetic", "Playful", "Professional"] },
      { label: "Message Length", type: "dropdown", options: ["Ultra-Short (1–2 sentences)", "Short (3–5 sentences)", "Medium (1 paragraph)", "Long-Form (2–3 paragraphs)"] },
      { label: "Language Style Notes", type: "text", placeholder: "Use short, punchy sentences under 10 words" },
      { label: "First Line Personalization", type: "text", placeholder: "Saw your LinkedIn post about scaling logistics — impressive growth!" },
    ]
  },

  // ============ DISCOVERY & QUALIFICATION GROUPS ============

  "Discovery Prep": {
    group: "Discovery Prep",
    fields: [
      { label: "Discovery Goals", type: "multiselect", options: ["Uncover Pain Points", "Identify Timeline", "Build Rapport", "Confirm Budget", "Validate Fit"] },
      { label: "Methodologies", type: "multiselect", options: ["SPIN", "BANT", "MEDDIC", "MEDDPIC", "GPCTBA", "NEAT", "Challenger"] },
      { label: "Known Priorities", type: "text", placeholder: "Implementing new CRM system within the next quarter" },
      { label: "Competitors Mentioned", type: "text", placeholder: "Salesforce, HubSpot" },
      { label: "Research Notes", type: "text", placeholder: "Liked several LinkedIn posts about automation and cost-cutting" },
    ]
  },

  "Call Prep Variables": {
    group: "Call Prep Variables",
    fields: [
      { label: "Call Type", type: "dropdown", options: ["Discovery", "Demo", "Negotiation", "Renewal"] },
      { label: "Expected Outcome", type: "dropdown", options: ["Schedule Demo", "Confirm Budget", "Secure Champion", "Close Deal"] },
      { label: "Call Agenda", type: "text", placeholder: "Discuss current vendor issues, introduce our solution, outline next steps" },
      { label: "Call Duration", type: "dropdown", options: ["15 min", "30 min", "45 min", "60 min"] },
      { label: "Preferred Meeting Format", type: "dropdown", options: ["Video", "Phone", "In-Person"] },
    ]
  },

  "Qualification Criteria": {
    group: "Qualification Criteria",
    fields: [
      { label: "Qualification Framework", type: "multiselect", options: ["SPIN", "BANT", "MEDDIC", "MEDDPIC", "GPCTBA", "NEAT", "Challenger"] },
      { label: "Budget Range", type: "text", placeholder: "$50k–$100k for annual subscription" },
      { label: "Decision Timeline", type: "dropdown", options: ["1 Week", "30 Days", "90 Days", "6+ Months"] },
      { label: "Qualification Score", type: "dropdown", options: ["High", "Medium", "Low"] },
    ]
  },

  // ============ SALES ENABLEMENT GROUPS ============

  "Asset Details": {
    group: "Asset Details",
    fields: [
      { label: "Asset Type", type: "dropdown", options: ["Case Study", "Playbook", "One-Pager", "Battle Card", "Demo Script", "FAQ Sheet", "Whitepaper", "Slide Deck"] },
      { label: "Asset Title", type: "text", placeholder: "Mid-Market Battle Card for Competitive Positioning" },
      { label: "Funnel Stage", type: "dropdown", options: ["Top-of-Funnel (TOFU)", "Middle-of-Funnel (MOFU)", "Bottom-of-Funnel (BOFU)"] },
      { label: "Content Format", type: "dropdown", options: ["PDF", "Slide", "Blog Post", "Video", "Interactive Tool"] },
      { label: "Distribution Channel", type: "dropdown", options: ["Email", "Sales Portal", "Website", "Social Media"] },
      { label: "Production Deadline", type: "date" },
    ]
  },

  "Buyer Context": {
    group: "Buyer Context",
    fields: [
      { label: "Target Audience Role", type: "dropdown", options: ["Marketing", "Sales", "Operations", "Finance", "IT", "Other"] },
      { label: "Industry", type: "dropdown", options: ["Tech", "Healthcare", "Finance", "Education", "Other"] },
      { label: "Primary Pain Point", type: "text", placeholder: "Difficulty educating prospects on compliance requirements" },
      { label: "Segment", type: "dropdown", options: ["Enterprise", "Mid-Market", "SMB", "Startup"] },
    ]
  },

  "Messaging Style": {
    group: "Messaging Style",
    fields: [
      { label: "Tone", type: "dropdown", options: ["Formal", "Conversational", "Data-Driven", "Empathetic", "Bold"] },
      { label: "Value Type", type: "dropdown", options: ["ROI", "Cost Savings", "Time Efficiency", "Risk Mitigation"] },
      { label: "Key Metrics / Stats", type: "text", placeholder: "Include stat: 75% of customers see ROI within 6 months" },
      { label: "Creative Hook", type: "text", placeholder: "Use analogy of a digital shield protecting customer data" },
    ]
  },

  // ============ OBJECTION HANDLING GROUPS ============

  "Objection Context": {
    group: "Objection Context",
    fields: [
      { label: "Objection Type", type: "dropdown", options: ["Price", "Competitor", "Timing", "Internal Buy-In", "Feature Gap", "No Need"] },
      { label: "Objection Statement", type: "text", placeholder: "We're happy with our current vendor and not looking to switch." },
      { label: "Role Raising Objection", type: "dropdown", options: ["Decision Maker", "Influencer", "Champion"] },
      { label: "Objection Severity", type: "dropdown", options: ["High", "Medium", "Low"] },
      { label: "Objection Stage", type: "dropdown", options: ["Early", "Mid", "Late"] },
    ]
  },

  "Response Framing": {
    group: "Response Framing",
    fields: [
      { label: "Approach", type: "dropdown", options: ["Empathetic", "Assertive", "Consultative", "Data-Driven"] },
      { label: "Key Value Points", type: "text", placeholder: "Our platform integrates seamlessly with your existing ERP and cuts manual processing by 40%." },
      { label: "Supporting Proof / Data", type: "text", placeholder: "Based on a study with 50 enterprise clients, average savings = $250k/year." },
      { label: "Case Study Reference", type: "text", placeholder: "Client X moved from Competitor Y and achieved 30% cost reduction." },
    ]
  },

  "Delivery Variables": {
    group: "Delivery Variables",
    fields: [
      { label: "Channel", type: "dropdown", options: ["Email", "Phone", "In-Person", "Video", "Chat"] },
      { label: "Next Step", type: "dropdown", options: ["Schedule Demo", "Send Case Study", "Book Call", "Trial Sign-Up"] },
      { label: "Follow-Up Timeline", type: "dropdown", options: ["Immediately", "1 Day", "3 Days", "1 Week"] },
    ]
  },

  // ============ RESEARCH & MARKET GROUPS ============

  "Goal & Audience": {
    group: "Goal & Audience",
    fields: [
      { label: "Research Goal", type: "dropdown", options: ["Audience Insights", "Competitive Landscape", "Market Sizing", "Concept Validation"] },
      { label: "Key Question You're Answering", type: "text", placeholder: "Which features are most important to small business owners?" },
      { label: "Target Group / Segment", type: "text", placeholder: "Owners of U.S. small businesses with under 50 employees." },
      { label: "Desired Participant Action", type: "text", placeholder: "Complete a 5-minute online survey." },
      { label: "Custom Field", type: "text", placeholder: "Include freelancers who act as consultants." }
    ]
  },

  "Research Plan & Methods": {
    group: "Research Plan & Methods",
    fields: [
      { label: "Research Type", type: "dropdown", options: ["Quantitative (Survey)", "Qualitative (Interviews)", "Desk/Secondary Research", "Competitor Review"] },
      { label: "Data Collection Method", type: "multiselect", options: ["Online Form", "Phone Interview", "Social Media Poll", "Web Analytics", "Industry Reports"] },
      { label: "Sample Size or Scope", type: "text", placeholder: "Survey at least 150 respondents across three segments." },
      { label: "Timing", type: "dropdown", options: ["This Week", "This Month", "This Quarter"] },
      { label: "Custom Field", type: "text", placeholder: "What pain points lead users to switch to new software?" }
    ]
  },

  "Data & Validation": {
    group: "Data & Validation",
    fields: [
      { label: "Data Sources", type: "dropdown", options: ["Public Reports", "Social Media Insights", "CRM/Customer Data", "Competitor Websites"] },
      { label: "Working Assumptions / Hypotheses", type: "text", placeholder: "Segment A values ease of use more than price." },
      { label: "Segmentation Basis", type: "multiselect", options: ["Demographics", "Firmographics", "Psychographics", "Behaviors", "Needs"] },
      { label: "Data Quality Checks", type: "text", placeholder: "Check that responses aren't all from one region." },
      { label: "Privacy Considerations", type: "text", placeholder: "Collect responses anonymously and store securely." }
    ]
  },

  "Results & Communication": {
    group: "Results & Communication",
    fields: [
      { label: "Planned Deliverables", type: "dropdown", options: ["Executive Summary", "Persona Profiles", "Segmentation Matrix", "Competitive Matrix", "Slide Deck"] },
      { label: "Storage / Sharing Location", type: "dropdown", options: ["Google Docs", "Excel Sheet", "PowerPoint", "Internal Knowledge Base"] },
      { label: "Key Stakeholders", type: "text", placeholder: "Marketing director, product team lead, and CEO." },
      { label: "Tags / Keywords", type: "text", placeholder: "market research, productivity app, SMB owners" }
    ]
  },

  "AI-Generated": {
    group: "AI-Generated",
    fields: [
      { label: "Template 1", type: "text", placeholder: "Generate 10 research questions to uncover needs, challenges, and motivations of the target group." },
      { label: "Template 2", type: "text", placeholder: "Create a concise competitor comparison table showing pricing, features, and positioning." },
      { label: "Template 3", type: "text", placeholder: "Summarize collected data into a one-page insight brief with key takeaways." },
      { label: "Template 4", type: "text", placeholder: "Draft three clear persona profiles based on research findings." }
    ]
  },

  // ============ BRAND STRATEGY GROUPS ============

  "Brand Identity": {
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

  "Target Audience": {
    group: "Target Audience",
    fields: [
      { label: "Primary Persona", type: "text", placeholder: "Small business owners aged 25–45 looking for better financial tools." },
      { label: "Secondary Personas", type: "text", placeholder: "Freelancers and gig-economy workers seeking easier invoicing." },
      { label: "Audience Segment", type: "dropdown", options: ["B2B", "B2C", "B2G", "Nonprofit", "Startup", "Enterprise", "Other"] },
      { label: "Audience Aspirations / Challenges", type: "text", placeholder: "Want faster, easier access to credit; struggle with complex bank processes." },
      { label: "Custom Field", type: "text", placeholder: "Include early adopters who are tech-savvy but cost-sensitive." }
    ]
  },

  "Positioning & Messaging": {
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

  "Brand Channels & Assets": {
    group: "Brand Channels & Assets",
    fields: [
      { label: "Primary Channels", type: "multiselect", options: ["Website", "Blog", "Social Media", "Email", "Events", "Print", "Podcast", "Video", "PR", "Other"] },
      { label: "Visual Identity Guidelines", type: "text", placeholder: "Use deep blue and white as primary colors, sans-serif fonts, and geometric logo." },
      { label: "Tone & Style Guidelines", type: "text", placeholder: "Write in a conversational but confident tone, focusing on clarity and trust." },
      { label: "Crisis / Reputation Considerations", type: "text", placeholder: "Prepare a press statement template for product outages and security breaches." },
      { label: "Custom Field", type: "text", placeholder: "Quarterly community events for customer engagement." }
    ]
  },

  // ============ COPYWRITING GROUPS ============

  "Audience & Offer Context": {
    group: "Audience & Offer Context",
    fields: [
      { label: "Target Audience / ICP", type: "text", placeholder: "Fitness coaches who want to sell more online programs." },
      { label: "Pain Point / Desire", type: "text", placeholder: "They struggle to create consistent leads and want predictable revenue." },
      { label: "Offer / Product Being Promoted", type: "text", placeholder: "6-week online coaching accelerator." },
      { label: "Key Benefit", type: "text", placeholder: "Generate high-intent leads without spending all day on content." },
      { label: "Incentive", type: "text", placeholder: "20% off for early sign-ups." }
    ]
  },

  "Core Copy Elements for the Ad": {
    group: "Core Copy Elements for the Ad",
    fields: [
      { 
        label: "Select Copy Mode", 
        type: "dropdown", 
        options: ["Create from Scratch", "Modify Existing Copy"]
      },
      // Fields for "Create from Scratch" mode
      { 
        label: "Primary Hook / Headline Idea", 
        type: "text", 
        placeholder: "Stop losing sales because your offer isn't clear.",
        conditionalOn: { field: "Select Copy Mode", value: "Create from Scratch" }
      },
      { 
        label: "Supporting Copy / Body Text Idea", 
        type: "textarea", 
        placeholder: "Examples of losing a sale...",
        conditionalOn: { field: "Select Copy Mode", value: "Create from Scratch" }
      },
      // Fields for "Modify Existing Copy" mode
      { 
        label: "Paste Copy", 
        type: "textarea", 
        placeholder: "My offer helps creators get more clients, but the messaging feels unclear.",
        conditionalOn: { field: "Select Copy Mode", value: "Modify Existing Copy" }
      },
      // Common fields for both modes
      { 
        label: "CTA (Call to Action)", 
        type: "text", 
        placeholder: "Book your free strategy call." 
      },
      { 
        label: "Proof / Credibility", 
        type: "text", 
        placeholder: "Trusted by 500+ coaches." 
      },
      { 
        label: "Urgency or Scarcity", 
        type: "text", 
        placeholder: "Only 5 spots left this month." 
      },
      { 
        label: "Legal / Compliance Disclaimers", 
        type: "text", 
        placeholder: "No income guarantees provided." 
      }
    ],
    promptTemplate: (mode: string, data: Record<string, string>) => {
      if (mode === "Create from Scratch") {
        return `I am sharing the following Core Copy Elements in a raw form. Please organize each of these elements thoughtfully into copy:
Primary Hook / Headline Idea: ${data["Primary Hook / Headline Idea"] || "[Insert User Input]"}; Supporting Copy / Body Text Idea: ${data["Supporting Copy / Body Text Idea"] || "[Insert User Input]"}; CTA (Call to Action): ${data["CTA (Call to Action)"] || "[Insert User Input]"}; Proof / Credibility: ${data["Proof / Credibility"] || "[Insert User Input]"}; Urgency or Scarcity: ${data["Urgency or Scarcity"] || "[Insert User Input]"}; Legal / Compliance Disclaimers: ${data["Legal / Compliance Disclaimers"] || "[Insert User Input]"}.`;
      } else {
        return `I have already created the following Core Copy. Please read it thoroughly, mentally accounting for strengths and weaknesses: ${data["Paste Copy"] || "[Insert User Input for Paste Copy]"}.
Now use the following Core Copy Elements that I have specified to strengthen the copy where necessary: CTA (Call to Action): ${data["CTA (Call to Action)"] || "[Insert User Input]"}; Proof / Credibility: ${data["Proof / Credibility"] || "[Insert User Input]"}; Urgency or Scarcity: ${data["Urgency or Scarcity"] || "[Insert User Input]"}; Legal / Compliance Disclaimers: ${data["Legal / Compliance Disclaimers"] || "[Insert User Input]"}.`;
      }
    }
  },

  "Creative & Channel Guidelines": {
    group: "Creative & Channel Guidelines",
    fields: [
      { label: "Placement / Target Channel", type: "dropdown", options: ["Website Landing Page", "Sales Page", "Email Newsletter", "Social Media Post", "Ad Copy / Paid Ads", "Blog Post", "Product Description", "Video Script", "Other"] },
      { label: "Restrictions", type: "text", placeholder: "No claims about income guarantees. Stay under 120 characters. Avoid medical language." }
    ]
  },

  "SEO & Keywords (Optional)": {
    group: "SEO & Keywords (Optional)",
    fields: [
      { label: "Primary Keyword", type: "text", placeholder: "high-converting sales page" },
      { label: "Secondary Keywords", type: "text", placeholder: "conversion copywriting, landing page optimization" },
      { label: "Search Intent", type: "text", placeholder: "Looking for a sales page that converts more leads." },
      { label: "Meta Title / Description", type: "text", placeholder: "Sales Page Copywriting Services for Coaches — Drive More Conversions." },
      { label: "Internal / External Links", type: "text", placeholder: "Internal: Link to testimonials page. External: Link to case study." }
    ]
  },

  // ============ IDEA GENERATION GROUPS ============
  
  "Idea Foundations": {
    group: "Idea Foundations",
    fields: [
      { label: "What Inspired This Idea", type: "text", placeholder: "I noticed people struggle to stay consistent even when they want to improve." },
      { label: "The Problem the Idea Solves", type: "text", placeholder: "Most people feel overwhelmed and don't know where to start." },
      { label: "The Ideas Should Feel", type: "dropdown", options: ["Simple", "Funny", "Smart", "Bold", "Weird", "Whimsical", "Futuristic", "Helpful", "Inspiring", "Dark humor", "Realistic", "Minimalist", "Other"] }
    ]
  },

  "Constraints & Considerations": {
    group: "Constraints & Considerations",
    fields: [
      { label: "Elements Every Idea Must Include", type: "text", placeholder: "Clear steps, real-world relevance, practical takeaways." },
      { label: "Elements Every Idea Must Avoid", type: "text", placeholder: "Vague advice, unrealistic promises, or overcomplication." },
      { label: "My Doubts or Concerns", type: "text", placeholder: "I'm worried the ideas may feel too similar to competitors." }
    ]
  },

  "Output Specifications": {
    group: "Output Specifications",
    fields: [
      { label: "Depth", type: "dropdown", options: ["One-liners", "Quick list", "Medium detail", "Full breakdown", "Blueprint level", "Other"] },
      { label: "Format", type: "dropdown", options: ["Bullets", "Paragraphs", "Blueprint format", "Problem–Solution pairs", "What if? questions", "Step-by-step", "Other"] },
      { label: "Number of Ideas", type: "text", placeholder: "7" }
    ]
  },

  // ============ GENERAL REQUEST GROUPS ============
  
  "Background Context": {
    group: "Background Context",
    fields: [
      { label: "Background Context", type: "textarea", placeholder: "I have been working on this project for the last three years and have been unsuccessful so far." }
    ]
  },

  "Constraints": {
    group: "Constraints",
    fields: [
      { label: "The Response Must", type: "textarea", placeholder: "Be clear, concise, and easy to apply immediately." },
      { label: "The Response Must Avoid", type: "textarea", placeholder: "Content that is obviously AI generated, overly technical language, and em dashes." }
    ]
  },

  // Continue with more groups...
};

// Helper to get a group by name
export function getGroup(groupName: string): GroupConfig | undefined {
  return ALL_GROUPS[groupName];
}

// ========================================
// HELPER FUNCTIONS FOR TEMPLATE RETRIEVAL
// ========================================
// Note: Category definitions are now in CategoriesConfig.ts
// Import optionFieldsConfigData from CategoriesConfig.ts to use these functions

// Helper function to get group template for a specific category and group
export function getGroupTemplate(
  category: string, 
  group: string, 
  categoriesConfig: OptionFieldsConfig, 
  mode?: string, 
  data?: Record<string, string>
): string | undefined {
  const categoryGroups = categoriesConfig[category];
  if (!categoryGroups) return undefined;
  
  const groupConfig = categoryGroups.find(g => g.group === group);
  
  // First check if group has explicit promptTemplate
  if (groupConfig?.promptTemplate) {
    // If it's a function, call it with mode and data
    if (typeof groupConfig.promptTemplate === 'function') {
      return groupConfig.promptTemplate(mode || '', data || {});
    }
    return groupConfig.promptTemplate;
  }
  
  // Otherwise, check generic templates
  return getTemplateForGroup(group);
}

// Helper function to get all groups with templates for a category
export function getCategoryGroupsWithTemplates(
  category: string, 
  categoriesConfig: OptionFieldsConfig
): Array<{group: string; template: string | ((mode: string, data: Record<string, string>) => string)}> {
  const categoryGroups = categoriesConfig[category];
  if (!categoryGroups) return [];
  
  return categoryGroups
    .map(g => {
      const template = g.promptTemplate || getTemplateForGroup(g.group);
      return template ? { group: g.group, template } : null;
    })
    .filter((item): item is {group: string; template: string | ((mode: string, data: Record<string, string>) => string)} => item !== null);
}
