"use client";
import { useState } from "react";

interface Props {
  references: string;
  setReferences: (value: string) => void;
  outputFormat: string;
  setOutputFormat: (value: string) => void;
  promptStrucure?: string;
  setPromptStrucure?: (value: string) => void;
  length: string;
  setLength: (value: string) => void;
  onGenerate: () => void;
}

const OutputDesign: React.FC<Props> = ({
  references,
  setReferences,
  outputFormat,
  setOutputFormat,
  promptStrucure,
  setPromptStrucure,
  length,
  setLength,
  onGenerate
}) => {
  const [includeEmojis, setIncludeEmojis] = useState(false);

  return (
    <div className="space-y-6">

      {/* Output Design Section */}
      <div className="rounded-lg p-6 border mt-6 border-gold/30">
           <div className="flex items-center mb-4">
      <h2 className=" text-xl text-black mb-4"><strong >VI. Output Design

</strong>
 </h2>
    </div>

        <div className="grid grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Output Format</label>
            <select
              className="w-full px-3 py-2 border border-gold/30 rounded-md bg-ivory text-sm focus:outline-gold"
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value)}
            >
               <option value="email">Select an option</option>
              <option value="email">Email</option>
              <option value="blog">Blog Post</option>
              <option value="twitter-post">Twitter Post</option>
              <option value="script">Script</option>
              <option value="academic-essay">Academic Essay</option>
              <option value="report">Report</option>
              <option value="presentation">Presentation</option>
              <option value="social-media-post">Social Media Post</option>
              <option value="landing-page">Landing Page</option>
              <option value="product-description">Product Description</option>
              <option value="press-release">Press Release</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Length</label>
            <input
              type="text"
              placeholder="200 words length or 3 para etc"
              className="w-full px-3 py-2 border border-gold/30 rounded-md bg-ivory text-sm focus:outline-gold"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="includeEmojis"
            checked={includeEmojis}
            onChange={(e) => setIncludeEmojis(e.target.checked)}
            className="w-4 h-4 text-gold border-gold/30 rounded focus:ring-gold/30"
          />
          <label htmlFor="includeEmojis" className="ml-2 text-sm text-gray-700">
            Include Emojis
          </label>
        </div>
      </div>

      {/* Generate Prompt Section */}
      <div className="rounded-lg p-6 border border-gold/30">
           <div className="flex items-center mb-4">
      <h2 className=" text-xl text-black mb-4"><strong >VII.  Prompt Structure
:

</strong>
 </h2>
    </div>

        <label className="block text-sm font-medium mb-2 text-gray-700">Select Structure</label>
        <select
          className="w-full px-3 py-2 border border-gold/30 rounded-md bg-ivory text-sm mb-4 focus:outline-gold"
          value={promptStrucure || ""}
          onChange={(e) => setPromptStrucure && setPromptStrucure(e.target.value)}
        >
          <option value="aichemist-formula">AICHEMIST Formula</option>
          <option value="json">JSON</option>
          <option value="yaml">YAML</option>
          <option value="plain-text">Plain Text</option>
          <option value="javascript-jsx">JavaScript/JSX</option>
          <option value="toml">TOML</option>
          <option value="markdown">Markdown</option>
        </select>

        <button
          onClick={onGenerate}
          className="w-full bg-gold text-white py-3 rounded-md text-sm font-medium hover:bg-yellow-600 transition"
        >
          Generate Prompt
        </button>
      </div>

    </div>
  );
};

export default OutputDesign;
