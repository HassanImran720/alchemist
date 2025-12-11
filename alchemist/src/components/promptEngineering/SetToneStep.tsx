"use client";
import { X, ChevronDown, Building } from "lucide-react";
import React, { useState, useCallback, useEffect } from "react";
import { useProfile } from '@/context/ProfileContext';
import { usePromptEng } from '@/context/PromptEngContext';

interface SetToneStepProps {
  toneData: string[];
  setToneData: (tone: string[]) => void;
}

const TONE_CATEGORIES = {
  Core: [
    "Persuasive",
    "Confident", 
    "Direct",
    "Urgent",
    "Authoritative",
    "Assertive",
    "Empathetic",
    "Consultative",
    "Friendly",
    "Professional"
  ],
  "Trust-Building": [
    "Honest",
    "Transparent",
    "Reassuring",
    "Credible",
    "Sincere",
    "Warm",
    "Supportive",
    "Educational",
    "Respectful",
    "Ethical"
  ],
  "Emotional/Motivational": [
    "Inspirational",
    "Aspirational",
    "Encouraging",
    "Empowering",
    "Passionate",
    "Excited",
    "Hopeful",
    "Optimistic",
    "Relatable",
    "Uplifting"
  ],
  "High Energy/Attention": [
    "Bold",
    "Energetic",
    "Enthusiastic",
    "Playful",
    "Humorous",
    "Provocative",
    "Edgy",
    "Fearless",
    "Challenging",
    "Motivational"
  ],
  "Conversational": [
    "Casual",
    "Witty",
    "Down-to-Earth",
    "Curious",
    "Story-Driven",
    "Approachable",
    "Real-Talk",
    "Personable",
    "Chatty",
    "Engaging"
  ],
  "Luxury/Premium": [
    "Sophisticated",
    "Elegant",
    "Refined",
    "Exclusive",
    "Understated",
    "Discerning",
    "Poised",
    "Cultured",
    "Confidently Minimalist"
  ],
  "Disruptive/Challenger": [
    "Contrarian",
    "Fearless",
    "Boldly Honest",
    "Unfiltered",
    "Street-Smart",
    "Challenger/Rebel",
    "No-Fluff",
    "Punchy",
    "Disruptive"
  ],
  "Miscellaneous": [
    "Data-Driven",
    "Logical",
    "Precise",
    "Strategic",
    "Informative",
    "Objective",
    "Thoughtful",
    "Methodical",
    "Expert"
  ]
};

type ModalType = "toneBank" | null;

