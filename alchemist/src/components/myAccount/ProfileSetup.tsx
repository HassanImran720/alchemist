// "use client";
// import React, { useState, useCallback } from "react";
// import {
//   User,
//   Crown,
//   Check,
//   ChevronDown,
// } from "lucide-react";
// import IdentityTab from "./IdentityTab";
// import PreferencesTab from "./PreferencesTab";
// import ReferencesTab from "./ReferencesTab";

// interface FormData {
//   displayName: string;
//   shortBio: string;
//   role: string;
//   goals: string;
//   values: string;
//   skills: string;
//   preferredOutput: string;
//   learningStyle: string;
//   toneOfChoice: string;
//   problemSolvingStyle: string;
//   brandVoice: string;
//   workExamples: string;
//   favoriteInfluences: string;
//   data: string;
// }

// interface CustomField {
//   label: string;
//   value: string;
//   id: number;
// }

// interface CustomFields {
//   identity: CustomField[];
//   preferences: CustomField[];
//   references: CustomField[];
// }

// interface UploadedFile {
//   name: string;
//   size: number;
//   id: string;
// }

// const ProfileSetup: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<string>("identity");
//   const [savedIndicator, setSavedIndicator] = useState<boolean>(false);
//   const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

//   const [formData, setFormData] = useState<FormData>({
//     displayName: "THE AICHEMIST",
//     shortBio:
//       "The AICHEMIST is platform designed to create better results with prompting.",
//     role: "",
//     goals: "",
//     values: "",
//     skills: "",
//     preferredOutput: "",
//     learningStyle: "",
//     toneOfChoice: "",
//     problemSolvingStyle: "",
//     brandVoice: "",
//     workExamples: "",
//     favoriteInfluences: "",
//     data: "",
//   });

//   const [customFields, setCustomFields] = useState<CustomFields>({
//     identity: [],
//     preferences: [],
//     references: [],
//   });

//   const [uploadedFiles, setUploadedFiles] = useState<{
//     [key: string]: UploadedFile[];
//   }>({
//     brandVoice: [],
//     workExamples: [],
//     favoriteInfluences: [],
//     data: [],
//   });

//   const tabOptions = [
//     { id: "identity", label: "IDENTITY" },
//     { id: "preferences", label: "PREFERENCES" },
//     { id: "references", label: "REFERENCES" },
//   ];

//   const showSavedIndicator = useCallback(() => {
//     setSavedIndicator(true);
//     setTimeout(() => setSavedIndicator(false), 2000);
//   }, []);

//   // Accept string for compatibility with child components which pass string keys.
//   // Cast to keyof FormData when updating the strongly-typed state.
//   const handleInputChange = useCallback(
//     (field: string, value: string) => {
//       setFormData((prev) => ({
//         ...prev,
//         // cast field to the FormData keys; this is safe if child components use keys defined in FormData
//         [(field as keyof FormData)]: value,
//       }));
//       showSavedIndicator();
//     },
//     [showSavedIndicator]
//   );

//   const handleEditProfile = useCallback(() => {
//     setIsEditingProfile((prev) => !prev);
//   }, []);

//   // Accept string for compatibility with child components; cast internally.
//   const addCustomField = useCallback((section: string) => {
//     const newField = { label: "", value: "", id: Date.now() };
//     const key = section as keyof CustomFields;
//     setCustomFields((prev) => ({
//       ...prev,
//       [key]: [...prev[key], newField],
//     }));
//   }, []);

//   const updateCustomField = useCallback(
//     (section: string, id: number, field: string, value: string) => {
//       const key = section as keyof CustomFields;
//       setCustomFields((prev) => ({
//         ...prev,
//         [key]: prev[key].map((item) =>
//           item.id === id ? { ...item, [field]: value } : item
//         ),
//       }));
//       showSavedIndicator();
//     },
//     [showSavedIndicator]
//   );

//   const removeCustomField = useCallback(
//     (section: string, id: number) => {
//       const key = section as keyof CustomFields;
//       setCustomFields((prev) => ({
//         ...prev,
//         [key]: prev[key].filter((item) => item.id !== id),
//       }));
//     },
//     []
//   );

