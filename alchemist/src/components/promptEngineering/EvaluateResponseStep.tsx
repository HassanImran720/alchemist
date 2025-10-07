// // "use client";
// // import React, { useState } from "react";
// // import { ChevronDown } from "lucide-react";

// // interface EvaluateResponseStepProps {
// //   aiResponse: string;
// //   onEvaluationComplete: (evaluation: EvaluationData) => void;
// // }

// // interface EvaluationData {
// //   objective: boolean;
// //   inputs: Record<string, string>;
// //   completeness: number;
// //   tone: number;
// //   presentation: number;
// //   verbosity: number;
// //   other: number;
// //   totalScore: number;
// //   issues: Record<string, string[]>;
// // }

// // const EvaluateResponseStep: React.FC<EvaluateResponseStepProps> = ({
// //   aiResponse,
// //   onEvaluationComplete,
// // }) => {
// //   const [showObjective, setShowObjective] = useState(true);
// //   const [rewriteObjective, setRewriteObjective] = useState("");
// //   const [evaluation, setEvaluation] = useState<EvaluationData>({
// //     objective: true,
// //     inputs: {
// //       audience: "No Issues",
// //       contentGoal: "No Issues",
// //       coreMessage: "No Issues",
// //       audienceMotivation: "No Issues",
// //     },
// //     completeness: 3,
// //     tone: 3,
// //     presentation: 3,
// //     verbosity: 3,
// //     other: 3,
// //     totalScore: 0,
// //     issues: {},
// //   });
// //   const [submitted, setSubmitted] = useState(false);

// //   const inputFields = [
// //     { key: "audience", label: "Audience: Corporate 22-30 Year Olds" },
// //     { key: "contentGoal", label: "Content Goal: Spread Awareness" },
// //     { key: "coreMessage", label: "Core Message: Come to our coffee shop." },
// //     { key: "audienceMotivation", label: "Audience Motivation: To have enough energy for work." },
// //   ];

// //   const updateObjective = (value: boolean) => {
// //     const updated = { ...evaluation, objective: value };
// //     setEvaluation(updated);
// //   };

// //   const updateInputStatus = (field: string, value: string) => {
// //     const updated = {
// //       ...evaluation,
// //       inputs: { ...evaluation.inputs, [field]: value },
// //     };
// //     setEvaluation(updated);
// //   };

// //   const updateRating = (field: keyof EvaluationData, value: number) => {
// //     const updated = { ...evaluation, [field]: value };
// //     setEvaluation(updated);
// //   };

// //   const addIssue = (field: string, text: string) => {
// //     if (!text.trim()) return;
// //     const updatedIssues = { ...evaluation.issues };
// //     if (!updatedIssues[field]) updatedIssues[field] = [];
// //     updatedIssues[field].push(text);
// //     setEvaluation({ ...evaluation, issues: updatedIssues });
// //   };

// //   const calculateScore = () => {
// //     let total = 0;

// //     // Objective
// //     total += evaluation.objective ? 30 : 0;

// //     // Inputs (No Issues=5, Minor=3, Major=1 → avg ×4 =20)
// //     const scores = Object.values(evaluation.inputs).map((v) =>
// //       v === "No Issues" ? 5 : v === "Minor Issues" ? 3 : 1
// //     );
// //     const inputScore = (scores.reduce((a, b) => a + b, 0) / scores.length) * 4;
// //     total += inputScore;

// //     // Each rating ×2
// //     total += evaluation.completeness * 2;
// //     total += evaluation.tone * 2;
// //     total += evaluation.presentation * 2;
// //     total += evaluation.verbosity * 2;
// //     total += evaluation.other * 2;

// //     return Math.round(total);
// //   };

// //   const submitEvaluation = () => {
// //     const score = calculateScore();
// //     const final = { ...evaluation, totalScore: score };
// //     setEvaluation(final);
// //     setSubmitted(true);
// //     onEvaluationComplete(final);
// //   };

// //   const ScoreIndicator = () => {
// //     const score = evaluation.totalScore;
// //     let color = "bg-red-500";
// //     if (score >= 90) color = "bg-green-500";
// //     else if (score >= 70) color = "bg-yellow-400";
// //     return (
// //       <div className={`text-white px-4 py-2 rounded-lg text-center ${color}`}>
// //         Final Score: {score}/100
// //       </div>
// //     );
// //   };

// //   // Circle Rating Component
// //   const CircleRating = ({
// //     rating,
// //     onRatingChange,
// //     label,
// //   }: {
// //     rating: number;
// //     onRatingChange: (rating: number) => void;
// //     label: string;
// //   }) => {
// //     const [showIssue, setShowIssue] = useState(false);
// //     const [issueText, setIssueText] = useState("");

