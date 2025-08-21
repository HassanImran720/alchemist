"use client";
import React, { useState, ChangeEvent } from "react";
import { Mail } from "lucide-react";
const MessageForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setSuccess(null);
    setError(null);
    // Basic client-side validation
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in your name, email, and message.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "Failed to send message");
      }

      setSuccess("Your message has been sent successfully.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      setError(
        err?.message || "Something went wrong while sending your message."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 border-[0.5px] border-[#dedede] rounded-xl shadow-sm">
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
        Send us a Message
      </h2>
      <p className="text-gray mb-6">
        Can't find the answer you're looking for? Send us a detailed message and
        we will get back to you soon!
      </p>

      <div className="space-y-4">
        {/* Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <div className="flex flex-col w-full">
            <label className="text-sm text-gray-700 font-semibold mb-1">
              Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full px-3 py-2 border-[0.5px] border-[#dedede] rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition duration-200"
              required
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="text-sm text-gray-700 font-semibold mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-3 py-2 border-[0.5px] border-[#dedede] rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition duration-200"
              required
            />
          </div>
        </div>

        {/* Subject */}
        <div className="flex flex-col w-full">
          <label className="text-sm text-gray font-semibold mb-1">
            Subject
          </label>
          <input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="How can we help you?"
            className="w-full px-3 py-2 border-[0.5px] border-[#dedede] rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition duration-200"
            required
          />
        </div>

        {/* Message */}
        <div className="flex flex-col w-full">
          <label className="text-sm text-gray-700 font-semibold mb-1">
            Message
          </label>
          <textarea
            name="message"
            rows={4} // slightly shorter than before
            value={formData.message}
            onChange={handleChange}
            placeholder="Please describe your issue and question in detail..."
            className="w-full px-3 py-2 border-[0.5px] border-[#dedede] rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition duration-200 resize-y"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-2.5 rounded-md hover:bg-purple-700 disabled:opacity-60 transition duration-200"
          disabled={loading}
        >
          <Mail className="w-5 h-5" />
          {loading ? "Sending..." : "Send Message"}
        </button>

        {/* Success & Error Messages */}
        {success && <p className="text-green-600 text-sm">{success}</p>}
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default MessageForm;
