// "use client";
// import { Check } from "lucide-react";
// import React, { useState } from "react";

// interface SetToneStepProps {
//   toneData: string[];
//   setToneData: (tone: string[]) => void;
// }

// const TONE_OPTIONS = [
//   "Formal",
//   "Conversational",
//   "Persuasive",
//   "Inspirational",
//   "Analytical",
//   "Direct & Concise",
//   "Playful / Witty",
//   "Empathetic",
//   "Authoritative",
//   "Storytelling",
//   "Casual / Relaxed",
//   "Luxury / Premium",
//   "Energetic / Hype",
//   "Neutral / Balanced",
//   "Visionary / Thought-Leader",
//   "Sarcastic",
//   "Quirky",
//   "Dramatic",
//   "Mysterious",
//   "Poetic",
// ];

// const SetToneStep: React.FC<SetToneStepProps> = ({ toneData, setToneData }) => {
//   const [customTone, setCustomTone] = useState("");
//   const [showToneBank, setShowToneBank] = useState(true);

//   // Toggle tone selection
//   const toggleTone = (tone: string) => {
//     const updatedTones = toneData.includes(tone)
//       ? toneData.filter((t) => t !== tone)
//       : [...toneData, tone];
//     setToneData(updatedTones);
//   };

//   // Handle custom tone input
//   const handleCustomToneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setCustomTone(value);

//     // Remove previous custom tone and add the new one if not empty
//     const filtered = toneData.filter((t) => t !== customTone);
//     if (value.trim() !== "") {
//       setToneData([...filtered, value]);
//     } else {
//       setToneData(filtered);
//     }
//   };

//   return (
//     <div className="bg-ivory rounded-lg border border-gold/30 p-6 mb-6">
//       {/* Header */}
//       <div className="flex items-center mb-4">
//       <h2 className=" text-xl text-black mb-4"><strong >IV. Set Tone:

// </strong> Define the voice and style AI the model should use.
//  </h2>
//     </div>

//       {/* Tone Bank Toggle */}
//       <div className="mb-3 flex gap-2 items-center">
//         <span>Tone Bank (Select Multiple Options)</span>
//         <button
//           type="button"
//           onClick={() => setShowToneBank(!showToneBank)}
//           className={`text-sm px-3 py-1 rounded-md border border-gold ${
//             showToneBank
//               ? "bg-gold text-white"
//               : "text-gold hover:bg-gold hover:text-white"
//           }`}
//         >
//           {showToneBank ? "Hide Tone Bank" : "Show Tone Bank"}
//         </button>
//       </div>

//       {/* Tone Bank */}
//       {showToneBank && (
//         <div className="mb-4">
//           <div className="flex flex-wrap gap-2">
//             {TONE_OPTIONS.map((tone) => (
//               <button
//                 key={tone}
//                 type="button"
//                 onClick={() => toggleTone(tone)}
//                 className={`flex items-center gap-2 px-3 py-1 rounded-md border border-gold/30 text-sm ${
//                   toneData.includes(tone)
//                     ? "bg-gold text-white border-gold"
//                     : "text-gray-700 hover:bg-gold hover:text-white"
//                 }`}
//               >
//                 {toneData.includes(tone) && <Check className="text-white w-4 h-4" />}
//                 {tone}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Custom Tone Input */}
//       <div className="space-y-2 mb-4">
//         <label className="block text-sm font-medium text-gray-700">Custom Tone</label>
//         <input
//           type="text"
//           value={customTone}
//           onChange={handleCustomToneChange}
//           placeholder="Add custom tone..."
//           className="w-full p-3 border-[0.5px] border-gold/30 rounded-md focus:ring-gold focus:border-gold bg-ivory text-gray-800"
//         />
//       </div>

//       {/* Final Tone Output */}
//       <div className="space-y-2">
//         <label className="block text-sm font-medium text-gray-700">Selected Tones</label>
//         <input
//           type="text"
//           readOnly
//           value={Array.isArray(toneData) ? toneData.join(", ") : ""}
//           placeholder="Your selected tones will appear here..."
//           className="w-full p-3 border-[0.5px] border-gold/30 rounded-md bg-gray-50 text-gray-800"
//         />
//       </div>
//     </div>
//   );
// };

// export default SetToneStep;


// "use client";
// import { Check, Music, User, Edit, X } from "lucide-react";
// import React, { useState, useCallback, useRef, useEffect } from "react";

