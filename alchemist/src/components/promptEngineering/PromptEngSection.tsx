"use client";
import React, { useState } from 'react';
import DefineTaskStep from './DefineTaskStep';
import ChoosePath from './ChoosePath';
import BusinessContextStep from './BusinessContextStep';
import FreeformContextStep from './FreeformContextStep';
import OutputDesign from './OutputDesign';
import GeneratedPromptStep from './GeneratedPromptStep';
import TestAIResponseStep from './TestAIResponseStep';
import EvaluateResponseStep from './EvaluateResponseStep';
import IterateImproveStep from './IterateImproveStep';
import SetToneStep from './SetToneStep';
import InsertReferences from './InsertRefernces';
import GenerateResponse from './GenerateResponse';
export type ContextData = {
  [key: string]: any;
  dynamicFields?: Record<string, any>;
  customFields?: string[];
  freeformContext?: string;
};

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


const PromptEngSection: React.FC = () => {
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedContext, setSelectedContext] = useState<'flowmode' | 'guidedmode' | null>(null);
  const [contextData, setContextData] = useState<ContextData>({});
  const [insertReferences, setInsertReferences] = useState('');
  const [references, setReferences] = useState('');
  const [outputFormat, setOutputFormat] = useState('');
  const [promptFormat, setPromptFormat] = useState('');
  const [length, setLength] = useState('');
  const [showOutputForm, setShowOutputForm] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [evaluation, setEvaluation] = useState<EvaluationData | null>(null);
  const [toneData, setToneData] = useState<string[]>([]);
  const [showTestResponse, setShowTestResponse] = useState(false);



  const handlePromptGenerated = (prompt: string) => {
    setGeneratedPrompt(prompt);
  };

  const handleTestComplete = (response: string) => {
    setAiResponse(response);
  };

  const handleEvaluationComplete = (evaluationData: EvaluationData) => {
    setEvaluation(evaluationData);
  };

  const handleImprove = (improvedPrompt: string) => {
    setGeneratedPrompt(improvedPrompt);
    setAiResponse('');
  };

  const renderContextStep = () => {
    if (!selectedContext) return null; // 👈 by default nothing

    switch (selectedContext) {
      case 'guidedmode':
        return <BusinessContextStep contextData={contextData} setContextData={setContextData} />;
      case 'flowmode':
        return <FreeformContextStep contextData={contextData} setContextData={setContextData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-xl md:text-3xl font-bold text-gold mb-2">AIChemist Laboratory</h1>
          <p className="text-gray mb-4">
            Systematically create, evaluate, and refine prompts to consistently achieve high-quality (5/5) AI outputs
          </p>
          <div className="flex justify-center space-x-4 flex-wrap gap-2">
            <span className="text-gold border-[0.5px] border-gold px-3 py-1 rounded-full text-sm">
              No Credits Available
            </span>
            <span className="text-gold border-[0.5px] border-gold px-3 py-1 rounded-full text-sm">
              0 Iterations
            </span>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <DefineTaskStep taskDescription={taskDescription} setTaskDescription={setTaskDescription} />
        <ChoosePath selectedContext={selectedContext} setSelectedContext={setSelectedContext} />

        {/* Context-based components render only when user selects something */}
        {renderContextStep()}

        {/* Neeche ka sab bhi sirf tab dikhe jab context select hua ho */}
        {selectedContext && (
          <>
            <SetToneStep toneData={toneData} setToneData={setToneData} />

            <InsertReferences references={insertReferences} setReferences={setInsertReferences} />

            <OutputDesign
              references={references}
              setReferences={setReferences}
              outputFormat={outputFormat}
              setOutputFormat={setOutputFormat}
              promptFormat={promptFormat}
              setPromptFormat={setPromptFormat}
              length={length}
              setLength={setLength}
              onGenerate={() => setShowOutputForm(true)}
            />

            {showOutputForm && (
              <>
                <GeneratedPromptStep
                  taskDescription={taskDescription}
                  selectedContext={selectedContext}
                  contextData={contextData}
                  references={references}
                  outputFormat={outputFormat}
                  onPromptGenerated={handlePromptGenerated}
                />

                {/* yaha per ye compoennt rakhan ha resposne genrated ka */}
<GenerateResponse
  generatedPrompt={generatedPrompt}
  onResponseGenerated={(response) => {
    setAiResponse(response);       // set AI response
    setShowTestResponse(true);     // show TestAIResponseStep
  }}
/>




             {showTestResponse && (
              <>
              {/* Test + Evaluate Section */}
                <div className="flex flex-col lg:flex-row w-full gap-4 items-stretch mt-6">
                  <div className="w-full lg:w-1/2 h-full flex">
                    <div className="flex-1 h-full">
                     <TestAIResponseStep
  aiResponse={aiResponse}
  onTestComplete={setAiResponse}
/>
                    </div>
                  </div>

                  <div className="w-full lg:w-1/2 h-full flex">
                    <div className="flex-1 h-full">
                      <EvaluateResponseStep
                        aiResponse={aiResponse || "Sample AI response for testing"}
                        onEvaluationComplete={handleEvaluationComplete}
                      />
                    </div>
                  </div>
                </div>

                {/* Iterate + Improve Section */}
                <div className="mt-6">
                  <IterateImproveStep
                    evaluation={evaluation || {
                      objective: true,
                      inputs: {
                        audience: "General audience",
                        contentGoal: "Inform",
                        coreMessage: "Sample core message",
                        audienceMotivation: "Learn something new"
                      },
                      completeness: 3,
                      tone: 4,
                      presentation: 5
                    }}
                    originalPrompt={generatedPrompt || "Sample prompt"}
                    onImprove={handleImprove}
                  />
                </div>
                </>
  
)}   
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PromptEngSection;