//   const handleFileUpload = useCallback(
//     (field: string, files: FileList | null) => {
//       if (files && files.length > 0) {
//         const fileArray = Array.from(files).map((file) => ({
//           name: file.name,
//           size: file.size,
//           id: `${field}-${Date.now()}-${Math.random()}`,
//         }));

//         setUploadedFiles((prev) => ({
//           ...prev,
//           [field]: [...prev[field], ...fileArray],
//         }));
//         showSavedIndicator();
//       }
//     },
//     [showSavedIndicator]
//   );

//   const removeFile = useCallback((field: string, fileId: string) => {
//     setUploadedFiles((prev) => ({
//       ...prev,
//       [field]: prev[field].filter((file) => file.id !== fileId),
//     }));
//   }, []);

//   const handleTabChange = useCallback((tabId: string) => {
//     setActiveTab(tabId);
//     setIsDropdownOpen(false);
//   }, []);

//   return (
//     <div className=" mt-10 max-w-4xl mx-auto overflow-hidden">
//       {/* Saved Indicator */}
//       {savedIndicator && (
//         <div className="fixed top-4 right-4 bg-black text-white px-4 py-2 rounded shadow-lg z-50 flex items-center space-x-2">
//           <Check className="w-4 h-4" />
//           <span className="text-sm font-medium">Saved</span>
//         </div>
//       )}

//       {/* Top Header Bar */}
// <div className="bg-black text-white py-2 px-4 relative flex items-center justify-center">
//   <h1 className="text-base font-semibold tracking-wide">@AICHEMIST</h1>
//   <Crown className="w-5 h-5 text-yellow-400 absolute right-2" />
// </div>




//       {/* Profile Header Section */}
//       <div className=" py-10 border-t border-gray-300">
//         <div className="flex justify-between items-start">
//           {/* Left Section */}
//           <div className="flex-1 pr-6">
//             {isEditingProfile ? (
//               <>
//                 <input
//                   type="text"
//                   className="w-full text-base font-bold uppercase tracking-wide border border-gray-300 rounded-sm px-3 py-2 mb-3 bg-white focus:outline-none focus:border-black"
//                   placeholder="Your display name"
//                   value={formData.displayName}
//                   onChange={(e) =>
//                     handleInputChange("displayName", e.target.value)
//                   }
//                 />
//                 <textarea
//                   className="w-full text-sm border border-gray-300 rounded-sm px-3 py-2 bg-white resize-none focus:outline-none focus:border-black"
//                   placeholder="One–two lines describing what you do"
//                   rows={2}
//                   value={formData.shortBio}
//                   onChange={(e) =>
//                     handleInputChange("shortBio", e.target.value)
//                   }
//                 />
//               </>
//             ) : (
//               <>
//                 <h2 className="text-base font-bold uppercase tracking-wide text-black mb-2">
//                   {formData.displayName}
//                 </h2>
//                 <p className="text-sm text-gray-800 border border-gray-300 bg-white px-3 py-2 rounded-sm">
//                   {formData.shortBio}
//                 </p>
//               </>
//             )}
//           </div>

//           {/* Right Section - Avatar + Button */}
//           <div className="flex flex-col items-center">
//             <div className="w-20 h-20 bg-yellow-600 rounded-sm flex items-center justify-center mb-2">
//               <User className="w-10 h-10 text-black" />
//             </div>
//             <button
//               onClick={handleEditProfile}
//               className="text-[11px] uppercase font-medium text-gray-700 hover:text-black transition"
//             >
//               Manage Subscription
//             </button>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex mt-10 text-sm font-bold uppercase tracking-wide space-x-6">
//           {tabOptions.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`pb-2 ${
//                 activeTab === tab.id
//                   ? "border-b-2 border-black text-black"
//                   : "text-gray-500 hover:text-black"
//               }`}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>
//     </div>