// interface SetToneStepProps {
//   toneData: string[];
//   setToneData: (tone: string[]) => void;
// }

//  const TONE_OPTIONS = [
//   "Formal",
//   "Conversational",
//   "Persuasive",
//   "Inspirational",
//   "Analytical",
//   "Direct & Concise",
//   "Playful / Witty",
//   "Empathetic",
//   "Authoritative",
//   "Storytelling",
//   "Casual / Relaxed",
//   "Luxury / Premium",
//   "Energetic / Hype",
//   "Neutral / Balanced",
//   "Visionary / Thought-Leader",
//   "Sarcastic",
//   "Quirky",
//   "Dramatic",
//   "Mysterious",
//   "Poetic",
// ];

// type ModalType = "toneBank" | "brandVoice" | "customVoice" | null;

// const SetToneStep: React.FC<SetToneStepProps> = ({ toneData, setToneData }) => {
//   const [activeModal, setActiveModal] = useState<ModalType>(null);
//   const [brandVoiceDescription, setBrandVoiceDescription] = useState("");
//   const [customTone, setCustomTone] = useState("");

//   const brandVoiceTextareaRef = useRef<HTMLTextAreaElement>(null);
//   const customToneInputRef = useRef<HTMLInputElement>(null);

//   const toggleTone = useCallback(
//     (tone: string) => {
//       const newTones = toneData.includes(tone)
//         ? toneData.filter((t) => t !== tone)
//         : [...toneData, tone];
//       setToneData(newTones);
//     },
//     [toneData, setToneData]
//   );

//   const generateFinalToneOutput = useCallback(() => {
//     const allTones = [...toneData];
//     if (brandVoiceDescription.trim()) allTones.push(brandVoiceDescription.trim());
//     if (customTone.trim()) allTones.push(customTone.trim());
//     return allTones.join(", ") || "Configure your tone using the options above...";
//   }, [toneData, brandVoiceDescription, customTone]);

//   const closeModal = useCallback(() => setActiveModal(null), []);

//   const Modal = React.memo(({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-ivory rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
//         <div className="flex justify-end p-4">
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600" type="button">
//             <X className="w-6 h-6" />
//           </button>
//         </div>
//         {children}
//       </div>
//     </div>
//   ));

//   const ToneBankModal = React.memo(() => (
//     <Modal onClose={closeModal}>
//       <div className="px-6 pb-6">
//         <h2 className="text-2xl font-semibold text-black mb-2">Tone Bank</h2>
//         <p className="text-black mb-6">Select multiple tone options to define your voice</p>
//         <div className="flex flex-wrap gap-3">
//           {TONE_OPTIONS.map((tone) => (
//             <button
//               key={tone}
//               type="button"
//               onClick={() => toggleTone(tone)}
//               className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-colors ${
//                 toneData.includes(tone)
//                   ? "bg-gold text-white border-gold"
//                   : "text-gray-700 border-gold/30 bg-gold/30 hover:bg-gold hover:text-white"
//               }`}
//             >
//               {toneData.includes(tone) && <Check className="w-4 h-4" />}
//               {tone}
//             </button>
//           ))}
//         </div>
//       </div>
//     </Modal>
//   ));

//   const BrandVoiceModal = React.memo(() => {
//     useEffect(() => {
//       if (brandVoiceTextareaRef.current) {
//         const textarea = brandVoiceTextareaRef.current;
//         const length = textarea.value.length;
//         textarea.focus();
//         textarea.setSelectionRange(length, length);
//       }
//     }, []);

//     return (
//       <Modal onClose={closeModal}>
//         <div className="px-6 pb-6">
//           <h2 className="text-2xl font-semibold text-black mb-2">Brand Voice</h2>
//           <p className="text-gray-600 mb-6">Define your brand's unique voice</p>
//           <textarea
//             ref={brandVoiceTextareaRef}
//             value={brandVoiceDescription}
//             onChange={(e) => setBrandVoiceDescription(e.target.value)}
//             placeholder="Describe your brand's voice..."
//             className="p-3 w-full border border-gold/30 rounded-md bg-ivory text-sm focus:outline-gold resize-none"
//             rows={6}
//             autoFocus
//           />
//         </div>
//       </Modal>
//     );
//   });

//   const CustomVoiceModal = React.memo(() => {
//     useEffect(() => {
//       if (customToneInputRef.current) customToneInputRef.current.focus();
//     }, []);

