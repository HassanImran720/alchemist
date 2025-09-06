import React from "react";

export interface PricingBoxProps {
  plan: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  buttonText: string;
  highlighted?: boolean;
  badge?: string;
}

const PricingBox: React.FC<PricingBoxProps> = ({
  plan,
  price,
  period = "/month",
  description,
  features,
  buttonText,
  highlighted = false,
  badge,
}) => {
  return (
    <div
      className={`relative bg-slate rounded-xl p-4 flex flex-col items-center shadow-md transition-all duration-200 w-full max-w-sm mx-auto
        ${
          highlighted
            ? "border border-gold ring-2 ring-gold/40 scale-105 z-10"
            : "border border-neutral"
        }
      `}
    >
      {badge && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#e0b347] to-[#c8921a] text-charcoal text-xs font-bold px-4 py-1.5 rounded-full shadow-md border border-gold">
          {badge}
        </span>
      )}

      <h3 className="text-beige font-bold text-lg sm:text-xl md:text-2xl mb-2 text-center">
        {plan}
      </h3>

      <div className="flex items-end justify-center mb-2">
        <span className="text-gold font-bold text-3xl md:text-4xl mr-1">
          {price}
        </span>
        <span className="text-gray text-sm md:text-base mb-1">{period}</span>
      </div>

      <p className="text-gray text-sm md:text-base mb-4 text-center max-w-xs">
        {description}
      </p>

      <ul className="flex-1 w-full mb-6 space-y-2">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-gray text-sm md:text-base">
            <span className="text-gold text-lg md:text-xl">✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-2 rounded-md font-semibold mt-auto transition-colors text-sm md:text-base ${
          highlighted
            ? "bg-gradient-to-r from-[#e0b347] to-[#c8921a] text-charcoal hover:bg-neutral"
            : "bg-transparent border border-neutral text-beige hover:bg-neutral"
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default PricingBox;
