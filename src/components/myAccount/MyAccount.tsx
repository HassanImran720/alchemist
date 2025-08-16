"use client";
import React from "react";
import { User, Crown } from "lucide-react";

const MyAccount: React.FC = () => {
  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center">
        {/* Profile Avatar with PRO Badge */}
        <div className="relative inline-block mb-6">
          <div className="w-15 h-15 sm:w-24 sm:h-24 bg-gold rounded-full flex items-center justify-center shadow-lg">
            <User className="w-8 h-8 sm:w-10 sm:h-10 text-ivory" />
          </div>
          {/* PRO Badge */}
          <div className="absolute -top-2 -right-2 bg-gold text-ivory text-xs font-bold px-2 py-1 rounded-full shadow-md">
            👑 PRO
          </div>
        </div>

        {/* Title and Description */}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-charcoal mb-2">
          My Account
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Manage your AIChemist profile and preferences
        </p>
      </div>

      {/* Account Statistics Card */}
      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
         <div className="bg-ivory rounded-xl shadow-sm border-[0.5px] border-gold/30 p-3 sm:p-6">
  <h2 className="text-lg sm:text-xl font-semibold text-gray mb-4 text-left">
    Account Statistics
  </h2>
  
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
    <div className="text-center">
      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gold mb-1">
        247
      </div>
      <div className="text-gray-500 text-sm sm:text-base">
        Active Formulas
      </div>
    </div>
    
    <div className="text-center">
      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gold mb-1">
        94%
      </div>
      <div className="text-gray-500 text-sm sm:text-base">
        Success Rate
      </div>
    </div>
    
    <div className="text-center">
      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gold mb-1">
        1,250
      </div>
      <div className="text-gray-500 text-sm sm:text-base">
        Charms Available
      </div>
    </div>
    
    <div className="text-center">
      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gold mb-1">
        89
      </div>
      <div className="text-gray-500 text-sm sm:text-base">
        Lab Sessions
      </div>
    </div>
  </div>
</div>

        </div>
      </div>

      {/* Profile Settings Section */}
      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-ivory rounded-xl shadow-sm border-[0.5px] border-gold/30 p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">
              Profile Settings
            </h2>
            
            <button className="w-full bg-gold text-ivory py-3 px-6 rounded-lg font-medium transition-colors mb-6 text-sm sm:text-base">
              TELL US ABOUT YOURSELF
            </button>
            
            <div className="space-y-3">
              {[
                "RESET EVERYTHING",
                "ACCESS PROMPT LIBRARY",
                "CONTINUE LEARNING", 
                "PROVIDE FEEDBACK",
                "GET SUPPORT",
              ].map((item, idx) => (
                <button
                  key={idx}
                  className="w-full text-left py-3 px-4 text-sm sm:text-base text-gray hover:text-gold hover:bg-gray-50 transition-all rounded-lg font-medium"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;