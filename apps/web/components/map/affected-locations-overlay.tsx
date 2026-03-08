import { useIsMobile } from '@/hooks/use-mobile';
import AffectedLocationsPanel from './affected-locations-panel';
import AffectedLocationsDrawer from './affected-locations-drawer';

export default function AffectedLocationsOverlay({
  onClose,
}: {
  onClose?: () => void;
}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className='flex flex-col h-full w-full'>
        <AffectedLocationsDrawer onClose={onClose} />
      </div>
    );
  }

  return (
    <div className='flex flex-col h-full w-full max-w-lg'>
      <AffectedLocationsPanel onClose={onClose} />
    </div>
  );
}
