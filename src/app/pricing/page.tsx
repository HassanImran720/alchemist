
import PricingSection from "../../components/pricing/PricingSection";
import { PricingBoxProps } from "../../components/pricing/PricingBox";


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
      "Marketplace access",
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
      "Marketplace access",
      "Learning portal",
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
      "Marketplace access",
      "Learning portal",
    ],
    buttonText: "Get Premium",
  },
];

export default function PricingPage() {
  return <PricingSection plans={plans} />;
}
