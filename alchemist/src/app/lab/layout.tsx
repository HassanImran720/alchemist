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
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // path adjust karo
import Sidebar from "../../components/Sidebar";

export default function LabLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
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
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login"); // direct redirect
    } else {
      setChecked(true); // tabhi render karo jab token confirm ho
    }
  }, [user, router]);

  if (!checked) {
    return null; // ✅ jab tak check ho raha hai kuch render hi mat karo
  }

  return (
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
  );
}
