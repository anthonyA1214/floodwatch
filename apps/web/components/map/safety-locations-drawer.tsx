'use client';

import { clsx } from 'clsx';
import { useState } from 'react';
import { Drawer } from 'vaul';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Separator } from '../ui/separator';
import { IconShieldCheck } from '@tabler/icons-react';
import SafetyLocationsCard from './safety-locations-card';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const snapPoints = ['0px', '355px', 1];

export default function SafetyLocationsDrawer({
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
      <Drawer.Overlay className="absolute inset-0 bg-black/40 pointer-events-none" />

      <Drawer.Content
        data-testid="content"
        className="z-1 absolute flex flex-col bg-white border border-gray-200 border-b-none rounded-t-[10px] bottom-0 left-0 right-0 h-full max-h-full -mx-px"
      >
        <Drawer.Handle className="w-16! my-3! rounded-full!" />

        <VisuallyHidden>
          <Drawer.Title>Safety Locations</Drawer.Title>
        </VisuallyHidden>

        <div
          className={clsx('flex flex-col max-w-lg mx-auto w-full pt-5 gap-2', {
            'overflow-y-auto': snap === 1,
            'overflow-hidden': snap !== 1,
          })}
        >
          <div className="flex flex-col gap-4 flex-1 min-h-0">
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
            <div className="flex flex-col gap-4 overflow-y-auto flex-1 min-h-0 px-4 pb-4">
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
      </Drawer.Content>
    </Drawer.Root>
  );
}
