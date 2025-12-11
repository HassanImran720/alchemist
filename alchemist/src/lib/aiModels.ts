export interface AIModel {
  id: string;
  name: string;
  description: string;
  available: boolean;
  provider: 'openai' | 'anthropic' | 'perplexity' | 'gemini' | 'grok';
  apiEndpoint?: string;
  supportedFeatures: string[];
}

export const AI_MODELS: Record<string, AIModel> = {
  chatgpt: {
    id: 'chatgpt',
    name: 'ChatGPT (gpt-4o-mini)',
    description: 'OpenAI\'s GPT-4o-mini model',
    available: false,
    provider: 'openai',
    supportedFeatures: ['text-generation', 'conversation', 'code-generation']
  },

  
  'gpt5-mini': {
    id: 'gpt5-mini',
    name: 'Chat GPT 5 Mini',
    description: 'Compact GPT-5 variant (if available)',
    available: true,
    provider: 'openai',
    supportedFeatures: ['text-generation', 'conversation']
  },
  // Additional OpenAI variants
  'gpt4': {
    id: 'gpt4',
    name: 'GPT-4 (gpt-4)',
    description: 'OpenAI GPT-4 high-capacity model',
    available: true,
    provider: 'openai',
    supportedFeatures: ['text-generation', 'conversation', 'analysis']
  },
  gpt41: {
    id: 'gpt41',
    name: 'GPT-4.1',
    description: 'OpenAI\'s GPT-4.1 model (Advanced)',
    available: true,
    provider: 'openai',
    supportedFeatures: ['text-generation', 'conversation', 'code-generation', 'analysis', 'reasoning']
  },
  gpt5: {
    id: 'gpt5',
    name: 'Chat GPT - 5',
    description: 'OpenAI\'s GPT-5 model (Latest)',
    available: true,
    provider: 'openai',
    supportedFeatures: ['text-generation', 'conversation', 'code-generation', 'analysis', 'reasoning', 'advanced-reasoning']
  },
  gemini: {
    id: 'gemini',
    name: 'Gemini 2.0 Flash',
    description: 'Google\'s Gemini 2.0 Flash model',
    available: true,
    provider: 'gemini',
    supportedFeatures: ['text-generation', 'conversation', 'code-generation', 'multimodal']
  },
 
  'gemini-pro': {
    id: 'gemini-pro',
    name: 'Gemini 2.5 Pro',
    description: 'Gemini 2.5 Pro (higher quality, larger context)',
    available: true,
    provider: 'gemini',
    supportedFeatures: ['text-generation', 'conversation', 'analysis', 'multimodal']
  },
  claude: {
    id: 'claude',
    name: 'Claude Sonnet 4.5',
    description: 'Anthropic\'s Claude Sonnet 4.5 - Advanced reasoning and analysis',
    available: true,
    provider: 'anthropic',
    apiEndpoint: 'https://api.anthropic.com/v1/messages',
    supportedFeatures: ['text-generation', 'conversation', 'analysis', 'reasoning']
  },
  'grok-4.1': {
    id: 'grok-4.1',
    name: 'Grok 4.1 Non-Reasoning',
    description: 'Grok 4.1 (non-reasoning flavor) - coming soon',
    available: true,
    provider: 'grok',
    supportedFeatures: ['text-generation', 'conversation'],
  },
  perplexity: {
    id: 'perplexity',
    name: 'Perplexity AI',
    description: 'Perplexity AI model with web search',
    available: false,
    provider: 'perplexity',
    supportedFeatures: ['text-generation', 'web-search', 'research']
  }
};

// Helper functions
export function getAvailableModels(): AIModel[] {
  // Preserve a consistent UI order matching product requirements
  const ORDER = [
    'gpt5',
    'gpt5-mini',
    'gemini-pro',
    'gemini',
    'grok-4.1',
    'claude'
  ];

  const ordered: AIModel[] = [];
  ORDER.forEach((id) => {
    const m = AI_MODELS[id];
    if (m) ordered.push(m);
  });

  // Fallback: include any other available models after the ordered list
  Object.values(AI_MODELS).forEach((m) => {
    if (!ordered.find(o => o.id === m.id) && m.available) ordered.push(m);
  });

  return ordered;
}

export function getModelsInOrder(): AIModel[] {
  // Returns the full ordered list (including coming-soon entries) for dropdown rendering
  const ORDER = [
    'gpt5',
    'gpt5-mini',
    'gemini-pro',
    'gemini',
    'grok-4.1',
    'claude'
  ];

  return ORDER.map(id => AI_MODELS[id]).filter(Boolean) as AIModel[];
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
  systemPrompt?: string;
}

export interface AIResponseResult {
  success: boolean;
  text?: string;
  error?: string;
  model: string;
}

