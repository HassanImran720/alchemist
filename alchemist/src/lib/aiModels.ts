// AI Models Configuration
// This file defines available AI models and their capabilities

export interface AIModel {
  id: string;
  name: string;
  description: string;
  available: boolean;
  provider: 'openai' | 'anthropic' | 'perplexity' | 'gemini';
  apiEndpoint?: string;
  maxTokens?: number;
  supportedFeatures: string[];
}

export const AI_MODELS: Record<string, AIModel> = {
  chatgpt: {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'OpenAI\'s GPT-4o-mini model',
    available: true,
    provider: 'openai',
    maxTokens: 4000,
    supportedFeatures: ['text-generation', 'conversation', 'code-generation']
  },
  gemini: {
    id: 'gemini',
    name: 'Gemini',
    description: 'Google\'s Gemini 2.5 Flash model (Free)',
    available: true,
    provider: 'gemini',
    maxTokens: 8000,
    supportedFeatures: ['text-generation', 'conversation', 'code-generation', 'multimodal']
  },
  claude: {
    id: 'claude',
    name: 'Claude',
    description: 'Anthropic\'s Claude AI model',
    available: false,
    provider: 'anthropic',
    maxTokens: 4000,
    supportedFeatures: ['text-generation', 'conversation', 'analysis']
  },
  perplexity: {
    id: 'perplexity',
    name: 'Perplexity AI',
    description: 'Perplexity AI model with web search',
    available: false,
    provider: 'perplexity',
    maxTokens: 4000,
    supportedFeatures: ['text-generation', 'web-search', 'research']
  }
};

// Helper functions
export function getAvailableModels(): AIModel[] {
  return Object.values(AI_MODELS).filter(model => model.available);
}

export function getModel(modelId: string): AIModel | null {
  return AI_MODELS[modelId] || null;
}

export function isModelAvailable(modelId: string): boolean {
  const model = getModel(modelId);
  return model ? model.available : false;
}

export function getUnavailableMessage(modelId: string): string {
  const model = getModel(modelId);
  if (!model) {
    return 'Unknown model. Please select a valid model.';
  }
  if (!model.available) {
    return `${model.name} is coming soon and not available yet. Please select ChatGPT for now.`;
  }
  return '';
}

// Response generation interface
export interface AIResponseRequest {
  prompt: string;
  model: string;
  maxTokens?: number;
  temperature?: number;
}

export interface AIResponseResult {
  success: boolean;
  text?: string;
  error?: string;
  model: string;
}

// Model-specific response generators
export async function generateResponseWithModel(request: AIResponseRequest): Promise<AIResponseResult> {
  const { model, prompt, maxTokens = 800, temperature = 0.7 } = request;

  // Check if model is available
  if (!isModelAvailable(model)) {
    return {
      success: false,
      error: getUnavailableMessage(model),
      model
    };
  }

  const modelConfig = getModel(model);
  if (!modelConfig) {
    return {
      success: false,
      error: 'Model configuration not found.',
      model
    };
  }

  try {
    switch (modelConfig.provider) {
      case 'openai':
        return await generateOpenAIResponse(request);
      
      case 'gemini':
        return await generateGeminiResponse(request);
      
      case 'anthropic':
        return {
          success: false,
          error: getUnavailableMessage(model),
          model
        };
      
      case 'perplexity':
        return {
          success: false,
          error: getUnavailableMessage(model),
          model
        };
      
      default:
        return {
          success: false,
          error: 'Unsupported model provider.',
          model
        };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to generate response',
      model
    };
  }
}

// OpenAI-specific response generation
async function generateOpenAIResponse(request: AIResponseRequest): Promise<AIResponseResult> {
  const { prompt, maxTokens = 800, temperature = 0.7, model } = request;

  try {
    // Import OpenAI client dynamically to avoid issues if not configured
    const OpenAI = (await import('openai')).default;
    
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return {
        success: false,
        error: 'OpenAI API key not configured. Please contact support.',
        model
      };
    }

    const client = new OpenAI({ apiKey });
    
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini', // Use the actual OpenAI model name
      messages: [{ role: 'user', content: prompt }],
      max_tokens: maxTokens,
      temperature,
    });

    const text = response?.choices?.[0]?.message?.content ?? '';
    
    if (!text) {
      return {
        success: false,
        error: 'No response generated from ChatGPT.',
        model
      };
    }

    return {
      success: true,
      text,
      model
    };
  } catch (error: any) {
    return {
      success: false,
      error: `ChatGPT Error: ${error.message || 'Unknown error occurred'}`,
      model
    };
  }
}

// Gemini-specific response generation
async function generateGeminiResponse(request: AIResponseRequest): Promise<AIResponseResult> {
  const { prompt, maxTokens = 800, temperature = 0.7, model } = request;
  console.log("hello hello:", model);
  try {
    // Import Google Gen AI client dynamically
    const { GoogleGenAI } = await import('@google/genai');
    
    const apiKey = process.env.GEMINI_API_KEY;
    console.log('🔐 GEMINI_API_KEY set?', !!apiKey);
    if (!apiKey) {
      return {
        success: false,
        error: 'Gemini API key not configured. Please contact support.',
        model
      };
    }

    // Initialize the Google Gen AI client. The official SDK reads GEMINI_API_KEY from the environment.
    const ai = new GoogleGenAI({});
    
    // Use Gemini 2.5 Flash (free tier model)
    const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        maxOutputTokens: maxTokens,
        temperature,
      }
    });

    // Debug: log response object shape
    console.log('🔍 Gemini raw response:', JSON.stringify(response, Object.keys(response || {}), 2));

  const respAny = response as any;
  const text = respAny?.text || respAny?.message?.content || respAny?.output?.[0]?.content?.[0]?.text || '';
    
    if (!text) {
      return {
        success: false,
        error: 'No response generated from Gemini.',
        model
      };
    }

    return {
      success: true,
      text,
      model
    };
  } catch (error: any) {
    console.error('🔥 Gemini exception stack:', error.stack || error);
    return {
      success: false,
      error: `Gemini Error: ${error.message || 'Unknown error occurred'}`,
      model
    };
  }
}