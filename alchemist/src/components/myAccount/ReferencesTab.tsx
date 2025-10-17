// import React from 'react';
// import { X, Plus } from 'lucide-react';

// interface CustomField {
//   label: string;
//   value: string;
//   id: number;
// }

// interface UploadedFile {
//   name: string;
//   size: number;
//   id: string;
// }

// interface FormData {
//   brandVoice: string;
//   workExamples: string;
//   favoriteInfluences: string;
//   data: string;
// }

// interface ReferencesTabProps {
//   formData: FormData;
//   customFields: CustomField[];
//   uploadedFiles: {[key: string]: UploadedFile[]};
//   onInputChange: (field: string, value: string) => void;
//   onAddCustomField: () => void;
//   onUpdateCustomField: (section: string, id: number, field: string, value: string) => void;
//   onRemoveCustomField: (section: string, id: number) => void;
//   onFileUpload: (field: string, files: FileList | null) => void;
//   onRemoveFile: (field: string, fileId: string) => void;
// }

// const ReferencesTab: React.FC<ReferencesTabProps> = ({
//   formData,
//   customFields,
//   uploadedFiles,
//   onInputChange,
//   onAddCustomField,
//   onUpdateCustomField,
//   onRemoveCustomField,
//   onFileUpload,
//   onRemoveFile
// }) => {
//   const fields = [
//     {
//       key: 'brandVoice',
//       label: 'BRAND VOICE',
//       placeholder: 'Add a file or type a description of your brand\'s tone, style, and personality',
//       value: formData.brandVoice
//     },
//     {
//       key: 'workExamples',
//       label: 'WORK EXAMPLES',
//       placeholder: 'Add files or type links/summaries of your work to guide outputs',
//       value: formData.workExamples
//     },
//     {
//       key: 'data',
//       label: 'DATA',
//       placeholder: 'Add a file or type books, creators, or thought leaders shaping your style',
//       value: formData.data
//     },
//     {
//       key: 'favoriteInfluences',
//       label: 'FAVORITE INFLUENCES',
//       placeholder: 'Add key facts, metrics, or data points you\'d like woven into responses',
//       value: formData.favoriteInfluences
//     }
//   ];

//   return (
//     <div className="space-y-0">
//       {fields.map((field, index) => {
//         const files = uploadedFiles[field.key] || [];
        
//         return (
//           <div key={field.key} className={`bg-white border-2 border-black ${index > 0 ? 'border-t-0' : ''}`}>
//             <div className="flex items-center justify-between px-4 py-2 border-b-2 border-black bg-gray-50">
//               <label className="text-xs font-bold uppercase tracking-wider">
//                 {field.label}
//               </label>
//               <div className="relative">
//                 <input
//                   type="file"
//                   multiple
//                   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
//                   onChange={(e) => onFileUpload(field.key, e.target.files)}
//                   accept="*/*"
//                 />
//                 <button className="flex items-center gap-2 px-3 py-1 bg-black text-white text-xs font-bold uppercase hover:bg-gray-800 transition-colors">
//                   <Plus className="w-3 h-3" />
//                 </button>
//               </div>
//             </div>
//             <div className="p-4">
//               <input
//                 type="text"
//                 className="w-full px-3 py-2 text-sm border-2 border-gray-300 focus:border-black focus:outline-none bg-white"
//                 placeholder={field.placeholder}
//                 value={field.value}
//                 onChange={(e) => onInputChange(field.key, e.target.value)}
//               />
              
//               {/* Uploaded Files */}
//               {files.length > 0 && (
//                 <div className="mt-3 flex flex-wrap gap-2">
//                   {files.map((file) => (
//                     <div key={file.id} className="inline-flex items-center bg-gray-100 border-2 border-gray-300 px-3 py-1 text-xs">
//                       <span className="text-gray-700 truncate max-w-xs">{file.name}</span>
//                       <span className="text-xs text-gray-400 ml-2">
//                         ({(file.size / 1024).toFixed(1)} KB)
//                       </span>
//                       <button
//                         onClick={() => onRemoveFile(field.key, file.id)}
//                         className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
//                       >
//                         <X className="w-3 h-3" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         );
//       })}

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
//                 onChange={(e) => onUpdateCustomField('references', field.id, 'label', e.target.value)}
//               />
//               <input
//                 type="text"
//                 placeholder="Enter value..."
//                 className="flex-1 px-3 py-2 text-sm border-2 border-gray-300 focus:border-black focus:outline-none bg-white"
//                 value={field.value}
//                 onChange={(e) => onUpdateCustomField('references', field.id, 'value', e.target.value)}
//               />
//               <button
//                 onClick={() => onRemoveCustomField('references', field.id)}
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

