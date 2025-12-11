import { OptionFieldsConfig } from './GuidedModeForms';
import { ALL_GROUPS } from './GuidedModeForms';

// ========================================
// CATEGORIES CONFIGURATION
// ========================================
// This file contains only category definitions with references to ALL_GROUPS

export const optionFieldsConfigData: OptionFieldsConfig = {
  
  // "General": [
  //   ALL_GROUPS["Freeform Context"],
    
  // ],

  "Content Creation": [
    ALL_GROUPS["Content Goal & Audience"],
    ALL_GROUPS["Message & Creative Direction"],
    ALL_GROUPS["Channel & Distribution"],
    ALL_GROUPS["Final Notes"],
  ],

  "Idea Generation": [
    ALL_GROUPS["Idea Foundations"],
    ALL_GROUPS["Constraints & Considerations"],
    ALL_GROUPS["Output Specifications"],
    ALL_GROUPS["Final Notes"]
  ],

  "General Request": [
    ALL_GROUPS["Background Context"],
    ALL_GROUPS["Constraints"],
    ALL_GROUPS["Final Notes"]
  ],

  // "Sales Research": [
  //   ALL_GROUPS["Prospect Profile"],
  //   ALL_GROUPS["Company Context"],
  //   ALL_GROUPS["Trigger Data"],
  //   ALL_GROUPS["Research & Opportunities"],
  //   ALL_GROUPS["Final Notes"],
  // ],

  // "Sales Copy": [
  //   ALL_GROUPS["Prospect Profile"],
  //   ALL_GROUPS["Company Context"],
  //   ALL_GROUPS["Trigger & Intent"],
  //   ALL_GROUPS["Message Framing"],
  //   ALL_GROUPS["Copywriting Style"],
  //   ALL_GROUPS["Final Notes"]
  // ],

  // "Discovery & Qualification": [
  //   ALL_GROUPS["Prospect Profile"],
  //   ALL_GROUPS["Company Context"],
  //   ALL_GROUPS["Discovery Prep"],
  //   ALL_GROUPS["Call Prep Variables"],
  //   ALL_GROUPS["Qualification Criteria"],
  //   ALL_GROUPS["Final Notes"]
  // ],

  // "Sales Enablement Content": [
  //   ALL_GROUPS["Prospect Profile"],
  //   ALL_GROUPS["Company Context"],
  //   ALL_GROUPS["Asset Details"],
  //   ALL_GROUPS["Buyer Context"],
  //   ALL_GROUPS["Messaging Style"],
  //   ALL_GROUPS["Final Notes"]
  // ],

  // "Objection Handling": [
  //   ALL_GROUPS["Prospect Profile"],
  //   ALL_GROUPS["Company Context"],
  //   ALL_GROUPS["Objection Context"],
  //   ALL_GROUPS["Response Framing"],
  //   ALL_GROUPS["Delivery Variables"],
  //   ALL_GROUPS["Final Notes"]
  // ],

  // "Market & Audience Research": [
  //   ALL_GROUPS["Goal & Audience"],
  //   ALL_GROUPS["Research Plan & Methods"],
  //   ALL_GROUPS["Data & Validation"],
  //   ALL_GROUPS["Results & Communication"],
  //   ALL_GROUPS["AI-Generated"],
  // ],

  // "Brand Strategy & Positioning": [
  //   ALL_GROUPS["Brand Identity"],
  //   ALL_GROUPS["Target Audience"],
  //   ALL_GROUPS["Positioning & Messaging"],
  //   ALL_GROUPS["Brand Channels & Assets"],
  //   ALL_GROUPS["Final Notes"]
  // ],

  // "Email & Lifecycle Marketing": [
  //   ALL_GROUPS["Audience & Segmentation"],
  //   ALL_GROUPS["Campaign & Purpose"],
  //   ALL_GROUPS["Content & Personalization"],
  //   ALL_GROUPS["Timing & Automation"],
  //   ALL_GROUPS["Testing & Compliance"],
  //   ALL_GROUPS["Final Notes"]
  // ],

  // "Marketing Analytics & Optimization": [
  //   ALL_GROUPS["Project & Scope"],
  //   ALL_GROUPS["Key Metrics & Goals"],
  //   ALL_GROUPS["Insights & Takeaways"],
  //   ALL_GROUPS["Testing & Experimentation (Optional)"],
  //   ALL_GROUPS["Recommendations & Action"]
  // ],

  // "Campaign & Sequence Planning": [
  //   ALL_GROUPS["Prospect Profile"],
  //   ALL_GROUPS["Company Context"],
  //   ALL_GROUPS["Sequence Design"],
  //   ALL_GROUPS["Final Notes"]
  // ],

  // "Analytics & Optimization": [
  //   ALL_GROUPS["Performance Data"],
  //   ALL_GROUPS["Insights & Optimization"],
  //   ALL_GROUPS["Final Notes"]
  // ],

  "Copywriting": [
    ALL_GROUPS["Audience & Offer Context"],
    ALL_GROUPS["Core Copy Elements for the Ad"],
    ALL_GROUPS["Creative & Channel Guidelines"],
    ALL_GROUPS["SEO & Keywords (Optional)"],
    ALL_GROUPS["Final Notes"]
  ],

  // "SEO & Organic Traffic": [
  //   ALL_GROUPS["Essential SEO Information"],
  //   ALL_GROUPS["Optional (Advanced) SEO Information"],
  //   ALL_GROUPS["AI-Generated"]
  // ],

  // "Launch Product": [
  //   ALL_GROUPS["Launch Basics"],
  //   ALL_GROUPS["Messaging & Assets"],
  //   ALL_GROUPS["Distribution Plan"],
  //   ALL_GROUPS["Engagement & Follow-Up"],
  //   ALL_GROUPS["Success Metrics"]
  // ]
};
