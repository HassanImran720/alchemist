"use client";
import React from "react";
import Sidebar from "../../components/Sidebar";

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-ivory">
      {/* Sidebar is fixed inside its own component */}
      <Sidebar />

      {/* Main content area */}
      <main
        className="flex-1 h-screen overflow-y-auto"
        style={{ marginLeft: "var(--sidebar-width)" }} // optional if you want space
      >
        {children}
      </main>
    </div>
  );
}
