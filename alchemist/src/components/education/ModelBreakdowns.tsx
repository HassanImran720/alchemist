// "use client";
// import React from "react";
// import { Star, Brain, Target, Zap } from "lucide-react";

// interface ModelCard {
//   id: string;
//   name: string;
//   description: string;
//   recommendation: string;
//   icon: React.ReactNode;
// }

// const ModelBreakdowns: React.FC = () => {
//   const models: ModelCard[] = [
//     {
//       id: "gpt4",
//       name: "GPT-4",
//       description: "Most capable general-purpose model",
//       recommendation: "Best for complex reasoning tasks",
//       icon: <Star className="w-6 h-6" />,
//     },
//     {
//       id: "claude",
//       name: "Claude",
//       description: "Strong at analysis and writing",
//       recommendation: "Excellent for content creation",
//       icon: <Brain className="w-6 h-6" />,
//     },
//     {
//       id: "gemini",
//       name: "Gemini",
//       description: "Google's multimodal model",
//       recommendation: "Great for search integration",
//       icon: <Target className="w-6 h-6" />,
//     },
//     {
//       id: "palm",
//       name: "PaLM",
//       description: "Efficient for specific tasks",
//       recommendation: "Good for specialized workflows",
//       icon: <Zap className="w-6 h-6" />,
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
//       {models.map((model) => (
//         <div
//           key={model.id}
//           className="rounded-lg border-[0.5px] border-gold/30 p-6 hover:shadow-md transition-shadow"
//         >
//           <div className="flex items-start mb-2">
//             <div className="text-gold mr-2">{model.icon}</div>
//             <h3 className="text-lg font-semibold text-black">{model.name}</h3>
//           </div>
//           <p className="text-gray text-sm">{model.description}</p>
//           <p className="text-sm font-medium text-black">{model.recommendation}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ModelBreakdowns;
// "use client";
// import React from "react";
// import { Star, Brain, Target, Zap, Code, Cpu } from "lucide-react";

// interface ModelCard {
//   id: string;
//   name: string;
//   description: string;
//   recommendation: string;
//   icon: React.ReactNode;
// }

// const ModelBreakdowns: React.FC = () => {
//   const models: ModelCard[] = [
//     {
//       id: "modelA",
//       name: "MODEL A",
//       description: "1 SENTENCE SUMMARY",
//       recommendation: "GOOD FOR - [E.G. REASONING]",
//       icon: <Star className="w-8 h-8" />,
//     },
//     {
//       id: "modelB",
//       name: "MODEL B",
//       description: "1 SENTENCE SUMMARY",
//       recommendation: "GOOD FOR - [E.G. REASONING]",
//       icon: <Brain className="w-8 h-8" />,
//     },
//     {
//       id: "modelC",
//       name: "MODEL C",
//       description: "1 SENTENCE SUMMARY",
//       recommendation: "GOOD FOR - [E.G. REASONING]",
//       icon: <Target className="w-8 h-8" />,
//     },
//     {
//       id: "modelD",
//       name: "MODEL D",
//       description: "1 SENTENCE SUMMARY",
//       recommendation: "GOOD FOR - [E.G. REASONING]",
//       icon: <Zap className="w-8 h-8" />,
//     },
//     {
//       id: "modelE",
//       name: "MODEL E",
//       description: "1 SENTENCE SUMMARY",
//       recommendation: "GOOD FOR - [E.G. REASONING]",
//       icon: <Code className="w-8 h-8" />,
//     },
//     {
//       id: "modelG",
//       name: "MODEL G",
//       description: "1 SENTENCE SUMMARY",
//       recommendation: "GOOD FOR - [E.G. REASONING]",
//       icon: <Cpu className="w-8 h-8" />,
//     },
//   ];

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-6">
//       {models.map((model) => (
//         <div
//           key={model.id}
//           className="flex flex-col items-center text-center"
//         >
//           {/* Icon area - beige/cream background */}
//           <div className="bg-stone-200 w-20 h-20 rounded flex items-center justify-center mb-2">
//             <div className="text-gray-600">
//               {model.icon}
//             </div>
//           </div>
          
//           {/* Yellow model name badge */}
//           <div className="bg-gold px-3 py-1 rounded-sm text-xs font-bold text-black mb-2">
//             {model.name}
//           </div>
          
//           {/* Description and recommendation */}
//           <div className="space-y-1 max-w-40">
//             <p className="text-xs font-semibold text-gray-900 uppercase leading-tight">
//               {model.description}
//             </p>
//             <p className="text-xs text-gray-700 uppercase leading-tight">
//               {model.recommendation}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ModelBreakdowns;

"use client";
import React from "react";
import { Star, Brain, Target, Zap, Code, Cpu } from "lucide-react";

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
      id: "modelA",
      name: "MODEL A",
      description: "1 SENTENCE SUMMARY",
      recommendation: "GOOD FOR - [E.G. REASONING]",
      icon: <Star className="w-10 h-10" />, // increased size
    },
    {
      id: "modelB",
      name: "MODEL B",
      description: "1 SENTENCE SUMMARY",
      recommendation: "GOOD FOR - [E.G. REASONING]",
      icon: <Brain className="w-10 h-10" />,
    },
    {
      id: "modelC",
      name: "MODEL C",
      description: "1 SENTENCE SUMMARY",
      recommendation: "GOOD FOR - [E.G. REASONING]",
      icon: <Target className="w-10 h-10" />,
    },
    {
      id: "modelD",
      name: "MODEL D",
      description: "1 SENTENCE SUMMARY",
      recommendation: "GOOD FOR - [E.G. REASONING]",
      icon: <Zap className="w-10 h-10" />,
    },
    {
      id: "modelE",
      name: "MODEL E",
      description: "1 SENTENCE SUMMARY",
      recommendation: "GOOD FOR - [E.G. REASONING]",
      icon: <Code className="w-10 h-10" />,
    },
    {
      id: "modelG",
      name: "MODEL G",
      description: "1 SENTENCE SUMMARY",
      recommendation: "GOOD FOR - [E.G. REASONING]",
      icon: <Cpu className="w-10 h-10" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 p-8">
      {models.map((model) => (
        <div
          key={model.id}
          className="flex flex-col items-center text-center"
        >
          {/* Icon area - beige/cream background */}
          <div className="bg-stone-200 w-24 h-24 rounded flex items-center justify-center mb-3">
            <div className="text-gray-600">{model.icon}</div>
          </div>

          {/* Yellow model name badge */}
          <div className="bg-gold px-4 py-1.5 rounded-sm text-sm font-bold text-black mb-3">
            {model.name}
          </div>

          {/* Description + recommendation in one line */}
          <div className="max-w-56">
            <p className="text-sm text-gray-900 uppercase font-medium leading-snug">
              {model.description} • {model.recommendation}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModelBreakdowns;
