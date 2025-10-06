// "use client";
// import React from "react";
// import { User, Crown } from "lucide-react";

// const MyAccount: React.FC = () => {
//   return (
//     <div className="flex-1 bg-gray-50 min-h-screen">
//       {/* Header Section */}
//       <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center">
//         {/* Profile Avatar with PRO Badge */}
//         <div className="relative inline-block mb-6">
//           <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gold rounded-full flex items-center justify-center shadow-lg">
//             <User className="w-8 h-8 sm:w-10 sm:h-10 text-ivory" />
//           </div>
//           {/* PRO Badge */}
//           <div className=" absolute -top-2 -right-2 bg-gold text-ivory text-xs font-bold px-2 py-1 rounded-full shadow-md">
//             👑 PRO
//           </div>
//         </div>

//         {/* Title and Description */}
//         <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-charcoal mb-2">
//           My Account
//         </h1>
//         <p className="text-gray-500 text-sm sm:text-base">
//           Manage your AIChemist profile and preferences
//         </p>
//       </div>

//       {/* Account Statistics Card */}
//       <div className="px-4 sm:px-6 lg:px-8 pb-8">
//         <div className="max-w-4xl mx-auto">
//          <div className="bg-ivory rounded-xl shadow-sm border-[0.5px] border-gold/30 p-3 sm:p-6">
//   <h2 className="text-lg sm:text-xl font-semibold text-gray mb-4 text-left">
//     Account Statistics
//   </h2>
  
//   <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
//     <div className="text-center">
//       <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gold mb-1">
//         247
//       </div>
//       <div className="text-gray-500 text-sm sm:text-base">
//         Active Formulas
//       </div>
//     </div>
    
//     <div className="text-center">
//       <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gold mb-1">
//         94%
//       </div>
//       <div className="text-gray-500 text-sm sm:text-base">
//         Success Rate
//       </div>
//     </div>
    
//     <div className="text-center">
//       <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gold mb-1">
//         1,250
//       </div>
//       <div className="text-gray-500 text-sm sm:text-base">
//         Charms Available
//       </div>
//     </div>
    
//     <div className="text-center">
//       <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gold mb-1">
//         89
//       </div>
//       <div className="text-gray-500 text-sm sm:text-base">
//         Lab Sessions
//       </div>
//     </div>
//   </div>
// </div>

//         </div>
//       </div>

//       {/* Profile Settings Section */}
//       <div className="px-4 sm:px-6 lg:px-8 pb-8">
//         <div className="max-w-4xl mx-auto">
//           <div className="bg-ivory rounded-xl shadow-sm border-[0.5px] border-gold/30 p-6 sm:p-8">
//             <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">
//               Profile Settings
//             </h2>
            
//             <button className="w-full bg-gold text-ivory py-3 px-6 rounded-lg font-medium transition-colors mb-6 text-sm sm:text-base">
//               TELL US ABOUT YOURSELF
//             </button>
            
//             <div className="space-y-3">
//               {[
//                 "RESET EVERYTHING",
//                 "ACCESS PROMPT LIBRARY",
//                 "CONTINUE LEARNING", 
//                 "PROVIDE FEEDBACK",
//                 "GET SUPPORT",
//               ].map((item, idx) => (
//                 <button
//                   key={idx}
//                   className="w-full text-left py-3 px-4 text-sm sm:text-base text-gray hover:text-gold hover:bg-gray-50 transition-all rounded-lg font-medium"
//                 >
//                   {item}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyAccount;



"use client";
import React, { useState, useCallback, useMemo } from 'react';
import { User, Crown, Plus, Paperclip, X, Check, Edit2, ChevronDown, ChevronRight } from 'lucide-react';

interface CustomField {
  label: string;
  value: string;
  id: number;
}

interface FormData {
  // Profile header
  displayName: string;
  shortBio: string;
  
  // Identity fields
  role: string;
  goals: string;
  values: string;
  skills: string;
  
  // Preferences fields
  preferredOutput: string;
  learningStyle: string;
  toneOfChoice: string;
  problemSolvingStyle: string;
  
