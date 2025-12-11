import { buildStructuredPrompt, PromptData } from './promptStructures';
import { getGuidedModeConfig, getFlowModeConfig } from './guidedModeInstructions';
import { getCategoryGroupsWithTemplates, getGroupTemplate } from '../components/promptEngineering/GuidedModeForms';
import { optionFieldsConfigData } from '../components/promptEngineering/CategoriesConfig';

export function buildGuidedPrompt({
  selectedCategory,
  task,
  fields,
  references,
  referencesUsage,
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
  referencesUsage?: string;
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

  // Get category groups with templates
  const categoryGroups = optionFieldsConfigData[categoryToUse] || [];
  
  // Group fields by their group name and add templates
  const groupedContext: Record<string, any> = {};
  const customFieldsByGroup: Record<string, string[]> = {};
  
  // Process each field and organize by group
  Object.entries(fields || {}).forEach(([fieldName, fieldValue]) => {
    if (!fieldValue || fieldValue === '') return;
    
    // Check if this is a custom field (contains " - " pattern)
    const isCustomField = fieldName.includes(' - ') && !fieldName.endsWith(' - ');
    
    if (isCustomField) {
      // Extract group name from custom field key (e.g., "Content Goal & Audience - how to check")
      const [groupName] = fieldName.split(' - ', 1);
      if (!customFieldsByGroup[groupName]) {
        customFieldsByGroup[groupName] = [];
      }
      // Only store the value, not the label (to avoid duplication)
      customFieldsByGroup[groupName].push(fieldValue);
      return;
    }
    
    // Find which group this field belongs to
    let foundGroup: string | null = null;
    for (const groupConfig of categoryGroups) {
      const fieldExists = groupConfig.fields.some(f => f.label === fieldName);
      if (fieldExists) {
        foundGroup = groupConfig.group;
        break;
      }
    }
    
    // Add to appropriate group or default
    const groupKey = foundGroup || '_ungrouped';
    if (!groupedContext[groupKey]) {
      groupedContext[groupKey] = [];
    }
    groupedContext[groupKey].push({ label: fieldName, value: fieldValue });
  });

  // Build context with group templates
  const contextWithTemplates: Record<string, any> = {};
  
  Object.entries(groupedContext).forEach(([groupName, fieldsArray]) => {
    // Get template from group config or generic templates
    const template = getGroupTemplate(categoryToUse, groupName, optionFieldsConfigData);
    
    if (template) {
      // Create formatted text with template + field values
      const fieldTexts = (fieldsArray as Array<{label: string; value: string}>)
        .map(f => `${f.label}: ${f.value}`)
        .join('\n');
      
      contextWithTemplates[groupName] = `${template}\n${fieldTexts}`;
    } else {
      // No template, just add fields normally
      const fieldTexts = (fieldsArray as Array<{label: string; value: string}>)
        .map(f => `${f.label}: ${f.value}`)
        .join('\n');
      contextWithTemplates[groupName] = fieldTexts;
    }
  });
  
  // Add custom fields as a separate section for each group
  Object.entries(customFieldsByGroup).forEach(([groupName, values]) => {
    if (values.length > 0) {
      // Create a formatted list of custom field values
      const customFieldsList = values.map(v => `- ${v}`).join('\n');
      // Use the group name to create separate Additional Instructions sections
      const customFieldsKey = `${groupName} - Additional Instructions`;
      contextWithTemplates[customFieldsKey] = customFieldsList;
    }
  });

  const promptData: PromptData = {
    role: config.role,
    objective: task || config.objective,
    method: config.approach,
    context: contextWithTemplates,
    tone: tone || 'Professional',
    references: references || '',
    referencesUsage: referencesUsage || '',
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
