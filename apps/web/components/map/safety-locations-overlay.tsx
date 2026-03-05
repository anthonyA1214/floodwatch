import { useIsMobile } from '@/hooks/use-mobile';
import SafetyLocationsDrawer from './safety-locations-drawer';
import SafetyLocationsPanel from './safety-locations-panel';

export default function AffectedLocationsOverlay({
  onClose,
}: {
  onClose?: () => void;
}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="flex lg:hidden flex-col h-full w-full">
        <SafetyLocationsDrawer onClose={onClose} />
      </div>
    );
  }

  return (
    <div className="hidden lg:flex flex-col h-full w-full max-w-lg">
      <SafetyLocationsPanel onClose={onClose} />
    </div>
  );
}
