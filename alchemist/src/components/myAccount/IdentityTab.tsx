// import React from 'react';
// import { X } from 'lucide-react';

// interface CustomField {
//   label: string;
//   value: string;
//   id: number;
// }

// interface FormData {
//   role: string;
//   goals: string;
//   values: string;
//   skills: string;
// }

// interface IdentityTabProps {
//   formData: FormData;
//   customFields: CustomField[];
//   onInputChange: (field: string, value: string) => void;
//   onAddCustomField: () => void;
//   onUpdateCustomField: (section: string, id: number, field: string, value: string) => void;
//   onRemoveCustomField: (section: string, id: number) => void;
// }

// const IdentityTab: React.FC<IdentityTabProps> = ({
//   formData,
//   customFields,
//   onInputChange,
//   onAddCustomField,
//   onUpdateCustomField,
//   onRemoveCustomField
// }) => {
//   const fields = [
//     {
//       key: 'role',
//       label: 'ROLE',
//       placeholder: 'Describe your main role or identity (e.g., student, founder, designer)',
//       value: formData.role
//     },
//     {
//       key: 'goals',
//       label: 'GOALS',
//       placeholder: 'What are your main objectives or aspirations right now?',
//       value: formData.goals
//     },
//     {
//       key: 'values',
//       label: 'VALUES',
//       placeholder: 'What principles or qualities matter most to you?',
//       value: formData.values
//     },
//     {
//       key: 'skills',
//       label: 'SKILLS',
//       placeholder: 'What strengths or skills best define you?',
//       value: formData.skills
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
//                 onChange={(e) => onUpdateCustomField('identity', field.id, 'label', e.target.value)}
//               />
//               <input
//                 type="text"
//                 placeholder="Enter value..."
//                 className="flex-1 px-3 py-2 text-sm border-2 border-gray-300 focus:border-black focus:outline-none bg-white"
//                 value={field.value}
//                 onChange={(e) => onUpdateCustomField('identity', field.id, 'value', e.target.value)}
//               />
//               <button
//                 onClick={() => onRemoveCustomField('identity', field.id)}
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

// export default IdentityTab;

// import React from 'react';
// import { X } from 'lucide-react';

// interface CustomField {
//   label: string;
//   value: string;
//   id: number;
// }

// interface FormData {
//   role: string;
//   goals: string;
//   values: string;
//   skills: string;
// }

// interface IdentityTabProps {
//   formData: FormData;
//   customFields: CustomField[];
//   onInputChange: (field: string, value: string) => void;
//   onAddCustomField: () => void;
//   onUpdateCustomField: (section: string, id: number, field: string, value: string) => void;
//   onRemoveCustomField: (section: string, id: number) => void;
// }

// const IdentityTab: React.FC<IdentityTabProps> = ({
//   formData,
//   customFields,
//   onInputChange,
//   onAddCustomField,
//   onUpdateCustomField,
//   onRemoveCustomField
// }) => {
//   const fields = [
//     {
//       key: 'role',
//       label: 'ROLE',
//       placeholder: 'Describe your main role or identity (e.g., student, founder, designer)',
//       value: formData.role
//     },
//     {
//       key: 'goals',
//       label: 'GOALS',
//       placeholder: 'What are your main objectives or aspirations right now?',
//       value: formData.goals
//     },
//     {
//       key: 'values',
//       label: 'VALUES',
//       placeholder: 'What principles or qualities matter most to you?',
//       value: formData.values
//     },
//     {
//       key: 'skills',
//       label: 'SKILLS',
//       placeholder: 'What strengths or skills best define you?',
//       value: formData.skills
//     }
//   ];

//   return (
//     <div className="space-y-4">
//       {fields.map((field) => (
//         <div key={field.key} className="space-y-1">
//           <label className="block text-xs font-bold uppercase tracking-wide">
//             {field.label}
//           </label>
//           <input
//             type="text"
//             className="w-full px-0 py-2 text-sm border-b border-gray-300 focus:border-black focus:outline-none bg-transparent placeholder-gray-400"
//             placeholder={field.placeholder}
//             value={field.value}
//             onChange={(e) => onInputChange(field.key, e.target.value)}
//           />
//         </div>
//       ))}

