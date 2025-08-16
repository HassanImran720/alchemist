"use client";
import React, { useState } from "react";
import { Lock, Mail } from "lucide-react";

interface LabSealedProps {
  onAccessGranted: () => void;
}

const LabSealed: React.FC<LabSealedProps> = ({ onAccessGranted }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });

  const handleSubscribe = () => {
    setIsModalOpen(false);
    setShowSuccessDialog(true);

    setTimeout(() => {
      setShowSuccessDialog(false);
      onAccessGranted();
    }, 2500);
  };

  return (
    <section className="flex flex-col items-center min-h-[70vh] w-full text-center relative z-10 px-4 sm:px-8 ">
      <h1 className="font-heading text-3xl sm:text-4xl lg:text-8xl font-bold leading-tight mb-4 text-beige">
        The Lab Is Sealed.
      </h1>

      <p className="text-base sm:text-lg lg:text-xl font-semibold mb-4 sm:mb-6 text-beige">
        But you can still be the first to step inside.
      </p>

      <p className="text-base sm:text-lg text-ivory mx-auto mb-6 sm:mb-8 leading-relaxed">
        Get early access to guided AI prompting that fits seamlessly into your
        digital workflow, making it <br/>
        easier to prompt with a purpose and produce
        high-quality results every time.
      </p>

      <button
        aria-label="Request Early Access"
        onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#e0b347] to-[#c8921a] text-charcoal text-sm px-5 sm:px-6 py-3 sm:py-4 rounded-xl shadow-lg transition-all duration-200"
      >
        <Lock size={18} className="sm:w-5 sm:h-5" /> Request Early Access
      </button>

      <p className="text-xs sm:text-sm text-gray mt-4 sm:mt-6">
        Launching in September 2025 – join now for early insights.
      </p>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 px-4">
          <div className="bg-[#1a1a1a] p-5 sm:p-6 rounded-xl w-full max-w-md shadow-lg relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gold hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-xl sm:text-2xl font-bold text-beige mb-4 sm:mb-6 text-center">
              Join the Lab
            </h2>

            <label className="block text-left text-xs sm:text-sm font-medium text-beige mb-1 sm:mb-2">
              Name (optional)
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter your name"
              className="w-full p-2 sm:p-3 mb-3 sm:mb-4 rounded-lg border border-gold bg-transparent text-white focus:outline-none focus:border-[#e0b347] text-sm sm:text-base"
            />

            <label className="block text-left text-xs sm:text-sm font-medium text-beige mb-1 sm:mb-2">
              Email *
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Enter your email"
              className="w-full p-2 sm:p-3 mb-5 sm:mb-6 rounded-lg border border-gray-600 bg-transparent text-white focus:outline-none focus:border-[#e0b347] text-sm sm:text-base"
            />

            <button
              onClick={handleSubscribe}
              className="w-full bg-gradient-to-r from-[#e0b347] to-[#c8921a] text-black font-bold py-2.5 sm:py-3 rounded-lg shadow-lg text-sm sm:text-base"
            >
              Subscribe
            </button>
          </div>
        </div>
      )}

      {/* Success Dialog */}
      {showSuccessDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 animate-fade-in-out px-4">
          <div className="bg-[#1a1a1a] border border-[#2c2c2c] rounded-xl p-6 sm:p-8 w-full max-w-sm text-center shadow-lg">
            <Mail size={40} className="sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-[#e0b347]" />
            <h2 className="text-lg sm:text-xl font-bold text-beige mb-1 sm:mb-2">
              Join the Lab
            </h2>
            <p className="text-base sm:text-lg font-semibold text-white">
              Welcome, {form.name || "AICHEMIST"}
            </p>
            <p className="text-xs sm:text-sm text-gray-300 mt-2">
              Your path to powerful prompting begins here.
            </p>
          </div>
        </div>
      )}

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
    </section>
  );
};

export default LabSealed;
