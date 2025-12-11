"use client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { usePromptEng } from "../../context/PromptEngContext";

interface Props {
  references: string;
  setReferences: (value: string) => void;
  outputFormat: string;
  setOutputFormat: (value: string) => void;
  length: string;
  setLength: (value: string) => void;
  onGenerate: () => Promise<void> | void;
}

const OutputDesign: React.FC<Props> = ({
  references,
  setReferences,
  outputFormat,
  setOutputFormat,
  length,
  setLength,
  onGenerate,
}) => {
  const {
    includeEmojis,
    setIncludeEmojis,
    taskObjective,
    selectedCategory,
    promptStructure,
    setPromptStructure,
  } = usePromptEng();
  const [loading, setLoading] = useState(false);

  const validationErrors: string[] = [];
  if (!taskObjective || taskObjective.trim() === "") {
    validationErrors.push("Define Objective is required");
  }
  if (!selectedCategory || selectedCategory.trim() === "") {
    validationErrors.push("Select Category is required");
  }
  if (!outputFormat || outputFormat.trim() === "") {
    validationErrors.push("Select Output Format is required");
  }

  const handleGenerateClick = async () => {
    try {
      setLoading(true);
      await onGenerate();
    } catch (err) {
      // swallow - parent handles errors
      console.error("OutputDesign onGenerate error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      {/* Output Design Section */}
      <div className="rounded-xl border border-gold/30 p-3 sm:p-4 mb-4">
        <div className="flex items-center mb-2">
          <h2 className="text-base sm:text-lg text-black mb-1">
            <strong>VI. Output Design</strong>
          </h2>
        </div>

        {/* Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Output Format
            </label>
            <select
              className="w-full px-3 py-2 border border-gold/30 rounded-md bg-ivory text-sm focus:outline-gold"
              value={outputFormat || "default"}
              onChange={(e) => setOutputFormat(e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="default">Default</option>
              {/* <option value="general">General Output</option> */}
              <option value="email">Email</option>
              <option value="blog">Blog Post</option>
              <option value="twitter-post">Twitter Post</option>
              <option value="script">Script</option>
              <option value="academic-essay">Academic Essay</option>
              <option value="social-media-post">Social Media Post</option>
              <option value="presentation">Presentation</option>
              <option value="report">Report</option>
              <option value="landing-page">Checklist/SOP</option>
              <option value="product-description">SEO Keywords</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Length
            </label>
            <input
              type="text"
              placeholder="200 words length or 3 para etc"
              className="w-full px-3 py-2 border border-gold/30 rounded-md bg-ivory text-sm focus:outline-gold"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="includeEmojis"
            checked={includeEmojis}
            onChange={(e) => setIncludeEmojis(e.target.checked)}
            className="w-4 h-4 text-gold border-gold/30 rounded focus:ring-gold/30"
          />
          <label htmlFor="includeEmojis" className="text-sm text-gray-700">
            Include Emojis
          </label>
        </div>
      </div>

      {/* Generate Prompt Section */}
      <div className="rounded-xl border border-gold/30 p-3 sm:p-4 mb-4 ">
        {/* Validation messages */}
        {validationErrors.length > 0 && (
          <div className="mb-3 text-sm text-red-600">
            {(!taskObjective || taskObjective.trim() === "") && (
              <div>• Define Objective is required</div>
            )}
            {(!selectedCategory || selectedCategory.trim() === "") && (
              <div>• Select Category is required</div>
            )}
            {(!outputFormat || outputFormat.trim() === "") && (
              <div>• Select Output Format is required</div>
            )}
          </div>
        )}

        <button
          onClick={handleGenerateClick}
          disabled={
            loading || !taskObjective || !selectedCategory || !outputFormat
          }
          className={`w-full py-3 rounded-md text-sm font-medium transition ${
            loading || !taskObjective || !selectedCategory || !outputFormat
              ? "bg-white text-gold border border-gold/30 cursor-not-allowed"
              : "bg-gold text-white hover:bg-yellow-600"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <Loader2 className="w-4 h-4 animate-spin mr-2 text-gold" />
              Generating...
            </span>
          ) : (
            "Generate Prompt"
          )}
        </button>
      </div>
    </div>
  );
};

export default OutputDesign;
