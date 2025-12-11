import mongoose, { Document, Schema, model, Types } from 'mongoose';

export interface IPromptLibrary extends Document<Types.ObjectId> {
  // Basic Information
  title: string;
  userId: Types.ObjectId;
  
  // ✅ Iterations array - stores all prompt refinement cycles with complete data
  iterations?: Array<{
    iterationNumber: number;
    prompt: string;
    response: string;
    evaluation: Record<string, any> | null;
    aiModel: string;
    promptStructure?: string;
    timestamp: Date;
  }>;
  
  // Best score from all iterations
  bestScore?: number;
  
  // Generation Context
  taskObjective?: string;
  category?: string; // Category-based prompt generation
  
  // Context Data
  contextData?: Record<string, any>;
  insertReferences?: string;
  references?: string;
  
  // Output Configuration
  outputFormat?: string;
  length?: string;
  toneData?: string[];
  
  // Metadata
  project?: string;
  notes?: string;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  lastUsedAt?: Date;
  
  // Usage Statistics
  usageCount: number;
  
  // Tags for better organization
  tags?: string[];
}

const promptLibrarySchema = new Schema<IPromptLibrary>(
  {
    // Basic Information
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    
    // ✅ Iterations array - complete history of all refinement cycles
    iterations: [{
      iterationNumber: {
        type: Number,
        required: true
      },
      prompt: {
        type: String,
        required: true
      },
      response: {
        type: String,
        default: ""
      },
      evaluation: {
        type: Schema.Types.Mixed,
        default: null
      },
      aiModel: {
        type: String,
        default: "gpt-4o-mini"
      },
      promptStructure: {
        type: String,
        trim: true
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }],
    
    // Best score from all iterations (0-100)
    bestScore: {
      type: Number,
      min: 0,
      max: 100
    },
    
    // Generation Context
    taskObjective: {
      type: String,
      required: false,
      trim: true,
      default: ""
    },
    category: {
      type: String,
      required: false,
      trim: true
    },
    
    // Context Data
    contextData: {
      type: Schema.Types.Mixed,
      default: {}
    },
    insertReferences: {
      type: String,
      trim: true
    },
    references: {
      type: String,
      trim: true
    },
    
    // Output Configuration
    outputFormat: {
      type: String,
      trim: true
    },
    length: {
      type: String,
      trim: true
    },
    toneData: [{
      type: String,
      trim: true
    }],
    
    // Metadata
    project: {
      type: String,
      trim: true,
      default: 'My Prompts'
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 2000
    },
    
    // Timestamps
    lastUsedAt: {
      type: Date
    },
    
    // Usage Statistics
    usageCount: {
      type: Number,
      default: 0
    },
    
    // Tags for better organization
    tags: [{
      type: String,
      trim: true,
      lowercase: true
    }]
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    collection: 'promptlibrary'
  }
);

// Indexes for better query performance
promptLibrarySchema.index({ userId: 1, createdAt: -1 });
promptLibrarySchema.index({ userId: 1, project: 1 });
promptLibrarySchema.index({ userId: 1, title: 'text' });
promptLibrarySchema.index({ tags: 1 });

// Instance methods
promptLibrarySchema.methods.incrementUsage = function() {
  this.usageCount += 1;
  this.lastUsedAt = new Date();
  return this.save();
};

// Static methods
promptLibrarySchema.statics.findByUser = function(userId: Types.ObjectId) {
  return this.find({ userId }).sort({ createdAt: -1 });
};

promptLibrarySchema.statics.findByProject = function(userId: Types.ObjectId, project: string) {
  return this.find({ userId, project }).sort({ createdAt: -1 });
};

promptLibrarySchema.statics.searchPrompts = function(userId: Types.ObjectId, searchTerm: string) {
  return this.find({
    userId,
    $or: [
      { title: { $regex: searchTerm, $options: 'i' } },
      { taskObjective: { $regex: searchTerm, $options: 'i' } },
      { tags: { $in: [new RegExp(searchTerm, 'i')] } }
    ]
  }).sort({ createdAt: -1 });
};

// Pre-save middleware
promptLibrarySchema.pre('save', function(next) {
  // Auto-generate tags based on content if not provided
  if (!this.tags || this.tags.length === 0) {
    const autoTags = [];
    
    if (this.category) autoTags.push(this.category.toLowerCase());
    if (this.outputFormat) autoTags.push(this.outputFormat.toLowerCase());
    
    this.tags = autoTags;
  }
  
  // Calculate best score from all iterations
  if (this.iterations && this.iterations.length > 0) {
    let maxScore = 0;
    this.iterations.forEach(iteration => {
      if (iteration.evaluation && iteration.evaluation.totalScore) {
        maxScore = Math.max(maxScore, iteration.evaluation.totalScore);
      }
    });
    if (maxScore > 0) {
      this.bestScore = maxScore;
    }
  }
  
  next();
});

const PromptLibrary = mongoose.models.PromptLibrary || model<IPromptLibrary>('PromptLibrary', promptLibrarySchema);

// Clear existing model if it exists with different schema
if (mongoose.models.PromptLibrary) {
  delete mongoose.models.PromptLibrary;
}

const PromptLibraryModel = model<IPromptLibrary>('PromptLibrary', promptLibrarySchema);

export default PromptLibraryModel;