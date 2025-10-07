// // "use client";
// // import React, { useState, useEffect } from 'react';
// // import { Copy, Save, Check } from 'lucide-react';

// // interface GeneratedPromptProps {
// //   taskDescription?: string;
// //   selectedContext?: 'flowmode' | 'guidedmode' ;
// //   contextData?: {
// //     dynamicFields?: Record<string, any>;
// //     customFields?: any[];
// //     freeformContext?: string;
// //     [key: string]: any;
// //   };
// //   references?: string;
// //   outputFormat?: string;
// //   onPromptGenerated?: (prompt: string) => void;
// // }

// // const GeneratedPromptStep: React.FC<GeneratedPromptProps> = ({
// //   taskDescription = '',
// //   selectedContext = 'flowmode',
// //   contextData = {},
// //   references = '',
// //   outputFormat = '',
// //   onPromptGenerated
// // }) => {
// //   const [copied, setCopied] = useState(false);
// //   const [saved, setSaved] = useState(false);

// //   const generatePromptText = () => {
// //     let promptText = "";

// //     promptText += `<instructions> You are an expert in customer success and support communications, specializing in empathetic yet efficient resolution of customer inquiries. You prioritize clarity, customer satisfaction, and brand-aligned tone. If necessary context is missing, state that explicitly. </instructions>\n\n`;

// //     if (taskDescription) {
// //       promptText += `<task> ${taskDescription} </task>\n\n`;
// //     }

// //     if (contextData && Object.keys(contextData).length > 0) {
// //       promptText += `<context>\n`;

// //       if (contextData.dynamicFields) {
// //         Object.entries(contextData.dynamicFields).forEach(([key, value]) => {
// //           if (value && value !== '') {
// //             if (Array.isArray(value)) {
// //               promptText += `${key}: ${value.join(', ')}\n`;
// //             } else {
// //               promptText += `${key}: ${value}\n`;
// //             }
// //           }
// //         });
// //       }

// //       if (Array.isArray(contextData.customFields) && contextData.customFields.length > 0) {
// //         const filledCustomFields = contextData.customFields.filter(
// //           (field) => typeof field === 'string' && field.trim() !== ''
// //         );
// //         if (filledCustomFields.length > 0) {
// //           promptText += `Custom Fields: ${filledCustomFields.join(', ')}\n`;
// //         }
// //       }

// //       if (selectedContext === 'flowmode' && typeof contextData.freeformContext === 'string') {
// //         promptText += `${contextData.freeformContext}\n`;
// //       }

// //       promptText += `</context>\n\n`;
// //     }

// //     if (references) {
// //       promptText += `<references> ${references} </references>\n\n`;
// //     }

// //     promptText += `<approach> Go VERY deep. Explore far beyond typical FAQs or support documentation. Review COMPANY's historical support tickets, online reviews, community forums, and competitor support experiences. Look for patterns in customer frustration, common resolution tactics, and long-term satisfaction strategies. </approach>\n\n`;

// //     if (outputFormat) {
// //       promptText += `<format> ${outputFormat} </format>`;
// //     } else {
// //       promptText += `<format> Email (no emojis) </format>`;
// //     }

// //     return promptText;
// //   };

// //   useEffect(() => {
// //     const prompt = generatePromptText();
// //     if (onPromptGenerated) {
// //       onPromptGenerated(prompt);
// //     }
// //   }, [taskDescription, selectedContext, contextData, references, outputFormat, onPromptGenerated]);

// //   const handleCopy = async () => {
// //     try {
// //       await navigator.clipboard.writeText(generatePromptText());
// //       setCopied(true);
// //       setTimeout(() => setCopied(false), 2000);
// //     } catch (err) {
// //       console.error('Failed to copy text: ', err);
// //     }
// //   };

// //   const handleSave = () => {
// //     console.log('Saving prompt to library...');
// //     setSaved(true);
// //     setTimeout(() => setSaved(false), 2000);
// //   };

// //   return (
// //     <div className="rounded-xl border border-gold/30 p-4 sm:p-6 mb-8">
// //           <div className="flex items-center mb-3">
// //       <h2 className=" text-base sm:text-lg text-black mb-3 sm:mb-4"><strong >VIII. Generated Prompt

