"use client";

import React from 'react';
import { Clock, MapPin } from 'lucide-react';

const severityConfig = {
  Critical: { text: 'text-red-500', icon: 'text-red-500' },
  High: { text: 'text-orange-500', icon: 'text-orange-500' },
  Moderate: { text: 'text-yellow-500', icon: 'text-yellow-500' },
  Low: { text: 'text-blue-400', icon: 'text-blue-400' },
};

interface LocationProps {
  name: string;
  description: string;
  timeAgo: string;
  severity: keyof typeof severityConfig;
}

export default function Location({ name, description, timeAgo, severity }: LocationProps) {
  const styles = severityConfig[severity];

  return (
    <div className="flex items-start gap-3 py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors px-2 cursor-pointer group">
      
      {/* Location Pin Icon */}
      <div className={`mt-1 shrink-0 ${styles.icon}`}>
        <MapPin size={18} strokeWidth={2.5} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          {/* Main Location Name (e.g., Barangay 174) */}
          <h5 className="text-[15px] font-bold text-gray-900 truncate">
            {name}
          </h5>
          
          {/* Severity Badge on the right */}
          <span className={`text-[10px] font-black uppercase tracking-widest ${styles.text}`}>
            {severity}
          </span>
        </div>
        
        {/* Short Description */}
        <p className="text-[13px] text-gray-500 mt-0.5 leading-snug">
          {description}
        </p>
        
        {/* Time Stamp */}
        <div className="flex items-center gap-1.5 mt-2 text-gray-400">
          <Clock size={14} />
          <span className="text-[11px] font-medium">{timeAgo}</span>
        </div>
      </div>
    </div>
  );
}