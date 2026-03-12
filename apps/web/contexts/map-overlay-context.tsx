'use client';

import { useReportOverlayNavigation } from '@/hooks/use-report-overlay-navigation';
import React, { createContext, useContext, useState } from 'react';

type MapActiveOverlay =
  | { type: 'report'; reportId: number }
  | { type: 'safety'; safetyId: number }
  | { type: 'affected-list' }
  | { type: 'safety-list' }
  | { type: 'notification' }
  | { type: 'profile' }
  | null;

interface MapOverlayContextType {
  activeOverlay: MapActiveOverlay;
  openReport: (reportId: number) => void;
  nextReport: () => void;
  prevReport: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  currentReportIndex: number;
  totalReports: number;
  openSafety: (safetyId: number) => void;
  openLocations: (type: 'affected-list' | 'safety-list') => void;
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

  const openSafety = (safetyId: number) => {
    setActiveOverlay({ type: 'safety', safetyId });
  };

  const openLocations = (type: 'affected-list' | 'safety-list') => {
    setActiveOverlay((current) => (current?.type === type ? null : { type }));
  };

  const toggle = (type: 'profile' | 'notification') => {
    setActiveOverlay((current) => (current?.type === type ? null : { type }));
  };

  const close = () => {
    setActiveOverlay(null);
  };

  const activeReportId =
    activeOverlay?.type === 'report' ? activeOverlay.reportId : null;
  const {
    nextReport,
    prevReport,
    hasNext,
    hasPrev,
    currentReportIndex,
    totalReports,
  } = useReportOverlayNavigation(activeReportId, (id) =>
    setActiveOverlay({ type: 'report', reportId: id }),
  );

  return (
    <MapOverlayContext.Provider
      value={{
        activeOverlay,
        openReport,
        openSafety,
        openLocations,
        toggle,
        close,
        nextReport,
        prevReport,
        hasNext,
        hasPrev,
        currentReportIndex,
        totalReports,
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