// Model-specific response generators
export async function generateResponseWithModel(request: AIResponseRequest): Promise<AIResponseResult> {
  const { model, prompt, temperature = 0.7 } = request;

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

      case 'grok':
        return await generateGrokResponse(request);
      
      case 'anthropic':
        return await generateClaudeResponse(request);
      
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
  const { prompt, temperature = 0.7, model, systemPrompt } = request;

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

    // Map model IDs to OpenAI model names
    const modelNameMap: Record<string, string> = {
      'chatgpt': 'gpt-4o-mini',
      'gpt41': 'gpt-4.1',
      'gpt5': 'gpt-5',
      'gpt5-mini': 'gpt-5-mini',
      'gpt4': 'gpt-4',
    };

    const modelName = modelNameMap[model] || 'gpt-4o-mini';
    
    // GPT-5 and some models only support default temperature (1)
    // Don't include temperature parameter for models that don't support it
  const modelsThatDontSupportCustomTemp = ['gpt-5', 'gpt-5-mini'];
    const useDefaultTemp = modelsThatDontSupportCustomTemp.includes(modelName);
    
    const messages: any[] = [];
    if (systemPrompt && typeof systemPrompt === 'string' && systemPrompt.trim()) {
      messages.push({ role: 'system', content: systemPrompt });
    }
    messages.push({ role: 'user', content: prompt });

    const response = await client.chat.completions.create({
      model: modelName,
      messages,
      ...(useDefaultTemp ? {} : { temperature }),
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

// Claude-specific response generation using Anthropic API
async function generateClaudeResponse(request: AIResponseRequest): Promise<AIResponseResult> {
  const { prompt, temperature = 0.7, model, systemPrompt } = request;

  try {
    const apiKey = process.env.CLAUDE_API_KEY;
    if (!apiKey) {
      return {
        success: false,
        error: 'Claude API key not configured. Please contact support.',
        model
      };
    }

    // Build messages array per Anthropic's format
    const messages = [
      {
        role: 'user',
        content: prompt
      }
    ];

    // Build request body per Anthropic API spec
    const requestBody: any = {
      model: 'claude-sonnet-4-20250514',
      max_tokens: request.maxTokens || 8000,
      messages
    };

    // Add system prompt if provided
    if (systemPrompt && systemPrompt.trim()) {
      requestBody.system = systemPrompt;
    }

    // Add temperature if not default
    if (temperature !== 1) {
      requestBody.temperature = temperature;
    }

    console.log('🤖 Calling Claude API with:', { 
      model: requestBody.model, 
      messageCount: messages.length,
      hasSystem: !!requestBody.system 
    });

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Claude API error:', errorText);
      return {
        success: false,
        error: `Claude API Error (${response.status}): ${errorText}`,
        model
      };
    }

    const data = await response.json();
    console.log('✅ Claude response received:', { 
      contentLength: data?.content?.[0]?.text?.length || 0 
    });

    // Extract text from Anthropic's response format
    const text = data?.content?.[0]?.text || '';
    
    if (!text) {
      return {
        success: false,
        error: 'No response generated from Claude.',
        model
      };
    }

    return {
      success: true,
      text,
      model
    };
  } catch (error: any) {
    console.error('🔥 Claude exception:', error);
    return {
      success: false,
      error: `Claude Error: ${error.message || 'Unknown error occurred'}`,
      model
    };
  }
}

// Gemini-specific response generation
async function generateGeminiResponse(request: AIResponseRequest): Promise<AIResponseResult> {
  const { prompt, temperature = 0.7, model, systemPrompt } = request;
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
    
    // Map our internal model ids to the Gemini API model names
    const modelNameMap: Record<string, string> = {
      'gemini': 'gemini-2.0-flash',
      'gemini-flash': 'gemini-2.0-flash',
      'gemini-pro': 'gemini-2.5-pro'
    };

    const modelName = modelNameMap[model] || 'gemini-2.0-flash';

    // Call Gemini with the selected model name. Keep temperature if provided.
    const contents = systemPrompt && systemPrompt.trim() ? `${systemPrompt}\n\n${prompt}` : prompt;
    const response = await ai.models.generateContent({
      model: modelName,
      contents,
      config: {
        ...(typeof temperature === 'number' ? { temperature } : {})
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

// Grok-specific response generation (x.ai API)
async function generateGrokResponse(request: AIResponseRequest): Promise<AIResponseResult> {
  const { prompt, temperature = 0.7, model, systemPrompt } = request;

  try {
    const apiKey = process.env.GROK_API_KEY;
    if (!apiKey) {
      return {
        success: false,
        error: 'Grok API key not configured. Please set GROK_API_KEY in your environment.',
        model
      };
    }

    // Allow overriding model name via env, fallback to sample grok model used in Postman
    const grokModelName = process.env.GROK_MODEL_NAME || 'grok-2-1212';

    const body: any = {
      model: grokModelName,
      messages: [],
      temperature: typeof temperature === 'number' ? temperature : 0.7,
      max_tokens: request.maxTokens || 800
    };

    if (systemPrompt && systemPrompt.trim()) {
      body.messages.push({ role: 'system', content: systemPrompt });
    }
    body.messages.push({ role: 'user', content: prompt });

    const res = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const text = await res.text();
      return {
        success: false,
        error: `Grok API error (${res.status}): ${text}`,
        model
      };
    }

    const data = await res.json();

    // Parse response similar to sample
    const message = data?.choices?.[0]?.message || data?.choices?.[0]?.text || null;
    const text = message?.content || message || data?.choices?.[0]?.message?.content || '';

    if (!text) {
      return {
        success: false,
        error: 'No response generated from Grok.',
        model
      };
    }

    return {
      success: true,
      text,
      model
    };
  } catch (err: any) {
    return {
      success: false,
      error: `Grok Error: ${err?.message || String(err)}`,
      model
    };
  }
}