// //     return (
// //       <div className="mb-8">
// //         <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide bg-gold/30 px-4 py-2 rounded-t-lg">
// //           {label}
// //         </h3>
// //         <div className="px-4 pb-4 rounded-b-lg border border-gold/30">
// //           <p className="text-sm text-gray-700 mb-4">Rate on a scale of 1–5.</p>
// //           <div className="flex gap-3 mb-4">
// //             {[1, 2, 3, 4, 5].map((num) => (
// //               <button
// //                 key={num}
// //                 onClick={() => onRatingChange(num)}
// //                 className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold
// //                 ${num <= rating ? "bg-gold border-gold text-white" : "bg-white border-gold/30 text-gray-600"}`}
// //               >
// //                 {num}
// //               </button>
// //             ))}
// //           </div>
// //           <button
// //             className="text-sm text-gold font-medium mb-2"
// //             onClick={() => setShowIssue((prev) => !prev)}
// //           >
// //             + Add Issue
// //           </button>
// //           {showIssue && (
// //             <div>
// //               <textarea
// //                 value={issueText}
// //                 onChange={(e) => setIssueText(e.target.value)}
// //                 placeholder="Describe the issue..."
// //                 className="w-full border border-gold/30 bg-ivory rounded-md p-2 text-sm"
// //               />
// //               <button
// //                 onClick={() => {
// //                   addIssue(label, issueText);
// //                   setIssueText("");
// //                 }}
// //                 className="mt-2 px-3 py-1 bg-gold text-white text-sm rounded"
// //               >
// //                 Save Issue
// //               </button>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <div className="rounded-xl border border-gold/30 p-2 md:p-4 mb-4 md:mb-8">
// //          <div className="flex items-center mb-4">
// //       <h2 className="text-base sm:text-lg text-black mb-3 sm:mb-4"><strong >XI.  Evaluate Response

// // </strong>
// //  </h2>
// //     </div>

// //       {/* Objective */}
// //       {showObjective && (
// //         <div>
// //           <h3 className="text-sm font-semibold bg-gold/30 px-4 py-2 rounded-t-lg">OBJECTIVE</h3>
// //           <div className="px-4 pb-4 border border-gold/30">
// //             <p className="text-sm text-gray-700 mb-2">Does the response meet the original objective?</p>
// //             <div className="flex gap-3 mb-2">
// //               <button onClick={() => updateObjective(true)} className={`px-4 py-2 rounded ${evaluation.objective ? "bg-gold text-white" : "bg-gray-200"}`}>YES</button>
// //               <button onClick={() => updateObjective(false)} className={`px-4 py-2 rounded ${!evaluation.objective ? "bg-gold text-white" : "bg-gray-200"}`}>NO</button>
// //             </div>
// //             {!evaluation.objective && (
// //               <textarea
// //                 value={rewriteObjective}
// //                 onChange={(e) => setRewriteObjective(e.target.value)}
// //                 placeholder="Rewrite the objective..."
// //                 className="w-full border border-gold/30 bg-ivory rounded-md p-2 text-sm"
// //               />
// //             )}
// //           </div>
// //         </div>
// //       )}
// //       <button
// //         className="text-sm text-gold font-medium"
// //         onClick={() => setShowObjective(!showObjective)}
// //       >
// //         {showObjective ? "Hide Objective" : "Show Objective"}
// //       </button>

// //       {/* Inputs */}
// //       <div>
// //         <h3 className="text-sm font-semibold bg-gold/30 px-4 py-2 rounded-t-lg">INPUTS</h3>
// //         <div className="px-4 pb-4 border border-gold/30 space-y-3">
// //           {inputFields.map((field) => (
// //             <div key={field.key}>
// //               <p className="text-sm font-medium">{field.label}</p>
// //               <select
// //                 value={evaluation.inputs[field.key]}
// //                 onChange={(e) => updateInputStatus(field.key, e.target.value)}
// //                 className="w-full mt-1 border border-gold/30 rounded px-2 py-1 text-sm"
// //               >
// //                 <option>No Issues</option>
// //                 <option>Minor Issues</option>
// //                 <option>Major Issues</option>
// //               </select>
// //               {(evaluation.inputs[field.key] === "Minor Issues" ||
// //                 evaluation.inputs[field.key] === "Major Issues") && (
// //                 <textarea
// //                   placeholder="Describe the issue..."
// //                   className="mt-2 w-full border border-gold/30 bg-ivory rounded-md p-2 text-sm"
// //                   onBlur={(e) => addIssue(field.label, e.target.value)}
// //                 />
// //               )}
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Rating Sections */}
// //       <CircleRating rating={evaluation.completeness} onRatingChange={(r) => updateRating("completeness", r)} label="COMPLETENESS" />
// //       <CircleRating rating={evaluation.tone} onRatingChange={(r) => updateRating("tone", r)} label="TONE" />
// //       <CircleRating rating={evaluation.presentation} onRatingChange={(r) => updateRating("presentation", r)} label="PRESENTATION" />
// //       <CircleRating rating={evaluation.verbosity} onRatingChange={(r) => updateRating("verbosity", r)} label="VERBOSITY" />
// //       <CircleRating rating={evaluation.other} onRatingChange={(r) => updateRating("other", r)} label="OTHER" />

// //       {/* Final Score */}
// //       {submitted && <ScoreIndicator />}

// //       <button
// //         onClick={submitEvaluation}
// //         className="w-full bg-gold text-white px-6 py-3 rounded-lg font-semibold"
// //       >
// //         {submitted ? "Iterate Prompt" : "Submit Evaluation"}
// //       </button>
// //     </div>
// //   );
// // };

