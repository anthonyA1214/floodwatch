'use client';

import SearchBar from '@/components/map/search-bar';
import MapLegend from '@/components/map/map-legend';
import InteractiveMap from '@/components/map/interactive-map';
import { useState } from 'react';
import ProfilePanel from '@/components/map/profile-panel';
import { usePanel } from '@/contexts/panel-context';
import FloatingActionButtonMenu from '@/components/map/floating-action-button-menu';
import AffectedLocationPopup from '@/components/map/affected-locations-popup';
import SafetyLocationsPopup from '@/components/map/safety-locations-popup';
import NotificationPanel from '@/components/map/notification-panel';
export default function InteractiveMapPage() {
  const [showLegend, setShowLegend] = useState(false);
  const [activePopup, setActivePopup] = useState<'affected' | 'safety' | null>(
    null,
  );
  const { activePanel } = usePanel();

  const toggleAffectedLocations = () => {
    setActivePopup(activePopup === 'affected' ? null : 'affected');
  };

  const toggleSafetyLocations = () => {
    setActivePopup(activePopup === 'safety' ? null : 'safety');
  };

  return (
    <div className="relative w-full h-full">
      <SearchBar toggleLegend={() => setShowLegend(!showLegend)} />

      <div className="absolute top-4 right-4 z-10 flex gap-4 h-full">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 justify-end">
            <MapLegend show={showLegend} />
            <FloatingActionButtonMenu
              toggleAffectedLocations={toggleAffectedLocations}
              toggleSafetyLocations={toggleSafetyLocations}
            />
          </div>
          <div className="flex justify-end">
            <AffectedLocationPopup
              show={activePopup === 'affected'}
              onClose={() => setActivePopup(null)}
            />
            <SafetyLocationsPopup
              show={activePopup === 'safety'}
              onClose={() => setActivePopup(null)}
            />
          </div>
        </div>
        {activePanel === 'notification' && <NotificationPanel />}
        {activePanel === 'profile' && <ProfilePanel />}
      </div>

      <InteractiveMap />
    </div>
  );
}
