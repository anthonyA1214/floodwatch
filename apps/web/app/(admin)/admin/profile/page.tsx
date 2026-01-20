"use client";

import { Pencil, Camera, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function Profile() {
  const [showChangePassword, setShowChangePassword] = useState(false);

  const stats = [
    { label: "Member Since", value: "October 5, 2025" },
    { label: "Posts", value: "3" },
    { label: "Reports Submitted", value: "14" },
  ];

  const fields = [
    { label: "Name", value: "Lawrence Dullo", editable: true },
    { label: "Email Address", value: "sample@gmail.com", editable: false },
    { label: "Phone Number", value: "09123456891", editable: false },
    { label: "Address", value: "Home Address Blk Sample", editable: true },
  ];

  if (showChangePassword) {
    // Change Password View
    return (
      <div className="flex-1 rounded-3xl p-8 bg-white shadow-sm border border-gray-100 min-h-screen flex flex-col">
        
        {/* Header with Back Button */}
        <div className="mb-8 flex items-center gap-4">
          <button 
            onClick={() => setShowChangePassword(false)}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Change Password</h2>
            <p className="text-gray-500 font-medium text-sm mt-1">Manage your account password.</p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto flex justify-start items-stretch">
          <div className="w-full grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 items-start">
            
            {/* LEFT SIDE: Avatar and Stats Card */}
            <div className="flex flex-col h-full">
              <div className="border border-gray-200 rounded-2xl p-8 bg-white shadow-sm h-full flex flex-col">
                {/* Avatar Section */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative mb-4">
                    <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-lg flex items-center justify-center">
                      <svg 
                        className="w-16 h-16 text-gray-400" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    <button className="absolute bottom-0 right-0 bg-[#007BFF] p-2 rounded-full text-white border-3 border-white shadow-lg hover:bg-[#0056b3]">
                      <Camera size={16} />
                    </button>
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900">John Doe</h3>
                    <p className="text-gray-400 text-sm">sample@gmail.com</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gray-200 my-6" />

                {/* Stats Section */}
                <div className="space-y-4 flex-1">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 font-medium">{stat.label}</span>
                      <span className="text-sm text-gray-900 font-bold">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Change Password Form */}
            <div className="flex flex-col">
              <h4 className="text-base text-gray-900 font-semibold mb-6">Profile Information</h4>
              
              <div className="space-y-5">
                {/* Old Password */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-gray-600">Old Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3.5 text-sm text-gray-700 outline-none focus:border-blue-500"
                  />
                </div>

                {/* New Password */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-gray-600">New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3.5 text-sm text-gray-700 outline-none focus:border-blue-500"
                  />
                </div>

                {/* Confirm New Password */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-gray-600">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3.5 text-sm text-gray-700 outline-none focus:border-blue-500"
                  />
                </div>

                {/* Change Password Button */}
                <button className="w-full mt-2 bg-[#007BFF] hover:bg-[#0056b3] text-white font-semibold py-3 rounded-lg text-sm shadow-sm transition-colors">
                  Save Password
                </button>

                {/* Forgot Password Link */}
                <div className="text-right">
                  <a href="#" className="text-xs text-[#007BFF] hover:underline">Forgot Password</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // Profile View
  return (
    <div className="flex-1 rounded-3xl p-8 bg-white shadow-sm border border-gray-100 min-h-screen flex flex-col">
      
      {/* Page Title */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Profile</h2>
        <p className="text-gray-500 font-medium text-sm mt-1">Manage your account settings and preferences</p>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto flex justify-start items-stretch">
        <div className="w-full grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 items-start">
          
          {/* LEFT SIDE: Avatar and Stats Card */}
          <div className="flex flex-col h-full">
            <div className="border border-gray-200 rounded-2xl p-8 bg-white shadow-sm h-full flex flex-col">
              {/* Avatar Section */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-lg flex items-center justify-center">
                    <svg 
                      className="w-16 h-16 text-gray-400" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <button className="absolute bottom-0 right-0 bg-[#007BFF] p-2 rounded-full text-white border-3 border-white shadow-lg hover:bg-[#0056b3]">
                    <Camera size={16} />
                  </button>
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900">John Doe</h3>
                  <p className="text-gray-400 text-sm">sample@gmail.com</p>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gray-200 my-6" />

              {/* Stats Section */}
              <div className="space-y-4 flex-1">
                {stats.map((stat, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 font-medium">{stat.label}</span>
                    <span className="text-sm text-gray-900 font-bold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Form Information */}
          <div className="flex flex-col">
            <h4 className="text-base text-gray-900 font-semibold mb-6">Profile Information</h4>
            
            <div className="space-y-5">
              {fields.map((field, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-gray-600">
                    {field.label}
                  </label>
                  <div className="relative">
                    <input
                      readOnly
                      defaultValue={field.value}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3.5 text-sm text-gray-700 outline-none focus:border-blue-500"
                    />
                    {field.editable && (
                      <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        <Pencil size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <button 
                onClick={() => setShowChangePassword(true)}
                className="w-full mt-2 bg-[#007BFF] hover:bg-[#0056b3] text-white font-semibold py-3 rounded-lg text-sm shadow-sm transition-colors"
              >
                Change Password
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}