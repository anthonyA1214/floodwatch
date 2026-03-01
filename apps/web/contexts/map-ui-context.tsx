'use client';

/**
 * MapUIContext
 *
 * We separate "selected" vs "applied":
 * - selectedBarangay: what user is currently picking in the dropdown
 * - appliedBarangay: what user confirmed by pressing Apply
 *
 * This lets you:
 * - Only show flood overlays AFTER Apply
 * - Fit bounds only AFTER Apply
 */

import React, { createContext, useContext, useMemo, useState } from 'react';

type MapUIContextType = {
  // Flood overlay toggle
  showBarangayFlood: boolean;
  setShowBarangayFlood: (v: boolean) => void;

  // Dropdown selection (draft)
  selectedBarangay: string | null;
  setSelectedBarangay: (v: string | null) => void;

  // Applied selection (confirmed)
  appliedBarangay: string | null;

  // Apply trigger counter (useful for effects)
  applyNonce: number;
  apply: () => void;

  // Optional reset
  clearApplied: () => void;
};

const MapUIContext = createContext<MapUIContextType | null>(null);

export function MapUIProvider({ children }: { children: React.ReactNode }) {
  const [showBarangayFlood, setShowBarangayFlood] = useState(true);

  const [selectedBarangay, setSelectedBarangay] = useState<string | null>(null);
  const [appliedBarangay, setAppliedBarangay] = useState<string | null>(null);

  const [applyNonce, setApplyNonce] = useState(0);

  const value = useMemo(
    () => ({
      showBarangayFlood,
      setShowBarangayFlood,

      selectedBarangay,
      setSelectedBarangay,

      appliedBarangay,

      applyNonce,
      apply: () => {
        // Commit the selection only when Apply is pressed
        setAppliedBarangay(selectedBarangay);
        setApplyNonce((n) => n + 1);
      },

      clearApplied: () => setAppliedBarangay(null),
    }),
    [showBarangayFlood, selectedBarangay, appliedBarangay, applyNonce],
  );

  return <MapUIContext.Provider value={value}>{children}</MapUIContext.Provider>;
}

export function useMapUI() {
  const ctx = useContext(MapUIContext);
  if (!ctx) throw new Error('useMapUI must be used within MapUIProvider');
  return ctx;
}