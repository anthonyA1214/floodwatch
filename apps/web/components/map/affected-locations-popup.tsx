import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AffectedLocationsCard from '@/components/map/affected-locations-card';
import { IconAlertTriangle, IconX } from '@tabler/icons-react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function AffectedLocationsPopup({
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
    border max-w-sm p-4 gap-4 max-h-[60vh] overflow-hidden min-h-0"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-8">
        <div className="flex items-center gap-2 font-semibold text-sm">
          <IconAlertTriangle className="w-[1.5em]! h-[1.5em]! text-[#FB2C36]" />
          <span>Affected Locations</span>
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
          <AffectedLocationsCard
            severity="critical"
            location="Barangay 176"
            message="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit ut quaerat a ipsa maxime omnis facilis impedit! Vero aut modi possimus sapiente illo dolores corporis ipsum, perspiciatis placeat enim iure?"
            reportedAt="2026-01-28T10:30:00Z"
          />
          <AffectedLocationsCard
            severity="high"
            location="Barangay 42"
            message="Floodwaters reaching waist level, residents advised to evacuate immediately."
            reportedAt="2026-01-27T08:15:00Z"
          />
          <AffectedLocationsCard
            severity="moderate"
            location="Barangay 89"
            message="Rising floodwaters, residents urged to stay alert and monitor updates."
            reportedAt="2026-01-26T14:45:00Z"
          />
          <AffectedLocationsCard
            severity="low"
            location="Barangay 23"
            message="Minor flooding reported, residents advised to exercise caution."
            reportedAt="2026-01-25T09:00:00Z"
          />
        </div>
      </ScrollArea>
    </div>
  );
}
