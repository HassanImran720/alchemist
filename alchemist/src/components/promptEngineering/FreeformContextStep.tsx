import React from 'react';
import { ContextData } from './PromptEngSection';

interface Props {
  contextData: ContextData;
  setContextData: React.Dispatch<React.SetStateAction<ContextData>>;
}

const FreeformContextStep: React.FC<Props> = ({ contextData, setContextData }) => {
  return (
    <div className="rounded-lg border-[0.5px] border-gold/30 p-6 mb-6">
      <div className="flex items-center mb-4">
        <div className="bg-gold text-ivory rounded-full w-8 h-8 flex items-center justify-center font-semibold mr-3">
          3
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-charcoal">Provide Context</h2>
      </div>
      <textarea
        rows={6}
        placeholder="Provide any relevant background info..."
        value={contextData.freeformContext || ''}
        onChange={(e) => setContextData(prev => ({ ...prev, freeformContext: e.target.value }))}
        className="w-full p-3 border-[0.5px] border-gold/30 rounded-md focus:ring-gold focus:border-gold resize-none bg-ivory"
      />
    </div>
  );
};

export default FreeformContextStep;
