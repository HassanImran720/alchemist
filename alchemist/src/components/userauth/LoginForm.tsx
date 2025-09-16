// // Fix for window.google TypeScript error
// declare global {
//   interface Window {
//     google: any;
//   }
// }
// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import { useAuth } from "@/context/AuthContext";

// const LoginForm: React.FC = () => {
// const { login, googleAuth, githubAuth, loading, error } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // Manual login
//   // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//   //   e.preventDefault();
//   //   await login({ email, password }, "manual");
//   // };

//   // Google login
//  // LoginForm.tsx (sirf handleGoogle update karna hai)
// // const handleGoogle = () => {
// //   const mode = "login"; // ya "signup"
// //   const state = encodeURIComponent(JSON.stringify({ mode }));

// //   window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_ID}&redirect_uri=${window.location.origin}/google-callback&response_type=id_token&scope=openid%20email%20profile&state=${state}&nonce=123`;
// // };


// // const handleGithub = () => {
// //   const mode = "login"; // ya "login"
// //   const state = encodeURIComponent(JSON.stringify({ mode }));
// //   window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_ID}&redirect_uri=${window.location.origin}/github-callback&scope=user:email&state=${state}`;
// // };
//   return (
//     <form
//       // onSubmit={handleSubmit}
//       className="bg-ivory rounded-xl shadow-lg p-4 sm:p-6 md:p-8 w-full max-w-md mx-auto flex flex-col gap-4 border border-neutral"
//     >
//       <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">Welcome back</h2>
//       <p className="text-slategray text-center mb-4 text-sm sm:text-base">
//         Sign in to your ALCHEMIST account
//       </p>

//    <button 
//    className="w-full flex items-center justify-center gap-2 border border-neutral rounded-md py-2 font-semibold hover:bg-gold/10 transition-colors text-sm sm:text-base"
//    type="button" onClick={() => githubAuth("login")} disabled={loading}>
//          <img
//           src="/github.svg"
//           alt="GitHub"
//           className="w-5 h-5"
//           style={{
//             filter:
//               "invert(54%) sepia(83%) saturate(748%) hue-rotate(13deg) brightness(99%) contrast(92%)",
//           }}
//         />
//   Continue with GitHub
// </button>

// <button 
// className="w-full flex items-center justify-center gap-2 border border-neutral rounded-md py-2 font-semibold hover:bg-gold/10 transition-colors text-sm sm:text-base"
// type="button" onClick={() => googleAuth("login")} disabled={loading}>
//     <img
//           src="/google.svg"
//           alt="Google"
//           className="w-5 h-5"
//           style={{
//             filter:
//               "invert(54%) sepia(83%) saturate(748%) hue-rotate(13deg) brightness(99%) contrast(92%)",
//           }}
//         />
//   Continue with Google
// </button>

//       {/* Divider */}
//       <div className="flex items-center gap-2 my-2">
//         <div className="flex-1 h-px bg-neutral" />
//         <span className="text-xs sm:text-sm text-slategray">OR CONTINUE WITH EMAIL</span>
//         <div className="flex-1 h-px bg-neutral" />
//       </div>

//       {error && <div className="text-red-500 text-sm text-center">{error}</div>}

//       {/* Email Field */}
//       <label className="text-xs sm:text-sm font-semibold">
//         Email
//         <div className="relative mt-1">
//           <input
//             type="email"
//             required
//             placeholder="name@example.com"
//             className="w-full border border-neutral rounded-md py-2 pl-3 pr-10 bg-white text-charcoal focus:outline-gold"
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//           />
//           <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gold">
//             <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
//               <path
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 d="M3 6.75A2.25 2.25 0 0 1 5.25 4.5h13.5A2.25 2.25 0 0 1 21 6.75v10.5A2.25 2.25 0 0 1 18.75 19.5H5.25A2.25 2.25 0 0 1 3 17.25V6.75Zm0 0 9 6.75 9-6.75"
//               />
//             </svg>
//           </span>
//         </div>
//       </label>

