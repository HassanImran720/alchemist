// "use client";
// import React, { useState } from "react";
// import { FileText, Upload, X, Book, BarChart2 } from "lucide-react";

// interface UploadedImage {
//   id: number;
//   src: string;
//   name: string;
// }

// interface InsertReferencesProps {
//   references: string;
//   setReferences: (text: string) => void;
// }

// const InsertReferences: React.FC<InsertReferencesProps> = ({ references, setReferences }) => {
//   const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
//   const [showImportModal, setShowImportModal] = useState(false);
//   const [showManualModal, setShowManualModal] = useState(false);
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [manualText, setManualText] = useState("");

//   // Handle text file upload
//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     if (file.type === "text/plain") {
//       reader.onload = (event) => {
//         const fileText = event.target?.result as string;
//         const newReferences = references ? references + "\n" + fileText : fileText;
//         setReferences(newReferences);
//         setUploadedFiles((prev) => [...prev, file.name]);
//         setShowImportModal(false);
//       };
//       reader.readAsText(file);
//     } else {
//       alert("Only plain text files are supported.");
//       setShowImportModal(false);
//     }
//     // Reset file input
//     e.target.value = "";
//   };

//   // Handle manual text addition
//   const handleAddManualText = () => {
//     if (manualText.trim()) {
//       const newReferences = references ? references + "\n" + manualText : manualText;
//       setReferences(newReferences);
//       setManualText("");
//       setShowManualModal(false);
//     }
//   };

//   // Handle manual modal cancel
//   const handleManualCancel = () => {
//     setManualText("");
//     setShowManualModal(false);
//   };

//   // Remove uploaded file
//   const handleRemoveFile = (name: string) => {
//     setUploadedFiles((prev) => prev.filter((f) => f !== name));
//   };

//   // Modal backdrop component
//   const ModalBackdrop: React.FC<{ children: React.ReactNode; onClose: () => void }> = ({ children, onClose }) => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-ivory rounded-lg max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
//         {children}
//       </div>
//     </div>
//   );

//   return (
//     <div className="rounded-xl border border-gold/30 p-2 md:p-4 mb-8">
//       <div className="flex items-center mb-4">
//         <h2 className="text-base sm:text-lg text-black mb-3 sm:mb-4">
//           <strong>V. Insert References:</strong> How should the model use the references?
//         </h2>
//       </div>

//       {/* Upload buttons */}
//       <div className="flex gap-3 mb-3 flex-wrap">
//         <button
//           type="button"
//           className="cursor-pointer px-4 py-2 bg-gold/30 rounded-md border border-gold/30 hover:bg-gold hover:text-white transition flex items-center gap-2"
//           onClick={() => setShowImportModal(true)}
//         >
//           <Upload className="w-4 h-4" />
//           Import File
//         </button>

//         <button
//           type="button"
//           className="cursor-pointer px-4 py-2 bg-gold/30 rounded-md border border-gold/30 hover:bg-gold hover:text-white transition flex items-center gap-2"
//           onClick={() => setShowManualModal(true)}
//         >
//           <FileText className="w-4 h-4" />
//           Manually Type or Paste
//         </button>

//         <button
//           type="button"
//           className="cursor-pointer px-4 py-2 bg-gold/30 rounded-md border border-gold/30 hover:bg-gold hover:text-white transition flex items-center gap-2"
//           onClick={() => setShowProfileModal(true)}
//         >
//           <BarChart2 className="w-4 h-4" />
//           Select from Profile
//         </button>
//       </div>

//       {/* Display uploaded files */}
//       {uploadedFiles.length > 0 && (
//         <div className="flex flex-wrap gap-2 mb-3">
//           {uploadedFiles.map((fileName) => (
//             <div key={fileName} className="px-2 py-1 bg-gray-200 rounded-md flex items-center gap-2">
//               <span className="text-sm">{fileName}</span>
//               <button
//                 type="button"
//                 className="text-red-500 font-bold"
//                 onClick={() => handleRemoveFile(fileName)}
//               >
//                 &times;
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* References textarea */}
//       <textarea
//         value={references}
//         onChange={(e) => setReferences(e.target.value)}
//         placeholder="Paste relevant documents, examples, or reference materials..."
//         className="w-full bg-ivory min-h-[120px] px-3 py-2 border border-gold/30 rounded-md  text-sm focus:outline-gold"
//       />

//       {/* Import File Modal */}
//       {showImportModal && (
//         <ModalBackdrop onClose={() => setShowImportModal(false)}>
//           <div className="p-6">
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-lg font-semibold">Import File</h3>
//               <button onClick={() => setShowImportModal(false)} className="text-gray-500 hover:text-gray-700">
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
            
//             <div className="text-center mb-6">
//               <div className="mb-4">
//                 <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
//               </div>
//               <h4 className="text-lg font-medium mb-2">Choose files to upload</h4>
//               <p className="text-gray-500 mb-6">Drag and drop files here, or click to browse</p>
              
