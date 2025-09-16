import { useRef, useEffect } from "react";

interface TestAIResponseStepProps {
  aiResponse: string;
  onTestComplete: (response: string) => void;
}

const ViewResponse: React.FC<TestAIResponseStepProps> = ({
  aiResponse,
  onTestComplete
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // auto resize function
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // reset height
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        600 // max height in px before scroll
      )}px`;
    }
  }, [aiResponse]);

  return (
    <div className="bg-ivory min-h-[400px] rounded-lg p-6 mb-6 border-[0.5px] border-gold/30">
        <div className="flex items-center mb-4">
      <h2 className=" text-xl text-black mb-4"><strong >X. View Response:

</strong>
 </h2>
    </div>

      <textarea
        ref={textareaRef}
        value={aiResponse}
        onChange={(e) => onTestComplete(e.target.value)}
        className="w-full p-4 border border-gold/30 rounded-md bg-ivory text-base resize-none focus:ring-2 focus:ring-gold overflow-auto"
        placeholder="Generated AI response will appear here..."
      />

      <div className="text-sm text-gray mt-3 leading-relaxed">
        Test your prompt with an AI model and edit the response if needed before evaluation. 
        The box will expand to fit the text up to a limit, after which scrolling will appear.
      </div>
    </div>
  );
};

export default ViewResponse;
