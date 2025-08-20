'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQ[] = [
  {
    id: 1,
    question: 'How do I get started?',
    answer: 'Sign up and start using the features right away.',
  },
  {
    id: 2,
    question: 'How do I cancel my subscription?',
    answer: 'Go to Settings > Billing > Cancel Subscription.',
  },
  {
    id: 3,
    question: 'Do you offer support?',
    answer: 'Yes, we provide 24/7 support via chat and email.',
  },
  {
    id: 4,
    question: "How does the Prompt Composer tool work?",
    answer: "The Prompt Composer helps you create effective prompts using AI-powered suggestions and optimization."
  },
  {
    id: 5,
    question: "Can I sell my prompts in the marketplace?",
    answer: "Absolutely! Our marketplace allows creators to monetize their prompts and earn revenue."
  },
  {
    id: 6,
    question: "What AI models does your platform support?",
    answer: "We support GPT-4, Claude, Gemini, and many other popular AI models."
  }
];

const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 border-[0.5px] border-[#dedede] rounded-xl">
 <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">Frequently Asked Questions</h2>
    
      <div className="space-y-2">
        {faqData.map((faq) => (
          <div key={faq.id} className="border-b-[0.2px] border-[#dedede]">
            <button
              className="w-full text-left flex justify-between items-center p-4"
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
            >
              <span>{faq.question}</span>
              {openId === faq.id ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openId === faq.id && (
              <div className="bg-gray-50 px-4 py-3 text-sm text-gray">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
