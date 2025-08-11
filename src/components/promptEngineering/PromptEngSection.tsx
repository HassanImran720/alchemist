// "use client";
// import React, { useState } from 'react';
// import DefineTaskStep from './DefineTaskStep';
// import ChooseContextStep from './ChooseContextStep';
// import BusinessContextStep from './BusinessContextStep';
// import PersonalContextStep from './PersonalContextStep';
// import FreeformContextStep from './FreeformContextStep';
// import ReferencesStep from './ReferencesStep';
// import GeneratedPromptStep from './GeneratedPromptStep';

// export type ContextData = {
//   [key: string]: any;
//   dynamicFields?: Record<string, any>;
//   customFields?: string[];
//   freeformContext?: string;
// };

// const PromptEngSection: React.FC = () => {
//   const [taskDescription, setTaskDescription] = useState('');
//   const [selectedContext, setSelectedContext] = useState<'freeform' | 'business' | 'personal'>('freeform');
//   const [contextData, setContextData] = useState<ContextData>({});
//   const [references, setReferences] = useState('');
//   const [outputFormat, setOutputFormat] = useState('');
//   const [promptFormat, setPromptFormat] = useState('');
//   const [showOutputForm, setShowOutputForm] = useState(false);

//   const renderContextStep = () => {
//     switch (selectedContext) {
//       case 'business':
//         return <BusinessContextStep contextData={contextData} setContextData={setContextData} />;
//       case 'personal':
//         return <PersonalContextStep contextData={contextData} setContextData={setContextData} />;
//       default:
//         return <FreeformContextStep contextData={contextData} setContextData={setContextData} />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="py-6">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <h1 className="text-3xl font-bold text-gold mb-2">AIChemist Laboratory</h1>
//           <p className="text-gray mb-4">
//             Systematically create, evaluate, and refine prompts to consistently achieve high-quality (5/5) AI outputs
//           </p>
//           <div className="flex justify-center space-x-4">
//             <span className="text-gold border-[0.5px] border-gold px-3 py-1 rounded-full text-sm">
//               No Credits Available
//             </span>
//             <span className="text-gold border-[0.5px] border-gold px-3 py-1 rounded-full text-sm">
//               0 Iterations
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-4xl mx-auto px-4 py-8">
//         <DefineTaskStep taskDescription={taskDescription} setTaskDescription={setTaskDescription} />
//         <ChooseContextStep selectedContext={selectedContext} setSelectedContext={setSelectedContext} />
//         {renderContextStep()}

//         <ReferencesStep
//           references={references}
//           setReferences={setReferences}
//           outputFormat={outputFormat}
//           setOutputFormat={setOutputFormat}
//           promptFormat={promptFormat}
//           setPromptFormat={setPromptFormat}
//           onGenerate={() => setShowOutputForm(true)}
//         />

//         {showOutputForm && (
//           <GeneratedPromptStep
//             taskDescription={taskDescription}
//             selectedContext={selectedContext}
//             contextData={contextData}
//             references={references}
//             outputFormat={outputFormat}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default PromptEngSection;

"use client";
import React, { useState } from 'react';
import DefineTaskStep from './DefineTaskStep';
import ChooseContextStep from './ChooseContextStep';
import BusinessContextStep from './BusinessContextStep';
import PersonalContextStep from './PersonalContextStep';
import FreeformContextStep from './FreeformContextStep';
import ReferencesStep from './ReferencesStep';
import GeneratedPromptStep from './GeneratedPromptStep';
import TestAIResponseStep from './TestAIResponseStep';
import EvaluateResponseStep from './EvaluateResponseStep';
import IterateImproveStep from './IterateImproveStep';

export type ContextData = {
  [key: string]: any;
  dynamicFields?: Record<string, any>;
  customFields?: string[];
  freeformContext?: string;
};

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

