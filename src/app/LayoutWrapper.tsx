"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import { usePathname } from "next/navigation";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbar = pathname.startsWith("/lab");

  return (
    <>
  
      {!hideNavbar && <Navbar />}
      {children}
      {!hideNavbar && <Footer />}
    
    </>
  );
}