//               <input 
//                 id="file-upload-input"
//                 type="file" 
//                 accept=".txt" 
//                 className="hidden" 
//                 onChange={handleFileUpload} 
//               />
//               <label 
//                 htmlFor="file-upload-input"
//                 className="inline-block px-6 py-2 text-white bg-gold rounded-md cursor-pointer hover:bg-gray-700 transition"
//               >
//                 Browse Files
//               </label>
//             </div>

//             <div className="flex justify-end gap-3">
//               <button 
//                 onClick={() => setShowImportModal(false)}
//                 className="px-4 py-2 text-gray-600 hover:text-gray-800"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </ModalBackdrop>
//       )}

//       {/* Manual Type Modal */}
//       {showManualModal && (
//         <ModalBackdrop onClose={handleManualCancel}>
//           <div className="p-6">
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-lg font-semibold">Manual Type or Paste</h3>
//               <button onClick={handleManualCancel} className="text-gray-500 hover:text-gray-700">
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
            
//             <textarea
//               value={manualText}
//               onChange={(e) => setManualText(e.target.value)}
//               placeholder="Type or paste your reference material here..."
//               className="w-full h-40  px-3 py-2 border border-gold/30 rounded-md bg-ivory text-sm focus:outline-gold"
//               autoFocus
//             />

//             <div className="flex justify-end gap-3 mt-6">
//               <button 
//                 onClick={handleManualCancel}
//                 className="px-4 py-2 text-gray-600 hover:text-gray-800"
//               >
//                 Cancel
//               </button>
//               <button 
//                 onClick={handleAddManualText}
//                 className="px-6 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition"
//               >
//                 Add to References
//               </button>
//             </div>
//           </div>
//         </ModalBackdrop>
//       )}

//       {/* Select from Profile Modal */}
//       {showProfileModal && (
//         <ModalBackdrop onClose={() => setShowProfileModal(false)}>
//           <div className="p-6">
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-lg font-semibold">Select from Profile</h3>
//               <button onClick={() => setShowProfileModal(false)} className="text-gray-500 hover:text-gray-700">
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
            
//             <div className="text-center mb-6">
//               <div className="mb-4">
//                 <Book className="w-12 h-12 text-gray-400 mx-auto mb-2" />
//               </div>
//               <h4 className="text-lg font-medium mb-2">Select from saved references</h4>
//               <p className="text-gray-500 mb-6">Choose from your previously saved reference materials</p>
              
//               <div className="text-gray-400 py-8">
//                 Browse Profile (Coming Soon)
//               </div>
//             </div>

//             <div className="flex justify-end gap-3">
//               <button 
//                 onClick={() => setShowProfileModal(false)}
//                 className="px-4 py-2 text-gray-600 hover:text-gray-800"
//               >
//                 Cancel
//               </button>
//               <button 
//                 className="px-6 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition opacity-50 cursor-not-allowed"
//                 disabled
//               >
//                 Select
//               </button>
//             </div>
//           </div>
//         </ModalBackdrop>
//       )}
//     </div>
//   );
// };

// export default InsertReferences;


"use client";
import React, { useState } from "react";
import { FileText, Upload, X, Book, BarChart2 } from "lucide-react";

interface InsertReferencesProps {
  references: string;
  setReferences: (text: string) => void;
}

