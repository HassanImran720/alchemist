"use client";
import React from "react";

interface PromptTemplate {
  id: string;
  category: string;
  title: string;
  description: string;
}

const SamplePrompting: React.FC = () => {
  const promptTemplates: PromptTemplate[] = [
    { id: "marketing", category: "MARKETING", title: "Brand Voice Formula", description: "Create consistent brand messaging" },
    { id: "sales", category: "SALES", title: "Lead Generation", description: "Convert prospects into customers" },
    { id: "content", category: "CONTENT CREATION", title: "Blog Templates", description: "Structured content creation" },
    { id: "operations", category: "OPERATIONS", title: "Workflow Design", description: "Optimize business processes" },
  ];

  const blueprintCategories = [
    "MARKETING", "REAL ESTATE", "MORE",
    "SALES", "FINANCE", "MORE",
    "CONTENT CREATION", "LEAD GENERATION", "MORE",
    "OPERATIONS", "SIRI", "MORE",
    "CUSTOMER SUPPORT", "ARCHITECTURE", "MORE",
    "ENGINEERING", "MATHEMATICS", "MORE",
  ];

  return (
    <div className="space-y-8">

<div className="space-y-4">
  {promptTemplates.map((template) => (
    <div
      key={template.id}
      className="rounded-xl border-[0.5px] border-gold/30 p-5"
    >
      {/* Category label */}
      <div className="mb-2">
        <span className="inline-block rounded-full border-[0.5px] border-gold/30 px-3 py-1 text-xs font-medium text-charcoal">
          {template.category}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-charcoal">
        {template.title}
      </h3>

      {/* Description */}
      <p className="mt-1 text-sm text-gray">{template.description}</p>
    </div>
  ))}
</div>

      {/* <div>
        <div className="flex gap-4 mb-6">
          <button className="bg-gold text-white px-4 py-2 rounded font-medium">ALCHEMIST BLUEPRINT</button>
          <button className="bg-gray/20 text-black px-4 py-2 rounded font-medium hover:bg-gray/30 transition-colors">MODEL BREAKDOWNS</button>
          <button className="bg-gray/20 text-black px-4 py-2 rounded font-medium hover:bg-gray/30 transition-colors">SAMPLE PROMPTING</button>
        </div>

        <div className="mb-6">
          <h3 className="text-center text-gray mb-4">GET INSPIRATION FROM THE FOLLOWING PROMPTS</h3>
          <div className="text-center text-black font-semibold mb-6">CHOOSE YOUR CATEGORY</div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {blueprintCategories.map((category, index) => (
            <button
              key={index}
              className="bg-gold text-white py-3 px-4 rounded font-medium text-sm hover:bg-gold/90 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default SamplePrompting;