const PromptEngSection: React.FC = () => {
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedContext, setSelectedContext] = useState<'freeform' | 'business' | 'personal'>('freeform');
  const [contextData, setContextData] = useState<ContextData>({});
  const [references, setReferences] = useState('');
  const [outputFormat, setOutputFormat] = useState('');
  const [promptFormat, setPromptFormat] = useState('');
  const [showOutputForm, setShowOutputForm] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [evaluation, setEvaluation] = useState<EvaluationData | null>(null);
  const [showTestStep, setShowTestStep] = useState(false);
  const [showEvaluateStep, setShowEvaluateStep] = useState(false);
  const [showIterateStep, setShowIterateStep] = useState(false);

  const handlePromptGenerated = (prompt: string) => {
    setGeneratedPrompt(prompt);
    setShowTestStep(true);
  };

  const handleTestComplete = (response: string) => {
    setAiResponse(response);
    setShowEvaluateStep(true);
  };

  const handleEvaluationComplete = (evaluationData: EvaluationData) => {
    setEvaluation(evaluationData);
    setShowIterateStep(true);
  };

  const handleImprove = (improvedPrompt: string) => {
    setGeneratedPrompt(improvedPrompt);
    // Reset the flow for testing the improved prompt
    setAiResponse('');
    setShowTestStep(true);
    setShowEvaluateStep(false);
    setShowIterateStep(false);
  };

  const renderContextStep = () => {
    switch (selectedContext) {
      case 'business':
        return <BusinessContextStep contextData={contextData} setContextData={setContextData} />;
      case 'personal':
        return <PersonalContextStep contextData={contextData} setContextData={setContextData} />;
      default:
        return <FreeformContextStep contextData={contextData} setContextData={setContextData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gold mb-2">AIChemist Laboratory</h1>
          <p className="text-gray mb-4">
            Systematically create, evaluate, and refine prompts to consistently achieve high-quality (5/5) AI outputs
          </p>
          <div className="flex justify-center space-x-4">
            <span className="text-gold border-[0.5px] border-gold px-3 py-1 rounded-full text-sm">
              No Credits Available
            </span>
            <span className="text-gold border-[0.5px] border-gold px-3 py-1 rounded-full text-sm">
              0 Iterations
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <DefineTaskStep taskDescription={taskDescription} setTaskDescription={setTaskDescription} />
        <ChooseContextStep selectedContext={selectedContext} setSelectedContext={setSelectedContext} />
        {renderContextStep()}

        <ReferencesStep
          references={references}
          setReferences={setReferences}
          outputFormat={outputFormat}
          setOutputFormat={setOutputFormat}
          promptFormat={promptFormat}
          setPromptFormat={setPromptFormat}
          onGenerate={() => setShowOutputForm(true)}
        />

        {showOutputForm && (
          <GeneratedPromptStep
            taskDescription={taskDescription}
            selectedContext={selectedContext}
            contextData={contextData}
            references={references}
            outputFormat={outputFormat}
            onPromptGenerated={handlePromptGenerated}
          />
        )}

        {/* {showTestStep && generatedPrompt && (
          <TestAIResponseStep
            generatedPrompt={generatedPrompt}
            onTestComplete={handleTestComplete}
          />
        )}

        {showEvaluateStep && aiResponse && (
          <EvaluateResponseStep
            aiResponse={aiResponse}
            onEvaluationComplete={handleEvaluationComplete}
          />
        )}

        {showIterateStep && evaluation && (
          <IterateImproveStep
            evaluation={evaluation}
            originalPrompt={generatedPrompt}
            onImprove={handleImprove}
          />
        )} */}
<div className="flex w-full gap-4 items-stretch">
  {/* Test Step */}
  <div className="w-1/2 h-full flex">
    <div className="flex-1 h-full">
      <TestAIResponseStep
        generatedPrompt={generatedPrompt || "Sample generated prompt for testing"}
        onTestComplete={handleTestComplete}
      />
    </div>
  </div>

  {/* Evaluate Step */}
  <div className="w-1/2 h-full flex">
    <div className="flex-1 h-full">
      <EvaluateResponseStep
        aiResponse={aiResponse || "Sample AI response for testing"}
        onEvaluationComplete={handleEvaluationComplete}
      />
    </div>
  </div>
</div>


{/* Iterate Step */}
<IterateImproveStep
  evaluation={evaluation || {
    instructionFollowing: 5,
    truthfulness: 5,
    completeness: 3,
    tone: 4,
    presentation: 5,
    verbosity: 4,
    other: 5,
    issues: ["The response is missing a user persona.", "The response could use more sales terminology.", "The response is slightly verbose."],
    charms: 95
  }}
  originalPrompt={generatedPrompt || "Sample prompt"}
  onImprove={handleImprove}
/>

      </div>
    </div>
  );
};

export default PromptEngSection;