"use client";
import React, { useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { getModelsInOrder, isModelAvailable } from "../../lib/aiModels";
import { usePromptEng } from "../../context/PromptEngContext";

interface GenerateResponseProps {
  generatedPrompt: string;
  // Parent will provide a handler that performs the network call and returns the response text
  onGenerateResponse: (prompt?: string) => Promise<string | undefined>;
  onOpenManualEdit?: () => void; // ✅ NEW: callback to open manual edit modal
}

const GenerateResponse: React.FC<GenerateResponseProps> = ({
  generatedPrompt,
  onGenerateResponse,
  onOpenManualEdit,
}) => {
  const { selectedModel, setSelectedModel } = usePromptEng();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const availableModels = getModelsInOrder();

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setError("");

      if (!generatedPrompt || generatedPrompt.trim() === "") {
        setError("Please generate a prompt first before generating response");
        setLoading(false);
        return;
      }

      if (!selectedModel) {
        setError("Please select a model to generate response");
        setLoading(false);
        return;
      }

      // ✅ Handle manual mode - open edit modal instead of calling AI
      if (selectedModel === "manual") {
        setLoading(false);
        if (onOpenManualEdit) {
          onOpenManualEdit();
        }
        return;
      }

      if (!isModelAvailable(selectedModel)) {
        setError(`${selectedModel.charAt(0).toUpperCase() + selectedModel.slice(1)} is coming soon and not available yet. Please select ChatGPT for now.`);
        setLoading(false);
        return;
      }

      // Delegate the actual network call to the parent to avoid duplicate API calls
      const responseText = await onGenerateResponse(generatedPrompt);

      if (!responseText) {
        setError("No response received from server.");
      }
    } catch (err: any) {
      console.error("GenerateResponse error:", err);
      setError(err?.message || "Failed to generate response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="rounded-xl border border-gold/30 p-2 md:p-4 mb-4 custom-scroll">
      <div className="flex items-center mb-2">
        <h2 className="text-base sm:text-lg text-black mb-3 sm:mb-1">
          <strong>IX. Generate Response</strong>
        </h2>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Select Model */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Model <span className="text-red-500">*</span>
        </label>
        <select
          className="w-full px-3 py-2 border border-gold/30 rounded-md bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          disabled={loading}
          required
        >
          <option value="">Choose a model...</option>
          {/* Manual option (top) - exact wording per request */}
          <option value="manual">Manual (Use Personal Model)</option>
          {availableModels.map((model) => (
            <option key={model.id} value={model.id} disabled={!model.available}>
              {model.name}{!model.available ? ' - Coming Soon' : ''}
            </option>
          ))}
        </select>
        
        {/* Show availability message */}
        {selectedModel && !isModelAvailable(selectedModel) && selectedModel !== "manual" && (
          <p className="mt-1 text-sm text-orange-600">
            {/* This model is coming soon and not available yet. Please select ChatGPT for now. */}
          </p>
        )}
        {/* Show manual mode message */}
        {selectedModel === "manual" && (
          <p className="mt-1 text-sm text-blue-600">
            💡 Manual mode: Click "Add Manual Response" to paste your own response and save AI tokens.
          </p>
        )}
      </div>

      {/* Generate Button - white loading style to match OutputDesign */}
      <button
        className={`w-full py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed ${
          loading ? "bg-white text-gold border border-gold/30" : "bg-gold text-white"
        }`}
        onClick={handleGenerate}
        disabled={loading || !generatedPrompt || !selectedModel}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-gold" />
            <span className="text-gold">Generating Response...</span>
          </>
        ) : selectedModel === "manual" ? (
          "Add Manual Response"
        ) : (
          "Generate Response"
        )}
      </button>
    </div>
  );
};

export default GenerateResponse;