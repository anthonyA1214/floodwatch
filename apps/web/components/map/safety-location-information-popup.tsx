import {
  IconClock,
  IconHome,
  IconMapPin,
  IconSend,
  IconShield,
  IconX,
} from '@tabler/icons-react';
import { Separator } from '../ui/separator';
import { format } from 'date-fns';

type SafetyLocationInformationPopupProps = {
  onClose: () => void;
  onSelectOverview?: () => void;
  locationName?: string;
  type?: 'hospital' | 'shelter';
  createdAt?: Date | string;
};

export default function SafetyLocationInformationPopup({
  onClose,
  onSelectOverview,
  locationName = 'Dr. Jose Rodriguez Memorial Hospital',
  type = 'hospital',
  createdAt = new Date(),
}: SafetyLocationInformationPopupProps) {
  const parsedDate =
    createdAt instanceof Date ? createdAt : new Date(createdAt);

  const formattedTime = format(parsedDate, 'hh:mm a');
  const formattedDate = format(parsedDate, 'MMMM dd, yyyy');

  return (
    <div className="flex flex-col rounded-2xl overflow-hidden w-[300px] max-h-[70vh] bg-white">
      <div className="flex items-center justify-between bg-[#0066CC] p-3 text-white">
        <span className="font-poppins font-semibold text-sm">
          SAFETY LOCATION
        </span>

        <button onClick={onClose} className="text-[10px]">
          <IconX className="opacity-70 hover:opacity-100 w-[1.5em]! h-[1.5em]! duration-200" />
        </button>
      </div>

      <div className="flex flex-col bg-white">
        <div className="flex flex-col gap-2 p-3">
          <div className="flex justify-between gap-3">
            <div className="flex items-center gap-1.5 opacity-50 shrink-0">
              <IconHome className="w-[1.5em]! h-[1.5em]!" />
              <span className="font-poppins font-medium">TYPE</span>
            </div>

            <div className="inline-flex items-center rounded-full px-3 py-1 text-[#16a34a] bg-[#16a34a]/10">
              <div className="flex items-center gap-1.5 text-xs">
                <IconShield className="w-[1.5em]! h-[1.5em]!" />
                <span className="font-poppins font-medium uppercase">
                  {type}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between items-start gap-3">
            <div className="flex items-center gap-1.5 opacity-50 shrink-0">
              <IconClock className="w-[1.5em]! h-[1.5em]!" />
              <span className="font-poppins font-medium">DATE & TIME</span>
            </div>

            <div className="flex flex-col items-end gap-0.5 text-xs text-right">
              <span>{formattedDate}</span>
              <span className="opacity-50">{formattedTime}</span>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between gap-3">
            <div className="flex items-center gap-1.5 opacity-50 h-fit shrink-0">
              <IconMapPin className="w-[1.5em]! h-[1.5em]!" />
              <span className="font-poppins font-medium">LOCATION</span>
            </div>

            <span className="text-right max-w-[155px] wrap-break-word">
              {locationName}
            </span>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-2 p-3">
          <button
            className="flex min-w-0 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-3 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
            onClick={onSelectOverview}
          >
            <IconShield className="h-[1.25em]! w-[1.25em]!" />
            <span className="truncate font-poppins">OVERVIEW</span>
          </button>

          <button className="flex min-w-0 items-center justify-center gap-1.5 rounded-lg bg-secondary px-3 py-3 text-sm font-medium text-secondary-foreground transition-colors duration-200 hover:bg-secondary/80">
            <IconSend className="h-[1.25em]! w-[1.25em]!" />
            <span className="truncate font-poppins">DIRECTIONS</span>
          </button>
        </div>
      </div>
    </div>
  );
}
