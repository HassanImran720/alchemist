import React from "react";
import LoginForm from "./LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f4f3f1] px-2 py-8 sm:px-4 md:px-8 lg:px-0">
      <div className="flex flex-col items-center mb-6">
        <span className="mb-2">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M24 6L8 42h32L24 6z" stroke="#e0b347" strokeWidth="3" fill="#fffbe8"/></svg>
        </span>
        <span className="text-2xl sm:text-3xl font-heading font-bold tracking-widest text-gold">AICHEMIST</span>
      </div>
      <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-md">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