//       {/* Tab Content */}
//       <div className=" pb-10">
//         {activeTab === "identity" && (
//           <IdentityTab
//             formData={formData}
//             customFields={customFields.identity}
//             onInputChange={handleInputChange}
//             onAddCustomField={() => addCustomField("identity")}
//             onUpdateCustomField={updateCustomField}
//             onRemoveCustomField={removeCustomField}
//           />
//         )}
//         {activeTab === "preferences" && (
//           <PreferencesTab
//             formData={formData}
//             customFields={customFields.preferences}
//             onInputChange={handleInputChange}
//             onAddCustomField={() => addCustomField("preferences")}
//             onUpdateCustomField={updateCustomField}
//             onRemoveCustomField={removeCustomField}
//           />
//         )}
//         {activeTab === "references" && (
//           <ReferencesTab
//             formData={formData}
//             customFields={customFields.references}
//             uploadedFiles={uploadedFiles}
//             onInputChange={handleInputChange}
//             onAddCustomField={() => addCustomField("references")}
//             onUpdateCustomField={updateCustomField}
//             onRemoveCustomField={removeCustomField}
//             onFileUpload={handleFileUpload}
//             onRemoveFile={removeFile}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfileSetup;



"use client";
import React, { useState, useCallback } from "react";
import { User, Crown, Check } from "lucide-react";
import IdentityTab from "./IdentityTab";
import PreferencesTab from "./PreferencesTab";
import ReferencesTab from "./ReferencesTab";

interface FormData {
  displayName: string;
  shortBio: string;
  role: string;
  goals: string;
  values: string;
  skills: string;
  preferredOutput: string;
  learningStyle: string;
  toneOfChoice: string;
  problemSolvingStyle: string;
  brandVoice: string;
  workExamples: string;
  favoriteInfluences: string;
  data: string;
}

interface CustomField {
  label: string;
  value: string;
  id: number;
}

interface CustomFields {
  identity: CustomField[];
  preferences: CustomField[];
  references: CustomField[];
}

interface UploadedFile {
  name: string;
  size: number;
  id: string;
}