//     return (
//       <Modal onClose={closeModal}>
//         <div className="px-6 pb-6">
//           <h2 className="text-2xl font-semibold text-gray-900 mb-2">Custom Voice</h2>
//           <p className="text-gray-600 mb-6">Add your own custom tone</p>
//           <input
//             type="text"
//             ref={customToneInputRef}
//             value={customTone}
//             onChange={(e) => setCustomTone(e.target.value)}
//             placeholder="Enter custom tone..."
//             className="w-full px-3 py-2 border border-gold/30 rounded-md bg-ivory text-sm focus:outline-gold"
//           />
//         </div>
//       </Modal>
//     );
//   });

//   return (
//     <div className="bg-ivory rounded-lg border border-gold/30 p-6 mb-6">
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold text-black mb-2">
//           <strong>IV. Set Tone:</strong> Define the voice and style AI should use.
//         </h2>
//       </div>

//       <div className="flex gap-4 mb-6">
//         {["toneBank", "brandVoice", "customVoice"].map((type, i) => {
//           const Icon = type === "toneBank" ? Music : type === "brandVoice" ? User : Edit;
//           const label = type === "toneBank" ? "Tone Bank" : type === "brandVoice" ? "Brand Voice" : "Custom Voice";
//           return (
//             <button
//               key={i}
//               type="button"
//               onClick={() => setActiveModal(type as ModalType)}
//               className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-gold/30 text-gray-700 hover:bg-gold transition-colors"
//             >
//               <Icon className="w-4 h-4" />
//               {label}
//             </button>
//           );
//         })}
//       </div>

//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Final Tone Output:</label>
//           <textarea
//             readOnly
//             value={generateFinalToneOutput()}
//             placeholder="Your tone configuration will appear here..."
//             className="w-full p-3  border border-gold/30 rounded-md bg-ivory text-sm focus:outline-gold resize-none"
//             rows={6}
//           />
//         </div>
//       </div>

//       {activeModal === "toneBank" && <ToneBankModal />}
//       {activeModal === "brandVoice" && <BrandVoiceModal />}
//       {activeModal === "customVoice" && <CustomVoiceModal />}
//     </div>
//   );
// };

// export default SetToneStep;



"use client";
import { Check, Music, User, Edit, X } from "lucide-react";
import React, { useState, useCallback, useRef, useEffect } from "react";

interface SetToneStepProps {
  toneData: string[];
  setToneData: (tone: string[]) => void;
}

const TONE_OPTIONS = [
  "Formal",
  "Conversational",
  "Persuasive",
  "Inspirational",
  "Analytical",
  "Direct & Concise",
  "Playful / Witty",
  "Empathetic",
  "Authoritative",
  "Storytelling",
  "Casual / Relaxed",
  "Luxury / Premium",
  "Energetic / Hype",
  "Neutral / Balanced",
  "Visionary / Thought-Leader",
  "Sarcastic",
  "Quirky",
  "Dramatic",
  "Mysterious",
  "Poetic",
];

type ModalType = "toneBank" | "brandVoice" | "customVoice" | null;

