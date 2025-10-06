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

//   // auto resize function
//   useEffect(() => {
//     if (textareaRef.current) {
//       textareaRef.current.style.height = "auto"; // reset height
//       textareaRef.current.style.height = `${Math.min(
//         textareaRef.current.scrollHeight,
//         600 // max height in px before scroll
//       )}px`;
//     }
//   }, [aiResponse]);

//   return (
//     <div className="rounded-xl border border-gold/30 p-2 md:p-4 mb-4 md:mb-8">
//       <div className="flex items-center mb-4">
//         <h2 className=" text-base sm:text-lg text-black mb-3 sm:mb-4">
//           <strong>X. View Response:</strong>
//         </h2>
//       </div>

//       <textarea
//         ref={textareaRef}
//         value={aiResponse}
//         onChange={(e) => onTestComplete(e.target.value)}
//         className="w-full p-4 border border-gold/30 rounded-md bg-ivory text-base resize-none focus:ring-2 focus:ring-gold overflow-auto"
//         placeholder="Generated AI response will appear here..."
//       />

//       <div className="text-sm text-gray mt-3 leading-relaxed">
//         Test your prompt with an AI model and edit the response if needed before
//         evaluation. The box will expand to fit the text up to a limit, after
//         which scrolling will appear.
//       </div>
//     </div>
//   );
// };

// export default ViewResponse;


"use client";
import { useRef, useEffect } from "react";

interface TestAIResponseStepProps {
  aiResponse: string;
  onTestComplete: (response: string) => void;
}

const ViewResponse: React.FC<TestAIResponseStepProps> = ({
  aiResponse,
  onTestComplete,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize function
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // reset height
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        600 // max height before scroll
      )}px`;
    }
  }, [aiResponse]);

  return (
    <div className="rounded-xl border border-gold/30 p-2 md:p-4  mb-4 md:mb-8">
      <div className="flex items-center mb-3 sm:mb-4">
        <h2 className="text-sm sm:text-base md:text-lg text-black ">
          <strong>X. View Response:</strong>
        </h2>
      </div>

      <textarea
        ref={textareaRef}
        value={aiResponse}
        onChange={(e) => onTestComplete(e.target.value)}
        className="w-full p-3 sm:p-4 border border-gold/30 rounded-md bg-ivory text-sm sm:text-base md:text-base leading-relaxed resize-none focus:ring-2 focus:ring-gold overflow-auto transition-all duration-150"
        placeholder="Generated AI response will appear here..."
      />

      <div className="text-xs sm:text-sm md:text-base text-gray-700 mt-2 sm:mt-3 leading-relaxed">
        Test your prompt with an AI model and edit the response if needed before
        evaluation. The box will expand to fit the text up to a limit, after
        which scrolling will appear.
      </div>
    </div>
  );
};

export default ViewResponse;
