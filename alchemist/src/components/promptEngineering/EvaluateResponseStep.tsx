// "use client";
// import React, { useState } from "react";
// import { Plus, X } from "lucide-react";

// interface EvaluateResponseStepProps {
//   aiResponse: string;
//   onEvaluationComplete: (evaluation: EvaluationData) => void;
// }

// interface EvaluationData {
//   instructionFollowing: number;
//   truthfulness: number;
//   completeness: number;
//   tone: number;
//   presentation: number;
//   verbosity: number;
//   other: number;
//   issues: string[];
//   charms: number;
// }

// const EvaluateResponseStep: React.FC<EvaluateResponseStepProps> = ({
//   aiResponse,
//   onEvaluationComplete,
// }) => {
//   const [evaluation, setEvaluation] = useState<EvaluationData>({
//     instructionFollowing: 4,
//     truthfulness: 4,
//     completeness: 3,
//     tone: 4,
//     presentation: 4,
//     verbosity: 4,
//     other: 4,
//     issues: [
//       "The response is missing a user persona.",
//       "The response could use more sales terminology.",
//       "The response is slightly verbose.",
//     ],
//     charms: 95,
//   });

//   const [newIssue, setNewIssue] = useState("");

//   const getRatingLabel = (rating: number) => {
//     if (rating === 5) return "Perfect";
//     if (rating === 4) return "Good";
//     if (rating === 3) return "Mediocre";
//     if (rating === 2) return "Poor";
//     return "Bad";
//   };

//   const getRatingColor = (rating: number) => {
//     if (rating === 5) return "bg-green-500";
//     if (rating === 4) return "bg-green-400";
//     if (rating === 3) return "bg-yellow-500";
//     if (rating === 2) return "bg-orange-500";
//     return "bg-red-500";
//   };

//   const updateRating = (field: keyof EvaluationData, value: number) => {
//     const updated = { ...evaluation, [field]: value };
//     setEvaluation(updated);
//     onEvaluationComplete(updated);
//   };

//   const addIssue = () => {
//     if (newIssue.trim()) {
//       const updated = {
//         ...evaluation,
//         issues: [...evaluation.issues, newIssue.trim()],
//       };
//       setEvaluation(updated);
//       setNewIssue("");
//       onEvaluationComplete(updated);
//     }
//   };

//   const removeIssue = (index: number) => {
//     const updated = {
//       ...evaluation,
//       issues: evaluation.issues.filter((_, i) => i !== index),
//     };
//     setEvaluation(updated);
//     onEvaluationComplete(updated);
//   };

//   const CircleRating = ({
//     rating,
//     onRatingChange,
//     label,
//   }: {
//     rating: number;
//     onRatingChange: (rating: number) => void;
//     label: string;
//   }) => (
//     <div className="flex flex-col gap-2 border-b border-gold/30 pb-4">
//       <div className="flex justify-between items-center flex-wrap gap-2">
//         <span className="text-sm sm:text-base font-medium text-gray">{label}</span>
//         <span
//           className={`px-2 py-1 rounded-full text-xs font-medium text-ivory ${getRatingColor(
//             rating
//           )}`}
//         >
//           {rating}/5 - {getRatingLabel(rating)}
//         </span>
//       </div>
//       <div className="flex gap-2 flex-wrap">
//         {[1, 2, 3, 4, 5].map((num) => (
//           <div
//             key={num}
//             onClick={() => onRatingChange(num)}
//             className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center text-xs sm:text-sm font-bold cursor-pointer
//               ${
//                 num <= rating
//                   ? "bg-gold border-gold text-black"
//                   : "bg-ivory border-gold/30 text-gray-700"
//               }`}
//           >
//             {num}
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const overall =
//     Math.round(
//       ((evaluation.instructionFollowing +
//         evaluation.truthfulness +
//         evaluation.completeness +
//         evaluation.tone +
//         evaluation.presentation +
//         evaluation.verbosity +
//         evaluation.other) /
//         7) *
//         10
//     ) / 10;

//   return (
//     <div className="bg-ivory rounded-lg border-[0.5px] border-gold/30 p-4 sm:p-6 mb-6">
//       <div className="flex items-center gap-2 mb-4">
//         <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-ivory font-bold">
//           7
//         </div>
//         <h2 className="text-2xl md:text-3xl font-bold text-charcoal">
//           Evaluate Response Quality
//         </h2>
//       </div>

