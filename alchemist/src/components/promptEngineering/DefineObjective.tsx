import React from 'react';

interface Props {
  taskObjective: string;
  setTaskObjective: (value: string) => void;
}

const DefineObjective: React.FC<Props> = ({ taskObjective, setTaskObjective }) => (
  <div className="rounded-lg border-[0.5px] border-gold/30 p-6 mb-6">
    <div className="flex items-center mb-4">
      <h2 className=" text-xl text-black mb-4"><strong >I. Define Objective:
</strong>  What do you want the AI to accomplish?</h2>
    </div>
    <input
      type="text"
      className="w-full p-3 border-[0.5px] border-gold/30 rounded-md focus:ring-2 focus:ring-gold focus:border-gold bg-ivory"
      placeholder="Example: Write a compelling email to potential customers about our new software product"
      value={taskObjective}
      onChange={(e) => setTaskObjective(e.target.value)}
    />
  </div>
);

export default DefineObjective;
