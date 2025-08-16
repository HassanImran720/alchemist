"use client";
import React from "react";
import { BookOpen } from "lucide-react";

const rules: string[] = [
  "Always specify context and desired outcome clearly",
  "Include relevant examples when possible",
  "Test and iterate based on results",
  "Document successful formulas in your archive",
];

const LabRules: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Core Principles */}
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-black mb-6 flex items-center gap-2">
          <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
          Core Principles
        </h3>
        <div className="space-y-4">
          {rules.map((rule, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 text-sm sm:text-base leading-relaxed"
            >
              <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0"></div>
              <span className="text-gray">{rule}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LabRules;
