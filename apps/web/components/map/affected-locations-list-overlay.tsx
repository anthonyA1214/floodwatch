import { useIsMobile } from '@/hooks/use-mobile';
import AffectedLocationsListPanel from './affected-locations-list-panel';
import AffectedLocationsListDrawer from './affected-locations-list-drawer';

export default function AffectedLocationsListOverlay() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className='absolute inset-0 flex flex-col h-full w-full'>
        <AffectedLocationsListDrawer />
      </div>
    );
  }

  return (
    <div className='absolute inset-0 z-10 flex flex-col'>
      <AffectedLocationsListPanel />
    </div>
  );
}
