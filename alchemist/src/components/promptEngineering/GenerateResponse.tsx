// "use client";
// import React, { useState } from "react";

// interface GenerateResponseProps {
//   generatedPrompt: string;
//   onResponseGenerated: (response: string) => void;
// }

// const GenerateResponse: React.FC<GenerateResponseProps> = ({
//   generatedPrompt,
//   onResponseGenerated,
// }) => {
//   const [selectedModel, setSelectedModel] = useState("gpt-4o-mini");
//   const [loading, setLoading] = useState(false);

//   const handleGenerate = async () => {
//     try {
//       setLoading(true);
//       const promptToSend = generatedPrompt;
//       if (!promptToSend) {
//         onResponseGenerated("");
//         setLoading(false);
//         return;
//       }

//       const res = await fetch("/api/prompt/respond", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt: promptToSend, model: selectedModel, maxTokens: 800 }),
//       });

//       const data = await res.json();
//       if (data.error) throw new Error(data.error);
//       onResponseGenerated(data.text || "");
//     } catch (err) {
//       console.error("GenerateResponse error:", err);
//       onResponseGenerated("");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="rounded-xl border border-gold/30 p-2 md:p-4 mb-4 ">
//        <div className="flex items-center mb-2">
//       <h2 className=" text-base sm:text-lg text-black mb-3 sm:mb-1"><strong >IX. Generate Response

// </strong>
//  </h2>
//     </div>

//       {/* Select Model */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray mb-2">
//           Select Model or Paste Manually
//         </label>
//         <select
//           className="w-full px-3 py-2 border border-gold/30 rounded-md bg-gray-50 text-sm focus:outline-none"
//           value={selectedModel}
//           onChange={(e) => setSelectedModel(e.target.value)}
//         >
//           <option value="chatgpt">ChatGPT</option>
//           <option value="claude">Claude</option>
//           <option value="perplexity">Perplexity</option>
//           <option value="manual">Paste Manually</option>
//         </select>
//       </div>

//       {/* Generate Button */}
//       <button
//         className="w-full bg-gold text-white py-2 rounded-md text-sm font-medium hover:bg-yellow-600 transition"
//         onClick={handleGenerate}
//       >
//         Generate Response
//       </button>
//     </div>
//   );
// };

// export default GenerateResponse;



"use client";
import React, { useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { getAvailableModels, isModelAvailable } from "../../lib/aiModels";
import { usePromptEng } from "../../context/PromptEngContext";

interface GenerateResponseProps {
  generatedPrompt: string;
  // Parent will provide a handler that performs the network call and returns the response text
  onGenerateResponse: (prompt?: string) => Promise<string | undefined>;
}

const GenerateResponse: React.FC<GenerateResponseProps> = ({
  generatedPrompt,
  onGenerateResponse,
}) => {
  const { selectedModel, setSelectedModel } = usePromptEng();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const availableModels = getAvailableModels();

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
    <div className="rounded-xl border border-gold/30 p-2 md:p-4 mb-4">
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
          {availableModels.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name} {model.available ? '' : '(Coming Soon)'}
            </option>
          ))}
          {/* Show unavailable models with coming soon message */}
          <option value="claude" disabled>
            Claude (Anthropic) - Coming Soon
          </option>
          <option value="perplexity" disabled>
            Perplexity AI - Coming Soon
          </option>
        </select>
        
        {/* Show availability message */}
        {selectedModel && !isModelAvailable(selectedModel) && (
          <p className="mt-1 text-sm text-orange-600">
            This model is coming soon and not available yet. Please select ChatGPT for now.
          </p>
        )}
      </div>

      {/* Generate Button - white loading style to match OutputDesign */}
      <button
        className={`w-full py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed ${
          loading ? "bg-white text-gold border border-gold/30" : "bg-gold text-white"
        }`}
        onClick={handleGenerate}
        disabled={loading || !generatedPrompt || !selectedModel || !isModelAvailable(selectedModel)}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-gold" />
            <span className="text-gold">Generating Response...</span>
          </>
        ) : (
          "Generate Response"
        )}
      </button>
    </div>
  );
};

export default GenerateResponse;