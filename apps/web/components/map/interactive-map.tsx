'use client';

import '@/styles/maplibre-popup-overrides.css';
import {
  forwardRef,
  Fragment,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import Map, {
  Layer,
  Marker,
  Source,
  type MapRef,
  Popup,
} from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { ReportMapPinInput } from '@repo/schemas';
import RadiusCircle from '@/components/shared/radius-circle';
import { FloodMarker } from '../markers/flood-marker';
import { getUserLocation } from '@/lib/utils/get-user-location';
import { UserLocationMarker } from '../markers/user-location-marker';
import { SearchLocationMarker } from '../markers/search-location-marker';
import { useReportMapPins } from '@/hooks/use-report-map-pins';
import { useBoundary } from '@/hooks/use-boundary';
import { useSafetyLocations } from '@/hooks/use-safety';
import { SafetyMarker } from '../markers/safety-marker';
import FloodReportPopup from './flood-report-popup';
import { useIsMobile } from '@/hooks/use-mobile';
import { useMapOverlay } from '@/contexts/map-overlay-context';
import { useReportPopup } from '@/hooks/use-report-popup';

type SelectedLocation = {
  longitude: number;
  latitude: number;
  label: string;
};

type Props = {
  selectedLocation?: SelectedLocation | null;
  onSelectReport?: (report: ReportMapPinInput) => void;
};

export type InteractiveMapHandle = {
  zoomIn: () => void;
  zoomOut: () => void;
  geolocate: () => void;
};

const InteractiveMap = forwardRef<InteractiveMapHandle, Props>(
  ({ selectedLocation, onSelectReport }, ref) => {
    const mapRef = useRef<MapRef | null>(null);
    const { caloocanGeoJSON, caloocanOutlineGeoJSON } = useBoundary();
    const [userLocation, setUserLocation] = useState<{
      longitude: number;
      latitude: number;
    } | null>(null);
    const { reportMapPins } = useReportMapPins();
    const { safetyLocations } = useSafetyLocations();
    const { activeOverlay, openReport } = useMapOverlay();
    const isMobile = useIsMobile();

    const flyTo = (report: { longitude: number; latitude: number }) => {
      mapRef.current?.flyTo({
        center: [report.longitude, report.latitude],
        zoom: Math.max(mapRef.current.getZoom(), 16),
        essential: true,
        padding: isMobile
          ? { top: 0, bottom: 350, left: 0, right: 0 }
          : { top: 250, bottom: 0, left: 0, right: 0 },
      });
    };

    const {
      popupReport,
      openPopup,
      closePopup,
      nextReport,
      prevReport,
      hasNext,
      hasPrev,
      currentReportIndex,
      total,
    } = useReportPopup(reportMapPins, flyTo);

    useEffect(() => {
      if (activeOverlay?.type !== 'report') return;

      const report = reportMapPins?.find(
        (r) => r.id === activeOverlay.reportId,
      );
      if (!report) return;

      mapRef.current?.flyTo({
        center: [report.longitude, report.latitude],
        zoom: Math.max(mapRef.current.getZoom(), 16),
        essential: true,
        padding: { top: 0, bottom: 0, left: 0, right: 0 },
      });
    }, [activeOverlay, reportMapPins]);

    useImperativeHandle(ref, () => ({
      zoomIn: () => mapRef.current?.zoomIn(),
      zoomOut: () => mapRef.current?.zoomOut(),
      geolocate: () =>
        getUserLocation().then((pos) => {
          if (pos && mapRef.current) {
            const { longitude, latitude } = pos;
            setUserLocation({ longitude, latitude });

            mapRef.current.flyTo({
              center: [longitude, latitude],
              zoom: 16,
              essential: true,
              padding: { top: 0, bottom: 0, left: 0, right: 0 },
            });
          }
        }),
    }));

    // When user searches a location, fly to it
    useEffect(() => {
      const loc = selectedLocation;
      const map = mapRef.current;
      if (!loc || !map) return;

      const currentZoom = typeof map.getZoom === 'function' ? map.getZoom() : 0;

      map.flyTo({
        center: [loc.longitude, loc.latitude],
        zoom: Math.max(currentZoom, 16),
        essential: true,
        padding: { top: 0, bottom: 0, left: 0, right: 0 },
      });
    }, [selectedLocation]);

    return (
      <Map
        id='interactive-map'
        ref={mapRef}
        initialViewState={{
          // Center around Metro Manila area (so your sample pins are visible)
          latitude: 14.69906,
          longitude: 120.99772,
          zoom: 11.5,
        }}
        mapStyle='https://tiles.openfreemap.org/styles/bright'
        attributionControl={false}
        dragRotate={false}
      >
        {/* boundary fill */}
        {caloocanGeoJSON && (
          <Source id='caloocan' type='geojson' data={caloocanGeoJSON}>
            <Layer
              id='caloocan-fill'
              type='fill'
              paint={{
                'fill-color': '#0066CC',
                'fill-opacity': 0.05,
              }}
            />
          </Source>
        )}

        {/* boundary outline */}
        {caloocanOutlineGeoJSON && (
          <Source
            id='caloocan-outline'
            type='geojson'
            data={caloocanOutlineGeoJSON}
          >
            <Layer
              id='caloocan-outline-line'
              type='line'
              paint={{
                'line-color': '#0066CC',
                'line-width': 2,
              }}
            />
          </Source>
        )}

        {/* Flood report pins */}
        {reportMapPins?.map((report) => (
          <Fragment key={report.id}>
            <Marker
              key={report.id}
              longitude={report.longitude}
              latitude={report.latitude}
              anchor='bottom'
              onClick={() => openPopup(report)}
            >
              <FloodMarker severity={report.severity} status={report.status} />
            </Marker>
            <RadiusCircle
              id={`${report.id}`}
              longitude={report.longitude}
              latitude={report.latitude}
              range={report.range}
              severity={report.severity}
            />
          </Fragment>
        ))}

        {/* safety locations pin */}
        {safetyLocations?.map((location) => (
          <Marker
            key={location.id}
            longitude={location.longitude}
            latitude={location.latitude}
            anchor='bottom'
          >
            <SafetyMarker type={location.type} />
          </Marker>
        ))}

        {/* user location pin */}
        {userLocation && (
          <Marker
            longitude={userLocation.longitude}
            latitude={userLocation.latitude}
            anchor='bottom'
            style={{ pointerEvents: 'none', opacity: 0.8 }} // allow clicks to pass through to the map
          >
            <UserLocationMarker />
          </Marker>
        )}

        {/* Search-selected location pin (red) */}
        {selectedLocation && (
          <Marker
            longitude={selectedLocation.longitude}
            latitude={selectedLocation.latitude}
            anchor='bottom'
            style={{ pointerEvents: 'none', opacity: 0.8 }} // allow clicks to pass through to the map
          >
            <SearchLocationMarker />
          </Marker>
        )}

        {popupReport && (
          <Popup
            longitude={popupReport.longitude}
            latitude={popupReport.latitude}
            anchor={isMobile ? 'top' : 'bottom'}
            offset={isMobile ? 10 : 50}
            maxWidth='none'
            onClose={closePopup}
            closeOnClick={false}
          >
            <FloodReportPopup
              onClose={closePopup}
              reportId={popupReport.id}
              onSelectReport={() => {
                onSelectReport?.(popupReport);
                openReport(popupReport.id);
                closePopup();
              }}
              nextReport={nextReport}
              prevReport={prevReport}
              hasNext={hasNext}
              hasPrev={hasPrev}
              currentReportIndex={currentReportIndex}
              total={total}
            />
          </Popup>
        )}
      </Map>
    );
  },
);

InteractiveMap.displayName = 'InteractiveMap';

export default InteractiveMap;
