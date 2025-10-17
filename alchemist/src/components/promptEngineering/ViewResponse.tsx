// // import { useRef, useEffect } from "react";

// // interface TestAIResponseStepProps {
// //   aiResponse: string;
// //   onTestComplete: (response: string) => void;
// // }

// // const ViewResponse: React.FC<TestAIResponseStepProps> = ({
// //   aiResponse,
// //   onTestComplete,
// // }) => {
// //   const textareaRef = useRef<HTMLTextAreaElement>(null);

// //   // auto resize function
// //   useEffect(() => {
// //     if (textareaRef.current) {
// //       textareaRef.current.style.height = "auto"; // reset height
// //       textareaRef.current.style.height = `${Math.min(
// //         textareaRef.current.scrollHeight,
// //         600 // max height in px before scroll
// //       )}px`;
// //     }
// //   }, [aiResponse]);

// //   return (
// //     <div className="rounded-xl border border-gold/30 p-2 md:p-4 mb-4 md:mb-8">
// //       <div className="flex items-center mb-4">
// //         <h2 className=" text-base sm:text-lg text-black mb-3 sm:mb-4">
// //           <strong>X. View Response:</strong>
// //         </h2>
// //       </div>

// //       <textarea
// //         ref={textareaRef}
// //         value={aiResponse}
// //         onChange={(e) => onTestComplete(e.target.value)}
// //         className="w-full p-4 border border-gold/30 rounded-md bg-ivory text-base resize-none focus:ring-2 focus:ring-gold overflow-auto"
// //         placeholder="Generated AI response will appear here..."
// //       />

// //       <div className="text-sm text-gray mt-3 leading-relaxed">
// //         Test your prompt with an AI model and edit the response if needed before
// //         evaluation. The box will expand to fit the text up to a limit, after
// //         which scrolling will appear.
// //       </div>
// //     </div>
// //   );
// // };

// // export default ViewResponse;


// "use client";
// import { useRef, useEffect } from "react";

// interface TestAIResponseStepProps {
//   aiResponse: string;
//   onTestComplete: (response: string) => void;
// }

// const ViewResponse: React.FC<TestAIResponseStepProps> = ({
//   aiResponse,
//   onTestComplete,
// }) => {
//   const textareaRef = useRef<HTMLTextAreaElement>(null);

//   // Auto-resize function
//   useEffect(() => {
//     if (textareaRef.current) {
//       textareaRef.current.style.height = "auto"; // reset height
//       textareaRef.current.style.height = `${Math.min(
//         textareaRef.current.scrollHeight,
//         600 // max height before scroll
//       )}px`;
//     }
//   }, [aiResponse]);

//   return (
//     <div className="rounded-xl border border-gold/30 p-2 md:p-4  mb-4 md:mb-8">
//       <div className="flex items-center mb-3 sm:mb-4">
//         <h2 className="text-sm sm:text-base md:text-lg text-black ">
//           <strong>X. View Response:</strong>
//         </h2>
//       </div>

//       <textarea
//         ref={textareaRef}
//         value={aiResponse}
//         onChange={(e) => onTestComplete(e.target.value)}
//         className="w-full p-3 sm:p-4 border border-gold/30 rounded-md bg-ivory text-sm sm:text-base md:text-base leading-relaxed resize-none focus:ring-2 focus:ring-gold overflow-auto transition-all duration-150"
//         placeholder="Generated AI response will appear here..."
//       />

//       <div className="text-xs sm:text-sm md:text-base text-gray-700 mt-2 sm:mt-3 leading-relaxed">
//         Test your prompt with an AI model and edit the response if needed before
//         evaluation. The box will expand to fit the text up to a limit, after
//         which scrolling will appear.
//       </div>
//     </div>
//   );
// };

// export default ViewResponse;


"use client";
import { useRef, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Edit2, Save, X } from "lucide-react";
import { usePromptEng } from "../../context/PromptEngContext";

interface TestAIResponseStepProps {
  aiResponse: string;
  onOpenSaveModal: () => void;
}

const ViewResponse: React.FC<TestAIResponseStepProps> = ({ aiResponse, onOpenSaveModal }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setAiResponse, savePromptToLibrary, isSavingPrompt } = usePromptEng();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(aiResponse || "");

  // keep editText in sync when aiResponse changes from outside
  useEffect(() => {
    if (!isEditing) setEditText(aiResponse || "");
  }, [aiResponse, isEditing]);

  // Auto scroll to top when response updates
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [aiResponse]);

  return (
    <div className="rounded-xl border border-gold/30 p-3 sm:p-4 md:p-6 mb-4 md:mb-8 bg-ivory/70 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="text-sm sm:text-base md:text-lg text-black font-semibold">
          <strong>X. View Response:</strong>
        </h2>
      </div>

      {/* Content Area (Read-only Markdown or Editable Textarea) */}
      <div className="mb-2">
        <div
          ref={containerRef}
          className="relative p-4 border border-gold/30 rounded-md bg-ivory text-black prose prose-sm sm:prose-base md:prose-lg max-w-none leading-relaxed overflow-auto max-h-[720px]"
        >
          {/* Controls removed from top-right; moved to footer below */}

          {isEditing ? (
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full min-h-[280px] sm:min-h-[640px]  bg-white text-sm sm:text-base leading-relaxed focus:ring-2 focus:ring-gold"
            />
          ) : aiResponse ? (
            <ReactMarkdown>{aiResponse}</ReactMarkdown>
          ) : (
            <p className="text-gray-500 italic">No AI response yet...</p>
          )}
        </div>
      </div>

      {/* Footer controls: Save to Library on the left; Edit/Save/Cancel on the right */}
        <div className="mt-3 flex justify-between items-center">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => {
              // ensure latest edits are committed before saving to library
              if (isEditing) {
                setAiResponse(editText);
                setIsEditing(false);
              }
                onOpenSaveModal();
            }}
            disabled={!aiResponse && !editText}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-gold border border-gold/30 hover:bg-gold/5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={16} />
            <span>Save to Library</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-gold border border-gold/30 hover:bg-gold/5"
            >
              <Edit2 size={16} />
              <span>Edit</span>
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  // commit edits to state only
                  setAiResponse(editText);
                  setIsEditing(false);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-gold hover:bg-yellow-600"
              >
                <Save size={14} />
                <span>Save</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setEditText(aiResponse || "");
                  setIsEditing(false);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 border"
              >
                <X size={14} />
                <span>Cancel</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Modal is now lifted to PromptEngSection to cover the entire step and apply a page blur */}

    </div>
  );
};

export default ViewResponse;
