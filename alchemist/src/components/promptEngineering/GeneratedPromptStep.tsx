
"use client";
import React, { useState } from "react";
import { Copy, Check, Edit } from "lucide-react";
import { usePromptEng } from "../../context/PromptEngContext";

interface GeneratedPromptProps {
  externalPrompt?: string;
  onOpenEditPrompt?: () => void; // ✅ NEW: callback to open parent's edit modal
}

const GeneratedPromptStep: React.FC<GeneratedPromptProps> = ({
  externalPrompt = "",
  onOpenEditPrompt,
}) => {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const { savePromptToLibrary, isSavingPrompt } = usePromptEng();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(externalPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleSaveClick = () => {
    setShowSaveModal(true);
  };

  const handleSaveToLibrary = async (title: string) => {
    try {
      // Pass a default project name when called from this component
      await savePromptToLibrary(title, 'My Prompts');
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Failed to save prompt:", err);
      throw err; // Re-throw to let modal handle the error
    }
  };

  const handleEditClick = () => {
    if (onOpenEditPrompt) {
      onOpenEditPrompt(); // ✅ Use parent's handler
    }
  };

  return (
    <div className="rounded-xl border border-gold/30 p-4 sm:p-6 mb-4">
      <div className="flex items-center mb-2">
        <h2 className="text-base sm:text-lg text-black mb-3 sm:mb-1 font-semibold">
          VIII. Generated Prompt
        </h2>
      </div>

      <div className="bg-ivory border-[0.5px] border-gold/30 rounded-md p-4 mb-4 font-mono text-sm text-gray-800 whitespace-pre-wrap overflow-x-auto min-h-[200px] max-h-[400px] sm:max-h-[500px] custom-scroll">
        {externalPrompt ? externalPrompt : "No prompt generated yet."}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <button
          onClick={handleCopy}
          disabled={!externalPrompt}
          className="inline-flex items-center justify-center w-full sm:w-auto px-4 py-2 border-[0.5px] border-gold/30 rounded-md bg-ivory text-sm font-medium text-gray hover:bg-gold/10 transition"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2 text-green-600" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </>
          )}
        </button>
        
        <button
          onClick={handleEditClick}
          disabled={!externalPrompt}
          className="inline-flex items-center justify-center w-full sm:w-auto px-4 py-2 border-[0.5px] border-gold/30 rounded-md bg-ivory text-sm font-medium text-gray hover:bg-gold/10 transition"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Prompt
        </button>
      </div>
    </div>
  );
};

export default GeneratedPromptStep;
