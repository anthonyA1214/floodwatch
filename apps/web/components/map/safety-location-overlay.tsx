import { useIsMobile } from '@/hooks/use-mobile';
import SafetyLocationDrawer from './safety-location-drawer';
import SafetyLocationPanel from './safety-location-panel';

export default function SafetyLocationOverlay({
  safetyId,
}: {
  safetyId: number;
}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className='absolute inset-0 flex flex-col h-full w-full'>
        <SafetyLocationDrawer safetyId={safetyId} />
      </div>
    );
  }

  return (
    <div className='absolute inset-0 z-10 flex flex-col'>
      <SafetyLocationPanel safetyId={safetyId} />
    </div>
  );
}
