// Prompt Structure Templates for different output formats
// These templates define how prompts should be structured and formatted

import { getFormatTemplate } from './formatTemplates';

export interface PromptStructureTemplate {
  name: string;
  key: string;
  description: string;
  template: (data: PromptData) => string;
}

export interface PromptData {
  role?: string;
  objective?: string;
  method?: string;
  context: Record<string, any>;
  tone?: string;
  references?: string;
  format?: {
    outputFormat?: string;
    length?: string;
    emojis?: boolean;
  };
  instructions?: string;
  approach?: string;
  task?: string;
}

export const PROMPT_STRUCTURES: Record<string, PromptStructureTemplate> = {
  "aichemist-formula": {
    name: "AICHEMIST Formula",
    key: "aichemist-formula",
    description: "XML-style structured prompt with clear sections",
    template: (data: PromptData) => {
      const contextPairs = Object.entries(data.context || {})
        .filter(([_, value]) => value && value !== '')
        .map(([key, value]) => `${key}: ${value}`)
        .join('; ');

      // Get format template details if format is specified
      let formatSection = `Output Format: ${data.format?.outputFormat || 'General'}; Length: ${data.format?.length || 'Appropriate'}; Emojis: ${data.format?.emojis ? 'Yes' : 'No'}`;
      
      if (data.format?.outputFormat) {
        const formatTemplate = getFormatTemplate(data.format.outputFormat);
        if (formatTemplate) {
          formatSection += `\n\nFormat Structure:\n${formatTemplate.structure}`;
        }
      }

      return `<role>${data.role || 'Expert Assistant'}</role>
<objective>${data.objective || data.task || 'Complete the requested task'}</objective>
<method>${data.method || data.approach || 'Use best practices and comprehensive analysis'}</method>
<context>${contextPairs}</context>
<tone>${data.tone || 'Professional'}</tone>
<references>${data.references ? `Use these references: ${data.references}` : 'No additional references provided'}</references>
<format>${formatSection}</format>`;
    }
  },

  "plain-text": {
    name: "Plain Text",
    key: "plain-text",
    description: "Simple text format with clear sections",
    template: (data: PromptData) => {
      const contextPairs = Object.entries(data.context || {})
        .filter(([_, value]) => value && value !== '')
        .map(([key, value]) => `${key}: ${value}`)
        .join('; ');

      // Get format template details if format is specified
      let formatSection = `Output Format: ${data.format?.outputFormat || 'General'}; Length: ${data.format?.length || 'Appropriate'}; Emojis: ${data.format?.emojis ? 'Yes' : 'No'}`;
      
      if (data.format?.outputFormat) {
        const formatTemplate = getFormatTemplate(data.format.outputFormat);
        if (formatTemplate) {
          formatSection += `\n\nFormat Structure:\n${formatTemplate.structure}`;
        }
      }

      return `Role: ${data.role || 'Expert Assistant'}
Objective: ${data.objective || data.task || 'Complete the requested task'}
Method: ${data.method || data.approach || 'Use best practices and comprehensive analysis'}
Context: ${contextPairs}
Tone: ${data.tone || 'Professional'}
References: ${data.references ? `Use these references: ${data.references}` : 'No additional references provided'}
Format: ${formatSection}`;
    }
  },

  "json": {
    name: "JSON",
    key: "json",
    description: "JSON structured prompt format",
    template: (data: PromptData) => {
      // Get format template details if format is specified
      let formatObject: any = {
        outputFormat: data.format?.outputFormat || 'General',
        length: data.format?.length || 'Appropriate',
        emojis: data.format?.emojis ? 'Yes' : 'No'
      };
      
      if (data.format?.outputFormat) {
        const formatTemplate = getFormatTemplate(data.format.outputFormat);
        if (formatTemplate) {
          formatObject.structure = formatTemplate.structure;
        }
      }

      const promptObject = {
        role: data.role || 'Expert Assistant',
        objective: data.objective || data.task || 'Complete the requested task',
        method: data.method || data.approach || 'Use best practices and comprehensive analysis',
        context: data.context || {},
        tone: data.tone || 'Professional',
        references: data.references ? `Use these references: ${data.references}` : 'No additional references provided',
        format: formatObject
      };

      return JSON.stringify(promptObject, null, 2);
    }
  },

  "yaml": {
    name: "YAML",
    key: "yaml",
    description: "YAML structured prompt format",
    template: (data: PromptData) => {
      const contextEntries = Object.entries(data.context || {})
        .filter(([_, value]) => value && value !== '')
        .map(([key, value]) => `  "${key}": "${value}"`)
        .join('\n');

      // Get format template details if format is specified
      let formatSection = `  outputFormat: "${data.format?.outputFormat || 'General'}"
  length: "${data.format?.length || 'Appropriate'}"
  emojis: "${data.format?.emojis ? 'Yes' : 'No'}"`;
      
      if (data.format?.outputFormat) {
        const formatTemplate = getFormatTemplate(data.format.outputFormat);
        if (formatTemplate) {
          const structureLines = formatTemplate.structure.split('\n').map(line => `    ${line}`).join('\n');
          formatSection += `\n  structure: |\n${structureLines}`;
        }
      }

      return `role: "${data.role || 'Expert Assistant'}"
objective: "${data.objective || data.task || 'Complete the requested task'}"
method: "${data.method || data.approach || 'Use best practices and comprehensive analysis'}"
context:
${contextEntries || '  # No context provided'}
tone: "${data.tone || 'Professional'}"
references: "${data.references ? `Use these references: ${data.references}` : 'No additional references provided'}"
format:
${formatSection}`;
    }
  },

  "markdown": {
    name: "Markdown",
    key: "markdown",
    description: "Markdown formatted prompt with headers and sections",
    template: (data: PromptData) => {
      const contextEntries = Object.entries(data.context || {})
        .filter(([_, value]) => value && value !== '')
        .map(([key, value]) => `**${key}:** ${value}`)
        .join('\n\n');

      // Get format template details if format is specified
      let formatSection = `**Output Format:** ${data.format?.outputFormat || 'General'}

**Length:** ${data.format?.length || 'Appropriate'}

**Emojis:** ${data.format?.emojis ? 'Yes' : 'No'}`;
      
      if (data.format?.outputFormat) {
        const formatTemplate = getFormatTemplate(data.format.outputFormat);
        if (formatTemplate) {
          formatSection += `\n\n**Format Structure:**\n\`\`\`\n${formatTemplate.structure}\n\`\`\``;
        }
      }

      return `# Role
${data.role || 'Expert Assistant'}

# Objective
${data.objective || data.task || 'Complete the requested task'}

# Method
${data.method || data.approach || 'Use best practices and comprehensive analysis'}

# Context
${contextEntries || 'No context provided'}

# Tone
${data.tone || 'Professional'}

# References
${data.references ? `Use these references: ${data.references}` : 'No additional references provided'}

# Format
${formatSection}`;
    }
  },

  "javascript-jsx": {
    name: "JavaScript/JSX",
    key: "javascript-jsx",
    description: "JavaScript object format for technical prompts",
    template: (data: PromptData) => {
      const contextObject = JSON.stringify(data.context || {}, null, 2);
      
      return `const promptConfig = {
  role: "${data.role || 'Expert Assistant'}",
  objective: "${data.objective || data.task || 'Complete the requested task'}",
  method: "${data.method || data.approach || 'Use best practices and comprehensive analysis'}",
  context: ${contextObject},
  tone: "${data.tone || 'Professional'}",
  references: "${data.references ? `Use these references: ${data.references}` : 'No additional references provided'}",
  format: {
    outputFormat: "${data.format?.outputFormat || 'General'}",
    length: "${data.format?.length || 'Appropriate'}",
    emojis: ${data.format?.emojis ? 'true' : 'false'}
  }
};`;
    }
  },

  "toml": {
    name: "TOML",
    key: "toml",
    description: "TOML configuration format",
    template: (data: PromptData) => {
      const contextEntries = Object.entries(data.context || {})
        .filter(([_, value]) => value && value !== '')
        .map(([key, value]) => `"${key}" = "${value}"`)
        .join('\n');

      return `role = "${data.role || 'Expert Assistant'}"
objective = "${data.objective || data.task || 'Complete the requested task'}"
method = "${data.method || data.approach || 'Use best practices and comprehensive analysis'}"
tone = "${data.tone || 'Professional'}"
references = "${data.references ? `Use these references: ${data.references}` : 'No additional references provided'}"

[context]
${contextEntries || '# No context provided'}

[format]
outputFormat = "${data.format?.outputFormat || 'General'}"
length = "${data.format?.length || 'Appropriate'}"
emojis = "${data.format?.emojis ? 'true' : 'false'}"`;
    }
  }
};

// Helper function to get prompt structure template by key
export function getPromptStructureTemplate(structureKey: string): PromptStructureTemplate | null {
  return PROMPT_STRUCTURES[structureKey] || null;
}

// Helper function to get all available prompt structures
export function getAvailablePromptStructures(): PromptStructureTemplate[] {
  return Object.values(PROMPT_STRUCTURES);
}

// Helper function to build structured prompt
export function buildStructuredPrompt(structureKey: string, data: PromptData): string {
  const template = getPromptStructureTemplate(structureKey);
  if (!template) {
    // Fallback to AICHEMIST formula if structure not found
    return PROMPT_STRUCTURES["aichemist-formula"].template(data);
  }
  
  return template.template(data);
}
