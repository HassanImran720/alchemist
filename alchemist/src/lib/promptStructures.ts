// Prompt Structure Templates for different output formats
// These templates define how prompts should be structured and formatted

import { getFormatTemplate } from "./formatTemplates";

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
  referencesUsage?: string;
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
        .filter(([_, value]) => value && value !== "")
        .map(([key, value]) => `${key}: ${value}`)
        .join("; ");

      // Get format template details if format is specified
      let formatSection = `Output Format: ${
        data.format?.outputFormat || "General"
      }; Length: ${data.format?.length || "Appropriate"}; Emojis: ${
        data.format?.emojis ? "Yes" : "No"
      }`;

      // Build customization section only if references exist
      const customizationSection = data.references && data.references.trim()
        ? `\n\n<customization>${data.referencesUsage ? data.referencesUsage + ':\n' : ''}${data.references}</customization>`
        : '';

      return `<role>${data.role || "Expert Assistant"}</role>

<objective>${
        data.objective || data.task || "Complete the requested task"
      }</objective>

<method>${
        data.method ||
        data.approach ||
        "Use best practices and comprehensive analysis"
      }</method>

<context>${contextPairs}</context>

<tone>${data.tone || "Professional"}</tone>${customizationSection}

<format>${formatSection}</format>`;
    },
  },

  "plain-text": {
    name: "Plain Text",
    key: "plain-text",
    description: "Simple text format with clear sections",
    template: (data: PromptData) => {
      // Build context with proper formatting - group Additional Instructions under parent sections
      const contextMap: Record<string, { main: string; additional?: string }> = {};
      
      // First pass: separate main entries from Additional Instructions
      Object.entries(data.context || {}).forEach(([key, value]) => {
        if (!value || value === "") return;
        
        if (key.includes(' - Additional Instructions')) {
          // Extract parent group name
          const groupName = key.replace(' - Additional Instructions', '');
          if (!contextMap[groupName]) contextMap[groupName] = { main: '' };
          contextMap[groupName].additional = value;
        } else {
          if (!contextMap[key]) contextMap[key] = { main: '' };
          contextMap[key].main = value;
        }
      });
      
      // Second pass: build output with Additional Instructions under parent sections
      const contextEntries = Object.entries(contextMap)
        .map(([groupName, content]) => {
          let output = `${groupName}: ${content.main}`;
          if (content.additional) {
            output += `\n\nAdditional Instructions:\n${content.additional}`;
          }
          return output;
        })
        .join('\n\n');

      // Get format template details if format is specified
      let formatSection = `Output Format: ${
        data.format?.outputFormat || "General"
      }; Length: ${data.format?.length || "Appropriate"}; Emojis: ${
        data.format?.emojis ? "Yes" : "No"
      }`;

      // Build customization section only if references exist
      const customizationSection = data.references && data.references.trim()
        ? `\n\nCustomization:\n${data.references.split('\n').map(line => line.trim()).join('\n')}`
        : '';

      return `Role: ${data.role || "Expert Assistant"} \n\nObjective: ${data.objective || data.task || "Complete the requested task"}\n\nMethod: ${
        data.method ||
        data.approach ||
        "Use best practices and comprehensive analysis"
      }\n\nContext:\n\n${contextEntries}\n\nTone: ${data.tone || "Professional"}${customizationSection}\n\nOutput: ${formatSection}`;
    },
  },

  json: {
    name: "JSON",

    key: "json",

    description: "JSON structured prompt format",

    template: (data: PromptData) => {
      // Get format template details if format is specified
      let formatObject: any = {
        outputFormat: data.format?.outputFormat || "General",
        length: data.format?.length || "Appropriate",
        emojis: data.format?.emojis ? "Yes" : "No",
      };

      const promptObject: any = {
        role: data.role || "Expert Assistant",

        objective: data.objective || data.task || "Complete the requested task",

        method:
          data.method ||
          data.approach ||
          "Use best practices and comprehensive analysis",

        context: data.context || {},

        tone: data.tone || "Professional",

        format: formatObject,
      };

      // Only add customization if references exist
      if (data.references && data.references.trim()) {
        promptObject.customization = data.referencesUsage 
          ? `${data.referencesUsage}:\n${data.references}`
          : data.references;
      }

      return JSON.stringify(promptObject, null, 2);
    },
  },

  yaml: {
    name: "YAML",
    key: "yaml",
    description: "YAML structured prompt format",
    template: (data: PromptData) => {
      const contextEntries = Object.entries(data.context || {})
        .filter(([_, value]) => value && value !== "")
        .map(([key, value]) => `  "${key}": "${value}"`)
        .join("\n");

      // Get format template details if format is specified
      let formatSection = `  outputFormat: "${
        data.format?.outputFormat || "General"
      }"
  length: "${data.format?.length || "Appropriate"}"
  emojis: "${data.format?.emojis ? "Yes" : "No"}"`;
    
      // Build customization section only if references exist
      const customizationSection = data.references && data.references.trim()
        ? `\n\ncustomization: "${data.referencesUsage ? data.referencesUsage + ':\n' : ''}${data.references}"`
        : '';

      return `role: "${data.role || "Expert Assistant"}"

objective: "${data.objective || data.task || "Complete the requested task"}"

method: "${
        data.method ||
        data.approach ||
        "Use best practices and comprehensive analysis"
      }"

context:
${contextEntries || "  # No context provided"}

tone: "${data.tone || "Professional"}"${customizationSection}

format:
${formatSection}`;
    },
  },

  markdown: {
    name: "Markdown",
    key: "markdown",
    description: "Markdown formatted prompt with headers and sections",
    template: (data: PromptData) => {
      const contextEntries = Object.entries(data.context || {})
        .filter(([_, value]) => value && value !== "")
        .map(([key, value]) => `**${key}:** ${value}`)
        .join("\n\n");

      // Get format template details if format is specified
      let formatSection = `**Output Format:** ${
        data.format?.outputFormat || "General"
      }

**Length:** ${data.format?.length || "Appropriate"}

**Emojis:** ${data.format?.emojis ? "Yes" : "No"}`;

      // Build customization section only if references exist
      const customizationSection = data.references && data.references.trim()
        ? `\n\n# Customization\n${data.referencesUsage ? data.referencesUsage + ':\n' : ''}${data.references}`
        : '';

      return `# Role
${data.role || "Expert Assistant"}

# Objective
${data.objective || data.task || "Complete the requested task"}

# Method
${
  data.method ||
  data.approach ||
  "Use best practices and comprehensive analysis"
}

# Context
${contextEntries || "No context provided"}

# Tone
${data.tone || "Professional"}${customizationSection}

# Format
${formatSection}`;
    },
  },

  "javascript-jsx": {
    name: "JavaScript/JSX",
    key: "javascript-jsx",
    description: "JavaScript object format for technical prompts",
    template: (data: PromptData) => {
      const contextObject = JSON.stringify(data.context || {}, null, 2);

      // Build customization section only if references exist
      const customizationLine = data.references && data.references.trim()
        ? `\n\n  customization: "${data.referencesUsage ? data.referencesUsage + ':\\n' : ''}${data.references}",`
        : '';

      return `const promptConfig = {

  role: "${data.role || "Expert Assistant"}",

  objective: "${data.objective || data.task || "Complete the requested task"}",

  method: "${
    data.method ||
    data.approach ||
    "Use best practices and comprehensive analysis"
  }",

  context: ${contextObject},

  tone: "${data.tone || "Professional"}",${customizationLine}

  format: {
    outputFormat: "${data.format?.outputFormat || "General"}",
    length: "${data.format?.length || "Appropriate"}",
    emojis: ${data.format?.emojis ? "true" : "false"}
  }
};`;
    },
  },

  toml: {
    name: "TOML",

    key: "toml",

    description: "TOML configuration format",

    template: (data: PromptData) => {
      const contextEntries = Object.entries(data.context || {})
        .filter(([_, value]) => value && value !== "")
        .map(([key, value]) => `"${key}" = "${value}"`)
        .join("\n");

      // Build customization section only if references exist
      const customizationLine = data.references && data.references.trim()
        ? `\ncustomization = "${data.referencesUsage ? data.referencesUsage + ':\\n' : ''}${data.references}"`
        : '';

      return `role = "${data.role || "Expert Assistant"}"

objective = "${data.objective || data.task || "Complete the requested task"}"
method = "${
        data.method ||
        data.approach ||
        "Use best practices and comprehensive analysis"
      }"
tone = "${data.tone || "Professional"}"${customizationLine}

[context]
${contextEntries || "# No context provided"}

[format]
outputFormat = "${data.format?.outputFormat || "General"}"
length = "${data.format?.length || "Appropriate"}"
emojis = "${data.format?.emojis ? "true" : "false"}"`;
    },
  },
};

// Helper function to get prompt structure template by key
export function getPromptStructureTemplate(
  structureKey: string
): PromptStructureTemplate | null {
  return PROMPT_STRUCTURES[structureKey] || null;
}

// Helper function to get all available prompt structures
export function getAvailablePromptStructures(): PromptStructureTemplate[] {
  return Object.values(PROMPT_STRUCTURES);
}

// Helper function to build structured prompt
export function buildStructuredPrompt(
  structureKey: string,
  data: PromptData
): string {
  const template = getPromptStructureTemplate(structureKey);
  if (!template) {
    // Fallback to AICHEMIST formula if structure not found
    return PROMPT_STRUCTURES["aichemist-formula"].template(data);
  }

  return template.template(data);
}
