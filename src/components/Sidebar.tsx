"use client";
import React, { useState, useEffect } from "react";
import {
  FlaskConical,
  User,
  BookOpen,
  FlaskRound,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";

const navItems = [
  { label: "Prompt Engineering", icon: FlaskConical, href: "/lab" },
  { label: "My Account", icon: User, href: "/lab/my-account" },
  { label: "Prompt Library", icon: BookOpen, href: "/lab/prompt-library" },
  { label: "Learn and Build", icon: FlaskRound, href: "/lab/learn-build" },
  { label: "Support", icon: Lightbulb, href: "/lab/support" },
];

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("/lab");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleNavClick = (href: string) => {
    setActiveItem(href);
    // Close mobile menu when nav item is clicked
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  // Hamburger Menu Button for Mobile
  const HamburgerButton = () => (
    <button
      className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-ivory border border-gold/30 shadow-lg"
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
    >
      {isMobileMenuOpen ? (
        <X className="w-6 h-6 text-gold" />
      ) : (
        <Menu className="w-6 h-6 text-gold" />
      )}
    </button>
  );

  // Mobile Overlay
  const MobileOverlay = () => (
    isMobileMenuOpen && (
      <div
        className="md:hidden fixed inset-0 bg-black/50 z-30"
        onClick={() => setIsMobileMenuOpen(false)}
      />
    )
  );

  return (
    <>
      <HamburgerButton />
      <MobileOverlay />
      
      <aside
        className={`
          ${isMobile 
            ? `fixed top-0 left-0 z-40 h-screen transform transition-transform duration-300 ease-in-out ${
                isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
              } w-64`
            : `h-screen transition-all duration-200 ${collapsed ? "w-16" : "w-64 lg:w-1/5"}`
          }
          bg-ivory border-r-[0.5px] border-gold/30 flex flex-col
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-5">
          {(!collapsed || isMobile) && (
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold text-gold font-heading tracking-wide">
                AIChemist
              </span>
              <span className="text-xs text-gray font-medium">
                Laboratory Interface
              </span>
            </div>
          )}
          
          {/* Desktop collapse button */}
          {!isMobile && (
            <button
              className="p-1 rounded hover:bg-gold/10 transition-colors"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              onClick={() => setCollapsed((c) => !c)}
            >
              {collapsed ? (
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray" />
              ) : (
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray" />
              )}
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-1 mt-2 px-2">
          {navItems.map((item) => {
            const isActive = activeItem === item.href;
            const IconComponent = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`
                  flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-md font-medium transition-colors
                  ${isActive
                    ? "bg-gold text-white shadow-sm"
                    : "text-black hover:bg-gold/10"
                  }
                  ${!isMobile && collapsed ? "justify-center px-2" : ""}
                `}
              >
                <IconComponent 
                  className={`w-5 h-5 flex-shrink-0 ${
                    isActive ? "text-white" : "text-black"
                  }`} 
                />
                {(!collapsed || isMobile) && (
                  <span className="text-sm sm:text-base truncate">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer - Desktop only */}
        {!isMobile && (
          <div className="mt-auto mb-2 px-2 sm:px-4">
            <button
              className="w-full flex items-center justify-center gap-2 text-gold text-xs sm:text-sm font-semibold py-2 rounded hover:bg-gold/10 transition-colors"
              onClick={() => setCollapsed((c) => !c)}
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
              <span className={collapsed ? "hidden" : "inline"}>
                Collapse Lab
              </span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;