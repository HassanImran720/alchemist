"use client";
import React from "react";
import { User, Crown, ChevronLeft } from "lucide-react";

const MyAccount: React.FC = () => {
  return (
    <div className="px-[10.875rem] p-10 space-y-4 container">
      {/* Header */}
      <div className="px-8 py-6 border-b border-gold/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-black font-heading">My Account</h1>
            <p className="text-gray mt-1">Manage your AIChemist profile and preferences</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex flex-col items-center">
              {/* <div className="flex items-center gap-2 bg-gold px-3 py-1 rounded-full">
                <Crown className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-semibold">PRO</span>
              </div> */}
              <span className="text-black font-medium mt-1">@username</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-8">
        {/* Account Statistics */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-black mb-6">Account Statistics</h2>
          <div className="grid grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-gold mb-2">247</div>
              <div className="text-gray text-sm font-medium">Active Formulas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gold mb-2">94%</div>
              <div className="text-gray text-sm font-medium">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gold mb-2">1,250</div>
              <div className="text-gray text-sm font-medium">Charms Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gold mb-2">89</div>
              <div className="text-gray text-sm font-medium">Lab Sessions</div>
            </div>
          </div>
        </div>

        {/* Profile Settings */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-black mb-6">Profile Settings</h2>
          <div className="bg-white rounded-lg shadow-sm border border-gold/20 p-6">
            <button className="w-full bg-gold text-white py-3 px-6 rounded-md font-medium hover:bg-gold/90 transition-colors mb-4">
              TELL US ABOUT YOURSELF
            </button>
            <div className="space-y-2 text-sm text-gray">
              <div>RESET EVERYTHING</div>
              <div>ACCESS PROMPT LIBRARY</div>
              <div>CONTINUE LEARNING</div>
              <div>PROVIDE FEEDBACK</div>
              <div>GET SUPPORT</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-4 left-4">
        <button className="flex items-center gap-2 text-gold font-semibold hover:text-gold/80 transition-colors">
          <ChevronLeft className="w-5 h-5" />
          Collapse Lab
        </button>
      </div>
    </div>
  );
};

export default MyAccount;