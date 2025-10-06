import {useState} from "react";
import { Upload } from 'lucide-react';

interface Props {
  references: string;
  setReferences: (value: string) => void;
  outputFormat: string;
  setOutputFormat: (value: string) => void;
  promptFormat?: string;
  setPromptFormat?: (value: string) => void;
  length: string;
  setLength: (value: string) => void;
  onGenerate: () => void;
}

const ReferencesStep: React.FC<Props> = ({
  references,
  setReferences,
  outputFormat,
  setOutputFormat,
  promptFormat,
  setPromptFormat,
  length,
  setLength,
  onGenerate
}) => {
  const [includeEmojis, setIncludeEmojis] = useState(false);

  return (
    <div className="rounded-lg p-6 border border-gold/30 mb-5">
      {/* Step Header */}
      <div className="flex items-center mb-2">
        <div className="flex items-center justify-center w-8 h-8 bg-gold text-ivory rounded-full text-sm font-medium mr-3">
          5
        </div>
        <h2 className="text-lg font-semibold text-gray-900">
          Output Format
        </h2>
      </div>
      
      <p className="text-sm text-gray-600 mb-6">Define your desired output</p>

      {/* Output Format and Length Row */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-900">
            Output Format
          </label>
          <div className="relative">
            <select
              className="w-full px-3 py-2 border border-gold/30 rounded-md bg-ivory text-sm focus:outline-none appearance-none"
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value)}
            >
              <option value="social-media-post">Social Media Post</option>
              <option value="email">Email</option>
              <option value="blog">Blog Post</option>
              <option value="report">Report</option>
              <option value="presentation">Presentation</option>
              <option value="script">Script</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-900">
            Length
          </label>
          <div className="relative">
            <select
              className="w-full px-3 py-2 border border-gold/30 rounded-md bg-ivory text-sm focus:outline-none appearance-none"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            >
              <option value="100-200-words">100-200 Words</option>
              <option value="50-100-words">50-100 Words</option>
              <option value="200-500-words">200-500 Words</option>
              <option value="500-1000-words">500-1000 Words</option>
              <option value="1000+-words">1000+ Words</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Prompt Format */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-900">
          Prompt Format
        </label>
        <div className="relative">
          <select
            className="w-full px-3 py-2 border border-gold/30 rounded-md bg-ivory text-sm focus:outline-none appearance-none"
            value={promptFormat || ""}
            onChange={(e) => setPromptFormat && setPromptFormat(e.target.value)}
          >
            <option value="house-format">House Format</option>
            <option value="aichemist-formula">AICHEMIST Formula</option>
            <option value="json">JSON</option>
            <option value="yaml">YAML</option>
            <option value="plain-text">Plain Text</option>
            <option value="javascript-jsx">JavaScript/JSX</option>
            <option value="toml">TOML</option>
            <option value="markdown">Markdown</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* References */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-900">
            References (Optional)
          </label>
          <button className="flex items-center text-sm text-gray-600 hover:text-gray-800">
            <Upload className="w-4 h-4 mr-1" />
            Import File
          </button>
        </div>
        <textarea
          rows={4}
          className="w-full p-3 border border-gold/30 rounded-md text-sm bg-ivory focus:outline-none resize-none"
          placeholder="Coffee Hut is like your favorite neighborhood coffee shop — focused, intentional, and built for flow. It's not about speed or flash; it's about quality ingredients, thoughtful preparation, and giving you exactly what you need to create your best work."
          value={references}
          onChange={(e) => setReferences(e.target.value)}
        />
      </div>

      {/* Include Emojis Checkbox */}
      <div className="flex items-center mb-6">
        <input
          type="checkbox"
          id="includeEmojis"
          checked={includeEmojis}
          onChange={(e) => setIncludeEmojis(e.target.checked)}
          className="w-4 h-4 text-gold border-gold rounded focus:ring-gold/30"
        />
        <label htmlFor="includeEmojis" className="ml-2 text-sm text-gray-900">
          Include emojis in output
        </label>
      </div>

      {/* Generate Button */}
      <button
        onClick={onGenerate}
        className="w-full bg-gold text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Generate Prompt
      </button>
    </div>
  );
};

export default ReferencesStep;
