"use client";

import React from "react";
import {
  MessageCircle,
  Mail,
  Phone,
  Clock,
  HelpCircle,
  FileText,
  Users,
} from "lucide-react";

const ContactSidebar: React.FC = () => {
  return (
<aside className="w-full lg:w-80 bg-white">

      <div className="space-y-8 ">
        
          {/* Contact Us */}
          <div className="space-y-8 border-[0.5px] border-[#dedede] rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />
                Contact Us
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                Choose your preferred way to get in touch
                </p>    

                {/* Methods */}
                <div className="space-y-3">
                {/* Live Chat */}
                <div className="flex items-center p-3 border-[0.5px] border-[#dedede]  hover:bg-gray-50 rounded-lg cursor-pointer transition">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex justify-center items-center mr-3">
                    <MessageCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 ">
                    <p className="text-sm font-medium">Live Chat</p>
                    <p className="text-xs text-gray-500">Available</p>
                    </div>
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                    Online
                    </span>
                </div>

                {/* Email */}
                <div className="flex items-center p-3 border-[0.5px] border-[#dedede] hover:bg-gray-50 rounded-lg cursor-pointer transition">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex justify-center items-center mr-3">
                    <Mail className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                    <p className="text-sm font-medium">Email Support</p>
                    <p className="text-xs text-gray-500">We'll get back to you</p>
                    </div>
                </div>

                {/* Phone */}
                <div className="flex items-center border-[0.5px] border-[#dedede]  p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex justify-center items-center mr-3">
                    <Phone className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                    <p className="text-sm font-medium">Phone Support</p>
                    <p className="text-xs text-gray-500">+1 (555) 123-4567</p>
                    </div>
                </div>
                </div>

                {/* Response Times */}
                <div className="border-[0.5px] border-[#dedede] mt-6 rounded-xl p-6">
                <h4 className="text-sm font-semibold mb-3 flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Response Times
                </h4>
                <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex justify-between">
                    <span>Live Chat:</span>
                    <span>Under 2 hrs</span>
                    </div>
                    <div className="flex justify-between">
                    <span>Email:</span>
                    <span>24 hrs</span>
                    </div>
                    <div className="flex justify-between">
                    <span>Phone:</span>
                    <span>Business hrs</span>
                    </div>
                </div>
                </div>
          </div>
    
        {/* Quick Links */}
        <div className="border-[0.5px] border-[#dedede] rounded-xl p-6">
          <h4 className="text-sm font-semibold mb-3">Quick Links</h4>
          <div className="space-y-2">
            <div className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
              <HelpCircle className="w-4 h-4 text-gray-600 mr-2" />
              <span className="text-sm">Getting Started Guide</span>
            </div>
            <div className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
              <FileText className="w-4 h-4 text-gray-600 mr-2" />
              <span className="text-sm">API Documentation</span>
            </div>
            <div className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
              <Users className="w-4 h-4 text-gray-600 mr-2" />
              <span className="text-sm">Video Tutorials</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ContactSidebar;