// // export default EvaluateResponseStep;


// // "use client";
// // import React, { useState } from "react";

// // interface EvaluateResponseStepProps {
// //   aiResponse: string;
// //   onEvaluationComplete: (evaluation: EvaluationData) => void;
// // }

// // interface EvaluationData {
// //   objective: boolean;
// //   inputs: Record<string, string>;
// //   completeness: number;
// //   tone: number;
// //   presentation: number;
// //   verbosity: number;
// //   other: number;
// //   totalScore: number;
// //   issues: Record<string, string[]>;
// // }

// // const EvaluateResponseStep: React.FC<EvaluateResponseStepProps> = ({
// //   aiResponse,
// //   onEvaluationComplete,
// // }) => {
// //   const [showObjective, setShowObjective] = useState(true);
// //   const [rewriteObjective, setRewriteObjective] = useState("");
// //   const [evaluation, setEvaluation] = useState<EvaluationData>({
// //     objective: true,
// //     inputs: {
// //       audience: "No Issues",
// //       contentGoal: "No Issues",
// //       coreMessage: "No Issues",
// //       audienceMotivation: "No Issues",
// //     },
// //     completeness: 3,
// //     tone: 3,
// //     presentation: 3,
// //     verbosity: 3,
// //     other: 3,
// //     totalScore: 0,
// //     issues: {},
// //   });
// //   const [submitted, setSubmitted] = useState(false);

// //   const inputFields = [
// //     { key: "audience", label: "Audience: Corporate 22-30 Year Olds" },
// //     { key: "contentGoal", label: "Content Goal: Spread Awareness" },
// //     { key: "coreMessage", label: "Core Message: Come to our coffee shop." },
// //     { key: "audienceMotivation", label: "Audience Motivation: To have enough energy for work." },
// //   ];

// //   const updateObjective = (value: boolean) => {
// //     setEvaluation({ ...evaluation, objective: value });
// //   };

// //   const updateInputStatus = (field: string, value: string) => {
// //     setEvaluation({ ...evaluation, inputs: { ...evaluation.inputs, [field]: value } });
// //   };

// //   const updateRating = (field: keyof EvaluationData, value: number) => {
// //     setEvaluation({ ...evaluation, [field]: value });
// //   };

// //   const addIssue = (field: string, text: string) => {
// //     if (!text.trim()) return;
// //     const updatedIssues = { ...evaluation.issues };
// //     if (!updatedIssues[field]) updatedIssues[field] = [];
// //     updatedIssues[field].push(text);
// //     setEvaluation({ ...evaluation, issues: updatedIssues });
// //   };

// //   const calculateScore = () => {
// //     let total = 0;
// //     total += evaluation.objective ? 30 : 0;
// //     const scores = Object.values(evaluation.inputs).map((v) =>
// //       v === "No Issues" ? 5 : v === "Minor Issues" ? 3 : 1
// //     );
// //     const inputScore = (scores.reduce((a, b) => a + b, 0) / scores.length) * 4;
// //     total += inputScore;
// //     total += evaluation.completeness * 2;
// //     total += evaluation.tone * 2;
// //     total += evaluation.presentation * 2;
// //     total += evaluation.verbosity * 2;
// //     total += evaluation.other * 2;
// //     return Math.round(total);
// //   };

// //   const submitEvaluation = () => {
// //     const score = calculateScore();
// //     const final = { ...evaluation, totalScore: score };
// //     setEvaluation(final);
// //     setSubmitted(true);
// //     onEvaluationComplete(final);
// //   };

// //   const ScoreIndicator = () => {
// //     const score = evaluation.totalScore;
// //     let color = "bg-red-500";
// //     if (score >= 90) color = "bg-green-500";
// //     else if (score >= 70) color = "bg-yellow-400";
// //     return (
// //       <div className={`text-white px-4 py-2 rounded-lg text-center my-4 ${color}`}>
// //         Final Score: {score}/100
// //       </div>
// //     );
// //   };

// //   const CircleRating = ({
// //     rating,
// //     onRatingChange,
// //     label,
// //   }: {
// //     rating: number;
// //     onRatingChange: (rating: number) => void;
// //     label: string;
// //   }) => {
// //     const [showIssue, setShowIssue] = useState(false);
// //     const [issueText, setIssueText] = useState("");

