"use client";
import React from "react";
import Image from "next/image";
import { usePromptEng } from "../../context/PromptEngContext";
import DefineObjective from "./DefineObjective";
import ChoosePath from "./ChoosePath";
import BusinessContextStep from "./BusinessContextStep";
import FreeformContextStep from "./FreeformContextStep";
import OutputDesign from "./OutputDesign";
import GeneratedPromptStep from "./GeneratedPromptStep";
import EvaluateResponseStep from "./EvaluateResponseStep";
import IterateImproveStep from "./IterateImproveStep";
import SetToneStep from "./SetToneStep";
import InsertReferences from "./InsertRefernces";
import GenerateResponse from "./GenerateResponse";
import {
  ChevronDown,
  ChevronUp,
  Target,
  BookOpen,
  FileText,
  Sparkles,
  RefreshCcw,
  View,
} from "lucide-react";
import ViewResponse from "./ViewResponse";
import SavePromptModal from "./SavePromptModal";
import { useState } from "react";

export type ContextData = {
  [key: string]: any;
  dynamicFields?: Record<string, any>;
  customFieldsByGroup?: Record<string, string[]>; // ✅ added
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
  const {
    // State from context
    taskObjective,
    setTaskObjective,
    selectedContext,
    setSelectedContext,
    contextData,
    setContextData,
    insertReferences,
    setInsertReferences,
    references,
    setReferences,
    outputFormat,
    setOutputFormat,
    promptStructure,
    setPromptStructure,
    length,
    setLength,
    showOutputForm,
    setShowOutputForm,
    generatedPrompt,
    aiResponse,
    evaluation,
    toneData,
    setToneData,
    showTestResponse,
    setShowTestResponse,
    showInstructions,
    setShowInstructions,
    
    // API functions from context
    generatePromptFromServer,
    generateResponseFromServer,
    improvePromptFromServer,
  savePromptToLibrary,
  isSavingPrompt,
    
    // Handler functions from context
    handlePromptGenerated,
    handleTestComplete,
    handleEvaluationComplete,
    handleImprove,
    
    // Loading states
    isGeneratingPrompt,
    isGeneratingResponse,
    isImprovingPrompt,
  } = usePromptEng();

  // Local UI state for Save modal (moved here so modal covers entire area and can blur background)
  const [showSaveModal, setShowSaveModal] = useState(false);

  const renderContextStep = () => {
    if (!selectedContext) return null; // 👈 by default nothing

    switch (selectedContext) {
      case "guidedmode":
        return (
          <BusinessContextStep
            contextData={contextData}
            setContextData={setContextData}
          />
        );
      case "flowmode":
        return (
          <FreeformContextStep
            contextData={contextData}
            setContextData={setContextData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/logoalchemist.png"
              alt="Logo"
              width={400}
              height={400}
              className="rounded-full"
            />
          </div>
          <h1 className="text-xl md:text-5xl font-bold text-gold mb-2">
            WELCOME TO THE PROMPT LAB
          </h1>
          <p className="max-w-2xl mx-auto text-gray text-semibold text-2xl mb-4">
            Craft prompts step-by-step and let AICHEMIST automatically refine
            them.
          </p>

          <div className="w-full max-w-2xl mx-auto mb-6">
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg text-gray border border-gold/30 font-medium  hover:bg-gold/30 transition"
            >
              <span>View Step-by-Step Instructions</span>
              {showInstructions ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>

            {showInstructions && (
              <div className="mt-4  text-lg p-4 text-left space-y-4">
                <div className="flex items-start space-x-3">
                  <Target className="w-5 h-5 text-gold mt-1" />
                  <p>
                    <strong>I. State Your Objective:</strong> Write what you
                    want to achieve in a short sentence
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <BookOpen className="w-5 h-5 text-gold mt-1" />
                  <p>
                    <strong>II. Provide Context:</strong> Add key background,
                    tone, and references needed
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-gold mt-1" />
                  <p>
                    <strong>III. Choose Output Method:</strong> Select your
                    desired format, length, and AI model
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <Sparkles className="w-5 h-5 text-gold mt-1" />
                  <p>
                    <strong>IV. Generate Prompt:</strong> Watch your inputs turn
                    into a refined and precise prompt
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <RefreshCcw className="w-5 h-5 text-gold mt-1" />
                  <p>
                    <strong>V. Test & Improve:</strong> Review output and give
                    feedback that automatically transforms to a new prompt
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

  {/* Steps Section */}
  <div className={`max-w-4xl mx-auto px-4 py-8 ${showSaveModal ? 'filter blur-sm pointer-events-none select-none' : ''}`}>
        <DefineObjective
          taskObjective={taskObjective}
          setTaskObjective={setTaskObjective}
        />
        <ChoosePath
          selectedContext={selectedContext}
          setSelectedContext={setSelectedContext}
        />

        {/* Context-based components render only when user selects something */}
        {renderContextStep()}

        {/* Neeche ka sab bhi sirf tab dikhe jab context select hua ho */}
        {selectedContext && (
          <>
            <SetToneStep toneData={toneData} setToneData={setToneData} />

            <InsertReferences
              references={insertReferences}
              setReferences={setInsertReferences}
            />

            <OutputDesign
              references={references}
              setReferences={setReferences}
              outputFormat={outputFormat}
              setOutputFormat={setOutputFormat}
              length={length}
              setLength={setLength}
              onGenerate={async () => {
                try {
                  await generatePromptFromServer();
                  setShowOutputForm(true);
                } catch (err: any) {
                  console.error('generatePromptFromServer failed', err);
                  // Show a clear message so mobile users / QA know why nothing happened
                  const message = err?.message || 'Failed to generate prompt. Please check your network or login status.';
                  // Using alert for now so it surfaces in environments without a toast system.
                  if (typeof window !== 'undefined') window.alert(message);
                }
              }}
            />

            {showOutputForm && (
              <>
                {/* <GeneratedPromptStep
                  taskDescription={taskObjective}
                  selectedContext={selectedContext}
                  contextData={contextData}
                  references={references}
                  outputFormat={outputFormat}
                  onPromptGenerated={handlePromptGenerated}
                /> */}
{showOutputForm && (
        <GeneratedPromptStep
          externalPrompt={generatedPrompt} // ✅ only show backend prompt
        />
      )}
                {/* yaha per ye compoennt rakhan ha resposne genrated ka */}
                <GenerateResponse
                  generatedPrompt={generatedPrompt}
                  onGenerateResponse={async (prompt?: string) => {
                    const text = await generateResponseFromServer(prompt);
                    if (text) {
                      setShowTestResponse(true);
                    }
                    return text;
                  }}
                />

                {showTestResponse && (
                  <>
                    {/* Test + Evaluate Section */}
                    <div className="flex flex-col lg:flex-row w-full space-x-0 lg:space-x-3  mt-6">
                      <div className="w-full lg:w-1/2 h-full flex">
                        <div className={`flex-1 h-full ${showSaveModal ? 'filter blur-sm pointer-events-none select-none' : ''}`}>
                          <ViewResponse
                            aiResponse={aiResponse}
                            onOpenSaveModal={() => setShowSaveModal(true)}
                          />
                        </div>
                      </div>

                      <div className="w-full lg:w-1/2 h-full flex">
                        <div className="flex-1 h-full">
                          <EvaluateResponseStep onRequestImprove={improvePromptFromServer} />
                        </div>
                      </div>
                    </div>

                    {/* Iterate + Improve Section */}
                    {/* <div className="">
                      <IterateImproveStep
                        evaluation={
                          evaluation || {
                            objective: true,
                            inputs: {
                              audience: "General audience",
                              contentGoal: "Inform",
                              coreMessage: "Sample core message",
                              audienceMotivation: "Learn something new",
                            },
                            completeness: 3,
                            tone: 4,
                            presentation: 5,
                          }
                        }
                        originalPrompt={generatedPrompt || "Sample prompt"}
                        onImprove={handleImprove}
                
                      />
                    </div> */}
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
      {/* Global Save Prompt Modal rendered at section level so overlay can blur the whole section */}
      <SavePromptModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onSave={async (title: string) => {
          try {
            await savePromptToLibrary(title);
            setShowSaveModal(false);
          } catch (err) {
            console.error('Save from modal failed', err);
            // leave modal open so user can retry or cancel
            throw err;
          }
        }}
        isLoading={isSavingPrompt}
      />
    </div>
  );
};

export default PromptEngSection;
