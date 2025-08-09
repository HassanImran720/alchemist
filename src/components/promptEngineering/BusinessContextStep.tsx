import React, { useState } from "react";
import { ContextData } from "./PromptEngSection";

interface Props {
  contextData: ContextData;
  setContextData: React.Dispatch<React.SetStateAction<ContextData>>;
}

type FieldType = "text" | "dropdown" | "checkbox" | "multiselect" | "file";

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
        {
          label: "Job Title",
          type: "text",
          placeholder: "e.g., VP of Marketing",
        },
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
      group: "🏢 Company Context",
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
    // Add 🚨 Sales Intent & Trigger Data, 🧠 Message Framing, 📦 Delivery Format, 📚 Reference, 🧠 Prompt Engine Logic etc.
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
    <div className="rounded-lg shadow-sm border-[0.5px] border-gold/30 p-6 mb-6">
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
          <option value="Sales & Lead Generation">
            Sales & Lead Generation
          </option>
          <option value="Customer Support & Service">
            Customer Support & Service
          </option>
          <option value="Marketing & Content Creation">
            Marketing & Content Creation
          </option>
          <option value="Operations & Workflow Automation">
            Operations & Workflow Automation
          </option>
          <option value="Training & Internal Communications">
            Training & Internal Communications
          </option>
          <option value="Other">Other</option>
        </select>
      </div>

      {selectedOption &&
        optionFieldsConfig[selectedOption]?.map((group, idx) => (
          <div key={idx} className="mb-6 border-t-[0.5px] border-gold/30 pt-4">
            <h3 className="text-lg font-semibold mb-3">{group.group}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.fields.map((field, i) => (
                <div key={i} className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    {field.label}
                  </label>

                  {field.type === "text" && (
                    <input
                      type="text"
                      placeholder={field.placeholder || ""}
                      className="px-3 py-1.5 border-[0.5px] border-gold/30 rounded-md focus:ring-2 focus:ring-gold focus:border-gold text-sm bg-ivory"
                      onChange={(e) =>
                        updateFieldValue(field.label, e.target.value)
                      }
                    />
                  )}

                  {field.type === "dropdown" && (
                    <select
                      className="px-3 py-1.5 border-[0.5px] border-gold/30 rounded-md focus:ring-2 focus:ring-gold focus:border-gold text-sm bg-ivory"
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

                  {field.type === "multiselect" && (
                    <div>
                      {/* Heading */}
                      <div className="border-[0.5px] border-gold/30 rounded-md p-1.5 flex flex-wrap gap-2 min-h-[42px] bg-ivory">
                        {/* Selected tags */}
                        {contextData.dynamicFields?.[field.label]?.map(
                          (item: string, index: number) => (
                            <span
                              key={index}
                              className="flex items-center gap-1 bg-gold/20 text-gold px-2 py-1 rounded-full text-sm"
                            >
                              {item}
                              <button
                                type="button"
                                onClick={() =>
                                  updateFieldValue(
                                    field.label,
                                    contextData.dynamicFields[
                                      field.label
                                    ].filter((val: string) => val !== item)
                                  )
                                }
                                className="text-red-500 hover:text-red-700"
                              >
                                ×
                              </button>
                            </span>
                          )
                        )}

                        {/* Dropdown for selecting options */}
                        <select
                          className="border-0 focus:ring-0 outline-none bg-transparent text-sm"
                          onChange={(e) => {
                            const value = e.target.value;
                            if (
                              value &&
                              !contextData.dynamicFields?.[
                                field.label
                              ]?.includes(value)
                            ) {
                              updateFieldValue(field.label, [
                                ...(contextData.dynamicFields?.[field.label] ||
                                  []),
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
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Custom Fields Section */}
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
        className="flex-1 px-3 py-1.5 border-[0.5px] border-gold/30 rounded-md text-gray bg-ivory focus:ring-gold focus:border-gold"
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
        ))}
    </div>
  );
};

export default BusinessContextStep;












// import React from 'react';
// import { ContextData } from './PromptEngSection';

// interface Props {
//   contextData: ContextData;
//   setContextData: React.Dispatch<React.SetStateAction<ContextData>>;
// }

// const BusinessContextStep: React.FC<Props> = ({ contextData, setContextData }) => {
//   const update = (key: string, value: string) => {
//     setContextData((prev) => ({ ...prev, [key]: value }));
//   };

//   const addField = () => {
//     setContextData((prev) => ({
//       ...prev,
//       customFields: [...(prev.customFields || []), '']
//     }));
//   };

//   const removeField = (index: number) => {
//     setContextData((prev) => ({
//       ...prev,
//       customFields: (prev.customFields || []).filter((_, i) => i !== index)
//     }));
//   };

//   const updateField = (index: number, value: string) => {
//     setContextData((prev) => ({
//       ...prev,
//       customFields: (prev.customFields || []).map((f, i) => (i === index ? value : f))
//     }));
//   };

//   return (
//     <div className="rounded-lg shadow-sm border border-gray-200 p-6 mb-6">

//       <div className="flex items-center mb-4">
//         <div className="bg-gold text-ivory rounded-full w-8 h-8 flex items-center justify-center font-semibold mr-3">3</div>
//         <div>
//           <h2 className="text-xl font-semibold text-charcoal">Provide Business Context</h2>
//           <p className="text-sm text-gray">Fill in details about your business and training needs for more relevant AI results.</p>
//         </div>
//       </div>

//       <div className="mb-4">
//         <label className="block mb-1 text-sm font-medium text-black" htmlFor="industry">Industry</label>
//         <select
//           id="industry"
//           value={contextData.industry || ''}
//           onChange={(e) => update('industry', e.target.value)}
//           className="w-full p-3 border-[0.5px] border-gold/30 rounded-md focus:ring-gold focus:border-gold"
//         >
//           <option value="">Choose an industry...</option>
//           <option value="training">Training</option>
//           <option value="marketing">Marketing</option>
//           <option value="technology">Technology</option>
//         </select>
//       </div>

//       <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* Add labels and descriptive placeholders for each field */}
//         <div className="flex flex-col">
//           <label className="mb-1 text-sm font-medium text-black" htmlFor="companyName">Company Name</label>
//           <input
//             id="companyName"
//             placeholder="Enter your company or organization name."
//             className="p-3 border-[0.5px] border-gold/30 rounded-md focus:ring-gold focus:border-gold"
//             value={contextData.companyName || ''}
//             onChange={(e) => update('companyName', e.target.value)}
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="mb-1 text-sm font-medium text-black" htmlFor="targetAudience">Target Audience</label>
//           <input
//             id="targetAudience"
//             placeholder="Who is this training or content for?"
//             className="p-3 border-[0.5px] border-gold/30 rounded-md focus:ring-gold focus:border-gold"
//             value={contextData.targetAudience || ''}
//             onChange={(e) => update('targetAudience', e.target.value)}
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="mb-1 text-sm font-medium text-black" htmlFor="learningObjective">Learning Objective</label>
//           <input
//             id="learningObjective"
//             placeholder="What should the audience learn or achieve?"
//             className="p-3 border-[0.5px] border-gold/30 rounded-md focus:ring-gold focus:border-gold"
//             value={contextData.learningObjective || ''}
//             onChange={(e) => update('learningObjective', e.target.value)}
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="mb-1 text-sm font-medium text-black" htmlFor="trainingFormat">Training Format</label>
//           <input
//             id="trainingFormat"
//             placeholder="e.g., online, in-person, hybrid, etc."
//             className="p-3 border-[0.5px] border-gold/30 rounded-md focus:ring-gold focus:border-gold"
//             value={contextData.trainingFormat || ''}
//             onChange={(e) => update('trainingFormat', e.target.value)}
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="mb-1 text-sm font-medium text-black" htmlFor="tone">Tone</label>
//           <input
//             id="tone"
//             placeholder="Preferred tone (e.g., formal, casual, inspiring)"
//             className="p-3 border-[0.5px] border-gold/30 rounded-md focus:ring-gold focus:border-gold"
//             value={contextData.tone || ''}
//             onChange={(e) => update('tone', e.target.value)}
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="mb-1 text-sm font-medium text-black" htmlFor="knowledgeLevel">Knowledge Level</label>
//           <input
//             id="knowledgeLevel"
//             placeholder="Audience's current knowledge level."
//             className="p-3 border-[0.5px] border-gold/30 rounded-md focus:ring-gold focus:border-gold"
//             value={contextData.knowledgeLevel || ''}
//             onChange={(e) => update('knowledgeLevel', e.target.value)}
//           />
//         </div>
//       </form>

//       <div className="mt-6">
//         <div className="flex justify-between items-center mb-2">
//           <label className="text-sm font-medium text-black">Custom Fields</label>
//           <button className="text-gold text-sm" type="button" onClick={addField}>+ Add</button>
//         </div>
//         {(contextData.customFields || []).map((field, i) => (
//           <div key={i} className="flex items-center mb-2">
//             <input
//               type="text"
//               value={field}
//               onChange={(e) => updateField(i, e.target.value)}
//               className="flex-1 p-3 border-[0.5px] border-gold/30 rounded-md focus:ring-gold focus:border-gold"
//               placeholder="Custom field..."
//             />
//             <button className="ml-2 text-red-500" type="button" onClick={() => removeField(i)}>✕</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BusinessContextStep;
