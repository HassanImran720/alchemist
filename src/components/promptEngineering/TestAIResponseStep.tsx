"use client";
import React, { useState } from 'react';

interface TestAIResponseStepProps {
  generatedPrompt: string;
  onTestComplete: (response: string) => void;
}

const TestAIResponseStep: React.FC<TestAIResponseStepProps> = ({
  generatedPrompt,
  onTestComplete
}) => {
  const [aiResponse, setAiResponse] = useState(
    `reset in Costa Rica ✈
• **Channel**: LinkedIn → Discovery Call (Include bonus guide: "Why Breathworkers Love This Trip")

#### 3. **Zoe Kim (Mindfulness) – Seattle, WA**

• **Messaging Hook**: "Mindful travel made effortless ✈"
• **CTA**: "Let us plan your next intentional escape"
• **Channel**: Email → Text reminder → IG carousel post

---

## 🎯 SALES ENABLEMENT & CLOSING TOOLS

• ✅ **Live Client Q&A Webinars** (Biweekly)
• ✅ **7-Day Decision Window Offer** (Incentivize conversion)
• ✅ **Interactive Proposal Generator** (Include visuals, testimonials, add-ons)
• ✅ **Post-Trip Guarantee**: "Not transformed? Get refund..."

Test your prompt with an AI model and paste the response above to evaluate its quality.`
  );

  return (
    <div className="bg-ivory rounded-lg p-4 sm:p-6 mb-6 border-[0.5px] border-gold/30">
      {/* Step Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-ivory font-bold text-sm">
          6
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-charcoal">
          Test AI Response
        </h2>
      </div>

      <div className="space-y-4">
        {/* Textarea Input */}
        <div>
          <label className="block text-sm font-medium text-gray mb-2">
            Paste AI Response for Evaluation
          </label>
          <textarea
            value={aiResponse}
            onChange={(e) => {
              setAiResponse(e.target.value);
              if (e.target.value) {
                onTestComplete(e.target.value);
              }
            }}
            className="bg-ivory w-full min-h-[12rem] p-4 border-[0.5px] border-gold/30 rounded-md text-sm resize-y focus:ring-2 focus:ring-gold"
            placeholder="reset in Costa Rica..."
          />
        </div>

        {/* Helper Text */}
        <div className="text-sm text-gray leading-relaxed">
          Test your prompt with an AI model and paste the response above to evaluate its quality.
        </div>
      </div>
    </div>
  );
};

export default TestAIResponseStep;