  // References fields
  brandVoice: string;
  workExamples: string;
  favoriteInfluences: string;
  data: string;
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
  const [activeTab, setActiveTab] = useState<string>('identity');
  const [savedIndicator, setSavedIndicator] = useState<boolean>(false);
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  
  const [formData, setFormData] = useState<FormData>({
    // Profile header - pre-filled
    displayName: 'Alex Johnson',
    shortBio: 'Digital Marketing Strategist helping brands grow through data-driven campaigns',
    
    // Identity fields
    role: '',
    goals: '',
    values: '',
    skills: '',
    
    // Preferences fields
    preferredOutput: '',
    learningStyle: '',
    toneOfChoice: '',
    problemSolvingStyle: '',
    
    // References fields
    brandVoice: '',
    workExamples: '',
    favoriteInfluences: '',
    data: ''
  });
  
  const [customFields, setCustomFields] = useState<CustomFields>({
    identity: [],
    preferences: [],
    references: []
  });

  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: UploadedFile[]}>({
    brandVoice: [],
    workExamples: [],
    favoriteInfluences: [],
    data: []
  });

  const tabOptions = [
    { id: 'identity', label: 'Identity' },
    { id: 'preferences', label: 'Preferences' },
    { id: 'references', label: 'References' }
  ];

  // Show saved indicator briefly when data changes
  const showSavedIndicator = useCallback(() => {
    setSavedIndicator(true);
    setTimeout(() => setSavedIndicator(false), 2000);
  }, []);

  const handleInputChange = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    showSavedIndicator();
  }, [showSavedIndicator]);

  const handleEditProfile = useCallback(() => {
    setIsEditingProfile(!isEditingProfile);
    if (isEditingProfile) {
      showSavedIndicator();
    }
  }, [isEditingProfile, showSavedIndicator]);

  const addCustomField = useCallback((section: keyof CustomFields) => {
    const newField = { label: '', value: '', id: Date.now() };
    setCustomFields(prev => ({
      ...prev,
      [section]: [...prev[section], newField]
    }));
  }, []);

  const updateCustomField = useCallback((section: keyof CustomFields, id: number, field: string, value: string) => {
    setCustomFields(prev => ({
      ...prev,
      [section]: prev[section].map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
    showSavedIndicator();
  }, [showSavedIndicator]);

  const removeCustomField = useCallback((section: keyof CustomFields, id: number) => {
    setCustomFields(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  }, []);

  const handleFileUpload = useCallback((field: string, files: FileList | null) => {
    if (files && files.length > 0) {
      const fileArray = Array.from(files).map(file => ({
        name: file.name,
        size: file.size,
        id: `${field}-${Date.now()}-${Math.random()}`
      }));
      
      setUploadedFiles(prev => ({
        ...prev,
        [field]: [...prev[field], ...fileArray]
      }));
      showSavedIndicator();
    }
  }, [showSavedIndicator]);

  const removeFile = useCallback((field: string, fileId: string) => {
    setUploadedFiles(prev => ({
      ...prev,
      [field]: prev[field].filter(file => file.id !== fileId)
    }));
  }, []);

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId);
    setIsDropdownOpen(false);
  }, []);

  // Memoized components to prevent unnecessary re-renders
  const TabButton = useMemo(() => React.memo<{
    id: string;
    label: string;
    isActive: boolean;
    onClick: (id: string) => void;
  }>(({ id, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-6 py-3 font-medium text-sm transition-all border-b-2 uppercase tracking-wide ${
        isActive 
          ? 'text-gold border-gold' 
          : 'text-gray-500 border-transparent hover:text-gray-700'
      }`}
    >
      {label}
    </button>
  )), []);

  const InputField = useMemo(() => React.memo<{
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    isTextArea?: boolean;
  }>(({ label, placeholder, value, onChange, isTextArea = false }) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
        {label}
      </label>
      {isTextArea ? (
        <textarea
          className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-gold/30 focus:border-gold/30 transition-all resize-none"
          rows={4}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type="text"
          className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-gold/30 focus:border-gold/30 transition-all"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  )), []);

  const FileUploadField = useMemo(() => React.memo<{
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    fieldKey: string;
  }>(({ label, placeholder, value, onChange, fieldKey }) => {
    const files = uploadedFiles[fieldKey] || [];

    return (
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
          {label}
        </label>
        <textarea
          className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-gold/30 focus:border-gold/30 transition-all resize-none mb-3"
          rows={4}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        
        {/* File Upload Area */}
        <div className="relative">
          <input
            type="file"
            multiple
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            onChange={(e) => handleFileUpload(fieldKey, e.target.files)}
            accept="*/*"
          />
          <div className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gold transition-colors cursor-pointer bg-gray-50">
            <div className="flex items-center space-x-2 text-gray-500">
              <Paperclip className="w-4 h-4" />
              <span className="text-sm font-medium">Attach File</span>
              <span className="text-sm text-gray-400 hidden sm:inline">or drag and drop</span>
            </div>
          </div>
        </div>

        {/* Uploaded Files Display as Chips */}
        {files.length > 0 && (
          <div className="mt-3">
            <div className="flex flex-wrap gap-2">
              {files.map((file) => (
                <div key={file.id} className="inline-flex items-center bg-ivory border border-gold/30 rounded-full px-3 py-1 text-sm">
                  <Paperclip className="w-3 h-3 text-gray-400 mr-2" />
                  <span className="text-gray-700 truncate max-w-xs">{file.name}</span>
                  <span className="text-xs text-gray-400 ml-1">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                  <button
                    onClick={() => removeFile(fieldKey, file.id)}
                    className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }), [uploadedFiles, handleFileUpload, removeFile]);

  const CustomFieldComponent = useMemo(() => React.memo<{
    section: keyof CustomFields;
    field: CustomField;
    onUpdate: (section: keyof CustomFields, id: number, field: string, value: string) => void;
    onRemove: (section: keyof CustomFields, id: number) => void;
  }>(({ section, field, onUpdate, onRemove }) => (
    <div className="mb-4 p-4 border rounded-lg bg-white">
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
        {/* Field label input */}
        <input
          type="text"
          placeholder="Field name..."
          className="w-full sm:w-auto text-black bg-white border rounded px-2 py-1 text-sm font-medium focus:border-gold/30 focus:ring-1 focus:ring-gold/30 outline-none"
          value={field.label}
          onChange={(e) => onUpdate(section, field.id, 'label', e.target.value)}
        />

        {/* Field value input */}
        <input
          type="text"
          placeholder="Enter value..."
          className="w-full sm:flex-1 text-black border rounded px-2 py-1 text-sm focus:border-gold/30 focus:ring-1 focus:ring-gold/30 outline-none"
          value={field.value}
          onChange={(e) => onUpdate(section, field.id, 'value', e.target.value)}
        />

        {/* Remove button */}
        <button
          onClick={() => onRemove(section, field.id)}
          className="self-end sm:self-center text-gray-400 hover:text-red-500 transition-colors p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )), []);

  const renderIdentityTab = () => (
    <div className="bg-ivory p-4 sm:p-6 rounded-lg space-y-3">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-black mb-2">Define Your Identity</h2>
        <p className="text-gray-700">Who you are and what matters to you.</p>
      </div>

      <InputField
        label="Role"
        placeholder="e.g., founder, student, designer"
        value={formData.role}
        onChange={(value) => handleInputChange('role', value)}
      />

      <InputField
        label="Goals"
        placeholder="Main objectives or aspirations"
        value={formData.goals}
        onChange={(value) => handleInputChange('goals', value)}
        isTextArea={true}
      />

      <InputField
        label="Values"
        placeholder="Principles or qualities that guide you"
        value={formData.values}
        onChange={(value) => handleInputChange('values', value)}
        isTextArea={true}
      />

      <InputField
        label="Skills / Strengths"
        placeholder="What best defines you"
        value={formData.skills}
        onChange={(value) => handleInputChange('skills', value)}
        isTextArea={true}
      />

      {customFields.identity.map(field => (
        <CustomFieldComponent 
          key={field.id} 
          section="identity" 
          field={field} 
          onUpdate={updateCustomField}
          onRemove={removeCustomField}
        />
      ))}

      <button
        onClick={() => addCustomField('identity')}
        className="flex items-center space-x-2 text-gray-700 hover:text-gold transition-colors"
      >
        <Plus className="w-4 h-4" />
        <span className="text-sm font-medium">Custom (add your own field)</span>
      </button>
    </div>
  );

  const renderPreferencesTab = () => (
    <div>
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Choose Your Preferences</h2>
        <p className="text-gray-500">How you like to work and learn.</p>
      </div>
      
      <InputField
        label="Preferred Output"
        placeholder="Concise, detailed, step-by-step, frameworks, tables..."
        value={formData.preferredOutput}
        onChange={(value) => handleInputChange('preferredOutput', value)}
        isTextArea={true}
      />
      
      <InputField
        label="Learning Style"
        placeholder="Visual, example-driven, story-based, hands-on..."
        value={formData.learningStyle}
        onChange={(value) => handleInputChange('learningStyle', value)}
        isTextArea={true}
      />
      
      <InputField
        label="Tone of Choice"
        placeholder="Formal, conversational, playful, authoritative..."
        value={formData.toneOfChoice}
        onChange={(value) => handleInputChange('toneOfChoice', value)}
        isTextArea={true}
      />
      
      <InputField
        label="Problem-Solving Style"
        placeholder="Structured, creative, experimental, first-principles..."
        value={formData.problemSolvingStyle}
        onChange={(value) => handleInputChange('problemSolvingStyle', value)}
        isTextArea={true}
      />

      {customFields.preferences.map(field => (
        <CustomFieldComponent 
          key={field.id} 
          section="preferences" 
          field={field} 
          onUpdate={updateCustomField}
          onRemove={removeCustomField}
        />
      ))}
      
      <button
        onClick={() => addCustomField('preferences')}
        className="flex items-center space-x-2 text-gray-600 hover:text-gold transition-colors"
      >
        <Plus className="w-4 h-4" />
        <span className="text-sm font-medium">Custom (add your own field)</span>
      </button>
    </div>
  );

  const renderReferencesTab = () => (
    <div>
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Add Your References</h2>
        <p className="text-gray-500">Upload or type material AICHEMIST can draw from.</p>
      </div>
      
      <FileUploadField
        label="Brand Voice"
        placeholder="Describe your brand tone/style or upload a file"
        value={formData.brandVoice}
        onChange={(value) => handleInputChange('brandVoice', value)}
        fieldKey="brandVoice"
      />
      
      <FileUploadField
        label="Work Examples"
        placeholder="Files or links to showcase your work"
        value={formData.workExamples}
        onChange={(value) => handleInputChange('workExamples', value)}
        fieldKey="workExamples"
      />
      
      <FileUploadField
        label="Favorite Influences"
        placeholder="Books, creators, or leaders shaping your style"
        value={formData.favoriteInfluences}
        onChange={(value) => handleInputChange('favoriteInfluences', value)}
        fieldKey="favoriteInfluences"
      />
      
      <FileUploadField
        label="Data"
        placeholder="Key facts, metrics, or data points to weave into responses"
        value={formData.data}
        onChange={(value) => handleInputChange('data', value)}
        fieldKey="data"
      />

      {customFields.references.map(field => (
        <CustomFieldComponent 
          key={field.id} 
          section="references" 
          field={field} 
          onUpdate={updateCustomField}
          onRemove={removeCustomField}
        />
      ))}
      
      <button
        onClick={() => addCustomField('references')}
        className="flex items-center space-x-2 text-gray-600 hover:text-gold transition-colors"
      >
        <Plus className="w-4 h-4" />
        <span className="text-sm font-medium">Custom (add your own field)</span>
      </button>
    </div>
  );

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      {/* Saved Indicator */}
      {savedIndicator && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center space-x-2">
          <Check className="w-4 h-4" />
          <span className="text-sm font-medium">Saved</span>
        </div>
      )}

      {/* Profile Header Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Profile Box */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
            {/* Mobile/Tablet Layout - Vertical Stack */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center justify-between sm:contents">
                <div className="relative">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gold rounded-full flex items-center justify-center shadow-lg">
                    <User className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-gold text-white text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full shadow-md flex items-center space-x-1">
                    <Crown className="w-2 h-2 sm:w-3 sm:h-3" />
                    <span className="text-xs">PRO</span>
                  </div>
                </div>
                
                {/* Edit button - positioned at top right on mobile */}
                <button 
                  onClick={handleEditProfile}
                  className="sm:hidden text-gray-400 hover:text-gold transition-colors p-2 rounded-lg hover:bg-gold/30"
                  title="Edit profile"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex-1">
                {isEditingProfile ? (
                  <>
                    <input
                      type="text"
                      placeholder="Your display name"
                      className="text-base sm:text-lg font-semibold text-gray-900 bg-gray-50 border border-gray-200 rounded px-3 py-2 w-full mb-2 focus:ring-2 focus:ring-gold/30 focus:border-gold/30 transition-all"
                      value={formData.displayName}
                      onChange={(e) => handleInputChange('displayName', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="One–two lines describing what you do"
                      className="text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded px-3 py-2 w-full focus:ring-2 focus:ring-gold/30 focus:border-gold/30 transition-all"
                      value={formData.shortBio}
                      onChange={(e) => handleInputChange('shortBio', e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <div className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                      {formData.displayName || 'Your display name'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formData.shortBio || 'One–two lines describing what you do'}
                    </div>
                  </>
                )}
              </div>
              
              {/* Desktop buttons */}
              <div className="hidden sm:flex items-center space-x-3">
                <button 
                  onClick={handleEditProfile}
                  className="text-gray-400 hover:text-gold transition-colors p-2 rounded-lg hover:bg-gold/30"
                  title="Edit profile"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="text-gold/30 hover:text-gold font-medium text-sm transition-colors whitespace-nowrap">
                  Manage Subscription
                </button>
              </div>
              
              {/* Mobile subscription button */}
              <button className="sm:hidden text-gold/30 hover:text-gold font-medium text-sm transition-colors text-left">
                Manage Subscription
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="max-w-4xl mx-auto">
          {/* Desktop Tabs - Hidden on mobile */}
          <div className="hidden md:flex text-gray space-x-8 border-b border-gray">
            <TabButton 
              id="identity" 
              label="Identity" 
              isActive={activeTab === 'identity'} 
              onClick={setActiveTab} 
            />
            <TabButton 
              id="preferences" 
              label="Preferences" 
              isActive={activeTab === 'preferences'} 
              onClick={setActiveTab} 
            />
            <TabButton 
              id="references" 
              label="References" 
              isActive={activeTab === 'references'} 
              onClick={setActiveTab} 
            />
          </div>

          {/* Mobile/Tablet Dropdown */}
          <div className="md:hidden relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-left flex items-center justify-between shadow-sm"
            >
              <span className="font-medium text-gray-900">
                {tabOptions.find(tab => tab.id === activeTab)?.label}
              </span>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {tabOptions.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`w-full text-left px-4 py-3 transition-colors ${
                      activeTab === tab.id
                        ? 'bg-gold/10 text-gold font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-ivory rounded-xl shadow-sm border border-gold/30 p-4 sm:p-6 lg:p-8">
            <div className="mb-6 text-sm text-gray-600">
              Use the fields below as inspiration, or add custom fields to include any profile data you want AICHEMIST to use.
            </div>
            
            {activeTab === 'identity' && renderIdentityTab()}
            {activeTab === 'preferences' && renderPreferencesTab()}
            {activeTab === 'references' && renderReferencesTab()}
          </div>
        </div>
      </div>

      {/* Bottom Menu */}
         <div className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            {/* Active Button */}
           <button className="flex items-center justify-between bg-white  text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
              Start Prompting
              <ChevronRight className="ml-2 w-4 h-4" />
            </button>

            {/* Other Buttons */}
            <button className="flex items-center justify-between bg-white  text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
              Access Prompt Library
              <ChevronRight className="ml-2 w-4 h-4" />
            </button>

            <button className="flex items-center justify-between bg-white  text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
              Continue Learning
              <ChevronRight className="ml-2 w-4 h-4" />
            </button>

            <button className="flex items-center justify-between bg-white  text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
              Manage Subscription
              <ChevronRight className="ml-2 w-4 h-4" />
            </button>

            <button className="flex items-center justify-between bg-white  text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
              Get Support
              <ChevronRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProfileSetup;