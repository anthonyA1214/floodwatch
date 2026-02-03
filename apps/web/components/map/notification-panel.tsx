'use client';

import React from 'react';
import {
  IconAlertTriangle,
  IconBellRinging,
  IconWaveSine,
  IconMap,
  IconSearch,
  IconSpeakerphone,
  IconHome,
} from '@tabler/icons-react';

// Reusable interface for TypeScript to handle props safely
interface NotificationItemProps {
  icon: React.ElementType;
  title: string;
  message: string;
  color?: string;
}

// Pixel-perfect Notification Item matching your image layout
const NotificationItem = ({
  icon: Icon,
  title,
  message,
  color = 'text-black',
}: NotificationItemProps) => (
  <div className="flex gap-4 mb-8 items-start">
    <div className={`mt-1 shrink-0 ${color}`}>
      {/* Icon size 32 matches the visual weight of your reference */}
      <Icon size={32} stroke={2} />
    </div>
    <div className="flex flex-col gap-1">
      <h4 className="text-[14px] leading-tight text-gray-800">
        <span className="font-bold">{title}:</span>{' '}
        <span className="font-normal text-gray-500">{message}</span>
      </h4>
    </div>
  </div>
);

export default function NotificationPanel() {
  return (
    <div className="flex flex-col bg-white rounded-xl shadow-lg p-6 w-[350px] h-[80vh] border border-gray-100 text-black">
      {/* Blue Header title */}
      <h3 className="text-[#0066CC] font-semibold text-lg mb-6">
        Notifications
      </h3>

      {/* Main Scrollable Content Area:
          Replaced ScrollArea with standard div for cleaner behavior.
          'overflow-y-auto' enables scrolling only for this section.
      */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="flex flex-col">
          {/* Section: New */}
          <h2 className="font-bold text-[22px] mb-6 text-gray-800">New</h2>
          <NotificationItem
            icon={IconAlertTriangle}
            title="Flood Alert"
            message="A danger-level flood has been detected 1.2 km from your area. Stay alert and prepare to move to higher ground."
            color="text-red-600"
          />
          <NotificationItem
            icon={IconBellRinging}
            title="Rising Water Levels"
            message="Your location is now within a monitored danger zone. Stay updated for further instructions."
            color="text-orange-400"
          />

          {/* Section: Earlier */}
          <h2 className="font-bold text-[22px] mb-6 mt-2 text-gray-800">
            Earlier
          </h2>
          <NotificationItem
            icon={IconWaveSine}
            title="Flood Severity Update"
            message="Water levels in your zone have reached Level 3 – High Risk. Avoid low-lying roads and riversides."
            color="text-blue-600"
          />
          <NotificationItem
            icon={IconMap}
            title="Area Advisory"
            message="Barangay San Isidro and nearby communities are now marked as Affected Areas due to ongoing flooding."
            color="text-red-500"
          />
          <NotificationItem
            icon={IconSearch}
            title="Flood Impact Update"
            message="3 new streets reported blocked due to high water. Check the map for reroutes."
            color="text-[#5C2D1B]"
          />

          {/* Section: Yesterday */}
          <h2 className="font-bold text-[22px] mb-6 mt-2 text-gray-800">
            Yesterday
          </h2>
          <NotificationItem
            icon={IconSpeakerphone}
            title="Critical Zone Identified"
            message="Zone 4B is currently the most heavily affected. Avoid all travel to this area."
            color="text-black"
          />
          <NotificationItem
            icon={IconHome}
            title="Safe Shelter Available"
            message="The nearest evacuation center at Lagro Community Hall is now open and ready to receive residents."
            color="text-green-700"
          />
        </div>
      </div>
    </div>
  );
}
