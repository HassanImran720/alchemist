import React from "react";
import FeatureBox, { FeatureBoxProps } from "./FeatureBox";
import { RefreshCw, Sparkles, Target, Zap } from "lucide-react";
import EngineeredExcellence from "./EngineeredExcellence";

const features: FeatureBoxProps[] = [
  {
    icon: <Zap size={28} />,
    title: "Fast Loop Refinement",
    description: "Craft better prompts in seconds using guided iteration.",
  },
  {
    icon: <RefreshCw size={28} />,
    title: "Intelligent Iterations",
    description: "AI-powered suggestions to improve your prompt effectiveness.",
  },
  {
    icon: <Target size={28} />,
    title: "Precision Targeting",
    description: "Hit the exact output you need with context-aware refinements.",
  },
  {
    icon: <Sparkles size={28} />,
    title: "Master Your Craft",
    description: "Learn advanced prompting techniques through practice and feedback.",
  },
];

// const FeaturesSection: React.FC = () => {
//   return (
//     <section id="features" className="w-full bg-charcoal py-10 sm:py-16 px-2 sm:px-4">
//       <div className="max-w-6xl mx-auto flex flex-col items-center">
//         <EngineeredExcellence />
        
//         <div className="flex flex-wrap gap-4 sm:gap-6 w-full">
//           {features.map((feature, idx) => (
//             <div
//               key={feature.title}
//               className="w-full xs:w-1/2 md:w-1/4 flex"
//             >
//               <FeatureBox {...feature} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

const FeaturesSection: React.FC = () => {
  return (
    <section className="w-full bg-charcoal py-10 sm:py-16 px-2 sm:px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <EngineeredExcellence />

        {/* <div className="flex flex-wrap sm:gap-6 w-full justify-center">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="w-full sm:w-1/2 md:w-1/5 flex"
            >
              <FeatureBox {...feature} />
            </div>
          ))}
        </div> */}
        <div className="flex flex-wrap gap-4 sm:gap-6 w-full justify-center">
  {features.map((feature) => (
    <div
      key={feature.title}
      className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 flex justify-center"
    >
      <FeatureBox {...feature} />
    </div>
  ))}
</div>

      </div>
    </section>
  );
};

export default FeaturesSection;
