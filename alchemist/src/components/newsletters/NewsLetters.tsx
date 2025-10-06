// "use client";

// import React, { useState, useEffect } from "react";
// import { ExternalLink, Mail } from "lucide-react";

// // -----------------------------
// // Types
// // -----------------------------
// interface Newsletter {
//   id: string;
//   name: string;
//   emails: {
//     preview_url?: string;
//     preheader?: string;
//     screenshot_url?: string; // optional screenshot image
//   }[];
// }

// // -----------------------------
// // Component
// // -----------------------------
// const Newsletters: React.FC = () => {
//   const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchNewsletters();
//   }, []);

//   const fetchNewsletters = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch("/api/newsletters");
//       const data = await res.json();

//       if (res.ok) {
//         setNewsletters(data.data || []);
//       } else {
//         setError(data.error || "Failed to fetch newsletters");
//       }
//     } catch {
//       setError("Network error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading)
//     return (
//       <div className="flex justify-center items-center min-h-[200px]">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//         <span className="ml-2 text-gray-600">Loading newsletters...</span>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//         <p className="text-red-700">{error}</p>
//         <button
//           onClick={fetchNewsletters}
//           className="text-red-600 hover:text-red-500 mt-2 underline"
//         >
//           Try Again
//         </button>
//       </div>
//     );

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-8 text-center">Newsletters</h1>

//       {newsletters.length === 0 ? (
//         <div className="text-center py-12">
//           <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//           <p className="text-gray-500">No newsletters found.</p>
//         </div>
//       ) : (
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {newsletters.map((newsletter) => {
//             const email = newsletter.emails[0];

//             return (
//               <div
//                 key={newsletter.id}
//                 className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:scale-105 overflow-hidden"
//                 onClick={() => {
//                   if (email?.preview_url) {
//                     window.open(email.preview_url, "_blank");
//                   }
//                 }}
//               >
//                 {/* Screenshot / Image */}
//                 {email?.screenshot_url ? (
//                   <img
//                     src={email.screenshot_url}
//                     alt={newsletter.name}
//                     className="w-full h-40 object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400">
//                     No Preview
//                   </div>
//                 )}

//                 <div className="p-4">
//                   <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2">
//                     {newsletter.name}
//                   </h3>

//                   {email?.preheader && (
//                     <p className="text-gray-600 text-sm line-clamp-3">
//                       {email.preheader}
//                     </p>
//                   )}

//                   {email?.preview_url && (
//                     <div className="mt-3 flex items-center text-blue-600 text-sm font-medium">
//                       <ExternalLink className="w-4 h-4 mr-1" />
//                       Open Newsletter
//                     </div>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Newsletters;
"use client";

import React, { useState, useEffect } from "react";
import { ExternalLink, Mail } from "lucide-react";

// -----------------------------
// Types
// -----------------------------
interface Newsletter {
  id: string;
  name: string;
  emails: {
    preview_url?: string;
    preheader?: string;
    screenshot_url?: string;
  }[];
}

// -----------------------------
// Component
// -----------------------------
const Newsletters: React.FC = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const fetchNewsletters = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/newsletters");
      const data = await res.json();

      if (res.ok) {
        setNewsletters(data.data || []);
      } else {
        setError(data.error || "Failed to fetch newsletters");
      }
    } catch {
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-gold"></div>
        <span className="ml-3 text-charcoal font-medium">Loading newsletters...</span>
      </div>
    );

  if (error)
    return (
      <div className="bg-beige border border-neutral rounded-lg p-5">
        <p className="text-charcoal font-semibold">{error}</p>
        <button
          onClick={fetchNewsletters}
          className="text-gold hover:text-charcoal mt-3 underline font-medium"
        >
          Try Again
        </button>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-10 text-center text-charcoal">Newsletters</h1>

      {newsletters.length === 0 ? (
        <div className="text-center py-20">
          <Mail className="w-16 h-16 text-gray mx-auto mb-5" />
          <p className="text-neutral text-lg">No newsletters found.</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {newsletters.map((newsletter) => {
            const email = newsletter.emails[0];

            return (
              <div
                key={newsletter.id}
                className="bg-ivory rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden border border-neutral hover:border-gold"
                onClick={() => {
                  if (email?.preview_url) {
                    window.open(email.preview_url, "_blank");
                  }
                }}
              >
                {/* Screenshot / Image */}
                {email?.screenshot_url ? (
                  <img
                    src={email.screenshot_url}
                    alt={newsletter.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-slate flex items-center justify-center text-neutral text-lg font-medium">
                    No Preview
                  </div>
                )}

                <div className="p-6">
                  <h3 className="font-bold text-xl mb-3 text-charcoal line-clamp-2">
                    {newsletter.name}
                  </h3>

                  {email?.preheader && (
                    <p className="text-gray text-sm line-clamp-3 mb-4">{email.preheader}</p>
                  )}

                  {email?.preview_url && (
                    <div className="flex items-center text-gold text-sm font-semibold hover:text-charcoal">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open Newsletter
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Newsletters;
