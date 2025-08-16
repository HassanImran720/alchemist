"use client";
import React, { useState } from "react";
import LabRules from "./LabRules";
import ModelBreakdowns from "./ModelBreakdowns";
import SamplePrompting from "./SamplePrompting";

type TabType = "rules" | "models" | "prompting";

const LearnAndBuild: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("rules");

  return (
    <div className="container px-4 sm:px-8 lg:px-[10.875rem] p-6 sm:p-8 lg:p-10 space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-black font-heading">
          Learn and Build
        </h1>
        <p className="text-gray text-sm sm:text-base">
          Master the art of prompt engineering
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="px-1 py-1 bg-gold/30 rounded-xl mb-6">
        <div className="flex flex-col sm:flex-row w-full rounded-lg overflow-hidden text-sm font-medium text-gray">
          <button
            onClick={() => setActiveTab("rules")}
            className={`flex-1 text-center px-4 sm:px-6 py-2 transition-colors rounded-xl ${
              activeTab === "rules"
                ? "bg-white text-black"
                : "bg-transparent text-gray hover:text-black"
            }`}
          >
            Lab Rules
          </button>
          <button
            onClick={() => setActiveTab("models")}
            className={`flex-1 text-center px-4 sm:px-6 py-2 transition-colors rounded-xl ${
              activeTab === "models"
                ? "bg-white text-black"
                : "bg-transparent text-gray hover:text-black"
            }`}
          >
            Model Breakdowns
          </button>
          <button
            onClick={() => setActiveTab("prompting")}
            className={`flex-1 text-center px-4 sm:px-6 py-2 transition-colors rounded-xl ${
              activeTab === "prompting"
                ? "bg-white text-black"
                : "bg-transparent text-gray hover:text-black"
            }`}
          >
            Sample Prompting
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "rules" && <LabRules />}
        {activeTab === "models" && <ModelBreakdowns />}
        {activeTab === "prompting" && <SamplePrompting />}
      </div>
    </div>
  );
};

export default LearnAndBuild;
