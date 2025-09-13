// import { Star, Pencil, Copy } from 'lucide-react';
// import React from 'react';

// interface Props {
//   selectedContext: 'freeform' | 'business' | 'personal';
//   setSelectedContext: (value: 'freeform' | 'business' | 'personal') => void;
// }

// const ChooseContextStep: React.FC<Props> = ({ selectedContext, setSelectedContext }) => {
//   const contextTypes = [
//     { id: 'freeform', title: 'Freeform', subtitle: 'Write your own context', icon: Star },
//     { id: 'business', title: 'Business', subtitle: 'Guided by category', icon: Pencil },
//     { id: 'personal', title: 'Personal', subtitle: 'Life & personal goals', icon: Copy }
//   ] as const;

//   return (
//     <div className="rounded-lg shadow-sm border-[0.5px] border-gold/30 p-4 sm:p-6 mb-6">
//       {/* Step Heading */}
//       <div className="flex items-center mb-4">
//         <div className="bg-gold text-ivory rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-semibold mr-3 text-sm sm:text-base">
//           2
//         </div>
//         <h2 className="text-2xl md:text-3xl font-bold text-charcoal">Choose Context Type</h2>
//       </div>

//       {/* Context Options */}
//       <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
//         {contextTypes.map(({ id, title, subtitle, icon: Icon }) => (
//           <button
//             key={id}
//             onClick={() => setSelectedContext(id)}
//             className={`p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 text-center flex flex-col items-center justify-center
//               ${
//                 selectedContext === id
//                   ? 'bg-gold text-ivory border-[0.5px] border-gold/30'
//                   : 'border-gold/30 hover:border-gold/30'
//               }
//             `}
//           >
//             <Icon
//               className="w-4 h-4 sm:w-5 sm:h-5 mb-1.5 sm:mb-2"
//               color={selectedContext === id ? '#fff' : '#7c7c7c'}
//             />
//             <h3 className="font-semibold text-sm sm:text-lg mb-0.5 sm:mb-1">{title}</h3>
//             <p className="text-xs sm:text-sm text-center leading-snug">{subtitle}</p>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ChooseContextStep;


import { Star, Pencil } from 'lucide-react';
import React from 'react';

interface Props {
  selectedContext: 'flowmode' | 'guidedmode' | null; // allow null
  setSelectedContext: (value: 'flowmode' | 'guidedmode' | null) => void; // allow null
}


const ChoosePath: React.FC<Props> = ({ selectedContext, setSelectedContext }) => {
  const contextTypes = [
    { id: 'flowmode', title: 'Flow Mode', subtitle: 'No constraints - just write', icon: Star },
    { id: 'guidedmode', title: 'Guided Mode', subtitle: 'Start with structured fields', icon: Pencil }
  ] as const;

  return (
    <div className="rounded-xl  border border-gold/30 p-6 sm:p-8 mb-8">
      {/* Step Heading */}
      <div className="flex items-center mb-6">
        <div className="bg-gold text-ivory rounded-full w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center font-semibold mr-3 text-sm sm:text-base">
          2
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-charcoal">Choose Your Path</h2>
      </div>

      {/* Context Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {contextTypes.map(({ id, title, subtitle, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setSelectedContext(id)}
            className={`p-5 sm:p-6 rounded-xl border-2 transition-all duration-200 text-center flex flex-col items-center justify-center 
              ${
                selectedContext === id
                  ? 'bg-gold text-ivory border-gold'
                  : 'border-gold/30 hover:border-gold/50 '
              }
            `}
          >
            <div className={`flex items-center justify-center w-12 h-12 rounded-full mb-3 ${
              selectedContext === id ? 'bg-white/20' : 'bg-gold/10'
            }`}>
              <Icon
                className="w-6 h-6"
                color={selectedContext === id ? '#fff' : '#7c7c7c'}
              />
            </div>
            <h3 className="font-semibold text-base sm:text-lg mb-1">{title}</h3>
            <p className="text-xs sm:text-sm text-center leading-snug opacity-80">{subtitle}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChoosePath;
