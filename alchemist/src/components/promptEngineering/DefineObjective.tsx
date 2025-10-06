import React from 'react';

interface Props {
  taskObjective: string;
  setTaskObjective: (value: string) => void;
}

const DefineObjective: React.FC<Props> = ({ taskObjective, setTaskObjective }) => (
  <div className="rounded-xl border border-gold/30 p-2 md:p-4  mb-4 ">
    <div className="flex items-center mb-3">
      <h2 className="text-base sm:text-lg text-black mb-3 sm:mb-1">
        <strong>I. Define Objective:</strong> What do you want the AI to accomplish?
      </h2>
    </div>
    <input
      type="text"
      className="
        w-full 
        p-2 sm:p-3 
        text-sm sm:text-base
        border-[0.5px] border-gold/30 
        rounded-md 
        focus:ring-2 focus:ring-gold focus:border-gold 
        bg-ivory
      "
      placeholder="Example: Write a compelling email to potential customers about our new software product"
      value={taskObjective}
      onChange={(e) => setTaskObjective(e.target.value)}
    />
  </div>
);

export default DefineObjective;
