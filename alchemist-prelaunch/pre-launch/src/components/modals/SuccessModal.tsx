"use client";
import React from "react";
import { Mail } from "lucide-react";

interface SuccessModalProps {
  open: boolean;
  name?: string;
}

export default function SuccessModal({ open, name }: SuccessModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 animate-fade-in-out px-4">
      <div className="bg-[#1a1a1a] border border-[#2c2c2c] rounded-xl p-6 sm:p-8 w-full max-w-sm text-center shadow-lg">
        <Mail
          size={40}
          className="sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-[#e0b347]"
        />
        <h2 className="text-lg sm:text-xl font-bold text-beige mb-1 sm:mb-2">
          Join the Lab
        </h2>
        <p className="text-base sm:text-lg font-semibold text-white">
          Welcome, {name || "AICHEMIST"}
        </p>
        <p className="text-xs sm:text-sm text-gray mt-2">
          Your path to powerful prompting begins here.
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          10% {
            opacity: 1;
            transform: translateY(0);
          }
          90% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(10px);
          }
        }
        .animate-fade-in-out {
          animation: fadeInOut 2.5s ease forwards;
        }
      `}</style>
    </div>
  );
}
