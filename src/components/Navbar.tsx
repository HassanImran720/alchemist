"use client";
import React, { useState } from "react";
import Link from "next/link";

interface NavbarProps {
  logoText?: string;
}

const Navbar: React.FC<NavbarProps> = ({ logoText = "AICHEMIST" }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-charcoal text-ivory px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/">
        <div className="flex items-center gap-2">
          <span className="rounded-full border-2 border-gold w-7 h-7 flex items-center justify-center">
            <span className="text-gold text-lg font-bold">△</span>
          </span>
          <span className="font-heading text-xl text-gold font-bold">{logoText}</span>
        </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-slategray hover:text-gold transition-colors">Features</Link>
          <Link href="pricing" className="text-slategray hover:text-gold transition-colors">Pricing</Link>
          <Link href="login" className="text-gold font-semibold hover:text-ivory transition-colors">Login</Link>
          <Link href="/lab">
            <button className="bg-gradient-to-r from-[#e0b347] to-[#c8921a] text-charcoal font-semibold px-4 py-2 rounded hover:bg-neutral transition-colors">
              Enter the Lab
            </button>
          </Link>
        </div>

        {/* Hamburger Icon */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className={`block w-6 h-0.5 bg-gold mb-1 transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-gold mb-1 transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-gold transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden flex flex-col gap-4 px-4 pt-2 pb-4 bg-charcoal transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
      >
        <Link href="#features" className="text-slategray hover:text-gold transition-colors" onClick={() => setMenuOpen(false)}>Features</Link>
        <Link href="pricing" className="text-slategray hover:text-gold transition-colors" onClick={() => setMenuOpen(false)}>Pricing</Link>
        <Link href="login" className="text-gold font-semibold hover:text-ivory transition-colors" onClick={() => setMenuOpen(false)}>Login</Link>
        <Link href="/lab" onClick={() => setMenuOpen(false)}>
          <button className="bg-gold text-charcoal font-semibold px-4 py-2 rounded hover:bg-neutral transition-colors w-full text-left">
            Enter the Lab
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
