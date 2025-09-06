"use client";
import React from "react";
import { CircleDot, Lock } from "lucide-react";
import { useWaitlist } from "@/context/WaitlistContext";

const LabSealed = () => {
  const { openSubscribe } = useWaitlist();

  return (
    <section className="flex flex-col items-center min-h-[50vh] sm:min-h-[70vh] w-full text-center relative z-10 px-4 sm:px-8 ">
      <h1 className="font-heading text-3xl sm:text-4xl lg:text-8xl font-bold leading-tight mb-4 text-beige">
        The Lab Is Sealed.
      </h1>

      <p className="text-base sm:text-lg lg:text-2xl font-semibold mb-4 sm:mb-6 text-beige">
        But you can still be the first to step inside.
      </p>

      <p className="text-base sm:text-lg text-browntext mx-auto mb-12 sm:mb-16 leading-relaxed">
        Guided AI prompting crafted for clarity, speed, and consistency
      </p>

      {/* chat box type prompt */}
      <div className="relative w-full sm:w-4/5 md:w-3/5 lg:w-3/6 mx-auto">
        <input
          type="text"
          onClick={openSubscribe}
          placeholder="Request Early Access"
          className="w-full bg-[#1a1a1a] border border-yellow-500 rounded-full
                     px-4 sm:px-6 py-2.5 sm:py-3 pr-10 sm:pr-12
                     focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500
                     text-base sm:text-lg md:text-xl font-normal tracking-wide transition-all duration-200
                     placeholder-browntext"
        />
        {/* Icon at the end */}
        <span className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-yellow-500">
          <CircleDot size={24} className="sm:h-8 sm:w-8" strokeWidth={1} />
        </span>
      </div>

      <p className="text-xs sm:text-sm text-gray mt-7 max-w-md sm:mt-10 whitespace-nowrap">
        Launching September 2025 – join now for insights and first access.
      </p>
    </section>
  );
};

export default LabSealed;
