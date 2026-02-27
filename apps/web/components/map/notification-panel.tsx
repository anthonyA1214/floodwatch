'use client';

import {
  IconAlertTriangle,
  IconBellRinging,
  IconWaveSine,
  IconMap,
  IconSearch,
  IconSpeakerphone,
  IconHome,
  Icon,
} from '@tabler/icons-react';

// Reusable interface for TypeScript to handle props safely
interface NotificationItemProps {
  icon: Icon;
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
    <div className="flex flex-col bg-white ps-4 py-4 w-screen md:w-[400px] md:h-[80vh] rounded-xl shadow-md pointer-events-auto">
      <h3 className="font-poppins font-semibold pb-4">Notifications</h3>

      <div className="flex-1 overflow-y-auto pr-4">
        <div className="flex flex-col">
          {/* Section: New */}
          <h2 className="font-poppins font-bold text-lg mb-6">New</h2>
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
          <h2 className="font-poppins font-bold text-lg mb-6 mt-2">Earlier</h2>
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
          <h2 className="font-poppins font-bold text-lg mb-6 mt-2">
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