// // </strong> 
// //  </h2>
// //     </div>

// //       <div className="bg-ivory border-[0.5px] border-gold/30 rounded-md p-4 mb-4 font-mono text-sm text-gray-800 whitespace-pre-wrap overflow-x-auto min-h-[200px]">
// //         {generatePromptText()}
// //       </div>

// //       <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
// //         <button
// //           onClick={handleCopy}
// //           className="inline-flex items-center justify-center px-4 py-2 border-[0.5px] border-gold/30 rounded-md bg-ivory text-sm font-medium text-gray"
// //         >
// //           {copied ? (
// //             <>
// //               <Check className="w-4 h-4 mr-2 text-green-600" />
// //               Copied!
// //             </>
// //           ) : (
// //             <>
// //               <Copy className="w-4 h-4 mr-2" />
// //               Copy
// //             </>
// //           )}
// //         </button>

// //         <button
// //           onClick={handleSave}
// //           className="inline-flex items-center justify-center px-4 py-2 border-[0.5px] border-gold/30 rounded-md bg-ivory text-sm font-medium text-gray"
// //         >
// //           {saved ? (
// //             <>
// //               <Check className="w-4 h-4 mr-2 text-green-600" />
// //               Saved!
// //             </>
// //           ) : (
// //             <>
// //               <Save className="w-4 h-4 mr-2" />
// //               Save to Prompt Library
// //             </>
// //           )}
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default GeneratedPromptStep;


// "use client";
// import React, { useState, useEffect } from 'react';
// import { Copy, Save, Check } from 'lucide-react';

// interface GeneratedPromptProps {
//   taskDescription?: string;
//   selectedContext?: 'flowmode' | 'guidedmode';
//   contextData?: {
//     dynamicFields?: Record<string, any>;
//     customFields?: any[];
//     freeformContext?: string;
//     [key: string]: any;
//   };
//   references?: string;
//   outputFormat?: string;
//   onPromptGenerated?: (prompt: string) => void;
//   externalPrompt?: string;
// }

// const GeneratedPromptStep: React.FC<GeneratedPromptProps> = ({
//   taskDescription = '',
//   selectedContext = 'flowmode',
//   contextData = {},
//   references = '',
//   outputFormat = '',
//   onPromptGenerated,
//   externalPrompt = ''
// }) => {
//   const [copied, setCopied] = useState(false);
//   const [saved, setSaved] = useState(false);

//   const generatePromptText = () => {
//     let promptText = "";

//     promptText += `<instructions> You are an expert in customer success and support communications, specializing in empathetic yet efficient resolution of customer inquiries. You prioritize clarity, customer satisfaction, and brand-aligned tone. If necessary context is missing, state that explicitly. </instructions>\n\n`;

//     if (taskDescription) {
//       promptText += `<task> ${taskDescription} </task>\n\n`;
//     }

//     if (contextData && Object.keys(contextData).length > 0) {
//       promptText += `<context>\n`;

//       if (contextData.dynamicFields) {
//         Object.entries(contextData.dynamicFields).forEach(([key, value]) => {
//           if (value && value !== '') {
//             if (Array.isArray(value)) {
//               promptText += `${key}: ${value.join(', ')}\n`;
//             } else {
//               promptText += `${key}: ${value}\n`;
//             }
//           }
//         });
//       }

//       if (Array.isArray(contextData.customFields) && contextData.customFields.length > 0) {
//         const filledCustomFields = contextData.customFields.filter(
//           (field) => typeof field === 'string' && field.trim() !== ''
//         );
//         if (filledCustomFields.length > 0) {
//           promptText += `Custom Fields: ${filledCustomFields.join(', ')}\n`;
//         }
//       }

//       if (selectedContext === 'flowmode' && typeof contextData.freeformContext === 'string') {
//         promptText += `${contextData.freeformContext}\n`;
//       }

//       promptText += `</context>\n\n`;
//     }

//     if (references) {
//       promptText += `<references> ${references} </references>\n\n`;
//     }