// //     return (
// //       <div className="mb-4 sm:mb-4">
// //         <h3 className="text-sm sm:text-base font-semibold text-gray-600 uppercase tracking-wide bg-gold/30 px-3 sm:px-4 py-2 rounded-t-lg">
// //           {label}
// //         </h3>
// //         <div className="px-3 sm:px-4 pb-4 rounded-b-lg border border-gold/30">
// //           <p className="text-xs sm:text-sm text-gray-700 mb-3">Rate on a scale of 1–5.</p>
// //           <div className="flex gap-2 sm:gap-3 mb-3 flex-wrap">
// //             {[1, 2, 3, 4, 5].map((num) => (
// //               <button
// //                 key={num}
// //                 onClick={() => onRatingChange(num)}
// //                 className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center text-sm font-semibold
// //                 ${num <= rating ? "bg-gold border-gold text-white" : "bg-white border-gold/30 text-gray-600"}`}
// //               >
// //                 {num}
// //               </button>
// //             ))}
// //           </div>
// //           <button
// //             className="text-sm sm:text-base text-gold font-medium mb-2"
// //             onClick={() => setShowIssue((prev) => !prev)}
// //           >
// //             + Add Issue
// //           </button>
// //           {showIssue && (
// //             <div className="mt-2">
// //               <textarea
// //                 value={issueText}
// //                 onChange={(e) => setIssueText(e.target.value)}
// //                 placeholder="Describe the issue..."
// //                 className="w-full border border-gold/30 bg-ivory rounded-md p-2 text-sm sm:text-base"
// //               />
// //               <button
// //                 onClick={() => {
// //                   addIssue(label, issueText);
// //                   setIssueText("");
// //                 }}
// //                 className="mt-2 px-3 py-1 bg-gold text-white text-sm sm:text-base rounded"
// //               >
// //                 Save Issue
// //               </button>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <div className="rounded-xl border border-gold/30 p-3 sm:p-6 mb-4">
// //       <div className="flex items-center mb-3 sm:mb-4">
// //         <h2 className="text-base sm:text-lg text-black mb-3 sm:mb-2 ">
// //          <strong>XI. Evaluate Response</strong>
// //         </h2>
// //       </div>

// //       {/* Objective */}
// //       {showObjective && (
// //         <div className="mb-4">
// //           <h3 className="text-sm sm:text-base font-semibold bg-gold/30 px-3 sm:px-4 py-2 rounded-t-lg">
// //             OBJECTIVE
// //           </h3>
// //           <div className="px-3 sm:px-4 pb-4 border border-gold/30 rounded-b-lg">
// //             <p className="text-xs sm:text-sm text-gray-700 mb-2">
// //               Does the response meet the original objective?
// //             </p>
// //             <div className="flex gap-2 sm:gap-2 mb-2 flex-wrap">
// //               <button
// //                 onClick={() => updateObjective(true)}
// //                 className={`px-3 sm:px-4 py-1 sm:py-2 rounded font-medium ${
// //                   evaluation.objective ? "bg-gold text-white" : "bg-gray-200"
// //                 }`}
// //               >
// //                 YES
// //               </button>
// //               <button
// //                 onClick={() => updateObjective(false)}
// //                 className={`px-3 sm:px-4 py-1 sm:py-2 rounded font-medium ${
// //                   !evaluation.objective ? "bg-gold text-white" : "bg-gray-200"
// //                 }`}
// //               >
// //                 NO
// //               </button>
// //             </div>
// //             {!evaluation.objective && (
// //               <textarea
// //                 value={rewriteObjective}
// //                 onChange={(e) => setRewriteObjective(e.target.value)}
// //                 placeholder="Rewrite the objective..."
// //                 className="w-full border border-gold/30 bg-ivory rounded-md p-2 text-sm sm:text-base"
// //               />
// //             )}
// //           </div>
// //         </div>
// //       )}
// //       <button
// //         className="text-sm sm:text-base text-gold font-medium mb-2"
// //         onClick={() => setShowObjective((prev) => !prev)}
// //       >
// //         {showObjective ? "Hide Objective" : "Show Objective"}
// //       </button>

// //       {/* Inputs */}
// //       <div className="mb-2">
// //         <h3 className="text-sm sm:text-base font-semibold bg-gold/30 px-3 sm:px-4 py-2 rounded-t-lg">
// //           INPUTS
// //         </h3>
// //         <div className="px-3 sm:px-4 pb-4 border border-gold/30 space-y-3 rounded-b-lg">
// //           {inputFields.map((field) => (
// //             <div key={field.key}>
// //               <p className="text-xs sm:text-sm font-medium">{field.label}</p>
// //               <select
// //                 value={evaluation.inputs[field.key]}
// //                 onChange={(e) => updateInputStatus(field.key, e.target.value)}
// //                 className="w-full mt-1 border border-gold/30 rounded px-2 py-1 text-sm sm:text-base"
// //               >
// //                 <option>No Issues</option>
// //                 <option>Minor Issues</option>
// //                 <option>Major Issues</option>
// //               </select>
// //               {(evaluation.inputs[field.key] === "Minor Issues" ||
// //                 evaluation.inputs[field.key] === "Major Issues") && (
// //                 <textarea
// //                   placeholder="Describe the issue..."
// //                   className="mt-2 w-full border border-gold/30 bg-ivory rounded-md p-2 text-sm sm:text-base"
// //                   onBlur={(e) => addIssue(field.label, e.target.value)}
// //                 />
// //               )}
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Rating Sections */}
// //       <CircleRating
// //         rating={evaluation.completeness}
// //         onRatingChange={(r) => updateRating("completeness", r)}
// //         label="COMPLETENESS"
// //       />
// //       <CircleRating
// //         rating={evaluation.tone}
// //         onRatingChange={(r) => updateRating("tone", r)}
// //         label="TONE"
// //       />
// //       <CircleRating
// //         rating={evaluation.presentation}
// //         onRatingChange={(r) => updateRating("presentation", r)}
// //         label="PRESENTATION"
// //       />
// //       <CircleRating
// //         rating={evaluation.verbosity}
// //         onRatingChange={(r) => updateRating("verbosity", r)}
// //         label="VERBOSITY"
// //       />
// //       <CircleRating
// //         rating={evaluation.other}
// //         onRatingChange={(r) => updateRating("other", r)}
// //         label="OTHER"
// //       />

