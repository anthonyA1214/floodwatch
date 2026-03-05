'use client';

import React, { createContext, useContext, useState } from 'react';

type MapActiveOverlay =
  | { type: 'report'; reportId: number }
  | { type: 'affected' }
  | { type: 'safety' }
  | { type: 'notification' }
  | { type: 'profile' }
  | null;

interface MapOverlayContextType {
  activeOverlay: MapActiveOverlay;
  openReport: (reportId: number) => void;
  openLocations: (type: 'affected' | 'safety') => void;
  toggle: (type: 'profile' | 'notification') => void;
  close: () => void;
}

const MapOverlayContext = createContext<MapOverlayContextType | null>(null);

export function MapOverlayProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeOverlay, setActiveOverlay] = useState<MapActiveOverlay>(null);

  const openReport = (reportId: number) => {
    setActiveOverlay({ type: 'report', reportId });
  };

  const openLocations = (type: 'affected' | 'safety') => {
    setActiveOverlay({ type });
  };

  const toggle = (type: 'profile' | 'notification') => {
    setActiveOverlay((current) => (current?.type === type ? null : { type }));
  };

  const close = () => {
    setActiveOverlay(null);
  };

  return (
    <MapOverlayContext.Provider
      value={{
        activeOverlay,
        openReport,
        openLocations,
        toggle,
        close,
      }}
    >
      {children}
    </MapOverlayContext.Provider>
  );
}

export function useMapOverlay() {
  const context = useContext(MapOverlayContext);
  if (!context)
    throw new Error('useMapOverlay must be used within MapOverlayProvider');
  return context;
}
