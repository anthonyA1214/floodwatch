'use client';

/**
 * InteractiveMap
 *
 * Flood-per-barangay layer (Option B precomputed):
 * - Source: barangayFloodGeoJSON (already enriched)
 * - Color: based on properties.flood_max_var (recommended for your legend)
 *
 * flood_max_var meaning (typical):
 * - 3: Very High
 * - 2: High
 * - 1: Moderate
 * - 0: Low
 * - missing / null: No data -> neutral gray
 */

import {
  forwardRef,
  Fragment,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import MapGL, { Layer, Marker, Source, type MapRef } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

import { ReportsDto } from '@repo/schemas';
import { SEVERITY_COLOR_MAP } from '@/lib/utils/get-color-map';
import RadiusCircle from '@/components/shared/radius-circle';
import { useBoundary } from '@/contexts/boundary-context';
import { FloodMarker } from '../markers/flood-marker';
import { getUserLocation } from '@/lib/utils/get-user-location';
import { UserLocationMarker } from '../markers/user-location-marker';
import { SearchLocationMarker } from '../markers/search-location-marker';
import { useMapUI } from '@/contexts/map-ui-context';
import * as turf from '@turf/turf';

type SelectedLocation = {
  longitude: number;
  latitude: number;
  label: string;
};

type Props = {
  selectedLocation?: SelectedLocation | null;
  reports: ReportsDto[];
  onSelectReport: (report: ReportsDto) => void;
};

export type InteractiveMapHandle = {
  zoomIn: () => void;
  zoomOut: () => void;
  geolocate: () => void;
};

function normalizeName(v: unknown) {
  return String(v ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

const InteractiveMap = forwardRef<InteractiveMapHandle, Props>(
  ({ selectedLocation, reports, onSelectReport }, ref) => {
    const mapRef = useRef<MapRef | null>(null);

    const {
      caloocanGeoJSON,
      caloocanOutlineGeoJSON,
      barangayFloodGeoJSON,
      barangayGeoJSON,
    } = useBoundary();

    // UI state from MapUIContext
    const { selectedBarangay, applyNonce, showBarangayFlood } = useMapUI();

    const [userLocation, setUserLocation] = useState<{
      longitude: number;
      latitude: number;
    } | null>(null);

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

    // Fly to searched location
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

    // Lookup barangay feature by name for Apply
    const barangayByName = useMemo(() => {
      const lookup = new Map<string, any>();
      const features = (barangayGeoJSON?.features ?? []) as any[];

      for (const f of features) {
        const name = normalizeName(f?.properties?.adm4_en);
        if (!name) continue;
        if (!lookup.has(name)) lookup.set(name, f);
      }
      return lookup;
    }, [barangayGeoJSON]);

    // Apply: fitBounds to selected barangay
    useEffect(() => {
      const map = mapRef.current?.getMap();
      if (!map) return;

      // applyNonce changes when the user clicks Apply
      if (!applyNonce) return;
      if (!selectedBarangay) return;

      const key = normalizeName(selectedBarangay);
      const feature = barangayByName.get(key);

      if (!feature) {
        console.warn(`[Apply] Barangay not found: "${selectedBarangay}"`);
        return;
      }

      const [minLng, minLat, maxLng, maxLat] = turf.bbox(feature);
      map.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        { padding: 60, duration: 900 },
      );
    }, [applyNonce, selectedBarangay, barangayByName]);

    const handleSelectReport = (report: ReportsDto) => {
      mapRef.current?.flyTo({
        center: [report.longitude, report.latitude],
        zoom: Math.max(mapRef.current.getZoom(), 16),
        essential: true,
      });
      onSelectReport(report);
    };

    return (
      <MapGL
        id="interactive-map"
        ref={mapRef}
        initialViewState={{
          latitude: 14.69906,
          longitude: 120.99772,
          zoom: 11.5,
        }}
        mapStyle="https://tiles.openfreemap.org/styles/bright"
      >
        {/* Caloocan fill */}
        {caloocanGeoJSON && (
          <Source id="caloocan" type="geojson" data={caloocanGeoJSON}>
            <Layer
              id="caloocan-fill"
              type="fill"
              paint={{
                'fill-color': 'white',
                'fill-opacity': 0.05,
              }}
            />
          </Source>
        )}

        {/* ✅ Barangay flood choropleth (precomputed) */}
        {showBarangayFlood && barangayFloodGeoJSON && (
          <Source id="barangay-flood" type="geojson" data={barangayFloodGeoJSON}>
            <Layer
              id="barangay-flood-fill"
              type="fill"
              paint={{
                'fill-opacity': 0.75,

                /**
                 * Color by flood_max_var:
                 * - 3 -> very high (blue-900)
                 * - 2 -> high      (blue-600)
                 * - 1 -> moderate  (purple-500)
                 * - 0 -> low       (slate-400)
                 * - anything else / missing -> neutral baseline (slate-200)
                 */
                'fill-color': [
                  'match',
                  ['coalesce', ['get', 'flood_max_var'], -1],
                  3, '#1e3a8a', // very high
                  2, '#2563eb', // high
                  1, '#a855f7', // moderate
                  0, '#94a3b8', // low
                  '#e2e8f0',    // baseline / no data
                ],
              }}
            />

            <Layer
              id="barangay-flood-outline"
              type="line"
              paint={{
                'line-color': '#334155',
                'line-width': 0.8,
                'line-opacity': 0.9,
              }}
            />

            {/* (Optional) Debug labels: show barangay names on the map */}
            {/* 
            <Layer
              id="barangay-name-label"
              type="symbol"
              layout={{
                'text-field': ['get', 'adm4_en'],
                'text-size': 11,
              }}
              paint={{
                'text-color': '#0f172a',
                'text-halo-color': '#ffffff',
                'text-halo-width': 1,
              }}
            />
            */}
          </Source>
        )}

        {/* Caloocan outline on top */}
        {caloocanOutlineGeoJSON && (
          <Source id="caloocan-outline" type="geojson" data={caloocanOutlineGeoJSON}>
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

        {/* Report pins */}
        {reports.map((report) => (
          <Fragment key={report.id}>
            <Marker
              longitude={report.longitude}
              latitude={report.latitude}
              color={SEVERITY_COLOR_MAP[report.severity]}
              anchor="bottom"
              onClick={() => handleSelectReport(report)}
            >
              <FloodMarker severity={report.severity} />
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

        {/* User location */}
        {userLocation && (
          <Marker
            longitude={userLocation.longitude}
            latitude={userLocation.latitude}
            anchor="bottom"
          >
            <UserLocationMarker />
          </Marker>
        )}

        {/* Search-selected location */}
        {selectedLocation && (
          <Marker
            longitude={selectedLocation.longitude}
            latitude={selectedLocation.latitude}
            anchor="bottom"
          >
            <SearchLocationMarker />
          </Marker>
        )}
      </MapGL>
    );
  },
);

InteractiveMap.displayName = 'InteractiveMap';
export default InteractiveMap;