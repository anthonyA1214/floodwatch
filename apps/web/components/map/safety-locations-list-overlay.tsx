import { useIsMobile } from '@/hooks/use-mobile';
import SafetyLocationsListDrawer from './safety-locations-list-drawer';
import SafetyLocationsListPanel from './safety-locations-list-panel';

export default function SafetyLocationsListOverlay() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className='absolute inset-0 flex flex-col h-full w-full'>
        <SafetyLocationsListDrawer />
      </div>
    );
  }

  return (
    <div className='absolute inset-0 z-10 flex flex-col'>
      <SafetyLocationsListPanel />
    </div>
  );
}
