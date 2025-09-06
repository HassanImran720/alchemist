"use client";
import React from "react";

const AboutSection: React.FC = () => {
  return (
    <section className="flex flex-col items-center min-h-[70vh] w-full text-center relative z-10 px-4 sm:px-8 gap-3 sm:gap-7 ">
            <h1 className="font-heading text-2xl sm:text-4xl lg:text-8xl font-bold leading-tight mb-4 text-beige">

        What is AICHEMIST?
      </h1>

      <p className="text-browntext text-sm sm:text-lg mb-6 text-center max-w-3xl mx-auto leading-relaxed">
        At AICHEMIST, we believe that those who master prompting hold the key to
        ultimate creation. Start by typing your objective, then move through
        tailored templates that add context, references, and output preferences.
        This simple process transforms raw thoughts into clear requests.
      </p>

      <p className="text-browntext text-sm sm:text-lg mb-6 text-center max-w-3xl mx-auto leading-relaxed">
        We craft the prompt for you, generate responses from the model of your
        choice, and guide you through an evaluation that sharpens results with
        each iteration. Everything is saved in your personal library, where each
        prompt and response can be refined, tracked, and reused until you
        achieve the perfect result.
      </p>
    </section>
  );
};

export default AboutSection;
