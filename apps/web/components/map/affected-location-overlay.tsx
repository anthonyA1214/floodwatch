import { useIsMobile } from '@/hooks/use-mobile';
import AffectedLocationDrawer from './affected-location-drawer';
import AffectedLocationPanel from './affected-location-panel';

export default function AffectedLocationOverlay({
  reportId,
}: {
  reportId: number;
}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className='absolute inset-0 flex flex-col h-full w-full'>
        <AffectedLocationDrawer reportId={reportId} />
      </div>
    );
  }

  return (
    <div className='absolute inset-0 z-10 flex flex-col'>
      <AffectedLocationPanel reportId={reportId} />
    </div>
  );
}
