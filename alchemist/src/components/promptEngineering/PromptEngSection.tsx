"use client";
import React, { useState } from "react";
import Image from "next/image";
import DefineObjective from "./DefineObjective";
import ChoosePath from "./ChoosePath";
import BusinessContextStep from "./BusinessContextStep";
import FreeformContextStep from "./FreeformContextStep";
import OutputDesign from "./OutputDesign";
import GeneratedPromptStep from "./GeneratedPromptStep";
import TestAIResponseStep from "./ViewResponse";
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
} from "lucide-react";

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
  const [taskObjective, setTaskObjective] = useState("");
  const [selectedContext, setSelectedContext] = useState<
    "flowmode" | "guidedmode" | null
  >(null);
  const [contextData, setContextData] = useState<ContextData>({});
  const [insertReferences, setInsertReferences] = useState("");
  const [references, setReferences] = useState("");
  const [outputFormat, setOutputFormat] = useState("");
  const [promptStrucure, setPromptStrucure] = useState("");
  const [length, setLength] = useState("");
  const [showOutputForm, setShowOutputForm] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [evaluation, setEvaluation] = useState<EvaluationData | null>(null);
  const [toneData, setToneData] = useState<string[]>([]);
  const [showTestResponse, setShowTestResponse] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

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
    setAiResponse("");
  };

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
      <div className="max-w-6xl mx-auto px-4 py-8">
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
              promptStrucure={promptStrucure}
              setPromptStrucure={setPromptStrucure}
              length={length}
              setLength={setLength}
              onGenerate={() => setShowOutputForm(true)}
            />

            {showOutputForm && (
              <>
                <GeneratedPromptStep
                  taskDescription={taskObjective}
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
                    setAiResponse(response); // set AI response
                    setShowTestResponse(true); // show TestAIResponseStep
                  }}
                />

                {showTestResponse && (
                  <>
                    {/* Test + Evaluate Section */}
                    <div className="flex flex-col lg:flex-row w-full space-x-20  mt-6">
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
                            aiResponse={
                              aiResponse || "Sample AI response for testing"
                            }
                            onEvaluationComplete={handleEvaluationComplete}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Iterate + Improve Section */}
                    <div className="mt-6">
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
                        promptStrucure={promptStrucure}
                        setPromptStrucure={setPromptStrucure}
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
