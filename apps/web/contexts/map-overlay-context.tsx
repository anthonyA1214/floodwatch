'use client';

import { useReportMapPins } from '@/hooks/use-report-map-pins';
import React, { createContext, useContext, useRef, useState } from 'react';

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
  nextReport: () => void;
  prevReport: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  currentReportIndex: number;
  totalReports: number;
  openLocations: (type: 'affected' | 'safety') => void;
  toggle: (type: 'profile' | 'notification') => void;
  close: () => void;
  registerFlyTo: (
    fn: (pin: { longitude: number; latitude: number }) => void,
  ) => void;
}

const MapOverlayContext = createContext<MapOverlayContextType | null>(null);

export function MapOverlayProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeOverlay, setActiveOverlay] = useState<MapActiveOverlay>(null);
  const { reportMapPins } = useReportMapPins();
  const flyToRef = useRef<
    ((pin: { longitude: number; latitude: number }) => void) | null
  >(null);

  const registerFlyTo = (
    fn: (pin: { longitude: number; latitude: number }) => void,
  ) => {
    flyToRef.current = fn;
  };

  const openReport = (reportId: number) => {
    setActiveOverlay({ type: 'report', reportId });
  };

  const currentIndex =
    activeOverlay?.type === 'report'
      ? (reportMapPins?.findIndex((pin) => pin.id === activeOverlay.reportId) ??
        -1)
      : -1;

  const totalReports = reportMapPins?.length ?? 0;
  const currentReportIndex = currentIndex + 1;
  const hasNext = currentIndex >= 0 && currentIndex < totalReports - 1;
  const hasPrev = currentIndex > 0;

  const nextReport = () => {
    if (hasNext && reportMapPins) {
      const nextPin = reportMapPins[currentIndex + 1];
      setActiveOverlay({ type: 'report', reportId: nextPin.id });
      flyToRef.current?.(nextPin);
    }
  };

  const prevReport = () => {
    if (hasPrev && reportMapPins) {
      const prevPin = reportMapPins[currentIndex - 1];
      setActiveOverlay({ type: 'report', reportId: prevPin.id });
      flyToRef.current?.(prevPin);
    }
  };

  const openLocations = (type: 'affected' | 'safety') => {
    setActiveOverlay((current) => (current?.type === type ? null : { type }));
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
        nextReport,
        prevReport,
        hasNext,
        hasPrev,
        openLocations,
        toggle,
        close,
        currentReportIndex,
        totalReports,
        registerFlyTo,
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
