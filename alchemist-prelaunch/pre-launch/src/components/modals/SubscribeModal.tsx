"use client";
import React, { useState } from "react";
import axios from "axios";
import { useWaitlist } from "@/context/WaitlistContext";
import { Loader } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: (name?: string) => void;
};

export default function SubscribeModal({ open, onClose, onSuccess }: Props) {
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/subscribelist", {
        name: form.name,
        email: form.email,
      });

      if (response.status === 201) {
        // show success modal from context
        onSuccess(form.name || undefined);

        // reset form
        setForm({ name: "", email: "" });
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 px-4">
      <div className="bg-[#1a1a1a] p-5 sm:p-6 rounded-xl w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gold hover:text-white"
        >
          ✕
        </button>
        
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-beige mb-2 sm:mb-3">
            The Lab is Sealed
          </h2>
          <p className="text-sm sm:text-lg text-gray max-w-xl mx-auto">
            But your transformation has already begun. Subscribe for early
            access and launch updates - arriving October 2025.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-left text-xs sm:text-sm font-medium text-beige mb-1 sm:mb-2">
              Name (optional)
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Enter your name"
              className="w-full p-2 sm:p-3 rounded-lg border border-gold bg-transparent text-white focus:outline-none focus:border-[#e0b347] text-sm sm:text-base placeholder-browntext"
            />
          </div>

          <div>
            <label className="block text-left text-xs sm:text-sm font-medium text-beige mb-1 sm:mb-2">
              Email *
            </label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
              placeholder="Enter your email"
              className="w-full p-2 sm:p-3 rounded-lg border border-gold bg-transparent text-white focus:outline-none focus:border-[#e0b347] text-sm sm:text-base placeholder-browntext"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#e0b347] to-[#c8921a] text-black font-semibold py-2.5 sm:py-3 rounded-lg shadow-lg text-sm sm:text-base disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="animate-spin h-5 w-5 text-black" />
                Subscribing...
              </>
            ) : (
              "Request Early Access"
            )}
          </button>
        </form>
      </div>
    </div>
  );

}
