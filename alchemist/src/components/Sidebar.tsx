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
import Image from "next/image";
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

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // mobile & tablet = < 1024px
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
  }, [isMobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setActiveItem(href);
    if (isMobile) setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Hamburger for Mobile */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-ivory border border-gold/30 shadow-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-gold" />
        ) : (
          <Menu className="w-6 h-6 text-gold" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      {/* <aside
        className={`
          fixed lg:relative top-0 left-0 z-50 h-screen bg-ivory border-r border-gold/30 flex flex-col transition-all duration-300
          ${isMobile
            ? `transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} w-64`
            : collapsed
            ? "w-16"
            : "w-64 lg:w-1/5"
          }
        `}
      > */}
      <aside
  className={`
    fixed lg:relative top-0 left-0 z-50 h-screen
    bg-ivory border-r border-gold/30 flex flex-col transition-all duration-300
    ${isMobile
      ? `transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} w-64`
      : collapsed
      ? "w-16"
      : "w-64 lg:w-1/5"
    }
  `}
>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-5">
          {(!collapsed || isMobile) && (
            <div className="flex flex-col">
             <Image
              src="/withoutBGLogo.png"
              alt="Alchemist Logo"      
              width={150}
              height={50}

            />
              <span className="text-xs text-gray font-medium">
                Laboratory Interface
              </span>
            </div>
          )}

          {/* Collapse button (Desktop only) */}
          {!isMobile && (
            <button
              className="p-1 rounded hover:bg-gold/10 transition-colors"
              onClick={() => setCollapsed((c) => !c)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? (
                <ChevronRight className="w-5 h-5 text-gray" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-gray" />
              )}
            </button>
          )}
        </div>

        {/* Nav Links */}
        <nav className="flex-1 flex flex-col gap-1 px-2 border-b border-gold/30">
          {navItems.map(({ label, icon: Icon, href }) => {
            const isActive = activeItem === href;
            return (
              <Link
                key={label}
                href={href}
                onClick={() => handleNavClick(href)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-md font-medium transition-colors
                  ${isActive ? "bg-gold text-white shadow-sm" : "text-black hover:bg-gold/10"}
                  ${!isMobile && collapsed ? "justify-center px-2" : ""}
                `}
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 ${
                    isActive ? "text-white" : "text-black"
                  }`}
                />
                {(!collapsed || isMobile) && (
                  <span className="truncate">{label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        {!isMobile && (
          <div className="mt-auto mb-2 px-2">
            <button
              className="w-full flex items-center justify-center gap-2 text-gold text-sm font-semibold py-2 rounded hover:bg-gold/10 transition-colors"
              onClick={() => setCollapsed((c) => !c)}
            >
              {collapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
              {!collapsed && <span>Collapse Lab</span>}
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
