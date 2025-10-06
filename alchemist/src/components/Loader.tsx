"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function Loader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-ivory">
      {/* Logo + spinner in column */}
      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Logo */}
        <Image
          src="/WithBgBackground.png"
          alt="Logo"
          width={200}
          height={200}
        />

        {/* Spinner */}
        <Loader2 className="w-12 h-12 text-gray-600 animate-spin" />

     
      </div>
    </div>
  );
}