// //       {/* Final Score */}
// //       {submitted && <ScoreIndicator />}

// //       <button
// //         onClick={submitEvaluation}
// //         className="w-full bg-gold text-white px-6 py-3 rounded-lg font-semibold text-sm sm:text-base mt-4"
// //       >
// //         {submitted ? "Iterate Prompt" : "Submit Evaluation"}
// //       </button>
// //     </div>
// //   );
// // };

// // export default EvaluateResponseStep;


// "use client";
// import React, { useState } from "react";

// interface EvaluateResponseStepProps {
//   aiResponse: string;
//   onEvaluationComplete: (evaluation: EvaluationData) => void;
// }

// interface EvaluationData {
//   objective: boolean;
//   rewrittenObjective?: string;
//   inputs: Record<string, { status: string; issues: string[] }>;
//   completeness: number;
//   tone: number;
//   presentation: number;
//   verbosity: number;
//   other: number;
//   totalScore: number;
//   categoryIssues: Record<string, string[]>;
// }

// const EvaluateResponseStep: React.FC<EvaluateResponseStepProps> = ({
//   aiResponse,
//   onEvaluationComplete,
// }) => {
//   const [showObjective, setShowObjective] = useState(true);
//   const [rewriteObjective, setRewriteObjective] = useState("");
//   const [scoreGenerated, setScoreGenerated] = useState(false);
//   const [evaluationStarted, setEvaluationStarted] = useState(false);

//   const [evaluation, setEvaluation] = useState<EvaluationData>({
//     objective: true,
//     inputs: {
//       audience: { status: "No Issues", issues: [] },
//       contentGoal: { status: "No Issues", issues: [] },
//       coreMessage: { status: "No Issues", issues: [] },
//       audienceMotivation: { status: "No Issues", issues: [] },
//     },
//     completeness: 0,
//     tone: 0,
//     presentation: 0,
//     verbosity: 0,
//     other: 0,
//     totalScore: 0,
//     categoryIssues: {
//       completeness: [],
//       tone: [],
//       presentation: [],
//       verbosity: [],
//       other: [],
//     },
//   });

//   const [inputIssueTexts, setInputIssueTexts] = useState<Record<string, string>>({});
//   const [categoryIssueTexts, setCategoryIssueTexts] = useState<Record<string, string>>({});

//   const inputFields = [
//     { key: "audience", label: "Audience: Corporate 22-30 Year Olds" },
//     { key: "contentGoal", label: "Content Goal: Spread Awareness" },
//     { key: "coreMessage", label: "Core Message: Come to our coffee shop." },
//     { key: "audienceMotivation", label: "Audience Motivation: To have enough energy for work." },
//   ];

//   // ---------- helpers ----------
//   const updateObjective = (value: boolean) => {
//     setEvaluation((prev) => ({ ...prev, objective: value }));
//   };

//   const updateInputStatus = (field: string, value: string) => {
//     setEvaluation((prev) => ({
//       ...prev,
//       inputs: {
//         ...prev.inputs,
//         [field]: { ...prev.inputs[field], status: value },
//       },
//     }));
//   };

//   const ensurePendingIssuesAdded = () => {
//     let updated = { ...evaluation.inputs };
//     Object.entries(inputIssueTexts).forEach(([field, text]) => {
//       if (text.trim()) {
//         updated[field].issues.push(text.trim());
//       }
//     });
//     setInputIssueTexts({});
//     return updated;
//   };

//   const addInputIssue = (field: string) => {
//     const issueText = inputIssueTexts[field];
//     if (!issueText?.trim()) return;
//     const updatedInputs = { ...evaluation.inputs };
//     updatedInputs[field].issues.push(issueText);
//     setEvaluation({ ...evaluation, inputs: updatedInputs });
//     setInputIssueTexts({ ...inputIssueTexts, [field]: "" });
//   };

//   const updateRating = (field: keyof EvaluationData, value: number) => {
//     setEvaluation((prev) => ({ ...prev, [field]: value }));
//   };

//   const addCategoryIssue = (category: string) => {
//     const text = categoryIssueTexts[category];
//     if (!text?.trim()) return;
//     setEvaluation((prev) => ({
//       ...prev,
//       categoryIssues: {
//         ...prev.categoryIssues,
//         [category]: [...(prev.categoryIssues[category] || []), text],
//       },
//     }));
//     setCategoryIssueTexts({ ...categoryIssueTexts, [category]: "" });
//   };

//   const getInputBoxColor = (status: string) => {
//     if (status === "No Issues") return "bg-green-100 border-green-500";
//     if (status === "Minor Issues") return "bg-yellow-100 border-yellow-500";
//     return "bg-red-100 border-red-500";
//   };

