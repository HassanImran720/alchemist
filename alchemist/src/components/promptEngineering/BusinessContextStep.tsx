import React, { useState, useRef, useEffect } from "react";
import { ContextData, usePromptEng } from "../../context/PromptEngContext";
import { ChevronDown, ChevronUp, Triangle } from "lucide-react";
import { FieldType, FieldConfig, OptionFieldsConfig } from "./GuidedModeForms";
import { optionFieldsConfigData } from "./CategoriesConfig";
import SavePromptModal from "./SavePromptModal";

interface Props {
  contextData: ContextData;
  setContextData: React.Dispatch<React.SetStateAction<ContextData>>;
}

const optionFieldsConfig: OptionFieldsConfig = optionFieldsConfigData;

// Define parent-child category structure
const categoryHierarchy: { [key: string]: string[] } = {
  // "Sales": [
  //   "Sales Research",
  //   "Sales Copy",
  //   "Objection Handling",
  //   "Sales Enablement Content",

  // ],
  // "Marketing": [
  //   "Marketing Analytics & Optimization",
  // "Market & Audience Research",
  //   "Brand Strategy & Positioning",
  //   "Email & Lifecycle Marketing",
  //   "Analytics & Optimization",
  // "Launch Product"
  // ]
};

// Get independent categories (those not in any parent)
const getIndependentCategories = () => {
  const allCategories = Object.keys(optionFieldsConfig);
  const childCategories = Object.values(categoryHierarchy).flat();
  return allCategories.filter(cat => !childCategories.includes(cat));
};

