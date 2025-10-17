import React from 'react';
import { ContextData } from '../../context/PromptEngContext';

interface Props {
  contextData: ContextData;
  setContextData: React.Dispatch<React.SetStateAction<ContextData>>;
}

interface Field {
  key: string;
  label: string;
  type: 'text' | 'dropdown' | 'checkbox';
  placeholder?: string;
  options?: string[];
}

interface Section {
  title: string;
  emoji?: string;
  fields: Field[];
}

const PersonalContextStep: React.FC<Props> = ({ contextData, setContextData }) => {
  const update = (key: string, value: string | boolean) => {
    setContextData((prev) => ({ ...prev, [key]: value }));
  };

  const sections: Section[] = [
    {
      title: 'Identity & Life Context',
      fields: [
        { key: 'nameOrPersona', label: 'Name or Persona (Optional)', type: 'text', placeholder: 'e.g., Drew, The Explorer' },
        { key: 'lifeAreaFocus', label: 'Life Area Focus', type: 'dropdown', options: ['mindset', 'wellness', 'finances', 'habits', 'relationships', 'travel', 'creativity'] },
        { key: 'roleOrIdentityLens', label: 'Role or Identity Lens', type: 'dropdown', options: ['student', 'traveler', 'journaler', 'spiritual seeker', 'self-optimizer', 'creative'] },
        { key: 'currentLifeSeason', label: 'Current Life Season / Theme', type: 'text', placeholder: 'e.g., healing era, growth mode' },
        { key: 'emotionalClimate', label: 'Emotional Climate', type: 'dropdown', options: ['energized', 'overwhelmed', 'hopeful', 'stagnant', 'curious', 'reflective'] },
      ],
    },
    {
      title: 'Personal Goal or Intention',
      fields: [
        { key: 'primaryObjective', label: 'Primary Objective', type: 'text', placeholder: 'e.g., plan my week, explore an idea' },
        { key: 'taskType', label: 'Type of Task or Exercise', type: 'dropdown', options: ['reflection', 'brainstorm', 'tracker', 'decision aid', 'ritual', 'journaling prompt'] },
        { key: 'timeSensitivity', label: 'Time Sensitivity', type: 'dropdown', options: ['daily', 'weekly', 'milestone', 'one-off', 'long-term'] },
        { key: 'outcomeStyle', label: 'Outcome Style', type: 'dropdown', options: ['actionable plan', 'emotional release', 'creative output', 'habit log', 'self-dialogue'] },
        { key: 'desiredFeeling', label: 'Desired Feeling or Shift', type: 'text', placeholder: 'e.g., more focused, lighter' },
      ],
    },
    {
      title: 'Input & Life Data',
      fields: [
        { key: 'sourceInput', label: 'Source Input', type: 'text', placeholder: 'journal note, screenshot, quote...' },
        { key: 'formatOfInput', label: 'Format of Input', type: 'dropdown', options: ['memory', 'note', 'screenshot', 'conversation', 'voice memo'] },
        { key: 'themesKeywords', label: 'Themes or Keywords to Include', type: 'text', placeholder: 'e.g., clarity, travel, flow' },
        { key: 'constraints', label: 'Constraints or Guardrails', type: 'text', placeholder: 'e.g., no clichés, short answers only' },
        { key: 'includesVisualCues', label: 'Includes Visual, Voice, or Sensory Cues', type: 'checkbox' },
      ],
    },
    {
      title: 'Prompt Framing Logic',
      fields: [
        { key: 'promptType', label: 'Prompt Type', type: 'dropdown', options: ['reflect', 'reframe', 'visualize', 'explore', 'declutter', 'simplify'] },
        { key: 'instructionStyle', label: 'Instruction Style', type: 'dropdown', options: ['open-ended', 'poetic', 'thought-provoking', 'structured', 'symbolic'] },
        { key: 'outputFormat', label: 'Output Format', type: 'dropdown', options: ['journal entry', 'quote', 'mantra', 'mirror dialogue', 'metaphor', 'personal plan'] },
        { key: 'creativityTemperature', label: 'Creativity Temperature', type: 'dropdown', options: ['neutral', 'gentle', 'symbolic', 'wild', 'mystical'] },
        { key: 'tonePreference', label: 'Tone Preference', type: 'dropdown', options: ['warm', 'spiritual', 'humorous', 'raw', 'calming', 'empowering'] },
        { key: 'perspectiveLens', label: 'Perspective Lens', type: 'dropdown', options: ['inner child', 'future self', 'narrator', 'guide', 'higher self'] },
        { key: 'postOutputIntention', label: 'Post-Output Intention', type: 'text', placeholder: 'e.g., journal, meditate, share' },
      ],
    },
    {
      title: 'Output Preferences',
      fields: [
        { key: 'deliveryFormat', label: 'Delivery Format', type: 'dropdown', options: ['plain text', 'PDF', 'Notion page', 'voice note', 'iMessage draft'] },
        { key: 'lengthPreference', label: 'Length Preference', type: 'dropdown', options: ['1-liner', 'paragraph', 'full reflection', 'visual summary'] },
        { key: 'mediaAddOn', label: 'Media Add-On', type: 'dropdown', options: ['image idea', 'emoji prompt', 'affirmation loop', 'dream symbol', 'audio tone'] },
        { key: 'openingPrompt', label: 'Opening Prompt or Starter Line', type: 'text' },
        { key: 'seriesFormat', label: 'Series or Ritual Format', type: 'dropdown', options: ['one-off', 'weekly flow', 'full moon journal', 'recurring check-in'] },
      ],
    },
    {
      title: 'Privacy & Emotional Sensitivity',
      fields: [
        { key: 'confidentialityLevel', label: 'Confidentiality Level', type: 'dropdown', options: ['private', 'shareable', 'anonymous', 'archived'] },
        { key: 'emotionalRiskLevel', label: 'Emotional Risk Level', type: 'dropdown', options: ['safe', 'vulnerable', 'cathartic', 'edgy'] },
        { key: 'triggerWarning', label: 'Trigger Warning or Comfort Boundary', type: 'text' },
        { key: 'integrationPlan', label: 'Integration Plan or Support Tool', type: 'text', placeholder: 'e.g., breathwork, playlist' },
      ],
    },
    {
      title: 'Prompt Engine Logic Variables',
      fields: [
        { key: 'promptObjective', label: 'Prompt Objective', type: 'dropdown', options: ['reflect', 'release', 'integrate', 'create', 'zoom out', 'affirm'] },
        { key: 'perspectiveOrVoice', label: 'Perspective or Voice', type: 'dropdown', options: ['inner guide', 'dream interpreter', 'curious friend', 'stoic teacher'] },
        { key: 'outputFeel', label: 'What Should the Output Feel Like?', type: 'text', placeholder: 'e.g., grounding, surreal' },
      ],
    },
  ];

  return (
    <div className="rounded-lg shadow-sm border-[0.5px] border-gold/30 p-4 sm:p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center mb-4">
        <div className="bg-gold text-ivory rounded-full w-8 h-8 flex items-center justify-center font-semibold mr-0 sm:mr-3 mb-2 sm:mb-0">3</div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal">Provide Personal Context</h2>
          <p className="text-sm text-gray">Help us understand your life context for more personalized AI output.</p>
        </div>
      </div>

      {sections.map((section) => (
        <div key={section.title} className="mb-6 border-t-[0.5px] border-gold/30 pt-4">
          <h3 className="text-base sm:text-lg font-semibold mb-3">➤ {section.title}</h3>

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {section.fields.map((field) => {
              if (field.type === 'text') {
                return (
                  <div key={field.key} className="flex flex-col">
                    <label htmlFor={field.key} className="mb-1 text-sm font-medium text-black">{field.label}</label>
                    <input
                      id={field.key}
                      placeholder={field.placeholder || ''}
                      value={contextData[field.key] || ''}
                      onChange={(e) => update(field.key, e.target.value)}
                      className="px-3 py-2 border-[0.5px] border-gold/30 rounded-md 
                              focus:ring-2 focus:ring-gold focus:border-gold text-sm bg-ivory w-full"
                    />
                  </div>
                );
              }
              if (field.type === 'dropdown') {
                return (
                  <div key={field.key} className="flex flex-col">
                    <label htmlFor={field.key} className="mb-1 text-sm font-medium text-black">{field.label}</label>
                    <select
                      id={field.key}
                      value={contextData[field.key] || ''}
                      onChange={(e) => update(field.key, e.target.value)}
                      className="px-3 py-2 border-[0.5px] border-gold/30 rounded-md 
                              focus:ring-2 focus:ring-gold focus:border-gold text-sm bg-ivory w-full"
                    >
                      <option value="">Select...</option>
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                );
              }
              if (field.type === 'checkbox') {
                return (
                  <div key={field.key} className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      id={field.key}
                      checked={!!contextData[field.key]}
                      onChange={(e) => update(field.key, e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor={field.key} className="text-sm font-medium text-black">{field.label}</label>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PersonalContextStep;
