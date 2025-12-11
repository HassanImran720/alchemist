"use client";
import React, { useState, useEffect } from "react";
import { Search, Edit, Clock, ChevronDown, ChevronRight, Eye, Trash2, Folder, X, Plus, Edit2, Edit3 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLibrary } from "../../context/LibraryContext";

const PromptLibrary: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());
  const [selectedPrompt, setSelectedPrompt] = useState<any>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [promptToDelete, setPromptToDelete] = useState<any>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [projectError, setProjectError] = useState("");
  
  // New states for rename and delete project
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);
  const [projectToRename, setProjectToRename] = useState("");
  const [projectToDelete, setProjectToDelete] = useState("");
  const [renamedProjectName, setRenamedProjectName] = useState("");
  const [isRenamingProject, setIsRenamingProject] = useState(false);
  const [isDeletingProject, setIsDeletingProject] = useState(false);
  
  const {
    projects,
    groupedPrompts,
    selectedProject,
    isLoading,
    error,
    selectProject,
    fetchPromptsByProject,
    fetchPromptDetails,
    refreshLibrary,
    deletePrompt,
    createProject,
    deleteProject,
    renameProject
  } = useLibrary();

  // Toggle project expansion
  const toggleProject = async (projectName: string) => {
    const newExpanded = new Set(expandedProjects);
    
    if (expandedProjects.has(projectName)) {
      newExpanded.delete(projectName);
    } else {
      newExpanded.add(projectName);
      // Fetch prompts for this project if not already loaded
      if (!groupedPrompts[projectName] || groupedPrompts[projectName].length === 0) {
        await fetchPromptsByProject(projectName);
      }
    }
    
    setExpandedProjects(newExpanded);
  };

  // Filter prompts based on search term
  const filterPrompts = (prompts: any[]) => {
    if (!searchTerm) return prompts;
    return prompts.filter(prompt => 
      prompt.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.notes?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Auto-expand projects that have matching search results
  useEffect(() => {
    if (searchTerm && searchTerm.trim().length > 0) {
      const projectsWithMatches = new Set<string>();
      
      projects.forEach(projectName => {
        const projectPrompts = groupedPrompts[projectName] || [];
        const hasMatch = projectPrompts.some(prompt => 
          prompt.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prompt.notes?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        if (hasMatch) {
          projectsWithMatches.add(projectName);
        }
      });
      
      setExpandedProjects(projectsWithMatches);
    }
  }, [searchTerm, projects, groupedPrompts]);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Handle view prompt - fetch detailed data
  const handleViewPrompt = async (prompt: any) => {
    setIsLoadingDetails(true);
    setShowViewModal(true);
    
    try {
      const detailedPrompt = await fetchPromptDetails(prompt._id);
      if (detailedPrompt) {
        setSelectedPrompt(detailedPrompt);
      } else {
        setSelectedPrompt(prompt); // Fallback to basic data
      }
    } catch (error) {
      console.error("Error fetching prompt details:", error);
      setSelectedPrompt(prompt); // Fallback to basic data
    } finally {
      setIsLoadingDetails(false);
    }
  };

  // Handle delete prompt
  const handleDeletePrompt = (prompt: any) => {
    setPromptToDelete(prompt);
    setShowDeleteModal(true);
  };

  // Handle edit prompt - navigate to lab with prompt data
  const handleEditPrompt = async (prompt: any) => {
    try {
      console.log("✏️ Edit button clicked for prompt:", prompt.title);
      
      // Fetch full prompt details if we only have summary
      const detailedPrompt = await fetchPromptDetails(prompt._id);
      const promptToEdit = detailedPrompt || prompt;
      
      console.log("📦 Prompt details fetched:", {
        title: promptToEdit.title,
        iterations: promptToEdit.iterations?.length || 0,
        hasContextData: !!promptToEdit.contextData,
        category: promptToEdit.category
      });
      
      // Store the prompt data in localStorage for the lab to pick up
      localStorage.setItem('promptToEdit', JSON.stringify(promptToEdit));
      console.log("💾 Prompt data saved to localStorage");
      
      // Navigate to lab
      console.log("🚀 Navigating to lab...");
      router.push('/lab');
    } catch (error) {
      console.error("❌ Error loading prompt for editing:", error);
      alert("Failed to load prompt for editing. Please try again.");
    }
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!promptToDelete) return;
    
    try {
      const success = await deletePrompt(promptToDelete._id);
      
      if (success) {
        setShowDeleteModal(false);
        setPromptToDelete(null);
      }
    } catch (error) {
      console.error("Error deleting prompt:", error);
    }
  };

  // Handle add project
  const handleAddProject = async () => {
    if (!newProjectName.trim()) {
      setProjectError("Project name is required");
      return;
    }

    setIsCreatingProject(true);
    setProjectError("");

    try {
      const success = await createProject(newProjectName.trim());

      if (success) {
        // Close modal and reset
        setShowAddProjectModal(false);
        setNewProjectName("");
        setProjectError("");
      } else {
        setProjectError("Failed to create project. Please try again.");
      }
    } catch (error: any) {
      console.error("❌ Error creating project:", error);
      setProjectError(error.message || "Failed to create project");
    } finally {
      setIsCreatingProject(false);
    }
  };

  // Handle rename project
  const handleRenameProject = (projectName: string) => {
    setProjectToRename(projectName);
    setRenamedProjectName(projectName);
    setShowRenameModal(true);
    setProjectError("");
  };

  const confirmRenameProject = async () => {
    if (!renamedProjectName.trim()) {
      setProjectError("Project name is required");
      return;
    }

    if (renamedProjectName.trim() === projectToRename) {
      setProjectError("New name must be different from the current name");
      return;
    }

    setIsRenamingProject(true);
    setProjectError("");

    try {
      const result = await renameProject(projectToRename, renamedProjectName.trim());

      if (result.success) {
        console.log(`✅ Project renamed. ${result.updatedPrompts || 0} prompts updated.`);
        setShowRenameModal(false);
        setProjectToRename("");
        setRenamedProjectName("");
        setProjectError("");
      } else {
        setProjectError("Failed to rename project. Please try again.");
      }
    } catch (error: any) {
      console.error("❌ Error renaming project:", error);
      setProjectError(error.message || "Failed to rename project");
    } finally {
      setIsRenamingProject(false);
    }
  };

  // Handle delete project
  const handleDeleteProject = (projectName: string) => {
    setProjectToDelete(projectName);
    setShowDeleteProjectModal(true);
  };

  const confirmDeleteProject = async () => {
    if (!projectToDelete) return;

    setIsDeletingProject(true);

    try {
      const result = await deleteProject(projectToDelete);

      if (result.success) {
        console.log(`✅ Project deleted. ${result.deletedPrompts || 0} prompts removed.`);
        setShowDeleteProjectModal(false);
        setProjectToDelete("");
      }
    } catch (error: any) {
      console.error("❌ Error deleting project:", error);
    } finally {
      setIsDeletingProject(false);
    }
  };

  if (isLoading && projects.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-[10.875rem] py-10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto"></div>
          <p className="mt-4 text-gray">Loading prompt library...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-[10.875rem] py-10 space-y-6">
      {/* Header */}
      <div className="text-center lg:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-black font-heading mb-2">
          PROMPT LIBRARY
        </h1>
        <div className="flex justify-between items-center mt-4">
          <p className="text-gray">Organize your prompts by projects</p>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowAddProjectModal(true)}
              className="bg-gold text-white px-4 py-2 rounded-md hover:bg-gold/90 transition-colors text-sm flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Project
            </button>
            <button 
              onClick={refreshLibrary}
              className="text-gold hover:text-gold/80 transition-colors text-sm"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div>
        <div className="relative w-full max-w-full sm:max-w-xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray" />
          <input
            type="text"
            placeholder="Search prompts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((projectName) => {
          const isExpanded = expandedProjects.has(projectName);
          const projectPrompts = groupedPrompts[projectName] || [];
          const filteredPrompts = filterPrompts(projectPrompts);
          
          return (
            <div key={projectName} className="border border-gold/20 rounded-lg overflow-hidden">
              {/* Project Header */}
              <div 
                className="bg-gold/5 px-6 py-4 hover:bg-gold/10 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div 
                    className="flex items-center space-x-3 cursor-pointer flex-1"
                    onClick={() => toggleProject(projectName)}
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-gold" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gold" />
                    )}
                    <Folder className="w-5 h-5 text-gold" />
                    <h3 className="text-lg font-semibold text-black">{projectName}</h3>
                    <span className="bg-gold/20 text-gold px-2 py-1 rounded-full text-xs">
                      {projectPrompts.length} prompts
                    </span>
                  </div>
                  
                  {/* Project Actions - Only show if not "My Prompts" */}
                  {projectName.toLowerCase() !== 'my prompts' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRenameProject(projectName);
                        }}
                        className="text-gray hover:text-blue-600 transition-colors p-2"
                        title="Rename Project"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteProject(projectName);
                        }}
                        className="text-gray hover:text-red-600 transition-colors p-2"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Project Prompts */}
              {isExpanded && (
                <div className="border-t border-gold/20">
                  {filteredPrompts.length > 0 ? (
                    <>
                      {/* Table Header - Desktop */}
                      <div className="hidden md:block bg-gray/5 px-6 py-3 border-b border-gold/10">
                        <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray uppercase tracking-wide">
                          <div>Prompt Name</div>
                          <div>Iterations</div>
                          <div>Best Score</div>
                          <div>Created</div>
                          <div>Actions</div>
                          <div>Notes</div>
                        </div>
                      </div>

                      {/* Prompt Rows */}
                      <div className="divide-y divide-gold/10">
                        {filteredPrompts.map((prompt) => (
                          <div
                            key={prompt._id}
                            className="px-6 py-4 hover:bg-gray/5 transition-colors"
                          >
                            {/* Desktop view */}
                            <div className="hidden md:grid grid-cols-6 gap-4 items-center">
                              <div className="text-black font-medium truncate">
                                {prompt.title}
                              </div>
                              <div className="text-gray text-sm">
                                {(prompt as any).iterations?.length || 0} iteration{(prompt as any).iterations?.length !== 1 ? 's' : ''}
                              </div>
                              <div className="text-black font-medium">
                                {prompt.bestScore ? `${prompt.bestScore}/100` : '-'}
                              </div>
                              <div className="text-gray text-sm">
                                {formatDate(prompt.createdAt)}
                              </div>
                              <div className="flex space-x-2">
                                <button 
                                  onClick={() => handleViewPrompt(prompt)}
                                  className="text-gray hover:text-gold transition-colors"
                                  title="View Prompt"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => handleEditPrompt(prompt)}
                                  className="text-gray hover:text-blue-600 transition-colors"
                                  title="Edit Prompt"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => handleDeletePrompt(prompt)}
                                  className="text-gray hover:text-red-600 transition-colors"
                                  title="Delete Prompt"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="text-gray text-sm truncate">
                                {prompt.notes || 'No notes'}
                              </div>
                            </div>

                            {/* Mobile view */}
                            <div className="md:hidden space-y-2 border-l-4 border-gold pl-3">
                              <div className="font-medium text-black">{prompt.title}</div>
                              <div className="text-gray text-sm">
                                Iterations: {(prompt as any).iterations?.length || 0}
                              </div>
                              <div className="text-black font-medium">
                                Best Score: {prompt.bestScore ? `${prompt.bestScore}/100` : '-'}
                              </div>
                              <div className="text-gray text-sm">
                                Created: {formatDate(prompt.createdAt)}
                              </div>
                              <div className="flex flex-wrap gap-3">
                                <button 
                                  onClick={() => handleViewPrompt(prompt)}
                                  className="text-gray hover:text-gold transition-colors flex items-center gap-1"
                                >
                                  <Eye className="w-4 h-4" /> View
                                </button>
                                <button 
                                  onClick={() => handleEditPrompt(prompt)}
                                  className="text-gray hover:text-blue-600 transition-colors flex items-center gap-1"
                                >
                                  <Edit2 className="w-4 h-4" /> Edit
                                </button>
                                <button 
                                  onClick={() => handleDeletePrompt(prompt)}
                                  className="text-gray hover:text-red-600 transition-colors flex items-center gap-1"
                                >
                                  <Trash2 className="w-4 h-4" /> Delete
                                </button>
                              </div>
                              {prompt.notes && (
                                <div className="text-gray text-sm">{prompt.notes}</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="px-6 py-8 text-center">
                      <div className="text-gray mb-4">
                        {searchTerm ? 'No prompts found matching your search' : 'No prompts in this project yet'}
                      </div>
                      {!searchTerm && (
                        <button 
                          onClick={() => router.push('/lab')}
                          className="bg-gold text-white px-4 py-2 rounded-md hover:bg-gold/90 transition-colors text-sm"
                        >
                          Create Your First Prompt
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {projects.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="text-gray mb-4">No projects found</div>
          <button 
            onClick={() => setShowAddProjectModal(true)}
            className="bg-gold text-white px-6 py-2 rounded-md hover:bg-gold/90 transition-colors w-full sm:w-auto"
          >
            Create Your First Project
          </button>
        </div>
      )}

      {/* View Prompt Modal */}
      {showViewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gold/20 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-black">Prompt Details</h2>
              <button 
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedPrompt(null);
                }}
                className="text-gray hover:text-gold transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {isLoadingDetails ? (
              <div className="p-12 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto"></div>
                <p className="mt-4 text-gray">Loading prompt details...</p>
              </div>
            ) : selectedPrompt ? (
              <div className="p-6 space-y-6">
                {/* Basic Info */}
                <div>
                  <h3 className="text-sm font-semibold text-gray uppercase mb-2">Title</h3>
                  <p className="text-black text-lg">{selectedPrompt.title}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray uppercase mb-1">Project</h3>
                    <p className="text-black">{selectedPrompt.project}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray uppercase mb-1">Category</h3>
                    <p className="text-black capitalize">
                      {selectedPrompt.category || 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray uppercase mb-1">Best Score</h3>
                    <p className="text-black font-semibold text-lg">
                      {selectedPrompt.bestScore ? `${selectedPrompt.bestScore}/100` : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray uppercase mb-1">Iterations</h3>
                    <p className="text-black">{selectedPrompt.iterations?.length || 0}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray uppercase mb-1">Usage Count</h3>
                    <p className="text-black">{selectedPrompt.usageCount || 0}</p>
                  </div>
                </div>

                {/* Task Objective */}
                {selectedPrompt.taskObjective && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray uppercase mb-2">Task Objective</h3>
                    <p className="text-black">{selectedPrompt.taskObjective}</p>
                  </div>
                )}

                {/* ✅ Iterations Display */}
                {selectedPrompt.iterations && selectedPrompt.iterations.length > 0 && (
                  <div className="border-t border-gold/20 pt-4">
                    <h3 className="text-sm font-semibold text-gray uppercase mb-3">
                      Iteration History ({selectedPrompt.iterations.length} iteration{selectedPrompt.iterations.length > 1 ? 's' : ''})
                    </h3>
                    <div className="space-y-3">
                      {selectedPrompt.iterations.map((iteration: any, index: number) => (
                        <div key={index} className="border border-gold/20 rounded-lg overflow-hidden">
                          {/* Iteration Header */}
                          <div className="bg-gold/10 px-4 py-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-gold text-white flex items-center justify-center text-xs font-bold">
                                {iteration.iterationNumber || index + 1}
                              </div>
                              <span className="text-sm font-semibold text-black">
                                Iteration {iteration.iterationNumber || index + 1}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              {iteration.aiModel && (
                                <span className="text-xs text-gray bg-white px-2 py-1 rounded">
                                  {iteration.aiModel}
                                </span>
                              )}
                              {iteration.promptStructure && (
                                <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                  {iteration.promptStructure}
                                </span>
                              )}
                              {iteration.evaluation && iteration.evaluation.totalScore && (
                                <span className={`text-xs font-semibold px-2 py-1 rounded ${
                                  iteration.evaluation.totalScore >= 90 
                                    ? 'bg-green-100 text-green-700'
                                    : iteration.evaluation.totalScore >= 70
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-red-100 text-red-700'
                                }`}>
                                  Score: {iteration.evaluation.totalScore}/100
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Iteration Content */}
                          <div className="p-4 space-y-3">
                            {/* Prompt */}
                            {iteration.prompt && (
                              <div>
                                <h4 className="text-xs font-semibold text-gray uppercase mb-1">Prompt</h4>
                                <div className="bg-gray/5 rounded p-2 max-h-32 overflow-y-auto">
                                  <p className="text-xs text-black whitespace-pre-wrap">{iteration.prompt}</p>
                                </div>
                              </div>
                            )}

                            {/* Response */}
                            {iteration.response && (
                              <div>
                                <h4 className="text-xs font-semibold text-gray uppercase mb-1">AI Response</h4>
                                <div className="bg-blue-50 rounded p-2 max-h-32 overflow-y-auto">
                                  <p className="text-xs text-black whitespace-pre-wrap">{iteration.response}</p>
                                </div>
                              </div>
                            )}

                            {/* Evaluation Details */}
                            {iteration.evaluation && (
                              <div>
                                <h4 className="text-xs font-semibold text-gray uppercase mb-1">Evaluation</h4>
                                <div className="bg-yellow-50 rounded p-2 space-y-1">
                                  {iteration.evaluation.inputs && Object.keys(iteration.evaluation.inputs).length > 0 && (
                                    <div>
                                      <p className="text-xs font-medium text-gray mb-1">Input Issues:</p>
                                      <div className="space-y-1">
                                        {Object.entries(iteration.evaluation.inputs).map(([key, value]: [string, any]) => (
                                          <div key={key} className="text-xs">
                                            <span className="font-medium">{key}:</span>{' '}
                                            <span className={
                                              value.status === 'No Issues' 
                                                ? 'text-green-700'
                                                : value.status === 'Minor Issues'
                                                ? 'text-yellow-700'
                                                : 'text-red-700'
                                            }>
                                              {value.status}
                                            </span>
                                            {value.issues && value.issues.length > 0 && (
                                              <span className="text-gray ml-1">
                                                ({value.issues.join(', ')})
                                              </span>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  {iteration.evaluation.notes && (
                                    <p className="text-xs text-gray mt-2">
                                      <span className="font-medium">Notes:</span> {iteration.evaluation.notes}
                                    </p>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Timestamp */}
                            {iteration.timestamp && (
                              <div className="text-xs text-gray">
                                {formatDate(iteration.timestamp)}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Output Configuration */}
                <div className="grid grid-cols-2 gap-4">
                  {selectedPrompt.outputFormat && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray uppercase mb-1">Output Format</h3>
                      <p className="text-black capitalize">{selectedPrompt.outputFormat}</p>
                    </div>
                  )}
                  {selectedPrompt.length && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray uppercase mb-1">Length</h3>
                      <p className="text-black">{selectedPrompt.length}</p>
                    </div>
                  )}
                </div>

                {/* Tone Data */}
                {selectedPrompt.toneData && selectedPrompt.toneData.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray uppercase mb-2">Tone</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPrompt.toneData.map((tone: string, index: number) => (
                        <span key={index} className="bg-gold/20 text-gold px-3 py-1 rounded-full text-sm">
                          {tone}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* References */}
                {selectedPrompt.references && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray uppercase mb-2">References</h3>
                    <p className="text-black text-sm">{selectedPrompt.references}</p>
                  </div>
                )}

                {/* Notes */}
                {selectedPrompt.notes && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray uppercase mb-2">Notes</h3>
                    <div className="bg-gray/5 rounded-lg p-4">
                      <p className="text-black whitespace-pre-wrap text-sm">{selectedPrompt.notes}</p>
                    </div>
                  </div>
                )}

                {/* Context Data */}
                {selectedPrompt.contextData && Object.keys(selectedPrompt.contextData).length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray uppercase mb-2">Context Data</h3>
                    <div className="bg-gray/5 rounded-lg p-4 max-h-40 overflow-y-auto">
                      <pre className="text-black text-xs">{JSON.stringify(selectedPrompt.contextData, null, 2)}</pre>
                    </div>
                  </div>
                )}

                {/* Timestamps */}
                <div className="grid grid-cols-2 gap-4 text-sm border-t border-gold/20 pt-4">
                  <div>
                    <h3 className="text-xs font-semibold text-gray uppercase mb-1">Created</h3>
                    <p className="text-black">{formatDate(selectedPrompt.createdAt)}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray uppercase mb-1">Last Updated</h3>
                    <p className="text-black">{formatDate(selectedPrompt.updatedAt)}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-gold/20">
                  <div className="flex gap-3">
                    <button 
                      onClick={() => {
                        setShowViewModal(false);
                        setSelectedPrompt(null);
                      }}
                      className="flex-1 bg-gray/10 text-gray px-6 py-3 rounded-md hover:bg-gray/20 transition-colors"
                    >
                      Close
                    </button>
                    <button 
                      onClick={() => {
                        handleEditPrompt(selectedPrompt);
                        setShowViewModal(false);
                        setSelectedPrompt(null);
                      }}
                      className="flex-1 bg-gold text-white px-6 py-3 rounded-md hover:bg-gold/90 transition-colors flex items-center justify-center gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit Prompt
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center">
                <p className="text-gray">No prompt data available</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && promptToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="px-6 py-4 border-b border-gold/20">
              <h2 className="text-xl font-bold text-black">Confirm Delete</h2>
            </div>
            
            <div className="p-6">
              <p className="text-gray mb-4">
                Are you sure you want to delete this prompt?
              </p>
              <p className="text-black font-medium mb-6">"{promptToDelete.title}"</p>
              
              <div className="flex space-x-3">
                <button 
                  onClick={() => {
                    setShowDeleteModal(false);
                    setPromptToDelete(null);
                  }}
                  className="flex-1 bg-gray/10 text-gray px-6 py-3 rounded-md hover:bg-gray/20 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDelete}
                  className="flex-1 bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {showAddProjectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="px-6 py-4 border-b border-gold/20">
              <h2 className="text-xl font-bold text-black">Add New Project</h2>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => {
                    setNewProjectName(e.target.value);
                    setProjectError("");
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !isCreatingProject) {
                      handleAddProject();
                    }
                  }}
                  placeholder="Enter project name"
                  className="w-full px-4 py-3 border border-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold"
                  disabled={isCreatingProject}
                />
                {projectError && (
                  <p className="text-red-600 text-sm mt-2">{projectError}</p>
                )}
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={() => {
                    setShowAddProjectModal(false);
                    setNewProjectName("");
                    setProjectError("");
                  }}
                  className="flex-1 bg-gray/10 text-gray px-6 py-3 rounded-md hover:bg-gray/20 transition-colors"
                  disabled={isCreatingProject}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddProject}
                  className="flex-1 bg-gold text-white px-6 py-3 rounded-md hover:bg-gold/90 transition-colors flex items-center justify-center gap-2"
                  disabled={isCreatingProject}
                >
                  {isCreatingProject ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Create Project
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rename Project Modal */}
      {showRenameModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="px-6 py-4 border-b border-gold/20">
              <h2 className="text-xl font-bold text-black">Rename Project</h2>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray mb-2">
                  Current Name
                </label>
                <div className="w-full px-4 py-3 bg-gray/10 rounded-lg text-gray">
                  {projectToRename}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray mb-2">
                  New Project Name
                </label>
                <input
                  type="text"
                  value={renamedProjectName}
                  onChange={(e) => {
                    setRenamedProjectName(e.target.value);
                    setProjectError("");
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !isRenamingProject) {
                      confirmRenameProject();
                    }
                  }}
                  placeholder="Enter new project name"
                  className="w-full px-4 py-3 border border-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold"
                  disabled={isRenamingProject}
                />
                {projectError && (
                  <p className="text-red-600 text-sm mt-2">{projectError}</p>
                )}
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={() => {
                    setShowRenameModal(false);
                    setProjectToRename("");
                    setRenamedProjectName("");
                    setProjectError("");
                  }}
                  className="flex-1 bg-gray/10 text-gray px-6 py-3 rounded-md hover:bg-gray/20 transition-colors"
                  disabled={isRenamingProject}
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmRenameProject}
                  className="flex-1 bg-gold text-white px-6 py-3 rounded-md hover:bg-gold/90 transition-colors flex items-center justify-center gap-2"
                  disabled={isRenamingProject}
                >
                  {isRenamingProject ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Renaming...
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-4 h-4" />
                      Rename Project
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Project Modal */}
      {showDeleteProjectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="px-6 py-4 border-b border-gold/20">
              <h2 className="text-xl font-bold text-black">Delete Project</h2>
            </div>
            
            <div className="p-6">
              <p className="text-gray mb-4">
                Are you sure you want to delete this project? This will also delete all prompts in this project.
              </p>
              <p className="text-black font-medium mb-2">"{projectToDelete}"</p>
              <p className="text-red-600 text-sm mb-6">
                ⚠️ This action cannot be undone. {groupedPrompts[projectToDelete]?.length || 0} prompt(s) will be permanently deleted.
              </p>
              
              <div className="flex space-x-3">
                <button 
                  onClick={() => {
                    setShowDeleteProjectModal(false);
                    setProjectToDelete("");
                  }}
                  className="flex-1 bg-gray/10 text-gray px-6 py-3 rounded-md hover:bg-gray/20 transition-colors"
                  disabled={isDeletingProject}
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDeleteProject}
                  className="flex-1 bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  disabled={isDeletingProject}
                >
                  {isDeletingProject ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Delete Project
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptLibrary;
