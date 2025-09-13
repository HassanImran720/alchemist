import React from "react";
import Link from "next/link";

const HeroSection: React.FC = () => {
  return (
    // <section className="flex flex-col items-center justify-center 
    //   min-h-[50vh] sm:min-h-[85vh] lg:min-h-screen 
    //   w-full text-center relative z-10 
    //   px-4 sm:px-8 lg:px-16 py-10 sm:py-14 lg:py-20 bg-[#1a1a1a]">
<section
  className="flex flex-col items-center justify-center 
    lg:min-h-screen  /* sirf desktop par poori screen */
    w-full text-center relative z-10 
    px-4 sm:px-8 lg:px-16 
    py-12 sm:py-16 lg:py-20 
    bg-[#1a1a1a]"
>

      {/* Heading */}
      <h1 className="text-gold font-heading 
        text-2xl sm:text-4xl md:text-5xl lg:text-7xl 
        font-bold leading-snug sm:leading-tight lg:leading-tight 
        mb-4 sm:mb-6 lg:mb-8">
        From Raw Thought to
        <span className=" md:block mt-3 lg:mt-4 block">
          Prompted Gold.
        </span>
      </h1>

      {/* Sub Text */}
      <p className="text-gray text-sm sm:text-lg md:text-xl lg:text-2xl 
        mb-6 sm:mb-8 lg:mb-10 
        max-w-md sm:max-w-2xl lg:max-w-3xl mx-auto">
        Transform ideas into precision through the art of prompt alchemy.
      </p>

      {/* Buttons */}
      <div className="flex  sm:flex-row gap-4 sm:gap-6 
        justify-center items-center 
        w-full max-w-sm sm:max-w-none">

        <Link href="/lab">
          <button
            aria-label="Enter the Lab"
            className="bg-gradient-to-r from-[#e0b347] to-[#c8921a] 
              text-charcoal font-bold 
              text-base sm:text-lg md:text-xl 
              px-6 sm:px-10 md:px-12 
              py-3 sm:py-4 md:py-5 
              rounded-xl shadow-lg 
              hover:bg-neutral transition-colors 
              min-w-[160px] sm:min-w-[200px] md:min-w-[220px] 
              w-full sm:w-auto"
          >
            Enter the Lab
          </button>
        </Link>

        <Link href="/login">
          <button
            aria-label="Login"
            className="bg-transparent border-2 border-neutral 
              text-ivory font-semibold 
              text-sm sm:text-base md:text-lg 
              px-4 sm:px-6 md:px-8 
              py-2 sm:py-3 md:py-3.5 
              rounded-xl hover:bg-neutral transition-colors 
              min-w-[90px] sm:min-w-[110px] md:min-w-[130px] 
              w-full sm:w-auto"
          >
            Login
          </button>
        </Link>
      </div>

      {/* Decorative Glows */}
      <span className="absolute left-0 top-1/2 
        w-32 h-32 sm:w-40 sm:h-40 lg:w-56 lg:h-56 
        bg-gold opacity-10 rounded-full blur-3xl 
        -translate-y-1/2 -z-10" />
      <span className="absolute right-0 top-1/2 
        w-32 h-32 sm:w-40 sm:h-40 lg:w-56 lg:h-56 
        bg-gold opacity-10 rounded-full blur-3xl 
        -translate-y-1/2 -z-10" />
    </section>
  );
};

export default HeroSection;
