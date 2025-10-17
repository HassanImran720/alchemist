"use client";

import React from "react";
import { Lightbulb } from "lucide-react";
import Link from "next/link";

const MarketplaceComingSoon: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-ivory px-4 text-center">
      <Lightbulb className="w-16 h-16 text-gold mb-4 animate-pulse" />
      <h1 className="text-3xl sm:text-4xl font-bold text-black mb-2">
        Marketplace - Coming Soon
      </h1>
      <p className="text-gray-700 text-lg sm:text-xl max-w-md mb-6">
        Exciting features are on the way! In the meantime, you can explore other tools in the Prompt Lab.
      </p>
      <Link
        href="/lab"
        className="px-6 py-3 bg-gold text-white rounded-md font-medium hover:bg-gold/90 transition-colors"
      >
        Go to Prompt Lab
      </Link>
    </div>
  );
};

export default MarketplaceComingSoon;
