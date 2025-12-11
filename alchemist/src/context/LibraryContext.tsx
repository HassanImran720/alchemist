"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export interface PromptItem {
  _id: string;
  title: string;
  bestScore?: number;
  project: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  usageCount: number;
}

export interface GroupedPrompts {
  [projectName: string]: PromptItem[];
}

interface LibraryContextType {
  // State
  projects: string[];
  groupedPrompts: GroupedPrompts;
  selectedProject: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchProjects: () => Promise<void>;
  fetchPromptsByProject: (projectName: string) => Promise<PromptItem[]>;
  fetchPromptDetails: (promptId: string) => Promise<any>;
  selectProject: (projectName: string | null) => void;
  refreshLibrary: () => Promise<void>;
  createPrompt: (promptData: any) => Promise<boolean>;
  deletePrompt: (promptId: string) => Promise<boolean>;
  createProject: (projectName: string) => Promise<boolean>;
  deleteProject: (projectName: string) => Promise<{ success: boolean; deletedPrompts?: number }>;
  renameProject: (oldName: string, newName: string) => Promise<{ success: boolean; updatedPrompts?: number }>;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

// Provider Props
interface LibraryProviderProps {
  children: ReactNode;
}

export const LibraryProvider: React.FC<LibraryProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState<string[]>([]);
  const [groupedPrompts, setGroupedPrompts] = useState<GroupedPrompts>({});
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all projects and grouped prompts
  const fetchProjects = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("📚 Fetching library data...");
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }
      
      const response = await fetch('/api/prompt-library', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch library: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setProjects(data.projects || []);
        setGroupedPrompts(data.groupedPrompts || {});
        console.log("✅ Library data loaded:", {
          projects: data.projects?.length,
          totalPrompts: data.totalPrompts
        });
      } else {
        throw new Error(data.error || 'Failed to fetch library data');
      }
      
    } catch (err: any) {
      console.error("❌ Error fetching library:", err);
      setError(err.message || 'Failed to load library');
      setProjects([]);
      setGroupedPrompts({});
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch prompts for a specific project
  const fetchPromptsByProject = async (projectName: string): Promise<PromptItem[]> => {
    setError(null);
    
    try {
      console.log("📁 Fetching prompts for project:", projectName);
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }
      
      const response = await fetch(`/api/prompt-library?project=${encodeURIComponent(projectName)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch project prompts: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        // Update the grouped prompts for this project
        setGroupedPrompts(prev => ({
          ...prev,
          [projectName]: data.prompts || []
        }));
        
        console.log(`✅ Loaded ${data.prompts?.length || 0} prompts for project: ${projectName}`);
        return data.prompts || [];
      } else {
        throw new Error(data.error || 'Failed to fetch project prompts');
      }
      
    } catch (err: any) {
      console.error("❌ Error fetching project prompts:", err);
      setError(err.message || 'Failed to load project prompts');
      return [];
    }
  };

  // Select a project
  const selectProject = (projectName: string | null) => {
    setSelectedProject(projectName);
    
    // If selecting a project that we haven't loaded prompts for yet, fetch them
    if (projectName && (!groupedPrompts[projectName] || groupedPrompts[projectName].length === 0)) {
      fetchPromptsByProject(projectName);
    }
  };

  // Fetch detailed data for a specific prompt
  const fetchPromptDetails = async (promptId: string): Promise<any> => {
    setError(null);
    
    try {
      console.log("📄 Fetching prompt details:", promptId);
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }
      
      const response = await fetch(`/api/prompt-library/${promptId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch prompt details: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        console.log("✅ Prompt details loaded");
        return data.prompt;
      } else {
        throw new Error(data.error || 'Failed to fetch prompt details');
      }
      
    } catch (err: any) {
      console.error("❌ Error fetching prompt details:", err);
      setError(err.message || 'Failed to load prompt details');
      return null;
    }
  };

  // Refresh the entire library
  const refreshLibrary = async () => {
    await fetchProjects();
  };

  // Create a new prompt
  const createPrompt = async (promptData: any): Promise<boolean> => {
    setError(null);
    
    try {
      console.log("➕ Creating new prompt:", promptData.title);
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }
      
      const response = await fetch('/api/prompt-library', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(promptData)
      });

      if (!response.ok) {
        throw new Error(`Failed to create prompt: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        console.log("✅ Prompt created successfully");
        // Refresh the library to show the new prompt
        await refreshLibrary();
        return true;
      } else {
        throw new Error(data.error || 'Failed to create prompt');
      }
      
    } catch (err: any) {
      console.error("❌ Error creating prompt:", err);
      setError(err.message || 'Failed to create prompt');
      return false;
    }
  };

  // Delete a prompt
  const deletePrompt = async (promptId: string): Promise<boolean> => {
    setError(null);
    
    try {
      console.log("🗑️ Deleting prompt:", promptId);
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }
      
      const response = await fetch(`/api/prompt-library?id=${promptId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`Failed to delete prompt: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        console.log("✅ Prompt deleted successfully");
        // Refresh the library to update the list
        await refreshLibrary();
        return true;
      } else {
        throw new Error(data.error || 'Failed to delete prompt');
      }
      
    } catch (err: any) {
      console.error("❌ Error deleting prompt:", err);
      setError(err.message || 'Failed to delete prompt');
      return false;
    }
  };

  // Create a new project
  const createProject = async (projectName: string): Promise<boolean> => {
    setError(null);
    
    try {
      console.log("➕ Creating new project:", projectName);
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }
      
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({ projectName })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to create project: ${response.status}`);
      }

      const data = await response.json();
      
      console.log("✅ Project created successfully");
      // Refresh the library to show the new project
      await refreshLibrary();
      return true;
      
    } catch (err: any) {
      console.error("❌ Error creating project:", err);
      setError(err.message || 'Failed to create project');
      return false;
    }
  };

  // Delete a project and all associated prompts
  const deleteProject = async (projectName: string): Promise<{ success: boolean; deletedPrompts?: number }> => {
    setError(null);
    
    try {
      console.log("🗑️ Deleting project:", projectName);
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }
      
      const response = await fetch(`/api/projects?name=${encodeURIComponent(projectName)}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to delete project: ${response.status}`);
      }

      const data = await response.json();
      
      console.log(`✅ Project deleted successfully. ${data.deletedPrompts || 0} prompts removed.`);
      // Refresh the library to update the list
      await refreshLibrary();
      return { success: true, deletedPrompts: data.deletedPrompts };
      
    } catch (err: any) {
      console.error("❌ Error deleting project:", err);
      setError(err.message || 'Failed to delete project');
      return { success: false };
    }
  };

  // Rename a project and update all associated prompts
  const renameProject = async (oldName: string, newName: string): Promise<{ success: boolean; updatedPrompts?: number }> => {
    setError(null);
    
    try {
      console.log("✏️ Renaming project:", oldName, "->", newName);
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }
      
      const response = await fetch('/api/projects', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({ oldName, newName })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to rename project: ${response.status}`);
      }

      const data = await response.json();
      
      console.log(`✅ Project renamed successfully. ${data.updatedPrompts || 0} prompts updated.`);
      // Refresh the library to show the updated project name
      await refreshLibrary();
      return { success: true, updatedPrompts: data.updatedPrompts };
      
    } catch (err: any) {
      console.error("❌ Error renaming project:", err);
      setError(err.message || 'Failed to rename project');
      return { success: false };
    }
  };

  // Load projects on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const value: LibraryContextType = {
    // State
    projects,
    groupedPrompts,
    selectedProject,
    isLoading,
    error,
    
    // Actions
    fetchProjects,
    fetchPromptsByProject,
    fetchPromptDetails,
    selectProject,
    refreshLibrary,
    createPrompt,
    deletePrompt,
    createProject,
    deleteProject,
    renameProject
  };

  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  );
};

// Hook to use the context
export const useLibrary = (): LibraryContextType => {
  const context = useContext(LibraryContext);
  if (context === undefined) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};

export default LibraryContext;
