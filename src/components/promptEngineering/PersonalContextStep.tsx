import React from 'react';
import { ContextData } from './PromptEngSection';

interface Props {
  contextData: ContextData;
  setContextData: React.Dispatch<React.SetStateAction<ContextData>>;
}

const PersonalContextStep: React.FC<Props> = ({ contextData, setContextData }) => {
  const update = (key: string, value: string) => {
    setContextData((prev) => ({ ...prev, [key]: value }));
  };


  const fields = [
    {
      key: 'personalGoals',
      label: 'Personal Goals',
      placeholder: 'Describe your main personal goals for this task or project.'
    },
    {
      key: 'emotionalState',
      label: 'Emotional State',
      placeholder: 'How are you feeling? (e.g., motivated, anxious, excited)'
    },
    {
      key: 'learningStyle',
      label: 'Learning Style',
      placeholder: 'Preferred way to learn or process information.'
    },
    {
      key: 'timeConstraints',
      label: 'Time Constraints',
      placeholder: 'Any deadlines or time limitations?'
    },
    {
      key: 'pastExperiences',
      label: 'Past Experiences',
      placeholder: 'Relevant past experiences or background.'
    },
    {
      key: 'spiritualBeliefs',
      label: 'Spiritual Beliefs',
      placeholder: 'Any spiritual or philosophical beliefs to consider.'
    },
    {
      key: 'personalValues',
      label: 'Personal Values',
      placeholder: 'Core values or principles important to you.'
    },
    {
      key: 'socialDynamics',
      label: 'Social Dynamics',
      placeholder: 'Social context or relationships that may affect this.'
    },
  ];

  return (
    <div className="rounded-lg shadow-sm border-[0.5px] border-gold/30 p-6 mb-6">
      <div className="flex items-center mb-4">
        <div className="bg-gold text-ivory rounded-full w-8 h-8 flex items-center justify-center font-semibold mr-3">3</div>
        <div>
          <h2 className="text-xl font-semibold text-charcoal">Provide Personal Context</h2>
          <p className="text-sm text-gray">Help us understand your unique situation for more tailored AI results.</p>
        </div>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.key} className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-black" htmlFor={field.key}>{field.label}</label>
            <input
              id={field.key}
              placeholder={field.placeholder}
              value={contextData[field.key] || ''}
              onChange={(e) => update(field.key, e.target.value)}
              className="p-3 border-[0.5px] border-gold/30 rounded-md focus:ring-gold focus:border-gold"
            />
          </div>
        ))}
      </form>
    </div>
  );
};

export default PersonalContextStep;