const InsertReferences: React.FC<InsertReferencesProps> = ({
  references,
  setReferences,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [manualText, setManualText] = useState("");

  // Handle text file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    if (file.type === "text/plain") {
      reader.onload = (event) => {
        const fileText = event.target?.result as string;
        const newReferences = references
          ? references + "\n" + fileText
          : fileText;
        setReferences(newReferences);
        setUploadedFiles((prev) => [...prev, file.name]);
        setShowImportModal(false);
      };
      reader.readAsText(file);
    } else {
      alert("Only plain text files are supported.");
      setShowImportModal(false);
    }
    e.target.value = "";
  };

  // Handle manual text addition
  const handleAddManualText = () => {
    if (manualText.trim()) {
      const newReferences = references
        ? references + "\n" + manualText
        : manualText;
      setReferences(newReferences);
      setManualText("");
      setShowManualModal(false);
    }
  };

  // Handle manual modal cancel
  const handleManualCancel = () => {
    setManualText("");
    setShowManualModal(false);
  };

  // Remove uploaded file
  const handleRemoveFile = (name: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f !== name));
  };

  // Modal backdrop component
  const ModalBackdrop: React.FC<{
    children: React.ReactNode;
    onClose: () => void;
  }> = ({ children, onClose }) => (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-ivory rounded-lg max-w-md sm:max-w-lg w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );

  return (
    <div className="rounded-xl border border-gold/30 p-3 sm:p-4 mb-4 ">
      <div className="flex items-center mb-3 sm:mb-2">
        <h2 className="text-sm sm:text-base md:text-lg text-black">
          <strong>V. Insert References:</strong> How should the model use the
          references?
        </h2>
      </div>

      {/* Upload buttons */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 mb-3">
        <button
          type="button"
          className="w-full sm:w-auto px-3 py-2 sm:px-4 sm:py-2 bg-gold/30 rounded-md border border-gold/30 hover:bg-gold hover:text-white transition flex items-center justify-center gap-2 text-sm sm:text-base"
          onClick={() => setShowImportModal(true)}
        >
          <Upload className="w-4 h-4" />
          Import File
        </button>

        <button
          type="button"
          className="w-full sm:w-auto px-3 py-2 sm:px-4 sm:py-2 bg-gold/30 rounded-md border border-gold/30 hover:bg-gold hover:text-white transition flex items-center justify-center gap-2 text-sm sm:text-base"
          onClick={() => setShowManualModal(true)}
        >
          <FileText className="w-4 h-4" />
          Manually Type or Paste
        </button>

        <button
          type="button"
          className="w-full sm:w-auto px-3 py-2 sm:px-4 sm:py-2 bg-gold/30 rounded-md border border-gold/30 hover:bg-gold hover:text-white transition flex items-center justify-center gap-2 text-sm sm:text-base"
          onClick={() => setShowProfileModal(true)}
        >
          <BarChart2 className="w-4 h-4" />
          Select from Profile
        </button>
      </div>

      {/* Display uploaded files */}
      {uploadedFiles.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {uploadedFiles.map((fileName) => (
            <div
              key={fileName}
              className="px-2 py-1 bg-gray-200 rounded-md flex items-center gap-2 text-sm"
            >
              <span className="truncate max-w-[120px] sm:max-w-xs">
                {fileName}
              </span>
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
        className="w-full bg-ivory min-h-[100px] sm:min-h-[120px] px-3 py-2 border border-gold/30 rounded-md text-sm sm:text-base focus:outline-gold"
      />

      {/* Import File Modal */}
      {showImportModal && (
        <ModalBackdrop onClose={() => setShowImportModal(false)}>
          <div className="p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold">
                Import File
              </h3>
              <button
                onClick={() => setShowImportModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center mb-4 sm:mb-6">
              <div className="mb-3 sm:mb-4">
                <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-2" />
              </div>
              <h4 className="text-base sm:text-lg font-medium mb-2">
                Choose files to upload
              </h4>
              <p className="text-gray-500 text-sm sm:text-base mb-4 sm:mb-6">
                Drag and drop files here, or click to browse
              </p>

              <input
                id="file-upload-input"
                type="file"
                accept=".txt"
                className="hidden"
                onChange={handleFileUpload}
              />
              <label
                htmlFor="file-upload-input"
                className="inline-block px-4 sm:px-6 py-2 text-white bg-gold rounded-md cursor-pointer hover:bg-gray-700 transition"
              >
                Browse Files
              </label>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-3 sm:px-4 py-2 text-gray-600 hover:text-gray-800 text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </ModalBackdrop>
      )}

      {/* Manual Type Modal */}
      {showManualModal && (
        <ModalBackdrop onClose={handleManualCancel}>
          <div className="p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold">
                Manual Type or Paste
              </h3>
              <button
                onClick={handleManualCancel}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <textarea
              value={manualText}
              onChange={(e) => setManualText(e.target.value)}
              placeholder="Type or paste your reference material here..."
              className="w-full h-32 sm:h-40 px-3 py-2 border border-gold/30 rounded-md bg-ivory text-sm sm:text-base focus:outline-gold"
              autoFocus
            />

            <div className="flex justify-end gap-2 sm:gap-3 mt-4 sm:mt-6">
              <button
                onClick={handleManualCancel}
                className="px-3 sm:px-4 py-2 text-gray-600 hover:text-gray-800 text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleAddManualText}
                className="px-4 sm:px-6 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition text-sm sm:text-base"
              >
                Add to References
              </button>
            </div>
          </div>
        </ModalBackdrop>
      )}

      {/* Select from Profile Modal */}
      {showProfileModal && (
        <ModalBackdrop onClose={() => setShowProfileModal(false)}>
          <div className="p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold">
                Select from Profile
              </h3>
              <button
                onClick={() => setShowProfileModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center mb-6">
              <div className="mb-4">
                <Book className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-2" />
              </div>
              <h4 className="text-base sm:text-lg font-medium mb-2">
                Select from saved references
              </h4>
              <p className="text-gray-500 text-sm sm:text-base mb-6">
                Choose from your previously saved reference materials
              </p>

              <div className="text-gray-400 py-6 sm:py-8 text-sm sm:text-base">
                Browse Profile (Coming Soon)
              </div>
            </div>

            <div className="flex justify-end gap-2 sm:gap-3">
              <button
                onClick={() => setShowProfileModal(false)}
                className="px-3 sm:px-4 py-2 text-gray-600 hover:text-gray-800 text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                className="px-4 sm:px-6 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition opacity-50 cursor-not-allowed text-sm sm:text-base"
                disabled
              >
                Select
              </button>
            </div>
          </div>
        </ModalBackdrop>
      )}
    </div>
  );
};

export default InsertReferences;
