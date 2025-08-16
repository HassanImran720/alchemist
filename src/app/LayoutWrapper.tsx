"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { NavbarProvider } from "@/context/NavbarContext";
import { usePathname } from "next/navigation";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbar = pathname.startsWith("/lab");

  return (
    <>
      <NavbarProvider>
      {!hideNavbar && <Navbar />}
      {children}
      {!hideNavbar && <Footer />}
      </NavbarProvider>
    </>
  );
}
