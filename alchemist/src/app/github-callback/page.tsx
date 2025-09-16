// "use client";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function GithubCallback() {
//   const router = useRouter();


// useEffect(() => {
//   const params = new URLSearchParams(window.location.search);
//   const code = params.get("code");
//   const stateParam = params.get("state"); // custom data from state

//   if (!code) return;

//   let mode = "signup"; // default
//   if (stateParam) {
//     try {
//       const parsed = JSON.parse(decodeURIComponent(stateParam));
//       mode = parsed.mode || "signup";
//     } catch {}
//   }

//   const exchange = async () => {
//     const endpoint = mode === "signup" ? "/api/auth/github-signup" : "/api/auth/github-login";
//     console.log("Calling endpoint:", endpoint, "with code:", code);

//     try {
//       const res = await fetch(endpoint, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ code }),
//       });

//       console.log("Raw response:", res);
//       const data = await res.json();
//       console.log("Parsed response:", data);

//       if (data.token) {
//         localStorage.setItem("token", data.token);
//         router.push("/lab");
//       } else {
//         alert(data.error || "GitHub auth failed");
//         router.push(mode === "signup" ? "/signup" : "/login");
//       }
//     } catch (err) {
//       console.error("Error calling backend:", err);
//     }
//   };

//   exchange();
// }, [router]);

//   return <p className="text-center mt-10">Completing GitHub auth...</p>;
// }



"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

export default function GithubCallback() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const stateParam = params.get("state");

    if (!code) return;

    let mode = "signup";
    if (stateParam) {
      try {
        const parsed = JSON.parse(decodeURIComponent(stateParam));
        mode = parsed.mode || "signup";
      } catch {}
    }

    const exchange = async () => {
      const endpoint =
        mode === "signup" ? "/api/auth/github-signup" : "/api/auth/github-login";

      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });

        const data = await res.json();

        if (data.token) {
          localStorage.setItem("token", data.token);
          router.push("/lab");
        } else {
          alert(data.error || "GitHub auth failed");
          router.push(mode === "signup" ? "/signup" : "/login");
        }
      } catch (err) {
        console.error("Error calling backend:", err);
      }
    };

    exchange();
  }, [router]);

  return <Loader />;
}
