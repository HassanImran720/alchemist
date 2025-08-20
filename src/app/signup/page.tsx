import SignUpForm from "@/components/userauth/SignUpForm";
import React from "react";


export default function Page(){
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f4f3f1] px-4 sm:px-6 md:px-8 py-6 sm:py-8 lg:py-10">
      {/* Logo */}
      <div className="flex flex-col items-center mb-6 sm:mb-8">
        <img
          src="/WithBgBackground.png"
          alt="Logo"
          className="w-32 sm:w-48 md:w-56 lg:w-64 h-auto"
        />
      </div>

      {/* Form Container */}
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
        <SignUpForm />
      </div>
    </div>
  );
};

