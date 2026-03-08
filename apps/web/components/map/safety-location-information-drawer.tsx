'use client';

import { useState } from 'react';
import { Drawer } from 'vaul';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Crosshair, MapPin, Phone } from 'lucide-react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { IconSend, IconX } from '@tabler/icons-react';
import clsx from 'clsx';

const snapPoints = ['0px', '355px', 1];

const NEARBY_PLACES = [
  { id: 'nearby-01', name: 'Camarin Healthcare and Emergency Clinic' },
  { id: 'nearby-02', name: 'Brgy 174 Covered Court' },
  { id: 'nearby-03', name: 'Caloocan City Medical Center' },
];

export default function SafetyLocationInformationDrawer({
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

      <VisuallyHidden>
        <Drawer.Title>Safety Location Information</Drawer.Title>
      </VisuallyHidden>

      <Drawer.Content
        data-testid="content"
        className="z-1 absolute flex flex-col bg-white border border-gray-200 border-b-none rounded-t-[10px] bottom-0 left-0 right-0 h-full max-h-full -mx-px"
      >
        <Drawer.Handle className="w-16! my-3! rounded-full!" />

        <div
          className={clsx('flex flex-col flex-1 min-h-0 overflow-y-auto', {
            'pointer-events-auto': snap === 1,
          })}
        >
          {/* HEADER */}
          <div className="px-4 pt-2 pb-4 shrink-0">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg font-bold text-slate-900 leading-tight">
                Dr. Jose Rodriguez Memorial Hospital
              </h2>
            </div>

            <div className="mt-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Open 24hrs</span>
              </div>

              <Badge className="bg-white border-green-400 text-green-600 border-2 text-[11px] uppercase rounded-full px-4 py-1 shrink-0">
                Hospital
              </Badge>
            </div>
          </div>

          <div className="h-px bg-gray-200 shrink-0" />

          {/* IMAGE */}
          <div className="h-[220px] bg-linear-to-b from-slate-200 to-slate-300 shrink-0" />

          <div className="h-px bg-gray-200 shrink-0" />

          {/* CONTENT */}
          <div className="flex-1 flex flex-col px-4 pt-4 pb-4 min-h-0">
            <Button className="rounded-lg h-12 shrink-0">
              <IconSend className="w-[1.5em]! h-[1.5em]!" />
              <span className="font-poppins font-medium">GET DIRECTIONS</span>
            </Button>

            <Tabs
              defaultValue="overview"
              className="mt-4 flex flex-col min-h-0"
            >
              <div className="flex gap-4 text-xs items-center px-2 lg:px-0 shrink-0">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="font-poppins font-bold opacity-50">
                  Overview
                </span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <TabsContent value="overview" className="pt-5 pr-2 space-y-6">
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">
                    Address
                  </p>

                  <div className="rounded-xl border border-slate-200 p-4">
                    <div className="flex gap-3">
                      <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-slate-800">
                          Saint Joseph Avenue, Tala, Caloocan, 1427 Metro Manila
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          14.755200, 121.047900
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">
                    Contact
                  </p>

                  <div className="rounded-xl border border-slate-200 p-4 flex items-center gap-3">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <p className="text-sm text-slate-800">0282942571</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">
                    Hours
                  </p>

                  <div className="rounded-xl border border-slate-200 p-4 flex gap-3">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Open 24 hours
                      </p>
                      <p className="text-xs text-slate-400">
                        Mon-Sun • 00:00-24:00
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">
                    About
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    The Dr. Jose N. Rodriguez Memorial Hospital, formerly known
                    as Central Luzon Sanitarium, was established in 1940 to
                    accommodate patients with Hansen&apos;s Disease across
                    Luzon.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="direction" className="pt-5 pr-2">
                <div className="space-y-5">
                  <div className="flex gap-4 items-start">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-2.5 h-2.5 mt-4 rounded-full border border-slate-300" />
                      <div className="w-px h-6 bg-slate-200" />
                      <MapPin className="w-4 h-4 text-red-500" />
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="relative">
                        <Input
                          className="h-12 px-5"
                          placeholder="Choose starting point..."
                        />
                      </div>

                      <div className="relative">
                        <Input
                          className="h-12 px-5"
                          placeholder="Choose destination..."
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-4 py-7 rounded-xl"
                  >
                    <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                      <Crosshair className="w-5 h-5 text-blue-600" />
                    </div>

                    <div className="flex flex-col items-start">
                      <span className="text-sm font-semibold text-slate-900">
                        Your Location
                      </span>
                      <span className="text-xs text-slate-400">
                        Click to use GPS
                      </span>
                    </div>
                  </Button>

                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">
                      Nearby Places
                    </p>

                    {NEARBY_PLACES.map((place) => (
                      <Button
                        key={place.id}
                        variant="ghost"
                        className="w-full justify-start gap-3 py-6 text-slate-600"
                      >
                        <MapPin className="w-4 h-4 text-slate-300" />
                        {place.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Drawer.Content>
    </Drawer.Root>
  );
}
