import AffectedLocationPopup from '@/components/map/affected-location-popup';
import EmergencyHotlines from '@/components/map/hotlines-popup';
import InteractiveMap from '@/components/map/interactive-map';
import SafetyLocationPopup from '@/components/map/safety-location-popup';
import UserFunctionButton from '@/components/map/user-function-button';

export default function MapPage() {
  return (
    <div className="h-full w-full">
      {/* <InteractiveMap /> */}
      <UserFunctionButton />
      <AffectedLocationPopup />
      {/* <SafetyLocationPopup /> */}
      <EmergencyHotlines/>
    </div>
  );
}
