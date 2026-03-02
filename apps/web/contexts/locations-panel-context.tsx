'use client';

import React, { createContext, useContext, useState } from 'react';

type LocationsActivePanel = 'affected' | 'safety' | null;

interface PanelContextType {
  locationsActivePanel: LocationsActivePanel;
  toggleLocations: (panel: 'affected' | 'safety') => void;
  close: () => void;
}

const LocationsPanelContext = createContext<PanelContextType | null>(null);

export function LocationsPanelContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locationsActivePanel, setLocationsActivePanel] =
    useState<LocationsActivePanel>(null);

  const toggleLocations = (panel: 'affected' | 'safety') => {
    setLocationsActivePanel((current) => (current === panel ? null : panel));
  };

  return (
    <LocationsPanelContext.Provider
      value={{
        locationsActivePanel,
        toggleLocations,
        close: () => setLocationsActivePanel(null),
      }}
    >
      {children}
    </LocationsPanelContext.Provider>
  );
}

export function useLocationsPanel() {
  const context = useContext(LocationsPanelContext);
  if (!context)
    throw new Error(
      'useLocationsPanel must be used within LocationsPanelProvider',
    );
  return context;
}
