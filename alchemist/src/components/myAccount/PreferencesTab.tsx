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
  isEditMode: boolean;
  isLoading?: boolean;
}

const PreferencesTab: React.FC<PreferencesTabProps> = ({
  formData,
  customFields,
  onInputChange,
  onAddCustomField,
  onUpdateCustomField,
  onRemoveCustomField,
  isEditMode,
  isLoading = false
}) => {
  return (
    <div className="space-y-1.5 ">
      {isLoading && (
        <div className="text-sm text-gray-500 mb-2">Loading...</div>
      )}
      
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
          disabled={!isEditMode}
          className="w-full border border-gray-300 bg-white text-[13px] rounded-sm px-3 py-2 focus:outline-none focus:border-black placeholder-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
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
          disabled={!isEditMode}
          className="w-full border border-gray-300 bg-white text-[13px] rounded-sm px-3 py-2 focus:outline-none focus:border-black placeholder-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
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
          disabled={!isEditMode}
          className="w-full border border-gray-300 bg-white text-[13px] rounded-sm px-3 py-2 focus:outline-none focus:border-black placeholder-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
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
          disabled={!isEditMode}
          className="w-full border border-gray-300 bg-white text-[13px] rounded-sm px-3 py-2 focus:outline-none focus:border-black placeholder-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
        />
      </div>

      {/* CUSTOM FIELDS */}
      {customFields.length > 0 && !isEditMode && (
        <div className="space-y-1">
          <label className="block text-[11px] font-bold uppercase text-gray-700 tracking-wide mb-2">
            Custom Fields
          </label>
          <div className="border border-gray-300 rounded-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-3 py-2 text-[11px] font-bold uppercase text-gray-700">Field</th>
                  <th className="text-left px-3 py-2 text-[11px] font-bold uppercase text-gray-700">Value</th>
                </tr>
              </thead>
              <tbody>
                {customFields.map((field, index) => (
                  <tr key={field.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-3 py-2 text-[13px] font-medium text-gray-900">{field.label}</td>
                    <td className="px-3 py-2 text-[13px] text-gray-700">{field.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CUSTOM FIELDS - EDIT MODE */}
      {isEditMode && customFields.map((field) => (
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
      {isEditMode && (
        <button
          onClick={onAddCustomField}
          className="text-[12px] font-bold uppercase tracking-wide text-gray-700 hover:text-black transition-colors"
        >
          + Custom
        </button>
      )}
    </div>
  );
};

export default PreferencesTab;
