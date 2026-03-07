// hooks/use-report-overlay-navigation.ts
import { useReportMapPins } from '@/hooks/use-report-map-pins';

export function useReportOverlayNavigation(
  activeReportId: number | null,
  setActiveReportId: (id: number) => void,
) {
  const { reportMapPins } = useReportMapPins();

  const currentIndex = activeReportId
    ? (reportMapPins?.findIndex((pin) => pin.id === activeReportId) ?? -1)
    : -1;

  const totalReports = reportMapPins?.length ?? 0;
  const currentReportIndex = currentIndex + 1;
  const hasNext = currentIndex >= 0 && currentIndex < totalReports - 1;
  const hasPrev = currentIndex > 0;

  const nextReport = () => {
    if (hasNext && reportMapPins) {
      setActiveReportId(reportMapPins[currentIndex + 1].id);
    }
  };

  const prevReport = () => {
    if (hasPrev && reportMapPins) {
      setActiveReportId(reportMapPins[currentIndex - 1].id);
    }
  };

  return {
    nextReport,
    prevReport,
    hasNext,
    hasPrev,
    currentReportIndex,
    totalReports,
  };
}
