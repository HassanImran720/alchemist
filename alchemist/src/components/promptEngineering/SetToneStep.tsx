"use client";
import React, { useState } from "react";

interface SetToneStepProps {
  toneData: string;
  setToneData: (tone: string) => void;
}

const SetToneStep: React.FC<SetToneStepProps> = ({
  toneData,
  setToneData,
}) => {
  const [tone, setTone] = useState(" ");

  const handleToneChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTone(value);
    setToneData(value);
  };

  return (
    <div className="bg-ivory rounded-lg border border-gold/30 p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-white font-bold text-sm">
          4
        </div>
        <div>
          <h2 className="text-xl font-bold text-black">Set Tone</h2>
          <p className="text-sm text-gray-600">Define your voice and style</p>
        </div>
      </div>

      <div className="space-y-4">
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Tone & Style
  </label>
  <textarea
    value={tone}
    onChange={handleToneChange}
    placeholder="Describe the tone and style you want (e.g., Warm, Empathetic, Goofy)"
    className="w-full p-3 border-[0.5px] border-gold/30 rounded-md focus:ring-gold focus:border-gold resize-none bg-ivory"
    rows={4}
  />
</div>


      </div>
    </div>
  );
};

export default SetToneStep;