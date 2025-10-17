import React from "react";
import PromptEngSection from "@/components/promptEngineering/PromptEngSection";
import { PromptEngProvider } from "@/context/PromptEngContext";

const LabHome: React.FC = () => {
  return (
    <PromptEngProvider>
      <PromptEngSection />
    </PromptEngProvider>
  );
};

export default LabHome;