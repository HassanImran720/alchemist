// import React from "react";

// export interface FeatureBoxProps {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
// }

// const FeatureBox: React.FC<FeatureBoxProps> = ({ icon, title, description }) => {
//   return (
//     // <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-6 flex flex-col items-start h-full transition-all duration-200 hover:border-gold/50 hover:shadow-lg">
//    <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-6 flex flex-col items-start h-[300px] transition-all duration-200 hover:border-gold/50 hover:shadow-lg">

//     {/* Icon container */}
//       <div className="mb-4 w-10 h-10 flex items-center justify-center bg-[#d4af37]/10 rounded-md">
//         <span className="text-gold text-2xl">{icon}</span>
//       </div>

//       {/* Title */}
//       <h3 className="text-beige font-semibold text-xl mb-3 leading-tight">
//         {title}
//       </h3>

//       {/* Description */}
//       <p className="text-gray text-md leading-relaxed flex-grow">
//         {description}
//       </p>
//     </div>
//   );
// };

// export default FeatureBox;
import React from "react";

export interface FeatureBoxProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureBox: React.FC<FeatureBoxProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-6 flex flex-col items-start min-h-[300px] transition-all duration-200 hover:border-gold/50 hover:shadow-lg shadow-gold gap-y-4">
      
      {/* Icon container */}
      <div className="w-12 h-12 flex items-center justify-center bg-[#d4af37]/10 rounded-md">
        <span className="text-gold text-3xl">{icon}</span>
      </div>

      {/* Title */}
      <h3 className="text-beige font-semibold text-2xl leading-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray text-md leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureBox;
