"use client";
import React from "react";
import { Star, Brain, Target, Zap } from "lucide-react";

interface ModelCard {
  id: string;
  name: string;
  description: string;
  recommendation: string;
  icon: React.ReactNode;
}

const ModelBreakdowns: React.FC = () => {
  const models: ModelCard[] = [
    {
      id: "gpt4",
      name: "GPT-4",
      description: "Most capable general-purpose model",
      recommendation: "Best for complex reasoning tasks",
      icon: <Star className="w-6 h-6" />,
    },
    {
      id: "claude",
      name: "Claude",
      description: "Strong at analysis and writing",
      recommendation: "Excellent for content creation",
      icon: <Brain className="w-6 h-6" />,
    },
    {
      id: "gemini",
      name: "Gemini",
      description: "Google's multimodal model",
      recommendation: "Great for search integration",
      icon: <Target className="w-6 h-6" />,
    },
    {
      id: "palm",
      name: "PaLM",
      description: "Efficient for specific tasks",
      recommendation: "Good for specialized workflows",
      icon: <Zap className="w-6 h-6" />,
    },
  ];

  return (
  <div className="grid grid-cols-2 gap-6 items-start">
  {models.map((model) => (
    <div
      key={model.id}
      className="rounded-lg border-[0.5px] border-gold/30 p-6 hover:shadow-md min-h"
    >
      <div className="flex items-start mb-2">
        <div className="text-gold mr-1">{model.icon}</div>
        <div>
          <h3 className="text-lg font-semibold text-black">{model.name}</h3>
        </div>
      </div>
      <p className="text-gray text-sm">{model.description}</p>
      <p className="text-sm font-medium text-black">{model.recommendation}</p>
    </div>
  ))}
</div>

  );
};

export default ModelBreakdowns;