const SetToneStep: React.FC<SetToneStepProps> = ({ toneData, setToneData }) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [brandVoiceDescription, setBrandVoiceDescription] = useState("");
  const [customTone, setCustomTone] = useState("");

  const brandVoiceTextareaRef = useRef<HTMLTextAreaElement>(null);
  const customToneInputRef = useRef<HTMLInputElement>(null);

  const toggleTone = useCallback(
    (tone: string) => {
      const newTones = toneData.includes(tone)
        ? toneData.filter((t) => t !== tone)
        : [...toneData, tone];
      setToneData(newTones);
    },
    [toneData, setToneData]
  );

  const generateFinalToneOutput = useCallback(() => {
    const allTones = [...toneData];
    if (brandVoiceDescription.trim()) allTones.push(brandVoiceDescription.trim());
    if (customTone.trim()) allTones.push(customTone.trim());
    return allTones.join(", ") || "Configure your tone using the options above...";
  }, [toneData, brandVoiceDescription, customTone]);

  const closeModal = useCallback(() => setActiveModal(null), []);

  // 🔹 Shared Modal Wrapper
  const Modal = React.memo(
    ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-ivory rounded-lg shadow-xl max-w-2xl w-full mx-3 sm:mx-6 max-h-[80vh] overflow-y-auto">
          <div className="flex justify-end p-3 sm:p-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              type="button"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
          {children}
        </div>
      </div>
    )
  );

  // 🔹 Tone Bank Modal
  const ToneBankModal = React.memo(() => (
    <Modal onClose={closeModal}>
      <div className="px-4 sm:px-6 pb-6">
        <h2 className="text-lg sm:text-2xl font-semibold text-black mb-2">
          Tone Bank
        </h2>
        <p className="text-sm sm:text-base text-black mb-6">
          Select multiple tone options to define your voice
        </p>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {TONE_OPTIONS.map((tone) => (
            <button
              key={tone}
              type="button"
              onClick={() => toggleTone(tone)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border text-xs sm:text-sm transition-colors ${
                toneData.includes(tone)
                  ? " text-black border-gold"
                  : "text-gray-700 border-gold/30  hover:bg-gold hover:text-white"
              }`}
            >
              {toneData.includes(tone) && <Check className="w-3 h-3 sm:w-4 sm:h-4" />}
              {tone}
            </button>
          ))}
        </div>
      </div>
    </Modal>
  ));

  // 🔹 Brand Voice Modal
  const BrandVoiceModal = React.memo(() => {
    useEffect(() => {
      if (brandVoiceTextareaRef.current) {
        const textarea = brandVoiceTextareaRef.current;
        const length = textarea.value.length;
        textarea.focus();
        textarea.setSelectionRange(length, length);
      }
    }, []);

    return (
      <Modal onClose={closeModal}>
        <div className="px-4 sm:px-6 pb-6">
          <h2 className="text-lg sm:text-2xl font-semibold text-black mb-2">
            Brand Voice
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6">
            Define your brand's unique voice
          </p>
          <textarea
            ref={brandVoiceTextareaRef}
            value={brandVoiceDescription}
            onChange={(e) => setBrandVoiceDescription(e.target.value)}
            placeholder="Describe your brand's voice..."
            className="p-2 sm:p-3 w-full border border-gold/30 rounded-md bg-ivory text-sm sm:text-base focus:outline-gold resize-none"
            rows={5}
            autoFocus
          />
        </div>
      </Modal>
    );
  });

  // 🔹 Custom Voice Modal
  const CustomVoiceModal = React.memo(() => {
    useEffect(() => {
      if (customToneInputRef.current) customToneInputRef.current.focus();
    }, []);

    return (
      <Modal onClose={closeModal}>
        <div className="px-4 sm:px-6 pb-6">
          <h2 className="text-lg sm:text-2xl font-semibold text-gray-900 mb-2">
            Custom Voice
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6">
            Add your own custom tone
          </p>
          <input
            type="text"
            ref={customToneInputRef}
            value={customTone}
            onChange={(e) => setCustomTone(e.target.value)}
            placeholder="Enter custom tone..."
            className="w-full px-2 sm:px-3 py-2 border border-gold/30 rounded-md bg-ivory text-sm sm:text-base focus:outline-gold"
          />
        </div>
      </Modal>
    );
  });

  return (
    <div className="rounded-xl border border-gold/30 p-2 md:p-4 mb-4">
      <div className="mb-3 sm:mb-2">
        <h2 className="text-base sm:text-lg text-black mb-2 sm:mb-1">
          <strong>IV. Set Tone:</strong> Define the voice and style AI should use.
        </h2>
      </div>

      {/* Buttons Row */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
        {["toneBank", "brandVoice", "customVoice"].map((type, i) => {
          const Icon = type === "toneBank" ? Music : type === "brandVoice" ? User : Edit;
          const label =
            type === "toneBank"
              ? "Tone Bank"
              : type === "brandVoice"
              ? "Brand Voice"
              : "Custom Voice";
          return (
            <button
              key={i}
              type="button"
              onClick={() => setActiveModal(type as ModalType)}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg border bg-gold/30 text-gray-700 hover:bg-gold transition-colors text-sm sm:text-base"
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          );
        })}
      </div>

      {/* Final Tone Output */}
      <div className="space-y-2">
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Final Tone Output:
          </label>
          <textarea
            readOnly
            value={generateFinalToneOutput()}
            placeholder="Your tone configuration will appear here..."
            className="w-full p-2 sm:p-3 border border-gold/30 rounded-md bg-ivory text-sm sm:text-base focus:outline-gold resize-none h-24 sm:h-28"
          />
        </div>
      </div>

      {activeModal === "toneBank" && <ToneBankModal />}
      {activeModal === "brandVoice" && <BrandVoiceModal />}
      {activeModal === "customVoice" && <CustomVoiceModal />}
    </div>
  );
};

export default SetToneStep;