//   const calculateScore = () => {
//     let total = 0;
//     total += evaluation.objective ? 30 : 0;

//     const inputScores = Object.values(evaluation.inputs).map((input) => {
//       if (input.status === "No Issues") return 5;
//       if (input.status === "Minor Issues") return 3;
//       return 1;
//     });
//     const inputAverage = inputScores.reduce((a, b) => a + b, 0) / inputScores.length;
//     total += inputAverage * 4; // scaled to 20

//     total += evaluation.completeness * 2;
//     total += evaluation.tone * 2;
//     total += evaluation.presentation * 2;
//     total += evaluation.verbosity * 2;
//     total += evaluation.other * 2;

//     return Math.round(total);
//   };

//   const generateScore = () => {
//     const updatedInputs = ensurePendingIssuesAdded();

//     for (const [key, input] of Object.entries(updatedInputs)) {
//       if ((input.status === "Minor Issues" || input.status === "Major Issues") && input.issues.length === 0) {
//         alert(`Please add at least one issue for ${inputFields.find(f => f.key === key)?.label}`);
//         return;
//       }
//     }

//     if (!evaluation.objective && !rewriteObjective.trim()) {
//       alert("Please rewrite the objective or select 'YES'");
//       return;
//     }

//     const score = calculateScore();
//     const finalEval = {
//       ...evaluation,
//       inputs: updatedInputs,
//       totalScore: score,
//       rewrittenObjective: !evaluation.objective ? rewriteObjective : undefined,
//     };
//     setEvaluation(finalEval);
//     setScoreGenerated(true);
//   };

//   const generateNewPrompt = () => {
//     onEvaluationComplete(evaluation);
//   };

//   // ---------- Category Component ----------
//   const CategoryRating = React.memo(
//     ({
//       rating,
//       onRatingChange,
//       label,
//       subtext,
//       categoryKey,
//     }: {
//       rating: number;
//       onRatingChange: (rating: number) => void;
//       label: string;
//       subtext: string;
//       categoryKey: string;
//     }) => {
//       return (
//         <div className="mb-6 bg-ivory rounded border border-bg-gold/30 p-4 shadow-sm">
//           <h3 className="font-bold text-gray-900 text-sm mb-1 uppercase">{label}</h3>
//           <p className="text-gray-500 text-xs italic mb-3">{subtext}</p>

//           <div className="flex gap-1 mb-2">
//             {[1, 2, 3, 4, 5].map((num) => (
//               <button
//                 key={num}
//                 type="button"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   e.stopPropagation();
//                   onRatingChange(num);
//                 }}
//                 className={`w-8 h-8 rounded border text-xs flex items-center justify-center font-semibold transition-all
//                 ${
//                   num <= rating
//                     ? "bg-gold border-bg-gold text-white"
//                     : "bg-white border-bg-gold/30 text-gray-700 hover:bg-gold/20"
//                 }`}
//               >
//                 {num}
//               </button>
//             ))}
//           </div>

//           <input
//             type="text"
//             value={categoryIssueTexts[categoryKey] || ""}
//             onChange={(e) =>
//               setCategoryIssueTexts({ ...categoryIssueTexts, [categoryKey]: e.target.value })
//             }
//             placeholder="Describe the Issue"
//             className="w-full border border-bg-gold/30 rounded px-2 py-1 text-xs mb-2 bg-white"
//           />
//           <button
//             type="button"
//             className="text-xs text-gray-700 hover:text-gold"
//             onClick={() => addCategoryIssue(categoryKey)}
//           >
//             + Add Issue
//           </button>

//           {evaluation.categoryIssues[categoryKey]?.length > 0 && (
//             <div className="mt-2 space-y-1">
//               {evaluation.categoryIssues[categoryKey].map((issue, idx) => (
//                 <div key={idx} className="text-xs text-gray-600 bg-white p-2 rounded border border-bg-gold/30">
//                   • {issue}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       );
//     }
//   );

//   // ---------- UI ----------
//   return (
//     <div className="max-w-3xl mx-auto p-4 flex flex-col gap-6 bg-ivory rounded-xl">
//       {/* OBJECTIVE */}
//       <div className="bg-ivory border border-bg-gold/30 rounded p-4 shadow-sm">
//         <button
//           type="button"
//           onClick={() => setShowObjective(!showObjective)}
//           className="text-xs text-gold underline mb-2"
//         >
//           {showObjective ? "Hide Objective" : "Show Objective"}
//         </button>

//         {showObjective && (
//           <>
//             <h3 className="font-bold text-gray-900 text-sm mb-1 uppercase">OBJECTIVE</h3>
//             <p className="text-gray-500 text-xs italic mb-3">
//               Does the response meet the original objective?
//             </p>

