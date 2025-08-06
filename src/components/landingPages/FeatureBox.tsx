import React from "react";

export interface FeatureBoxProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureBox: React.FC<FeatureBoxProps> = ({ icon, title, description }) => {
  return (
    <div
      className={`bg-slate rounded-xl p-5 sm:p-6 flex flex-col items-start min-w-[180px] sm:min-w-[220px] min-h-[160px] sm:min-h-[200px] shadow-md transition-all duration-200
        hover:border-gold hover:shadow-gold/30 hover:shadow-lg hover:ring-2 hover:ring-gold/30 w-full`}
    >
      <div className="mb-4 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-gold/10 rounded-md">
        <span className="text-gold text-xl sm:text-2xl">{icon}</span>
      </div>
      <h3 className="text-beige font-bold text-base sm:text-lg mb-2">{title}</h3>
      <p className="text-gray text-xs sm:text-sm">{description}</p>
    </div>
  );
};

export default FeatureBox;
