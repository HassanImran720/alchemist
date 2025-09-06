"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronDown, Download } from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  content: string;
}

const menuItems: MenuItem[] = [
  {
    id: "instructions",
    label: "READ INSTRUCTIONS",
    content:
      "NO BOX BUT THE TEXT WILL FILL THIS SPACE WITH THE TEXT OF THE SELECTED CATEGORY OR THE VIDEO LIBRARY",
  },
  {
    id: "task",
    label: "TASK",
    content:
      "Task content will be displayed here. This section will contain specific task instructions and requirements.",
  },
  {
    id: "context",
    label: "CONTEXT",
    content:
      "Context information will appear in this area. Background information and relevant details for the current selection.",
  },
  {
    id: "reference",
    label: "REFERENCE",
    content:
      "Reference materials and documentation will be shown here. Links to additional resources and supporting information.",
  },
  {
    id: "evaluation",
    label: "EVALUATION",
    content:
      "Evaluation criteria and assessment guidelines will be displayed in this section.",
  },
  {
    id: "iteration",
    label: "ITERATION",
    content:
      "Iteration notes and version history will appear here. Track changes and improvements over time.",
  },
  {
    id: "video",
    label: "VIDEO INSTRUCTIONS",
    content:
      "Video instruction content and related multimedia resources will be shown in this area.",
  },
];

const LabInterface: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>("instructions");
  const leftSidebarRef = useRef<HTMLDivElement>(null);
  const [sidebarHeight, setSidebarHeight] = useState<number>(0);

  const getCurrentContent = (): string => {
    const item = menuItems.find((item) => item.id === selectedItem);
    return item?.content || "";
  };

  useEffect(() => {
    if (leftSidebarRef.current) {
      setSidebarHeight(leftSidebarRef.current.offsetHeight);
    }

    const handleResize = () => {
      if (leftSidebarRef.current) {
        setSidebarHeight(leftSidebarRef.current.offsetHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full">
      {/* Left Sidebar */}
      <div
        ref={leftSidebarRef}
        className="w-full md:w-1/3 flex flex-col p-4 space-y-2 bg-gray-100"
      >
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedItem(item.id)}
            className={`w-full flex items-center justify-between p-4 rounded-lg text-left transition-all duration-200 ${
              selectedItem === item.id
                ? "bg-gold text-black shadow-md"
                : "bg-gold text-black hover:bg-gold"
            }`}
          >
            <span className="font-medium text-sm">{item.label}</span>
            {item.id === "instructions" ? (
              <Download className="w-4 h-4" />
            ) : selectedItem === item.id ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        ))}
      </div>

      {/* Right Content Area */}
      <div
        className="flex-1 p-8 w-full md:w-2/3"
        style={{ minHeight: sidebarHeight }}
      >
        <div className="bg-gold flex items-center justify-center h-full">
          <div className="text-center max-w-md">
            <p className="text-black font-medium text-sm leading-relaxed">
              {getCurrentContent()}
            </p>
            <div className="mt-8">
              <div className="w-8 h-8 border-2 border-black rounded flex items-center justify-center mx-auto">
                <div className="w-3 h-3 bg-black rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabInterface;
