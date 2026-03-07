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

type SelectedLocation = {
  longitude: number;
  latitude: number;
  label: string;
};

export type SelectedSafetyLocation = {
  id: number;
  longitude: number;
  latitude: number;
};

type Props = {
  selectedLocation?: SelectedLocation | null;
  onSelectReport?: (report: ReportMapPinInput) => void;
  onSelectSafetyLocation?: (location: SelectedSafetyLocation) => void;
};

export type InteractiveMapHandle = {
  zoomIn: () => void;
  zoomOut: () => void;
  geolocate: () => void;
};

const InteractiveMap = forwardRef<InteractiveMapHandle, Props>(
  ({ selectedLocation, onSelectReport, onSelectSafetyLocation }, ref) => {
    const mapRef = useRef<MapRef | null>(null);
    const { caloocanGeoJSON, caloocanOutlineGeoJSON } = useBoundary();
    const [userLocation, setUserLocation] = useState<{
      longitude: number;
      latitude: number;
    } | null>(null);
    const { reportMapPins } = useReportMapPins();
    const { safetyLocations } = useSafetyLocations();
    const isMobile = useIsMobile();

    const [selectedReport, setSelectedReport] =
      useState<ReportMapPinInput | null>(null);

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
            });
          }
        }),
    }));

    useEffect(() => {
      const loc = selectedLocation;
      const map = mapRef.current;
      if (!loc || !map) return;

      const currentZoom = typeof map.getZoom === 'function' ? map.getZoom() : 0;

      map.flyTo({
        center: [loc.longitude, loc.latitude],
        zoom: Math.max(currentZoom, 16),
        essential: true,
      });
    }, [selectedLocation]);

    const handleSelectReport = (report: ReportMapPinInput) => {
      mapRef.current?.flyTo({
        center: [report.longitude, report.latitude],
        zoom: Math.max(mapRef.current?.getZoom() ?? 0, 16),
        essential: true,
        padding: isMobile
          ? { top: 0, bottom: 350, left: 0, right: 0 }
          : { top: 100, bottom: 0, left: 0, right: 0 },
      });

      setSelectedReport(report);
    };

    return (
      <Map
        id="interactive-map"
        ref={mapRef}
        initialViewState={{
          latitude: 14.69906,
          longitude: 120.99772,
          zoom: 11.5,
        }}
        mapStyle="https://tiles.openfreemap.org/styles/bright"
        attributionControl={false}
        dragRotate={false}
      >
        {caloocanGeoJSON && (
          <Source id="caloocan" type="geojson" data={caloocanGeoJSON}>
            <Layer
              id="caloocan-fill"
              type="fill"
              paint={{
                'fill-color': '#0066CC',
                'fill-opacity': 0.05,
              }}
            />
          </Source>
        )}

        {caloocanOutlineGeoJSON && (
          <Source
            id="caloocan-outline"
            type="geojson"
            data={caloocanOutlineGeoJSON}
          >
            <Layer
              id="caloocan-outline-line"
              type="line"
              paint={{
                'line-color': '#0066CC',
                'line-width': 2,
              }}
            />
          </Source>
        )}

        {reportMapPins?.map((report) => (
          <Fragment key={report.id}>
            <Marker
              key={report.id}
              longitude={report.longitude}
              latitude={report.latitude}
              anchor="bottom"
              onClick={() => handleSelectReport(report)}
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

        {safetyLocations?.map((location) => (
          <Marker
            key={location.id}
            longitude={location.longitude}
            latitude={location.latitude}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();

              mapRef.current?.flyTo({
                center: [location.longitude, location.latitude],
                zoom: Math.max(mapRef.current?.getZoom() ?? 0, 16),
                essential: true,
                padding: isMobile
                  ? { top: 0, bottom: 350, left: 0, right: 0 }
                  : { top: 100, bottom: 0, left: 0, right: 0 },
              });

              onSelectSafetyLocation?.({
                id: Number(location.id),
                longitude: location.longitude,
                latitude: location.latitude,
              });
            }}
          >
            <SafetyMarker type={location.type} />
          </Marker>
        ))}

        {userLocation && (
          <Marker
            longitude={userLocation.longitude}
            latitude={userLocation.latitude}
            anchor="bottom"
          >
            <UserLocationMarker />
          </Marker>
        )}

        {selectedLocation && (
          <Marker
            longitude={selectedLocation.longitude}
            latitude={selectedLocation.latitude}
            anchor="bottom"
          >
            <SearchLocationMarker />
          </Marker>
        )}

        {selectedReport && (
          <Popup
            longitude={selectedReport.longitude}
            latitude={selectedReport.latitude}
            anchor={isMobile ? 'top' : 'bottom'}
            offset={isMobile ? 10 : 50}
            maxWidth="none"
            onClose={() => setSelectedReport(null)}
            closeOnClick={false}
          >
            <FloodReportPopup
              onClose={() => setSelectedReport(null)}
              reportId={selectedReport.id}
              onSelectReport={() => {
                onSelectReport?.(selectedReport);
                setSelectedReport(null);
              }}
            />
          </Popup>
        )}
      </Map>
    );
  },
);

InteractiveMap.displayName = 'InteractiveMap';

export default InteractiveMap;
