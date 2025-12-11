"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { User, Plus, X, Check, Edit2, ChevronRight } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";

// Types
interface ProfileData {
  role: string;
  // bio removed — use role instead
  profileurl?: string;
  email?: string;
  name?: string;
  authMethod?: string;
  // AI Response Preferences
  aiLikes: string[];
  aiDislikes: string[];
  customAILikes: string[];
  customAIDislikes: string[];
  // About Me
  aboutMe: string;
  myValues: string[];
  mySkills: string[];
  howIThink: string[];
  myInfluences: string[];
  // Dynamic sections
  brandVoices: { id: string; key: string; value: string }[];
  audiencePersona: { id: string; key: string; value: string }[];
  dataReferences: { id: string; key: string; value: string }[];
  workExamples: { id: string; key: string; value: string }[];
  miscellaneous: { id: string; key: string; value: string }[];
}

const DEFAULT_AI_LIKES = [
  "Step-by-Step",
  "Real Life Examples",
];

const DEFAULT_AI_DISLIKES = [
  "Em Dashes",
  "Separation Lines",
  "Pleasantries",
];

const ComprehensiveProfile: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [savedIndicator, setSavedIndicator] = useState(false);
  const [newLikeInput, setNewLikeInput] = useState("");
  const [newDislikeInput, setNewDislikeInput] = useState("");
  const [showLikeInput, setShowLikeInput] = useState(false);
  const [showDislikeInput, setShowDislikeInput] = useState(false);
  const [showMyAccountMenu, setShowMyAccountMenu] = useState(false);
  const myAccountRef = useRef<HTMLDivElement>(null);
  const [expandedEntries, setExpandedEntries] = useState<Record<string, boolean>>({});
  
  const {
    comprehensiveProfile,
    isLoadingComprehensive,
    fetchComprehensiveProfile,
    updateComprehensiveProfile,
  } = useProfile();
  
  const [profileData, setProfileData] = useState<ProfileData>({
    role: "",
    // role used instead of bio
    profileurl: "",
    email: "",
    name: "",
    authMethod: "",
    aiLikes: [],
    aiDislikes: [],
    customAILikes: [],
    customAIDislikes: [],
    aboutMe: "",
    myValues: [],
    mySkills: [],
    howIThink: [],
    myInfluences: [],
    brandVoices: [],
    audiencePersona: [],
    dataReferences: [],
    workExamples: [],
    miscellaneous: [],
  });

  const [imgError, setImgError] = useState(false);
  const [showProfileSettingsModal, setShowProfileSettingsModal] = useState(false);
  const [profileSettingsData, setProfileSettingsData] = useState({
    name: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [profileSettingsError, setProfileSettingsError] = useState("");
  const [profileSettingsSaving, setProfileSettingsSaving] = useState(false);

  // Fetch profile data on mount
  useEffect(() => {
    fetchComprehensiveProfile();
  }, [fetchComprehensiveProfile]);

  // Update local state when profile data is loaded
  useEffect(() => {
    if (comprehensiveProfile) {
      setProfileData(comprehensiveProfile);
    }
  }, [comprehensiveProfile]);

  // Close My Account menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (myAccountRef.current && !myAccountRef.current.contains(event.target as Node)) {
        setShowMyAccountMenu(false);
      }
    };

    if (showMyAccountMenu) {
      // Use 'click' so that React's click handlers (and native stopImmediatePropagation)
      // have a chance to run first and open the modal before this outside-click closes the menu.
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showMyAccountMenu]);

  const [charCounts, setCharCounts] = useState({
    role: 0,
    aboutMe: 0,
  });

  // State for About Me input fields
  const [aboutMeInputs, setAboutMeInputs] = useState({
    myValues: "",
    mySkills: "",
    howIThink: "",
    myInfluences: "",
  });

  useEffect(() => {
    setCharCounts({
      role: (profileData.role || '').length,
      aboutMe: profileData.aboutMe.length,
    });
  }, [profileData]);

  // Calculate profile completion percentage
  const calculateCompletion = useCallback(() => {
    let filledFields = 0;
    let totalFields = 0;

    // Bio (1 field)
    // Role (1 field)
    totalFields += 1;
    if (profileData.role && profileData.role.trim()) filledFields += 1;

    // AI Preferences (2 sections - count if at least one is selected)
    totalFields += 2;
    if (profileData.aiLikes.length > 0 || profileData.customAILikes.length > 0) filledFields += 1;
    if (profileData.aiDislikes.length > 0 || profileData.customAIDislikes.length > 0) filledFields += 1;

    // About Me (5 fields)
    totalFields += 5;
    if (profileData.myValues && profileData.myValues.length > 0) filledFields += 1;
    if (profileData.mySkills && profileData.mySkills.length > 0) filledFields += 1;
    if (profileData.howIThink && profileData.howIThink.length > 0) filledFields += 1;
    if (profileData.myInfluences && profileData.myInfluences.length > 0) filledFields += 1;
    if (profileData.aboutMe && profileData.aboutMe.trim()) filledFields += 1;

    // Dynamic sections (4 sections - count if at least one entry with content)
    totalFields += 4;
    if (profileData.brandVoices.some(v => v.key.trim() && v.value.trim())) filledFields += 1;
    if (profileData.dataReferences.some(v => v.key.trim() && v.value.trim())) filledFields += 1;
    if (profileData.workExamples.some(v => v.key.trim() && v.value.trim())) filledFields += 1;
    if (profileData.miscellaneous.some(v => v.key.trim() && v.value.trim())) filledFields += 1;

    return Math.round((filledFields / totalFields) * 100);
  }, [profileData]);

  const completionPercentage = calculateCompletion();

  const showSavedIndicator = useCallback(() => {
    setSavedIndicator(true);
    setTimeout(() => setSavedIndicator(false), 2000);
  }, []);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    if (value.length <= 1000) {
      setProfileData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleCheckboxToggle = (field: "aiLikes" | "aiDislikes", value: string) => {
    setProfileData((prev) => {
      const current = prev[field];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter((item) => item !== value) };
      } else {
        return { ...prev, [field]: [...current, value] };
      }
    });
  };

  const addCustomPreference = (field: "customAILikes" | "customAIDislikes") => {
    const inputValue = field === "customAILikes" ? newLikeInput : newDislikeInput;
    
    if (inputValue && inputValue.trim()) {
      setProfileData((prev) => ({
        ...prev,
        [field]: [...prev[field], inputValue.trim()],
      }));
      
      // Reset input and hide
      if (field === "customAILikes") {
        setNewLikeInput("");
        setShowLikeInput(false);
      } else {
        setNewDislikeInput("");
        setShowDislikeInput(false);
      }
    }
  };

  const removeCustomPreference = (field: "customAILikes" | "customAIDislikes", index: number) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const addDynamicField = (field: "brandVoices" | "audiencePersona" | "dataReferences" | "workExamples" | "miscellaneous") => {
    const newEntry = {
      id: Date.now().toString(),
      key: "",
      value: "",
    };
    setProfileData((prev) => ({
      ...prev,
      [field]: [...prev[field], newEntry],
    }));
  };

  const updateDynamicField = (
    field: "brandVoices" | "audiencePersona" | "dataReferences" | "workExamples" | "miscellaneous",
    id: string,
    key: "key" | "value",
    value: string
  ) => {
    if (value.length <= 1000) {
      setProfileData((prev) => ({
        ...prev,
        [field]: prev[field].map((item) =>
          item.id === id ? { ...item, [key]: value } : item
        ),
      }));
    }
  };

  const removeDynamicField = (
    field: "brandVoices" | "audiencePersona" | "dataReferences" | "workExamples" | "miscellaneous",
    id: string
  ) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: prev[field].filter((item) => item.id !== id),
    }));
  };

  const toggleEntry = (id: string) => {
    setExpandedEntries((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const addAboutMeTag = (field: "myValues" | "mySkills" | "howIThink" | "myInfluences") => {
    const value = aboutMeInputs[field].trim();
    if (value && !profileData[field].includes(value)) {
      setProfileData(prev => ({
        ...prev,
        [field]: [...prev[field], value]
      }));
      setAboutMeInputs(prev => ({ ...prev, [field]: "" }));
    }
  };

  const removeAboutMeTag = (field: "myValues" | "mySkills" | "howIThink" | "myInfluences", index: number) => {
    setProfileData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleAboutMeKeyPress = (e: React.KeyboardEvent, field: "myValues" | "mySkills" | "howIThink" | "myInfluences") => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addAboutMeTag(field);
    }
  };

  const handleSave = async () => {
    const success = await updateComprehensiveProfile(profileData);
    if (success) {
      showSavedIndicator();
      setIsEditMode(false);
    }
  };

  const handleOpenProfileSettings = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
      // Also stop other native listeners (like the document 'click' handler) from running.
      if ((e as any).nativeEvent && typeof (e as any).nativeEvent.stopImmediatePropagation === 'function') {
        (e as any).nativeEvent.stopImmediatePropagation();
      }
    }

    // Open modal first then close the menu to avoid race conditions
    setProfileSettingsData({
      name: profileData.name || "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setProfileSettingsError("");
    setShowProfileSettingsModal(true);
    setShowMyAccountMenu(false);
  };

  const handleSaveProfileSettings = async () => {
    setProfileSettingsError("");
    
    // Validate name
    if (!profileSettingsData.name.trim()) {
      setProfileSettingsError("Name is required");
      return;
    }

    // Validate password if authMethod is self and password fields are filled
    if (profileData.authMethod === 'self' && profileSettingsData.newPassword) {
      if (!profileSettingsData.oldPassword) {
        setProfileSettingsError("Please enter your current password");
        return;
      }
      if (profileSettingsData.newPassword.length < 6) {
        setProfileSettingsError("New password must be at least 6 characters");
        return;
      }
      if (profileSettingsData.newPassword !== profileSettingsData.confirmPassword) {
        setProfileSettingsError("New passwords do not match");
        return;
      }
    }

    setProfileSettingsSaving(true);

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!token) {
        setProfileSettingsError('No authentication token found');
        setProfileSettingsSaving(false);
        return;
      }

      const body: any = {
        name: profileSettingsData.name.trim(),
      };

      // Only include password if authMethod is self and new password is provided
      if (profileData.authMethod === 'self' && profileSettingsData.newPassword) {
        body.oldPassword = profileSettingsData.oldPassword;
        body.newPassword = profileSettingsData.newPassword;
      }

      const response = await fetch('/api/profile/update-profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        setProfileSettingsError(data.error || 'Failed to update profile');
        setProfileSettingsSaving(false);
        return;
      }

      // Update local state with new name
      setProfileData(prev => ({ ...prev, name: profileSettingsData.name }));
      
      // Close modal and show success
      setShowProfileSettingsModal(false);
      showSavedIndicator();
      
      // Refetch comprehensive profile to get updated data
      fetchComprehensiveProfile();
    } catch (error: any) {
      setProfileSettingsError(error.message || 'Failed to update profile');
    } finally {
      setProfileSettingsSaving(false);
    }
  };

  const CharCounter: React.FC<{ current: number; max: number }> = ({ current, max }) => (
    <span className={`text-[10px] ${current > max ? "text-red-500" : "text-gray-400"}`}>
      {current}/{max}
    </span>
  );

  return (
    <div className="max-w-4xl mx-auto font-inter px-4 sm:px-6 py-8">
      {/* Saved Indicator */}
      {savedIndicator && (
        <div className="fixed top-4 right-4 bg-black text-white px-4 py-2 rounded shadow-lg z-50 flex items-center space-x-2">
          <Check className="w-4 h-4" />
          <span className="text-sm font-medium">Saved</span>
        </div>
      )}

      {/* Header Section */}
          <div className="relative bg-[#f5f1e8] border border-gray-300 rounded-sm mb-6 p-6">
        <div className="flex justify-between items-start gap-6">
          {/* Left: User Avatar with Circular Progress */}
          <div className="flex gap-4 flex-1">
            {/* User Avatar with circular progress */}
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <div className="relative w-16 h-16">
                {/* Circular progress ring */}
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="2"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeDasharray={`${completionPercentage} ${100 - completionPercentage}`}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                </svg>
                {/* Avatar in center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white flex items-center justify-center">
                    {profileData.profileurl && !imgError ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={profileData.profileurl}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                        onError={() => setImgError(true)}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Profile completion percentage */}
              <span className="text-[10px] font-bold text-gray-700">{completionPercentage}% Complete</span>
            </div>

            {/* Bio Section */}
            <div className="flex-1 relative">
              <div className="flex items-start justify-between mb-2">
                <span className="text-[11px] text-gray-600 font-semibold">{profileData.name ? `${profileData.name}` : '@aichemist_app'}</span>
                <div className="flex items-center gap-2" ref={myAccountRef}>
                  <button
                    type="button"
                    onClick={() => setShowMyAccountMenu(!showMyAccountMenu)}
                    className="px-4 py-1.5 border border-gray-800 bg-white text-[11px] font-bold uppercase tracking-wide hover:bg-gray-100 transition-colors rounded-sm"
                  >
                    My Account
                  </button>

                  {isEditMode ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="px-4 py-1.5 bg-black text-white text-[11px] font-bold uppercase rounded-sm hover:bg-gray-800 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditMode(false)}
                        className="px-4 py-1.5 border border-gray-300 text-[11px] font-bold uppercase rounded-sm hover:bg-gray-100 transition"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditMode(true)}
                      className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 text-[11px] font-bold uppercase rounded-sm hover:bg-gray-100 transition"
                    >
                      <Edit2 className="w-3 h-3" />
                      Edit
                    </button>
                  )}
                </div>
              </div>

              <label className="block text-[11px] text-gray-700 mb-2">
                Describe your role and what you do best:
              </label>

              {isEditMode ? (
                <div className="relative">
                  <div className="relative">
                    <input
                      type="text"
                      value={profileData.role}
                      onChange={(e) => handleInputChange("role", e.target.value)}
                      placeholder="Your role (e.g. Product Designer, Data Scientist)"
                      maxLength={200}
                      className="w-full border border-gray-300 bg-white text-[13px] rounded px-3 py-2 focus:outline-none focus:border-black placeholder-gray-400"
                    />
                    <div className="absolute bottom-2 right-2">
                      <CharCounter current={charCounts.role} max={200} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full border border-gray-300 bg-white text-[13px] rounded px-3 py-2 min-h-[100px]">
                  {profileData.role ? (
                    <span className="text-gray-800">{profileData.role}</span>
                  ) : (
                    <span className="text-gray-400">No role added yet</span>
                  )}
                </div>
              )}

              {/* My Account Dropdown */}
              {showMyAccountMenu && (
                <div className="absolute right-0 top-8 w-64 bg-white border border-gray-300 rounded-sm shadow-lg z-[60]">
                  <div className="py-1">
                  <button 
                    type="button"
                    onClick={(e) => handleOpenProfileSettings(e)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-200"
                  >
                  <div className="flex items-start gap-3">
                    <div className="text-lg">👤</div>
                    <div>
                      <div className="text-[12px] font-bold text-gray-900">Profile Settings</div>
                      <div className="text-[10px] text-gray-600 mt-0.5">
                        Edit your name{profileData.authMethod === 'self' ? ' and password' : ''}.
                      </div>
                    </div>
                  </div>
                </button>
                <button type="button" className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="text-lg">💳</div>
                    <div>
                      <div className="text-[12px] font-bold text-gray-900">Subscription & Billing</div>
                      <div className="text-[10px] text-gray-600 mt-0.5">
                        View your plan, manage payments, or upgrade.
                      </div>
                    </div>
                  </div>
                  </button>
                </div>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>

      {/* spacer */}
      <div className="mb-6" />

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {/* AI Response Preferences */}
          <div className="bg-[#f5f1e8] border border-gray-300 rounded-sm p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-black rounded-sm flex items-center justify-center">
                <span className="text-white text-xs">💬</span>
              </div>
              <h3 className="text-[13px] font-bold">What I Like In an AI Response:</h3>
            </div>

            <div className="space-y-2 mb-3">
              {DEFAULT_AI_LIKES.map((item) => (
                <label key={item} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profileData.aiLikes.includes(item)}
                    onChange={() => handleCheckboxToggle("aiLikes", item)}
                    disabled={!isEditMode}
                    className="w-4 h-4"
                  />
                  <span className="text-[12px]">{item}</span>
                </label>
              ))}
              
              {profileData.customAILikes.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked
                    disabled={!isEditMode}
                    className="w-4 h-4"
                  />
                  <span className="text-[12px]">{item}</span>
                  {isEditMode && (
                    <button
                      onClick={() => removeCustomPreference("customAILikes", index)}
                      className="ml-auto"
                    >
                      <X className="w-3 h-3 text-gray-600" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {isEditMode && (
              <>
                {showLikeInput ? (
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={newLikeInput}
                      onChange={(e) => setNewLikeInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addCustomPreference("customAILikes");
                        }
                      }}
                      placeholder="Type preference and press Enter..."
                      autoFocus
                      className="flex-1 border border-gray-300 bg-white text-[11px] rounded-sm px-3 py-1.5 focus:outline-none focus:border-black placeholder-gray-400"
                    />
                    <button
                      onClick={() => addCustomPreference("customAILikes")}
                      className="px-3 py-1.5 bg-black text-white text-[10px] font-bold uppercase rounded-sm hover:bg-gray-800"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        setShowLikeInput(false);
                        setNewLikeInput("");
                      }}
                      className="px-3 py-1.5 border border-gray-300 text-[10px] font-bold uppercase rounded-sm hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowLikeInput(true)}
                    className="flex items-center gap-1 text-[11px] font-bold uppercase text-gray-700 hover:text-black transition"
                  >
                    <Plus className="w-3 h-3" />
                    Add Preference
                  </button>
                )}
              </>
            )}

            <div className="mt-4 pt-4 border-t border-gray-300">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-black rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs">💬</span>
                </div>
                <h3 className="text-[13px] font-bold">What I Do Not Like:</h3>
              </div>

              <div className="space-y-2 mb-3">
                {DEFAULT_AI_DISLIKES.map((item) => (
                  <label key={item} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profileData.aiDislikes.includes(item)}
                      onChange={() => handleCheckboxToggle("aiDislikes", item)}
                      disabled={!isEditMode}
                      className="w-4 h-4"
                    />
                    <span className="text-[12px]">{item}</span>
                  </label>
                ))}
                
                {profileData.customAIDislikes.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked
                      disabled={!isEditMode}
                      className="w-4 h-4"
                    />
                    <span className="text-[12px]">{item}</span>
                    {isEditMode && (
                      <button
                        onClick={() => removeCustomPreference("customAIDislikes", index)}
                        className="ml-auto"
                      >
                        <X className="w-3 h-3 text-gray-600" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {isEditMode && (
                <>
                  {showDislikeInput ? (
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={newDislikeInput}
                        onChange={(e) => setNewDislikeInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addCustomPreference("customAIDislikes");
                          }
                        }}
                        placeholder="Type what to avoid and press Enter..."
                        autoFocus
                        className="flex-1 border border-gray-300 bg-white text-[11px] rounded-sm px-3 py-1.5 focus:outline-none focus:border-black placeholder-gray-400"
                      />
                      <button
                        onClick={() => addCustomPreference("customAIDislikes")}
                        className="px-3 py-1.5 bg-black text-white text-[10px] font-bold uppercase rounded-sm hover:bg-gray-800"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => {
                          setShowDislikeInput(false);
                          setNewDislikeInput("");
                        }}
                        className="px-3 py-1.5 border border-gray-300 text-[10px] font-bold uppercase rounded-sm hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowDislikeInput(true)}
                      className="flex items-center gap-1 text-[11px] font-bold uppercase text-gray-700 hover:text-black transition"
                    >
                      <Plus className="w-3 h-3" />
                      Add Preference
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Data */}
          <div className="bg-[#f5f1e8] border border-gray-300 rounded-sm p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-black rounded-sm flex items-center justify-center">
                <span className="text-white text-xs">📊</span>
              </div>
              <h3 className="text-[13px] font-bold">Data</h3>
            </div>

            <p className="text-[11px] text-gray-600 mb-4">
              Copy & paste data for the model to reference:
            </p>

            {profileData.dataReferences.map((entry, index) => (
              <div key={entry.id} className="mb-3 border border-gray-200 rounded-sm overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleEntry(entry.id)}
                  className="w-full flex items-center justify-between px-3 py-2 bg-white"
                >
                    <div className="flex items-center gap-2">
                      <ChevronRight className={`w-4 h-4 transform transition-transform ${expandedEntries[entry.id] ? 'rotate-90' : ''}`} />
                      <span className="text-sm font-medium">{entry.key || `Data Set ${index + 1}`}</span>
                    </div>
                </button>

                {expandedEntries[entry.id] && (
                  <div className="p-3 bg-white">
                    <div className="relative mb-2">
                      <input
                        type="text"
                        value={entry.key}
                        onChange={(e) => updateDynamicField("dataReferences", entry.id, "key", e.target.value)}
                        placeholder={`Data Set ${index + 1} Name`}
                        disabled={!isEditMode}
                        maxLength={100}
                        className="w-full border border-gray-300 bg-white text-[11px] font-bold px-3 py-2 focus:outline-none focus:border-black placeholder-gray-400 disabled:bg-gray-50"
                      />
                    </div>
                    <div className="relative">
                      <textarea
                        value={entry.value}
                        onChange={(e) => updateDynamicField("dataReferences", entry.id, "value", e.target.value)}
                        placeholder="This is example text from the work example that will populate when the user clicks the dropdown."
                        disabled={!isEditMode}
                        maxLength={1000}
                        rows={3}
                        className="w-full border border-gray-300 bg-white text-[11px] rounded-sm px-3 py-2 resize-none focus:outline-none focus:border-black placeholder-gray-400 disabled:bg-gray-50"
                      />
                      <div className="absolute bottom-2 right-2">
                        <CharCounter current={entry.value.length} max={1000} />
                      </div>
                    </div>
                    {isEditMode && (
                      <div className="mt-2 flex items-center justify-between">
                        <button
                          onClick={() => removeDynamicField("dataReferences", entry.id)}
                          className="text-[10px] text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {isEditMode && (
              <button
                onClick={() => addDynamicField("dataReferences")}
                className="flex items-center gap-1 px-3 py-1.5 border border-gray-800 bg-white text-[11px] font-bold uppercase rounded-sm hover:bg-gray-100 transition w-full justify-center"
              >
                <Plus className="w-3 h-3" />
                Add Data
              </button>
            )}
          </div>

          {/* Miscellaneous */}
          <div className="bg-[#f5f1e8] border border-gray-300 rounded-sm p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-black rounded-sm flex items-center justify-center">
                <span className="text-white text-xs">📝</span>
              </div>
              <h3 className="text-[13px] font-bold">Idea Bank</h3>
            </div>

            <p className="text-[11px] text-gray-600 mb-4">
              Add any other references you may use in your prompts:
            </p>

            {profileData.miscellaneous.map((entry, index) => (
              <div key={entry.id} className="mb-3 border border-gray-200 rounded-sm overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleEntry(entry.id)}
                  className="w-full flex items-center justify-between px-3 py-2 bg-white"
                >
                  <div className="flex items-center gap-2">
                    <ChevronRight className={`w-4 h-4 transform transition-transform ${expandedEntries[entry.id] ? 'rotate-90' : ''}`} />
                    <span className="text-sm font-medium">{entry.key || `Example ${index + 1}`}</span>
                  </div>
                </button>

                {expandedEntries[entry.id] && (
                  <div className="p-3 bg-white">
                    <div className="relative mb-2">
                      <input
                        type="text"
                        value={entry.key}
                        onChange={(e) => updateDynamicField("miscellaneous", entry.id, "key", e.target.value)}
                        placeholder={`Example ${index + 1} Name`}
                        disabled={!isEditMode}
                        maxLength={100}
                        className="w-full border border-gray-300 bg-white text-[11px] font-bold px-3 py-2 focus:outline-none focus:border-black placeholder-gray-400 disabled:bg-gray-50"
                      />
                    </div>
                    <div className="relative">
                      <textarea
                        value={entry.value}
                        onChange={(e) => updateDynamicField("miscellaneous", entry.id, "value", e.target.value)}
                        placeholder="This is example text from the work example that will populate when the user clicks the dropdown."
                        disabled={!isEditMode}
                        maxLength={1000}
                        rows={3}
                        className="w-full border border-gray-300 bg-white text-[11px] rounded-sm px-3 py-2 resize-none focus:outline-none focus:border-black placeholder-gray-400 disabled:bg-gray-50"
                      />
                      <div className="absolute bottom-2 right-2">
                        <CharCounter current={entry.value.length} max={1000} />
                      </div>
                    </div>
                    {isEditMode && (
                      <div className="mt-2 flex items-center justify-between">
                        <button
                          onClick={() => removeDynamicField("miscellaneous", entry.id)}
                          className="text-[10px] text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {isEditMode && (
              <button
                onClick={() => addDynamicField("miscellaneous")}
                className="flex items-center gap-1 px-3 py-1.5 border border-gray-800 bg-white text-[11px] font-bold uppercase rounded-sm hover:bg-gray-100 transition w-full justify-center"
              >
                <Plus className="w-3 h-3" />
                Add Example
              </button>
            )}
          </div>

            {/* Audience Persona */}
          <div className="bg-[#f5f1e8] border border-gray-300 rounded-sm p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-black rounded-sm flex items-center justify-center">
                <span className="text-white text-xs">👥</span>
              </div>
              <h3 className="text-[13px] font-bold">Audience Persona</h3>
            </div>

            <p className="text-[11px] text-gray-600 mb-4">
              Define your target audience to tailor responses effectively:
            </p>

            {profileData.audiencePersona.map((entry, index) => (
              <div key={entry.id} className="mb-3 border border-gray-200 rounded-sm overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleEntry(entry.id)}
                  className="w-full flex items-center justify-between px-3 py-2 bg-white"
                >
                  <div className="flex items-center gap-2">
                    <ChevronRight className={`w-4 h-4 transform transition-transform ${expandedEntries[entry.id] ? 'rotate-90' : ''}`} />
                    <span className="text-sm font-medium">{entry.key || `Audience Persona ${index + 1}`}</span>
                  </div>
                </button>

                {expandedEntries[entry.id] && (
                  <div className="p-3 bg-white">
                    <div className="relative mb-2">
                      <input
                        type="text"
                        value={entry.key}
                        onChange={(e) => updateDynamicField("audiencePersona", entry.id, "key", e.target.value)}
                        placeholder={`Audience Persona ${index + 1}`}
                        disabled={!isEditMode}
                        maxLength={100}
                        className="w-full border border-gray-300 bg-white text-[11px] font-bold px-3 py-2 focus:outline-none focus:border-black placeholder-gray-400 disabled:bg-gray-50"
                      />
                    </div>
                    <div className="relative">
                      <textarea
                        value={entry.value}
                        onChange={(e) => updateDynamicField("audiencePersona", entry.id, "value", e.target.value)}
                        placeholder="Describe the audience persona characteristics and preferences."
                        disabled={!isEditMode}
                        maxLength={1000}
                        rows={3}
                        className="w-full border border-gray-300 bg-white text-[11px] rounded-sm px-3 py-2 resize-none focus:outline-none focus:border-black placeholder-gray-400 disabled:bg-gray-50"
                      />
                      <div className="absolute bottom-2 right-2">
                        <CharCounter current={entry.value.length} max={1000} />
                      </div>
                    </div>
                    {isEditMode && (
                      <div className="mt-2 flex items-center justify-between">
                        <button
                          onClick={() => removeDynamicField("audiencePersona", entry.id)}
                          className="text-[10px] text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {isEditMode && (
              <button
                onClick={() => addDynamicField("audiencePersona")}
                className="flex items-center gap-1 px-3 py-1.5 border border-gray-800 bg-white text-[11px] font-bold uppercase rounded-sm hover:bg-gray-100 transition w-full justify-center"
              >
                <Plus className="w-3 h-3" />
                Add Audience Persona
              </button>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* About Me */}
          <div className="bg-[#f5f1e8] border border-gray-300 rounded-sm p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-black rounded-sm flex items-center justify-center">
                <span className="text-white text-xs">👤</span>
              </div>
              <h3 className="text-[13px] font-bold">About Me</h3>
            </div>

            <p className="text-[11px] text-gray-600 mb-4">
              Add a field for each unique value, skill, idea, and influence you may want to reference:
            </p>

            {/* My Values */}
            <div className="mb-3">
              <label className="block text-[11px] font-bold uppercase text-gray-700 mb-1">
                My Values:
              </label>
              
              {/* Display tags (view mode card) */}
              {profileData.myValues.length > 0 && (
                <div className="mb-2">
                  <div className="bg-white border border-gray-200 px-2 py-1.5">
                    <div className="flex flex-wrap gap-2">
                      {profileData.myValues.map((value, index) => (
                        <span key={index} className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 text-[11px] px-2 py-1">
                          {value}
                          {isEditMode && (
                            <button
                              onClick={() => removeAboutMeTag("myValues", index)}
                              className="hover:text-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Input field in edit mode */}
              {isEditMode && (
                <div className="relative flex gap-2">
                  <input
                    type="text"
                    value={aboutMeInputs.myValues}
                    onChange={(e) => setAboutMeInputs(prev => ({ ...prev, myValues: e.target.value }))}
                    onKeyPress={(e) => handleAboutMeKeyPress(e, "myValues")}
                    placeholder="Type a value and press Enter..."
                    className="flex-1 border border-gray-300 bg-white text-[11px] rounded-sm px-2 py-1.5 focus:outline-none focus:border-black placeholder-gray-400"
                  />
                  <button
                    onClick={() => addAboutMeTag("myValues")}
                    className="px-3 py-2 bg-black text-white hover:bg-gray-800"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* My Skills */}
            <div className="mb-3">
              <label className="block text-[11px] font-bold uppercase text-gray-700 mb-1">
                My Skills:
              </label>
              
              {/* Display tags (view mode card) */}
              {profileData.mySkills.length > 0 && (
                <div className="mb-2">
                  <div className="bg-white border border-gray-200 px-2 py-1.5">
                    <div className="flex flex-wrap gap-2">
                      {profileData.mySkills.map((skill, index) => (
                        <span key={index} className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 text-[11px] px-2 py-1">
                          {skill}
                          {isEditMode && (
                            <button
                              onClick={() => removeAboutMeTag("mySkills", index)}
                              className="hover:text-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Input field in edit mode */}
              {isEditMode && (
                <div className="relative flex gap-2">
                  <input
                    type="text"
                    value={aboutMeInputs.mySkills}
                    onChange={(e) => setAboutMeInputs(prev => ({ ...prev, mySkills: e.target.value }))}
                    onKeyPress={(e) => handleAboutMeKeyPress(e, "mySkills")}
                    placeholder="Type a skill and press Enter..."
                    className="flex-1 border border-gray-300 bg-white text-[11px] rounded-sm px-2 py-1.5 focus:outline-none focus:border-black placeholder-gray-400"
                  />
                  <button
                    onClick={() => addAboutMeTag("mySkills")}
                    className="px-3 py-2 bg-black text-white hover:bg-gray-800"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* How I Think */}
            <div className="mb-3">
              <label className="block text-[11px] font-bold uppercase text-gray-700 mb-1">
                How I Think:
              </label>
              
              {/* Display tags (view mode card) */}
              {profileData.howIThink.length > 0 && (
                <div className="mb-2">
                  <div className="bg-white border border-gray-200 px-2 py-1.5">
                    <div className="flex flex-wrap gap-2">
                      {profileData.howIThink.map((thought, index) => (
                        <span key={index} className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 text-[11px] px-2 py-1">
                          {thought}
                          {isEditMode && (
                            <button
                              onClick={() => removeAboutMeTag("howIThink", index)}
                              className="hover:text-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Input field in edit mode */}
              {isEditMode && (
                <div className="relative flex gap-2">
                  <input
                    type="text"
                    value={aboutMeInputs.howIThink}
                    onChange={(e) => setAboutMeInputs(prev => ({ ...prev, howIThink: e.target.value }))}
                    onKeyPress={(e) => handleAboutMeKeyPress(e, "howIThink")}
                    placeholder="Type how you think and press Enter..."
                    className="flex-1 border border-gray-300 bg-white text-[11px] rounded-sm px-2 py-1.5 focus:outline-none focus:border-black placeholder-gray-400"
                  />
                  <button
                    onClick={() => addAboutMeTag("howIThink")}
                    className="px-3 py-2 bg-black text-white hover:bg-gray-800"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* My Influences */}
            <div className="mb-3">
              <label className="block text-[11px] font-bold uppercase text-gray-700 mb-1">
                My Influences:
              </label>
              
              {/* Display tags (view mode card) */}
              {profileData.myInfluences.length > 0 && (
                <div className="mb-2">
                  <div className="bg-white border border-gray-200 px-2 py-1.5">
                    <div className="flex flex-wrap gap-2">
                      {profileData.myInfluences.map((influence, index) => (
                        <span key={index} className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 text-[11px] px-2 py-1">
                          {influence}
                          {isEditMode && (
                            <button
                              onClick={() => removeAboutMeTag("myInfluences", index)}
                              className="hover:text-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Input field in edit mode */}
              {isEditMode && (
                <div className="relative flex gap-2">
                  <input
                    type="text"
                    value={aboutMeInputs.myInfluences}
                    onChange={(e) => setAboutMeInputs(prev => ({ ...prev, myInfluences: e.target.value }))}
                    onKeyPress={(e) => handleAboutMeKeyPress(e, "myInfluences")}
                    placeholder="Type an influence and press Enter..."
                    className="flex-1 border border-gray-300 bg-white text-[11px] rounded-sm px-2 py-1.5 focus:outline-none focus:border-black placeholder-gray-400"
                  />
                  <button
                    onClick={() => addAboutMeTag("myInfluences")}
                    className="px-3 py-2 bg-black text-white hover:bg-gray-800"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Brand Voice */}
          <div className="bg-[#f5f1e8] border border-gray-300 rounded-sm p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-black rounded-sm flex items-center justify-center">
                <span className="text-white text-xs">🎨</span>
              </div>
              <h3 className="text-[13px] font-bold">Brand Voice</h3>
            </div>

            <p className="text-[11px] text-gray-600 mb-4">
              Add a brand voice so your content aligns with your vision:
            </p>

            {profileData.brandVoices.map((entry, index) => (
              <div key={entry.id} className="mb-3 border border-gray-200 rounded-sm overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleEntry(entry.id)}
                  className="w-full flex items-center justify-between px-3 py-2 bg-white"
                >
                  <div className="flex items-center gap-2">
                    <ChevronRight className={`w-4 h-4 transform transition-transform ${expandedEntries[entry.id] ? 'rotate-90' : ''}`} />
                    <span className="text-sm font-medium">{entry.key || `Brand Voice ${index + 1}`}</span>
                  </div>
                </button>

                {expandedEntries[entry.id] && (
                  <div className="p-3 bg-white">
                    <div className="relative mb-2">
                      <input
                        type="text"
                        value={entry.key}
                        onChange={(e) => updateDynamicField("brandVoices", entry.id, "key", e.target.value)}
                        placeholder={`Brand Voice ${index + 1}`}
                        disabled={!isEditMode}
                        maxLength={100}
                        className="w-full border border-gray-300 bg-white text-[11px] font-bold px-3 py-2 focus:outline-none focus:border-black placeholder-gray-400 disabled:bg-gray-50"
                      />
                    </div>
                    <div className="relative">
                      <textarea
                        value={entry.value}
                        onChange={(e) => updateDynamicField("brandVoices", entry.id, "value", e.target.value)}
                        placeholder="This is example text from the brand voice that will populate when the user clicks the dropdown."
                        disabled={!isEditMode}
                        maxLength={1000}
                        rows={3}
                        className="w-full border border-gray-300 bg-white text-[11px] rounded-sm px-3 py-2 resize-none focus:outline-none focus:border-black placeholder-gray-400 disabled:bg-gray-50"
                      />
                      <div className="absolute bottom-2 right-2">
                        <CharCounter current={entry.value.length} max={1000} />
                      </div>
                    </div>
                    {isEditMode && (
                      <div className="mt-2 flex items-center justify-between">
                        <button
                          onClick={() => removeDynamicField("brandVoices", entry.id)}
                          className="text-[10px] text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {isEditMode && (
              <button
                onClick={() => addDynamicField("brandVoices")}
                className="flex items-center gap-1 px-3 py-1.5 border border-gray-800 bg-white text-[11px] font-bold uppercase rounded-sm hover:bg-gray-100 transition w-full justify-center"
              >
                <Plus className="w-3 h-3" />
                Add Brand Voice
              </button>
            )}
          </div>

          {/* Work Examples */}
          <div className="bg-[#f5f1e8] border border-gray-300 rounded-sm p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-black rounded-sm flex items-center justify-center">
                <span className="text-white text-xs">💼</span>
              </div>
              <h3 className="text-[13px] font-bold">Work Examples</h3>
            </div>

            <p className="text-[11px] text-gray-600 mb-4">
              Copy & paste examples of your previous work for the model to reference:
            </p>

            {profileData.workExamples.map((entry, index) => (
              <div key={entry.id} className="mb-3 border border-gray-200 rounded-sm overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleEntry(entry.id)}
                  className="w-full flex items-center justify-between px-3 py-2 bg-white"
                >
                  <div className="flex items-center gap-2">
                    <ChevronRight className={`w-4 h-4 transform transition-transform ${expandedEntries[entry.id] ? 'rotate-90' : ''}`} />
                    <span className="text-sm font-medium">{entry.key || `Work Example ${index + 1}`}</span>
                  </div>
                </button>

                {expandedEntries[entry.id] && (
                  <div className="p-3 bg-white">
                    <div className="relative mb-2">
                      <input
                        type="text"
                        value={entry.key}
                        onChange={(e) => updateDynamicField("workExamples", entry.id, "key", e.target.value)}
                        placeholder={`Work Example ${index + 1} Name`}
                        disabled={!isEditMode}
                        maxLength={100}
                        className="w-full border border-gray-300 bg-white text-[11px] font-bold px-3 py-2 focus:outline-none focus:border-black placeholder-gray-400 disabled:bg-gray-50"
                      />
                    </div>
                    <div className="relative">
                      <textarea
                        value={entry.value}
                        onChange={(e) => updateDynamicField("workExamples", entry.id, "value", e.target.value)}
                        placeholder="This is example text from the work example that will populate when the user clicks the dropdown."
                        disabled={!isEditMode}
                        maxLength={1000}
                        rows={3}
                        className="w-full border border-gray-300 bg-white text-[11px] rounded-sm px-3 py-2 resize-none focus:outline-none focus:border-black placeholder-gray-400 disabled:bg-gray-50"
                      />
                      <div className="absolute bottom-2 right-2">
                        <CharCounter current={entry.value.length} max={1000} />
                      </div>
                    </div>
                    {isEditMode && (
                      <div className="mt-2 flex items-center justify-between">
                        <button
                          onClick={() => removeDynamicField("workExamples", entry.id)}
                          className="text-[10px] text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {isEditMode && (
              <button
                onClick={() => addDynamicField("workExamples")}
                className="flex items-center gap-1 px-3 py-1.5 border border-gray-800 bg-white text-[11px] font-bold uppercase rounded-sm hover:bg-gray-100 transition w-full justify-center"
              >
                <Plus className="w-3 h-3" />
                Add Work
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Profile Settings Modal */}
      {showProfileSettingsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[110] p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Profile Settings</h2>
              <button
                onClick={() => setShowProfileSettingsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {profileSettingsError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                {profileSettingsError}
              </div>
            )}

            <div className="space-y-4">
              {/* Email (read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={profileData.email || ''}
                  readOnly
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm bg-gray-50 text-gray-700"
                />
              </div>
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={profileSettingsData.name}
                  onChange={(e) => setProfileSettingsData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-black"
                  placeholder="Enter your name"
                />
              </div>

              {/* Password Fields - Only for self auth */}
              {profileData.authMethod === 'self' && (
                <>
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-sm font-bold text-gray-900 mb-3">Change Password (Optional)</h3>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={profileSettingsData.oldPassword}
                      onChange={(e) => setProfileSettingsData(prev => ({ ...prev, oldPassword: e.target.value }))}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-black"
                      placeholder="Enter current password"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={profileSettingsData.newPassword}
                      onChange={(e) => setProfileSettingsData(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-black"
                      placeholder="Enter new password (min 6 characters)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={profileSettingsData.confirmPassword}
                      onChange={(e) => setProfileSettingsData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-black"
                      placeholder="Confirm new password"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowProfileSettingsModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-sm font-medium rounded hover:bg-gray-50 transition"
                disabled={profileSettingsSaving}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfileSettings}
                className="flex-1 px-4 py-2 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 transition disabled:opacity-50"
                disabled={profileSettingsSaving}
              >
                {profileSettingsSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComprehensiveProfile;
