"use client";
import React, { useState } from 'react';
import DefineTaskStep from './DefineTaskStep';
import ChooseContextStep from './ChooseContextStep';
import BusinessContextStep from './BusinessContextStep';
import PersonalContextStep from './PersonalContextStep';
import FreeformContextStep from './FreeformContextStep';
import ReferencesStep from './ReferencesStep';
import GeneratedPromptStep from './GeneratedPromptStep';

export type ContextData = {
  [key: string]: any;
  dynamicFields?: Record<string, any>;
  customFields?: string[];
  freeformContext?: string;
};

const PromptEngSection: React.FC = () => {
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedContext, setSelectedContext] = useState<'freeform' | 'business' | 'personal'>('freeform');
  const [contextData, setContextData] = useState<ContextData>({});
  const [references, setReferences] = useState('');
  const [outputFormat, setOutputFormat] = useState('');
  const [promptFormat, setPromptFormat] = useState('');
  const [showOutputForm, setShowOutputForm] = useState(false);

  const renderContextStep = () => {
    switch (selectedContext) {
      case 'business':
        return <BusinessContextStep contextData={contextData} setContextData={setContextData} />;
      case 'personal':
        return <PersonalContextStep contextData={contextData} setContextData={setContextData} />;
      default:
        return <FreeformContextStep contextData={contextData} setContextData={setContextData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gold mb-2">AIChemist Laboratory</h1>
          <p className="text-gray mb-4">
            Systematically create, evaluate, and refine prompts to consistently achieve high-quality (5/5) AI outputs
          </p>
          <div className="flex justify-center space-x-4">
            <span className="text-gold border-[0.5px] border-gold px-3 py-1 rounded-full text-sm">
              No Credits Available
            </span>
            <span className="text-gold border-[0.5px] border-gold px-3 py-1 rounded-full text-sm">
              0 Iterations
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <DefineTaskStep taskDescription={taskDescription} setTaskDescription={setTaskDescription} />
        <ChooseContextStep selectedContext={selectedContext} setSelectedContext={setSelectedContext} />
        {renderContextStep()}

        <ReferencesStep
          references={references}
          setReferences={setReferences}
          outputFormat={outputFormat}
          setOutputFormat={setOutputFormat}
          promptFormat={promptFormat}
          setPromptFormat={setPromptFormat}
          onGenerate={() => setShowOutputForm(true)}
        />

        {showOutputForm && (
          <GeneratedPromptStep
            taskDescription={taskDescription}
            selectedContext={selectedContext}
            contextData={contextData}
            references={references}
            outputFormat={outputFormat}
          />
        )}
      </div>
    </div>
  );
};

export default PromptEngSection;
