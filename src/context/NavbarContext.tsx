"use client";
import { createContext, useContext, useState } from "react";

interface NavbarContextType {
  access: boolean;
  setAccess: (value: boolean) => void;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export const NavbarProvider = ({ children }: { children: React.ReactNode }) => {
  const [access, setAccess] = useState(false);

  return (
    <NavbarContext.Provider value={{ access, setAccess }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbarState = () => {
  const context = useContext(NavbarContext);
  if (!context) throw new Error("useNavbarState must be used inside NavbarProvider");
  return context;
};
