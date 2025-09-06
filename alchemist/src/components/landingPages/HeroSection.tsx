import React from "react";
import Link from "next/link";
const HeroSection: React.FC = () => {
  return (
    <section className="flex flex-col bg-[#1a1a1a] items-center justify-center min-h-[70vh] w-full text-center relative z-10 px-4 sm:px-8">
      <h1 className="text-gold font-heading text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4">
        From Raw Thought to
        <br className="hidden md:block" /> Prompted Gold.
      </h1>
      <p className="text-gray text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto">
        Transform ideas into precision through the art of prompt alchemy.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md sm:max-w-none">
        <Link href="/lab">
          <button
            aria-label="Enter the Lab"
            className="bg-gradient-to-r from-[#e0b347] to-[#c8921a] text-charcoal font-bold text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-5 rounded-xl shadow-lg hover:bg-neutral transition-colors min-w-[180px] sm:min-w-[220px] w-full sm:w-auto"
          >
            Enter the Lab
          </button>
        </Link>

        <Link href="/login">
          <button
            aria-label="Login"
            className="bg-transparent border-2 border-neutral text-ivory font-semibold text-sm sm:text-base px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-xl hover:bg-neutral transition-colors min-w-[90px] sm:min-w-[110px] w-full sm:w-auto"
          >
            Login
          </button>
        </Link>
      </div>
      {/* Decorative Glows */}
      <span className="absolute left-0 top-1/2 w-48 h-48 bg-gold opacity-10 rounded-full blur-3xl -translate-y-1/2 -z-10" />
      <span className="absolute right-0 top-1/2 w-48 h-48 bg-gold opacity-10 rounded-full blur-3xl -translate-y-1/2 -z-10" />
    </section>
  );
};

export default HeroSection;
