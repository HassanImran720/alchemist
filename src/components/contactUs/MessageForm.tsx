'use client';

import React, { useState, ChangeEvent } from 'react';

const MessageForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 border-[0.5px] border-[#dedede] rounded-xl">
     <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">Send us a Message</h2>
      <p className="text-gray mb-6">Can't find the answer you're looking for? Send us detail message we will back to you soon!</p>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-6 justify-between">
          <div>
            <label className="text-sm text-charcoal font-semibold">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full px-4 py-2 border-[0.2px] border-gray rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="text-sm text-charcoal font-semibold">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border-[0.2px] border-gray rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-charcoal font-semibold">Subject</label>
          <input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full px-4 py-2 border-[0.2px] border-gray rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="text-sm text-charcoal font-semibold">Message</label>
          <textarea
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Describe your issue..."
            className="w-full px-4 py-2 border-[0.2px] border-gray rounded-md focus:ring-2 focus:ring-blue-500 resize-y"
            required
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Send Message
        </button>
      </div>
    </div>
  );
};

export default MessageForm;
