"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { verifyJwt } from "@/helpers/jwt";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        // No token, redirect to login
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
        return;
      }

      // Verify token is valid
      try {
        const decoded = verifyJwt(token);
        if (!decoded) {
          // Token is invalid or expired
          localStorage.removeItem("token");
          router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
          return;
        }
      } catch (error) {
        // Token verification failed
        localStorage.removeItem("token");
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
        return;
      }

      setIsChecking(false);
    };

    checkAuth();
  }, [router, pathname]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return <>{children}</>;
}
