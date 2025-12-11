"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useProfile } from '@/context/ProfileContext';
import { usePromptEng } from '@/context/PromptEngContext';
import { X, Book, BarChart2, ChevronDown } from "lucide-react";

interface InsertReferencesProps {
  references: string;
  setReferences: (text: string) => void;
}

const InsertReferences: React.FC<InsertReferencesProps> = ({
  references,
  setReferences,
}) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { referencesUsage, setReferencesUsage, selectedBrandVoices } = usePromptEng();


  // ProfileContext - Using comprehensive profile instead of identity/preferences
  const {
    // identity,
    // preferences,
    // fetchIdentity,
    // fetchPreferences,
    // isLoadingIdentity,
    // isLoadingPreferences,
    comprehensiveProfile,
    fetchComprehensiveProfile,
    isLoadingComprehensive,
  } = useProfile();

  // Options built from comprehensive profile data
  const profileOptions = useMemo(() => {
    const opts: { id: string; category: string; label: string; value: string; template: string; isNested?: boolean; parentId?: string }[] = [];

    if (comprehensiveProfile) {
      // Role - non-expandable
      if (comprehensiveProfile.role) {
        opts.push({ 
          id: 'role', 
          category: 'Role',
          label: 'Role', 
          value: comprehensiveProfile.role,
          template: 'Consider my role: [VALUE]'
        });
      }

      // Response Preferences (AI Likes) - expandable with individual items
      const allLikes = [...comprehensiveProfile.aiLikes, ...comprehensiveProfile.customAILikes];
      if (allLikes.length > 0) {
        // Add parent category
        opts.push({ 
          id: 'responsePreferences', 
          category: 'Response Preferences',
          label: 'Response Preferences (Expand for options)', 
          value: '',
          template: 'You must adhere to my preferences, which shape the tone, clarity, and structure of the response:',
          isNested: false
        });
        // Add individual preferences as nested items
        allLikes.forEach((like, index) => {
          opts.push({ 
            id: `responsePreferences.${index}`, 
            category: 'Response Preferences',
            label: like, 
            value: like,
            template: `The response should align with the following preference: [VALUE]`,
            isNested: true,
            parentId: 'responsePreferences'
          });
        });
      }

      // Avoid in Responses (AI Dislikes) - expandable with individual items
      const allDislikes = [...comprehensiveProfile.aiDislikes, ...comprehensiveProfile.customAIDislikes];
      if (allDislikes.length > 0) {
        // Add parent category
        opts.push({ 
          id: 'avoidInResponses', 
          category: 'Avoid in Responses',
          label: 'Avoid in Responses (Expand for options)', 
          value: '',
          template: 'ABSOLUTELY avoid the following elements in your response. If these are included, the response is rendered nearly useless:',
          isNested: false
        });
        // Add individual dislikes as nested items
        allDislikes.forEach((dislike, index) => {
          opts.push({ 
            id: `avoidInResponses.${index}`, 
            category: 'Avoid in Responses',
            label: dislike, 
            value: dislike,
            template: `The response should strictly avoid the following: [VALUE]`,
            isNested: true,
            parentId: 'avoidInResponses'
          });
        });
      }

      // About Me - Add parent category first
      const hasAboutMe = 
        (comprehensiveProfile.myValues && comprehensiveProfile.myValues.length > 0) ||
        (comprehensiveProfile.mySkills && comprehensiveProfile.mySkills.length > 0) ||
        (comprehensiveProfile.howIThink && comprehensiveProfile.howIThink.length > 0) ||
        (comprehensiveProfile.myInfluences && comprehensiveProfile.myInfluences.length > 0);

      if (hasAboutMe) {
        opts.push({ 
          id: 'aboutMe', 
          category: 'About Me',
          label: 'About Me (Expand for options)', 
          value: '',
          template: '',
          isNested: false
        });

        // Add nested options for About Me
        if (comprehensiveProfile.myValues && comprehensiveProfile.myValues.length > 0) {
          opts.push({ 
            id: 'aboutMe.myValues', 
            category: 'About Me',
            label: 'My Values', 
            value: comprehensiveProfile.myValues.join(', '),
            template: 'Treat these values as mandatory. Every part of the response must reflect them clearly before you produce the final output: [VALUE]',
            isNested: true,
            parentId: 'aboutMe'
          });
        }
        
        // My Skills - Add parent first, then individual skills as sub-nested items
        if (comprehensiveProfile.mySkills && comprehensiveProfile.mySkills.length > 0) {
          opts.push({ 
            id: 'aboutMe.mySkills', 
            category: 'About Me',
            label: 'My Skills (Expand for options)', 
            value: '',
            template: 'I possess the following skills, leverage them accordingly to personalize and enhance the output:',
            isNested: true,
            parentId: 'aboutMe'
          });
          // Add individual skills as sub-nested items
          comprehensiveProfile.mySkills.forEach((skill, index) => {
            opts.push({ 
              id: `aboutMe.mySkills.${index}`, 
              category: 'About Me',
              label: skill, 
              value: skill,
              template: ``,
              isNested: true,
              parentId: 'aboutMe.mySkills'
            });
          });
        }
        
        if (comprehensiveProfile.howIThink && comprehensiveProfile.howIThink.length > 0) {
          opts.push({ 
            id: 'aboutMe.howIThink', 
            category: 'About Me',
            label: 'How I Think', 
            value: comprehensiveProfile.howIThink.join(', '),
            template: 'My reasoning style is specific and a generic response will not suffice. You must shape your response according to these guidelines so it lands with absolute precision for me: [VALUE]',
            isNested: true,
            parentId: 'aboutMe'
          });
        }
        
        // My Influences - Add parent first, then individual influences as sub-nested items
        if (comprehensiveProfile.myInfluences && comprehensiveProfile.myInfluences.length > 0) {
          opts.push({ 
            id: 'aboutMe.myInfluences', 
            category: 'About Me',
            label: 'My Influences (Expand for options)', 
            value: '',
            template: 'Use the listed influences as creative or conceptual inspiration when shaping the response:',
            isNested: true,
            parentId: 'aboutMe'
          });
          // Add individual influences as sub-nested items
          comprehensiveProfile.myInfluences.forEach((influence, index) => {
            opts.push({ 
              id: `aboutMe.myInfluences.${index}`, 
              category: 'About Me',
              label: influence, 
              value: influence,
              template: ``,
              isNested: true,
              parentId: 'aboutMe.myInfluences'
            });
          });
        }
      }

      // Brand Voices - expandable with individual voices
      if (comprehensiveProfile.brandVoices && comprehensiveProfile.brandVoices.length > 0) {
        // Add parent category
        opts.push({ 
          id: 'brandVoice', 
          category: 'Brand Voice',
          label: 'Brand Voice (Expand for options)', 
          value: '',
          template: 'Write the response using the brand voice characteristics defined here:[VALUE]',
          isNested: false
        });
        // Add individual voices as nested items
        comprehensiveProfile.brandVoices.forEach((voice, index) => {
          if (voice.key && voice.value) {
            opts.push({ 
              id: `brandVoice.${index}`, 
              category: 'Brand Voice',
              label: voice.key, 
              value: voice.value,
              template: ``,
              isNested: true,
              parentId: 'brandVoice'
            });
          }
        });
      }

      // Audience Persona - expandable with individual personas
      if (comprehensiveProfile.audiencePersona && comprehensiveProfile.audiencePersona.length > 0) {
        // Add parent category
        opts.push({ 
          id: 'audiencePersona', 
          category: 'Audience Persona',
          label: 'Audience Persona (Expand for options)', 
          value: '',
          template: 'Tailor the response to resonate with the following audience persona:[VALUE]',
          isNested: false
        });
        // Add individual personas as nested items
        comprehensiveProfile.audiencePersona.forEach((persona, index) => {
          if (persona.key && persona.value) {
            opts.push({ 
              id: `audiencePersona.${index}`, 
              category: 'Audience Persona',
              label: persona.key, 
              value: persona.value,
              template: ``,
              isNested: true,
              parentId: 'audiencePersona'
            });
          }
        });
      }

      // Work Examples - expandable with individual examples
      if (comprehensiveProfile.workExamples && comprehensiveProfile.workExamples.length > 0) {
        // Add parent category
        opts.push({ 
          id: 'workExamples', 
          category: 'Work Examples',
          label: 'Work Examples (Expand for options)', 
          value: '',
          template: 'These examples are intentional. You must model the structure, tone, and quality of your response directly from them: [VALUE]',
          isNested: false
        });
        // Add individual examples as nested items
        comprehensiveProfile.workExamples.forEach((example, index) => {
          if (example.key && example.value) {
            opts.push({ 
              id: `workExamples.${index}`, 
              category: 'Work Examples',
              label: example.key, 
              value: example.value,
              template: `Use the following work example as creative reference (${example.key}): [VALUE]`,
              isNested: true,
              parentId: 'workExamples'
            });
          }
        });
      }

      // Reference Data - expandable with individual data items
      if (comprehensiveProfile.dataReferences && comprehensiveProfile.dataReferences.length > 0) {
        // Add parent category
        opts.push({ 
          id: 'referenceData', 
          category: 'Reference Data',
          label: 'Reference Data (Expand for options)', 
          value: '',
          template: 'Incorporate the following data points to support, shape, or validate the response: [VALUE]',
          isNested: false
        });
        // Add individual data items as nested items
        comprehensiveProfile.dataReferences.forEach((data, index) => {
          if (data.key && data.value) {
            opts.push({ 
              id: `referenceData.${index}`, 
              category: 'Reference Data',
              label: data.key, 
              value: data.value,
              template: `Incorporate insights from the following data (${data.key}): [VALUE]`,
              isNested: true,
              parentId: 'referenceData'
            });
          }
        });
      }

      // Additional References (Miscellaneous) - expandable with individual items
      if (comprehensiveProfile.miscellaneous && comprehensiveProfile.miscellaneous.length > 0) {
        // Add parent category
        opts.push({ 
          id: 'additionalReferences', 
          category: 'Additional References',
          label: 'Additional References (Expand for options)', 
          value: '',
          template: 'Account for the additional context provided here: [VALUE]',
          isNested: false
        });
        // Add individual miscellaneous items as nested items
        comprehensiveProfile.miscellaneous.forEach((misc, index) => {
          if (misc.key && misc.value) {
            opts.push({ 
              id: `additionalReferences.${index}`, 
              category: 'Additional References',
              label: misc.key, 
              value: misc.value,
              template: `Consider the following contextual details (${misc.key}): [VALUE]`,
              isNested: true,
              parentId: 'additionalReferences'
            });
          }
        });
      }
    }

    return opts;
  }, [comprehensiveProfile]);

  const [selectedOptionIds, setSelectedOptionIds] = useState<Record<string, boolean>>({});
  const [tempSelectedOptionIds, setTempSelectedOptionIds] = useState<Record<string, boolean>>({});
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [expandedSubCategories, setExpandedSubCategories] = useState<Record<string, boolean>>({});
  // Keep last-generated profile block so we can replace it atomically
  const [lastProfileBlock, setLastProfileBlock] = useState<string>("");

  useEffect(() => {
    // reset selections when modal opens - but persist previous selections
    if (showProfileModal) {
      // fetch comprehensive profile data if not present
      if (!comprehensiveProfile) fetchComprehensiveProfile().catch(() => {});
      setTempSelectedOptionIds(selectedOptionIds); // persist previous selections
      setExpandedCategories({});
      setExpandedSubCategories({});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showProfileModal]);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const toggleSubCategory = (subCategoryId: string) => {
    setExpandedSubCategories((prev) => ({ ...prev, [subCategoryId]: !prev[subCategoryId] }));
  };

  const toggleOption = (id: string) => {
    setTempSelectedOptionIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Helpers for parent category selection (select/deselect all children)
  const getNestedByParent = (parentId: string) => {
    return profileOptions.filter((o) => o.parentId === parentId);
  };

  const isAllNestedSelected = (parentId: string) => {
    const nested = getNestedByParent(parentId);
    return nested.length > 0 && nested.every((n) => {
      // Check if this nested item has sub-children
      const subChildren = profileOptions.filter(opt => opt.parentId === n.id);
      if (subChildren.length > 0) {
        // For items with sub-children, check if all sub-children are selected
        return subChildren.every(sc => !!tempSelectedOptionIds[sc.id]);
      }
      // For items without sub-children, check if the item itself is selected
      return !!tempSelectedOptionIds[n.id];
    });
  };

  const isAnyNestedSelected = (parentId: string) => {
    const nested = getNestedByParent(parentId);
    return nested.length > 0 && nested.some((n) => {
      // Check if this nested item has sub-children
      const subChildren = profileOptions.filter(opt => opt.parentId === n.id);
      if (subChildren.length > 0) {
        // For items with sub-children, check if any sub-child is selected
        return subChildren.some(sc => !!tempSelectedOptionIds[sc.id]);
      }
      // For items without sub-children, check if the item itself is selected
      return !!tempSelectedOptionIds[n.id];
    });
  };

  const toggleParentSelection = (parentId: string) => {
    const nested = getNestedByParent(parentId);
    if (nested.length === 0) return;
    setTempSelectedOptionIds((prev) => {
      const allSelected = nested.every((n) => {
        // Check if this nested item has sub-children
        const subChildren = profileOptions.filter(opt => opt.parentId === n.id);
        if (subChildren.length > 0) {
          // For items with sub-children, check if all sub-children are selected
          return subChildren.every(sc => !!prev[sc.id]);
        }
        // For items without sub-children, check if the item itself is selected
        return !!prev[n.id];
      });
      
      const next = { ...prev };
      nested.forEach((n) => {
        const subChildren = profileOptions.filter(opt => opt.parentId === n.id);
        if (subChildren.length > 0) {
          // Toggle all sub-children
          subChildren.forEach(sc => {
            next[sc.id] = !allSelected;
          });
        } else {
          // Toggle the item itself
          next[n.id] = !allSelected;
        }
      });
      return next;
    });
  };

  const generateTextForOption = (option: typeof profileOptions[0], childrenIfParent?: typeof profileOptions): string => {
    if (childrenIfParent && childrenIfParent.length > 0) {
      // For About Me category, each child has its own template
      if (option.category === 'About Me') {
        const childBlocks = childrenIfParent.map((c) => {
          if (c.template && c.template.trim()) {
            if (c.template.includes('[VALUE]')) {
              return c.template.replace(/\[VALUE\]/g, c.value);
            }
            return `${c.template} ${c.value}`.trim();
          }
          return `${c.label}: ${c.value}`;
        }).filter(Boolean);
        return childBlocks.join('\n\n');
      }

      // For other categories, use parent template with child values joined by commas
      const childValues = childrenIfParent.map((c) => c.value).filter(Boolean);
      if (option.template && option.template.trim()) {
        if (option.template.includes('[VALUE]')) {
          return option.template.replace(/\[VALUE\]/g, childValues.join(', '));
        }
        return `${option.template} ${childValues.join(', ')}`;
      }
      return childValues.join(', ');
    } else {
      if (option.template && option.template.trim()) {
        if (option.template.includes('[VALUE]')) {
          return option.template.replace(/\[VALUE\]/g, option.value);
        }
        return `${option.template} ${option.value}`;
      }
      return `${option.label}: ${option.value}`;
    }
  };
  const handleSelectFromProfile = () => {
    // Build the full block for current selections
    const selected = profileOptions.filter((o) => tempSelectedOptionIds[o.id]);

    console.log('Selected options:', selected);
    console.log('Selected brand voices:', selectedBrandVoices);

    // If nothing selected, clear the textarea and persist
    if (selected.length === 0 && selectedBrandVoices.length === 0) {
      setReferences('');
      setLastProfileBlock('');
      setSelectedOptionIds(tempSelectedOptionIds);
      setShowProfileModal(false);
      return;
    }

    // Group nested items by parentId
    const nestedByParent: Record<string, typeof profileOptions> = {};
    const topLevel: typeof profileOptions = [] as any;
    
    selected.forEach((o) => {
      if (o.isNested && o.parentId) {
        if (!nestedByParent[o.parentId]) nestedByParent[o.parentId] = [] as any;
        nestedByParent[o.parentId].push(o);
      } else {
        topLevel.push(o);
      }
    });

    console.log('Nested by parent:', nestedByParent);
    console.log('Top level:', topLevel);

    const parts: string[] = [];
    
    // Add brandVoices first if selected in ToneBank
    if (selectedBrandVoices.length > 0 && comprehensiveProfile) {
      const brandVoiceTemplate = 'Write the response using the brand voice characteristics defined here:';
      selectedBrandVoices.forEach(voiceKey => {
        const voice = comprehensiveProfile.brandVoices?.find(v => v.key === voiceKey);
        if (voice) {
          parts.push(`${brandVoiceTemplate} ${voice.value}`);
        }
      });
    }
    
    // Process top-level items (non-nested items)
    topLevel.forEach((o) => {
      const children = nestedByParent[o.id];
      if (children && children.length > 0) {
        // Check if any of the children have sub-children (like My Skills or My Influences)
        const hasSubChildren = children.some(child => nestedByParent[child.id] && nestedByParent[child.id].length > 0);
        
        if (hasSubChildren) {
          // Process sub-parents (like My Skills, My Influences)
          children.forEach(subParent => {
            const subChildren = nestedByParent[subParent.id];
            if (subChildren && subChildren.length > 0) {
              // Generate text for sub-parent with its children
              const subChildValues = subChildren.map(c => c.value).filter(Boolean);
              if (subParent.template && subParent.template.trim()) {
                parts.push(`${subParent.template} ${subChildValues.join(', ')}`);
              } else {
                parts.push(`${subParent.label}: ${subChildValues.join(', ')}`);
              }
            } else {
              // Sub-parent has no children, use its own value
              parts.push(generateTextForOption(subParent));
            }
          });
        } else {
          // Regular nested items (like My Values, How I Think)
          parts.push(generateTextForOption(o, children));
        }
      } else {
        // No children
        parts.push(generateTextForOption(o));
      }
    });

    // Process orphaned nested items (items that have a parentId but their parent wasn't selected)
    // Group by their immediate parent
    const parentIds = Object.keys(nestedByParent);
    parentIds.forEach(parentId => {
      // Check if this parent is in topLevel (already processed) or is itself nested
      const parentInTopLevel = topLevel.some(t => t.id === parentId);
      if (parentInTopLevel) return; // Already processed above
      
      const children = nestedByParent[parentId];
      if (!children || children.length === 0) return;

      // Find the parent option to get its info
      const parentOption = profileOptions.find(opt => opt.id === parentId);
      
      // Check if any of the children have sub-children
      const hasSubChildren = children.some(child => nestedByParent[child.id] && nestedByParent[child.id].length > 0);
      
      if (hasSubChildren) {
        // Process sub-parents (like My Skills, My Influences)
        children.forEach(subParent => {
          const subChildren = nestedByParent[subParent.id];
          if (subChildren && subChildren.length > 0) {
            // Generate text for sub-parent with its children
            const subChildValues = subChildren.map(c => c.value).filter(Boolean);
            if (subParent.template && subParent.template.trim()) {
              parts.push(`${subParent.template} ${subChildValues.join(', ')}`);
            } else {
              parts.push(`${subParent.label}: ${subChildValues.join(', ')}`);
            }
          }
        });
      } else {
        // Regular nested items - generate using parent's template if available
        if (parentOption && parentOption.template) {
          // Use parent's template with children values
          const childValues = children.map(c => c.value).filter(Boolean);
          if (childValues.length > 0) {
            if (parentOption.template.includes('[VALUE]')) {
              parts.push(parentOption.template.replace(/\[VALUE\]/g, childValues.join(', ')));
            } else {
              parts.push(`${parentOption.template} ${childValues.join(', ')}`);
            }
          }
        } else {
          // Fallback: generate each child individually using its own template
          children.forEach(child => {
            if (child.value && child.template) {
              if (child.template.includes('[VALUE]')) {
                parts.push(child.template.replace(/\[VALUE\]/g, child.value));
              } else {
                parts.push(`${child.template} ${child.value}`);
              }
            } else if (child.value) {
              parts.push(child.value);
            }
          });
        }
      }
    });

    console.log('Generated parts:', parts);

    const newBlock = parts.join('\n\n');
    console.log('Final block:', newBlock);

    // Clear the textarea first, then set the new block
    setReferences(newBlock);
    setLastProfileBlock(newBlock);

    // Persist the selections and close modal
    setSelectedOptionIds(tempSelectedOptionIds);
    setShowProfileModal(false);
  };

  // Helper to escape special regex characters
  const escapeRegex = (str: string) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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
        className="bg-ivory rounded-lg shadow-xl max-w-2xl w-full mx-3 sm:mx-6 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );

  return (
    <div className="rounded-xl border border-gold/30 p-3 sm:p-4 mb-4 ">
      <div className="flex items-center mb-3 sm:mb-2 justify-between">
        <h2 className="text-sm sm:text-base md:text-lg text-black">
          <strong>V.Customization</strong>
        </h2>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="px-3 py-2 bg-white rounded-md border border-gray-200 hover:bg-gray-50 text-sm sm:text-base"
            onClick={() => setShowProfileModal(true)}
          >
            <BarChart2 className="w-4 h-4 inline-block mr-2" />
            Profile Settings
          </button>
        </div>
      </div>

      {/* Buttons moved to header */}
        <textarea
          value={references}
          onChange={(e) => setReferences(e.target.value)}
          className="w-full bg-ivory min-h-[100px] sm:min-h-[120px] px-3 py-2 border border-gold/30 rounded-md text-sm sm:text-base focus:outline-gold"
        />
        {/* Move the usage input below the references textarea per design */}
        {/* <div className="mt-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            How should the model use these references?
          </label>
          <input
            type="text"
            value={referencesUsage}
            onChange={(e) => setReferencesUsage(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md text-sm sm:text-base focus:outline-gold ${references && !referencesUsage.trim() ? 'border-red-500' : 'border-gold/30'}`}
          />
        </div> */}
      {/* Select from Profile Modal */}
      {showProfileModal && (
        <ModalBackdrop onClose={() => setShowProfileModal(false)}>
          <div className="flex justify-end p-3 sm:p-4">
            <button
              onClick={() => setShowProfileModal(false)}
              className="text-gray-400 hover:text-gray-600"
              type="button"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
          <div className="px-4 sm:px-6 pb-6">
            <div className="flex items-center gap-3 mb-4">
              <BarChart2 className="w-6 h-6 text-gold" />
              <h3 className="text-lg sm:text-2xl font-semibold text-black">
                Select from Profile
              </h3>
            </div>
            <p className="text-sm sm:text-base text-black mb-6">
              Select profile options to include as references
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 max-h-96 overflow-y-auto items-start">
              {isLoadingComprehensive ? (
                <div className="text-sm text-gray-500">Loading profile...</div>
              ) : profileOptions.length === 0 ? (
                <div className="text-gray-500">No profile fields available. Please complete your profile first.</div>
              ) : (
                <>
                  {/* Group options by category - similar to SetToneStep */}
                  {Array.from(new Set(profileOptions.filter(opt => !opt.isNested).map(opt => opt.category))).map(category => {
                    // Hide Brand Voice category if any brandVoices are selected in ToneBank
                    if (category === 'Brand Voice' && selectedBrandVoices.length > 0) {
                      return null;
                    }
                    
                    const categoryOptions = profileOptions.filter(opt => opt.category === category && !opt.isNested);
                    const nestedOptions = profileOptions.filter(opt => opt.category === category && opt.isNested);
                    const isRoleCategory = category === 'Role';
                    
                    // Check if any children in this category are selected
                    const hasSelectedChildren = nestedOptions.some(opt => tempSelectedOptionIds[opt.id]);
                    
                    return (
                      <div key={category} className={`rounded-lg border overflow-hidden self-start ${
                        hasSelectedChildren ? 'border-gold bg-gold/5' : 'border-gray-200'
                      }`}>
                        {/* Category header button - Role doesn't expand */}
                        {isRoleCategory ? (
                          <div className="py-3.5 px-4 bg-white">
                            {categoryOptions.map((opt) => (
                              <label
                                key={opt.id}
                                className="flex items-start gap-3 rounded-md hover:bg-gray-50 cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={!!tempSelectedOptionIds[opt.id]}
                                  onChange={() => toggleOption(opt.id)}
                                  className="w-4 h-4 mt-0.5 text-gold border-gray-300 rounded focus:ring-gold flex-shrink-0"
                                />
                                <div className="text-sm flex-1">
                                  <div className="font-medium text-gray-900">{opt.label}</div>
                                  {/* <div className="text-xs text-gray-500 mt-0.5 line-clamp-2">{opt.value}</div> */}
                                </div>
                              </label>
                            ))}
                          </div>
                        ) : (
                          <>
                            {/* Header with parent checkbox + chevron */}
                            {(() => {
                              const parentOption = categoryOptions.find((o) => !o.isNested);
                              const parentId = parentOption?.id;
                              const allSelected = parentId ? isAllNestedSelected(parentId) : false;
                              const anySelected = parentId ? isAnyNestedSelected(parentId) : false;

                              return (
                                <>
                                  <div className={`w-full flex items-center justify-between px-4 py-3 transition-colors ${
                                    hasSelectedChildren ? 'bg-gold/10 hover:bg-gold/20' : 'bg-white hover:bg-gray-50'
                                  }`}>
                                    <div className="flex items-center gap-3">
                                      <input
                                        type="checkbox"
                                        checked={allSelected}
                                        ref={(el) => {
                                          if (el) el.indeterminate = anySelected && !allSelected;
                                        }}
                                        onChange={() => parentId && toggleParentSelection(parentId)}
                                        className="w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold flex-shrink-0"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => toggleCategory(category)}
                                        className="text-left font-medium text-gray-800"
                                      >
                                        {category}
                                      </button>
                                    </div>
                                    <ChevronDown
                                      className={`w-5 h-5 text-gray-600 transition-transform ${
                                        expandedCategories[category] ? 'rotate-180' : ''
                                      }`}
                                      onClick={() => toggleCategory(category)}
                                    />
                                  </div>

                                  {/* Expanded content */}
                                  {expandedCategories[category] && (
                                    <div className="p-4 bg-white border-t border-gray-100 space-y-2">
                                      {nestedOptions.length > 0 ? (
                                        <div className="space-y-2 pl-4 border-l-2 border-gold/30">
                                          {nestedOptions
                                            .filter((nestedOpt) => {
                                              // Only show options that don't have a parent (i.e., direct children of category)
                                              // Skip sub-children (skills/influences items) - they'll be shown inside their parent
                                              const isSubChild = profileOptions.some(
                                                (opt) => opt.id === nestedOpt.parentId && opt.parentId
                                              );
                                              return !isSubChild;
                                            })
                                            .map((nestedOpt) => {
                                            // Check if this nested option has sub-children (like My Skills, My Influences)
                                            const subChildren = profileOptions.filter(
                                              (opt) => opt.parentId === nestedOpt.id && opt.isNested
                                            );
                                            const hasSubChildren = subChildren.length > 0;
                                            const isSubCategoryExpanded = expandedSubCategories[nestedOpt.id];

                                            if (hasSubChildren) {
                                              // This is a sub-parent (My Skills or My Influences)
                                              const allSubSelected = subChildren.every((sc) => !!tempSelectedOptionIds[sc.id]);
                                              const anySubSelected = subChildren.some((sc) => !!tempSelectedOptionIds[sc.id]);

                                              return (
                                                <div key={nestedOpt.id} className="space-y-2">
                                                  {/* Sub-parent header with checkbox and chevron */}
                                                  <div className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50">
                                                    <label className="flex items-start gap-3 flex-1 cursor-pointer">
                                                      <input
                                                        type="checkbox"
                                                        checked={allSubSelected}
                                                        ref={(el) => {
                                                          if (el) el.indeterminate = anySubSelected && !allSubSelected;
                                                        }}
                                                        onChange={() => {
                                                          // Toggle all sub-children
                                                          setTempSelectedOptionIds((prev) => {
                                                            const next = { ...prev };
                                                            subChildren.forEach((sc) => {
                                                              next[sc.id] = !allSubSelected;
                                                            });
                                                            return next;
                                                          });
                                                        }}
                                                        className="w-4 h-4 mt-0.5 text-gold border-gray-300 rounded focus:ring-gold flex-shrink-0"
                                                      />
                                                      <div className="text-sm flex-1">
                                                        <div className="font-medium text-gray-900">{nestedOpt.label}</div>
                                                      </div>
                                                    </label>
                                                    <ChevronDown
                                                      className={`w-4 h-4 text-gray-600 transition-transform cursor-pointer ${
                                                        isSubCategoryExpanded ? 'rotate-180' : ''
                                                      }`}
                                                      onClick={() => toggleSubCategory(nestedOpt.id)}
                                                    />
                                                  </div>

                                                  {/* Sub-children (individual skills/influences) */}
                                                  {isSubCategoryExpanded && (
                                                    <div className="pl-6 space-y-1 border-l-2 border-gold/20">
                                                      {subChildren.map((subChild) => (
                                                        <label
                                                          key={subChild.id}
                                                          className="flex items-start gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                                                        >
                                                          <input
                                                            type="checkbox"
                                                            checked={!!tempSelectedOptionIds[subChild.id]}
                                                            onChange={() => toggleOption(subChild.id)}
                                                            className="w-4 h-4 mt-0.5 text-gold border-gray-300 rounded focus:ring-gold flex-shrink-0"
                                                          />
                                                          <div className="text-sm flex-1">
                                                            <div className="text-gray-800">{subChild.label}</div>
                                                          </div>
                                                        </label>
                                                      ))}
                                                    </div>
                                                  )}
                                                </div>
                                              );
                                            } else {
                                              // Regular nested option without sub-children
                                              return (
                                                <label
                                                  key={nestedOpt.id}
                                                  className="flex items-start gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                                                >
                                                  <input
                                                    type="checkbox"
                                                    checked={!!tempSelectedOptionIds[nestedOpt.id]}
                                                    onChange={() => toggleOption(nestedOpt.id)}
                                                    className="w-4 h-4 mt-0.5 text-gold border-gray-300 rounded focus:ring-gold flex-shrink-0"
                                                  />
                                                  <div className="text-sm flex-1">
                                                    <div className="font-medium text-gray-900">{nestedOpt.label}</div>
                                                  </div>
                                                </label>
                                              );
                                            }
                                          })}
                                        </div>
                                      ) : (
                                        <div className="text-sm text-gray-500 italic">No options available</div>
                                      )}
                                    </div>
                                  )}
                                </>
                              );
                            })()}
                          </>
                        )}
                      </div>
                    );
                  })}
                </>
              )}
            </div>

            <div className="flex justify-end gap-2 sm:gap-3 mt-6">
              <button
                onClick={() => setShowProfileModal(false)}
                className="px-3 sm:px-4 py-2 text-gray-600 hover:text-gray-800 text-sm sm:text-base rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSelectFromProfile}
                className={`px-4 sm:px-6 py-2 bg-gold text-white rounded-md hover:bg-gold/90 transition text-sm sm:text-base ${
                  Object.values(tempSelectedOptionIds).some(Boolean) ? '' : 'opacity-50 cursor-not-allowed'
                }`}
                disabled={!Object.values(tempSelectedOptionIds).some(Boolean)}
              >
                Add to References
              </button>
            </div>
          </div>
        </ModalBackdrop>
      )}
    </div>
  );
};

export default InsertReferences;
