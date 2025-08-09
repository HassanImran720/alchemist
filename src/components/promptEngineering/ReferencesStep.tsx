import React, { useState } from 'react';

interface Props {
  references: string;
  setReferences: (value: string) => void;
  outputFormat: string;
  setOutputFormat: (value: string) => void;
  promptFormat?: string;
  setPromptFormat?: (value: string) => void;
  onGenerate: () => void;
}

const ReferencesStep: React.FC<Props> = ({
  references,
  setReferences,
  outputFormat,
  setOutputFormat,
  promptFormat,
  setPromptFormat,
  onGenerate
}) => {
  const [includeEmojis, setIncludeEmojis] = useState(false);

  return (
    <div className="rounded-lg border-[0.5px] border-gold/30 p-6 mb-6 ">
      {/* Step Header */}
      <div className="flex items-center mb-4">
        <div className="bg-gold text-ivory rounded-full w-8 h-8 flex items-center justify-center font-semibold mr-3">
          4
        </div>
        <h2 className="text-xl font-semibold text-charcoal">References & Output Format</h2>
      </div>

      {/* References */}
      <label className="block text-sm font-medium mb-2 text-gray">References (Optional)</label>
      <textarea
        rows={4}
        className="w-full p-3 bg-ivory border-[0.5px] border-gold/30 rounded-md focus:ring-2 focus:ring-gold mb-4"
        placeholder="Include any relevant URLs or notes"
        value={references}
        onChange={(e) => setReferences(e.target.value)}
      />

      {/* Output & Prompt Format (side by side) */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray">Output Format</label>
          <select
            className="w-full px-3 py-1.5 border-[0.5px] border-gold/30 rounded-md focus:ring-2 focus:ring-gold bg-ivory"
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value)}
          >
            <option value="">Select output format...</option>
            <option value="email">Email</option>
            <option value="blog">Blog</option>
            <option value="tweet">Tweet</option>
            <option value="report">Report</option>
            <option value="presentation">Presentation</option>
            <option value="script">Script</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray">Prompt Format</label>
          <select
            className="w-full px-3 py-1.5 border-[0.5px] border-gold/30 rounded-md focus:ring-2 focus:ring-gold bg-ivory"
             value={promptFormat || ""}
  onChange={(e) => setPromptFormat && setPromptFormat(e.target.value)}
>
  

            <option value="">Select prompt format...</option>
            <option value="json">JSON</option>
            <option value="standard">Standard</option>
            <option value="house">House Format</option>
            <option value="yaml">YAML</option>
          </select>
        </div>
      </div>

      {/* Include Emojis */}
      <div className="flex items-center mb-6">
        <input
          type="checkbox"
          id="includeEmojis"
          checked={includeEmojis}
          onChange={(e) => setIncludeEmojis(e.target.checked)}
          className="mr-2 bg-ivory"
        />
        <label htmlFor="includeEmojis" className="text-sm text-gray">
          Include emojis in output
        </label>
      </div>

      {/* Generate Button */}
      <div className="text-center">
        <button
          onClick={onGenerate}
          className="w-full bg-gold hover:bg-gold text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
        >
          Generate AI Output
        </button>
      </div>
    </div>
  );
};

export default ReferencesStep;


// import React from 'react';

// interface Props {
//   references: string;
//   setReferences: (value: string) => void;
//   outputFormat: string;
//   setOutputFormat: (value: string) => void;
// }

// const ReferencesStep: React.FC<Props> = ({
//   references,
//   setReferences,
//   outputFormat,
//   setOutputFormat
// }) => {
//   return (
//     <div className=" rounded-lg border-[0.5px] border-gold/30 p-6 mb-6">
//       <div className="flex items-center mb-4">
//         <div className="bg-gold text-ivory rounded-full w-8 h-8 flex items-center justify-center font-semibold mr-3">4</div>
//         <h2 className="text-xl font-semibold text-charcoal">References & Output Format</h2>
//       </div>

//       <label className="block text-sm font-medium mb-2 text-gray">References (Optional)</label>
//       <textarea
//         rows={4}
//         className="w-full p-3 border-[0.5px] border-gold/30 rounded-md focus:ring-2 focus:ring-gold"
//         placeholder="Include any relevant URLs or notes"
//         value={references}
//         onChange={(e) => setReferences(e.target.value)}
//       />
//     </div>
//   );
// };

// export default ReferencesStep;
