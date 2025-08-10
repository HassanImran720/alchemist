
"use client";
import React, { useState } from "react";
import {
  FlaskConical,
  User,
  BookOpen,
  FlaskRound,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
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

  const handleNavClick = (href: string) => {
    setActiveItem(href);
  };

  return (
    <aside
      className={`h-screen bg-ivory border-r-[0.5px] border-gold/30 flex flex-col transition-all duration-200 ${collapsed ? "w-16" : "w-1/5"}`}
    >
      <div className="flex items-center justify-between px-4 py-5">
        {!collapsed && (
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gold font-heading tracking-wide">AIChemist</span>
            <span className="text-xs text-gray font-medium ">Laboratory Interface</span>
          </div>
        )}
        <button
          className="p-1 rounded hover:bg-gold/10"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={() => setCollapsed((c) => !c)}
        >
          {collapsed ? <ChevronRight className="w-6 h-6 text-gray" /> : <ChevronLeft className="w-6 h-6 text-gray " />}
        </button>
      </div>

      <nav className="flex-1 flex flex-col gap-1 mt-2">
        {navItems.map((item) => {
          const isActive = activeItem === item.href;
          const IconComponent = item.icon;

          return (
            // <Link
            //   key={item.label}
            //   href={item.href}
            //   onClick={() => handleNavClick(item.href)}
            //   className={`flex items-center gap-3 px-4 py-2 rounded-md font-medium transition-colors
            //     ${isActive
            //       ? "bg-gold text-white"
            //       : "text-black hover:bg-gold/10"}
            //     ${collapsed ? "justify-center px-2" : ""}
            //   `}
            // >
            //   <IconComponent className={`w-5 h-5 ${isActive ? "text-white" : "text-black"}`} />
            //   {!collapsed && <span>{item.label}</span>}
            // </Link>
            <Link
  key={item.label}
  href={item.href}
  onClick={() => handleNavClick(item.href)}
  className={`flex items-center gap-3 px-4 py-2 rounded-md font-medium transition-colors
    ${isActive
      ? "bg-gold text-white"
      : "text-black hover:bg-gold/10"}
    ${collapsed ? "justify-center px-2" : ""}
  `}
>
  <IconComponent className={`w-5 h-5 ${isActive ? "text-white" : "text-black"}`} />
  {!collapsed && <span>{item.label}</span>}
</Link>

          );
        })}
      </nav>

      <div className="mt-auto mb-2 px-4">
        <button
          className={`w-full flex items-center justify-center gap-2 text-gold text-sm font-semibold py-2 rounded hover:bg-gold/10 transition-colors`}
          onClick={() => setCollapsed((c) => !c)}
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          <span className={collapsed ? "hidden" : "inline"}>Collapse Lab</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;