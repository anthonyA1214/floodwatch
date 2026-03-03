// interactive-map-page.tsx
'use client';

import SearchBar from '@/components/map/search-bar';
import MapLegend from '@/components/map/map-legend';
import InteractiveMap, {
  InteractiveMapHandle,
} from '@/components/map/interactive-map';
import { Suspense, useRef, useState } from 'react';
import ProfilePanel from '@/components/map/profile-panel';
import { usePanel } from '@/contexts/panel-context';
import NotificationPanel from '@/components/map/notification-panel';
import { GoogleLinkToastHandler } from '@/components/shared/google-link-toast-handler';
import { MapProvider } from 'react-map-gl/maplibre';
import AffectedLocationsPanel from '@/components/map/affected-locations-panel';
import { ReportsDto } from '@repo/schemas';
import {
  IconCurrentLocation,
  IconMinus,
  IconPlus,
  IconStack2,
} from '@tabler/icons-react';
import AffectedLocationsDrawer from '@/components/map/affected-locations-drawer';
import { useLocationsPanel } from '@/contexts/locations-panel-context';
import AffectedLocationListPanel from './affected-location-list-panel';
import SafetyLocationsListPanel from './safety-location-list-panel';

export type SelectedLocation = {
  longitude: number;
  latitude: number;
  label: string;
  source?: 'nominatim' | 'custom';
};

export default function InteractiveMapPage() {
  const [selectedLocation, setSelectedLocation] =
    useState<SelectedLocation | null>(null);
  const [selectedReport, setSelectedReport] = useState<ReportsDto | null>(null);
  const [showLegend, setShowLegend] = useState(false);
  const { activePanel } = usePanel();
  const interactiveMapRef = useRef<InteractiveMapHandle>(null);

  const { locationsActivePanel, close: closeLocations } = useLocationsPanel();

  const hasLeftPanel = Boolean(selectedReport || locationsActivePanel);

  return (
    <MapProvider>
      <div className="relative w-full h-full">
        <InteractiveMap
          ref={interactiveMapRef}
          selectedLocation={selectedLocation}
          // ✅ marker click should close list panels and open details
          onSelectReport={(report) => {
            closeLocations();
            setSelectedReport(report);
          }}
        />

        {/* Overlay layer (does not block map by default) */}
        <div className="absolute inset-0 flex items-start gap-4 pointer-events-none">
          {/* LEFT SLOT */}
          <div className="flex-1 min-w-0 h-full relative pointer-events-none">
            <div className="absolute inset-0 flex items-start gap-4 pointer-events-none">
              {/* LEFT PANEL COLUMN */}
              {hasLeftPanel ? (
                <div className="h-full w-full max-w-lg p-0 pointer-events-auto min-h-0 flex flex-col">
                  {/* If report selected: show details */}
                  {selectedReport ? (
                    <div className="h-full min-h-0 flex flex-col">
                      <div className="hidden lg:flex h-full min-h-0">
                        <AffectedLocationsPanel
                          report={selectedReport}
                          onClose={() => setSelectedReport(null)}
                        />
                      </div>
                      <div className="flex lg:hidden h-full min-h-0">
                        <AffectedLocationsDrawer
                          report={selectedReport}
                          onClose={() => setSelectedReport(null)}
                        />
                      </div>
                    </div>
                  ) : (
                    // Else: show list panels
                    <div className="h-full min-h-0 flex flex-col">
                      {locationsActivePanel === 'affected' && (
                        <AffectedLocationListPanel
                          className="h-full"
                          onClose={closeLocations}
                        />
                      )}
                      {locationsActivePanel === 'safety' && (
                        <SafetyLocationsListPanel
                          className="h-full"
                          onClose={closeLocations}
                        />
                      )}
                    </div>
                  )}
                </div>
              ) : null}

              {/* SEARCH COLUMN */}
              <div className="pointer-events-auto pt-4 pl-4">
                <div className="w-full max-w-sm">
                  <SearchBar onSelectLocation={setSelectedLocation} />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT CONTROLS */}
          <div className="pointer-events-none flex flex-col gap-2 h-fit pt-4 pe-4">
            <div className="flex flex-col bg-white/80 rounded-md shadow-lg p-0.5 pointer-events-auto">
              <button
                onClick={() => interactiveMapRef.current?.zoomIn()}
                className="aspect-square hover:bg-gray-200 rounded-md p-1"
                title="Zoom In"
              >
                <IconPlus className="w-[1.5em]! h-[1.5em]!" strokeWidth={1.5} />
              </button>
              <button
                onClick={() => interactiveMapRef.current?.zoomOut()}
                className="aspect-square hover:bg-gray-200 rounded-md p-1"
                title="Zoom Out"
              >
                <IconMinus
                  className="w-[1.5em]! h-[1.5em]!"
                  strokeWidth={1.5}
                />
              </button>
            </div>

            <div className="flex flex-col bg-white/80 rounded-md shadow-lg p-0.5 pointer-events-auto">
              <button
                onClick={() => interactiveMapRef.current?.geolocate()}
                className="aspect-square hover:bg-gray-200 rounded-md p-1"
                title="Geolocate"
              >
                <IconCurrentLocation
                  className="w-[1.5em]! h-[1.5em]!"
                  strokeWidth={1.5}
                />
              </button>
            </div>

            <div className="relative flex flex-col bg-white/80 rounded-md shadow-lg p-0.5 pointer-events-auto">
              <button
                onClick={() => setShowLegend(!showLegend)}
                className="aspect-square hover:bg-gray-200 rounded-md p-1"
                title="Toggle Legend"
              >
                <IconStack2
                  className="w-[1.5em]! h-[1.5em]!"
                  strokeWidth={1.5}
                />
              </button>
              <div className="absolute top-full right-0 mt-2">
                <MapLegend show={showLegend} />
              </div>
            </div>
          </div>

          {/* TOP-RIGHT PANELS */}
          {activePanel && (
            <div className="absolute z-20 flex gap-4 md:top-0 md:right-0 md:p-4 pointer-events-none">
              <div className="pointer-events-auto">
                {activePanel === 'notification' && <NotificationPanel />}
                {activePanel === 'profile' && <ProfilePanel />}
              </div>
            </div>
          )}
        </div>

        <Suspense fallback={null}>
          <GoogleLinkToastHandler />
        </Suspense>
      </div>
    </MapProvider>
  );
}
