'use client';

import { IconAlertTriangle, IconChevronLeft } from '@tabler/icons-react';
import AffectedLocationsCard from './affected-locations-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Separator } from '../ui/separator';
import { useMapOverlay } from '@/contexts/map-overlay-context';

export default function AffectedLocationsListPanel() {
  const { close } = useMapOverlay();

  return (
    <div className='relative w-full h-full bg-white z-50 min-h-0 flex flex-col pointer-events-auto pt-16'>
      <button
        className='absolute bg-white top-1/2 translate-x-full right-0 h-16 -translate-y-1/2 
        rounded-r-2xl ps-1 py-1 pr-1.5 text-xs z-30 shadow-[4px_0px_6px_-1px_rgba(0,0,0,0.1)]'
        onClick={close}
      >
        <IconChevronLeft className='w-[1.5em]! h-[1.5em]!' />
      </button>

      <div className='flex flex-col gap-4 flex-1 min-h-0 py-4'>
        {/* Header */}

        <div className='flex items-center gap-2 font-semibold text-lg px-4'>
          <IconAlertTriangle className='w-[1.5em]! h-[1.5em]! text-[#FB2C36]' />
          <span>Affected Locations</span>
        </div>

        <Separator />

        {/* Filter using Select */}
        <div className='px-4'>
          <Select defaultValue='all-levels'>
            <SelectTrigger className='w-full text-sm text-gray-600 py-3 justify-between'>
              <SelectValue placeholder='All Levels' />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value='all-levels'>All Levels</SelectItem>
              <SelectItem value='critical'>Critical</SelectItem>
              <SelectItem value='high'>High</SelectItem>
              <SelectItem value='moderate'>Moderate</SelectItem>
              <SelectItem value='low'>Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Content */}
        <div className='flex flex-col gap-4 overflow-y-auto flex-1 min-h-0 px-4'>
          <AffectedLocationsCard
            severity='critical'
            location='Barangay 176'
            message='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit ut quaerat a ipsa maxime omnis facilis impedit! Vero aut modi possimus sapiente illo dolores corporis ipsum, perspiciatis placeat enim iure?'
            reportedAt='2026-01-28T10:30:00Z'
          />
          <AffectedLocationsCard
            severity='high'
            location='Barangay 42'
            message='Floodwaters reaching waist level, residents advised to evacuate immediately.'
            reportedAt='2026-01-27T08:15:00Z'
          />
          <AffectedLocationsCard
            severity='moderate'
            location='Barangay 89'
            message='Rising floodwaters, residents urged to stay alert and monitor updates.'
            reportedAt='2026-01-26T14:45:00Z'
          />
          <AffectedLocationsCard
            severity='low'
            location='Barangay 23'
            message='Minor flooding reported, residents advised to exercise caution.'
            reportedAt='2026-01-25T09:00:00Z'
          />
          <AffectedLocationsCard
            severity='low'
            location='Barangay 23'
            message='Minor flooding reported, residents advised to exercise caution.'
            reportedAt='2026-01-25T09:00:00Z'
          />
          <AffectedLocationsCard
            severity='low'
            location='Barangay 23'
            message='Minor flooding reported, residents advised to exercise caution.'
            reportedAt='2026-01-25T09:00:00Z'
          />
          <AffectedLocationsCard
            severity='low'
            location='Barangay 23'
            message='Minor flooding reported, residents advised to exercise caution.'
            reportedAt='2026-01-25T09:00:00Z'
          />
        </div>
      </div>
    </div>
  );
}
