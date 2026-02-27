'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';

type MapUIContextType = {
  showBarangayFlood: boolean;
  setShowBarangayFlood: (v: boolean) => void;

  selectedBarangay: string | null;
  setSelectedBarangay: (v: string | null) => void;

  applyNonce: number;
  apply: () => void;
};

const MapUIContext = createContext<MapUIContextType | null>(null);

export function MapUIProvider({ children }: { children: React.ReactNode }) {
  const [showBarangayFlood, setShowBarangayFlood] = useState(true);
  const [selectedBarangay, setSelectedBarangay] = useState<string | null>(null);
  const [applyNonce, setApplyNonce] = useState(0);

  const value = useMemo(
    () => ({
      showBarangayFlood,
      setShowBarangayFlood,
      selectedBarangay,
      setSelectedBarangay,
      applyNonce,
      apply: () => setApplyNonce((n) => n + 1),
    }),
    [showBarangayFlood, selectedBarangay, applyNonce],
  );

  return <MapUIContext.Provider value={value}>{children}</MapUIContext.Provider>;
}

export function useMapUI() {
  const ctx = useContext(MapUIContext);
  if (!ctx) throw new Error('useMapUI must be used within MapUIProvider');
  return ctx;
}