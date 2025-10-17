// import React from 'react';
// import { X } from 'lucide-react';

// interface CustomField {
//   label: string;
//   value: string;
//   id: number;
// }

// interface FormData {
//   preferredOutput: string;
//   learningStyle: string;
//   toneOfChoice: string;
//   problemSolvingStyle: string;
// }

// interface PreferencesTabProps {
//   formData: FormData;
//   customFields: CustomField[];
//   onInputChange: (field: string, value: string) => void;
//   onAddCustomField: () => void;
//   onUpdateCustomField: (section: string, id: number, field: string, value: string) => void;
//   onRemoveCustomField: (section: string, id: number) => void;
// }

// const PreferencesTab: React.FC<PreferencesTabProps> = ({
//   formData,
//   customFields,
//   onInputChange,
//   onAddCustomField,
//   onUpdateCustomField,
//   onRemoveCustomField
// }) => {
//   const fields = [
//     {
//       key: 'preferredOutput',
//       label: 'PREFERRED OUTPUT',
//       placeholder: 'Concise, detailed, step-by-step, frameworks, tables...',
//       value: formData.preferredOutput
//     },
//     {
//       key: 'learningStyle',
//       label: 'LEARNING STYLE',
//       placeholder: 'Visual, example-driven, story-based, hands-on...',
//       value: formData.learningStyle
//     },
//     {
//       key: 'toneOfChoice',
//       label: 'TONE OF CHOICE',
//       placeholder: 'Formal, conversational, playful, authoritative...',
//       value: formData.toneOfChoice
//     },
//     {
//       key: 'problemSolvingStyle',
//       label: 'PROBLEM-SOLVING STYLE',
//       placeholder: 'Structured, creative, experimental, first-principles...',
//       value: formData.problemSolvingStyle
//     }
//   ];

//   return (
//     <div className="space-y-0">
//       {fields.map((field, index) => (
//         <div key={field.key} className={`bg-white border-2 border-black ${index > 0 ? 'border-t-0' : ''}`}>
//           <div className="flex items-center justify-between px-4 py-2 border-b-2 border-black bg-gray-50">
//             <label className="text-xs font-bold uppercase tracking-wider">
//               {field.label}
//             </label>
//           </div>
//           <div className="p-4">
//             <input
//               type="text"
//               className="w-full px-3 py-2 text-sm border-2 border-gray-300 focus:border-black focus:outline-none bg-white"
//               placeholder={field.placeholder}
//               value={field.value}
//               onChange={(e) => onInputChange(field.key, e.target.value)}
//             />
//           </div>
//         </div>
//       ))}

//       {/* Custom Fields */}
//       {customFields.map((field, index) => (
//         <div key={field.id} className="bg-white border-2 border-black border-t-0">
//           <div className="p-4">
//             <div className="flex gap-3 items-start">
//               <input
//                 type="text"
//                 placeholder="Field name..."
//                 className="w-1/3 px-3 py-2 text-sm border-2 border-gray-300 focus:border-black focus:outline-none bg-white font-medium"
//                 value={field.label}
//                 onChange={(e) => onUpdateCustomField('preferences', field.id, 'label', e.target.value)}
//               />
//               <input
//                 type="text"
//                 placeholder="Enter value..."
//                 className="flex-1 px-3 py-2 text-sm border-2 border-gray-300 focus:border-black focus:outline-none bg-white"
//                 value={field.value}
//                 onChange={(e) => onUpdateCustomField('preferences', field.id, 'value', e.target.value)}
//               />
//               <button
//                 onClick={() => onRemoveCustomField('preferences', field.id)}
//                 className="p-2 hover:bg-red-100 transition-colors"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}

//       {/* Add Custom Button */}
//       <div className="bg-white border-2 border-black border-t-0">
//         <button
//           onClick={onAddCustomField}
//           className="w-full px-4 py-3 text-left text-sm font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors"
//         >
//           + CUSTOM
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PreferencesTab;

"use client";
import React from 'react';
import { X } from 'lucide-react';

interface CustomField {
  label: string;
  value: string;
  id: number;
}

interface FormData {
  preferredOutput: string;
  learningStyle: string;
  toneOfChoice: string;
  problemSolvingStyle: string;
}