const SetToneStep: React.FC<SetToneStepProps> = ({ toneData, setToneData }) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [tempToneData, setTempToneData] = useState<string[]>(toneData);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  
  // Get selectedBrandVoices from context
  const { selectedBrandVoices, setSelectedBrandVoices } = usePromptEng();
  const { comprehensiveProfile, fetchComprehensiveProfile, isLoadingComprehensive } = useProfile();
  
  // Store the full textarea content separately from toneData
  const [textareaContent, setTextareaContent] = useState<string>('');
  
  // Initialize textarea from toneData on mount (for loaded prompts)
  useEffect(() => {
    if (toneData && toneData.length > 0) {
      setTextareaContent(toneData.join('\n\n'));
    }
  }, []);
  
  // Fetch profile when component mounts
  useEffect(() => {
    if (!comprehensiveProfile) {
      fetchComprehensiveProfile().catch(() => {});
    }
  }, [comprehensiveProfile, fetchComprehensiveProfile]);

  const toggleCategory = useCallback((category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  }, []);

  const toggleTone = useCallback(
    (tone: string, data: string[], setData: (arr: string[]) => void) => {
      const newTones = data.includes(tone) ? data.filter((t) => t !== tone) : [...data, tone];
      setData(newTones);
    },
    []
  );

  // Generate output when modal is saved - combines tones and brand voices
  const generateOutputFromSelections = useCallback(() => {
    const parts: string[] = [];
    
    // Add tones
    if (tempToneData.length > 0) {
      parts.push(tempToneData.join(", "));
    }
    
    // Add selected brandVoices
    if (selectedBrandVoices.length > 0 && comprehensiveProfile?.brandVoices) {
      const voiceTexts = selectedBrandVoices.map(voiceKey => {
        const voice = comprehensiveProfile.brandVoices.find(v => v.key === voiceKey);
        if (voice) {
          return `Write the response using the brand voice characteristics defined here: ${voice.value}`;
        }
        return '';
      }).filter(Boolean);
      parts.push(...voiceTexts);
    }
    
    return parts.join('\n\n');
  }, [tempToneData, selectedBrandVoices, comprehensiveProfile]);

  const closeModal = useCallback(() => {
    setTempToneData(toneData); // reset temp data when closing
    // Don't reset expandedCategories - maintain scroll position and state
    setActiveModal(null);
  }, [toneData]);

  // When opening the ToneBank, ensure the modal temp state reflects the current tones
  useEffect(() => {
    if (activeModal === "toneBank") setTempToneData(toneData);
  }, [activeModal, toneData]);

  const Modal = React.memo(
    ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-ivory rounded-lg shadow-xl max-w-2xl w-full mx-3 sm:mx-6 max-h-[80vh] overflow-y-auto">
          <div className="flex justify-end p-3 sm:p-4">
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600" type="button">
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
          {children}
        </div>
      </div>
    )
  );

  // 🔹 Tone Bank Modal with Categories + Brand Voice
  const ToneBankModal = React.memo(() => (
    <Modal onClose={closeModal}>
      <div className="px-4 sm:px-6 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <Building className="w-6 h-6 text-gold" />
          <h2 className="text-lg sm:text-2xl font-semibold text-black">Tone Bank</h2>
        </div>
        <p className="text-sm sm:text-base text-black mb-6">
          Select multiple tone options to define your voice by category
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 max-h-96 overflow-y-auto items-start">
          {/* Tone Categories */}
          {Object.entries(TONE_CATEGORIES).map(([category, tones]) => (
            <div key={category} className="rounded-lg border border-gray-200 overflow-hidden self-start">
              {/* category button (looks like a dropdown header) */}
              <button
                type="button"
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between px-4 py-3 bg-white transition-colors"
              >
                <span className="font-medium text-gray-800 text-center w-full">{category}</span>
                <span className="ml-3">
                  {expandedCategories[category] ? (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </span>
              </button>

              {/* expanded checklist */}
              {expandedCategories[category] && (
                <div className="p-4 bg-white border-t border-gray-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {tones.map((tone) => (
                      <label
                        key={tone}
                        className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={tempToneData.includes(tone)}
                          onChange={() => {
                            const newTones = tempToneData.includes(tone)
                              ? tempToneData.filter((t) => t !== tone)
                              : [...tempToneData, tone];
                            setTempToneData(newTones);
                          }}
                          className="w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold"
                        />
                        <span className="text-sm text-gray-700">{tone}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Brand Voice Category */}
          {comprehensiveProfile?.brandVoices && comprehensiveProfile.brandVoices.length > 0 && (
            <div className={`rounded-lg border overflow-hidden self-start ${
              selectedBrandVoices.length > 0 ? 'border-gold bg-gold/5' : 'border-gray-200'
            }`}>
              <button
                type="button"
                onClick={() => toggleCategory('Brand Voice')}
                className={`w-full flex items-center justify-between px-4 py-3 transition-colors ${
                  selectedBrandVoices.length > 0 ? 'bg-gold/10 hover:bg-gold/20' : 'bg-white hover:bg-gray-50'
                }`}
              >
                <span className="font-medium text-gray-800 text-center w-full">Brand Voice</span>
                <span className="ml-3">
                  {expandedCategories['Brand Voice'] ? (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </span>
              </button>

              {expandedCategories['Brand Voice'] && (
                <div className="p-4 bg-white border-t border-gray-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {comprehensiveProfile.brandVoices.map((voice) => (
                      <label
                        key={voice.key}
                        className="flex items-start gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedBrandVoices.includes(voice.key)}
                          onChange={() => {
                            const newVoices = selectedBrandVoices.includes(voice.key)
                              ? selectedBrandVoices.filter((v) => v !== voice.key)
                              : [...selectedBrandVoices, voice.key];
                            setSelectedBrandVoices(newVoices);
                          }}
                          className="w-4 h-4 mt-0.5 text-gold border-gray-300 rounded focus:ring-gold flex-shrink-0"
                        />
                        <div className="text-sm flex-1">
                          <div className="font-medium text-gray-900">{voice.key}</div>
                          {/* <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">{voice.value}</div> */}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Save & Cancel */}
        <div className="flex justify-end gap-3">
          <button
            onClick={closeModal}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // Generate combined output
              const combinedOutput = generateOutputFromSelections();
              // Update both textarea display and context data
              setTextareaContent(combinedOutput);
              setToneData([combinedOutput]);
              setActiveModal(null);
            }}
            className="px-4 py-2 rounded-md bg-gold text-white hover:bg-gold/90 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  ));



  return (
    <div className="rounded-xl border border-gold/30 p-2 md:p-4 mb-4">
      <div className="mb-3 sm:mb-2 flex items-start justify-between">
        <h2 className="text-base sm:text-lg text-black mb-2 sm:mb-1">
          <strong>IV. Set Tone & Voice:</strong>
        </h2>

        {/* Move Tone Bank to upper-right like the design */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setActiveModal("toneBank")}
            className="ml-2 px-3 py-2 sm:px-4 sm:py-2 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 text-sm sm:text-base flex items-center gap-2"
          >
            <Building className="w-4 h-4 text-gold" />
            Tone Bank
          </button>
        </div>
      </div>

      {/* Final Tone & Voice Output */}
      <div className="space-y-2">
        <div>
          {/* <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Final Tone & Voice Output:
          </label> */}
          <textarea
            value={textareaContent}
            onChange={(e) => {
              // Completely free editing - just like InsertReferences textarea
              // No parsing, no state dependencies - user can type/edit/delete anything
              setTextareaContent(e.target.value);
              // ✅ Also update toneData context so this content is sent to API
              setToneData([e.target.value]);
            }}
            // placeholder intentionally removed per request — textarea starts blank
            className="w-full p-2 sm:p-3 border border-gold/30 rounded-md bg-ivory text-sm sm:text-base focus:outline-gold resize-none h-24 sm:h-28"
          />
        </div>
      </div>

      {activeModal === "toneBank" && <ToneBankModal />}
    </div>
  );
};

export default SetToneStep;
