

"use client";
import React, { useState } from "react";
import { usePromptEng } from "../../context/PromptEngContext";
import { Triangle } from "lucide-react";
interface EvaluateResponseStepProps {
  // Parent provides a function that takes the evaluation object and returns an improved prompt
  onRequestImprove?: (evaluation: any) => Promise<string | undefined>;
}

interface EvaluationData {
  objective?: boolean;
  rewrittenObjective?: string;
  inputs: Record<string, { status: string; issues: string[] }>;
  completeness: number;
  tone: number;
  presentation: number;
  verbosity: number;
  other: number;
  totalScore: number;
  categoryIssues: Record<string, string[]>;
}

const EvaluateResponseStep: React.FC<EvaluateResponseStepProps> = ({ onRequestImprove }) => {
  const [showObjective, setShowObjective] = useState(true);
  const [rewriteObjective, setRewriteObjective] = useState("");
  const [scoreGenerated, setScoreGenerated] = useState(false);
  const [evaluationStarted, setEvaluationStarted] = useState(false);
  const [expandedInputs, setExpandedInputs] = useState<Record<string, boolean>>({
    audience: false,
    contentGoal: false,
    coreMessage: false,
    audienceMotivation: false,
  });
  const [improving, setImproving] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const [evaluation, setEvaluation] = useState<EvaluationData>({
    objective: undefined,
    // INPUT STATUS intentionally empty so user must choose
    inputs: {
      audience: { status: "", issues: [] },
      contentGoal: { status: "", issues: [] },
      coreMessage: { status: "", issues: [] },
      audienceMotivation: { status: "", issues: [] },
    },
    completeness: 0,
    tone: 0,
    presentation: 0,
    verbosity: 0,
    other: 0,
    totalScore: 0,
    categoryIssues: {
      completeness: [],
      tone: [],
      presentation: [],
      verbosity: [],
      other: [],
    },
  });

  const [inputIssueTexts, setInputIssueTexts] = useState<Record<string, string>>({});
  const [categoryIssueTexts, setCategoryIssueTexts] = useState<Record<string, string>>({});

  const inputFields = [
    { key: "audience", label: "Audience: Corporate 22-30 Year Olds" },
    { key: "contentGoal", label: "Content Goal: Spread Awareness" },
    { key: "coreMessage", label: "Core Message: Come to our coffee shop." },
    { key: "audienceMotivation", label: "Audience Motivation: To have enough energy for work." },
  ];

  const updateObjective = (value: boolean) => {
    setEvaluation((prev) => ({ ...prev, objective: value }));
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
        updated[field].issues.push(text.trim());
      }
    });
    setInputIssueTexts({});
    return updated;
  };

  const addInputIssue = (field: string) => {
    const issueText = inputIssueTexts[field];
    if (!issueText?.trim()) return;
    const updatedInputs = { ...evaluation.inputs };
    updatedInputs[field].issues.push(issueText);
    setEvaluation({ ...evaluation, inputs: updatedInputs });
    setInputIssueTexts({ ...inputIssueTexts, [field]: "" });
    setValidationErrors([]);
  };

  const updateCategoryRating = (category: string, value: number) => {
    setEvaluation((prev) => ({ ...prev, [category]: value }));
    setValidationErrors([]);
  };

  const addCategoryIssue = (category: string) => {
    const text = categoryIssueTexts[category];
    if (!text?.trim()) return;
    setEvaluation((prev) => ({
      ...prev,
      categoryIssues: {
        ...prev.categoryIssues,
        [category]: [...(prev.categoryIssues[category] || []), text],
      },
    }));
    setCategoryIssueTexts({ ...categoryIssueTexts, [category]: "" });
    setValidationErrors([]);
  };

  const updateCategoryIssueText = (category: string, value: string) => {
    setCategoryIssueTexts((prev) => ({ ...prev, [category]: value }));
  };

  const getInputBoxColor = (status: string) => {
    if (!status || status === "") return "bg-white border-bg-gold/30";
    if (status === "No Issues") return "bg-green-100 border-green-500";
    if (status === "Minor Issues") return "bg-yellow-100 border-yellow-500";
    return "bg-red-100 border-red-500";
  };

  const calculateScore = () => {
    let total = 0;
    total += evaluation.objective ? 30 : 0;

    const inputScores = Object.values(evaluation.inputs).map((input) => {
      if (input.status === "No Issues") return 5;
      if (input.status === "Minor Issues") return 3;
      return 1;
    });
    const inputAverage = inputScores.reduce((a, b) => a + b, 0) / inputScores.length;
    total += inputAverage * 4;

    total += evaluation.completeness * 2;
    total += evaluation.tone * 2;
    total += evaluation.presentation * 2;
    total += evaluation.verbosity * 2;
    total += evaluation.other * 2;

    return Math.round(total);
  };

  const generateScore = () => {
    const updatedInputs = ensurePendingIssuesAdded();
    const errors: string[] = [];

    for (const [key, input] of Object.entries(updatedInputs)) {
      if (!input.status || input.status === "") {
        errors.push(`Select a status for ${inputFields.find(f => f.key === key)?.label}`);
      } else if ((input.status === "Minor Issues" || input.status === "Major Issues") && input.issues.length === 0) {
        errors.push(`Add at least one issue for ${inputFields.find(f => f.key === key)?.label}`);
      }
    }

    if (evaluation.objective === undefined) {
      errors.push("Select YES or NO for Objective.");
    } else if (evaluation.objective === false && !rewriteObjective.trim()) {
      errors.push("Rewrite Objective is required when Objective is NO.");
    }

    const requiredCats = ["completeness", "tone", "presentation", "verbosity", "other"];
    for (const c of requiredCats) {
      if (!(evaluation as any)[c] || (evaluation as any)[c] <= 0) {
        errors.push(`Rate ${c} (1-5).`);
      }
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    const score = calculateScore();
    const finalEval = {
      ...evaluation,
      inputs: updatedInputs,
      totalScore: score,
      rewrittenObjective: !evaluation.objective ? rewriteObjective : undefined,
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

  // use context for prompt/response and promptStructure selection
  const { promptStructure, setPromptStructure, generatedPrompt, aiResponse, taskObjective, handleEvaluationComplete } = usePromptEng();

  return (
    <div className="max-w-3xl border border-gold/30 mx-auto p-4 flex flex-col gap-2 mb-3 bg-ivory rounded-xl">
      
           {/* Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-2">
        <h2 className="text-sm sm:text-base md:text-lg text-black font-semibold">
          <strong>XI. Evaluate Response:</strong>
        </h2>
      </div>
      
      {/* OBJECTIVE */}
      <div className="bg-ivory border-b border-gold/30 pb-4">
        <button
          type="button"
          onClick={() => setShowObjective(!showObjective)}
          className="text-xs text-gold underline mb-2"
        >
          {showObjective ? "Hide Objective" : "Show Objective"}
        </button>

        {showObjective && (
          <>
            <h3 className="font-bold text-gray-900 text-sm mb-1 uppercase">OBJECTIVE</h3>
            <p className="text-gray-500 text-xs italic mb-3">
              Does the response meet the original objective?
            </p>

            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={() => updateObjective(true)}
                className={`px-4 py-1 rounded text-xs font-semibold border-2 ${
                  evaluation.objective === true
                    ? "bg-green-100 border-green-500"
                    : "bg-white border-bg-gold/30"
                }`}
              >
                YES
              </button>
              <button
                type="button"
                onClick={() => updateObjective(false)}
                className={`px-4 py-1 rounded text-xs font-semibold border-2 ${
                  evaluation.objective === false
                    ? "bg-red-100 border-red-500"
                    : "bg-white border-bg-gold/30"
                }`}
              >
                NO
              </button>
            </div>

            {!evaluation.objective && (
              <div className="mb-2">
                <label className="text-xs text-gray-600 mb-1 block">Rewrite Objective:</label>
                <input
                  type="text"
                  value={rewriteObjective}
                  onChange={(e) => setRewriteObjective(e.target.value)}
                  className="w-full border border-bg-gold/30 rounded px-2 py-1 text-xs bg-white"
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* INPUTS */}
      <div className="bg-ivory border-b border-gold/30 pb-4 ">
        <h3 className="font-bold text-gray-900 text-sm mb-1 uppercase">INPUTS</h3>
        <p className="text-gray-500 text-xs italic mb-3">
          Does the response address each input correctly?
        </p>

        <div className="space-y-2">
          {inputFields.map((field) => (
            <div
              key={field.key}
              className={`border-2 rounded transition-all ${getInputBoxColor(
                evaluation.inputs[field.key].status
              )}`}
            >
              <div
                className="px-3 py-2 flex items-center justify-between cursor-pointer"
                onClick={() =>
                  setExpandedInputs((prev) => ({ ...prev, [field.key]: !prev[field.key] }))
                }
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-gray-700">{field.label}</span>
                </div>
                <div className="text-gray-700">
                  <Triangle
                    fill="currentColor"
                    stroke="none"
                    className={`w-3 h-3 text-black transform transition-transform duration-150 ${
                      expandedInputs[field.key] ? "rotate-180" : "rotate-90"
                    }`}
                  />
                </div>
              </div>

              {expandedInputs[field.key] && (
                <div className="px-3 pb-3 space-y-1">
                  <select
                    value={evaluation.inputs[field.key].status}
                    onChange={(e) => updateInputStatus(field.key, e.target.value)}
                    className="w-full border border-bg-gold/30 rounded px-2 py-1 text-xs bg-white"
                  >
                    <option value="">Select option</option>
                    <option value="No Issues">No Issues</option>
                    <option value="Minor Issues">Minor Issues</option>
                    <option value="Major Issues">Major Issues</option>
                  </select>

                  {(evaluation.inputs[field.key].status === "Minor Issues" ||
                    evaluation.inputs[field.key].status === "Major Issues") && (
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
                      <button
                        type="button"
                        className="text-xs text-gray-700 hover:text-gold"
                        onClick={() => addInputIssue(field.key)}
                      >
                        + Add Issue
                      </button>

                      {evaluation.inputs[field.key].issues.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {evaluation.inputs[field.key].issues.map((issue, idx) => (
                            <div
                              key={idx}
                              className="text-xs text-gray-600 bg-white p-2 rounded border border-bg-gold/30"
                            >
                              • {issue}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* COMPLETENESS */}
      <div className=" bg-ivory border-b border-gold/30 pb-4 ">
        <h3 className="font-bold text-gray-900 text-sm mb-1 uppercase">COMPLETENESS</h3>
        <p className="text-gray-500 text-xs italic mb-3">
          Does the response cover all expected/implied areas?
        </p>

        <div className="flex  mb-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => updateCategoryRating("completeness", num)}
              className={`w-8 h-8 rounded border text-xs flex items-center justify-center font-semibold transition-all
              ${
                num <= evaluation.completeness
                  ? "bg-gold border-bg-gold text-white"
                  : "bg-white border-bg-gold/30 text-gray-700 hover:bg-gold/20"
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={categoryIssueTexts.completeness || ""}
          onChange={(e) => updateCategoryIssueText("completeness", e.target.value)}
          placeholder="Describe the Issue"
          className="w-full border border-bg-gold/30 rounded px-2 py-1 text-xs mb-2 bg-white"
        />
        <button
          type="button"
          className="text-xs text-gray-700 hover:text-gold"
          onClick={() => addCategoryIssue("completeness")}
        >
          + Add Issue
        </button>

        {evaluation.categoryIssues.completeness?.length > 0 && (
          <div className="mt-2 space-y-1">
            {evaluation.categoryIssues.completeness.map((issue, idx) => (
              <div key={idx} className="text-xs text-gray-600 bg-white p-2 rounded border border-bg-gold/30">
                • {issue}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TONE */}
      <div className=" bg-ivory border-b border-gold/30 pb-4">
        <h3 className="font-bold text-gray-900 text-sm mb-1 uppercase">TONE</h3>
        <p className="text-gray-500 text-xs italic mb-3">
          Is the tone appropriate for the audience and purpose?
        </p>

        <div className="flex gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => updateCategoryRating("tone", num)}
              className={`w-8 h-8 rounded border text-xs flex items-center justify-center font-semibold transition-all
              ${
                num <= evaluation.tone
                  ? "bg-gold border-bg-gold text-white"
                  : "bg-white border-bg-gold/30 text-gray-700 hover:bg-gold/20"
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={categoryIssueTexts.tone || ""}
          onChange={(e) => updateCategoryIssueText("tone", e.target.value)}
          placeholder="Describe the Issue"
          className="w-full border border-bg-gold/30 rounded px-2 py-1 text-xs mb-2 bg-white"
        />
        <button
          type="button"
          className="text-xs text-gray-700 hover:text-gold"
          onClick={() => addCategoryIssue("tone")}
        >
          + Add Issue
        </button>

        {evaluation.categoryIssues.tone?.length > 0 && (
          <div className="mt-2 space-y-1">
            {evaluation.categoryIssues.tone.map((issue, idx) => (
              <div key={idx} className="text-xs text-gray-600 bg-white p-2 rounded border border-bg-gold/30">
                • {issue}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PRESENTATION */}
      <div className=" bg-ivory border-b border-gold/30 pb-4 ">
        <h3 className="font-bold text-gray-900 text-sm mb-1 uppercase">PRESENTATION</h3>
        <p className="text-gray-500 text-xs italic mb-3">
          Is the response clear, structured, and easy to follow?
        </p>

        <div className="flex gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => updateCategoryRating("presentation", num)}
              className={`w-8 h-8 rounded border text-xs flex items-center justify-center font-semibold transition-all
              ${
                num <= evaluation.presentation
                  ? "bg-gold border-bg-gold text-white"
                  : "bg-white border-bg-gold/30 text-gray-700 hover:bg-gold/20"
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={categoryIssueTexts.presentation || ""}
          onChange={(e) => updateCategoryIssueText("presentation", e.target.value)}
          placeholder="Describe the Issue"
          className="w-full border border-bg-gold/30 rounded px-2 py-1 text-xs mb-2 bg-white"
        />
        <button
          type="button"
          className="text-xs text-gray-700 hover:text-gold"
          onClick={() => addCategoryIssue("presentation")}
        >
          + Add Issue
        </button>

        {evaluation.categoryIssues.presentation?.length > 0 && (
          <div className="mt-2 space-y-1">
            {evaluation.categoryIssues.presentation.map((issue, idx) => (
              <div key={idx} className="text-xs text-gray-600 bg-white p-2 rounded border border-bg-gold/30">
                • {issue}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* VERBOSITY */}
      <div className=" bg-ivory border-b border-gold/30 pb-4 ">
        <h3 className="font-bold text-gray-900 text-sm mb-1 uppercase">VERBOSITY</h3>
        <p className="text-gray-500 text-xs italic mb-3">
          Is the length appropriate without unnecessary repetition?
        </p>

        <div className="flex gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => updateCategoryRating("verbosity", num)}
              className={`w-8 h-8 rounded border text-xs flex items-center justify-center font-semibold transition-all
              ${
                num <= evaluation.verbosity
                  ? "bg-gold border-bg-gold text-white"
                  : "bg-white border-bg-gold/30 text-gray-700 hover:bg-gold/20"
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={categoryIssueTexts.verbosity || ""}
          onChange={(e) => updateCategoryIssueText("verbosity", e.target.value)}
          placeholder="Describe the Issue"
          className="w-full border border-bg-gold/30 rounded px-2 py-1 text-xs mb-2 bg-white"
        />
        <button
          type="button"
          className="text-xs text-gray-700 hover:text-gold"
          onClick={() => addCategoryIssue("verbosity")}
        >
          + Add Issue
        </button>

        {evaluation.categoryIssues.verbosity?.length > 0 && (
          <div className="mt-2 space-y-1">
            {evaluation.categoryIssues.verbosity.map((issue, idx) => (
              <div key={idx} className="text-xs text-gray-600 bg-white p-2 rounded border border-bg-gold/30">
                • {issue}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* OTHER */}
      <div className=" bg-ivory border-b border-gold/30 pb-4">
        <h3 className="font-bold text-gray-900 text-sm mb-1 uppercase">OTHER</h3>
        <p className="text-gray-500 text-xs italic mb-3">
          Are there any other considerations affecting quality?
        </p>

        <div className="flex gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => updateCategoryRating("other", num)}
              className={`w-8 h-8 rounded border text-xs flex items-center justify-center font-semibold transition-all
              ${
                num <= evaluation.other
                  ? "bg-gold border-bg-gold text-white"
                  : "bg-white border-bg-gold/30 text-gray-700 hover:bg-gold/20"
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={categoryIssueTexts.other || ""}
          onChange={(e) => updateCategoryIssueText("other", e.target.value)}
          placeholder="Describe the Issue"
          className="w-full border border-bg-gold/30 rounded px-2 py-1 text-xs mb-2 bg-white"
        />
        <button
          type="button"
          className="text-xs text-gray-700 hover:text-gold"
          onClick={() => addCategoryIssue("other")}
        >
          + Add Issue
        </button>

        {evaluation.categoryIssues.other?.length > 0 && (
          <div className="mt-2 space-y-1">
            {evaluation.categoryIssues.other.map((issue, idx) => (
              <div key={idx} className="text-xs text-gray-600 bg-white p-2 rounded border border-bg-gold/30">
                • {issue}
              </div>
            ))}
          </div>
        )}
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
          className="w-full bg-gold text-white py-2 rounded font-semibold text-xs"
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
            {/* <button
              type="button"
              onClick={generateNewPrompt}
              className="w-full bg-gold text-white py-2 rounded font-semibold text-xs"
            >
              GENERATE NEW PROMPT
            </button> */}

            {/* Prompt Structure selector (required before reiteration) */}
            <div className="mb-3">
              <label className="block text-sm font-medium mb-2 text-gray-700">Select Structure</label>
              <select
                className="w-full px-3 py-2 border border-gold/30 rounded-md bg-ivory text-sm mb-2 focus:outline-gold"
                value={promptStructure || ""}
                onChange={(e) => setPromptStructure(e.target.value)}
              >
                <option value="">Select structure</option>
                <option value="aichemist-formula">AICHEMIST Formula</option>
                <option value="json">JSON</option>
                <option value="yaml">YAML</option>
                <option value="plain-text">Plain Text</option>
                <option value="javascript-jsx">JavaScript/JSX</option>
                <option value="toml">TOML</option>
                <option value="markdown">Markdown</option>
              </select>
            </div>

            {/* Reiterate Prompt - calls parent to create an improved prompt based on evaluation */}
            <button
              type="button"
              onClick={async () => {
                if (!onRequestImprove) return;
                const errors: string[] = [];
                const requiredCats = ["completeness", "tone", "presentation", "verbosity", "other"];
                for (const c of requiredCats) {
                  if (!(evaluation as any)[c] || (evaluation as any)[c] <= 0) {
                    errors.push(`Rate ${c} (1-5).`);
                  }
                }
                if (!promptStructure || promptStructure.trim() === "") {
                  errors.push('Select a prompt structure.');
                }
                if (evaluation.objective === undefined) {
                  errors.push('Select YES or NO for Objective.');
                } else if (evaluation.objective === false && !rewriteObjective.trim()) {
                  errors.push('Rewrite Objective is required when Objective is NO.');
                }

                if (errors.length > 0) {
                  setValidationErrors(errors);
                  return;
                }

                setValidationErrors([]);
                setImproving(true);
                try {
                  // send enriched payload including original prompt and response
                  await onRequestImprove({
                    ...evaluation,
                    rewrittenObjective: evaluation.objective === false ? rewriteObjective : undefined,
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