//             <div className="flex gap-2 mb-3">
//               <button
//                 type="button"
//                 onClick={() => updateObjective(true)}
//                 className={`px-4 py-1 rounded text-xs font-semibold border-2 ${
//                   evaluation.objective
//                     ? "bg-green-100 border-green-500"
//                     : "bg-white border-bg-gold/30"
//                 }`}
//               >
//                 YES
//               </button>
//               <button
//                 type="button"
//                 onClick={() => updateObjective(false)}
//                 className={`px-4 py-1 rounded text-xs font-semibold border-2 ${
//                   !evaluation.objective
//                     ? "bg-red-100 border-red-500"
//                     : "bg-white border-bg-gold/30"
//                 }`}
//               >
//                 NO
//               </button>
//             </div>

//             {!evaluation.objective && (
//               <div className="mb-2">
//                 <label className="text-xs text-gray-600 mb-1 block">Rewrite Objective:</label>
//                 <input
//                   type="text"
//                   value={rewriteObjective}
//                   onChange={(e) => setRewriteObjective(e.target.value)}
//                   className="w-full border border-bg-gold/30 rounded px-2 py-1 text-xs bg-white"
//                 />
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* INPUTS */}
//       <div className="bg-ivory border border-bg-gold/30 rounded p-4 shadow-sm">
//         <h3 className="font-bold text-gray-900 text-sm mb-1 uppercase">INPUTS</h3>
//         <p className="text-gray-500 text-xs italic mb-3">
//           Does the response address each input correctly?
//         </p>

//         {!evaluationStarted ? (
//           <button
//             type="button"
//             onClick={() => setEvaluationStarted(true)}
//             className="w-full bg-gold text-white py-2 text-xs rounded font-semibold"
//           >
//             Begin Evaluation
//           </button>
//         ) : (
//           <div className="space-y-3">
//             {inputFields.map((field) => (
//               <div
//                 key={field.key}
//                 className={`border-2 rounded transition-all ${getInputBoxColor(
//                   evaluation.inputs[field.key].status
//                 )}`}
//               >
//                 <div className="px-3 py-2">
//                   <span className="text-xs font-medium text-gray-700">{field.label}</span>
//                 </div>
//                 <div className="px-3 pb-3 space-y-2">
//                   <select
//                     value={evaluation.inputs[field.key].status}
//                     onChange={(e) => updateInputStatus(field.key, e.target.value)}
//                     className="w-full border border-bg-gold/30 rounded px-2 py-1 text-xs bg-white"
//                   >
//                     <option>No Issues</option>
//                     <option>Minor Issues</option>
//                     <option>Major Issues</option>
//                   </select>

//                   {(evaluation.inputs[field.key].status === "Minor Issues" ||
//                     evaluation.inputs[field.key].status === "Major Issues") && (
//                     <>
//                       <input
//                         type="text"
//                         value={inputIssueTexts[field.key] || ""}
//                         onChange={(e) =>
//                           setInputIssueTexts({ ...inputIssueTexts, [field.key]: e.target.value })
//                         }
//                         placeholder="Describe the Issue"
//                         className="w-full border border-bg-gold/30 rounded px-2 py-1 text-xs bg-white"
//                       />
//                       <button
//                         type="button"
//                         className="text-xs text-gray-700 hover:text-gold"
//                         onClick={() => addInputIssue(field.key)}
//                       >
//                         + Add Issue
//                       </button>

//                       {evaluation.inputs[field.key].issues.length > 0 && (
//                         <div className="mt-2 space-y-1">
//                           {evaluation.inputs[field.key].issues.map((issue, idx) => (
//                             <div
//                               key={idx}
//                               className="text-xs text-gray-600 bg-white p-2 rounded border border-bg-gold/30"
//                             >
//                               • {issue}
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* CATEGORIES */}
//       <CategoryRating
//         rating={evaluation.completeness}
//         onRatingChange={(r) => updateRating("completeness", r)}
//         label="COMPLETENESS"
//         subtext="Does the response cover all expected/implied areas?"
//         categoryKey="completeness"
//       />

//       <CategoryRating
//         rating={evaluation.tone}
//         onRatingChange={(r) => updateRating("tone", r)}
//         label="TONE"
//         subtext="Is the tone appropriate for the audience and purpose?"
//         categoryKey="tone"
//       />

//       <CategoryRating
//         rating={evaluation.presentation}
//         onRatingChange={(r) => updateRating("presentation", r)}
//         label="PRESENTATION"
//         subtext="Is the response clear, structured, and easy to follow?"
//         categoryKey="presentation"
//       />

//       <CategoryRating
//         rating={evaluation.verbosity}
//         onRatingChange={(r) => updateRating("verbosity", r)}
//         label="VERBOSITY"
//         subtext="Is the length appropriate without unnecessary repetition?"
//         categoryKey="verbosity"
//       />

//       <CategoryRating
//         rating={evaluation.other}
//         onRatingChange={(r) => updateRating("other", r)}
//         label="OTHER"
//         subtext="Are there any other considerations affecting quality?"
//         categoryKey="other"
//       />

//       {/* SCORE */}
//       <div className="flex flex-col gap-2">
//         <button
//           type="button"
//           onClick={generateScore}
//           className="w-full bg-gold text-white py-2 rounded font-semibold text-xs"
//         >
//           GENERATE SCORE
//         </button>

