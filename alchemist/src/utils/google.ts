"use client";
import { useEffect } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const useGoogleCallback = (router: AppRouterInstance) => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("id_token");
    const state = params.get("state");
    let mode = "signup";

    if (state) {
      try {
        const parsed = JSON.parse(decodeURIComponent(state));
        mode = parsed.mode || "signup";
      } catch {}
    }

    if (!token) return;

    const exchange = async () => {
      const endpoint =
        mode === "signup" ? "/api/auth/google-signup" : "/api/auth/google-login";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        router.push("/dashboard");
      } else {
        alert(data.error || "Google auth failed");
        router.push(mode === "signup" ? "/signup" : "/login");
      }
    };

    exchange();
  }, [router]);
};
