import React from 'react';
import ContactSidebar from '@/components/contactUs/ContactSidebar';
import MessageForm from '@/components/contactUs/MessageForm';
import FAQSection from '@/components/contactUs/FAQSection';

const SupportCenterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 sm:px-6 py-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold">Support Center</h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Get help when you need it. Our team is here to support your prompt<br className="hidden sm:block" />
          engineering journey.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col lg:flex-row gap-6">
        {/* Sidebar on top for mobile, side on desktop */}
        <div className="w-full lg:w-[20rem]">
          <ContactSidebar />
        </div>

        {/* Main content area */}
        <main className="flex-1 space-y-6">
          <MessageForm />
          <FAQSection />
        </main>
      </div>
    </div>
  );
};

export default SupportCenterPage;
