'use client';

import { clsx } from 'clsx';
import { useState } from 'react';
import { Drawer } from 'vaul';
import AffectedLocationsCard from './affected-locations-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Separator } from '../ui/separator';
import { IconAlertTriangle } from '@tabler/icons-react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const snapPoints = ['0px', '355px', 1];

export default function AffectedLocationsDrawer({
  onClose,
}: {
  onClose?: () => void;
}) {
  const [snap, setSnap] = useState<number | string | null>(snapPoints[1]);
  const [open, setOpen] = useState(true);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) onClose?.();
  };

  return (
    <Drawer.Root
      modal={false}
      dismissible={true}
      handleOnly={true}
      snapPoints={snapPoints}
      activeSnapPoint={snap}
      setActiveSnapPoint={(newSnap) => {
        if (newSnap === snapPoints[0]) {
          handleOpenChange(false);
        } else {
          setSnap(newSnap);
        }
      }}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Drawer.Overlay className='absolute inset-0 bg-black/40 pointer-events-none' />

      <Drawer.Content
        data-testid='content'
        className='z-1 absolute flex flex-col bg-white border border-gray-200 border-b-none rounded-t-[10px] bottom-0 left-0 right-0 h-full max-h-full -mx-px'
      >
        <Drawer.Handle className='w-16! my-3! rounded-full! shrink-0!' />

        <VisuallyHidden>
          <Drawer.Title>Affected Locations</Drawer.Title>
        </VisuallyHidden>

        <div
          className={clsx('flex flex-col max-w-lg mx-auto w-full pt-5 gap-2', {
            'overflow-y-auto': snap === 1,
            'overflow-hidden': snap !== 1,
          })}
        >
          <div className='flex flex-col gap-4 flex-1 min-h-0'>
            {/* Header */}

            <div className='flex items-center gap-2 font-semibold text-lg px-3'>
              <IconAlertTriangle className='w-[1.5em]! h-[1.5em]! text-[#FB2C36]' />
              <span>Affected Locations</span>
            </div>

            <Separator />

            {/* Filter using Select */}
            <div className='px-3'>
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
            <div className='flex flex-col gap-4 overflow-y-auto flex-1 min-h-0 px-3 pb-3'>
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
      </Drawer.Content>
    </Drawer.Root>
  );
}
