import React from "react";
import PromptEngSection from "@/components/promptEngineering/PromptEngSection";
import { PromptEngProvider } from "@/context/PromptEngContext";
import { ProfileProvider } from '@/context/ProfileContext';

const LabHome: React.FC = () => {
  return (
    <PromptEngProvider>
      <ProfileProvider>
        <PromptEngSection />
      </ProfileProvider>
    </PromptEngProvider>
  );
};

export default LabHome;