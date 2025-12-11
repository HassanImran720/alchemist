import React from 'react';

interface Props {
  taskDescription: string;
  setTaskDescription: (value: string) => void;
}

const DefineTaskStep: React.FC<Props> = ({ taskDescription, setTaskDescription }) => (
  <div className=" border-[0.5px] border-gold/30 p-6 mb-6">
    <div className="flex items-center mb-4">
      <div className="bg-gold text-ivory rounded-full w-8 h-8 flex items-center justify-center font-semibold mr-3">
        1
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-charcoal">
        Define Your Task
      </h2>
    </div>
    <label className="block text-sm font-medium text-gray mb-2">
      What do you want the AI to accomplish?
    </label>
    <textarea
      className="w-full p-3 border-[0.5px] border-gold/30 rounded-md focus:ring-2 focus:ring-gold focus:border-gold resize-none bg-ivory"
      rows={4}
      placeholder="Example: Write a compelling email to potential customers about our new software product"
      value={taskDescription}
      onChange={(e) => setTaskDescription(e.target.value)}
    />
  </div>
);

export default DefineTaskStep;
