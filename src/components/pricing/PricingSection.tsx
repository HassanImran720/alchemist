"use client"
import React, { useState } from "react";
import PricingBox, { PricingBoxProps } from "./PricingBox";


export interface PricingSectionProps {
  plans: PricingBoxProps[];
}

const PricingSection: React.FC<PricingSectionProps> = ({ plans }) => {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  // Pricing logic for monthly/yearly toggle
  const getPrice = (plan: PricingBoxProps) => {
    if (plan.plan === 'Free') return '$0';
    if (billing === 'yearly') {
      if (plan.plan === 'Pro') return '$39';
      if (plan.plan === 'Premium') return '$79';
      if (plan.plan === 'Basic') return '$15';
    }
    return plan.price;
  };

  const getPeriod = () => (billing === 'yearly' ? '/month (billed yearly)' : '/month');

  return (
    <section className="w-full bg-charcoal py-8 px-2sm:px-4 flex flex-col items-center">
      <h2 className="text-beige font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center">
        Simple, Transparent Pricing
      </h2>
      <p className="text-gray text-base sm:text-lg mb-6 text-center max-w-2xl">
        No credit card required. All plans include the marketplace. Pro and Premium include the learning portal.
      </p>
      <div className="flex items-center gap-4 mb-10">
        <span className={`font-semibold ${billing === 'monthly' ? 'text-gold' : 'text-gray'}`}>Monthly</span>
        <button
          className={`w-12 h-6 rounded-full bg-neutral relative transition-colors duration-200 focus:outline-none`}
          aria-label="Toggle billing period"
          onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')}
        >
          <span
            className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-gold shadow transition-transform duration-200 ${billing === 'yearly' ? 'translate-x-6' : ''}`}
          />
        </button>
        <span className={`font-semibold ${billing === 'yearly' ? 'text-gold' : 'text-gray'}`}>Yearly <span className="text-xs">(save up to 20%)</span></span>
      </div>
      <div className="flex flex-col md:flex-row gap-8 md:gap-6 w-full max-w-5xl justify-center items-stretch">
        {plans.map((plan) => (
          <PricingBox
            key={plan.plan}
            {...plan}
            price={getPrice(plan)}
            period={getPeriod()}
          />
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