//       {/* Custom Fields */}
//       {customFields.map((field) => (
//         <div key={field.id} className="space-y-1">
//           <div className="flex gap-3 items-end">
//             <div className="flex-1">
//               <input
//                 type="text"
//                 placeholder="Field name..."
//                 className="w-full px-0 py-2 text-xs font-bold uppercase border-b border-gray-300 focus:border-black focus:outline-none bg-transparent"
//                 value={field.label}
//                 onChange={(e) => onUpdateCustomField('identity', field.id, 'label', e.target.value)}
//               />
//             </div>
//             <button
//               onClick={() => onRemoveCustomField('identity', field.id)}
//               className="p-1 hover:bg-gray-200 transition-colors mb-2"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//           <input
//             type="text"
//             placeholder="Enter value..."
//             className="w-full px-0 py-2 text-sm border-b border-gray-300 focus:border-black focus:outline-none bg-transparent placeholder-gray-400"
//             value={field.value}
//             onChange={(e) => onUpdateCustomField('identity', field.id, 'value', e.target.value)}
//           />
//         </div>
//       ))}

//       {/* Add Custom Button */}
//       <button
//         onClick={onAddCustomField}
//         className="text-sm font-bold uppercase tracking-wide hover:text-gray-600 transition-colors"
//       >
//         + CUSTOM
//       </button>
//     </div>
//   );
// };

// export default IdentityTab;


"use client";
import React from 'react';
import { X } from 'lucide-react';

interface CustomField {
  label: string;
  value: string;
  id: number;
}

interface FormData {
  role: string;
  goals: string;
  values: string;
  skills: string;
}

interface IdentityTabProps {
  formData: FormData;
  customFields: CustomField[];
  onInputChange: (field: string, value: string) => void;
  onAddCustomField: () => void;
  onUpdateCustomField: (section: string, id: number, field: string, value: string) => void;
  onRemoveCustomField: (section: string, id: number) => void;
}

const IdentityTab: React.FC<IdentityTabProps> = ({
  formData,
  customFields,
  onInputChange,
  onAddCustomField,
  onUpdateCustomField,
  onRemoveCustomField
}) => {
  return (
    <div className="space-y-1.5">
      {/* ROLE */}
      <div className="space-y-1">
        <label className="block text-[11px] font-bold uppercase text-gray-700 tracking-wide">
          Role
        </label>
        <input
          type="text"
          placeholder="Describe your main role or identity (e.g., student, founder, designer)"
          value={formData.role}
          onChange={(e) => onInputChange("role", e.target.value)}
          className="w-full border border-gray-300 bg-white text-[13px] rounded-sm px-3 py-2 focus:outline-none focus:border-black placeholder-gray-400"
        />
      </div>

      {/* GOALS */}
      <div className="space-y-1">
        <label className="block text-[11px] font-bold uppercase text-gray-700 tracking-wide">
          Goals
        </label>
        <input
          type="text"
          placeholder="What are your main objectives or aspirations right now?"
          value={formData.goals}
          onChange={(e) => onInputChange("goals", e.target.value)}
          className="w-full border border-gray-300 bg-white text-[13px] rounded-sm px-3 py-2 focus:outline-none focus:border-black placeholder-gray-400"
        />
      </div>

      {/* VALUES */}
      <div className="space-y-1">
        <label className="block text-[11px] font-bold uppercase text-gray-700 tracking-wide">
          Values
        </label>
        <input
          type="text"
          placeholder="What principles or qualities matter most to you?"
          value={formData.values}
          onChange={(e) => onInputChange("values", e.target.value)}
          className="w-full border border-gray-300 bg-white text-[13px] rounded-sm px-3 py-2 focus:outline-none focus:border-black placeholder-gray-400"
        />
      </div>

      {/* SKILLS */}
      <div className="space-y-1">
        <label className="block text-[11px] font-bold uppercase text-gray-700 tracking-wide">
          Skills
        </label>
        <input
          type="text"
          placeholder="What strengths or skills best define you?"
          value={formData.skills}
          onChange={(e) => onInputChange("skills", e.target.value)}
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
                value={field.label}
                onChange={(e) => onUpdateCustomField('identity', field.id, 'label', e.target.value)}
                className="w-full border border-gray-300 bg-white text-[11px] font-bold uppercase px-3 py-2 focus:outline-none focus:border-black"
              />
            </div>
            <button
              onClick={() => onRemoveCustomField('identity', field.id)}
              className="p-1 hover:bg-gray-100 transition-colors rounded"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <input
            type="text"
            placeholder="Enter value..."
            value={field.value}
            onChange={(e) => onUpdateCustomField('identity', field.id, 'value', e.target.value)}
            className="w-full border border-gray-300 bg-white text-[13px] rounded-sm px-3 py-2 focus:outline-none focus:border-black placeholder-gray-400"
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

export default IdentityTab;
