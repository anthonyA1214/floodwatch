import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SafetyLocationsCard from '@/components/map/safety-locations-card';
import { IconShieldCheck, IconX } from '@tabler/icons-react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function SafetyLocationsPopup({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) {
  if (!show) return null;

  return (
    <div
      className="flex-1 flex flex-col bg-white rounded-xl shadow-lg 
    border max-w-sm p-4 gap-4 max-h-[60vh] overflow-hidden min-h-0 "
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-8">
        <div className="flex items-center gap-2 font-semibold text-sm">
          <IconShieldCheck className="w-[1.5em]! h-[1.5em]! text-[#0066CC]" />
          <span>Safety Locations</span>
        </div>

        <button onClick={onClose} className="text-xs">
          <IconX className="w-[1.5em]! h-[1.5em]! text-[#525254] hover:text-black" />
        </button>
      </div>

      <Separator />

      {/* Filter using Select */}
      <div>
        <Select defaultValue="all-levels">
          <SelectTrigger className="w-full text-sm text-gray-600 py-3 justify-between">
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

      {/* Content */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="space-y-4 pr-4">
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
    </div>
  );
}
