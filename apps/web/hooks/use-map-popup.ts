'use client';

import { ReportMapPinInput, SafetyMapPinInput } from '@repo/schemas';
import { useState } from 'react';
import { useReportMapPins } from './use-report-map-pins';

type ActivePopup =
  | { type: 'report'; report: ReportMapPinInput }
  | { type: 'safety'; safety: SafetyMapPinInput }
  | null;

export function useMapPopup(
  flyTo: (report: { longitude: number; latitude: number }) => void,
) {
  const { reportMapPins } = useReportMapPins();
  const [activePopup, setActivePopup] = useState<ActivePopup>(null);

  const openReportPopup = (report: ReportMapPinInput) => {
    setActivePopup({ type: 'report', report });
    flyTo(report);
  };

  const openSafetyPopup = (safety: SafetyMapPinInput) => {
    setActivePopup({ type: 'safety', safety });
    flyTo(safety);
  };

  const closePopup = () => setActivePopup(null);

  const activeReportId =
    activePopup?.type === 'report' ? activePopup.report.id : null;
  const currentIndex =
    reportMapPins?.findIndex((r) => r.id === activeReportId) ?? -1;
  const hasNext =
    currentIndex >= 0 && currentIndex < (reportMapPins?.length ?? 0) - 1;
  const hasPrev = currentIndex > 0;
  const currentReportIndex = currentIndex + 1;
  const total = reportMapPins?.length ?? 0;

  const nextReport = () => {
    if (!hasNext || !reportMapPins) return;
    const next = reportMapPins[currentIndex + 1];
    setActivePopup({ type: 'report', report: next });
    flyTo(next);
  };

  const prevReport = () => {
    if (!hasPrev || !reportMapPins) return;
    const prev = reportMapPins[currentIndex - 1];
    setActivePopup({ type: 'report', report: prev });
    flyTo(prev);
  };

  // navigation for report pop up

  return {
    activePopup,
    openReportPopup,
    openSafetyPopup,
    closePopup,
    nextReport,
    prevReport,
    hasNext,
    hasPrev,
    currentReportIndex,
    total,
  };
}
