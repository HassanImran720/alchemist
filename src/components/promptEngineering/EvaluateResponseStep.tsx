"use client";
import React, { useState } from "react";
import { Plus, X } from "lucide-react";

interface EvaluateResponseStepProps {
  aiResponse: string;
  onEvaluationComplete: (evaluation: EvaluationData) => void;
}

interface EvaluationData {
  instructionFollowing: number;
  truthfulness: number;
  completeness: number;
  tone: number;
  presentation: number;
  verbosity: number;
  other: number;
  issues: string[];
  charms: number;
}

const EvaluateResponseStep: React.FC<EvaluateResponseStepProps> = ({
  aiResponse,
  onEvaluationComplete,
}) => {
  const [evaluation, setEvaluation] = useState<EvaluationData>({
    instructionFollowing: 4,
    truthfulness: 4,
    completeness: 3,
    tone: 4,
    presentation: 4,
    verbosity: 4,
    other: 4,
    issues: [
      "The response is missing a user persona.",
      "The response could use more sales terminology.",
      "The response is slightly verbose.",
    ],
    charms: 95,
  });

  const [newIssue, setNewIssue] = useState("");

  const getRatingLabel = (rating: number) => {
    if (rating === 5) return "Perfect";
    if (rating === 4) return "Good";
    if (rating === 3) return "Mediocre";
    if (rating === 2) return "Poor";
    return "Bad";
  };

  const getRatingColor = (rating: number) => {
    if (rating === 5) return "bg-green-500";
    if (rating === 4) return "bg-green-400";
    if (rating === 3) return "bg-yellow-500";
    if (rating === 2) return "bg-orange-500";
    return "bg-red-500";
  };

  const updateRating = (field: keyof EvaluationData, value: number) => {
    const updated = { ...evaluation, [field]: value };
    setEvaluation(updated);
    onEvaluationComplete(updated);
  };

  const addIssue = () => {
    if (newIssue.trim()) {
      const updated = {
        ...evaluation,
        issues: [...evaluation.issues, newIssue.trim()],
      };
      setEvaluation(updated);
      setNewIssue("");
      onEvaluationComplete(updated);
    }
  };

  const removeIssue = (index: number) => {
    const updated = {
      ...evaluation,
      issues: evaluation.issues.filter((_, i) => i !== index),
    };
    setEvaluation(updated);
    onEvaluationComplete(updated);
  };

  const CircleRating = ({
    rating,
    onRatingChange,
    label,
  }: {
    rating: number;
    onRatingChange: (rating: number) => void;
    label: string;
  }) => (
    <div className="flex flex-col gap-2 border-b border-gold/30 pb-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray">{label}</span>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium text-ivory ${getRatingColor(
            rating
          )}`}
        >
          {rating}/5 - {getRatingLabel(rating)}
        </span>
      </div>
<div className="flex gap-2">
  {[1, 2, 3, 4, 5].map((num) => (
    <div
      key={num}
      onClick={() => onRatingChange(num)}
      className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold cursor-pointer
        ${
          num <= rating
            ? "bg-gold border-gold text-black"
            : "bg-ivory border-gold/30 text-gray-700"
        }`}
    >
      {num}
    </div>
  ))}
</div>
    </div>
  );

  const overall =
    Math.round(
      ((evaluation.instructionFollowing +
        evaluation.truthfulness +
        evaluation.completeness +
        evaluation.tone +
        evaluation.presentation +
        evaluation.verbosity +
        evaluation.other) /
        7) *
        10
    ) / 10;

  return (
    <div className="bg-ivory rounded-lg border-[0.5px] border-gold/30 p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-ivory font-bold">
          7
        </div>
        <h2 className="text-xl font-semibold text-gray">
          Evaluate Response Quality
        </h2>
      </div>

      <div className="space-y-4">
        <CircleRating
          rating={evaluation.instructionFollowing}
          onRatingChange={(r) => updateRating("instructionFollowing", r)}
          label="Instruction Following"
        />
        <CircleRating
          rating={evaluation.truthfulness}
          onRatingChange={(r) => updateRating("truthfulness", r)}
          label="Truthfulness"
        />
        <CircleRating
          rating={evaluation.completeness}
          onRatingChange={(r) => updateRating("completeness", r)}
          label="Completeness"
        />
        <CircleRating
          rating={evaluation.tone}
          onRatingChange={(r) => updateRating("tone", r)}
          label="Tone"
        />
        <CircleRating
          rating={evaluation.presentation}
          onRatingChange={(r) => updateRating("presentation", r)}
          label="Presentation"
        />
        <CircleRating
          rating={evaluation.verbosity}
          onRatingChange={(r) => updateRating("verbosity", r)}
          label="Verbosity"
        />
        <CircleRating
          rating={evaluation.other}
          onRatingChange={(r) => updateRating("other", r)}
          label="Other"
        />

        {/* Issues Section */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-charcoal mb-3">
            Issues (optional)
          </h3>
          <div className="space-y-2">
            {evaluation.issues.map((issue, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
              >
                <span className="text-sm text-gray-700">{issue}</span>
                <button
                  onClick={() => removeIssue(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <div className="flex gap-2">
              <input
                type="text"
                value={newIssue}
                onChange={(e) => setNewIssue(e.target.value)}
                placeholder="Add issue..."
                className="flex-1 px-3 py-2 border-[0.5px] border-gold/30 rounded-md"
                onKeyDown={(e) => e.key === "Enter" && addIssue()}
              />
              <button
                onClick={addIssue}
                className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Overall Score */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">
              Overall:{" "}
              {evaluation.instructionFollowing +
                evaluation.truthfulness +
                evaluation.completeness +
                evaluation.tone +
                evaluation.presentation +
                evaluation.verbosity +
                evaluation.other}
              /35 ({overall}/5.0)
            </div>
            <div className="text-sm text-charcoal mt-1">
              {evaluation.charms} Charms
            </div>
          </div>
        </div>

        <button
          onClick={() => onEvaluationComplete(evaluation)}
          className="w-full bg-gold hover:bg-gold/90 text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
        >
          <span>⚡</span>
          Evaluate Response Quality
        </button>
      </div>
    </div>
  );
};

export default EvaluateResponseStep;
