"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-charcoal">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