interface PreferencesTabProps {
  formData: FormData;
  customFields: CustomField[];
  onInputChange: (field: string, value: string) => void;
  onAddCustomField: () => void;
  onUpdateCustomField: (section: string, id: number, field: string, value: string) => void;
  onRemoveCustomField: (section: string, id: number) => void;
}

const PreferencesTab: React.FC<PreferencesTabProps> = ({
  formData,
  customFields,
  onInputChange,
  onAddCustomField,
  onUpdateCustomField,
  onRemoveCustomField
}) => {
  return (
    <div className="space-y-1.5 ">
      {/* PREFERRED OUTPUT */}
      <div className="space-y-1">
        <label className="block text-[11px] font-bold uppercase text-gray-700 tracking-wide">
          Preferred Output
        </label>
        <input
          type="text"
          placeholder="Concise, detailed, step-by-step, frameworks, tables..."
          value={formData.preferredOutput}
          onChange={(e) => onInputChange("preferredOutput", e.target.value)}
          className="w-full border border-gray-300 bg-white text-[13px] rounded-sm px-3 py-2 focus:outline-none focus:border-black placeholder-gray-400"
        />
      </div>

      {/* LEARNING STYLE */}
      <div className="space-y-1">
        <label className="block text-[11px] font-bold uppercase text-gray-700 tracking-wide">
          Learning Style
        </label>
        <input
          type="text"
          placeholder="Visual, example-driven, story-based, hands-on..."
          value={formData.learningStyle}
          onChange={(e) => onInputChange("learningStyle", e.target.value)}
          className="w-full border border-gray-300 bg-white text-[13px] rounded-sm px-3 py-2 focus:outline-none focus:border-black placeholder-gray-400"
        />
      </div>

      {/* TONE OF CHOICE */}
      <div className="space-y-1">
        <label className="block text-[11px] font-bold uppercase text-gray-700 tracking-wide">
          Tone of Choice
        </label>
        <input
          type="text"
          placeholder="Formal, conversational, playful, authoritative..."
          value={formData.toneOfChoice}
          onChange={(e) => onInputChange("toneOfChoice", e.target.value)}
          className="w-full border border-gray-300 bg-white text-[13px] rounded-sm px-3 py-2 focus:outline-none focus:border-black placeholder-gray-400"
        />
      </div>

      {/* PROBLEM-SOLVING STYLE */}
      <div className="space-y-1">
        <label className="block text-[11px] font-bold uppercase text-gray-700 tracking-wide">
          Problem-Solving Style
        </label>
        <input
          type="text"
          placeholder="Structured, creative, experimental, first-principles..."
          value={formData.problemSolvingStyle}
          onChange={(e) => onInputChange("problemSolvingStyle", e.target.value)}
          className="w-full border border-gray-300 bg-white text-[13px] rounded-sm px-3 py-2 focus:outline-none focus:border-black placeholder-gray-400"
        />
      </div>

      {/* CUSTOM FIELDS */}
      {customFields.map((field) => (
        <div key={field.id} className="space-y-1">
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Field name..."
                className="w-full border border-gray-300 bg-white text-[11px] font-bold uppercase px-3 py-2 focus:outline-none focus:border-black"
                value={field.label}
                onChange={(e) => onUpdateCustomField('preferences', field.id, 'label', e.target.value)}
              />
            </div>
            <button
              onClick={() => onRemoveCustomField('preferences', field.id)}
              className="p-1 hover:bg-gray-100 transition-colors rounded"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <input
            type="text"
            placeholder="Enter value..."
            className="w-full border border-gray-300 bg-white text-[13px] rounded-sm px-3 py-2 focus:outline-none focus:border-black placeholder-gray-400"
            value={field.value}
            onChange={(e) => onUpdateCustomField('preferences', field.id, 'value', e.target.value)}
          />
        </div>
      ))}

      {/* ADD CUSTOM BUTTON */}
      <button
        onClick={onAddCustomField}
        className="text-[12px] font-bold uppercase tracking-wide text-gray-700 hover:text-black transition-colors"
      >
        + Custom
      </button>
    </div>
  );
};

export default PreferencesTab;
