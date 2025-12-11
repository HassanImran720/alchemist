"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import GeneratedPromptStep from "./GeneratedPromptStep";
import GenerateResponse from "./GenerateResponse";
import ViewResponse from "./ViewResponse";
import EvaluateResponseStep from "./EvaluateResponseStep";

interface IterationCycleProps {
  iterationNumber: number;
  iterationId: string;
  prompt: string;
  response: string;
  evaluation: any;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onGenerateResponse: (prompt?: string) => Promise<string | undefined>;
  onRequestImprove: (evaluation: any) => Promise<string | undefined>;
  onOpenSaveModal: () => void;
  onOpenEditResponse: () => void;
  onOpenEditPrompt: () => void; // ✅ NEW: open edit modal for prompt
}

const IterationCycle: React.FC<IterationCycleProps> = ({
  iterationNumber,
  iterationId,
  prompt,
  response,
  evaluation,
  isCollapsed,
  onToggleCollapse,
  onGenerateResponse,
  onRequestImprove,
  onOpenSaveModal,
  onOpenEditResponse,
  onOpenEditPrompt,
}) => {
  const [evaluateVisible, setEvaluateVisible] = useState(true); // ✅ Changed from evaluateEnabled - now controls visibility
  const [showResponse, setShowResponse] = useState(!!response);
  const [localEvaluation, setLocalEvaluation] = useState(evaluation); // ✅ Local state to preserve evaluation
  const containerRef = useRef<HTMLDivElement>(null);

  // ✅ Scroll new iteration into view when it's first rendered (only if not collapsed)
  useEffect(() => {
    if (!isCollapsed && containerRef.current && iterationNumber > 1) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, []); // Run only once on mount

  // Keep showResponse in sync with the incoming response prop so the response panel
  // only appears when there's actually a response to display. This prevents layout
  // jitter when opening the manual edit modal (we don't show an empty response area).
  React.useEffect(() => {
    setShowResponse(!!response);
  }, [response]);

  // ✅ Update local evaluation when prop changes
  React.useEffect(() => {
    if (evaluation) {
      setLocalEvaluation(evaluation);
    }
  }, [evaluation]);

  return (
    <div ref={containerRef} className="border-2 border-gold/40 rounded-xl bg-white shadow-lg mb-6">
      {/* Iteration Header - Collapsible */}
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gold/5 transition-colors border-b border-gold/20"
        onClick={onToggleCollapse}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold text-white flex items-center justify-center font-bold text-lg">
            {iterationNumber}
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900">
              Iteration {iterationNumber}
            </h3>
            <p className="text-xs text-gray-500">
              {response ? "Completed" : "In Progress"}
            </p>
          </div>
        </div>
        <button className="text-gray-600 hover:text-gold transition-colors">
          {isCollapsed ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
        </button>
      </div>

      {/* Iteration Content */}
      {!isCollapsed && (
        <div className="p-4 space-y-4">
          {/* Generated Prompt */}
          <GeneratedPromptStep 
            externalPrompt={prompt} 
            onOpenEditPrompt={onOpenEditPrompt}
          />

          {/* Generate Response */}
          <GenerateResponse
            generatedPrompt={prompt}
            onGenerateResponse={async (p) => {
              const text = await onGenerateResponse(p);
              if (text) setShowResponse(true);
              return text;
            }}
            onOpenManualEdit={() => {
              // Open edit modal for manual input. Do NOT set showResponse here —
              // we'll sync showResponse from the `response` prop once the user saves/pastes.
              onOpenEditResponse();
            }}
          />

          {/* Response & Evaluation */}
          {showResponse && response && (
            <>
              <div className="mb-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-gray-700">
                    {evaluateVisible ? 'Hide Evaluation' : 'Show Evaluation'}
                  </label>
                  <button
                    aria-pressed={evaluateVisible}
                    onClick={() => setEvaluateVisible((v) => !v)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors border border-gold/50 ${
                      evaluateVisible ? "bg-gold" : "bg-gray-300"
                    }`}
                  >
                    <span className="sr-only">Toggle evaluation visibility</span>
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full transition-transform duration-200 ease-in-out ${
                        evaluateVisible
                          ? "translate-x-5 bg-white"
                          : "translate-x-1 bg-gold"
                      }`}
                    />
                  </button>
                </div>
                {/* Edit Response Button */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={onOpenSaveModal}
                    className="px-3 py-1.5 text-xs font-medium rounded-md bg-white border border-gold/50 text-gold hover:bg-gold/10 transition-colors"
                  >
                    Finalize Response
                  </button>
                </div>
              </div>

              {evaluateVisible ? (
                // Add min-h-0 on flex parents/columns so children with overflow can shrink correctly
                <div className="flex flex-col lg:flex-row w-full space-x-0 lg:space-x-3 mt-6 min-h-0">
                  <div className="w-full lg:w-1/2 h-full flex min-h-0">
                    <div className="flex-1 h-full min-h-0">
                      <ViewResponse
                        aiResponse={response}
                        onOpenSaveModal={onOpenSaveModal}
                        onOpenEditModal={onOpenEditResponse}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2 h-full flex min-h-0">
                    <div className="flex-1 h-full min-h-0">
                      <EvaluateResponseStep
                        key={`eval-${iterationId}`}
                        initialEvaluation={localEvaluation}
                        onRequestImprove={async (evalData) => {
                          setLocalEvaluation(evalData); // ✅ Preserve locally
                          return await onRequestImprove(evalData);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-6 min-h-0">
                  <ViewResponse
                    aiResponse={response}
                    onOpenSaveModal={onOpenSaveModal}
                    onOpenEditModal={onOpenEditResponse}
                  />
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default IterationCycle;
