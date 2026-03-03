// safety-location-list-panel.tsx
'use client';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SafetyLocationsCard from '@/components/map/safety-locations-card';
import { IconChevronLeft, IconShieldCheck } from '@tabler/icons-react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

type Props = {
  title?: string;
  className?: string;
  onClose?: () => void;
};

export default function SafetyLocationsListPanel({
  title = 'Safety Locations',
  className = '',
  onClose,
}: Props) {
  const [level, setLevel] = useState<
    'all-levels' | 'critical' | 'high' | 'moderate' | 'low'
  >('all-levels');

  return (
    <aside
      className={[
        'relative w-full h-full bg-white z-50 min-h-0 flex flex-col pointer-events-auto',
        'border shadow-lg overflow-visible',
        className,
      ].join(' ')}
    >
      {/* Side close handle */}
      {onClose && (
        <button
          className="
            absolute
            -right-7
            top-1/2
            -translate-y-1/2
            h-16
            w-7
            bg-white
            border
            border-l-0
            rounded-r-xl
            z-[60]
            shadow-[4px_0px_6px_-1px_rgba(0,0,0,0.1)]
            flex
            items-center
            justify-center
            hover:bg-gray-50
          "
          onClick={onClose}
          type="button"
          aria-label="Close panel"
        >
          <IconChevronLeft className="w-4 h-4" />
        </button>
      )}

      {/* Header */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <IconShieldCheck className="w-5 h-5 text-[#0066CC]" />
          <h3 className="text-base font-semibold text-[#1f1f1f]">{title}</h3>
        </div>

        <div className="mt-3">
          <Select
            value={level}
            onValueChange={(val) =>
              setLevel(
                val as 'all-levels' | 'critical' | 'high' | 'moderate' | 'low',
              )
            }
          >
            <SelectTrigger className="w-full h-10 text-sm text-muted-foreground justify-between">
              <SelectValue placeholder="All Levels" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all-levels">All Levels</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      {/* Content */}
      <ScrollArea className="flex-1 min-h-0 overflow-hidden">
        <div className="p-4 space-y-4">
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
      </ScrollArea>
    </aside>
  );
}
