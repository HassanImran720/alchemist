import React from "react";
import { Linkedin, Twitter, Instagram } from "lucide-react";

const Connect: React.FC = () => {
  return (
    <section className="text-gray bg-[#1a1a1a] py-8 px-4 border-t border-b border-gray">
      {/* Contact Info */}
      <div className="mb-6 text-center max-w-xl mx-auto">
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight mb-4 text-beige">
          Contact
        </h2>
        <p className="mt-2 text-sm sm:text-base">
          For questions, ideas, or opportunities — the door is always open.
        </p>
        <a
          href="mailto:drew@aichemist.app "
          className="block mt-1 text-gold font-semibold hover:underline break-all"
        >
          drew@aichemist.app 
        </a>
      </div>

      {/* Social Icons */}
      <div className="flex flex-wrap justify-center gap-6 mt-4">
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gold transition-colors"
        >
          <Linkedin size={24} />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gold transition-colors"
        >
          <Twitter size={24} />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gold transition-colors"
        >
          <Instagram size={24} />
        </a>
      </div>
    </section>
  );
};

export default Connect;
