import { useIsMobile } from '@/hooks/use-mobile';
import SafetyLocationInformationDrawer from './safety-location-information-drawer';
import SafetyLocationInformationPanel from './safety-location-information-panel';

export default function SafetyLocationInformationOverlay({
  onClose,
}: {
  onClose?: () => void;
}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="absolute flex lg:hidden flex-col h-full w-full">
        <SafetyLocationInformationDrawer onClose={onClose ?? (() => {})} />
      </div>
    );
  }

  return (
    <div className="hidden lg:flex flex-col h-full w-full max-w-lg">
      <SafetyLocationInformationPanel onClose={onClose ?? (() => {})} />
    </div>
  );
}
