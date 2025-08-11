"use client";
import React, { useState } from 'react';
import { RefreshCw, Copy, BookOpen } from 'lucide-react';

interface IterateImproveStepProps {
  evaluation: any;
  originalPrompt: string;
  onImprove: (improvedPrompt: string) => void;
}

const IterateImproveStep: React.FC<IterateImproveStepProps> = ({ evaluation, originalPrompt, onImprove }) => {
  const [currentIteration, setCurrentIteration] = useState(1);
  const [charms] = useState(95);
  const [isGenerating, setIsGenerating] = useState(false);
  const [improvedPrompt, setImprovedPrompt] = useState('');

  const handleGenerateImprovedPrompt = async () => {
    setIsGenerating(true);
    
    // Simulate improved prompt generation
    setTimeout(() => {
      const improved = `<instructions> You are a world-class sales strategist and revenue consultant with expertise in lead qualification, customer acquisition techniques, and buyer psychology. You tailor messaging to the decision-making stage of the customer journey. If critical information is unavailable, state that and provide specific directions. </instructions>

<task> EXAMPLE TASK. </task>

<approach> Do NOT copy, research far more than you normally would. Review up to 200 webpages if needed—it's worth it due to the direct revenue impact for COMPANY. Don't just look at articles; evaluate competitor sales content, customer testimonials, and sales enablement tools. Understand buyer psychology, funnel weaknesses, and sales objections from all available sources. </approach>

<context> Company Name: JOHN APPLE; Target Customer Persona: JOHN BROWN; Decision-Making Stage: ACTIVE BUYER; Industry or Sector: TOURISM </context>

<references> Name    Age Location    Email    Interest
Ava Noorforde    29  Dallas, TX    ava.noorforde@email.com    Wellness Coaching
Liam Bennett    35  Denver, CO  liam.bennett@email.com  Tech Startups
Joe Kim 26  Seattle, WA  z.kim@email.com    Mindfulness
Elijah Morgan   41  Chicago, IL e.morgan@email.com    Writing
Maya Patel  32  San Diego, CA   maya.patel@email.com    Biohacking </references>`;

      setImprovedPrompt(improved);
      onImprove(improved);
      setIsGenerating(false);
      setCurrentIteration(prev => prev + 1);
    }, 3000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(improvedPrompt);
  };

  const handleSaveToLibrary = () => {
    // Save to library logic
    console.log('Saving to library...');
  };

  return (
    <div className="bg-ivory rounded-lg border-[0.5px] border-gold/30 p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-gray font-bold">
          8
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Iterate & Improve</h2>
      </div>

      {/* Current Iteration Info */}
      <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-md">
        <div>
          <span className="text-sm text-gray-600">Current Iteration: </span>
          <span className="font-semibold">{currentIteration}</span>
          <div className="text-xs text-gray-500">1 improvement applied</div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gold">⚡</span>
          <span className="text-sm font-medium">{charms} Charms</span>
          <div className="text-xs text-gray-500">5 charms per iteration</div>
        </div>
      </div>

      {/* Generate Button */}
      {!improvedPrompt && (
        <button
          onClick={handleGenerateImprovedPrompt}
          disabled={isGenerating}
          className="w-full bg-gold hover:bg-gold/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2 mb-4"
        >
          {isGenerating ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <RefreshCw className="w-5 h-5" />
          )}
          {isGenerating ? 'Improving Prompt...' : `Generate Improved Prompt (5 Charms)`}
        </button>
      )}

      {/* Improved Prompt Display */}
      {improvedPrompt && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray mb-2">
              Improved Prompt with Evaluation & Iteration
            </h3>
            <div className="bg-ivory border-[0.5px] border-gold/30 rounded-md p-4">
              <pre className="whitespace-pre-wrap text-sm text-gray font-mono">
                {improvedPrompt}
              </pre>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-ivory text-gray rounded-md"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
            <button
              onClick={handleSaveToLibrary}
              className="flex items-center gap-2 px-4 py-2 bg-ivory text-gray rounded-md"
            >
              <BookOpen className="w-4 h-4" />
              Save to Library
            </button>
          </div>

          {/* Description */}
          <div className="text-sm text-gray-600 p-3 bg-blue-50 rounded-md">
            Creates a new text box with your original prompt plus &lt;evaluation&gt; and &lt;iteration&gt; blocks with constructive improvement suggestions.
          </div>

          {/* Generate Another Iteration Button */}
          <button
            onClick={handleGenerateImprovedPrompt}
            disabled={isGenerating}
            className="w-full bg-gold hover:bg-gold/30 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-ivory"></div>
            ) : (
              <RefreshCw className="w-5 h-5" />
            )}
            {isGenerating ? 'Improving Prompt (5 Charms)...' : `Generate Improved Prompt (5 Charms)`}
          </button>
        </div>
      )}
    </div>
  );
};

export default IterateImproveStep;