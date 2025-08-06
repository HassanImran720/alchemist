import React from "react";
import PricingBox, { PricingBoxProps } from "../pricing/PricingBox";

const plans: PricingBoxProps[] = [
  {
    plan: "Basic",
    price: "$19",
    description: "Perfect for getting started",
    features: [
      "100 prompt refinements/month",
      "Basic loop iterations",
      "Standard templates",
      "Email support",
    ],
    buttonText: "Start Basic",
  },
  {
    plan: "Pro",
    price: "$49",
    description: "For serious prompt engineers",
    features: [
      "Unlimited refinements",
      "Advanced AI iterations",
      "Custom templates",
      "Priority support",
      "Team collaboration",
      "Export & sharing",
    ],
    buttonText: "Go Pro",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    plan: "Premium",
    price: "$99",
    description: "Enterprise-grade craftsmanship",
    features: [
      "Everything in Pro",
      "White-label options",
      "Advanced analytics",
      "Custom integrations",
      "Dedicated support",
      "Training sessions",
    ],
    buttonText: "Get Premium",
  },
];

const PricingSection: React.FC = () => {
  return (
    <section className="w-full bg-charcoal py-16 px-2 sm:px-4 flex flex-col items-center">
      <h2 className="text-beige font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center">
        Plans for Every Level of Craft
      </h2>
      <p className="text-gray text-base sm:text-lg mb-12 text-center max-w-2xl">
        From individual creators to enterprise teams, find the perfect plan for your prompting needs.
      </p>
      <div className="flex flex-col md:flex-row gap-8 md:gap-6 w-full max-w-5xl justify-center items-stretch">
        {plans.map((plan) => (
          <PricingBox key={plan.plan} {...plan} />
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
