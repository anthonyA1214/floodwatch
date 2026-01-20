"use client";

import { useState } from "react";
import Search from "@/components/admin/interactive-map-components/search-bar";
import LocationButton from "@/components/admin/interactive-map-components/location-button";
import Location from "@/components/admin/interactive-map-components/location";
import LocationSafeZone from "@/components/admin/interactive-map-components/location-safe-zone";
import CreateFloodAlert from "@/components/admin/interactive-map-components/create-flood-alert";
import CreateSafeZone from "@/components/admin/interactive-map-components/create-safe-zone";

const INITIAL_DATA = [
  { id: 1, name: "Barangay 174", description: "Critical flood warning. Evacuation recommended.", severity: "Critical" as const, timeAgo: "2h ago", type: "affected" },
  { id: 2, name: "Barangay 171", description: "Flooding at knee level. Road partially impassable.", severity: "High" as const, timeAgo: "3h ago", type: "affected" },
  { id: 3, name: "Bagong Silang HS", description: "Designated evacuation center is now open.", severity: "Low" as const, timeAgo: "1h ago", type: "safe" },
];

export default function InteractiveMap() {
  const [activeTab, setActiveTab] = useState<'affected' | 'safe'>('affected');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredData = INITIAL_DATA.filter(item => item.type === activeTab);
  
  const ActiveModal = activeTab === 'affected' ? CreateFloodAlert : CreateSafeZone;

  return (
    <div className="flex-1 rounded-3xl p-8 bg-white shadow-sm border border-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">Interactive Map</h2>
      <div className="mb-6"><Search /></div>

      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-250px)]">
        {/* Map View */}
        <div className="flex-2 relative rounded-3xl overflow-hidden border border-gray-200 bg-slate-50 flex items-center justify-center">
           <span className="text-gray-400 font-medium">Map View</span>
           <div className="absolute top-4 right-4 bg-white p-2.5 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
             <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
             </svg>
           </div>
        </div>

        {/* Sidebar Controls */}
        <div className="flex-1 min-w-[380px] flex flex-col">
          <LocationButton onTabChange={setActiveTab} onCreateClick={() => setIsModalOpen(true)} />
          
          <div className="mt-5 flex-1 overflow-y-auto space-y-3 pr-1">
            {filteredData.length ? filteredData.map(loc => (
              activeTab === 'affected' ? (
                <Location key={loc.id} {...loc} />
              ) : (
                <LocationSafeZone key={loc.id} {...loc} />
              )
            )) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm italic">No records found.</div>
            )}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <button className="px-5 py-2 bg-[#0055A5] text-white rounded-xl text-xs font-semibold hover:bg-[#004485] transition-all">Previous</button>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map(num => (
                <span key={num} className={`w-8 h-8 flex items-center justify-center rounded-full text-[10px] font-bold cursor-pointer transition-colors ${num === 1 ? 'bg-[#0055A5] text-white shadow-md' : 'text-gray-400 hover:bg-gray-100'}`}>
                  {num}
                </span>
              ))}
            </div>
            <button className="px-5 py-2 bg-[#0055A5] text-white rounded-xl text-xs font-semibold hover:bg-[#004485] transition-all">Next</button>
          </div>
        </div>
      </div>

      <ActiveModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}