//         {scoreGenerated && (
//           <div
//             className={`w-full py-2 rounded font-semibold text-xs text-center ${
//               evaluation.totalScore >= 90
//                 ? "bg-green-500 text-white"
//                 : evaluation.totalScore >= 70
//                 ? "bg-yellow-500 text-black"
//                 : "bg-red-500 text-white"
//             }`}
//           >
//             {evaluation.totalScore} / 100
//           </div>
//         )}

//         {scoreGenerated && (
//           <button
//             type="button"
//             onClick={generateNewPrompt}
//             className="w-full bg-gold text-white py-2 rounded font-semibold text-xs"
//           >
//             GENERATE NEW PROMPT
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EvaluateResponseStep;



"use client";
import React, { useState } from "react";

interface EvaluateResponseStepProps {
  // Parent provides a function that takes the evaluation object and returns an improved prompt
  onRequestImprove?: (evaluation: any) => Promise<string | undefined>;
}

interface EvaluationData {
  objective: boolean;
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
  const [improving, setImproving] = useState(false);

  const [evaluation, setEvaluation] = useState<EvaluationData>({
    objective: true,
    inputs: {
      audience: { status: "No Issues", issues: [] },
      contentGoal: { status: "No Issues", issues: [] },
      coreMessage: { status: "No Issues", issues: [] },
      audienceMotivation: { status: "No Issues", issues: [] },
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
  };

  const updateInputStatus = (field: string, value: string) => {
    setEvaluation((prev) => ({
      ...prev,
      inputs: {
        ...prev.inputs,
        [field]: { ...prev.inputs[field], status: value },
      },
    }));
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
  };

  const updateCategoryRating = (category: string, value: number) => {
    setEvaluation((prev) => ({ ...prev, [category]: value }));
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
  };

  const updateCategoryIssueText = (category: string, value: string) => {
    setCategoryIssueTexts((prev) => ({ ...prev, [category]: value }));
  };

  const getInputBoxColor = (status: string) => {
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

    for (const [key, input] of Object.entries(updatedInputs)) {
      if ((input.status === "Minor Issues" || input.status === "Major Issues") && input.issues.length === 0) {
        alert(`Please add at least one issue for ${inputFields.find(f => f.key === key)?.label}`);
        return;
      }
    }

    if (!evaluation.objective && !rewriteObjective.trim()) {
      alert("Please rewrite the objective or select 'YES'");
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
    setScoreGenerated(true);
  };

  const generateNewPrompt = () => {
    // placeholder: parent will be called via onRequestImprove prop
  };

  return (
    <div className="max-w-3xl border border-gold/30 mx-auto p-4 flex flex-col gap-2 mb-3 bg-ivory rounded-xl">
      {/* OBJECTIVE */}
      <div className="bg-ivory border border-gold/30 rounded p-4 shadow-sm">
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
                  evaluation.objective
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
                  !evaluation.objective
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
      <div className="bg-ivory border border-gold/30 rounded p-4 shadow-sm">
        <h3 className="font-bold text-gray-900 text-sm mb-1 uppercase">INPUTS</h3>
        <p className="text-gray-500 text-xs italic mb-3">
          Does the response address each input correctly?
        </p>

        {!evaluationStarted ? (
          <button
            type="button"
            onClick={() => setEvaluationStarted(true)}
            className="w-full bg-gold text-white py-2 text-xs rounded font-semibold"
          >
            Begin Evaluation
          </button>
        ) : (
          <div className="space-y-1">
            {inputFields.map((field) => (
              <div
                key={field.key}
                className={`border-2 rounded transition-all ${getInputBoxColor(
                  evaluation.inputs[field.key].status
                )}`}
              >
                <div className="px-3 py-2">
                  <span className="text-xs font-medium text-gray-700">{field.label}</span>
                </div>
                <div className="px-3 pb-3 space-y-1">
                  <select
                    value={evaluation.inputs[field.key].status}
                    onChange={(e) => updateInputStatus(field.key, e.target.value)}
                    className="w-full border border-bg-gold/30 rounded px-2 py-1 text-xs bg-white"
                  >
                    <option>No Issues</option>
                    <option>Minor Issues</option>
                    <option>Major Issues</option>
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
              </div>
            ))}
          </div>
        )}
      </div>

      {/* COMPLETENESS */}
      <div className=" bg-ivory rounded border border-gold/30 p-4 ">
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
      <div className=" bg-ivory rounded border border-gold/30 p-4 ">
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
      <div className=" bg-ivory rounded border border-gold/30 p-4 ">
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
      <div className=" bg-ivory rounded border border-gold/30 p-4 ">
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
      <div className=" bg-ivory rounded border border-gold/30 p-4">
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
        <button
          type="button"
          onClick={generateScore}
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
            <button
              type="button"
              onClick={generateNewPrompt}
              className="w-full bg-gold text-white py-2 rounded font-semibold text-xs"
            >
              GENERATE NEW PROMPT
            </button>

            {/* Reiterate Prompt - calls parent to create an improved prompt based on evaluation */}
            <button
              type="button"
              onClick={async () => {
                if (!onRequestImprove) return;
                setImproving(true);
                try {
                  await onRequestImprove(evaluation);
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