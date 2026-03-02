'use client';

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
  Popup,
  type MapRef,
} from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

import { ReportsDto } from '@repo/schemas';
import RadiusCircle from '@/components/shared/radius-circle';
import { FloodMarker } from '../markers/flood-marker';
import { getUserLocation } from '@/lib/utils/get-user-location';
import { UserLocationMarker } from '../markers/user-location-marker';
import { SearchLocationMarker } from '../markers/search-location-marker';
import { useReports } from '@/hooks/use-reports';
import { useBoundary } from '@/hooks/use-boundary';
import { useSafetyLocations } from '@/hooks/use-safety';
import { SafetyMarker } from '../markers/safety-marker';

import ClickTab from '@/components/map/click-tab';

type SelectedLocation = {
  longitude: number;
  latitude: number;
  label: string;
};

type Props = {
  selectedLocation?: SelectedLocation | null;
  onSelectReport?: (report: ReportsDto) => void;
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

    const { reports } = useReports();
    const { safetyLocations } = useSafetyLocations();

    // popup state (anchored to marker)
    const [selectedReport, setSelectedReport] = useState<ReportsDto | null>(
      null,
    );

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
      });
    }, [selectedLocation]);

    // keep popup visible (adds padding while keeping your flyTo behavior)
    const keepPopupOnScreen = (longitude: number, latitude: number) => {
      const map = mapRef.current;
      if (!map) return;

      // This doesn't remove your zoom — it just ensures there's space for the popup.
      map.easeTo({
        center: [longitude, latitude],
        duration: 350,
        padding: { top: 260, left: 20, right: 20, bottom: 20 },
      });
    };

    const handleSelectReport = (report: ReportsDto) => {
      const map = mapRef.current;

      // ✅ KEEP your auto zoom / flyTo behavior
      if (map) {
        map.flyTo({
          center: [report.longitude, report.latitude],
          zoom: Math.max(map.getZoom(), 16),
          essential: true,
        });
      }

      // open popup
      setSelectedReport(report);

      // optional: keep parent logic (panels etc.)
      onSelectReport?.(report);

      // make sure popup doesn't go offscreen
      keepPopupOnScreen(report.longitude, report.latitude);
    };

    return (
      <>
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
          onClick={() => setSelectedReport(null)}
        >
          {/* boundary fill */}
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

          {/* boundary outline */}
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

          {/* Flood report pins */}
          {reports?.map((report) => (
            <Fragment key={report.id}>
              <Marker
                longitude={report.longitude}
                latitude={report.latitude}
                anchor="bottom"
                onClick={(e) => {
                  // prevents map click close
                  e.originalEvent.stopPropagation();
                  handleSelectReport(report);
                }}
              >
                <div className="cursor-pointer">
                  <FloodMarker severity={report.severity} />
                </div>
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

          {/* ClickTab popup anchored ABOVE marker */}
          {selectedReport && (
            <Popup
              longitude={selectedReport.longitude}
              latitude={selectedReport.latitude}
              anchor="bottom"
              offset={50}
              closeButton={false}
              closeOnClick={false}
              className="fw-popup"
              maxWidth="none"
            >
              <div className="pointer-events-auto">
                <ClickTab onClose={() => setSelectedReport(null)} />
              </div>
            </Popup>
          )}

          {/* safety locations pin */}
          {safetyLocations?.map((location) => (
            <Marker
              key={location.id}
              longitude={location.longitude}
              latitude={location.latitude}
              anchor="bottom"
            >
              <SafetyMarker type={location.type} />
            </Marker>
          ))}

          {/* user location pin */}
          {userLocation && (
            <Marker
              longitude={userLocation.longitude}
              latitude={userLocation.latitude}
              anchor="bottom"
            >
              <UserLocationMarker />
            </Marker>
          )}

          {/* Search-selected location pin (red) */}
          {selectedLocation && (
            <Marker
              longitude={selectedLocation.longitude}
              latitude={selectedLocation.latitude}
              anchor="bottom"
            >
              <SearchLocationMarker />
            </Marker>
          )}
        </Map>
      </>
    );
  },
);

InteractiveMap.displayName = 'InteractiveMap';
export default InteractiveMap;
