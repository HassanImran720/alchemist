"use client";
import React, { useState } from "react";
import { RefreshCw, Copy, BookOpen } from "lucide-react";

interface IterateImproveStepProps {
  evaluation: any;
  originalPrompt: string;
  onImprove: (improvedPrompt: string) => void;
  promptStrucure: string;
  setPromptStrucure: (value: string) => void;
}

const IterateImproveStep: React.FC<IterateImproveStepProps> = ({
  evaluation,
  originalPrompt,
  onImprove,
  promptStrucure,
  setPromptStrucure,
}) => {
  const [currentIteration, setCurrentIteration] = useState(1);
  const [charms] = useState(95);
  const [isGenerating, setIsGenerating] = useState(false);
  const [improvedPrompt, setImprovedPrompt] = useState("");

  const handleGenerateImprovedPrompt = async () => {
    setIsGenerating(true);

   setTimeout(() => {
  const improved = `<instructions>
You are a sales strategist with expertise in lead qualification, customer acquisition, and buyer psychology. 
Adapt messaging to the customer’s decision-making stage. 
If info is missing, state it clearly and suggest next steps. 
Keep responses clear, persuasive, and outcome-focused.
</instructions>

<task>
Write a persuasive outreach email for COMPANY that highlights unique benefits, addresses objections, and ends with a strong call-to-action to book a demo.
</task>

<approach>
1. Research competitor sales pages and customer reviews.  
2. Identify common objections and pain points.  
3. Apply buyer psychology and urgency triggers.  
4. Provide subject line and CTA variations.  
</approach>

<context>
Company: JOHN APPLE  
Target Persona: JOHN BROWN  
Stage: ACTIVE BUYER  
Industry: TOURISM  
Pain Points: High acquisition cost, low conversion rates.  
</context>

<references>
- Ava Noorforde, 29, Dallas, TX – Wellness Coaching  
- Liam Bennett, 35, Denver, CO – Tech Startups  
- Joe Kim, 26, Seattle, WA – Mindfulness  
</references>`;

  setImprovedPrompt(improved);
  onImprove(improved);
  setIsGenerating(false);
  setCurrentIteration((prev) => prev + 1);
}, 3000);

  };

  const handleCopy = () => {
    navigator.clipboard.writeText(improvedPrompt);
  };

  const handleSaveToLibrary = () => {
    console.log("Saving to library...");
  };

  return (
    <div className="rounded-xl border border-gold/30 p-2 md:p-4 mb-4 ">
      {/* Heading */}
    
 <div className="flex items-center mb-3 sm:mb-4">
        <h2 className="text-base sm:text-lg text-black mb-3 sm:mb-4">
          <strong>XII. Iterate and Improve</strong>
        </h2>
      </div>
      {/* Prompt Structure Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Select Structure
        </label>
        <select
          className="w-full px-3 py-2 border border-gold/30 rounded-md bg-ivory text-sm mb-4 focus:outline-gold"
          value={promptStrucure || ""}
          onChange={(e) => setPromptStrucure(e.target.value)}
        >
          <option value="aichemist-formula">AICHEMIST Formula</option>
          <option value="json">JSON</option>
          <option value="yaml">YAML</option>
          <option value="plain-text">Plain Text</option>
          <option value="javascript-jsx">JavaScript/JSX</option>
          <option value="toml">TOML</option>
          <option value="markdown">Markdown</option>
        </select>
      </div>

      {/* Generate Button */}
      {!improvedPrompt && (
        <button
          onClick={handleGenerateImprovedPrompt}
          disabled={isGenerating}
          className="w-full bg-gold hover:bg-gold/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-3 sm:px-6 rounded-md font-medium transition-colors flex items-center justify-center gap-2 mb-4"
        >
          {isGenerating ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <RefreshCw className="w-5 h-5" />
          )}
          {isGenerating
            ? "Improving Prompt..."
            : `Generate Improved Prompt (5 Charms)`}
        </button>
      )}

      {/* Improved Prompt Display */}
      {improvedPrompt && (
        <div className="space-y-4">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray mb-2">
              Improved Prompt with Evaluation & Iteration
            </h3>
            <div className="bg-ivory border border-gold/30 rounded-md p-3 sm:p-4">
              <pre className="whitespace-pre-wrap text-xs sm:text-sm text-gray font-mono">
                {improvedPrompt}
              </pre>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-ivory border border-gold/30 text-gray rounded-md w-full sm:w-auto"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
            <button
              onClick={handleSaveToLibrary}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-ivory border border-gold/30 text-gray rounded-md w-full sm:w-auto"
            >
              <BookOpen className="w-4 h-4" />
              Save to Library
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IterateImproveStep;
