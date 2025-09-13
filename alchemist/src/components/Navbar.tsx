// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Lock, Menu, X } from "lucide-react";
// import { usePathname } from "next/navigation";

// interface NavbarProps {
//   logoText?: string;
// }

// const Navbar: React.FC<NavbarProps> = ({ logoText = "AICHEMIST" }) => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const pathname = usePathname();

//   const scrollToSection = (sectionId: string, offset: number = -70): void => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       const y =
//         element.getBoundingClientRect().top + window.pageYOffset + offset;
//       window.scrollTo({ top: y, behavior: "smooth" });
//       setMenuOpen(false);
//     }
//   };

//   // ✅ Close menu whenever route changes
//   useEffect(() => {
//     setMenuOpen(false);
//   }, [pathname]);

//   return (
//     <nav className="sticky top-0 z-50 w-full bg-charcol/90 border-b border-gray backdrop-blur-lg text-ivory px-4 sm:px-6 py-3">
//       <div className="flex items-center justify-between max-w-7xl mx-auto">
//         {/* Logo */}
//         <Link href="/">
//           <div className="flex items-center gap-2 cursor-pointer">
//             <Image
//               src="/logoalchemist.png"
//               alt="Logo"
//               width={180}
//               height={90}
//               className="sm:w-xl w-md"
//             />
//           </div>
//         </Link>

//         {/* Desktop Navbar Items */}
//         <div className="hidden md:flex items-center gap-x-10 lg:gap-x-20">
//           {/* <button
//             onClick={() => scrollToSection("features-section")}
//             className="text-gray font-medium hover:text-gold transition-colors"
//           >
//             Features
//           </button>
//           <button
//             onClick={() => scrollToSection("contact-section")}
//             className="text-gray font-medium hover:text-gold transition-colors"
//           >
//             Contact
//           </button> */}
//           <Link
//             href="/pricing"
//             className="text-gray font-medium hover:text-gold transition-colors"
//           >
//             Pricing
//           </Link>
//           <Link
//             href="/login"
//             className="text-gold font-semibold hover:text-ivory transition-colors"
//           >
//             Login
//           </Link>
//           <Link href="/lab">
//             <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#e0b347] to-[#c8921a] text-charcoal text-sm px-4 py-2 rounded-lg hover:bg-neutral hover:scale-105 transition-all">
//               Enter the Lab
//             </button>
//           </Link>
//         </div>

//         {/* Mobile Hamburger */}
//         <div className="md:hidden flex items-center">
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="text-gray focus:outline-none"
//           >
//             {menuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden mt-2 w-full bg-charcol/95 border-t border-gray px-4 py-4 flex flex-col items-center gap-4">
//           <button
//             onClick={() => scrollToSection("features-section")}
//             className="text-gray font-medium hover:text-gold transition-colors w-full text-center"
//           >
//             Features
//           </button>
//           <button
//             onClick={() => scrollToSection("contact-section")}
//             className="text-gray font-medium hover:text-gold transition-colors w-full text-center"
//           >
//             Contact
//           </button>
//           <Link
//             href="/pricing"
//             className="text-gray font-medium hover:text-gold transition-colors w-full text-center"
//           >
//             Pricing
//           </Link>
//           <Link
//             href="/login"
//             className="text-gold font-semibold hover:text-ivory transition-colors w-full text-center"
//           >
//             Login
//           </Link>
//           <Link href="/lab">
//             <button className="flex items-center gap-2 bg-gradient-to-r from-[#e0b347] to-[#c8921a] text-charcoal text-sm px-4 py-2 rounded-lg hover:bg-neutral hover:scale-105 transition-all w-full justify-center">
//               Enter the Lab
//             </button>
//           </Link>
//         </div>
//       )}
//     </nav>
//   );
// };

// // export default Navbar;
// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Menu, X } from "lucide-react";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";

// interface NavbarProps {
//   logoText?: string;
// }

// const Navbar: React.FC<NavbarProps> = ({ logoText = "AICHEMIST" }) => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const scrollToSection = (sectionId: string, offset: number = -70): void => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       const y =
//         element.getBoundingClientRect().top + window.pageYOffset + offset;
//       window.scrollTo({ top: y, behavior: "smooth" });
//       setMenuOpen(false);
//     }
//   };

//   // ✅ Close menu whenever route changes
//   useEffect(() => {
//     setMenuOpen(false);
//   }, [pathname]);

//   // ✅ Scroll when `section` param exists
//   useEffect(() => {
//     if (pathname === "/") {
//       const section = searchParams.get("section");
//       if (section) {
//         setTimeout(() => scrollToSection(section), 300);
//       }
//     }
//   }, [pathname, searchParams]);

//   const handleNavClick = (sectionId: string) => {
//     if (pathname === "/") {
//       scrollToSection(sectionId);
//     } else {
//       router.push(`/?section=${sectionId}`); // ✅ pass section in query param
//     }
//   };

//   return (
//     <nav className="sticky top-0 z-50 w-full bg-charcol/90 border-b border-gray backdrop-blur-lg text-ivory px-4 sm:px-6 py-3">
//       <div className="flex items-center justify-between max-w-7xl mx-auto">
//         {/* Logo */}
//         <Link href="/">
//           <div className="flex items-center gap-2 cursor-pointer">
//             <Image
//               src="/logoalchemist.png"
//               alt="Logo"
//               width={180}
//               height={90}
//               className="sm:w-xl w-md"
//             />
//           </div>
//         </Link>

