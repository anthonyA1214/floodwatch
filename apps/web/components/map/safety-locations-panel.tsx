'use client';

import { IconChevronLeft, IconShieldCheck } from '@tabler/icons-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Separator } from '../ui/separator';
import SafetyLocationsCard from './safety-locations-card';

export default function SafetyLocationsPanel({
  onClose,
}: {
  onClose?: () => void;
}) {
  return (
    <div className="relative w-full h-full bg-white z-50 min-h-0 flex flex-col pointer-events-auto">
      <button
        className="absolute bg-white top-1/2 translate-x-full right-0 h-16 -translate-y-1/2 
        rounded-r-2xl ps-1 py-1 pr-1.5 text-xs z-30 shadow-[4px_0px_6px_-1px_rgba(0,0,0,0.1)]"
        onClick={onClose}
      >
        <IconChevronLeft className="w-[1.5em]! h-[1.5em]!" />
      </button>

      <div className="flex flex-col gap-4 flex-1 min-h-0 py-4">
        {/* Header */}

        <div className="flex items-center gap-2 font-semibold text-lg px-4">
          <IconShieldCheck className="w-[1.5em]! h-[1.5em]! text-[#0066CC]" />
          <span>Safety Locations</span>
        </div>

        <Separator />

        {/* Filter using Select */}
        <div className="px-4">
          <Select defaultValue="all-types">
            <SelectTrigger className="w-full text-sm text-gray-600 py-3 justify-between">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all-types">All Types</SelectItem>
              <SelectItem value="shelter">Shelters</SelectItem>
              <SelectItem value="hospital">Hospitals</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 overflow-y-auto flex-1 min-h-0 px-4">
          <SafetyLocationsCard
            type="shelter"
            name="Community Safe Haven"
            address="123 Safety St, Safeville"
            availability="Open 24/7"
          />
          <SafetyLocationsCard
            type="shelter"
            name="Downtown Shelter"
            address="456 Help Ave, Caretown"
            availability="Mon-Fri 9am-5pm"
          />
          <SafetyLocationsCard
            type="shelter"
            name="Neighborhood Refuge"
            address="789 Support Rd, Kindcity"
            availability="Open 24/7"
          />
          <SafetyLocationsCard
            type="hospital"
            name="City Aid Center"
            address="101 Relief Blvd, Hopeville"
            availability="Mon-Sun 8am-8pm"
          />
          <SafetyLocationsCard
            type="shelter"
            name="Urban Safe Spot"
            address="202 Protection Ln, Securetown"
            availability="Open 24/7"
          />
          <SafetyLocationsCard
            type="hospital"
            name="Harbor Shelter"
            address="303 Sanctuary St, Havenport"
            availability="Mon-Fri 10am-6pm"
          />
        </div>
      </div>
    </div>
  );
}
