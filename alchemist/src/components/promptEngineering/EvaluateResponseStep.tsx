
"use client";
import React, { useState } from "react";
import { usePromptEng } from "../../context/PromptEngContext";
import { Triangle } from "lucide-react";
interface EvaluateResponseStepProps {
  // Parent provides a function that takes the evaluation object and returns an improved prompt
  onRequestImprove?: (evaluation: any) => Promise<string | undefined>;
  // ✅ NEW: Initial evaluation data to preserve filled form
  initialEvaluation?: EvaluationData | null;
}

interface EvaluationData {
  inputs: Record<string, { status: string; issues: { description: string; problematicText?: string }[] }>;
  totalScore: number;
  additionalIssues: { description: string; problematicText?: string }[];
  whatILove: string[];
}

const EvaluateResponseStep: React.FC<EvaluateResponseStepProps> = ({ onRequestImprove, initialEvaluation }) => {
  const [scoreGenerated, setScoreGenerated] = useState(!!initialEvaluation);
  const [evaluationStarted, setEvaluationStarted] = useState(false);
  const [expandedInputs, setExpandedInputs] = useState<Record<string, boolean>>({});
  const [improving, setImproving] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [additionalIssueText, setAdditionalIssueText] = useState("");
  const [additionalIssueProblematicText, setAdditionalIssueProblematicText] = useState("");
  const [whatILoveText, setWhatILoveText] = useState("");

  // use context for prompt/response and promptStructure selection
  const { promptStructure, setPromptStructure, generatedPrompt, aiResponse, taskObjective, handleEvaluationComplete, contextData, toneData, references, insertReferences, length } = usePromptEng();

  const [inputIssueTexts, setInputIssueTexts] = useState<Record<string, string>>({});
  const [inputProblematicTexts, setInputProblematicTexts] = useState<Record<string, string>>({});

  // Generate dynamic input fields from context data + other context-level inputs
  const inputFields = React.useMemo(() => {
    const fields: { key: string; label: string }[] = [];

    // 1) fields from dynamicFields (grouped form inputs)
    if (contextData?.dynamicFields) {
      Object.entries(contextData.dynamicFields).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          let displayValue: any = value;
          if (Array.isArray(value)) displayValue = value.join(", ");
          fields.push({
            key: `field_${key.replace(/\s+/g, '_').toLowerCase()}`,
            label: `${key}: ${displayValue}`,
          });
        }
      });
    }

    // 2) custom fields added by user per group
    if (contextData?.customFieldsByGroup) {
      Object.entries(contextData.customFieldsByGroup).forEach(([groupName, customFields]) => {
        customFields.forEach((field, index) => {
          if (field && field.trim()) {
            const key = `custom_${groupName.replace(/\s+/g, '_').toLowerCase()}_${index}`;
            fields.push({ key, label: `${groupName} - ${field}: [User Input]` });
          }
        });
      });
    }

    // 3) Include other context-level inputs that matter to the response
    //    Include only if they are filled. Exclude selectedCategory, promptStructure and outputFormat per request.
    // toneData (could be a string, array, or object)
    if (typeof toneData !== 'undefined' && toneData !== null) {
      let hasValue = false;
      let toneLabel = '';
      
      if (Array.isArray(toneData)) {
        hasValue = toneData.length > 0;
        toneLabel = toneData.join(', ');
      } else if (typeof toneData === 'string') {
        const toneStr = toneData as string;
        hasValue = toneStr.trim() !== '';
        toneLabel = toneStr;
      } else {
        hasValue = true;
        toneLabel = JSON.stringify(toneData);
      }
      
      if (hasValue) {
        fields.push({ key: `tone`, label: `Tone: ${toneLabel}` });
      }
    }

    // references (user-provided reference text)
    if (typeof references !== 'undefined' && references !== null && String(references).trim()) {
      fields.push({ key: `references`, label: `References: ${String(references).slice(0, 120)}` });
    }

    // insertReferences (flag or content)
    if (typeof insertReferences !== 'undefined' && insertReferences !== null && String(insertReferences).trim()) {
      fields.push({ key: `insert_references`, label: `Inserted References: ${String(insertReferences).slice(0,120)}` });
    }

    // length
    if (typeof length !== 'undefined' && length !== null && String(length).trim()) {
      fields.push({ key: `length`, label: `Length: ${String(length)}` });
    }

    return fields;
  }, [contextData]);

  const [evaluation, setEvaluation] = useState<EvaluationData>(() => {
    // ✅ Use initialEvaluation if provided, otherwise create empty
    if (initialEvaluation) {
      return initialEvaluation;
    }
    
    // Initialize evaluation with dynamic inputs
    const dynamicInputs: Record<string, { status: string; issues: { description: string; problematicText?: string }[] }> = {};
    inputFields.forEach(field => {
      dynamicInputs[field.key] = { status: "", issues: [] };
    });

    return {
      inputs: dynamicInputs,
      totalScore: 0,
      additionalIssues: [],
      whatILove: [],
    };
  });

  // Update evaluation when inputFields change
  React.useEffect(() => {
    const dynamicInputs: Record<string, { status: string; issues: { description: string; problematicText?: string }[] }> = {};
    inputFields.forEach(field => {
      // Preserve existing data if it exists
      dynamicInputs[field.key] = evaluation.inputs[field.key] || { status: "", issues: [] };
    });
    
    setEvaluation(prev => ({
      ...prev,
      inputs: dynamicInputs
    }));
    
    // Initialize expanded state for new fields
    setExpandedInputs(prev => {
      const newExpanded = { ...prev };
      inputFields.forEach(field => {
        if (!(field.key in newExpanded)) {
          newExpanded[field.key] = false;
        }
      });
      return newExpanded;
    });
  }, [inputFields]);

  // Helper to determine whether all inputs are marked as No Issues
  const allInputsSelectedAsNoIssues = React.useMemo(() => {
    if (inputFields.length === 0) return false;
    return inputFields.every((f) => evaluation.inputs[f.key]?.status === "No Issues");
  }, [inputFields, evaluation.inputs]);

  const toggleSelectAll = () => {
    // If not all selected, mark all as No Issues. Otherwise clear statuses.
    const updatedInputs = { ...evaluation.inputs };
    if (!allInputsSelectedAsNoIssues) {
      inputFields.forEach((f) => {
        updatedInputs[f.key] = { ...updatedInputs[f.key], status: "No Issues" };
      });
      // collapse any expanded input detail UIs
      const collapsed: Record<string, boolean> = {};
      inputFields.forEach((f) => (collapsed[f.key] = false));
      setExpandedInputs(collapsed);
    } else {
      inputFields.forEach((f) => {
        updatedInputs[f.key] = { ...updatedInputs[f.key], status: "" };
      });
    }
    setEvaluation((prev) => ({ ...prev, inputs: updatedInputs }));
    setValidationErrors([]);
  };



  const updateInputStatus = (field: string, value: string) => {
    setEvaluation((prev) => ({
      ...prev,
      inputs: {
        ...prev.inputs,
        [field]: { ...prev.inputs[field], status: value },
      },
    }));
    setValidationErrors([]);
  };

  const ensurePendingIssuesAdded = () => {
    let updated = { ...evaluation.inputs };
    Object.entries(inputIssueTexts).forEach(([field, text]) => {
      if (text.trim()) {
        if (!updated[field]) updated[field] = { status: "", issues: [] };
        const problematicText = inputProblematicTexts[field];
        updated[field].issues.push({ 
          description: text.trim(), 
          problematicText: problematicText?.trim() || undefined 
        });
      }
    });
    setInputIssueTexts({});
    setInputProblematicTexts({});
    return updated;
  };

  const addAdditionalIssue = () => {
    if (additionalIssueText.trim()) {
      setEvaluation(prev => ({
        ...prev,
        additionalIssues: [
          ...prev.additionalIssues,
          {
            description: additionalIssueText.trim(),
            problematicText: additionalIssueProblematicText.trim() || undefined,
          },
        ],
      }));
      setAdditionalIssueText("");
      setAdditionalIssueProblematicText("");
      setValidationErrors([]);
    }
  };

  const addInputIssue = (field: string) => {
    const issueText = inputIssueTexts[field];
    if (!issueText?.trim()) return;
    const updatedInputs = { ...evaluation.inputs };
    if (!updatedInputs[field]) updatedInputs[field] = { status: "", issues: [] };
    const problematicText = inputProblematicTexts[field];
    updatedInputs[field].issues.push({ 
      description: issueText.trim(), 
      problematicText: problematicText?.trim() || undefined 
    });
    setEvaluation({ ...evaluation, inputs: updatedInputs });
    setInputIssueTexts({ ...inputIssueTexts, [field]: "" });
    setInputProblematicTexts({ ...inputProblematicTexts, [field]: "" });
    setValidationErrors([]);
  };

  const getInputBoxColor = (status: string) => {
    if (!status || status === "") return "bg-white border-border-gold/30";
    if (status === "No Issues") return "bg-green-100 border-green-500";
    return "bg-red-100 border-red-500";
  };

  const handleGreenCheck = (fieldKey: string) => {
    updateInputStatus(fieldKey, "No Issues");
  };

  const handleRedX = (fieldKey: string) => {
    // Set status to "Has Issues" immediately and expand
    updateInputStatus(fieldKey, "Has Issues");
    setExpandedInputs((prev) => ({ ...prev, [fieldKey]: true }));
    
    // Maintain scroll position by scrolling to the field
    setTimeout(() => {
      const element = document.getElementById(`input-field-${fieldKey}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);
  };
  
  const handleResetStatus = (fieldKey: string) => {
    // Reset back to no status (white box with green/red options)
    updateInputStatus(fieldKey, "");
    setExpandedInputs((prev) => ({ ...prev, [fieldKey]: false }));
    // ✅ No scrollIntoView here - user expects view to stay in place when clicking reset
  };

  const calculateScore = () => {
    // All-or-nothing scoring: correct inputs + additional issues
    const totalCriteria = inputFields.length + evaluation.additionalIssues.length;
    if (totalCriteria === 0) return 0;

    let correctCount = 0;
    Object.values(evaluation.inputs).forEach((input) => {
      if (input.status === "No Issues") correctCount++;
    });

    const percentage = (correctCount / totalCriteria) * 100;
    return Math.round(percentage);
  };

  const generateScore = () => {
    const updatedInputs = ensurePendingIssuesAdded();
    const errors: string[] = [];
    // Validate inputs
    if (inputFields.length > 0) {
      for (const [key, input] of Object.entries(updatedInputs)) {
        if (!input.status || input.status === "") {
          errors.push(`Select a status for ${inputFields.find(f => f.key === key)?.label}`);
        } else if (input.status === "Has Issues" && input.issues.length === 0) {
          errors.push(`Add at least one issue for ${inputFields.find(f => f.key === key)?.label}`);
        }
      }
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    const score = calculateScore();
    const finalEval: EvaluationData = {
      ...evaluation,
      inputs: updatedInputs,
      totalScore: score,
    };
    setEvaluation(finalEval);
    // also update global context so save will include evaluation
    try {
      handleEvaluationComplete(finalEval as any);
    } catch (e) {
      // ignore
    }
    setScoreGenerated(true);
  };

  const generateNewPrompt = () => {
    // placeholder: parent will be called via onRequestImprove prop
  };

  return (
    <div className="max-w-3xl border border-gold/30 mx-auto p-4 flex flex-col gap-2 mb-3 bg-ivory rounded-xl">
      
           {/* Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-2">
        <h2 className="text-sm sm:text-base md:text-lg text-black font-semibold">
          <strong>XI. Improve Response:</strong>
        </h2>
        {/* hide-evaluation control removed — parent handles visibility */}
      </div>
      
      {/* OBJECTIVE removed — evaluation is now inputs-only */}

      {/* INPUTS */}
      <div className="bg-ivory border-b border-gold/30 pb-4 ">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-900 text-sm mb-1 uppercase">INPUTS</h3>
            <p className="text-gray-500 text-xs italic mb-3">
              Does the response address each input correctly?
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleSelectAll}
              className="px-2 py-1 text-xs rounded border border-gold/30 bg-white hover:bg-gold/10 transition-colors"
            >
              {allInputsSelectedAsNoIssues ? 'Unselect All' : 'Select All'}
            </button>
          </div>
        </div>

        {inputFields.length === 0 ? (
          <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 text-center">
            <p className="text-sm text-blue-800 font-medium mb-2">
              ℹ️ No Input Data Available
            </p>
            <p className="text-xs text-blue-700">
              The evaluation is inputs-only. Add fields to the form to enable scoring.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
          {inputFields.map((field) => {
            const fieldData = evaluation.inputs[field.key] || { status: "", issues: [] };
            const fieldStatus = fieldData.status;
            const isNoIssues = fieldStatus === "No Issues";
            const hasStatus = fieldStatus && fieldStatus !== "";
            
            return (
              <div
                key={field.key}
                id={`input-field-${field.key}`}
                className={`border-2 rounded transition-all ${getInputBoxColor(fieldStatus)}`}
              >
                <div
                  className="px-3 py-2 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2 flex-1">
                    <span className="text-xs font-medium text-gray-700">{field.label}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {/* Show Green Check and Red X only if no status selected yet */}
                    {!hasStatus && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleGreenCheck(field.key)}
                          className="w-6 h-6 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-colors"
                          title="No Issues"
                        >
                          ✓
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRedX(field.key)}
                          className="w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
                          title="Has Issues"
                        >
                          ✗
                        </button>
                      </>
                    )}
                    
                    {/* If status is "No Issues", show clickable green box to reset */}
                    {isNoIssues && (
                      <button
                        type="button"
                        onClick={() => handleResetStatus(field.key)}
                        className="w-6 h-6 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                        title="Click to change selection"
                      >
                        ✓
                      </button>
                    )}
                    
                    {/* Show expand/collapse triangle only if "Has Issues" */}
                    {hasStatus && !isNoIssues && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleResetStatus(field.key)}
                          className="w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                          title="Click to change selection"
                        >
                          ✗
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedInputs((prev) => ({ ...prev, [field.key]: !prev[field.key] }))
                          }
                          className="text-gray-700"
                        >
                          <Triangle
                            fill="currentColor"
                            stroke="none"
                            className={`w-3 h-3 text-black transform transition-transform duration-150 ${
                              expandedInputs[field.key] ? "rotate-180" : "rotate-90"
                            }`}
                          />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {expandedInputs[field.key] && !isNoIssues && (
                  <div className="px-3 pb-3 space-y-2">
                    {fieldData.status === "Has Issues" && (
                      <>
                        <input
                          type="text"
                          value={inputIssueTexts[field.key] || ""}
                          onChange={(e) =>
                            setInputIssueTexts({ ...inputIssueTexts, [field.key]: e.target.value })
                          }
                          placeholder="Describe the Issue"
                          className="w-full border border-bg-gold/30 rounded px-2 py-1 text-xs bg-white"
                        />
                        <textarea
                          value={inputProblematicTexts[field.key] || ""}
                          onChange={(e) =>
                            setInputProblematicTexts({ ...inputProblematicTexts, [field.key]: e.target.value })
                          }
                          placeholder="Paste Problematic Text (Optional)"
                          className="w-full border border-bg-gold/30 rounded px-2 py-1 text-xs bg-white min-h-[60px]"
                        />
                        <div className="flex justify-between items-center">
                          <button
                            type="button"
                            className="text-xs text-gray-700 hover:text-gold"
                            onClick={() => addInputIssue(field.key)}
                          >
                            + Add Issue
                          </button>
                          <button
                            type="button"
                            className="text-xs text-gray-700 hover:text-gold"
                            onClick={() => handleResetStatus(field.key)}
                          >
                            Revert
                          </button>
                        </div>

                        {fieldData.issues.length > 0 && (
                          <div className="mt-2 space-y-2">
                            {fieldData.issues.map((issue, idx) => (
                              <div
                                key={idx}
                                className="text-xs text-gray-600 bg-white p-2 rounded border border-bg-gold/30"
                              >
                                <div className="font-medium">• {issue.description}</div>
                                {issue.problematicText && (
                                  <div className="mt-1 pl-3 text-gray-500 italic">
                                    Example: "{issue.problematicText}"
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      </div>

      {/* What I Love Section */}
      <div className="bg-ivory border-b border-gold/30 pb-4 mt-3">
        <h3 className="font-bold text-gray-900 text-sm mb-1 uppercase">WHAT I LOVE</h3>
      
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={whatILoveText}
              onChange={(e) => setWhatILoveText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && whatILoveText.trim()) {
                  setEvaluation(prev => ({
                    ...prev,
                    whatILove: [...prev.whatILove, whatILoveText.trim()]
                  }));
                  setWhatILoveText("");
                }
              }}
              className="flex-1 p-2 border border-gold/30 rounded bg-white text-xs"
              placeholder='Enter text you loved, e.g., "what a silly way to start the day."'
            />
            <button
              type="button"
              className="px-3 py-2 bg-gold text-white rounded text-xs font-medium hover:bg-gold/90 transition-colors whitespace-nowrap"
              onClick={() => {
                if (whatILoveText.trim()) {
                  setEvaluation(prev => ({
                    ...prev,
                    whatILove: [...prev.whatILove, whatILoveText.trim()]
                  }));
                  setWhatILoveText("");
                }
              }}
            >
              + Add
            </button>
          </div>
          {evaluation.whatILove.length > 0 && (
            <div className="mt-2 space-y-2">
              {evaluation.whatILove.map((text, idx) => (
                <div
                  key={idx}
                  className="text-xs text-gray-600 bg-green-50 p-2 rounded border border-green-300 flex justify-between items-start"
                >
                  <div className="flex-1">"{text}"</div>
                  <button
                    type="button"
                    onClick={() => {
                      setEvaluation(prev => ({
                        ...prev,
                        whatILove: prev.whatILove.filter((_, i) => i !== idx)
                      }));
                    }}
                    className="text-red-500 hover:text-red-700 ml-2 flex-shrink-0"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Additional Issues Section */}
      <div className="mt-3 mb-2">
        <label className="block text-sm font-medium mb-1 text-gray-700">Additional Issues or Required Changes</label>
        <p className="text-gray-500 text-xs italic mb-2">
          Each issue added will count as a criterion in scoring
        </p>
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={additionalIssueText}
              onChange={(e) => setAdditionalIssueText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && additionalIssueText.trim()) {
                  e.preventDefault();
                  addAdditionalIssue();
                }
              }}
              placeholder="Describe the issue"
              className="flex-1 border border-gold/30 rounded px-2 py-1 text-xs bg-white"
            />
            <button
              type="button"
              onClick={addAdditionalIssue}
              disabled={!additionalIssueText.trim()}
              className={`px-3 py-2 rounded text-xs font-medium whitespace-nowrap ${additionalIssueText.trim() ? 'bg-gold text-white' : 'bg-white text-gold border border-gold/30 cursor-not-allowed'}`}
            >
              + Add
            </button>
          </div>
          <textarea
            value={additionalIssueProblematicText}
            onChange={(e) => setAdditionalIssueProblematicText(e.target.value)}
            placeholder="Paste Problematic Text (Optional)"
            className="w-full border border-gold/30 rounded px-2 py-1 text-xs bg-white min-h-[60px]"
          />
          {evaluation.additionalIssues.length > 0 && (
            <div className="mt-2 space-y-2">
              {evaluation.additionalIssues.map((issue, idx) => (
                <div
                  key={idx}
                  className="text-xs text-gray-600 bg-white p-2 rounded border border-bg-gold/30"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-medium">• {issue.description}</div>
                      {issue.problematicText && (
                        <div className="mt-1 pl-3 text-gray-500 italic">
                          Example: "{issue.problematicText}"
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setEvaluation(prev => ({
                          ...prev,
                          additionalIssues: prev.additionalIssues.filter((_, i) => i !== idx)
                        }));
                      }}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SCORE */}
      <div className="flex flex-col gap-2">
        {/* Inline validation errors */}
        {validationErrors.length > 0 && (
          <div className="mb-3 text-sm text-red-600">
            {validationErrors.map((err, idx) => (
              <div key={idx}>• {err}</div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            setValidationErrors([]);
            generateScore();
          }}
          disabled={inputFields.length === 0}
          className={`w-full py-2 rounded font-semibold text-xs ${inputFields.length === 0 ? 'bg-white text-gold border border-gold/30 cursor-not-allowed' : 'bg-gold text-white'}`}
        >
          GENERATE SCORE
        </button>

        {scoreGenerated && (
          <div
            className={`w-full py-2 rounded font-semibold text-xs text-center ${
              evaluation.totalScore >= 90
                ? "bg-green-500 text-white"
                : evaluation.totalScore >= 70
                ? "bg-yellow-500 text-black"
                : "bg-red-500 text-white"
            }`}
          >
            {evaluation.totalScore} / 100
          </div>
        )}

        {scoreGenerated && (
          <div className="space-y-2">
            {/* Score-based feedback message */}
            <div className="mb-3 p-3 rounded-md text-center font-medium text-sm">
              {evaluation.totalScore === 100 ? (
                <div className="bg-green-100 text-green-800 py-2">"Pure alchemy!"</div>
              ) : evaluation.totalScore >= 90 ? (
                <div className="bg-green-100 text-green-800 py-2">"Almost golden - refine it slightly."</div>
              ) : evaluation.totalScore >= 70 ? (
                <div className="bg-yellow-100 text-yellow-800 py-2">"Noticeably AI - adjust to make it you."</div>
              ) : (
                <div className="bg-red-100 text-red-800 py-2">"Off-track, but fully fixable - let's get this aligned!"</div>
              )}
            </div>

            {/* Reiterate Prompt - calls parent to create an improved prompt based on evaluation */}
            <button
              type="button"
              onClick={async () => {
                if (!onRequestImprove) return;
                const errors: string[] = [];

                if (!scoreGenerated) {
                  errors.push('Generate a score before reiterating.');
                }

                if (errors.length > 0) {
                  setValidationErrors(errors);
                  return;
                }

                setValidationErrors([]);
                setImproving(true);
                try {
                  // Build reiteration prompt with new format
                  // send enriched payload including original prompt and response
                  await onRequestImprove({
                    ...evaluation,
                    promptStructure,
                    originalPrompt: generatedPrompt,
                    aiResponse,
                    taskObjective,
                  });
                } catch (e) {
                  console.error('reiterate error', e);
                } finally {
                  setImproving(false);
                }
              }}
              className={`w-full py-2 rounded font-semibold text-xs flex items-center justify-center gap-2 ${
                improving ? 'bg-white text-gold border border-gold/30' : 'bg-gold text-white'
              }`}
            >
              {improving ? 'Reiterating...' : 'Reiterate Prompt'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvaluateResponseStep;