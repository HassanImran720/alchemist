"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type ContextData = {
  [key: string]: any;
  dynamicFields?: Record<string, any>;
  customFieldsByGroup?: Record<string, string[]>;
  freeformContext?: string;
};

interface EvaluationData {
  objective: boolean;
  inputs: Record<string, string>;
  completeness: number;
  tone: number;
  presentation: number;
  verbosity: number;
  other: number;
  totalScore: number;
  issues: Record<string, string[]>;
}

// localStorage key for persisting form data
const PROMPT_ENG_STORAGE_KEY = "promptEngFormData";

interface PromptEngContextType {
  // State
  taskObjective: string;
  setTaskObjective: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  contextData: ContextData;
  setContextData: (value: ContextData) => void;
  insertReferences: string;
  setInsertReferences: (value: string) => void;
  references: string;
  setReferences: (value: string) => void;
  referencesUsage: string;
  setReferencesUsage: (value: string) => void;
  outputFormat: string;
  setOutputFormat: (value: string) => void;
  promptStructure: string;
  setPromptStructure: (value: string) => void;
  length: string;
  setLength: (value: string) => void;
  includeEmojis: boolean;
  setIncludeEmojis: (value: boolean) => void;
  selectedModel: string;
  setSelectedModel: (value: string) => void;
  showOutputForm: boolean;
  setShowOutputForm: (value: boolean) => void;
  
  // ✅ Updated to support multiple iterations
  iterations: Array<{
    id: string;
    prompt: string;
    basePrompt?: string;  // For reiteration: the original prompt to combine with
    isReiteration?: boolean;  // Flag to indicate this is a reiteration response
    response: string;
    evaluation: EvaluationData | null;
    timestamp: number;
    isCollapsed: boolean;
  }>;
  addIteration: (prompt: string, basePrompt?: string, isReiteration?: boolean) => string;
  updateIterationResponse: (iterationId: string, response: string) => void;
  updateIterationPrompt: (iterationId: string, prompt: string) => void;
  updateIterationEvaluation: (iterationId: string, evaluation: EvaluationData) => void;
  toggleIterationCollapse: (iterationId: string) => void;
  currentIterationId: string | null;
  
  // Legacy support (for backward compatibility)
  generatedPrompt: string;
  setGeneratedPrompt: (value: string) => void;
  aiResponse: string;
  setAiResponse: (value: string) => void;
  evaluation: EvaluationData | null;
  setEvaluation: (value: EvaluationData | null) => void;
  
  toneData: string[];
  setToneData: (value: string[]) => void;
  selectedBrandVoices: string[];
  setSelectedBrandVoices: (value: string[]) => void;
  showTestResponse: boolean;
  setShowTestResponse: (value: boolean) => void;
  showInstructions: boolean;
  setShowInstructions: (value: boolean) => void;

  // Loading states
  isGeneratingPrompt: boolean;
  isGeneratingResponse: boolean;
  isImprovingPrompt: boolean;
  isSavingPrompt: boolean;

  // API Functions
  generatePromptFromServer: () => Promise<string>;
  generateResponseFromServer: (prompt?: string, iterationId?: string) => Promise<string | undefined>;
  improvePromptFromServer: (evaluationData: any, iterationId?: string) => Promise<string>;
  savePromptToLibrary: (title: string, projectName: string) => Promise<void>;

  // Helper functions
  getAuthHeaders: () => Record<string, string>;
  handlePromptGenerated: (prompt: string) => void;
  handleTestComplete: (response: string) => void;
  handleEvaluationComplete: (evaluationData: EvaluationData) => void;
  handleImprove: (improvedPrompt: string) => void;
  clearFormData: () => void;
  loadPromptData: (promptData: any) => void;
  restoreUIState: () => void;
}

const PromptEngContext = createContext<PromptEngContextType | undefined>(undefined);

