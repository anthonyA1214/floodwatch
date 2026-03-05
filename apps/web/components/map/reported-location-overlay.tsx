import { useIsMobile } from '@/hooks/use-mobile';
import ReportedLocationDrawer from './reported-location-drawer';
import ReportedLocationPanel from './reported-location-panel';

export default function ReportedLocationOverlay({
  reportId,
  onClose,
}: {
  reportId: number;
  onClose?: () => void;
}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="absolute flex lg:hidden flex-col h-full w-full">
        <ReportedLocationDrawer reportId={reportId} onClose={onClose} />
      </div>
    );
  }

  return (
    <div className="hidden lg:flex flex-col h-full w-full max-w-lg">
      <ReportedLocationPanel reportId={reportId} onClose={onClose} />
    </div>
  );
}
