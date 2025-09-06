import React from "react";
import FeatureBox, { FeatureBoxProps } from "./FeatureBox";
import { RefreshCw, Sparkles, Target, Zap } from "lucide-react";
import EngineeredExcellence from "./EngineeredExcellence";

const features: FeatureBoxProps[] = [
  {
    icon: <Zap size={24} />,
    title: "Create - Guided AI Workflow",
    description:
      "From scattered ideas to optimized prompts, step-by-step workflow helps creators shape and refine their work into a final masterpiece.",
  },
  {
    icon: <RefreshCw size={24} />,
    title: "Organize - Prompt Library",
    description:
      "Store and organize every prompt and response in one place, so your best work is always within reach.",
  },
  {
    icon: <Target size={24} />,
    title: "Discover - Prompt Marketplace",
    description:
      "Explore a marketplace of finely crafted prompts, designed to transform your ideas and outcomes.",
  },
  {
    icon: <Sparkles size={24} />,
    title: "Master - Educational Resources",
    description:
      "Access resources, training, and community support to adapt and excel in a world shaped by AI.",
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="w-full bg-charcoal py-10 sm:py-16 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto">
        <EngineeredExcellence />
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {features.map((feature, index) => (
            <div key={feature.title} className="w-full">
              <FeatureBox {...feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;