export const PromptEngProvider = ({ children }: { children: ReactNode }) => {
  
  // Helper function to load from localStorage
  const loadFromStorage = () => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(PROMPT_ENG_STORAGE_KEY);
        if (saved) {
          return JSON.parse(saved);
        }
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
    return {};
  };

  // Helper function to save to localStorage
  const saveToStorage = (data: any) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(PROMPT_ENG_STORAGE_KEY, JSON.stringify(data));
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  // Load initial state from localStorage
  const savedData = loadFromStorage();
  
  // State declarations with localStorage persistence
  const [taskObjective, setTaskObjective] = useState(savedData.taskObjective || "");
  const [selectedCategory, setSelectedCategory] = useState(savedData.selectedCategory || "");
  const [contextData, setContextData] = useState<ContextData>(savedData.contextData || {});
  const [insertReferences, setInsertReferences] = useState(savedData.insertReferences || "");
  const [references, setReferences] = useState(savedData.references || "");
  const [referencesUsage, setReferencesUsage] = useState<string>(savedData.referencesUsage || "");
  const [outputFormat, setOutputFormat] = useState(savedData.outputFormat || "");
  const [promptStructure, setPromptStructure] = useState("plain-text"); // ✅ Default to plain-text to match dropdown
  const [length, setLength] = useState(savedData.length || "");
  const [includeEmojis, setIncludeEmojis] = useState(savedData.includeEmojis || false);
  const [selectedModel, setSelectedModel] = useState(savedData.selectedModel || "chatgpt");
  const [showOutputForm, setShowOutputForm] = useState(false);
  
  // ✅ NEW: Iterations array to store multiple prompt-response cycles
  const [iterations, setIterations] = useState<Array<{
    id: string;
    prompt: string;
    basePrompt?: string;  // For reiteration: the original prompt to combine with
    isReiteration?: boolean;  // Flag to indicate this is a reiteration response
    response: string;
    evaluation: EvaluationData | null;
    timestamp: number;
    isCollapsed: boolean;
  }>>(savedData.iterations || []);
  const [currentIterationId, setCurrentIterationId] = useState<string | null>(savedData.currentIterationId || null);
  
  // Legacy state (for backward compatibility and initial prompt)
  const [generatedPrompt, setGeneratedPrompt] = useState(savedData.generatedPrompt || "");
  const [aiResponse, setAiResponse] = useState(savedData.aiResponse || "");
  const [evaluation, setEvaluation] = useState<EvaluationData | null>(savedData.evaluation || null);
  const [toneData, setToneData] = useState<string[]>(savedData.toneData || []);
  const [selectedBrandVoices, setSelectedBrandVoices] = useState<string[]>(savedData.selectedBrandVoices || []);
  const [showTestResponse, setShowTestResponse] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  // Loading states (don't persist these)
  const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);
  const [isImprovingPrompt, setIsImprovingPrompt] = useState(false);
  const [isSavingPrompt, setIsSavingPrompt] = useState(false);

  // ✅ Iteration management functions
  const addIteration = (prompt: string, basePrompt?: string, isReiteration?: boolean): string => {
    const newId = `iter_${Date.now()}`;
    const newIteration = {
      id: newId,
      prompt,
      basePrompt,
      isReiteration,
      response: "",
      evaluation: null,
      timestamp: Date.now(),
      isCollapsed: false, // ✅ Always start expanded so user sees new iteration
    };
    console.log('➕ Adding iteration:', { id: newId, promptPreview: prompt.substring(0, 50), isReiteration });
    setIterations(prev => [...prev, newIteration]);
    setCurrentIterationId(newId);
    return newId;
  };

  const updateIterationResponse = (iterationId: string, response: string) => {
    setIterations(prev => prev.map(iter => 
      iter.id === iterationId ? { ...iter, response } : iter
    ));
  };

  const updateIterationPrompt = (iterationId: string, prompt: string) => {
    setIterations(prev => prev.map(iter => 
      iter.id === iterationId ? { ...iter, prompt } : iter
    ));
  };

  const updateIterationEvaluation = (iterationId: string, evaluation: EvaluationData) => {
    setIterations(prev => prev.map(iter => 
      iter.id === iterationId ? { ...iter, evaluation } : iter
    ));
  };

  const toggleIterationCollapse = (iterationId: string) => {
    setIterations(prev => prev.map(iter => 
      iter.id === iterationId ? { ...iter, isCollapsed: !iter.isCollapsed } : iter
    ));
  };

  // Auto-save to localStorage when relevant state changes
  useEffect(() => {
    const dataToSave = {
      taskObjective,
      selectedCategory,
      contextData,
      insertReferences,
      references,
      referencesUsage,
      outputFormat,
      promptStructure,
      length,
      includeEmojis,
      selectedModel,
      generatedPrompt,
      aiResponse,
      evaluation,
      toneData,
      selectedBrandVoices,
      iterations,
      currentIterationId,
    };
    console.log("💾 Saving to localStorage:", { 
      iterationsCount: iterations.length,
      selectedCategory,
      hasTaskObjective: !!taskObjective 
    });
    saveToStorage(dataToSave);
  }, [
    taskObjective,
    selectedCategory,
    contextData,
    insertReferences,
    references,
    referencesUsage,
    outputFormat,
    promptStructure,
    length,
    includeEmojis,
    selectedModel,
    generatedPrompt,
    aiResponse,
    evaluation,
    toneData,
    iterations,
    currentIterationId,
  ]);

  // Restore UI state based on saved data
  useEffect(() => {
    if (generatedPrompt) {
      setShowOutputForm(true);
    }
    if (aiResponse) {
      setShowTestResponse(true);
    }
  }, []); // Only run once on mount

  // Helper function to clear all form data
  const clearFormData = () => {
    setTaskObjective("");
    setSelectedCategory("");
    setContextData({});
    setInsertReferences("");
    setReferences("");
    setReferencesUsage("");
    setOutputFormat("");
  setPromptStructure("plain-text");
    setLength("");
    setIncludeEmojis(false);
    setSelectedModel("chatgpt");
    setGeneratedPrompt("");
    setAiResponse("");
    setEvaluation(null);
    setToneData([]);
    setSelectedBrandVoices([]);
    setIterations([]);
    setCurrentIterationId(null);
    setShowOutputForm(false);
    setShowTestResponse(false);
    
    // Clear localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem(PROMPT_ENG_STORAGE_KEY);
    }
  };

  // Function to load a saved prompt into the form for editing
  const loadPromptData = (promptData: any) => {
    try {
      console.log("📥 Loading prompt data into form:", promptData);
      
      // Set basic fields
      if (promptData.taskObjective) setTaskObjective(promptData.taskObjective);
      // Load category from category field or promptSchema
      if (promptData.category) {
        console.log("📂 Setting category from promptData.category:", promptData.category);
        setSelectedCategory(promptData.category);
      } else if (promptData.promptSchema) {
        console.log("📂 Setting category from promptData.promptSchema:", promptData.promptSchema);
        setSelectedCategory(promptData.promptSchema);
      }
      if (promptData.contextData) setContextData(promptData.contextData);
      if (promptData.insertReferences) setInsertReferences(promptData.insertReferences);
      if (promptData.references) setReferences(promptData.references);
      if (promptData.referencesUsage) setReferencesUsage(promptData.referencesUsage);
      if (promptData.outputFormat) setOutputFormat(promptData.outputFormat);
      if (promptData.length) setLength(promptData.length);
      if (promptData.toneData) setToneData(promptData.toneData);
      if (promptData.selectedBrandVoices) setSelectedBrandVoices(promptData.selectedBrandVoices);
      
      // ✅ Load iterations from saved prompt
      console.log("🔍 Checking iterations:", {
        hasIterations: !!promptData.iterations,
        isArray: Array.isArray(promptData.iterations),
        length: promptData.iterations?.length || 0,
        iterationsData: promptData.iterations
      });
      
      if (promptData.iterations && Array.isArray(promptData.iterations) && promptData.iterations.length > 0) {
        console.log("📚 Loading", promptData.iterations.length, "iterations from saved prompt");
        console.log("📊 First iteration sample:", {
          prompt: promptData.iterations[0]?.prompt?.substring(0, 100) + "...",
          hasResponse: !!promptData.iterations[0]?.response,
          hasEvaluation: !!promptData.iterations[0]?.evaluation,
          iterationNumber: promptData.iterations[0]?.iterationNumber
        });
        
        // Convert database iterations to UI iterations format
        const loadedIterations = promptData.iterations.map((iter: any, index: number) => ({
          id: `iter_${Date.now()}_${index}`, // Generate unique IDs
          prompt: iter.prompt || "",
          response: iter.response || "",
          evaluation: iter.evaluation || null,
          timestamp: iter.timestamp ? new Date(iter.timestamp).getTime() : Date.now(),
          isCollapsed: index !== promptData.iterations.length - 1, // Only last iteration expanded
        }));
        
        console.log("✅ Converted to UI format - Setting", loadedIterations.length, "iterations in state");
        console.log("📋 Loaded iterations IDs:", loadedIterations.length > 0 ? loadedIterations[0].id : "none");
        console.log("🔍 About to call setIterations with:", loadedIterations.length, "items");
        
        // Set legacy state from last iteration for backward compatibility
        const lastIteration = promptData.iterations[promptData.iterations.length - 1];
        
        // ✅ IMPORTANT: Batch all state updates together using React 18's automatic batching
        // This ensures localStorage saves AFTER all states are updated
        setIterations(loadedIterations);
        setCurrentIterationId(loadedIterations[loadedIterations.length - 1]?.id || null);
        
        if (lastIteration) {
          setGeneratedPrompt(lastIteration.prompt);
          setAiResponse(lastIteration.response || "");
          setEvaluation(lastIteration.evaluation || null);
          
          // Set model and promptStructure from iteration if available
          if (lastIteration.aiModel) setSelectedModel(lastIteration.aiModel);
          if (lastIteration.promptStructure) setPromptStructure(lastIteration.promptStructure);
        }
        
        setShowOutputForm(true);
        if (lastIteration?.response) {
          setShowTestResponse(true);
        }
        
        console.log("✅ setIterations called - waiting for state update");
        console.log("✅ All states set - React should batch and trigger localStorage save");
        
        // Force immediate persistence to avoid race conditions
        setTimeout(() => {
          const verifyData = loadFromStorage();
          console.log("🔍 Verification: localStorage iterations count:", verifyData.iterations?.length || 0);
          if (!verifyData.iterations || verifyData.iterations.length === 0) {
            console.error("⚠️ WARNING: localStorage not updated yet, forcing manual save");
            const manualSave = {
              taskObjective: promptData.taskObjective || "",
              selectedCategory: promptData.category || promptData.promptSchema || "",
              contextData: promptData.contextData || {},
              insertReferences: promptData.insertReferences || "",
              references: promptData.references || "",
              referencesUsage: promptData.referencesUsage || "",
              outputFormat: promptData.outputFormat || "",
              promptStructure: lastIteration?.promptStructure || "",
              length: promptData.length || "",
              includeEmojis: false,
              selectedModel: lastIteration?.aiModel || "chatgpt",
              generatedPrompt: lastIteration?.prompt || "",
              aiResponse: lastIteration?.response || "",
              evaluation: lastIteration?.evaluation || null,
              toneData: promptData.toneData || [],
              iterations: loadedIterations,
              currentIterationId: loadedIterations[loadedIterations.length - 1]?.id || null,
            };
            saveToStorage(manualSave);
            console.log("✅ Manual save complete with", loadedIterations.length, "iterations");
          }
        }, 100);
        
      } else {
        // Fallback: Load legacy single prompt/response if no iterations
        if (promptData.fullPromptContent) {
          setGeneratedPrompt(promptData.fullPromptContent);
          setShowOutputForm(true);
          
          // Create single iteration from legacy data
          const legacyIteration = {
            id: `iter_${Date.now()}`,
            prompt: promptData.fullPromptContent,
            response: promptData.aiResponse || "",
            evaluation: promptData.evaluation || null,
            timestamp: Date.now(),
            isCollapsed: false,
          };
          setIterations([legacyIteration]);
          setCurrentIterationId(legacyIteration.id);
        }
        
        if (promptData.aiResponse) {
          setAiResponse(promptData.aiResponse);
          setShowTestResponse(true);
        }
        if (promptData.evaluation) {
          setEvaluation(promptData.evaluation);
        }
        if (promptData.aiModel) setSelectedModel(promptData.aiModel);
        if (promptData.promptStructure) setPromptStructure(promptData.promptStructure);
      }
      
      console.log("✅ Prompt data loaded successfully");
    } catch (error) {
      console.error("❌ Error loading prompt data:", error);
    }
  };

  // Helper function to restore UI state after page reload
  const restoreUIState = () => {
    if (generatedPrompt) {
      setShowOutputForm(true);
    }
    if (aiResponse) {
      setShowTestResponse(true);
    }
  };

  // Helper function to get auth headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  };

  // Handler functions
  const handlePromptGenerated = (prompt: string) => {
    setGeneratedPrompt(prompt);
  };

  const handleTestComplete = (response: string) => {
    setAiResponse(response);
  };

  const handleEvaluationComplete = (evaluationData: EvaluationData) => {
    setEvaluation(evaluationData);
  };

  const handleImprove = (improvedPrompt: string) => {
    setGeneratedPrompt(improvedPrompt);
    setAiResponse("");
  };

  // API Functions
  const generatePromptFromServer = async (): Promise<string> => {
    try {
      setIsGeneratingPrompt(true);
      
      const body = {
        category: selectedCategory,
        task: taskObjective,
        contextData,
        fields: contextData?.dynamicFields || {},
        insertReferences,
        references,
        referencesUsage,
        format: outputFormat,
        toneData,
        promptStructure: promptStructure || "plain-text", // ✅ ensure non-empty
        length,
        selectedCategory,
        includeEmojis,
      };

      const res = await fetch("/api/prompt/generate", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Authentication required. Please login to continue.");
        }
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      const prompt = data.prompt || "";
      
      // ✅ Create first iteration automatically
      const firstIterationId = addIteration(prompt);
      
      // Also set legacy state for backward compatibility
      handlePromptGenerated(prompt);
      return prompt;
    } catch (err: any) {
      console.error("generatePrompt error", err);
      throw err;
    } finally {
      setIsGeneratingPrompt(false);
    }
  };

  const generateResponseFromServer = async (prompt?: string, iterationId?: string): Promise<string | undefined> => {
    try {
      setIsGeneratingResponse(true);
      
      let sendPrompt = prompt || generatedPrompt;
      
      // If this is a reiteration iteration, combine basePrompt with the reiteration
      if (iterationId) {
        const iteration = iterations.find(i => i.id === iterationId);
        if (iteration?.isReiteration && iteration?.basePrompt) {
          // Combine base prompt with reiteration for AI, but iteration.prompt (reiteration only) stays displayed in UI
          sendPrompt = `${iteration.basePrompt}\n\n---REITERATION REFINEMENTS---\n${iteration.prompt}`;
        } else if (iteration) {
          sendPrompt = iteration.prompt;
        }
      }
      
      if (!sendPrompt) return;

      const res = await fetch("/api/prompt/respond", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ 
          prompt: sendPrompt, 
          model: selectedModel,
          maxTokens: 800 
        }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Authentication required. Please login to continue.");
        }
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      const responseText = data.text || "";
      
      // ✅ Update iteration if iterationId provided, otherwise legacy state
      if (iterationId) {
        updateIterationResponse(iterationId, responseText);
      } else {
        setAiResponse(responseText);
        setShowTestResponse(true);
      }
      
      return responseText;
    } catch (err: any) {
      console.error("generateResponse error", err);
      throw err;
    } finally {
      setIsGeneratingResponse(false);
    }
  };

  const improvePromptFromServer = async (evaluationData: any, iterationId?: string): Promise<string> => {
    try {
      setIsImprovingPrompt(true);
      
      // Get the prompt from iteration or legacy state
      const basePrompt = iterationId 
        ? iterations.find(i => i.id === iterationId)?.prompt || generatedPrompt
        : generatedPrompt;
      
      const baseResponse = iterationId
        ? iterations.find(i => i.id === iterationId)?.response || aiResponse
        : aiResponse;
      
      const body = {
        originalPrompt: basePrompt,
        evaluation: evaluationData,
        references,
        referencesUsage,
        format: outputFormat,
        aiResponse: baseResponse,
        taskObjective,
        promptStructure: promptStructure || "plain-text",
      };

      const res = await fetch('/api/prompt/improve', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Authentication required. Please login to continue.");
        }
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      const newPrompt = data.prompt || '';
      console.log('🔄 Improve API response:', { newPrompt: newPrompt.substring(0, 100), isReiteration: data.isReiteration });
      
      if (newPrompt) {
        // ✅ Add as new iteration when improving
        // If this is a reiteration, store the basePrompt for later use when generating responses
        const newIterationId = addIteration(
          newPrompt, 
          data.isReiteration ? data.basePrompt : undefined,
          data.isReiteration
        );
        console.log('✅ New iteration added:', newIterationId);
        
        // ✅ Don't collapse previous iteration - let user see both for comparison
        // User can manually collapse if they want
      }
      return newPrompt;
    } catch (err: any) {
      console.error('improvePrompt error', err);
      throw err;
    } finally {
      setIsImprovingPrompt(false);
    }
  };

  const savePromptToLibrary = async (title: string, projectName: string): Promise<void> => {
    try {
      setIsSavingPrompt(true);
      
      console.log("💾 savePromptToLibrary called with:", { title, projectName });
      
      // ✅ Prepare iterations data for saving
      const iterationsToSave = iterations.map((iter, index) => ({
        iterationNumber: index + 1,
        prompt: iter.prompt,
        response: iter.response,
        evaluation: iter.evaluation,
        aiModel: selectedModel,
        promptStructure: promptStructure,
        timestamp: new Date(iter.timestamp)
      }));

      const body = {
        title,
        
        // ✅ Save all iterations with complete data
        iterations: iterationsToSave,
        
        taskObjective,
        category: selectedCategory || "General",
        contextData,
        insertReferences,
        references,
        outputFormat,
        length,
        toneData,
        
        project: projectName,
        notes:
          contextData?.dynamicFields?.Notes ||
          contextData?.dynamicFields?.notes ||
          contextData?.dynamicFields?.['Context Description'] ||
          contextData?.freeformContext ||
          "",
        tags: []
      };

      console.log("📤 Sending save request with iterations:", iterationsToSave.length);

      const res = await fetch('/api/prompt-library/save', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("❌ Save failed:", errorData);
        
        if (res.status === 401) {
          throw new Error("Authentication required. Please login to continue.");
        }
        if (res.status === 409) {
          throw new Error("A prompt with this title already exists in your library.");
        }
        if (res.status === 400) {
          throw new Error(errorData.error || "Invalid data provided.");
        }
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      console.log("✅ Prompt saved to library with", iterationsToSave.length, "iterations");
      
    } catch (err: any) {
      console.error('savePrompt error', err);
      throw err;
    } finally {
      setIsSavingPrompt(false);
    }
  };

  const value: PromptEngContextType = {
    // State
    taskObjective,
    setTaskObjective,
    selectedCategory,
    setSelectedCategory,
    contextData,
    setContextData,
    insertReferences,
    setInsertReferences,
    references,
    setReferences,
    outputFormat,
    setOutputFormat,
    promptStructure,
    setPromptStructure,
    length,
    setLength,
    includeEmojis,
    setIncludeEmojis,
    selectedModel,
    setSelectedModel,
    showOutputForm,
    setShowOutputForm,
    
    // ✅ Iteration management
    iterations,
    addIteration,
    updateIterationResponse,
    updateIterationPrompt,
    updateIterationEvaluation,
    toggleIterationCollapse,
    currentIterationId,
    
    // Legacy state
    generatedPrompt,
    setGeneratedPrompt,
    aiResponse,
    setAiResponse,
    evaluation,
    setEvaluation,
    toneData,
    setToneData,
    selectedBrandVoices,
    setSelectedBrandVoices,
    showTestResponse,
    setShowTestResponse,
    showInstructions,
    setShowInstructions,

    // Loading states
    isGeneratingPrompt,
    isGeneratingResponse,
    isImprovingPrompt,
    isSavingPrompt,

    // API Functions
    generatePromptFromServer,
    generateResponseFromServer,
    improvePromptFromServer,
    savePromptToLibrary,

    // Helper functions
    getAuthHeaders,
    handlePromptGenerated,
    handleTestComplete,
    handleEvaluationComplete,
    handleImprove,
    referencesUsage,
    setReferencesUsage,
    clearFormData,
    loadPromptData,
    restoreUIState,
  };

  return (
    <PromptEngContext.Provider value={value}>
      {children}
    </PromptEngContext.Provider>
  );
};

export const usePromptEng = () => {
  const context = useContext(PromptEngContext);
  if (!context) {
    throw new Error("usePromptEng must be used within a PromptEngProvider");
  }
  return context;
};

export type { EvaluationData };