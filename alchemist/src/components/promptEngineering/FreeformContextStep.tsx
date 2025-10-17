// import React from 'react';
// import { ContextData } from './PromptEngSection';
import { ContextData } from '../../context/PromptEngContext';

// interface Props {
//   contextData: ContextData;
//   setContextData: React.Dispatch<React.SetStateAction<ContextData>>;
// }

// const FreeformContextStep: React.FC<Props> = ({ contextData, setContextData }) => {
//   return (
//     <div className="rounded-lg border-[0.5px] border-gold/30 p-6 mb-6">
     
//        <div className="flex items-center mb-4">
//       <h2 className=" text-base sm:text-lg text-black mb-3 sm:mb-4"><strong >III. Provide Context:

// </strong> Include any background information necessary.
//  </h2>
//     </div>
//       <textarea
//         rows={6}
//         placeholder="Provide any relevant background info..."
//         value={contextData.freeformContext || ''}
//         onChange={(e) => setContextData(prev => ({ ...prev, freeformContext: e.target.value }))}
//         className="w-full p-3 border-[0.5px] border-gold/30 rounded-md focus:ring-gold focus:border-gold resize-none bg-ivory"
//       />
//     </div>
//   );
// };

// export default FreeformContextStep;



import React from 'react';
// Removed duplicate import, using the one from context

interface Props {
  contextData: ContextData;
  setContextData: React.Dispatch<React.SetStateAction<ContextData>>;
}

const FreeformContextStep: React.FC<Props> = ({ contextData, setContextData }) => {
  return (
    <div className="rounded-xl border border-gold/30 p-2 md:p-4 mb-4 ">
      <div className="flex items-center mb-3 sm:mb-2">
        <h2 className="text-base sm:text-lg text-black mb-2 sm:mb-1">
          <strong>III. Provide Context:</strong> Include any background information necessary.
        </h2>
      </div>
      <textarea
        placeholder="Provide any relevant background info..."
        value={contextData.freeformContext || ''}
        onChange={(e) =>
          setContextData((prev) => ({ ...prev, freeformContext: e.target.value }))
        }
        className="
          w-full
          p-2 sm:p-3
          text-sm
          border-[0.5px] border-gold/30 
          rounded-md 
          focus:ring-gold focus:border-gold 
          resize-none 
          bg-ivory
          h-24 sm:h-32   
        "
      />
    </div>
  );
};

export default FreeformContextStep;