// export default ReferencesTab;


"use client";
import React from "react";
import { X, Plus } from "lucide-react";

interface CustomField {
  label: string;
  value: string;
  id: number;
}

interface UploadedFile {
  name: string;
  size: number;
  id: string;
}

interface FormData {
  brandVoice: string;
  workExamples: string;
  favoriteInfluences: string;
  data: string;
}

interface ReferencesTabProps {
  formData: FormData;
  customFields: CustomField[];
  uploadedFiles: { [key: string]: UploadedFile[] };
  onInputChange: (field: string, value: string) => void;
  onAddCustomField: () => void;
  onUpdateCustomField: (
    section: string,
    id: number,
    field: string,
    value: string
  ) => void;
  onRemoveCustomField: (section: string, id: number) => void;
  onFileUpload: (field: string, files: FileList | null) => void;
  onRemoveFile: (field: string, fileId: string) => void;
}

const ReferencesTab: React.FC<ReferencesTabProps> = ({
  formData,
  customFields,
  uploadedFiles,
  onInputChange,
  onAddCustomField,
  onUpdateCustomField,
  onRemoveCustomField,
  onFileUpload,
  onRemoveFile,
}) => {
  const fields = [
    {
      key: "brandVoice",
      label: "Brand Voice",
      placeholder:
        "Add a file or type a description of your brand's tone, style, and personality",
      value: formData.brandVoice,
    },
    {
      key: "workExamples",
      label: "Work Examples",
      placeholder:
        "Add files or type links/summaries of your work to guide outputs",
      value: formData.workExamples,
    },
    {
      key: "data",
      label: "Data",
      placeholder:
        "Add a file or type books, creators, or thought leaders shaping your style",
      value: formData.data,
    },
    {
      key: "favoriteInfluences",
      label: "Favorite Influences",
      placeholder:
        "Add key facts, metrics, or data points you'd like woven into responses",
      value: formData.favoriteInfluences,
    },
  ];

  return (
    <div className="space-y-1.5">
      {/* Fields */}
      {fields.map((field) => {
        const files = uploadedFiles[field.key] || [];

        return (
          <div key={field.key} className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-[11px] font-bold uppercase text-gray-700 tracking-wide">
                {field.label}
              </label>

              {/* Upload Button */}
              <div className="relative">
                <input
                  type="file"
                  multiple
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={(e) => onFileUpload(field.key, e.target.files)}
                  accept="*/*"
                />
                <button
                  type="button"
                  className="flex items-center gap-1 px-2 py-1 border border-gray-300 text-[12px] text-gray-700 rounded-sm hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  Add
                </button>
              </div>
            </div>

            {/* Input */}
            <input
              type="text"
              className="w-full border border-gray-300 bg-white text-[13px] rounded-sm px-3 py-2 focus:outline-none focus:border-black placeholder-gray-400"
              placeholder={field.placeholder}
              value={field.value}
              onChange={(e) => onInputChange(field.key, e.target.value)}
            />

            {/* Uploaded Files */}
            {files.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded px-3 py-1 text-[12px]"
                  >
                    <span className="text-gray-700 truncate max-w-[140px]">
                      {file.name}
                    </span>
                    <span className="text-gray-400 text-[11px]">
                      ({(file.size / 1024).toFixed(1)} KB)
                    </span>
                    <button
                      onClick={() => onRemoveFile(field.key, file.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Custom Fields */}
      {customFields.map((field) => (
        <div key={field.id} className="space-y-1">
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Field name..."
                className="w-full border border-gray-300 bg-white text-[11px] font-bold uppercase px-3 py-2 focus:outline-none focus:border-black"
                value={field.label}
                onChange={(e) =>
                  onUpdateCustomField("references", field.id, "label", e.target.value)
                }
              />
            </div>
            <button
              onClick={() => onRemoveCustomField("references", field.id)}
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
            onChange={(e) =>
              onUpdateCustomField("references", field.id, "value", e.target.value)
            }
          />
        </div>
      ))}

      {/* Add Custom Field Button */}
      <button
        onClick={onAddCustomField}
        className="text-[12px] font-bold uppercase tracking-wide text-gray-700 hover:text-black transition-colors"
      >
        + Custom
      </button>
    </div>
  );
};

export default ReferencesTab;
