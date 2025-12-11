"use client";
import React, { useState, useEffect } from "react";
import { X, Save, BookOpen, AlertCircle, Plus, Loader2 } from "lucide-react";

interface SavePromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, projectName: string) => Promise<void>;
  isLoading?: boolean;
}

const SavePromptModal: React.FC<SavePromptModalProps> = ({
  isOpen,
  onClose,
  onSave,
  isLoading = false
}) => {
  const [title, setTitle] = useState("");
  const [selectedProject, setSelectedProject] = useState("My Prompts");
  const [projects, setProjects] = useState<string[]>([]);
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [error, setError] = useState("");
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  // Fetch projects when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchProjects();
    }
  }, [isOpen]);

  const fetchProjects = async () => {
    setIsLoadingProjects(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        const fetchedProjects = data.projects || ["My Prompts"];
        setProjects(fetchedProjects);
        
        // Always set to first project from list, or "My Prompts" as fallback
        setSelectedProject(fetchedProjects[0] || "My Prompts");
      } else {
        // If API fails, set defaults
        setProjects(["My Prompts"]);
        setSelectedProject("My Prompts");
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
      setProjects(["My Prompts"]);
      setSelectedProject("My Prompts");
    } finally {
      setIsLoadingProjects(false);
    }
  };

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) {
      setError("Please enter a project name");
      return;
    }

    if (newProjectName.length > 100) {
      setError("Project name must be less than 100 characters");
      return;
    }

    console.log("🆕 Creating new project:", newProjectName.trim());
    setIsCreatingProject(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ projectName: newProjectName.trim() }),
      });

      console.log("📡 Create project response status:", res.status);

      if (res.ok) {
        const data = await res.json();
        console.log("✅ Project created successfully:", data);
        setProjects(data.projects);
        setSelectedProject(newProjectName.trim());
        setNewProjectName("");
        setShowNewProject(false);
        setError("");
      } else {
        const data = await res.json();
        console.error("❌ Failed to create project:", data);
        setError(data.error || "Failed to create project");
      }
    } catch (err: any) {
      console.error("❌ Error creating project:", err);
      setError(err.message || "Failed to create project");
    } finally {
      setIsCreatingProject(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError("Please enter a title for your prompt");
      return;
    }

    if (title.length > 200) {
      setError("Title must be less than 200 characters");
      return;
    }

    console.log("💾 Saving prompt with:", { title: title.trim(), project: selectedProject });

    try {
      setError("");
      await onSave(title.trim(), selectedProject);
      setTitle("");
      setSelectedProject("My Prompts");
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to save prompt");
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setTitle("");
      setError("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-ivory rounded-xl border-2 border-gold/30 shadow-2xl w-full max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gold/20">
          <div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-ivory" />
              </div>
              <h2 className="text-xl font-bold text-black">
                Well done - you brought your idea to life.
              </h2>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Save it to your library and keep building momentum, one prompt at a time.
            </p>
          </div>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="w-8 h-8 rounded-full hover:bg-gold/10 flex items-center justify-center text-gray transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label 
              htmlFor="promptTitle" 
              className="block text-sm font-medium text-black mb-2"
            >
              Prompt Title <span className="text-red-500">*</span>
            </label>
            <input
              id="promptTitle"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError("");
              }}
              placeholder="Enter a descriptive title for your prompt..."
              className="w-full px-4 py-3 border border-gold/30 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
              maxLength={200}
              disabled={isLoading}
              autoFocus
            />
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-gray-600">
                {title.length}/100 characters
              </span>
            </div>
          </div>

          {/* Project Selection */}
          <div>
            <label 
              htmlFor="projectSelect" 
              className="block text-sm font-medium text-black mb-2"
            >
              Select Project <span className="text-red-500">*</span>
            </label>
            
            {isLoadingProjects ? (
              <div className="flex items-center justify-center py-3 border border-gold/30 rounded-lg bg-white">
                <Loader2 className="w-4 h-4 animate-spin text-gold mr-2" />
                <span className="text-sm text-gray-600">Loading projects...</span>
              </div>
            ) : (
              <>
                <div className="flex gap-2">
                  <select
                    id="projectSelect"
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gold/30 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                    disabled={isLoading || isCreatingProject}
                  >
                    {projects.map((project) => (
                      <option key={project} value={project}>
                        {project}
                      </option>
                    ))}
                  </select>
                  
                  <button
                    type="button"
                    onClick={() => setShowNewProject(!showNewProject)}
                    className="px-3 py-2 border border-gold/30 rounded-lg bg-white hover:bg-gold/5 transition-colors flex items-center justify-center"
                    disabled={isLoading || isCreatingProject}
                    title="Create new project"
                  >
                    <Plus className="w-5 h-5 text-gold" />
                  </button>
                </div>

                {/* New Project Input */}
                {showNewProject && (
                  <div className="mt-3 p-3 border border-gold/30 rounded-lg bg-gold/5">
                    <label className="block text-sm font-medium text-black mb-2">
                      New Project Name
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newProjectName}
                        onChange={(e) => {
                          setNewProjectName(e.target.value);
                          if (error) setError("");
                        }}
                        placeholder="Enter project name..."
                        className="flex-1 px-3 py-2 border border-gold/30 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold text-sm"
                        maxLength={100}
                        disabled={isCreatingProject}
                      />
                      <button
                        type="button"
                        onClick={handleCreateProject}
                        disabled={isCreatingProject || !newProjectName.trim()}
                        className="px-4 py-2 bg-gold text-ivory rounded-lg hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm font-medium"
                      >
                        {isCreatingProject ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Creating...</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>Create</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowNewProject(false);
                          setNewProjectName("");
                          if (error) setError("");
                        }}
                        className="px-3 py-2 border border-gold/30 rounded-lg bg-white hover:bg-gray-100 transition-colors text-sm"
                        disabled={isCreatingProject}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {error && (
            <div className="flex items-start space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* <div className="bg-gold/10 border border-gold/20 rounded-lg p-4">
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong>What gets saved:</strong> Your complete prompt , 
              all form data, context, format settings, and AI response (if generated).
            </p>
          </div> */}

          {/* Footer Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 px-6 py-3 border border-gold/30 rounded-lg text-gray font-medium hover:bg-gold/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !title.trim()}
              className="flex-1 px-6 py-3 bg-gold text-ivory font-medium rounded-lg hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-ivory/30 border-t-ivory rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save to Library</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SavePromptModal;