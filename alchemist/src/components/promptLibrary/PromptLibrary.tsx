"use client";
import React, { useState } from "react";
import { Search, Edit, Clock } from "lucide-react";

interface PromptItem {
  id: string;
  name: string;
  date: string;
  score: number;
}

const PromptLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [prompts] = useState<PromptItem[]>([
    { id: "1", name: "PROMPT NAME", date: "DATE", score: 0 },
    { id: "2", name: "PROMPT NAME", date: "DATE", score: 0 },
    { id: "3", name: "PROMPT NAME", date: "DATE", score: 0 },
    { id: "4", name: "PROMPT NAME", date: "DATE", score: 0 },
  ]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-[10.875rem] py-10 space-y-6">
      {/* Header */}
      <div className="text-center lg:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-black font-heading mb-2">
          PROMPT LIBRARY
        </h1>
      </div>

      {/* Search Bar */}
      <div>
        <div className="relative w-full max-w-full sm:max-w-xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray" />
          <input
            type="text"
            placeholder="PROJECT NAME"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Prompt List */}
      <div>
        <div className="rounded-lg shadow-sm border border-gold/20 overflow-hidden">
          {/* Table Header - hidden on small screens */}
          <div className="hidden md:block bg-gray/10 px-6 py-4 border-b border-gold/20">
            <div className="grid grid-cols-6 gap-4 text-sm font-semibold text-black uppercase tracking-wide">
              <div>PROMPT NAME</div>
              <div>DATE</div>
              <div>SCORE</div>
              <div>EDIT</div>
              <div></div>
              <div>NOTES</div>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gold/20">
            {prompts.map((prompt) => (
              <div
                key={prompt.id}
                className="px-4 sm:px-6 py-4 hover:bg-gray/5 transition-colors"
              >
                {/* Desktop view */}
                <div className="hidden md:grid grid-cols-6 gap-4 items-center">
                  <div className=" text-black">{prompt.name}</div>
                  <div className="text-gray">{prompt.date}</div>
                  <div className="text-black font-medium">{prompt.score}</div>
                  <div>
                    <button className="text-gray hover:text-gold transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <button className="text-gray hover:text-gold transition-colors">
                      <Clock className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-gray">NOTES</div>
                </div>

                {/* Mobile view */}
                <div className="md:hidden space-y-2 border-l-4 border-gold pl-3">
                  <div className="font-medium text-black">{prompt.name}</div>
                  <div className="text-gray text-sm">{prompt.date}</div>
                  <div className="text-black font-medium">
                    Score: {prompt.score}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button className="text-gray hover:text-gold transition-colors flex items-center gap-1">
                      <Edit className="w-4 h-4" /> Edit
                    </button>
                    <button className="text-gray hover:text-gold transition-colors flex items-center gap-1">
                      <Clock className="w-4 h-4" /> Time
                    </button>
                  </div>
                  <div className="text-gray text-sm">NOTES</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {prompts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray mb-4">No prompts found</div>
            <button className="bg-gold text-white px-6 py-2 rounded-md hover:bg-gold/90 transition-colors w-full sm:w-auto">
              Create Your First Prompt
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptLibrary;

// "use client";
// import React, { useState } from "react";

// interface PromptItem {
//   id: string;
//   name: string;
//   category: string;
//   date: string;
// }

// const PromptLibrary: React.FC = () => {
//   const [prompts] = useState<PromptItem[]>([
//     {
//       id: "1",
//       name: "Sales Outreach Formula",
//       category: "Sales & Lead Generation",
//       date: "2024-01-15",
//     },
//     {
//       id: "2",
//       name: "Customer Support Response",
//       category: "Customer Support & Service",
//       date: "2024-01-14",
//     },
//   ]);

//   return (
//     <div className="bg-white min-h-screen px-8 py-6">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-black">Prompt Library</h1>
//           <p className="text-gray-500 text-sm">
//             Your saved prompts and formulas
//           </p>
//         </div>
//         <button className="bg-gold text-white px-4 py-2 rounded-md hover:bg-gold/90 flex items-center gap-2">
//           <span>Export All</span>
//         </button>
//       </div>

//       {/* Table */}
//       <div className="rounded-lg border border-gray-200 overflow-hidden">
//         {/* Table Header */}
//         <div className="bg-gray-50 grid grid-cols-[2fr_1.5fr_1fr_auto] px-6 py-3 font-semibold text-sm text-gray-700">
//           <div>Name</div>
//           <div>Category</div>
//           <div>Date</div>
//           <div>Actions</div>
//         </div>

//         {/* Table Rows */}
//         {prompts.map((prompt) => (
//           <div
//             key={prompt.id}
//             className="grid grid-cols-[2fr_1.5fr_1fr_auto] px-6 py-4 items-center border-t border-gray-200"
//           >
//             <div className="text-black font-medium">{prompt.name}</div>
//             <div>
//               <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full border border-gray-200">
//                 {prompt.category}
//               </span>
//             </div>
//             <div className="text-gray-500">{prompt.date}</div>
//             <div className="flex gap-2">
//               <button className="border border-gray-300 px-3 py-1 rounded-md text-sm hover:bg-gray-50">
//                 View
//               </button>
//               <button className="border border-gray-300 px-3 py-1 rounded-md text-sm hover:bg-gray-50">
//                 Edit
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PromptLibrary;
