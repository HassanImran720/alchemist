import React from "react";
import Sidebar from "../../components/Sidebar";

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-ivory">
      <Sidebar />
      <main className="flex-1 min-h-screen overflow-x-auto">
        {children}
      </main>
    </div>
  );
}
