import React, { useState } from "react";
import { ContextData } from "./PromptEngSection";
import { ChevronDown, ChevronUp, Triangle } from "lucide-react";
import { optionFieldsConfigData } from "./GuidedModeForms";
interface Props {
  contextData: ContextData;
  setContextData: React.Dispatch<React.SetStateAction<ContextData>>;
}

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

const optionFieldsConfig: OptionFieldsConfig = optionFieldsConfigData;

const BusinessContextStep: React.FC<Props> = ({
  contextData,
  setContextData,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [openGroups, setOpenGroups] = useState<{ [key: string]: boolean }>({});

  const updateFieldValue = (label: string, value: any) => {
    setContextData((prev) => ({
      ...prev,
      dynamicFields: { ...(prev.dynamicFields || {}), [label]: value },
    }));
  };

  const toggleGroup = (groupName: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  // ---------- Custom fields per group ----------
  const addCustomField = (group: string) => {
    setContextData((prev) => {
      const customFieldsByGroup = prev.customFieldsByGroup || {};
      const current = customFieldsByGroup[group] || [];
      return {
        ...prev,
        customFieldsByGroup: {
          ...customFieldsByGroup,
          [group]: [...current, ""],
        },
      };
    });
  };

  const updateCustomField = (group: string, index: number, value: string) => {
    setContextData((prev) => {
      const customFieldsByGroup = prev.customFieldsByGroup || {};
      const current = [...(customFieldsByGroup[group] || [])];
      current[index] = value;
      return {
        ...prev,
        customFieldsByGroup: { ...customFieldsByGroup, [group]: current },
      };
    });
  };

  const removeCustomField = (group: string, index: number) => {
    setContextData((prev) => {
      const customFieldsByGroup = prev.customFieldsByGroup || {};
      const current = [...(customFieldsByGroup[group] || [])];
      current.splice(index, 1);
      return {
        ...prev,
        customFieldsByGroup: { ...customFieldsByGroup, [group]: current },
      };
    });
  };
  // ---------------------------------------------

  return (
    <div className="rounded-xl border border-gold/30 p-2 md:p-4 mb-4">
      <div className="flex items-center mb-3 sm:mb-2">
        <h2 className=" text-base sm:text-lg text-black mb-3 sm:mb-1">
          <strong>III. Provide Context:</strong> Include any background
          information necessary.{" "}
        </h2>
      </div>

      {/* Category Selector */}

      <div className="mb-2">
        <label className="block mb-1 text-sm font-medium text-black">
          Select Category
        </label>
        <div className="relative">
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="w-full appearance-none p-2 pr-8 border-[0.5px] border-gold/30 rounded-md bg-ivory"
          >
            <option value="">Choose an option...</option>
            {Object.keys(optionFieldsConfig).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <ChevronDown
            size={18}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-black pointer-events-none"
          />
        </div>
      </div>

      <p className="text-lg text-black mb-4">
        Fill out the following fields, if it does not apply, you can skip.
      </p>

      {/* Dynamic Groups */}
      {selectedOption &&
        optionFieldsConfig[selectedOption]?.map((group, idx) => (
          <div key={idx} className="mb-2 pt-2">
            {/* Group Header */}
            <div className="border-[0.5px] border-gold/30 p-2 rounded-md">
              <button
                onClick={() => toggleGroup(group.group)}
                className={`w-full flex items-center justify-between px-2 rounded-md transition-all 
    ${openGroups[group.group] ? "py-1" : "py-1"}`}
              >
                <span className="text-base  font-semibold text-gray-800">
                  {group.group}
                </span>
                <Triangle
                  size={16}
                  className={`text-black transition-transform duration-200 ${
                    openGroups[group.group] ? "rotate-180" : "rotate-90"
                  }`}
                  fill="currentColor"
                  stroke="currentColor" // makes edges sharp instead of rounded
                  strokeWidth={2}
                />
              </button>

              {/* Fields */}
              {openGroups[group.group] && (
                <>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
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
                              updateFieldValue(
                                field.label,
                                Number(e.target.value)
                              )
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
                            {(
                              contextData.dynamicFields?.[field.label] || []
                            ).map((item: string, index: number) => (
                              <span
                                key={index}
                                className="flex items-center gap-1 bg-gold/20 text-gold px-2 py-1 rounded-full text-sm"
                              >
                                {item}
                                <button
                                  type="button"
                                  onClick={() => {
                                    const currentValues =
                                      contextData.dynamicFields?.[
                                        field.label
                                      ] || [];
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
                            ))}
                            <select
                              className="border-0 focus:ring-0 outline-none bg-transparent text-sm"
                              onChange={(e) => {
                                const value = e.target.value;
                                const currentValues =
                                  contextData.dynamicFields?.[field.label] ||
                                  [];
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
                            <div
                              className="w-11 h-6 bg-ivory border-[0.5px] border-gold/30 rounded-full peer peer-checked:bg-gold 
                                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                                        after:bg-ivory after:border-gray after:border after:rounded-full 
                                        after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"
                            />
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
                                  contextData.dynamicFields?.[
                                    field.label
                                  ]?.[1] || "";
                                updateFieldValue(field.label, [
                                  e.target.value,
                                  end,
                                ]);
                              }}
                            />
                            <input
                              type="date"
                              className="px-3 py-2 border-[0.5px] border-gold/30 rounded-md 
                                    focus:ring-2 focus:ring-gold focus:border-gold text-sm bg-ivory flex-1"
                              onChange={(e) => {
                                const start =
                                  contextData.dynamicFields?.[
                                    field.label
                                  ]?.[0] || "";
                                updateFieldValue(field.label, [
                                  start,
                                  e.target.value,
                                ]);
                              }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* 🔹 Custom Fields for this group */}
                  {/* ✅ Custom Fields per Group */}
                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-sm font-medium text-black">
                        Custom Fields
                      </h4>
                      <button
                        className="inline-flex items-center px-3 py-1.5 border-[0.5px] border-gold/30 rounded-md text-gray"
                        type="button"
                        onClick={() => addCustomField(group.group)}
                      >
                        + Add Field
                      </button>
                    </div>

                    <div className="space-y-2">
                      {(
                        contextData.customFieldsByGroup?.[group.group] || []
                      ).map((field: string, i: number) => (
                        <div key={i} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={field}
                            onChange={(e) =>
                              updateCustomField(group.group, i, e.target.value)
                            }
                            className="flex-1 px-3 py-2 border-[0.5px] border-gold/30 rounded-md text-gray bg-ivory focus:ring-gold focus:border-gold"
                            placeholder="Custom field name..."
                          />
                          <button
                            type="button"
                            onClick={() => removeCustomField(group.group, i)}
                            className="flex items-center justify-center px-3 py-1.5 border-[0.5px] border-gold/30 rounded-md"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default BusinessContextStep;
