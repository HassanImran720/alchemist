"use client";
import React, { useState } from "react";
import { X, Save, BookOpen, AlertCircle } from "lucide-react";

interface SavePromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string) => Promise<void>;
  isLoading?: boolean;
}

const SavePromptModal: React.FC<SavePromptModalProps> = ({
  isOpen,
  onClose,
  onSave,
  isLoading = false
}) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError("Please enter a title for your prompt");
      return;
    }

    if (title.length > 200) {
      setError("Title must be less than 200 characters");
      return;
    }

    try {
      setError("");
      await onSave(title.trim());
      setTitle("");
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to save prompt");
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setTitle("");
      setError("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-ivory rounded-xl border-2 border-gold/30 shadow-2xl w-full max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gold/20">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-ivory" />
            </div>
            <h2 className="text-xl font-bold text-black">
              Save to Prompt Library
            </h2>
          </div>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="w-8 h-8 rounded-full hover:bg-gold/10 flex items-center justify-center text-gray transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label 
              htmlFor="promptTitle" 
              className="block text-sm font-medium text-black mb-2"
            >
              Prompt Title <span className="text-red-500">*</span>
            </label>
            <input
              id="promptTitle"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError("");
              }}
              placeholder="Enter a descriptive title for your prompt..."
              className="w-full px-4 py-3 border border-gold/30 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
              maxLength={200}
              disabled={isLoading}
              autoFocus
            />
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-gray-600">
                {title.length}/100 characters
              </span>
            </div>
          </div>

          {error && (
            <div className="flex items-start space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* <div className="bg-gold/10 border border-gold/20 rounded-lg p-4">
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong>What gets saved:</strong> Your complete prompt , 
              all form data, context, format settings, and AI response (if generated).
            </p>
          </div> */}

          {/* Footer Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 px-6 py-3 border border-gold/30 rounded-lg text-gray font-medium hover:bg-gold/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !title.trim()}
              className="flex-1 px-6 py-3 bg-gold text-ivory font-medium rounded-lg hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-ivory/30 border-t-ivory rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save to Library</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SavePromptModal;