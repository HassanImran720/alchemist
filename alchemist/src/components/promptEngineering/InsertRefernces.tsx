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
import React, { useState, useRef } from "react";
import { FileText, Upload, X, Book, BarChart2, Eye, Trash2, CheckCircle } from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  text: string;
  isProcessing?: boolean;
}

interface InsertReferencesProps {
  references: string;
  setReferences: (text: string) => void;
}

const InsertReferences: React.FC<InsertReferencesProps> = ({
  references,
  setReferences,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [manualText, setManualText] = useState("");
  const manualTextRef = useRef<HTMLTextAreaElement | null>(null);
  const caretRef = useRef<{ start: number; end: number } | null>(null);

  const handleManualChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    // Save caret positions so we can restore after state update
    const start = e.target.selectionStart ?? value.length;
    const end = e.target.selectionEnd ?? value.length;
    caretRef.current = { start, end };
    setManualText(value);

    // Restore caret on next animation frame when DOM has updated
    requestAnimationFrame(() => {
      if (manualTextRef.current && caretRef.current) {
        try {
          manualTextRef.current.selectionStart = caretRef.current.start;
          manualTextRef.current.selectionEnd = caretRef.current.end;
        } catch (err) {
          // ignore if browser blocks selection setting
        }
      }
    });
  };

  // Extract text from PDF using multiple methods  
  const extractTextFromPDF = async (file: File): Promise<string> => {
    try {
      // Method 1: Try enhanced pdfjs-dist with better configuration
      return await extractWithPDFJS(file);
    } catch (pdfjsError) {
      console.warn('PDF.js failed, trying alternative method:', pdfjsError);
      
      try {
        // Method 2: Try basic file parsing as fallback
        return await extractWithFileAPI(file);
      } catch (fileApiError) {
        console.error('All PDF extraction methods failed:', fileApiError);
        throw new Error(`PDF text extraction failed. The file "${file.name}" may be:\n\n• Image-based or scanned PDF (requires OCR)\n• Password protected\n• Corrupted or invalid format\n• Contains only images without text layer\n\nSolutions:\n• Try a different PDF file\n• Convert to text-based PDF using Adobe Acrobat\n• Use OCR software first\n• Save content as .txt file instead\n• Try uploading page by page if it's a large PDF`);
      }
    }
  };

  // Primary PDF extraction method using PDF.js
  const extractWithPDFJS = async (file: File): Promise<string> => {
    // Use the correct import for the installed version
    const pdfjsLib = await import('pdfjs-dist');
    
    // Configure worker with the correct version URL
    try {
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.4.296/pdf.worker.min.js`;
    } catch (workerError) {
      // Fallback worker URLs
      const fallbackUrls = [
        `https://unpkg.com/pdfjs-dist@5.4.296/build/pdf.worker.min.js`,
        `https://cdn.jsdelivr.net/npm/pdfjs-dist@5.4.296/build/pdf.worker.min.js`
      ];
      
      for (const url of fallbackUrls) {
        try {
          pdfjsLib.GlobalWorkerOptions.workerSrc = url;
          break;
        } catch (e) {
          console.warn(`Failed to set worker URL ${url}`);
        }
      }
    }
    
    const arrayBuffer = await file.arrayBuffer();
    
    // Enhanced PDF loading with error handling
    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      verbosity: 0 // Reduce console noise
    });
    
    const pdf = await loadingTask.promise;
    let fullText = '';
    
    // Process all pages with better error handling
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      try {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        
        // Enhanced text extraction with better formatting
        const pageText = textContent.items
          .filter((item: any) => item.str && item.str.trim())
          .map((item: any) => item.str.trim())
          .join(' ')
          .replace(/\s+/g, ' ') // Normalize whitespace
          .trim();
        
        if (pageText && pageText.length > 0) {
          fullText += `${pageText}\n\n`;
        }
        
        // Cleanup page to prevent memory leaks
        if (page.cleanup) {
          page.cleanup();
        }
      } catch (pageError) {
        console.warn(`Error processing page ${pageNum}:`, pageError);
        fullText += `[Page ${pageNum}: Error extracting text]\n\n`;
      }
    }
    
    return fullText.trim() || 'No readable text found in PDF - may be image-based';
  };

  // Fallback method using File API
  const extractWithFileAPI = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = async (event) => {
        try {
          const arrayBuffer = event.target?.result as ArrayBuffer;
          
          // Try to detect if it's a text-based PDF by looking for text content
          const uint8Array = new Uint8Array(arrayBuffer);
          const decoder = new TextDecoder('utf-8', { fatal: false });
          let text = decoder.decode(uint8Array);
          
          // Basic PDF text extraction (very limited)
          const textMatches = text.match(/\(([^)]+)\)/g) || [];
          const extractedText = textMatches
            .map(match => match.slice(1, -1))
            .filter(str => str.length > 2 && /[a-zA-Z]/.test(str))
            .join(' ');
          
          if (extractedText && extractedText.length > 10) {
            resolve(extractedText);
          } else {
            reject(new Error('No readable text found using fallback method'));
          }
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsArrayBuffer(file);
    });
  };

  // Handle file upload (now supports PDF and text files)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    
    for (const file of fileArray) {
      // Enhanced file type detection
      const isTextFile = file.type === "text/plain" || file.name.toLowerCase().endsWith('.txt');
      const isPDFFile = file.type === "application/pdf" || file.name.toLowerCase().endsWith('.pdf');
      
      if (isTextFile || isPDFFile) {
        const fileId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        
        // Add file with processing state
        const newFile: UploadedFile = {
          id: fileId,
          name: file.name,
          type: isPDFFile ? "application/pdf" : "text/plain",
          size: file.size,
          text: "",
          isProcessing: true
        };
        
        setUploadedFiles(prev => [...prev, newFile]);
        
        try {
          let extractedText = "";
          
          if (isTextFile) {
            const reader = new FileReader();
            extractedText = await new Promise<string>((resolve, reject) => {
              reader.onload = (event) => {
                const result = event.target?.result as string;
                resolve(result || '');
              };
              reader.onerror = () => reject(new Error('Failed to read text file'));
              reader.readAsText(file, 'utf-8'); // Specify encoding
            });
          } else if (isPDFFile) {
            // Add size check for PDFs (warn if very large)
            if (file.size > 10 * 1024 * 1024) { // 10MB
              console.warn(`Large PDF file detected: ${file.name} (${(file.size / 1024 / 1024).toFixed(1)}MB)`);
            }
            extractedText = await extractTextFromPDF(file);
          }
          
          // Update file with extracted text
          setUploadedFiles(prev => 
            prev.map(f => 
              f.id === fileId 
                ? { ...f, text: extractedText, isProcessing: false }
                : f
            )
          );
          
          // Automatically add extracted text to references
          if (extractedText && extractedText.trim().length > 0) {
            const fileHeader = `\n--- ${file.name} ---\n`;
            const newReferences = references
              ? references + fileHeader + extractedText + "\n"
              : fileHeader + extractedText + "\n";
            setReferences(newReferences);
            
            console.log(`✅ Successfully processed and added ${file.name} to references`);
            console.log(`📄 Extracted ${extractedText.length} characters of text`);
          } else {
            console.warn(`⚠️ No text extracted from ${file.name}`);
          }
          
        } catch (error) {
          console.error('Error processing file:', error);
          
          // Show more user-friendly error messages with specific guidance
          let errorMessage = 'Unknown error occurred';
          let suggestions = '';
          
          if (error instanceof Error) {
            errorMessage = error.message;
            
            // Provide specific suggestions based on error type
            if (errorMessage.includes('Image-based') || errorMessage.includes('scanned')) {
              suggestions = '\n\nThis appears to be a scanned or image-based PDF. Try:\n• Using OCR software like Adobe Acrobat\n• Converting with online OCR tools\n• Manually typing the content';
            } else if (errorMessage.includes('password')) {
              suggestions = '\n\nThis PDF is password protected. Try:\n• Removing password protection\n• Using the unprotected version\n• Converting to plain text';
            } else if (errorMessage.includes('corrupted') || errorMessage.includes('Invalid')) {
              suggestions = '\n\nThe PDF file appears corrupted. Try:\n• Re-downloading the file\n• Using a different PDF\n• Converting with PDF repair tools';
            } else {
              suggestions = '\n\nGeneral solutions:\n• Try a different PDF file\n• Convert to .txt format\n• Use smaller PDF files\n• Upload pages individually';
            }
          }
          
          // Show enhanced error dialog
          alert(`❌ Failed to process "${file.name}"\n\n${errorMessage}${suggestions}`);
          
          // Remove failed file from the list
          setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
        }
      } else {
        alert(`File type not supported: ${file.name}.\n\nSupported formats:\n• PDF files (.pdf)\n• Plain text files (.txt)`);
      }
    }
    
    e.target.value = "";
    setShowImportModal(false);
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
  const handleRemoveFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  // Add file text to references
  const handleAddFileToReferences = (file: UploadedFile) => {
    if (file.text) {
      const newReferences = references
        ? references + "\n" + file.text
        : file.text;
      setReferences(newReferences);
    }
  };

  // Preview file content
  const handlePreviewFile = (file: UploadedFile) => {
    setSelectedFile(file);
    setShowPreviewModal(true);
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
        <div className="space-y-2 mb-4">
          <h4 className="text-sm font-medium text-gray-700">Uploaded Files:</h4>
          <div className="space-y-2">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md flex items-center justify-between"
              >
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  {file.type === "application/pdf" ? (
                    <FileText className="w-4 h-4 text-red-500 flex-shrink-0" />
                  ) : (
                    <FileText className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)} • {file.type === "application/pdf" ? "PDF" : "Text"}
                    </p>
                  </div>
                  {file.isProcessing && (
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-4 border-2 border-gold/30 border-t-gold rounded-full animate-spin"></div>
                      <span className="text-xs text-gray-500">Processing...</span>
                    </div>
                  )}
                  {!file.isProcessing && file.text && (
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-xs text-green-600 font-medium">Added</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-1 ml-2">
                  {!file.isProcessing && file.text && (
                    <button
                      type="button"
                      onClick={() => handlePreviewFile(file)}
                      className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                      title="Preview content"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(file.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    title="Remove file"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
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
                Supports multiple file formats:<br/>
                <span className="text-blue-600 font-medium">• PDF files (.pdf)</span><br/>
                <span className="text-green-600 font-medium">• Text files (.txt)</span><br/>
                <span className="text-purple-600 font-medium">• Word documents (.doc, .docx)</span><br/><br/>
                <span className="text-green-600 font-semibold">✨ Files will be automatically added to references</span>
              </p>

              <input
                id="file-upload-input"
                type="file"
                accept=".txt,.pdf,application/pdf,text/plain,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                multiple
                className="hidden"
                onChange={handleFileUpload}
              />
              <label
                htmlFor="file-upload-input"
                className="inline-block px-4 sm:px-6 py-2 text-white bg-gold rounded-md cursor-pointer hover:bg-gold/90 transition duration-200"
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
              ref={manualTextRef}
              dir="ltr"
              value={manualText}
              onChange={handleManualChange}
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

      {/* File Preview Modal */}
      {showPreviewModal && selectedFile && (
        <ModalBackdrop onClose={() => setShowPreviewModal(false)}>
          <div className="p-4 sm:p-6 max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <div>
                <h3 className="text-base sm:text-lg font-semibold">
                  File Preview
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedFile.name} ({formatFileSize(selectedFile.size)})
                </p>
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-hidden mb-4">
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 h-64 sm:h-80 overflow-y-auto">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap break-words">
                  {selectedFile.text || "No text content available"}
                </pre>
              </div>
            </div>

            <div className="flex justify-end gap-2 sm:gap-3">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-4 sm:px-6 py-2 bg-gold text-white rounded-md hover:bg-gold/90 transition text-sm sm:text-base"
              >
                Close
              </button>
            </div>
          </div>
        </ModalBackdrop>
      )}
    </div>
  );
};

export default InsertReferences;
