"use client";
import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import LabRules from "./LabRules";
import ModelBreakdowns from "./ModelBreakdowns";
import SamplePrompting from "./SamplePrompting";

type TabType = "rules" | "models" | "prompting";

const LearnAndBuild: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("rules");

  return (
    <div className="px-[10.875rem] p-10 space-y-4 container">
      {/* Header */}
      <div className=" ">
        <h1 className="text-xl font-bold text-black font-heading">Learn and Build</h1>
        <p className="text-gray">Master the art of prompt engineering</p>
      </div>

      {/* Tab Navigation */}
    <div className="px-1 py-1 bg-gold/30 rounded-xl mb-6">
        <div className="flex w-full rounded-lg overflow-hidden text-sm font-medium text-gray">
            <button
            onClick={() => setActiveTab("rules")}
            className={`w-1/3 text-center px-6 py-1 transition-colors rounded-xl ${
                activeTab === "rules"
                ? "bg-white text-black"
                : "bg-transparent text-gray hover:text-black"
            }`}
            >
            Lab Rules
            </button>
            <button
            onClick={() => setActiveTab("models")}
            className={`w-1/3 text-center px-6 py-1.5 transition-colors rounded-xl ${
                activeTab === "models"
                ? "bg-white text-black"
                : "bg-transparent text-gray hover:text-black"
            }`}
            >
            Model Breakdowns
            </button>
            <button
            onClick={() => setActiveTab("prompting")}
            className={`w-1/3 text-center px-6 py-1.5 transition-colors rounded-xl ${
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
      <div className="">
        {activeTab === "rules" && <LabRules />}
        {activeTab === "models" && <ModelBreakdowns />}
        {activeTab === "prompting" && <SamplePrompting />}
      </div>
    </div>
  );
};

export default LearnAndBuild;
