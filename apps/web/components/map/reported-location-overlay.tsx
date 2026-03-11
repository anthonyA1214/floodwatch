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
      <div className='absolute inset-0 flex flex-col h-full w-full'>
        <ReportedLocationDrawer reportId={reportId} onClose={onClose} />
      </div>
    );
  }

  return (
    <div className='absolute inset-0 z-10 flex flex-col'>
      <ReportedLocationPanel reportId={reportId} onClose={onClose} />
    </div>
  );
}
