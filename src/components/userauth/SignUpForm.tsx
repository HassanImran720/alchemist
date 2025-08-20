import React from "react";
import Link from "next/link";

interface SignUpFormProps {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-ivory rounded-xl shadow-lg p-4 sm:p-6 md:p-8 w-full max-w-md mx-auto flex flex-col gap-4 border border-neutral"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">Create your account</h2>
      <p className="text-slategray text-center mb-4 text-sm sm:text-base">
        Sign up to start your journey with ALCHEMIST
      </p>

      {/* GitHub Button */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 border border-neutral rounded-md py-2 font-semibold hover:bg-gold/10 transition-colors text-sm sm:text-base"
      >
        <img
          src="/github.svg"
          alt="GitHub"
          className="w-5 h-5"
          style={{
            filter:
              "invert(54%) sepia(83%) saturate(748%) hue-rotate(13deg) brightness(99%) contrast(92%)",
          }}
        />
        Continue with GitHub
      </button>

      {/* Google Button */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 border border-neutral rounded-md py-2 font-semibold hover:bg-gold/10 transition-colors text-sm sm:text-base"
      >
        <img
          src="/google.svg"
          alt="Google"
          className="w-5 h-5"
          style={{
            filter:
              "invert(54%) sepia(83%) saturate(748%) hue-rotate(13deg) brightness(99%) contrast(92%)",
          }}
        />
        Continue with Google
      </button>

      {/* Divider */}
      <div className="flex items-center gap-2 my-2">
        <div className="flex-1 h-px bg-neutral" />
        <span className="text-xs sm:text-sm text-slategray">OR CONTINUE WITH EMAIL</span>
        <div className="flex-1 h-px bg-neutral" />
      </div>

      {/* Name Field */}
      <label className="text-xs sm:text-sm font-semibold">
        Full Name
        <input
          type="text"
          required
          placeholder="John Doe"
          className="w-full border border-neutral rounded-md py-2 px-3 mt-1 bg-white text-charcoal focus:outline-gold"
        />
      </label>

      {/* Email Field */}
      <label className="text-xs sm:text-sm font-semibold">
        Email
        <input
          type="email"
          required
          placeholder="name@example.com"
          className="w-full border border-neutral rounded-md py-2 px-3 mt-1 bg-white text-charcoal focus:outline-gold"
        />
      </label>

      {/* Password Field */}
      <label className="text-xs sm:text-sm font-semibold">
        Password
        <input
          type="password"
          required
          placeholder="Enter your password"
          className="w-full border border-neutral rounded-md py-2 px-3 mt-1 bg-white text-charcoal focus:outline-gold"
        />
      </label>

      {/* Confirm Password Field */}
      <label className="text-xs sm:text-sm font-semibold">
        Confirm Password
        <input
          type="password"
          required
          placeholder="Re-enter your password"
          className="w-full border border-neutral rounded-md py-2 px-3 mt-1 bg-white text-charcoal focus:outline-gold"
        />
      </label>

      {/* Terms & Privacy */}
      <label className="flex items-center gap-2 text-xs sm:text-sm">
        <input type="checkbox" className="accent-gold" required /> I agree to the{" "}
        <Link href="#" className="text-gold hover:underline">
          Terms & Conditions
        </Link>
      </label>

      {/* Sign Up Button */}
      <button
        type="submit"
        className="w-full bg-gold text-charcoal font-bold py-2 rounded-md mt-2 hover:bg-[#c8921a] transition-colors text-sm sm:text-base"
      >
        Sign Up
      </button>

      {/* Login Link */}
      <p className="text-center text-xs sm:text-sm mt-2 text-slategray">
        Already have an account?{" "}
        <Link href="/login" className="text-gold hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
};

export default SignUpForm;
