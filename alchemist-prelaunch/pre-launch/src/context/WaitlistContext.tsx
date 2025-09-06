"use client";
import React, { createContext, useContext, useState } from "react";

interface WaitlistContextType {
  openSubscribe: () => void;
  closeSubscribe: () => void;
  showSuccess: (name?: string) => void;
  isSubscribeOpen: boolean;
  isSuccessOpen: boolean;
  successName?: string;
}

const WaitlistContext = createContext<WaitlistContextType | undefined>(undefined);

export const WaitlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successName, setSuccessName] = useState<string | undefined>(undefined);

  function openSubscribe() {
    setIsSubscribeOpen(true);
  }

  function closeSubscribe() {
    setIsSubscribeOpen(false);
  }

  function showSuccess(name?: string) {
    setIsSubscribeOpen(false);
    setSuccessName(name);
    setIsSuccessOpen(true);

    setTimeout(() => {
      setIsSuccessOpen(false);
    }, 2500);
  }

  return (
    <WaitlistContext.Provider
      value={{ openSubscribe, closeSubscribe, showSuccess, isSubscribeOpen, isSuccessOpen, successName }}
    >
      {children}
    </WaitlistContext.Provider>
  );
};

export function useWaitlist() {
  const ctx = useContext(WaitlistContext);
  if (!ctx) throw new Error("useWaitlist must be used inside WaitlistProvider");
  return ctx;
}
