"use client";
import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

interface EditPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  prompt: string;
  onSave: (editedPrompt: string) => void;
}

const EditPromptModal: React.FC<EditPromptModalProps> = ({
  isOpen,
  onClose,
  prompt,
  onSave,
}) => {
  const [editedPrompt, setEditedPrompt] = useState(prompt);

  useEffect(() => {
    if (isOpen) {
      setEditedPrompt(prompt);
    }
  }, [isOpen, prompt]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(editedPrompt);
  };

  const handleCancel = () => {
    setEditedPrompt(prompt);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
      <div className="bg-ivory rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gold/30">
          <div className="flex justify-between items-center">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
              Edit Prompt
            </h3>
            <button
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-6 overflow-hidden">
          <textarea
            value={editedPrompt}
            onChange={(e) => setEditedPrompt(e.target.value)}
            className="w-full h-full min-h-[400px] px-3 py-2 border border-gold/30 rounded-md bg-white text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-gold/50"
            placeholder="Edit your prompt here..."
          />
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-gold/30 flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center px-4 py-2 bg-gold text-white rounded-md hover:bg-gold/90 transition text-sm font-medium"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPromptModal;
