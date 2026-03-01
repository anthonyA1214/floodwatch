'use client';

/**
 * InteractiveMap (LiPAD-style Detailed Overlay)
 *
 * Layers:
 * 1) Barangay summary (flood_max_var) at low opacity (optional)
 * 2) Detailed LiPAD flood polygons (clipped) using Var classes (detailed patch look)
 *
 * Key fix:
 * - We color ALL Var values (including <=0) so the “branches” are not blank.
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
      clippedFloodGeoJSON,
    } = useBoundary();

    const { appliedBarangay, applyNonce, showBarangayFlood } = useMapUI();

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

    // Lookup barangay feature by name for fitBounds
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

    // Apply → fitBounds
    useEffect(() => {
      const map = mapRef.current?.getMap();
      if (!map) return;
      if (!applyNonce) return;
      if (!appliedBarangay) return;

      const key = normalizeName(appliedBarangay);
      const feature = barangayByName.get(key);

      if (!feature) {
        console.warn(`[Apply] Barangay not found: "${appliedBarangay}"`);
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
    }, [applyNonce, appliedBarangay, barangayByName]);

    const handleSelectReport = (report: ReportsDto) => {
      mapRef.current?.flyTo({
        center: [report.longitude, report.latitude],
        zoom: Math.max(mapRef.current.getZoom(), 16),
        essential: true,
      });
      onSelectReport(report);
    };

    // Only show overlays after Apply
    const shouldShowFloodLayer = showBarangayFlood && !!appliedBarangay;

    // Draw only the applied barangay for the summary layer
    const barangayFilter =
      appliedBarangay ? (['==', ['get', 'adm4_en'], appliedBarangay] as any) : null;

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

        {/* 1) Summary (optional) — keep low opacity so details show */}
        {shouldShowFloodLayer && barangayFloodGeoJSON && (
          <Source id="barangay-flood" type="geojson" data={barangayFloodGeoJSON}>
            <Layer
              id="barangay-summary-fill"
              type="fill"
              filter={barangayFilter ?? undefined}
              paint={{
                'fill-opacity': 0.12,
                'fill-color': [
                  'match',
                  ['coalesce', ['get', 'flood_max_var'], -1],
                  3, '#991b1b', // deep red
                  2, '#ea580c', // orange
                  1, '#facc15', // yellow
                  0, '#94a3b8', // low / none
                  '#00000000',  // transparent for missing
                ],
              }}
            />
            <Layer
              id="barangay-summary-outline"
              type="line"
              filter={barangayFilter ?? undefined}
              paint={{
                'line-color': '#0f172a',
                'line-width': 1.2,
                'line-opacity': 0.9,
              }}
            />
          </Source>
        )}

        {/* 2) Detailed LiPAD overlay (CLIPPED polygons) */}
        {shouldShowFloodLayer && clippedFloodGeoJSON && (
          <Source id="lipad-flood" type="geojson" data={clippedFloodGeoJSON}>
            <Layer
              id="lipad-flood-fill"
              type="fill"
              // Tip: show detail a bit later like LiPAD (optional)
              minzoom={13}
              paint={{
                // Convert Var to number safely (if it was string)
                'fill-color': [
                  'let',
                  'v',
                  ['coalesce', ['to-number', ['get', 'Var']], -999],
                  [
                    'match',
                    ['var', 'v'],
                    // Many datasets use <=0 / negatives for “very low / safe / tiny branches”
                    -2, '#e2e8f0',
                    -1, '#cbd5e1',
                     0, '#fde047', // yellow (low)
                     1, '#fb923c', // orange (med)
                     2, '#ef4444', // red (high)
                     3, '#991b1b', // dark red (very high)
                    '#00000000'    // unknown/no-data -> transparent
                  ],
                ],
                'fill-opacity': 0.5,
              }}
            />

            {/* Patch outlines = “detailed” look */}
            <Layer
              id="lipad-flood-outline"
              type="line"
              minzoom={13}
              paint={{
                'line-color': '#ffffff',
                'line-width': 0.8,
                'line-opacity': 0.85,
              }}
            />
          </Source>
        )}

        {/* Caloocan outline */}
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
          <Marker longitude={userLocation.longitude} latitude={userLocation.latitude} anchor="bottom">
            <UserLocationMarker />
          </Marker>
        )}

        {/* Search-selected location */}
        {selectedLocation && (
          <Marker longitude={selectedLocation.longitude} latitude={selectedLocation.latitude} anchor="bottom">
            <SearchLocationMarker />
          </Marker>
        )}
      </MapGL>
    );
  },
);

InteractiveMap.displayName = 'InteractiveMap';
export default InteractiveMap;