import { buildStructuredPrompt, PromptData } from './promptStructures';
import { getGuidedModeConfig, getFlowModeConfig } from './guidedModeInstructions';

export function buildGuidedPrompt({
  selectedCategory,
  task,
  fields,
  references,
  format,
  tone,
  promptStructure,
  length,
  includeEmojis,
}: {
  selectedCategory?: string;
  task: string;
  fields?: Record<string, string>;
  references?: string;
  format?: string;
  tone?: string;
  promptStructure?: string;
  length?: string;
  includeEmojis?: boolean;
}) {
  const categoryToUse = selectedCategory || 'Content Creation';
  const guidedConfig = getGuidedModeConfig(categoryToUse);

  const config = guidedConfig || {
    role: 'Content Expert',
    instructions: 'You are an expert assistant in your field.',
    approach: 'Use best practices and comprehensive analysis.',
    objective: task || 'Complete the requested task',
  };

  // Build field pairs from the fields object, filtering out empty values
  const contextData = Object.entries(fields || {})
    .filter(([_, value]) => value && value !== '')
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as Record<string, any>);

  const promptData: PromptData = {
    role: config.role,
    objective: task || config.objective,
    method: config.approach,
    context: contextData,
    tone: tone || 'Professional',
    references: references || '',
    format: {
      outputFormat: format || 'General',
      length: length || 'Appropriate',
      emojis: includeEmojis || false,
    },
    instructions: config.instructions,
    approach: config.approach,
    task: task,
  };

  const structureKey = promptStructure || 'aichemist-formula';
  return buildStructuredPrompt(structureKey, promptData);
}

export function buildFlowModePrompt({
  task,
  format,
  tone,
  length,
  promptStructure,
  includeEmojis,
}: {
  task: string;
  format?: string;
  tone?: string;
  length?: string;
  promptStructure?: string;
  includeEmojis?: boolean;
}) {
  const flowConfig = getFlowModeConfig();

  const promptData: PromptData = {
    role: flowConfig.role,
    objective: task || flowConfig.objective,
    method: flowConfig.method,
    context: { task: task },
    tone: tone || 'Professional',
    references: '',
    format: {
      outputFormat: format || 'General',
      length: length || 'Appropriate',
      emojis: includeEmojis || false,
    },
    instructions: flowConfig.instructions,
    approach: flowConfig.approach,
    task: task,
  };

  const structureKey = promptStructure || 'aichemist-formula';
  return buildStructuredPrompt(structureKey, promptData);
}
