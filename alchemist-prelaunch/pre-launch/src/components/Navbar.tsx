"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Lock, Menu, X } from "lucide-react";
import { useWaitlist } from "@/context/WaitlistContext";

interface NavbarProps {
  logoText?: string;
}

const Navbar: React.FC<NavbarProps> = ({ logoText = "AICHEMIST" }) => {
  const { openSubscribe } = useWaitlist();
  const [menuOpen, setMenuOpen] = useState(false);

  // const scrollToSection = (sectionId: string): void => {
  //   const element = document.getElementById(sectionId);
  //   if (element) {
  //     element.scrollIntoView({ behavior: "smooth" });
  //     setMenuOpen(false); // close menu on click
  //   }
  // };
const scrollToSection = (sectionId: string, offset: number = -260): void => {
  const element = document.getElementById(sectionId);
  if (element) {
    const y =
      element.getBoundingClientRect().top + window.pageYOffset + offset;

    window.scrollTo({ top: y, behavior: "smooth" });
    setMenuOpen(false); // close menu after scrolling
  }
};


  return (
    <nav className="sticky top-0 z-50 w-full bg-charcol/90 border-b border-gray backdrop-blur-lg text-ivory px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}

        <div
          onClick={() => scrollToSection("lab-sealed")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Image
            src="/logoalchemist.png"
            alt="Logo"
            width={180}
            height={90}
            className="sm:w-xl w-md"
          />
        </div>

        {/* Desktop Navbar Items */}
        <div className="hidden md:flex items-center gap-x-10 lg:gap-x-20">
          <button
            onClick={() => scrollToSection("about-section",-70)}
            className="text-gray font-medium hover:text-gold transition-colors"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("features-section", -70)}
            className="text-gray font-medium hover:text-gold transition-colors"
          >
            Features
          </button>

          <button
            onClick={() => scrollToSection("contact-section",-70)}
            className="text-gray font-medium hover:text-gold transition-colors"
          >
            Contact
          </button>

          <button
            onClick={openSubscribe}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#e0b347] to-[#c8921a] text-charcoal text-xs sm:text-sm px-4 py-2 sm:px-4 sm:py-3 rounded-lg hover:bg-neutral hover:scale-105 transition-all"
          >
            <Lock size={14} className="sm:w-4 sm:h-4" />
            Request Early Access
          </button>
        </div>

        {/* Mobile / Tablet Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray focus:outline-none"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-2 w-full bg-charcol/95 border-t border-gray px-4 py-4 flex flex-col items-center gap-4">
          <button
            onClick={() => scrollToSection("about-section")}
            className="text-gray font-medium hover:text-gold transition-colors w-full text-center"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("features-section")}
            className="text-gray font-medium hover:text-gold transition-colors w-full text-center"
          >
            Features
          </button>
            <button
            onClick={() => scrollToSection("contact-section")}
            className="text-gray font-medium hover:text-gold transition-colors w-full text-center"
          >
            Contact
          </button>
          <button
            onClick={openSubscribe}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#e0b347] to-[#c8921a] text-charcoal text-xs sm:text-sm px-4 py-2 rounded-lg hover:bg-neutral hover:scale-105 transition-all w-full justify-center"
          >
            <Lock size={14} />
            Request Early Access
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