//         {/* Desktop Navbar Items */}
//         <div className="hidden md:flex items-center gap-x-10 lg:gap-x-20">
//           <button
//             onClick={() => handleNavClick("features-section")}
//             className="text-gray font-medium hover:text-gold transition-colors"
//           >
//             Features
//           </button>
//           <button
//             onClick={() => handleNavClick("contact-section")}
//             className="text-gray font-medium hover:text-gold transition-colors"
//           >
//             Contact
//           </button>
//           <Link
//             href="/pricing"
//             className="text-gray font-medium hover:text-gold transition-colors"
//           >
//             Pricing
//           </Link>
//           <Link
//             href="/login"
//             className="text-gold font-semibold hover:text-ivory transition-colors"
//           >
//             Login
//           </Link>
//           <Link href="/lab">
//             <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#e0b347] to-[#c8921a] text-charcoal text-sm px-4 py-2 rounded-lg hover:bg-neutral hover:scale-105 transition-all">
//               Enter the Lab
//             </button>
//           </Link>
//         </div>

//         {/* Mobile Hamburger */}
//         <div className="md:hidden flex items-center">
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="text-gray focus:outline-none"
//           >
//             {menuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden mt-2 w-full bg-charcol/95 border-t border-gray px-4 py-4 flex flex-col items-center gap-4">
//           <button
//             onClick={() => handleNavClick("features-section")}
//             className="text-gray font-medium hover:text-gold transition-colors w-full text-center"
//           >
//             Features
//           </button>
//           <button
//             onClick={() => handleNavClick("contact-section")}
//             className="text-gray font-medium hover:text-gold transition-colors w-full text-center"
//           >
//             Contact
//           </button>
//           <Link
//             href="/pricing"
//             className="text-gray font-medium hover:text-gold transition-colors w-full text-center"
//           >
//             Pricing
//           </Link>
//           <Link
//             href="/login"
//             className="text-gold font-semibold hover:text-ivory transition-colors w-full text-center"
//           >
//             Login
//           </Link>
//           <Link href="/lab">
//             <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#e0b347] to-[#c8921a] text-charcoal text-sm px-4 py-2 rounded-lg hover:bg-neutral hover:scale-105 transition-all w-full justify-center">
//               Enter the Lab
//             </button>
//           </Link>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
"use client";
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface NavbarProps {
  logoText?: string;
}

const NavbarContent: React.FC<NavbarProps> = ({ logoText = "AICHEMIST" }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const scrollToSection = (sectionId: string, offset: number = -70): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + offset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (pathname === "/") {
      const section = searchParams.get("section");
      if (section) {
        setTimeout(() => scrollToSection(section), 300);
      }
    }
  }, [pathname, searchParams]);

  const handleNavClick = (sectionId: string) => {
    if (pathname === "/") {
      scrollToSection(sectionId);
    } else {
      router.push(`/?section=${sectionId}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-charcol/90 border-b border-gray backdrop-blur-lg text-ivory px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/logoalchemist.png"
              alt="Logo"
              width={180}
              height={90}
              className="sm:w-xl w-md"
            />
          </div>
        </Link>

        {/* Desktop Navbar Items */}
        <div className="hidden md:flex items-center gap-x-10 lg:gap-x-20">
          <button
            onClick={() => handleNavClick("features-section")}
            className="text-gray font-medium hover:text-gold transition-colors"
          >
            Features
          </button>
          <button
            onClick={() => handleNavClick("contact-section")}
            className="text-gray font-medium hover:text-gold transition-colors"
          >
            Contact
          </button>
          <Link
            href="/pricing"
            className="text-gray font-medium hover:text-gold transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/login"
            className="text-gold font-semibold hover:text-ivory transition-colors"
          >
            Login
          </Link>
          <Link href="/lab">
            <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#e0b347] to-[#c8921a] text-charcoal text-sm px-4 py-2 rounded-lg hover:bg-neutral hover:scale-105 transition-all">
              Enter the Lab
            </button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray focus:outline-none"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 w-full bg-charcol/95 border-t border-gray px-4 py-4 flex flex-col items-center gap-4">
          <button
            onClick={() => handleNavClick("features-section")}
            className="text-gray font-medium hover:text-gold transition-colors w-full text-center"
          >
            Features
          </button>
          <button
            onClick={() => handleNavClick("contact-section")}
            className="text-gray font-medium hover:text-gold transition-colors w-full text-center"
          >
            Contact
          </button>
          <Link
            href="/pricing"
            className="text-gray font-medium hover:text-gold transition-colors w-full text-center"
          >
            Pricing
          </Link>
          <Link
            href="/login"
            className="text-gold font-semibold hover:text-ivory transition-colors w-full text-center"
          >
            Login
          </Link>
          <Link href="/lab">
            <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#e0b347] to-[#c8921a] text-charcoal text-sm px-4 py-2 rounded-lg hover:bg-neutral hover:scale-105 transition-all w-full justify-center">
              Enter the Lab
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

// ✅ Wrap NavbarContent with Suspense
const Navbar: React.FC<NavbarProps> = ({ logoText }) => (
  <Suspense fallback={<div className="h-16 bg-charcol" />}>
    <NavbarContent logoText={logoText} />
  </Suspense>
);

export default Navbar;
