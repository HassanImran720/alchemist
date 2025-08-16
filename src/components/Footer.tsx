import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal py-6 flex items-center justify-center">
      <span className="text-sm text-gray text-center">
        © {new Date().getFullYear()} AICHEMIST. All rights reserved.
      </span>
    </footer>
  );
};

export default Footer;