//       <div className="space-y-4">
//         <CircleRating
//           rating={evaluation.instructionFollowing}
//           onRatingChange={(r) => updateRating("instructionFollowing", r)}
//           label="Instruction Following"
//         />
//         <CircleRating
//           rating={evaluation.truthfulness}
//           onRatingChange={(r) => updateRating("truthfulness", r)}
//           label="Truthfulness"
//         />
//         <CircleRating
//           rating={evaluation.completeness}
//           onRatingChange={(r) => updateRating("completeness", r)}
//           label="Completeness"
//         />
//         <CircleRating
//           rating={evaluation.tone}
//           onRatingChange={(r) => updateRating("tone", r)}
//           label="Tone"
//         />
//         <CircleRating
//           rating={evaluation.presentation}
//           onRatingChange={(r) => updateRating("presentation", r)}
//           label="Presentation"
//         />
//         <CircleRating
//           rating={evaluation.verbosity}
//           onRatingChange={(r) => updateRating("verbosity", r)}
//           label="Verbosity"
//         />
//         <CircleRating
//           rating={evaluation.other}
//           onRatingChange={(r) => updateRating("other", r)}
//           label="Other"
//         />

//         {/* Issues Section */}
//         <div className="mt-6">
//           <h3 className="text-sm sm:text-base font-medium text-charcoal mb-3">
//             Issues (optional)
//           </h3>
//           <div className="space-y-2">
//             {evaluation.issues.map((issue, index) => (
//               <div
//                 key={index}
//                 className="flex items-center justify-between bg-gray-50 p-3 rounded-md gap-3 flex-wrap"
//               >
//                 <span className="text-sm text-gray-700">{issue}</span>
//                 <button
//                   onClick={() => removeIssue(index)}
//                   className="text-red-500 hover:text-red-600"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>
//             ))}
//             <div className="flex flex-col sm:flex-row gap-2">
//               <input
//                 type="text"
//                 value={newIssue}
//                 onChange={(e) => setNewIssue(e.target.value)}
//                 placeholder="Add issue..."
//                 className="flex-1 px-3 py-2 border-[0.5px] border-gold/30 rounded-md"
//                 onKeyDown={(e) => e.key === "Enter" && addIssue()}
//               />
//               <button
//                 onClick={addIssue}
//                 className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors flex items-center justify-center"
//               >
//                 <Plus className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Overall Score */}
//         <div className="mt-6 p-4 bg-gray-50 rounded-md text-center">
//           <div className="text-xl sm:text-2xl font-bold text-gray-800">
//             Overall:{" "}
//             {evaluation.instructionFollowing +
//               evaluation.truthfulness +
//               evaluation.completeness +
//               evaluation.tone +
//               evaluation.presentation +
//               evaluation.verbosity +
//               evaluation.other}
//             /35 ({overall}/5.0)
//           </div>
//           <div className="text-sm text-charcoal mt-1">
//             {evaluation.charms} Charms
//           </div>
//         </div>

//         <button
//           onClick={() => onEvaluationComplete(evaluation)}
//           className="w-full bg-gold hover:bg-gold/90 text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
//         >
//           <span>⚡</span>
//           Evaluate Response Quality
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EvaluateResponseStep;




"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface EvaluateResponseStepProps {
  aiResponse: string;
  onEvaluationComplete: (evaluation: EvaluationData) => void;
}

interface EvaluationData {
  objective: boolean;
  inputs: {
    audience: string;
    contentGoal: string;
    coreMessage: string;
    audienceMotivation: string;
  };
  completeness: number;
  tone: number;
  presentation: number;
}

interface InputField {
  label: string;
  value: string;
  status: string;
}

