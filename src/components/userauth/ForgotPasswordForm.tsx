import React from "react";
import Link from "next/link";

interface ForgotPasswordFormProps {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-ivory rounded-xl shadow-lg p-4 sm:p-6 md:p-8 w-full max-w-md mx-auto flex flex-col gap-4 border border-neutral"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">Forgot Password?</h2>
      <p className="text-slategray text-center mb-4 text-sm sm:text-base">
        Enter your email address below and we’ll send you a link to reset your password.
      </p>

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

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gold text-charcoal font-bold py-2 rounded-md mt-2 hover:bg-[#c8921a] transition-colors text-sm sm:text-base"
      >
        Send Reset Link
      </button>

      {/* Back to Login */}
      <p className="text-center text-xs sm:text-sm mt-2 text-slategray">
        Remembered your password?{" "}
        <Link href="/login" className="text-gold hover:underline">
          Back to Login
        </Link>
      </p>
    </form>
  );
};

export default ForgotPasswordForm;
