"use client";
import React, { useState } from "react";
import { FileText, Image, Edit2, Upload } from "lucide-react";

interface UploadedImage {
  id: number;
  src: string;
  name: string;
}

interface InsertReferencesProps {
  references: string;
  setReferences: (text: string) => void;
}

const InsertReferences: React.FC<InsertReferencesProps> = ({ references, setReferences }) => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  // Handle text file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    if (file.type === "text/plain") {
      reader.onload = (event) => {
        const fileText = event.target?.result as string;
        const newReferences = references ? references + "\n" + fileText : fileText;
        setReferences(newReferences);
        setUploadedFiles((prev) => [...prev, file.name]);
      };
      reader.readAsText(file);
    } else {
      alert("Only plain text files are supported.");
    }
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: UploadedImage[] = [];
    Array.from(files).forEach((file, idx) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        newImages.push({
          id: Date.now() + idx,
          src: event.target?.result as string,
          name: file.name,
        });
        setImages((prev) => [...prev, ...newImages]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove image
  const handleRemoveImage = (id: number) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  // Remove uploaded file
  const handleRemoveFile = (name: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f !== name));
    // Optionally remove its text from references if needed
  };

  return (
    <div className=" p-6 rounded-lg border border-gold/30 shadow-sm space-y-4">
        <div className="flex items-center mb-4">
      <h2 className=" text-xl text-black mb-4"><strong >V. Insert References:

</strong> How should the model use the references?

 </h2>
    </div>

      {/* Upload buttons */}
      <div className="flex gap-3 mb-3 flex-wrap">
        <label className="cursor-pointer px-4 py-2 bg-gold/30 rounded-md border border-gold/30 hover:bg-gold hover:text-write transition flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Import File
          <input type="file" accept=".txt" className="hidden" onChange={handleFileUpload} />
        </label>

        <button
          type="button"
        className="cursor-pointer px-4 py-2 bg-gold/30  rounded-md border border-gold/30 hover:bg-gold hover:text-white transition flex items-center gap-2"
          onClick={() => {}}
        >
          <FileText className="w-4 h-4" />
          Manually Type or Paste
        </button>

          <label className="cursor-pointer px-4 py-2 bg-gold/30  rounded-md border border-gold/30 hover:bg-gold hover:text-white transition flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Import Images (Optional)
          <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
        </label>
      </div>

      {/* Display uploaded files */}
      {uploadedFiles.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {uploadedFiles.map((fileName) => (
            <div key={fileName} className="px-2 py-1 bg-gray-200 rounded-md flex items-center gap-2">
              <span className="text-sm">{fileName}</span>
              <button
                type="button"
                className="text-red-500 font-bold"
                onClick={() => handleRemoveFile(fileName)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}

      {/* References textarea */}
      <textarea
        value={references}
        onChange={(e) => setReferences(e.target.value)}
        placeholder="Paste relevant documents, examples, or reference materials..."
        className="w-full bg-ivory min-h-[120px] p-3 border border-gold/30 rounded-md focus:ring focus:ring-gold focus:border-gold resize-none"
      />

      {/* Uploaded Images */}
      {images.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-3">
          {images.map((img) => (
            <div key={img.id} className="w-32 h-32 border border-gray-200 rounded-md overflow-hidden flex flex-col items-center justify-center p-1 relative">
              <button
                type="button"
                className="absolute top-1 right-1 text-red-500 font-bold z-10 bg-white rounded-full w-5 h-5 flex items-center justify-center"
                onClick={() => handleRemoveImage(img.id)}
              >
                &times;
              </button>
              <img src={img.src} alt={img.name} className="w-full h-24 object-contain mb-1" />
              <p className="text-xs text-gray-600 text-center truncate w-full">{img.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InsertReferences;
