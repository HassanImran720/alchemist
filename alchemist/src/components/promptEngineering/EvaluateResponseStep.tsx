"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface EvaluateResponseStepProps {
  aiResponse: string;
  onEvaluationComplete: (evaluation: EvaluationData) => void;
}

interface EvaluationData {
  objective: boolean;
  inputs: Record<string, string>;
  completeness: number;
  tone: number;
  presentation: number;
  verbosity: number;
  other: number;
  totalScore: number;
  issues: Record<string, string[]>;
}

const EvaluateResponseStep: React.FC<EvaluateResponseStepProps> = ({
  aiResponse,
  onEvaluationComplete,
}) => {
  const [showObjective, setShowObjective] = useState(true);
  const [rewriteObjective, setRewriteObjective] = useState("");
  const [evaluation, setEvaluation] = useState<EvaluationData>({
    objective: true,
    inputs: {
      audience: "No Issues",
      contentGoal: "No Issues",
      coreMessage: "No Issues",
      audienceMotivation: "No Issues",
    },
    completeness: 3,
    tone: 3,
    presentation: 3,
    verbosity: 3,
    other: 3,
    totalScore: 0,
    issues: {},
  });
  const [submitted, setSubmitted] = useState(false);

  const inputFields = [
    { key: "audience", label: "Audience: Corporate 22-30 Year Olds" },
    { key: "contentGoal", label: "Content Goal: Spread Awareness" },
    { key: "coreMessage", label: "Core Message: Come to our coffee shop." },
    { key: "audienceMotivation", label: "Audience Motivation: To have enough energy for work." },
  ];

  const updateObjective = (value: boolean) => {
    const updated = { ...evaluation, objective: value };
    setEvaluation(updated);
  };

  const updateInputStatus = (field: string, value: string) => {
    const updated = {
      ...evaluation,
      inputs: { ...evaluation.inputs, [field]: value },
    };
    setEvaluation(updated);
  };

  const updateRating = (field: keyof EvaluationData, value: number) => {
    const updated = { ...evaluation, [field]: value };
    setEvaluation(updated);
  };

  const addIssue = (field: string, text: string) => {
    if (!text.trim()) return;
    const updatedIssues = { ...evaluation.issues };
    if (!updatedIssues[field]) updatedIssues[field] = [];
    updatedIssues[field].push(text);
    setEvaluation({ ...evaluation, issues: updatedIssues });
  };

  const calculateScore = () => {
    let total = 0;

    // Objective
    total += evaluation.objective ? 30 : 0;

    // Inputs (No Issues=5, Minor=3, Major=1 → avg ×4 =20)
    const scores = Object.values(evaluation.inputs).map((v) =>
      v === "No Issues" ? 5 : v === "Minor Issues" ? 3 : 1
    );
    const inputScore = (scores.reduce((a, b) => a + b, 0) / scores.length) * 4;
    total += inputScore;

    // Each rating ×2
    total += evaluation.completeness * 2;
    total += evaluation.tone * 2;
    total += evaluation.presentation * 2;
    total += evaluation.verbosity * 2;
    total += evaluation.other * 2;

    return Math.round(total);
  };

  const submitEvaluation = () => {
    const score = calculateScore();
    const final = { ...evaluation, totalScore: score };
    setEvaluation(final);
    setSubmitted(true);
    onEvaluationComplete(final);
  };

  const ScoreIndicator = () => {
    const score = evaluation.totalScore;
    let color = "bg-red-500";
    if (score >= 90) color = "bg-green-500";
    else if (score >= 70) color = "bg-yellow-400";
    return (
      <div className={`text-white px-4 py-2 rounded-lg text-center ${color}`}>
        Final Score: {score}/100
      </div>
    );
  };

  // Circle Rating Component
  const CircleRating = ({
    rating,
    onRatingChange,
    label,
  }: {
    rating: number;
    onRatingChange: (rating: number) => void;
    label: string;
  }) => {
    const [showIssue, setShowIssue] = useState(false);
    const [issueText, setIssueText] = useState("");

    return (
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide bg-gold/30 px-4 py-2 rounded-t-lg">
          {label}
        </h3>
        <div className="px-4 pb-4 rounded-b-lg border border-gold/30">
          <p className="text-sm text-gray-700 mb-4">Rate on a scale of 1–5.</p>
          <div className="flex gap-3 mb-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => onRatingChange(num)}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold
                ${num <= rating ? "bg-gold border-gold text-white" : "bg-white border-gold/30 text-gray-600"}`}
              >
                {num}
              </button>
            ))}
          </div>
          <button
            className="text-sm text-gold font-medium mb-2"
            onClick={() => setShowIssue((prev) => !prev)}
          >
            + Add Issue
          </button>
          {showIssue && (
            <div>
              <textarea
                value={issueText}
                onChange={(e) => setIssueText(e.target.value)}
                placeholder="Describe the issue..."
                className="w-full border border-gold/30 bg-ivory rounded-md p-2 text-sm"
              />
              <button
                onClick={() => {
                  addIssue(label, issueText);
                  setIssueText("");
                }}
                className="mt-2 px-3 py-1 bg-gold text-white text-sm rounded"
              >
                Save Issue
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full lg:max-w-lg mx-auto bg-ivory rounded-lg p-6 space-y-6 border border-gold/30">
         <div className="flex items-center mb-4">
      <h2 className=" text-xl text-black mb-4"><strong >XI.  Evaluate Response

</strong>
 </h2>
    </div>

      {/* Objective */}
      {showObjective && (
        <div>
          <h3 className="text-sm font-semibold bg-gold/30 px-4 py-2 rounded-t-lg">OBJECTIVE</h3>
          <div className="px-4 pb-4 border border-gold/30">
            <p className="text-sm text-gray-700 mb-2">Does the response meet the original objective?</p>
            <div className="flex gap-3 mb-2">
              <button onClick={() => updateObjective(true)} className={`px-4 py-2 rounded ${evaluation.objective ? "bg-gold text-white" : "bg-gray-200"}`}>YES</button>
              <button onClick={() => updateObjective(false)} className={`px-4 py-2 rounded ${!evaluation.objective ? "bg-gold text-white" : "bg-gray-200"}`}>NO</button>
            </div>
            {!evaluation.objective && (
              <textarea
                value={rewriteObjective}
                onChange={(e) => setRewriteObjective(e.target.value)}
                placeholder="Rewrite the objective..."
                className="w-full border border-gold/30 bg-ivory rounded-md p-2 text-sm"
              />
            )}
          </div>
        </div>
      )}
      <button
        className="text-sm text-gold font-medium"
        onClick={() => setShowObjective(!showObjective)}
      >
        {showObjective ? "Hide Objective" : "Show Objective"}
      </button>

      {/* Inputs */}
      <div>
        <h3 className="text-sm font-semibold bg-gold/30 px-4 py-2 rounded-t-lg">INPUTS</h3>
        <div className="px-4 pb-4 border border-gold/30 space-y-3">
          {inputFields.map((field) => (
            <div key={field.key}>
              <p className="text-sm font-medium">{field.label}</p>
              <select
                value={evaluation.inputs[field.key]}
                onChange={(e) => updateInputStatus(field.key, e.target.value)}
                className="w-full mt-1 border border-gold/30 rounded px-2 py-1 text-sm"
              >
                <option>No Issues</option>
                <option>Minor Issues</option>
                <option>Major Issues</option>
              </select>
              {(evaluation.inputs[field.key] === "Minor Issues" ||
                evaluation.inputs[field.key] === "Major Issues") && (
                <textarea
                  placeholder="Describe the issue..."
                  className="mt-2 w-full border border-gold/30 bg-ivory rounded-md p-2 text-sm"
                  onBlur={(e) => addIssue(field.label, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Rating Sections */}
      <CircleRating rating={evaluation.completeness} onRatingChange={(r) => updateRating("completeness", r)} label="COMPLETENESS" />
      <CircleRating rating={evaluation.tone} onRatingChange={(r) => updateRating("tone", r)} label="TONE" />
      <CircleRating rating={evaluation.presentation} onRatingChange={(r) => updateRating("presentation", r)} label="PRESENTATION" />
      <CircleRating rating={evaluation.verbosity} onRatingChange={(r) => updateRating("verbosity", r)} label="VERBOSITY" />
      <CircleRating rating={evaluation.other} onRatingChange={(r) => updateRating("other", r)} label="OTHER" />

      {/* Final Score */}
      {submitted && <ScoreIndicator />}

      <button
        onClick={submitEvaluation}
        className="w-full bg-gold text-white px-6 py-3 rounded-lg font-semibold"
      >
        {submitted ? "Iterate Prompt" : "Submit Evaluation"}
      </button>
    </div>
  );
};

export default EvaluateResponseStep;
