"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

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

interface PromptEngContextType {
  // State
  taskObjective: string;
  setTaskObjective: (value: string) => void;
  selectedContext: "flowmode" | "guidedmode" | null;
  setSelectedContext: (value: "flowmode" | "guidedmode" | null) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  contextData: ContextData;
  setContextData: (value: ContextData) => void;
  insertReferences: string;
  setInsertReferences: (value: string) => void;
  references: string;
  setReferences: (value: string) => void;
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
  generatedPrompt: string;
  setGeneratedPrompt: (value: string) => void;
  aiResponse: string;
  setAiResponse: (value: string) => void;
  evaluation: EvaluationData | null;
  setEvaluation: (value: EvaluationData | null) => void;
  toneData: string[];
  setToneData: (value: string[]) => void;
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
  generateResponseFromServer: (prompt?: string) => Promise<string | undefined>;
  improvePromptFromServer: (evaluationData: any) => Promise<string>;
  savePromptToLibrary: (title: string) => Promise<void>;

  // Helper functions
  getAuthHeaders: () => Record<string, string>;
  handlePromptGenerated: (prompt: string) => void;
  handleTestComplete: (response: string) => void;
  handleEvaluationComplete: (evaluationData: EvaluationData) => void;
  handleImprove: (improvedPrompt: string) => void;
}

const PromptEngContext = createContext<PromptEngContextType | undefined>(undefined);

export const PromptEngProvider = ({ children }: { children: ReactNode }) => {
  
  // State declarations
  const [taskObjective, setTaskObjective] = useState("");
  const [selectedContext, setSelectedContext] = useState<"flowmode" | "guidedmode" | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [contextData, setContextData] = useState<ContextData>({});
  const [insertReferences, setInsertReferences] = useState("");
  const [references, setReferences] = useState("");
  const [outputFormat, setOutputFormat] = useState("");
  const [promptStructure, setPromptStructure] = useState("");
  const [length, setLength] = useState("");
  const [includeEmojis, setIncludeEmojis] = useState(false);
  const [selectedModel, setSelectedModel] = useState("chatgpt");
  const [showOutputForm, setShowOutputForm] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [evaluation, setEvaluation] = useState<EvaluationData | null>(null);
  const [toneData, setToneData] = useState<string[]>([]);
  const [showTestResponse, setShowTestResponse] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  // Loading states
  const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);
  const [isImprovingPrompt, setIsImprovingPrompt] = useState(false);
  const [isSavingPrompt, setIsSavingPrompt] = useState(false);

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
        mode: selectedContext === "flowmode" ? "flow" : "guided",
        schema: selectedContext === "guidedmode" ? "sales" : "content",
        task: taskObjective,
        contextData,
        fields: contextData?.dynamicFields || {},
        insertReferences,
        references,
        format: outputFormat,
        toneData,
        promptStructure,
        length,
        selectedCategory, // Add the selected category for guided mode
        includeEmojis, // Add the emoji setting
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
      handlePromptGenerated(prompt);
      return prompt;
    } catch (err: any) {
      console.error("generatePrompt error", err);
      throw err;
    } finally {
      setIsGeneratingPrompt(false);
    }
  };

  const generateResponseFromServer = async (prompt?: string): Promise<string | undefined> => {
    try {
      setIsGeneratingResponse(true);
      
      const sendPrompt = prompt || generatedPrompt;
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
      setAiResponse(responseText);
      setShowTestResponse(true);
      return responseText;
    } catch (err: any) {
      console.error("generateResponse error", err);
      throw err;
    } finally {
      setIsGeneratingResponse(false);
    }
  };

  const improvePromptFromServer = async (evaluationData: any): Promise<string> => {
    try {
      setIsImprovingPrompt(true);
      
      const body = {
        originalPrompt: generatedPrompt,
        evaluation: evaluationData,
        references,
        format: outputFormat,
        // include current AI response and task objective and the selected prompt structure
        aiResponse,
        taskObjective,
        promptStructure,
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
      if (newPrompt) {
        setGeneratedPrompt(newPrompt);
        setAiResponse('');
        setShowTestResponse(false);
      }
      return newPrompt;
    } catch (err: any) {
      console.error('improvePrompt error', err);
      throw err;
    } finally {
      setIsImprovingPrompt(false);
    }
  };

  const savePromptToLibrary = async (title: string): Promise<void> => {
    try {
      setIsSavingPrompt(true);
      
      // Extract raw and refined prompts from combined content
      let rawPrompt = "";
      let refinedPrompt = "";
      
      if (generatedPrompt) {
        const parts = generatedPrompt.split("**REFINED PROMPT:**");
        if (parts.length === 2) {
          rawPrompt = parts[0].replace("**RAW PROMPT:**", "").trim();
          refinedPrompt = parts[1].trim();
        } else {
          // If no split format, check if it's a flow mode prompt (no raw/refined split)
          if (selectedContext === "flowmode") {
            rawPrompt = generatedPrompt; // In flow mode, the full content is the raw prompt
            refinedPrompt = generatedPrompt; // Same content for both
          } else {
            // Use entire content as refined if no clear split
            rawPrompt = generatedPrompt;
            refinedPrompt = generatedPrompt;
          }
        }
      }

      const body = {
        title,
        // rawPrompt,
        // refinedPrompt,
        fullPromptContent: generatedPrompt || "",
        taskObjective,
        mode: selectedContext === "flowmode" ? "flow" : "guided",
        // For guided mode, save the selected category if provided. Otherwise fallback to a sensible default.
        promptSchema:
          selectedContext === "guidedmode"
            ? (selectedCategory || "sales")
            : "content",
        contextData,
        insertReferences,
        references,
        outputFormat,
        promptStructure,
        length,
        toneData,
  // include evaluation and numeric total score if available
  evaluation,
  totalScore: evaluation ? (evaluation.totalScore || 0) : undefined,
        aiResponse,
        // Save the actual model selected by the user (chatgpt, gemini, or specific model id)
        aiModel: selectedModel || "chatgpt",
        project: "Default Project",
        notes: "",
        tags: []
      };

      console.log("📤 Sending save request with body:", JSON.stringify(body, null, 2));

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
      
      console.log("✅ Prompt saved to library:", data.title);
      
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
    selectedContext,
    setSelectedContext,
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
    generatedPrompt,
    setGeneratedPrompt,
    aiResponse,
    setAiResponse,
    evaluation,
    setEvaluation,
    toneData,
    setToneData,
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