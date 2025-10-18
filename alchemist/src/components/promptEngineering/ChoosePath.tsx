

import React from 'react';

interface Props {
  selectedContext: 'flowmode' | 'guidedmode' | null; // allow null
  setSelectedContext: (value: 'flowmode' | 'guidedmode' | null) => void; // allow null
}

const ChoosePath: React.FC<Props> = ({ selectedContext, setSelectedContext }) => {
  const contextTypes = [
    { id: 'flowmode', title: 'Flow Mode', subtitle: 'No constraints - just write' },
    { id: 'guidedmode', title: 'Guided Mode', subtitle: 'Start with structured fields' }
  ] as const;

  return (
    <div className="rounded-xl border border-gold/30 p-2 md:p-4 mb-4">
      {/* Step Heading */}
      <div className="flex items-center mb-3 sm:mb-2">
        <h2 className="text-base sm:text-lg text-black mb-3 sm:mb-1">
          <strong>II. Choose Your Path</strong>
        </h2>
      </div>

      {/* Context Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {contextTypes.map(({ id, title, subtitle }) => (
          <button
            key={id}
            onClick={() => setSelectedContext(id)}
            className={`p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 text-center flex flex-col items-center justify-center 
              ${
                selectedContext === id
                  ? 'bg-gold text-ivory border-gold'
                  : 'border-gold/30 hover:border-gold/50'
              }
            `}
          >
            <h3 className="font-semibold text-sm sm:text-base mb-1">{title}</h3>
            <p className="text-xs sm:text-sm text-center leading-snug opacity-80">{subtitle}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChoosePath;
