// safety-location-list-drawer.tsx
'use client';

import { useState } from 'react';
import { Drawer } from 'vaul';
import SafetyLocationsListPanel from './safety-location-list-panel';

const snapPoints = ['0px', '355px', 1];

export default function SafetyLocationsListDrawer({
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
      dismissible
      handleOnly
      snapPoints={snapPoints}
      activeSnapPoint={snap}
      setActiveSnapPoint={(newSnap) => {
        if (newSnap === snapPoints[0]) handleOpenChange(false);
        else setSnap(newSnap);
      }}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Drawer.Overlay className="absolute inset-0 bg-black/40 pointer-events-none" />

      <Drawer.Content className="absolute bottom-0 left-0 right-0 h-full max-h-full bg-white border border-gray-200 rounded-t-[10px] -mx-px">
        <Drawer.Handle className="w-16! my-3! h-3! rounded-full!" />

        {/* ✅ FULL WIDTH */}
        <div className="w-full h-[calc(100%-24px)] px-0 pb-2">
          <SafetyLocationsListPanel className="h-full border-0 shadow-none" />
        </div>
      </Drawer.Content>
    </Drawer.Root>
  );
}
