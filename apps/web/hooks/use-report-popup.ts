import { useState } from 'react';
import { ReportMapPinInput } from '@repo/schemas';

export function useReportPopup(
  reportMapPins: ReportMapPinInput[] | undefined,
  flyTo: (report: { longitude: number; latitude: number }) => void,
) {
  const [popupReport, setPopupReport] = useState<ReportMapPinInput | null>(
    null,
  );

  const currentIndex =
    reportMapPins?.findIndex((r) => r.id === popupReport?.id) ?? -1;

  const hasNext =
    currentIndex >= 0 && currentIndex < (reportMapPins?.length ?? 0) - 1;
  const hasPrev = currentIndex > 0;
  const currentReportIndex = currentIndex + 1;
  const total = reportMapPins?.length ?? 0;

  const openPopup = (report: ReportMapPinInput) => {
    setPopupReport(report);
    flyTo(report);
  };

  const nextReport = () => {
    if (!hasNext || !reportMapPins) return;
    const next = reportMapPins[currentIndex + 1];
    setPopupReport(next);
    flyTo(next);
  };

  const prevReport = () => {
    if (!hasPrev || !reportMapPins) return;
    const prev = reportMapPins[currentIndex - 1];
    setPopupReport(prev);
    flyTo(prev);
  };

  const closePopup = () => setPopupReport(null);

  return {
    popupReport,
    openPopup,
    closePopup,
    nextReport,
    prevReport,
    hasNext,
    hasPrev,
    currentReportIndex,
    total,
  };
}
