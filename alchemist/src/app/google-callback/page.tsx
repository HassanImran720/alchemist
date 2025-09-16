// "use client";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function GoogleCallbackPage() {
//   const router = useRouter();

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.hash.substring(1)); 
//     // Google implicit flow returns token in hash (#id_token=...)
//     const token = params.get("id_token");
//     const state = params.get("state");
//     let mode = "signup";

//     if (state) {
//       try {
//         const parsed = JSON.parse(decodeURIComponent(state));
//         mode = parsed.mode || "signup";
//       } catch {}
//     }

//     if (!token) return;

//     const exchange = async () => {
//       const endpoint =
//         mode === "signup" ? "/api/auth/google-signup" : "/api/auth/google-login";

//       const res = await fetch(endpoint, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token }),
//       });

//       const data = await res.json();
//       if (data.token) {
//         localStorage.setItem("token", data.token);
//         router.push("/lab");
//       } else {
//         alert(data.error || "Google auth failed");
//         router.push(mode === "signup" ? "/signup" : "/login");
//       }
//     };

//     exchange();
//   }, [router]);

//   return <p className="text-center mt-10">Completing Google auth...</p>;
// }


"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

export default function GoogleCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const token = params.get("id_token");
    const state = params.get("state");

    let mode = "signup";
    if (state) {
      try {
        const parsed = JSON.parse(decodeURIComponent(state));
        mode = parsed.mode || "signup";
      } catch {}
    }

    if (!token) return;

    const exchange = async () => {
      const endpoint =
        mode === "signup" ? "/api/auth/google-signup" : "/api/auth/google-login";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        router.push("/lab");
      } else {
        alert(data.error || "Google auth failed");
        router.push(mode === "signup" ? "/signup" : "/login");
      }
    };

    exchange();
  }, [router]);

  return <Loader />;
}
