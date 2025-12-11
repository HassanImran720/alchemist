"use client";
import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  LogOut,
  FlaskConical,
  User,
  BookOpen,
  FlaskRound,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Newspaper,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { label: "Prompt Lab", icon: FlaskConical, href: "/lab" },
  { label: "Profile", icon: User, href: "/lab/my-profile" },
  { label: "Library", icon: BookOpen, href: "/lab/prompt-library" },
  { label: "Marketplace", icon: ShoppingBag, href: "/lab/market-place" },
  { label: "Education", icon: FlaskRound, href: "/lab/learn-build" },
  { label: "Newsletter", icon: Newspaper, href: "/lab/newsletters" },
  { label: "Support", icon: Lightbulb, href: "/lab/support" },
];

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("/lab");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { logout } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Keep activeItem in sync with current pathname (handles refresh and direct links)
  useEffect(() => {
    if (!pathname) return;
    // Find all nav items that match the start of the pathname
    const matches = navItems.filter((item) => pathname.startsWith(item.href));
    if (matches.length > 0) {
      // Prefer the longest matching href (most specific), e.g. /lab/my-profile over /lab
      const best = matches.reduce((a, b) => (a.href.length >= b.href.length ? a : b));
      setActiveItem(best.href);
    } else {
      // No match found — fall back to /lab
      setActiveItem("/lab");
    }
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
  }, [isMobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setActiveItem(href);
    if (isMobile) setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top mobile bar with logo + hamburger */}
      {isMobile && (
        <div className="fixed top-0 mb-20 left-0 w-full z-50 bg-ivory border-b border-gold/30 flex items-center justify-between px-4 h-16 shadow-md">
          <Link href="/">
            <div className="flex items-center gap-2">
              <Image
                src="/logoalchemist.png"
                alt="Alchemist Logo"
                width={120}
                height={40}
              />
            </div>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className="p-2 rounded-lg bg-gold/20 hover:bg-gold/30 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gold" />
            ) : (
              <Menu className="w-6 h-6 text-gold" />
            )}
          </button>
        </div>
      )}

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative top-0 left-0 z-50 h-screen
          bg-ivory border-r border-gold/30 flex flex-col transition-all duration-300
          ${
            isMobile
              ? `transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} w-64 mt-16`
              : collapsed
              ? "w-16"
              : "w-64 lg:w-1/5"
          }
        `}
      >
        {/* Header for desktop only */}
        {!isMobile && (
        <div className="flex items-center justify-between px-4 py-5">
  <Link href="/">
    {collapsed ? (
      <div className="flex justify-center items-center w-full">
        <Image
          src="/logocollapse.png"
          alt="Collapsed Logo"
          width={40}      // ✅ sets proper logo size
          height={40}
          className="transition-all duration-300 object-contain"
        />
      </div>
    ) : (
      <div className="flex items-center gap-2">
        <Image
          src="/logoalchemist.png"
          alt="Alchemist Logo"
          width={150}
          height={50}
          className="transition-all duration-300 object-contain"
        />
      </div>
    )}
  </Link>

 
</div>

        )}

        {/* Navigation */}
        <nav className="flex flex-col gap-1 px-2 border-b border-gold/30 mt-2">
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
        <div className="mt-auto mb-2 px-2 flex flex-col gap-2">
          <div
            onClick={() => logout()}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-md font-medium transition-colors cursor-pointer
              hover:bg-gold/10 text-black
              ${!isMobile && collapsed ? "justify-center px-2" : ""}
            `}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {(!collapsed || isMobile) && <span className="truncate">Logout</span>}
          </div>

          {/* Collapse Button at Footer */}
          {!isMobile && (
            <button
              onClick={() => setCollapsed((c) => !c)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-md font-medium transition-colors cursor-pointer
                hover:bg-gold/10 text-black
                ${!isMobile && collapsed ? "justify-center px-2" : ""}
              `}
            >
              {collapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
              {(!collapsed || isMobile) && <span>Collapse</span>}
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
