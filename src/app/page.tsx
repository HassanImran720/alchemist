"use client";
import React, { useState } from "react";
import HeroSection from "../components/landingPages/HeroSection";
import FeaturesSection from "../components/landingPages/FeaturesSection";
import LabSealed from "@/components/landingPages/LabSealed";
import Connect from "../components/Connect";
import { useNavbarState } from "@/context/NavbarContext";

export default function Home() {
  const [accessGranted, setAccessGranted] = useState(false);
  const { access, setAccess } = useNavbarState();
  return (
    <>
      <main className="snap-y snap-mandatory">
        {!accessGranted ? (
          // Show only LabSealed initially
          <section className="snap-start min-h-screen flex flex-col justify-center items-center bg-[#1a1a1a] px-4 md:px-8">
            <LabSealed onAccessGranted={() => {setAccessGranted(true)
              setAccess(true)}
            } />
          </section>
        ) : (
            <section className="snap-start min-h-screen flex flex-col justify-center items-center bg-[#1a1a1a] px-4 md:px-8">
              <HeroSection />
            </section>
        )}
          <section className="snap-start min-h-screen flex flex-col justify-center items-center bg-charcoal px-4 md:px-8">
              <FeaturesSection />
            </section>

            <section>
              <Connect />
            </section>
      </main>
    </>
  );
}