//       {/* Password Field */}
//       <label className="text-xs sm:text-sm font-semibold">
//         Password
//         <div className="relative mt-1">
//           <input
//             type="password"
//             required
//             placeholder="Enter your password"
//             className="w-full border border-neutral rounded-md py-2 pl-3 pr-10 bg-white text-charcoal focus:outline-gold"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//           />
//           <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gold">
//             <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
//               <path
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm6-6V9a6 6 0 1 0-12 0v2a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2Zm-8-2a4 4 0 1 1 8 0v2H6V9Z"
//               />
//             </svg>
//           </span>
//         </div>
//       </label>

//       {/* Remember & Forgot */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm mt-1 mb-2 gap-2">
//         <label className="flex items-center gap-2">
//           <input type="checkbox" className="accent-gold" /> Remember me
//         </label>
//         <Link href="forgot-password" className="text-gold hover:underline">
//           Forgot password?
//         </Link>
//       </div>

//       {/* Sign In */}
//       <button
//         type="submit"
//         className="w-full bg-gold text-charcoal font-bold py-2 rounded-md mt-2 hover:bg-[#c8921a] transition-colors text-sm sm:text-base"
//         disabled={loading}
//       >
//         {loading ? 'Signing In...' : 'Sign In'}
//       </button>

//       {/* Sign Up Link */}
//       <p className="text-center text-xs sm:text-sm mt-2 text-slategray">
//         Don't have an account?{" "}
//         <Link href="/signup" className="text-gold hover:underline">
//           Sign up
//         </Link>
//       </p>
//     </form>
//   );
// };

// export default LoginForm;
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const LoginForm: React.FC = () => {
  const { login, googleAuth, githubAuth, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Manual login handle
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-ivory rounded-xl shadow-lg p-4 sm:p-6 md:p-8 w-full max-w-md mx-auto flex flex-col gap-4 border border-neutral"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">Welcome back</h2>
      <p className="text-slategray text-center mb-4 text-sm sm:text-base">
        Sign in to your ALCHEMIST account
      </p>

      {/* GitHub Login */}
      <button
        className="w-full flex items-center justify-center gap-2 border border-neutral rounded-md py-2 font-semibold hover:bg-gold/10 transition-colors text-sm sm:text-base"
        type="button"
        onClick={() => githubAuth("login")}
        disabled={loading}
      >
        <img src="/github.svg" alt="GitHub" className="w-5 h-5" />
        Continue with GitHub
      </button>

      {/* Google Login */}
      <button
        className="w-full flex items-center justify-center gap-2 border border-neutral rounded-md py-2 font-semibold hover:bg-gold/10 transition-colors text-sm sm:text-base"
        type="button"
        onClick={() => googleAuth("login")}
        disabled={loading}
      >
        <img src="/google.svg" alt="Google" className="w-5 h-5" />
        Continue with Google
      </button>

      {/* Divider */}
      <div className="flex items-center gap-2 my-2">
        <div className="flex-1 h-px bg-neutral" />
        <span className="text-xs sm:text-sm text-slategray">OR CONTINUE WITH EMAIL</span>
        <div className="flex-1 h-px bg-neutral" />
      </div>

      {error && <div className="text-red-500 text-sm text-center">{error}</div>}

      {/* Email Field */}
      <label className="text-xs sm:text-sm font-semibold">
        Email
        <input
          type="email"
          required
          placeholder="name@example.com"
          className="w-full border border-neutral rounded-md py-2 pl-3 pr-10 bg-white text-charcoal focus:outline-gold mt-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      {/* Password Field */}
      <label className="text-xs sm:text-sm font-semibold">
        Password
        <input
          type="password"
          required
          placeholder="Enter your password"
          className="w-full border border-neutral rounded-md py-2 pl-3 pr-10 bg-white text-charcoal focus:outline-gold mt-1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      {/* Sign In */}
      <button
        type="submit"
        className="w-full bg-gold text-charcoal font-bold py-2 rounded-md mt-2 hover:bg-[#c8921a] transition-colors text-sm sm:text-base"
        disabled={loading}
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>

      {/* Sign Up Link */}
      <p className="text-center text-xs sm:text-sm mt-2 text-slategray">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-gold hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
