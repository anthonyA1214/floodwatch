"use client";

import React, { useState } from 'react';

type TabType = 'affected' | 'safe';

interface LocationButtonProps {
  onTabChange: (tab: TabType) => void;
  onCreateClick: () => void;
}
export default function LocationButton({ onTabChange, onCreateClick }: LocationButtonProps) {
  const [activeTab, setActiveTab] = useState<TabType>('affected');

  const handleTabSwitch = (tab: TabType) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className="w-full">
      <div className="bg-[#6CA4D9] p-1.5 rounded-lg flex items-center w-full shadow-inner">
        <button
          onClick={() => handleTabSwitch('affected')}
          className={`flex-1 py-2.5 text-[13px] font-medium rounded-md transition-all duration-200 ${
            activeTab === 'affected' ? 'bg-[#0061C2] text-white shadow-md': 'text-white hover:bg-white/10'}`}>
               Affected Locations
        </button>

        <button
          onClick={() => handleTabSwitch('safe')}
          className={`flex-1 py-2.5 text-[13px] font-medium rounded-md transition-all duration-200 ${
            activeTab === 'safe'? 'bg-[#0061C2] text-white shadow-md': 'text-white hover:bg-white/10'}`}>
          Safe Zone
        </button>
      </div>
      
      <button 
        onClick={onCreateClick}
        className="w-full mt-4 bg-[#0061C2] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#0052a3] active:scale-[0.98] transition-all shadow-lg shadow-blue-200">
        {activeTab === 'affected' ? 'Create Flood Alert' : 'Create Safe Zone'}
      </button>
    </div>
  );
}