//     promptText += `<approach> Go VERY deep. Explore far beyond typical FAQs or support documentation. Review COMPANY's historical support tickets, online reviews, community forums, and competitor support experiences. Look for patterns in customer frustration, common resolution tactics, and long-term satisfaction strategies. </approach>\n\n`;

//     if (outputFormat) {
//       promptText += `<format> ${outputFormat} </format>`;
//     } else {
//       promptText += `<format> Email (no emojis) </format>`;
//     }

//     return promptText;
//   };

//   useEffect(() => {
//     const prompt = generatePromptText();
//     if (onPromptGenerated) {
//       onPromptGenerated(prompt);
//     }
//   }, [taskDescription, selectedContext, contextData, references, outputFormat, onPromptGenerated]);

//   // If an external prompt is provided by server, prefer showing that
//   const displayedPrompt = externalPrompt && externalPrompt.length > 0 ? externalPrompt : generatePromptText();

//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(generatePromptText());
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       console.error('Failed to copy text: ', err);
//     }
//   };

//   const handleSave = () => {
//     console.log('Saving prompt to library...');
//     setSaved(true);
//     setTimeout(() => setSaved(false), 2000);
//   };

//   return (
//     <div className="rounded-xl border border-gold/30 p-4 sm:p-6 mb-4">
//       <div className="flex items-center mb-2">
//         <h2 className="text-base sm:text-lg text-black mb-3 sm:mb-1">
//           <strong>VIII. Generated Prompt</strong>
//         </h2>
//       </div>

//       <div className="bg-ivory border-[0.5px] border-gold/30 rounded-md p-4 mb-4 font-mono text-sm text-gray-800 whitespace-pre-wrap overflow-x-auto min-h-[200px] max-h-[400px] sm:max-h-[500px]">
//   {displayedPrompt}
//       </div>

//       <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
//         <button
//           onClick={handleCopy}
//           className="inline-flex items-center justify-center w-full sm:w-auto px-4 py-2 border-[0.5px] border-gold/30 rounded-md bg-ivory text-sm font-medium text-gray hover:bg-gold/10 transition"
//         >
//           {copied ? (
//             <>
//               <Check className="w-4 h-4 mr-2 text-green-600" />
//               Copied!
//             </>
//           ) : (
//             <>
//               <Copy className="w-4 h-4 mr-2" />
//               Copy
//             </>
//           )}
//         </button>

//         <button
//           onClick={handleSave}
//           className="inline-flex items-center justify-center w-full sm:w-auto px-4 py-2 border-[0.5px] border-gold/30 rounded-md bg-ivory text-sm font-medium text-gray hover:bg-gold/10 transition"
//         >
//           {saved ? (
//             <>
//               <Check className="w-4 h-4 mr-2 text-green-600" />
//               Saved!
//             </>
//           ) : (
//             <>
//               <Save className="w-4 h-4 mr-2" />
//               Save to Prompt Library
//             </>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default GeneratedPromptStep;
"use client";
import React, { useState } from "react";
import { Copy, Save, Check } from "lucide-react";

interface GeneratedPromptProps {
  externalPrompt?: string;
}

const GeneratedPromptStep: React.FC<GeneratedPromptProps> = ({
  externalPrompt = "",
}) => {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(externalPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleSave = () => {
    console.log("Saving prompt to library...");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="rounded-xl border border-gold/30 p-4 sm:p-6 mb-4">
      <div className="flex items-center mb-2">
        <h2 className="text-base sm:text-lg text-black mb-3 sm:mb-1 font-semibold">
          VIII. Generated Prompt
        </h2>
      </div>

      <div className="bg-ivory border-[0.5px] border-gold/30 rounded-md p-4 mb-4 font-mono text-sm text-gray-800 whitespace-pre-wrap overflow-x-auto min-h-[200px] max-h-[400px] sm:max-h-[500px]">
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
          onClick={handleSave}
          disabled={!externalPrompt}
          className="inline-flex items-center justify-center w-full sm:w-auto px-4 py-2 border-[0.5px] border-gold/30 rounded-md bg-ivory text-sm font-medium text-gray hover:bg-gold/10 transition"
        >
          {saved ? (
            <>
              <Check className="w-4 h-4 mr-2 text-green-600" />
              Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save to Prompt Library
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default GeneratedPromptStep;
