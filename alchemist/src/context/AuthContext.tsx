


"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: any;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { name: string; email: string; password: string }, mode?: "manual") => Promise<void>;
  googleAuth: (mode: "login" | "signup") => void;
  githubAuth: (mode: "login" | "signup") => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Manual login
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/auth/login/manual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        setUser(data.user);
        router.push("/lab");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err: any) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Manual signup

const register = async (
  { name, email, password }: { name: string; email: string; password: string },
  mode: "manual" | undefined = "manual"
) => {
  if (mode !== "manual") return;
  try {
    setLoading(true);
    setError(null);

    const res = await fetch("/api/auth/register/manual", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // ✅ Backend ab sirf message return karta hai
      alert(data.message || "Registration successful. Please verify your email.");
      // Token store mat karo yahan, kyunki email verify hone ke baad login karna hoga
      router.push("/login");
    } else {
      setError(data.error || "Signup failed");
      alert(data.error || "Signup failed");
    }
  } catch (err: any) {
    setError("Something went wrong");
    alert("Something went wrong");
  } finally {
    setLoading(false);
  }
};

  // Google redirect (implicit flow)
  const googleAuth = (mode: "login" | "signup") => {
    const state = encodeURIComponent(JSON.stringify({ mode }));
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
      process.env.NEXT_PUBLIC_GOOGLE_ID
    }&redirect_uri=${window.location.origin}/google-callback&response_type=id_token&scope=openid%20email%20profile&state=${state}&nonce=123`;
  };

  // GitHub redirect
  const githubAuth = (mode: "login" | "signup") => {
    const state = encodeURIComponent(JSON.stringify({ mode }));
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${
      process.env.NEXT_PUBLIC_GITHUB_ID
    }&redirect_uri=${window.location.origin}/github-callback&scope=user:email&state=${state}`;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  useEffect(() => {
    // Check local token
    const token = localStorage.getItem("token");
    if (token) {
      // You can fetch user info here
      setUser({}); // TODO: replace with actual fetch
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        googleAuth,
        githubAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
