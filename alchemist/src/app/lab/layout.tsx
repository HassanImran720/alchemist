// "use client";
// import React from "react";
// import Sidebar from "../../components/Sidebar";

// export default function LabLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex bg-ivory">
//       {/* Sidebar is fixed inside its own component */}
//       <Sidebar />

//       {/* Main content area */}
//       <main
//         className="flex-1 h-screen overflow-y-auto"
//         style={{ marginLeft: "var(--sidebar-width)" }} // optional if you want space
//       >
//         {children}
//       </main>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // path adjust karo
import Sidebar from "../../components/Sidebar";
import { LibraryProvider } from "../../context/LibraryContext";

export default function LabLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
        return;
      }

      // Verify token by calling an API endpoint
      try {
        const response = await fetch('/api/auth/verify', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          // Token is invalid or expired
          logout();
          router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
          return;
        }

        setChecked(true);
      } catch (error) {
        // Network error or server error
        logout();
        router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      }
    };

    checkTokenValidity();
  }, [user, router, pathname, logout]);

  if (!checked) {
    return null; // ✅ jab tak check ho raha hai kuch render hi mat karo
  }

  return (
    <LibraryProvider>
      <div className="flex bg-ivory">
        {/* Sidebar is fixed inside its own component */}
        <Sidebar />

        {/* Main content area */}
        <main
          className={`flex-1 h-screen overflow-y-auto ${
            isMobile ? "mt-20" : ""
          }`}
          style={{ marginLeft: isMobile ? "0" : "var(--sidebar-width)" }}
        >
          {children}
        </main>
      </div>
    </LibraryProvider>
  );
}