const BusinessContextStep: React.FC<Props> = ({
  contextData,
  setContextData,
}) => {
  const { selectedCategory, setSelectedCategory, savePromptToLibrary, isSavingPrompt } = usePromptEng();
  const [openGroups, setOpenGroups] = useState<{ [key: string]: boolean }>({});
  const [customDropdownValues, setCustomDropdownValues] = useState<{ [key: string]: string }>({});
  const [showCustomInput, setShowCustomInput] = useState<{ [key: string]: boolean }>({});
  // store user-added options per field so they appear in the option lists after being added
  const [addedCustomOptions, setAddedCustomOptions] = useState<{ [key: string]: string[] }>({});
  // store selected category for nested dropdowns (multi-select)
  const [nestedDropdownCategory, setNestedDropdownCategory] = useState<{ [key: string]: string }>({});
  // store selected category for nested-single-dropdown (single-select)
  const [nestedSingleCategory, setNestedSingleCategory] = useState<{ [key: string]: string }>({});
  // Modal state for category change confirmation
  const [showCategoryClearModal, setShowCategoryClearModal] = useState(false);
  const [pendingCategory, setPendingCategory] = useState<string>("");
  const [showSaveModal, setShowSaveModal] = useState(false);
  // State for expanded parent categories in dropdown
  const [expandedParents, setExpandedParents] = useState<{ [key: string]: boolean }>({});
  // State for custom category dropdown
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  // Helper function to check if a field should be rendered based on conditionalOn property
  const shouldRenderField = (field: FieldConfig): boolean => {
    if (!field.conditionalOn) return true; // No condition, always render
    
    const { field: conditionField, value: conditionValue } = field.conditionalOn;
    const currentValue = contextData.dynamicFields?.[conditionField];
    
    return currentValue === conditionValue;
  };

  // Helper function to check if dropdown should allow custom options
  const allowsCustomOptions = (fieldLabel: string): boolean => {
    // Dropdowns that control conditional rendering should NOT allow custom options
    const noCustomOptionFields = ["Select Copy Mode"];
    return !noCustomOptionFields.includes(fieldLabel);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
    };

    if (isCategoryDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCategoryDropdownOpen]);

  const updateFieldValue = (label: string, value: any) => {
    setContextData((prev) => ({
      ...prev,
      dynamicFields: { ...(prev.dynamicFields || {}), [label]: value },
    }));
  };

  // Check if context data has any values
  const hasContextData = () => {
    if (!contextData.dynamicFields || Object.keys(contextData.dynamicFields).length === 0) {
      return false;
    }
    // Check if any field has a non-empty value
    return Object.values(contextData.dynamicFields).some(value => {
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === 'string') return value.trim().length > 0;
      if (typeof value === 'boolean') return value;
      if (typeof value === 'number') return true;
      return false;
    });
  };

  // Handle category change with confirmation if data exists
  const handleCategoryChange = (newCategory: string) => {
    if (selectedCategory && newCategory !== selectedCategory && hasContextData()) {
      // Show confirmation modal
      setPendingCategory(newCategory);
      setShowCategoryClearModal(true);
    } else {
      // No data or same category, just switch
      setSelectedCategory(newCategory);
    }
  };

  // Clear context data
  const clearContextData = () => {
    setContextData({
      dynamicFields: {},
      customFieldsByGroup: {},
    });
  };

  // Confirm category change and clear data
  const confirmCategoryChange = () => {
    clearContextData();
    setSelectedCategory(pendingCategory);
    setShowCategoryClearModal(false);
    setPendingCategory("");
  };

  // Cancel category change
  const cancelCategoryChange = () => {
    setShowCategoryClearModal(false);
    setPendingCategory("");
  };

  const toggleParentCategory = (parent: string) => {
    setExpandedParents((prev) => ({
      ...prev,
      [parent]: !prev[parent],
    }));
  };

  const selectCategory = (category: string) => {
    handleCategoryChange(category);
    setIsCategoryDropdownOpen(false);
  };

  const getCategoryDisplayName = () => {
    if (!selectedCategory) return "Select Category";
    return selectedCategory;
  };

  const toggleGroup = (groupName: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  const handleDropdownChange = (fieldLabel: string, value: string) => {
    if (value === "CUSTOM_FIELD") {
      setShowCustomInput((prev) => ({ ...prev, [fieldLabel]: true }));
    } else {
      setShowCustomInput((prev) => ({ ...prev, [fieldLabel]: false }));
      updateFieldValue(fieldLabel, value);
    }
  };

  const handleCustomDropdownSubmit = (fieldLabel: string) => {
    const customValue = customDropdownValues[fieldLabel];
    if (customValue && customValue.trim()) {
      const trimmed = customValue.trim();
      // set as the selected value for this field
      updateFieldValue(fieldLabel, trimmed);
      // add to the local list of added options so it shows up in option lists
      setAddedCustomOptions((prev) => ({
        ...prev,
        [fieldLabel]: [...(prev[fieldLabel] || []), trimmed],
      }));
      setShowCustomInput((prev) => ({ ...prev, [fieldLabel]: false }));
      setCustomDropdownValues((prev) => ({ ...prev, [fieldLabel]: "" }));
    }
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
    <>
      {/* Category Selector - placed outside the main bordered form */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-black">
          Select Category
        </label>
        <div className="relative" ref={categoryDropdownRef}>
          <button
            type="button"
            onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
            className="w-full text-left p-3 pr-10 border-[0.5px] border-gold/30 rounded-md bg-ivory hover:bg-ivory/80 transition-colors"
          >
            <span className={selectedCategory ? "text-black" : "text-gray-500"}>
              {getCategoryDisplayName()}
            </span>
            <ChevronDown
              size={18}
              className={`absolute right-3 top-1/2 -translate-y-1/2 text-black transition-transform ${
                isCategoryDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isCategoryDropdownOpen && (
            <div className="absolute z-50 w-full mt-1 bg-ivory border border-gold/30 rounded-md shadow-lg max-h-80 overflow-y-auto">
              {getIndependentCategories().map((category) => (
                <div
                  key={category}
                  onClick={() => selectCategory(category)}
                  className="px-4 py-2.5 hover:bg-gold hover:text-white cursor-pointer transition-colors"
                >
                  {category}
                </div>
              ))}

              {Object.keys(categoryHierarchy).map((parent) => (
                <div key={parent}>
                  <div
                    onClick={() => toggleParentCategory(parent)}
                    className="px-4 py-2.5 font-semibold bg-ivory hover:bg-gold hover:text-white cursor-pointer flex items-center justify-between transition-colors border-t border-gold/20"
                  >
                    <span>{parent}</span>
                    <Triangle
                      size={12}
                      className={`transition-transform duration-200 ${
                        expandedParents[parent] ? "rotate-180" : "rotate-90"
                      }`}
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth={2}
                    />
                  </div>

                  {expandedParents[parent] && (
                    <div>
                      {categoryHierarchy[parent].map((child) => (
                        <div
                          key={child}
                          onClick={() => selectCategory(child)}
                          className="pl-8 pr-4 py-2.5 hover:bg-gold hover:text-white cursor-pointer transition-colors"
                        >
                          {child}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main bordered form - contains the header and dynamic fields */}
      <div className={`rounded-xl border border-gold/30 p-4 mb-4 ${showCategoryClearModal || showSaveModal ? 'filter blur-sm pointer-events-none select-none' : ''}`}>
        <div className="flex items-center mb-3 sm:mb-2">
          <h2 className=" text-base sm:text-lg text-black mb-3 sm:mb-1">
            <strong>III. Provide Context:</strong> Include any background
            information necessary.
          </h2>
        </div>

        <p className="text-lg text-black mb-4">
          Fill out the following fields, if it does not apply, you can skip.
        </p>

        {/* Dynamic Groups */}
        {selectedCategory &&
          optionFieldsConfig[selectedCategory]?.map((group, idx) => (
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
                    {group.fields.filter(shouldRenderField).map((field, i) => (
                      <div key={i} className={`flex flex-col ${field.type === 'textarea' ? 'col-span-1 md:col-span-2' : ''}`}>
                        <label className="mb-1 text-sm font-medium text-gray-700">
                          {field.label}
                        </label>

                        {/* Text */}
                        {field.type === "text" && (
                          <input
                            type="text"
                            placeholder={field.placeholder || ""}
                            value={contextData.dynamicFields?.[field.label] || ""}
                            className="px-3 py-2 border-[0.5px] border-gold/30 rounded-md 
                                   focus:ring-2 focus:ring-gold focus:border-gold text-sm bg-ivory w-full"
                            onChange={(e) =>
                              updateFieldValue(field.label, e.target.value)
                            }
                          />
                        )}

                        {/* Textarea */}
                        {field.type === "textarea" && (
                          <div className="relative">
                            <textarea
                              placeholder={field.placeholder || ""}
                              maxLength={500}
                              className="px-3 py-2 border-[0.5px] border-gold/30 rounded-md 
                                     focus:ring-2 focus:ring-gold focus:border-gold text-sm bg-ivory w-full 
                                     min-h-[100px] max-h-[200px] overflow-y-auto resize-y custom-scroll"
                              onChange={(e) =>
                                updateFieldValue(field.label, e.target.value)
                              }
                              value={contextData.dynamicFields?.[field.label] || ""}
                            />
                            <div className="text-xs text-gray-500 mt-1 text-right">
                              {(contextData.dynamicFields?.[field.label]?.length || 0)} / 500 characters
                            </div>
                          </div>
                        )}

                        {/* Number */}
                        {field.type === "number" && (
                          <input
                            type="number"
                            min="0"
                            value={contextData.dynamicFields?.[field.label] || ""}
                            className="px-3 py-2 border-[0.5px] border-gold/30 rounded-md 
                                   focus:ring-2 focus:ring-gold focus:border-gold text-sm bg-ivory w-full"
                            onChange={(e) => {
                              const value = Number(e.target.value);
                              updateFieldValue(
                                field.label,
                                value < 0 ? 0 : value
                              );
                            }}
                          />
                        )}

                        {/* Dropdown */}
                        {field.type === "dropdown" && (
                          <>
                            {!showCustomInput[field.label] ? (
                              <div className="relative">
                                <select
                                  className="px-3 py-2 border-[0.5px] border-gold/30 rounded-md 
                                         focus:ring-2 focus:ring-gold focus:border-gold text-sm bg-ivory w-full appearance-none"
                                  value={contextData.dynamicFields?.[field.label] || ""}
                                  onChange={(e) =>
                                    handleDropdownChange(field.label, e.target.value)
                                  }
                                >
                                  <option value="">Select...</option>
                                  {[...(field.options || []), ...(addedCustomOptions[field.label] || [])].map((opt, oi) => (
                                    <option key={`${field.label}-opt-${oi}`} value={opt}>
                                      {opt}
                                    </option>
                                  ))}
                                  {allowsCustomOptions(field.label) && (
                                    <option value="CUSTOM_FIELD">Other (add)</option>
                                  )}
                                </select>
                                <ChevronDown
                                  size={16}
                                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
                                />
                              </div>
                            ) : (
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder="Enter custom value..."
                                  className="flex-1 px-3 py-2 border-[0.5px] border-gold/30 rounded-md 
                                         focus:ring-2 focus:ring-gold focus:border-gold text-sm bg-ivory"
                                  value={customDropdownValues[field.label] || ""}
                                  onChange={(e) =>
                                    setCustomDropdownValues((prev) => ({
                                      ...prev,
                                      [field.label]: e.target.value,
                                    }))
                                  }
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      handleCustomDropdownSubmit(field.label);
                                    }
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={() => handleCustomDropdownSubmit(field.label)}
                                  className="px-3 py-2 bg-gold/20 text-gold rounded-md hover:bg-gold/30 text-sm"
                                >
                                  Add
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setShowCustomInput((prev) => ({ ...prev, [field.label]: false }));
                                    setCustomDropdownValues((prev) => ({ ...prev, [field.label]: "" }));
                                  }}
                                  className="px-3 py-2 border-[0.5px] border-gold/30 rounded-md text-gray-600 hover:bg-gray-100 text-sm"
                                >
                                  Cancel
                                </button>
                              </div>
                            )}
                          </>
                        )}

                        {/* Multi-select */}
                        {field.type === "multiselect" && (
                          <div className="space-y-2">
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
                                  if (value === "CUSTOM_FIELD") {
                                    setShowCustomInput((prev) => ({ ...prev, [field.label]: true }));
                                  } else if (value) {
                                    const currentValues =
                                      contextData.dynamicFields?.[field.label] ||
                                      [];
                                    if (!currentValues.includes(value)) {
                                      updateFieldValue(field.label, [
                                        ...currentValues,
                                        value,
                                      ]);
                                    }
                                  }
                                  e.target.value = "";
                                }}
                              >
                                <option value="">Select...</option>
                                {[...(field.options || []), ...(addedCustomOptions[field.label] || [])].map((opt, oi) => (
                                  <option key={`${field.label}-ms-opt-${oi}`} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                                <option value="CUSTOM_FIELD">Other (add)</option>
                              </select>
                            </div>
                            {showCustomInput[field.label] && (
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder="Enter custom value..."
                                  className="flex-1 px-3 py-2 border-[0.5px] border-gold/30 rounded-md 
                                         focus:ring-2 focus:ring-gold focus:border-gold text-sm bg-ivory"
                                  value={customDropdownValues[field.label] || ""}
                                  onChange={(e) =>
                                    setCustomDropdownValues((prev) => ({
                                      ...prev,
                                      [field.label]: e.target.value,
                                    }))
                                  }
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      const customValue = customDropdownValues[field.label];
                                      if (customValue && customValue.trim()) {
                                        const currentValues = contextData.dynamicFields?.[field.label] || [];
                                        if (!currentValues.includes(customValue.trim())) {
                                          updateFieldValue(field.label, [...currentValues, customValue.trim()]);
                                        }
                                        setShowCustomInput((prev) => ({ ...prev, [field.label]: false }));
                                        setCustomDropdownValues((prev) => ({ ...prev, [field.label]: "" }));
                                      }
                                    }
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const customValue = customDropdownValues[field.label];
                                    if (customValue && customValue.trim()) {
                                      const trimmed = customValue.trim();
                                      const currentValues = contextData.dynamicFields?.[field.label] || [];
                                      if (!currentValues.includes(trimmed)) {
                                        updateFieldValue(field.label, [...currentValues, trimmed]);
                                      }
                                      // also add to addedCustomOptions so it's selectable later
                                      setAddedCustomOptions((prev) => ({
                                        ...prev,
                                        [field.label]: [...(prev[field.label] || []), trimmed],
                                      }));
                                      setShowCustomInput((prev) => ({ ...prev, [field.label]: false }));
                                      setCustomDropdownValues((prev) => ({ ...prev, [field.label]: "" }));
                                    }
                                  }}
                                  className="px-3 py-2 bg-gold/20 text-gold rounded-md hover:bg-gold/30 text-sm"
                                >
                                  Add
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setShowCustomInput((prev) => ({ ...prev, [field.label]: false }));
                                    setCustomDropdownValues((prev) => ({ ...prev, [field.label]: "" }));
                                  }}
                                  className="px-3 py-2 border-[0.5px] border-gold/30 rounded-md text-gray-600 hover:bg-gray-100 text-sm"
                                >
                                  Cancel
                                </button>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Nested Dropdown (for multi-select like CTA, Your Value Add) */}
                        {field.type === "nested-dropdown" && (
                          <div className="space-y-3">
                            {/* Main Category Dropdown */}
                            <div className="relative">
                              <select
                                className="px-3 py-2 border-[0.5px] border-gold/30 rounded-md 
                                       focus:ring-2 focus:ring-gold focus:border-gold text-sm bg-ivory w-full appearance-none"
                                value={nestedDropdownCategory[field.label] || ""}
                                onChange={(e) => {
                                  const category = e.target.value;
                                  setNestedDropdownCategory((prev) => ({
                                    ...prev,
                                    [field.label]: category,
                                  }));
                                  // Reset the multiselect values when category changes
                                  if (!category) {
                                    updateFieldValue(field.label, []);
                                  }
                                }}
                              >
                                <option value="">Select Category...</option>
                                {(field.options || []).map((opt, oi) => (
                                  <option key={`${field.label}-cat-${oi}`} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown
                                size={16}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
                              />
                            </div>

                            {/* Show multiselect if a category is selected */}
                            {nestedDropdownCategory[field.label] && field.nestedOptions && (
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                  Select Options from {nestedDropdownCategory[field.label]}:
                                </label>
                                <div className="border-[0.5px] border-gold/30 rounded-md p-2 flex flex-wrap gap-2 min-h-[42px] bg-ivory">
                                  {(Array.isArray(contextData.dynamicFields?.[field.label]) 
                                    ? contextData.dynamicFields[field.label] 
                                    : []
                                  ).map((item: string, index: number) => (
                                    <span
                                      key={index}
                                      className="flex items-center gap-1 bg-gold/20 text-gold px-2 py-1 rounded-full text-sm"
                                    >
                                      {item}
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const currentValues = Array.isArray(contextData.dynamicFields?.[field.label])
                                            ? contextData.dynamicFields[field.label]
                                            : [];
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
                                      if (value === "CUSTOM_FIELD") {
                                        setShowCustomInput((prev) => ({ ...prev, [field.label]: true }));
                                      } else if (value) {
                                        const currentValues = Array.isArray(contextData.dynamicFields?.[field.label])
                                          ? contextData.dynamicFields[field.label]
                                          : [];
                                        if (!currentValues.includes(value)) {
                                          updateFieldValue(field.label, [
                                            ...currentValues,
                                            value,
                                          ]);
                                        }
                                      }
                                      e.target.value = "";
                                    }}
                                  >
                                    <option value="">Select...</option>
                                    {(field.nestedOptions[nestedDropdownCategory[field.label]] || []).map((opt, oi) => (
                                      <option key={`${field.label}-nested-${oi}`} value={opt}>
                                        {opt}
                                      </option>
                                    ))}
                                    <option value="CUSTOM_FIELD">Other (add)</option>
                                  </select>
                                </div>
                                {showCustomInput[field.label] && (
                                  <div className="flex gap-2">
                                    <input
                                      type="text"
                                      placeholder="Enter custom value..."
                                      className="flex-1 px-3 py-2 border-[0.5px] border-gold/30 rounded-md 
                                             focus:ring-2 focus:ring-gold focus:border-gold text-sm bg-ivory"
                                      value={customDropdownValues[field.label] || ""}
                                      onChange={(e) =>
                                        setCustomDropdownValues((prev) => ({
                                          ...prev,
                                          [field.label]: e.target.value,
                                        }))
                                      }
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                          const customValue = customDropdownValues[field.label];
                                          if (customValue && customValue.trim()) {
                                            const currentValues = Array.isArray(contextData.dynamicFields?.[field.label])
                                              ? contextData.dynamicFields[field.label]
                                              : [];
                                            if (!currentValues.includes(customValue.trim())) {
                                              updateFieldValue(field.label, [...currentValues, customValue.trim()]);
                                            }
                                            setShowCustomInput((prev) => ({ ...prev, [field.label]: false }));
                                            setCustomDropdownValues((prev) => ({ ...prev, [field.label]: "" }));
                                          }
                                        }
                                      }}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const customValue = customDropdownValues[field.label];
                                        if (customValue && customValue.trim()) {
                                          const trimmed = customValue.trim();
                                          const currentValues = Array.isArray(contextData.dynamicFields?.[field.label])
                                            ? contextData.dynamicFields[field.label]
                                            : [];
                                          if (!currentValues.includes(trimmed)) {
                                            updateFieldValue(field.label, [...currentValues, trimmed]);
                                          }
                                          setShowCustomInput((prev) => ({ ...prev, [field.label]: false }));
                                          setCustomDropdownValues((prev) => ({ ...prev, [field.label]: "" }));
                                        }
                                      }}
                                      className="px-3 py-2 bg-gold/20 text-gold rounded-md hover:bg-gold/30 text-sm"
                                    >
                                      Add
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setShowCustomInput((prev) => ({ ...prev, [field.label]: false }));
                                        setCustomDropdownValues((prev) => ({ ...prev, [field.label]: "" }));
                                      }}
                                      className="px-3 py-2 border-[0.5px] border-gold/30 rounded-md text-gray-600 hover:bg-gray-100 text-sm"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Nested Single Dropdown (for Job Title - single select only) */}
                        {field.type === "nested-single-dropdown" && (
                          <div className="space-y-3">
                            {/* Main Category Dropdown */}
                            <div className="relative">
                              <select
                                className="px-3 py-2 border-[0.5px] border-gold/30 rounded-md 
                                       focus:ring-2 focus:ring-gold focus:border-gold text-sm bg-ivory w-full appearance-none"
                                value={nestedSingleCategory[field.label] || ""}
                                onChange={(e) => {
                                  const category = e.target.value;
                                  setNestedSingleCategory((prev) => ({
                                    ...prev,
                                    [field.label]: category,
                                  }));
                                  // Reset the selected value when category changes
                                  if (!category) {
                                    updateFieldValue(field.label, "");
                                  }
                                }}
                              >
                                <option value="">Select Category...</option>
                                {(field.options || []).map((opt, oi) => (
                                  <option key={`${field.label}-cat-${oi}`} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown
                                size={16}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
                              />
                            </div>

                            {/* Show single-select dropdown if a category is selected */}
                            {nestedSingleCategory[field.label] && field.nestedOptions && (
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                  Select Option from {nestedSingleCategory[field.label]}:
                                </label>
                                {!showCustomInput[field.label] ? (
                                  <div className="relative">
                                    <select
                                      className="px-3 py-2 border-[0.5px] border-gold/30 rounded-md 
                                             focus:ring-2 focus:ring-gold focus:border-gold text-sm bg-ivory w-full appearance-none"
                                      value={contextData.dynamicFields?.[field.label] || ""}
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        if (value === "CUSTOM_FIELD") {
                                          setShowCustomInput((prev) => ({ ...prev, [field.label]: true }));
                                        } else {
                                          updateFieldValue(field.label, value);
                                        }
                                      }}
                                    >
                                      <option value="">Select...</option>
                                      {(field.nestedOptions[nestedSingleCategory[field.label]] || []).map((opt, oi) => (
                                        <option key={`${field.label}-nested-${oi}`} value={opt}>
                                          {opt}
                                        </option>
                                      ))}
                                      <option value="CUSTOM_FIELD">Other (add)</option>
                                    </select>
                                    <ChevronDown
                                      size={16}
                                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
                                    />
                                  </div>
                                ) : (
                                  <div className="flex gap-2">
                                    <input
                                      type="text"
                                      placeholder="Enter custom value..."
                                      className="flex-1 px-3 py-2 border-[0.5px] border-gold/30 rounded-md 
                                             focus:ring-2 focus:ring-gold focus:border-gold text-sm bg-ivory"
                                      value={customDropdownValues[field.label] || ""}
                                      onChange={(e) =>
                                        setCustomDropdownValues((prev) => ({
                                          ...prev,
                                          [field.label]: e.target.value,
                                        }))
                                      }
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                          handleCustomDropdownSubmit(field.label);
                                        }
                                      }}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => handleCustomDropdownSubmit(field.label)}
                                      className="px-3 py-2 bg-gold/20 text-gold rounded-md hover:bg-gold/30 text-sm"
                                    >
                                      Add
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setShowCustomInput((prev) => ({ ...prev, [field.label]: false }));
                                        setCustomDropdownValues((prev) => ({ ...prev, [field.label]: "" }));
                                      }}
                                      className="px-3 py-2 border-[0.5px] border-gold/30 rounded-md text-gray-600 hover:bg-gray-100 text-sm"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
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

    {/* Category Change Confirmation Modal */}
    {showCategoryClearModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full shadow-xl">
          <div className="px-6 py-4 border-b border-gold/20">
            <h2 className="text-xl font-bold text-black">Change Category</h2>
          </div>
          
          <div className="p-6">
            <p className="text-gray mb-6">
              You have unsaved context data. Would you like to save it to the library before changing the category?
            </p>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => {
                  setShowCategoryClearModal(false);
                  setShowSaveModal(true);
                }}
                className="w-full bg-gold text-white px-6 py-3 rounded-md hover:bg-gold/90 transition-colors font-medium"
              >
                Save to Library
              </button>
              <button 
                onClick={confirmCategoryChange}
                className="w-full bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors font-medium"
              >
                Discard & Change Category
              </button>
              <button 
                onClick={cancelCategoryChange}
                className="w-full bg-gray/10 text-gray px-6 py-3 rounded-md hover:bg-gray/20 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Save Prompt Modal */}
    <SavePromptModal
      isOpen={showSaveModal}
      onClose={() => {
        setShowSaveModal(false);
        setShowCategoryClearModal(false);
      }}
      onSave={async (title: string, projectName: string) => {
        try {
          await savePromptToLibrary(title, projectName);
          setShowSaveModal(false);
          setShowCategoryClearModal(false);
          // After saving, proceed with category change
          confirmCategoryChange();
        } catch (err) {
          console.error('Save from modal failed', err);
          throw err;
        }
      }}
      isLoading={isSavingPrompt}
    />
    </>
  );
};

export default BusinessContextStep;
