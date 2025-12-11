"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { usePromptEng } from "../../context/PromptEngContext";
import DefineObjective from "./DefineObjective";
// import ChoosePath from "./ChoosePath"; // ❌ No longer needed
import BusinessContextStep from "./BusinessContextStep";
// import FreeformContextStep from "./FreeformContextStep"; // ❌ No longer needed - now part of BusinessContextStep
import OutputDesign from "./OutputDesign";
import GeneratedPromptStep from "./GeneratedPromptStep";
import EvaluateResponseStep from "./EvaluateResponseStep";
// import IterateImproveStep from "./IterateImproveStep"; // ❌ Commented - not currently used
import SetToneStep from "./SetToneStep";
import InsertReferences from "./InsertRefernces";
import GenerateResponse from "./GenerateResponse";
import IterationCycle from "./IterationCycle"; // ✅ NEW: For iteration cycles
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
import EditResponseModal from "./EditResponseModal";
import EditPromptModal from "./EditPromptModal";
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
    selectedCategory,
    setSelectedCategory,
    contextData,
    setContextData,
    insertReferences,
    setInsertReferences,
  referencesUsage,
  setReferencesUsage,
    references,
    setReferences,
    outputFormat,
    setOutputFormat,
    promptStructure,
    setPromptStructure,
    length,
    setLength,
    selectedModel,
    setSelectedModel,
    showOutputForm,
    setShowOutputForm,
    generatedPrompt,
    aiResponse,
    setAiResponse,
    evaluation,
    toneData,
    setToneData,
    showTestResponse,
    setShowTestResponse,
    showInstructions,
    setShowInstructions,
    
    // ✅ NEW: Iteration management
    iterations,
    addIteration,
    updateIterationResponse,
    updateIterationPrompt,
    updateIterationEvaluation,
    toggleIterationCollapse,
    currentIterationId,
    
    // API functions from context
    generatePromptFromServer,
    generateResponseFromServer,
    improvePromptFromServer,
    savePromptToLibrary,
    isSavingPrompt,
    clearFormData,
    loadPromptData,
    
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
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingIterationId, setEditingIterationId] = useState<string | null>(null); // ✅ Track which iteration is being edited
  const [showEditPromptModal, setShowEditPromptModal] = useState(false);
  const [editingPromptIterationId, setEditingPromptIterationId] = useState<string | null>(null);
  const [evaluateEnabled, setEvaluateEnabled] = useState(false);
  const [showClearConfirmModal, setShowClearConfirmModal] = useState(false);

  // Check for promptToEdit in localStorage on mount (from library edit action)
  useEffect(() => {
    const promptToEdit = localStorage.getItem('promptToEdit');
    if (promptToEdit) {
      try {
        const promptData = JSON.parse(promptToEdit);
        loadPromptData(promptData);
        // Clear the flag after loading
        localStorage.removeItem('promptToEdit');
      } catch (error) {
        console.error("Error loading prompt to edit:", error);
      }
    }
  }, []); // Empty dependency array - only run once on mount

  // Monitor iterations state changes
  useEffect(() => {
    const iterationsArray = Array.isArray(iterations) ? iterations : [];
    // Iterations state updated: length = iterationsArray.length
      if (iterationsArray.length > 0) {
        // Iterations exist
      // Iterations loaded
    } else {
      // Iterations array is EMPTY - UI will not render
    }
  }, [iterations]);

  // Derived flag: allow rendering advanced steps/iterations if we already have data
  const canRenderAdvanced = !!selectedCategory || (Array.isArray(iterations) && iterations.length > 0) || !!generatedPrompt;
  // Quick debug for render gating
  if (typeof window !== 'undefined') {
    // Render flags: selectedCategory, showOutputForm, iterationsCount, generatedPromptExists, canRenderAdvanced
  }

  // ❌ No longer need renderContextStep - BusinessContextStep handles all categories including General

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
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg text-gray border border-gold/30 font-medium hover:bg-gold/30 transition"
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
  <div className={`max-w-4xl mx-auto px-4 py-8 ${showSaveModal || showEditModal || showClearConfirmModal ? 'filter blur-sm pointer-events-none select-none' : ''}`}>
        {/* Clear Form Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowClearConfirmModal(true)}
            className="text-sm px-3 py-1.5 rounded-md text-gray border border-gold/20 hover:border-gold/40 hover:bg-gold/5 transition-all duration-200 flex items-center gap-1.5"
            title="Clear all form data"
          >
            <RefreshCcw size={14} />
            <span>Clear Form</span>
          </button>
        </div>
        
        <DefineObjective
          taskObjective={taskObjective}
          setTaskObjective={setTaskObjective}
        />
        
        {/* ❌ Removed ChoosePath - No longer needed */}
        {/* <ChoosePath selectedContext={selectedContext} setSelectedContext={setSelectedContext} /> */}

        {/* ✅ BusinessContextStep now handles all categories including General */}
        <BusinessContextStep
          contextData={contextData}
          setContextData={setContextData}
        />

        {/* ✅ Show rest of form when a category is selected OR we already have iterations/prompt (e.g., editing) */}
        {canRenderAdvanced && (
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

            {(showOutputForm || (Array.isArray(iterations) && iterations.length > 0)) && (
              <>
                {/* ✅ Render ALL iterations including the initial one */}
                <div className="space-y-4">
                  {(() => {
                    const iterationsArray = Array.isArray(iterations) ? iterations : [];
                    // Rendering iterations - Total count: iterationsArray.length
                    
                    if (iterationsArray.length === 0) {
                      return (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                          <p className="text-yellow-700">No iterations found. Please generate a prompt first.</p>
                        </div>
                      );
                    }
                    
                    return iterationsArray.map((iteration, index) => {
                      // Rendering iteration: index + 1, id: iteration.id
                      return (
                        <IterationCycle
                          key={iteration.id}
                          iterationNumber={index + 1}
                          iterationId={iteration.id}
                          prompt={iteration.prompt}
                          response={iteration.response}
                          evaluation={iteration.evaluation}
                          isCollapsed={iteration.isCollapsed}
                          onToggleCollapse={() => toggleIterationCollapse(iteration.id)}
                          onGenerateResponse={async (prompt) => {
                            const text = await generateResponseFromServer(prompt || iteration.prompt, iteration.id);
                            return text;
                          }}
                          onRequestImprove={async (evalData) => {
                            // Update evaluation for this iteration
                            updateIterationEvaluation(iteration.id, evalData);
                            // Create next iteration
                            const improvedPrompt = await improvePromptFromServer(evalData, iteration.id);
                            return improvedPrompt;
                          }}
                          onOpenSaveModal={() => setShowSaveModal(true)}
                          onOpenEditResponse={() => {
                            setEditingIterationId(iteration.id);
                            setShowEditModal(true);
                          }}
                          onOpenEditPrompt={() => {
                            setEditingPromptIterationId(iteration.id);
                            setShowEditPromptModal(true);
                          }}
                        />
                      );
                    });
                  })()}
                </div>
              </>
            )}
            </>
          )}
      </div>
      {/* Global Save Prompt Modal rendered at section level so overlay can blur the whole section */}
      <SavePromptModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onSave={async (title: string, projectName: string) => {
          try {
            await savePromptToLibrary(title, projectName);
            clearFormData(); // Clear form after successful save
            setShowSaveModal(false);
          } catch (err) {
            console.error('Save from modal failed', err);
            // leave modal open so user can retry or cancel
            throw err;
          }
        }}
        isLoading={isSavingPrompt}
      />

      {/* Global Edit Response Modal rendered at section level for center positioning */}
      <EditResponseModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingIterationId(null);
        }}
        aiResponse={editingIterationId ? (iterations.find(i => i.id === editingIterationId)?.response || '') : ''}
        onSave={(editedContent) => {
          if (editingIterationId) {
            updateIterationResponse(editingIterationId, editedContent);
          }
          setShowEditModal(false);
          setEditingIterationId(null);
        }}
      />

      {/* Global Edit Prompt Modal rendered at section level for center positioning */}
      <EditPromptModal
        isOpen={showEditPromptModal}
        onClose={() => {
          setShowEditPromptModal(false);
          setEditingPromptIterationId(null);
        }}
        prompt={editingPromptIterationId ? (iterations.find(i => i.id === editingPromptIterationId)?.prompt || '') : ''}
        onSave={(editedPrompt) => {
          if (editingPromptIterationId) {
            updateIterationPrompt(editingPromptIterationId, editedPrompt);
          }
          setShowEditPromptModal(false);
          setEditingPromptIterationId(null);
        }}
      />

      {/* Clear Form Confirmation Modal */}
      {showClearConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full shadow-xl">
            <div className="px-6 py-4 border-b border-gold/20">
              <h2 className="text-xl font-bold text-black">Clear Form Data</h2>
            </div>
            
            <div className="p-6">
              <p className="text-gray mb-6">
                You have unsaved work. Would you like to save your prompt to the library before clearing the form?
              </p>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => {
                    setShowClearConfirmModal(false);
                    setShowSaveModal(true);
                  }}
                  className="w-full bg-gold text-white px-6 py-3 rounded-md hover:bg-gold/90 transition-colors font-medium"
                >
                  Save to Library
                </button>
                <button 
                  onClick={() => {
                    clearFormData();
                    setShowClearConfirmModal(false);
                  }}
                  className="w-full bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors font-medium"
                >
                  Discard & Clear Form
                </button>
                <button 
                  onClick={() => setShowClearConfirmModal(false)}
                  className="w-full bg-gray/10 text-gray px-6 py-3 rounded-md hover:bg-gray/20 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptEngSection;
