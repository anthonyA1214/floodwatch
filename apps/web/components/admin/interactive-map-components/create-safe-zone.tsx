"use client";

import React from 'react';
import { X, ShieldCheck, Image as ImageIcon } from 'lucide-react';

interface CreateSafeZoneProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateSafeZone({ isOpen, onClose }: CreateSafeZoneProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-32px w-full max-w-5xl flex flex-col md:flex-row overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        
        <div className="flex-[1.3] relative bg-slate-200 min-h-[400px]">
          <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/120.9842,14.5995,13/800x800?access_token=YOUR_TOKEN')] bg-cover bg-center">
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-lg animate-bounce" />
             </div>
          </div>
          <button className="absolute bottom-8 left-8 bg-[#0061C2] text-white px-8 py-3 rounded-xl font-bold shadow-xl hover:bg-[#0052a3] transition-all active:scale-95">
            Click & Close
          </button>
        </div>

        <div className="flex-1 p-8 flex flex-col bg-white">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black text-gray-800 tracking-tight">Create Safe Zone</h2>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
            >
              <X size={24} />
            </button>
          </div>

          <div className="bg-[#F0F7FF] rounded-24px p-6 border border-blue-100 space-y-4">
            
            <div className="space-y-1">
              <label className="text-[10px] font-black text-blue-300 uppercase tracking-widest pl-1">Location</label>
              <input 
                type="text" 
                placeholder="Location Name"
                className="w-full p-3 bg-white rounded-xl border-none shadow-sm focus:ring-2 focus:ring-blue-400 outline-none text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-blue-300 uppercase tracking-widest pl-1">Severity Level</label>
              <select className="w-full p-3 bg-white rounded-xl border-none shadow-sm text-sm outline-none appearance-none">
                <option>Low</option>
                <option>Moderate</option>
                <option>High</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-blue-300 uppercase tracking-widest pl-1">Latitude</label>
                <input type="text" placeholder="14.5995" className="w-full p-3 bg-white rounded-xl border-none shadow-sm text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-blue-300 uppercase tracking-widest pl-1">Longitude</label>
                <input type="text" placeholder="120.9842" className="w-full p-3 bg-white rounded-xl border-none shadow-sm text-sm" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-blue-300 uppercase tracking-widest pl-1">Description</label>
              <textarea 
                placeholder="Description"
                rows={3}
                className="w-full p-3 bg-white rounded-xl border-none shadow-sm focus:ring-2 focus:ring-blue-400 outline-none text-sm resize-none"
              />
            </div>

            <div className="bg-white border-2 border-dashed border-blue-100 rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition-colors group">
              <ImageIcon className="w-8 h-8 text-gray-300 group-hover:text-blue-300 mb-1" />
              <span className="text-[11px] font-bold text-gray-400 group-hover:text-blue-400">Upload Image</span>
            </div>
          </div>

          <button className="w-full mt-6 bg-[#0061C2] text-white py-4 rounded-[18px] font-black text-sm hover:bg-[#0052a3] shadow-xl shadow-blue-100 transition-all active:scale-[0.98]">
            Post Safe Zone
          </button>
        </div>

      </div>
    </div>
  );
}