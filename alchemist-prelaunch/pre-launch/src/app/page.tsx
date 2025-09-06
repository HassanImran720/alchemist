"use client";
import React, { useState } from "react";
import FeaturesSection from "../components/landingPages/FeaturesSection";
import LabSealed from "@/components/landingPages/LabSealed";
import Connect from "../components/Connect";
import AboutSection from "@/components/landingPages/AboutSection";

export default function Home() {
  return (
    <>
      <main className="snap-y snap-mandatory">
        <section
          id="lab-sealed"
          className="snap-start min-h-[90vh] sm:min-h-screen flex flex-col justify-center items-center bg-charcoal px-4 md:px-8"
        >
          <LabSealed />
        </section>

        <section
          id="about-section"
          className="snap-start min-h-screen flex flex-col justify-center items-center bg-[#1a1a1a] px-4 md:px-8"
        >
          <AboutSection />
        </section>

        <section
          id="features-section"
          className="snap-start min-h-screen flex flex-col justify-center items-center bg-charcoal px-4 md:px-8"
        >
          <FeaturesSection />
        </section>

        <section id="contact-section" className="bg-[#1a1a1a]">
          <Connect />
        </section>
      </main>
    </>
  );
}