const ProfileSetup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("identity");
  const [savedIndicator, setSavedIndicator] = useState<boolean>(false);
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    displayName: "THE AICHEMIST",
    shortBio:
      "The AICHEMIST is platform designed to create better results with prompting.",
    role: "",
    goals: "",
    values: "",
    skills: "",
    preferredOutput: "",
    learningStyle: "",
    toneOfChoice: "",
    problemSolvingStyle: "",
    brandVoice: "",
    workExamples: "",
    favoriteInfluences: "",
    data: "",
  });

  const [customFields, setCustomFields] = useState<CustomFields>({
    identity: [],
    preferences: [],
    references: [],
  });

  const [uploadedFiles, setUploadedFiles] = useState<{
    [key: string]: UploadedFile[];
  }>({
    brandVoice: [],
    workExamples: [],
    favoriteInfluences: [],
    data: [],
  });

  const tabOptions = [
    { id: "identity", label: "IDENTITY" },
    { id: "preferences", label: "PREFERENCES" },
    { id: "references", label: "REFERENCES" },
  ];

  const showSavedIndicator = useCallback(() => {
    setSavedIndicator(true);
    setTimeout(() => setSavedIndicator(false), 2000);
  }, []);

  const handleInputChange = useCallback(
    (field: string, value: string) => {
      setFormData((prev) => ({
        ...prev,
        [(field as keyof FormData)]: value,
      }));
      showSavedIndicator();
    },
    [showSavedIndicator]
  );

  const handleEditProfile = useCallback(() => {
    setIsEditingProfile((prev) => !prev);
  }, []);

  const addCustomField = useCallback((section: string) => {
    const newField = { label: "", value: "", id: Date.now() };
    const key = section as keyof CustomFields;
    setCustomFields((prev) => ({
      ...prev,
      [key]: [...prev[key], newField],
    }));
  }, []);

  const updateCustomField = useCallback(
    (section: string, id: number, field: string, value: string) => {
      const key = section as keyof CustomFields;
      setCustomFields((prev) => ({
        ...prev,
        [key]: prev[key].map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        ),
      }));
      showSavedIndicator();
    },
    [showSavedIndicator]
  );

  const removeCustomField = useCallback(
    (section: string, id: number) => {
      const key = section as keyof CustomFields;
      setCustomFields((prev) => ({
        ...prev,
        [key]: prev[key].filter((item) => item.id !== id),
      }));
    },
    []
  );

  const handleFileUpload = useCallback(
    (field: string, files: FileList | null) => {
      if (!files) return;
      const fileArray = Array.from(files).map((file) => ({
        name: file.name,
        size: file.size,
        id: `${field}-${Date.now()}-${Math.random()}`,
      }));
      setUploadedFiles((prev) => ({
        ...prev,
        [field]: [...prev[field], ...fileArray],
      }));
      showSavedIndicator();
    },
    [showSavedIndicator]
  );

  const removeFile = useCallback((field: string, fileId: string) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [field]: prev[field].filter((file) => file.id !== fileId),
    }));
  }, []);

  return (
    <div className="mt-10 max-w-4xl mx-auto font-inter px-4 sm:px-6">
      {/* Saved Indicator */}
      {savedIndicator && (
        <div className="fixed top-4 right-4 bg-black text-white px-4 py-2 rounded shadow-lg z-50 flex items-center space-x-2">
          <Check className="w-4 h-4" />
          <span className="text-sm font-medium">Saved</span>
        </div>
      )}

      {/* Top Header */}
      <div className="bg-black text-white py-2 px-4 relative flex items-center justify-center">
        <h1 className="text-base sm:text-lg font-semibold tracking-wide">@AICHEMIST</h1>
        <Crown className="w-5 h-5 text-yellow-400 absolute right-2" />
      </div>

      {/* Profile Header */}
      <div className="py-6 sm:py-10 border-t border-gray-300">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          {/* Left Section */}
          <div className="flex-1">
            {isEditingProfile ? (
              <>
                <input
                  type="text"
                  className="w-full text-base sm:text-lg font-bold uppercase tracking-wide border border-gray-300 rounded-sm px-3 py-2 mb-3 bg-white focus:outline-none focus:border-black"
                  placeholder="Your display name"
                  value={formData.displayName}
                  onChange={(e) =>
                    handleInputChange("displayName", e.target.value)
                  }
                />
                <textarea
                  className="w-full text-sm sm:text-base border border-gray-300 rounded-sm px-3 py-2 bg-white resize-none focus:outline-none focus:border-black"
                  placeholder="One–two lines describing what you do"
                  rows={2}
                  value={formData.shortBio}
                  onChange={(e) =>
                    handleInputChange("shortBio", e.target.value)
                  }
                />
              </>
            ) : (
              <>
                <h2 className="text-base sm:text-lg font-bold uppercase tracking-wide text-black mb-2">
                  {formData.displayName}
                </h2>
                <p className="text-sm sm:text-base text-gray-800 border border-gray-300 bg-white px-3 py-2 rounded-sm">
                  {formData.shortBio}
                </p>
              </>
            )}
          </div>

          {/* Right Section - Avatar + Button */}
          <div className="flex flex-col items-center">
            <div className="w-16 sm:w-20 h-16 sm:h-20 bg-yellow-600 rounded-sm flex items-center justify-center mb-2">
              <User className="w-8 sm:w-10 h-8 sm:h-10 text-black" />
            </div>
            <button
              onClick={handleEditProfile}
              className="text-[10px] sm:text-[11px] uppercase font-medium text-gray-700 hover:text-black transition"
            >
              Manage Subscription
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 sm:mt-10 overflow-x-auto">
          <div className="flex text-sm sm:text-base font-bold uppercase tracking-wide space-x-6 min-w-max">
            {tabOptions.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 ${
                  activeTab === tab.id
                    ? "border-b-2 border-black text-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="pb-10">
        {activeTab === "identity" && (
          <IdentityTab
            formData={formData}
            customFields={customFields.identity}
            onInputChange={handleInputChange}
            onAddCustomField={() => addCustomField("identity")}
            onUpdateCustomField={updateCustomField}
            onRemoveCustomField={removeCustomField}
          />
        )}
        {activeTab === "preferences" && (
          <PreferencesTab
            formData={formData}
            customFields={customFields.preferences}
            onInputChange={handleInputChange}
            onAddCustomField={() => addCustomField("preferences")}
            onUpdateCustomField={updateCustomField}
            onRemoveCustomField={removeCustomField}
          />
        )}
        {activeTab === "references" && (
          <ReferencesTab
            formData={formData}
            customFields={customFields.references}
            uploadedFiles={uploadedFiles}
            onInputChange={handleInputChange}
            onAddCustomField={() => addCustomField("references")}
            onUpdateCustomField={updateCustomField}
            onRemoveCustomField={removeCustomField}
            onFileUpload={handleFileUpload}
            onRemoveFile={removeFile}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileSetup;
