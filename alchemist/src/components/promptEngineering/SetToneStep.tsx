"use client";
import { Check } from "lucide-react";
import React, { useState } from "react";

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

const SetToneStep: React.FC<SetToneStepProps> = ({ toneData, setToneData }) => {
  const [customTone, setCustomTone] = useState("");
  const [showToneBank, setShowToneBank] = useState(true);

  // Toggle tone selection
  const toggleTone = (tone: string) => {
    const updatedTones = toneData.includes(tone)
      ? toneData.filter((t) => t !== tone)
      : [...toneData, tone];
    setToneData(updatedTones);
  };

  // Handle custom tone input
  const handleCustomToneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomTone(value);

    // Remove previous custom tone and add the new one if not empty
    const filtered = toneData.filter((t) => t !== customTone);
    if (value.trim() !== "") {
      setToneData([...filtered, value]);
    } else {
      setToneData(filtered);
    }
  };

  return (
    <div className="bg-ivory rounded-lg border border-gold/30 p-6 mb-6">
      {/* Header */}
      <div className="flex items-center mb-4">
      <h2 className=" text-xl text-black mb-4"><strong >IV. Set Tone:

</strong> Define the voice and style AI the model should use.
 </h2>
    </div>

      {/* Tone Bank Toggle */}
      <div className="mb-3 flex gap-2 items-center">
        <span>Tone Bank (Select Multiple Options)</span>
        <button
          type="button"
          onClick={() => setShowToneBank(!showToneBank)}
          className={`text-sm px-3 py-1 rounded-md border border-gold ${
            showToneBank
              ? "bg-gold text-white"
              : "text-gold hover:bg-gold hover:text-white"
          }`}
        >
          {showToneBank ? "Hide Tone Bank" : "Show Tone Bank"}
        </button>
      </div>

      {/* Tone Bank */}
      {showToneBank && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {TONE_OPTIONS.map((tone) => (
              <button
                key={tone}
                type="button"
                onClick={() => toggleTone(tone)}
                className={`flex items-center gap-2 px-3 py-1 rounded-md border border-gold/30 text-sm ${
                  toneData.includes(tone)
                    ? "bg-gold text-white border-gold"
                    : "text-gray-700 hover:bg-gold hover:text-white"
                }`}
              >
                {toneData.includes(tone) && <Check className="text-white w-4 h-4" />}
                {tone}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Custom Tone Input */}
      <div className="space-y-2 mb-4">
        <label className="block text-sm font-medium text-gray-700">Custom Tone</label>
        <input
          type="text"
          value={customTone}
          onChange={handleCustomToneChange}
          placeholder="Add custom tone..."
          className="w-full p-3 border-[0.5px] border-gold/30 rounded-md focus:ring-gold focus:border-gold bg-ivory text-gray-800"
        />
      </div>

      {/* Final Tone Output */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Selected Tones</label>
        <input
          type="text"
          readOnly
          value={Array.isArray(toneData) ? toneData.join(", ") : ""}
          placeholder="Your selected tones will appear here..."
          className="w-full p-3 border-[0.5px] border-gold/30 rounded-md bg-gray-50 text-gray-800"
        />
      </div>
    </div>
  );
};

export default SetToneStep;