const EvaluateResponseStep: React.FC<EvaluateResponseStepProps> = ({
  aiResponse,
  onEvaluationComplete,
}) => {
  const [evaluation, setEvaluation] = useState<EvaluationData>({
    objective: true,
    inputs: {
      audience: "No Issues",
      contentGoal: "No Issues",
      coreMessage: "No Issues",
      audienceMotivation: "No Issues",
    },
    completeness: 4,
    tone: 4,
    presentation: 4,
  });

  const inputFields: InputField[] = [
    {
      label: "Audience: Corporate 22-30 Year Olds",
      value: evaluation.inputs.audience,
      status: "audience"
    },
    {
      label: "Content Goal: Spread Awareness",
      value: evaluation.inputs.contentGoal,
      status: "contentGoal"
    },
    {
      label: "Core Message: Come to our coffee shop.",
      value: evaluation.inputs.coreMessage,
      status: "coreMessage"
    },
    {
      label: "Audience Motivation: To have enough energy for work.",
      value: evaluation.inputs.audienceMotivation,
      status: "audienceMotivation"
    },
  ];

  const updateObjective = (value: boolean) => {
    const updated = { ...evaluation, objective: value };
    setEvaluation(updated);
    onEvaluationComplete(updated);
  };

  const updateInputStatus = (field: keyof typeof evaluation.inputs, value: string) => {
    const updated = {
      ...evaluation,
      inputs: { ...evaluation.inputs, [field]: value }
    };
    setEvaluation(updated);
    onEvaluationComplete(updated);
  };

  const updateRating = (field: keyof EvaluationData, value: number) => {
    const updated = { ...evaluation, [field]: value };
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
    <div className="mb-8">
      <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide bg-gold/30 px-4 py-2 rounded-t-lg">
        {label}
      </h3>
      <div className="bg-white px-4 pb-4 rounded-b-lg border border-gold/30 border-[0.5px]">
        <p className="text-sm text-gray-700 mb-4">
          Does the response cover everything expected or needed by the prompt?
        </p>
        <div className="flex gap-3">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() => onRatingChange(num)}
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold transition-colors
                ${
                  num <= rating
                    ? "bg-gold border-gold text-white"
                    : "bg-white border-gold/30 border-[0.5px] text-gray-600 hover:border-gold"
                }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const DropdownSelect = ({ value, onChange, options }: {
    value: string;
    onChange: (value: string) => void;
    options: string[];
  }) => (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-gold/30 border border-gold/30 border-[0.5px] rounded px-3 py-2 pr-8 text-sm font-medium text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-ivory rounded-lg p-6 space-y-6 border-[0.5px] border-gold/30">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">8</span>
        </div>
        <h2 className="text-xl font-bold text-gray-800">
          Evaluate Response Quality
        </h2>
      </div>

      {/* Objective Section */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide bg-gold/30 px-4 py-2 rounded-t-lg">
          OBJECTIVE
        </h3>
        <div className="bg-white px-4 pb-4 rounded-b-lg border-[0.5] border-gold/30">
          <p className="text-sm text-gray-700 mb-4">
            Does the response meet the primary objective of the prompt?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => updateObjective(true)}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                evaluation.objective
                  ? "bg-gold text-gray-700 border border-gold"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              YES
            </button>
            <button
              onClick={() => updateObjective(false)}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                !evaluation.objective
                  ? "bg-gold text-gray-700 border border-gold"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              NO
            </button>
          </div>
        </div>
      </div>

      {/* Inputs Section */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide bg-gold/30 px-4 py-2 rounded-t-lg">
          INPUTS
        </h3>
        <div className="bg-white px-4 pb-4 rounded-b-lg border-[0.5] border-gold/30">
          <p className="text-sm text-gray-700 mb-4">
            Evaluate whether the response accurately addresses each of the following input fields.
          </p>
          <div className="space-y-4">
            {inputFields.map((field, index) => (
              <div key={index} className="flex items-center justify-between gap-3">
                <span className="text-sm text-gray-700 flex-1">
                  {field.label}
                </span>
              <div className="w-24 text-xs">
  <DropdownSelect
    value={field.value}
    onChange={(value) => updateInputStatus(field.status as keyof typeof evaluation.inputs, value)}
    options={["No Issues", "Minor Issues", "Major Issues"]}
   
  />
</div>

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rating Sections */}
      <CircleRating
        rating={evaluation.completeness}
        onRatingChange={(r) => updateRating("completeness", r)}
        label="COMPLETENESS"
      />

      <CircleRating
        rating={evaluation.tone}
        onRatingChange={(r) => updateRating("tone", r)}
        label="TONE"
      />

      <CircleRating
        rating={evaluation.presentation}
        onRatingChange={(r) => updateRating("presentation", r)}
        label="PRESENTATION"
      />

      {/* Generate Button */}
      <button
        onClick={() => onEvaluationComplete(evaluation)}
        className="w-full bg-gold hover:bg-gold/80 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
      >
        <span>⚡</span>
        Generate Results & Improve
      </button>
    </div>
  );
};

export default EvaluateResponseStep;
