"use client";
import React from "react";
import { BookOpen, ArrowRight } from "lucide-react";

const rules: string[] = [
  "Always specify context and desired outcome clearly",
  "Include relevant examples when possible",
  "Test and iterate based on results",
  "Document successful formulas in your archive",
];

const instructions: string[] = [
  "READ INSTRUCTIONS",
  "TASK",
  "CONTEXT",
  "REFERENCE",
  "EVALUATION",
  "ITERATION",
  "VIDEO INSTRUCTIONS",
];

const LabRules: React.FC = () => {
  return (
    <div className="space-y-8 ">
      {/* Core Principles */}
      <div>
        <h3 className="text-xl font-semibold text-black mb-6 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-gold" />
          Core Principles
        </h3>
        <div className="space-y-4">
          {rules.map((rule, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0"></div>
              <span className="text-gray">{rule}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions & Task Section */}
      {/* <div className="grid grid-cols-2 gap-6">
        <div className="bg-gold/10 rounded-lg p-6 space-y-3">
          {instructions.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-sm font-semibold text-black uppercase">{item}</span>
              <ArrowRight className="w-4 h-4 text-gold" />
            </div>
          ))}
        </div>

        <div className="bg-gray/5 rounded-lg p-6">
          <h4 className="font-semibold text-black mb-3">TASK</h4>
          <p className="text-sm text-gray leading-relaxed">
            FILL THIS SPACE WITH THE TEXT OF THE SELECTED EXERCISE FROM THE PROMPT LIBRARY
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default LabRules;
