'use client';

import '@/styles/maplibre-popup-overrides.css';
import {
  forwardRef,
  Fragment,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import Map, {
  Layer,
  Marker,
  Source,
  type MapLayerMouseEvent,
  type MapRef,
  Popup,
} from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { GeoJSONSource } from 'maplibre-gl';
import RadiusCircle from '@/components/shared/radius-circle';
import { FloodMarker } from '../shared/markers/flood-marker';
import { getUserLocation } from '@/lib/utils/get-user-location';
import { UserLocationMarker } from '../shared/markers/user-location-marker';
// import { SearchLocationMarker } from '../shared/markers/search-location-marker';
import { useReportMapPins } from '@/hooks/use-report-map-pins';
import { useBoundary } from '@/hooks/use-boundary';
import { useSafetyMapPins } from '@/hooks/use-safety-map-pins';
import { SafetyMarker } from '../shared/markers/safety-marker';
import { useIsMobile } from '@/hooks/use-mobile';
import { useMapOverlay } from '@/contexts/map-overlay-context';
import SafetyLocationPopup from './safety-location-popup';
import { useMapFilter } from '@/contexts/map-filter-context';
import { useMapPopup } from '@/contexts/map-popup-context';
import AffectedLocationPopup from './affected-location-popup';

export type InteractiveMapHandle = {
  zoomIn: () => void;
  zoomOut: () => void;
  geolocate: () => void;
};

const CLUSTER_ZOOM_THRESHOLD = 14;
const CLUSTER_TO_PIN_BUFFER = 0.2;
const PIN_SHOW_EARLY_OFFSET = 0.3;
const CLUSTER_CLICK_EXTRA_ZOOM = 0.8;

type CombinedPin =
  | {
      id: number;
      longitude: number;
      latitude: number;
      kind: 'report';
      severity: 'low' | 'moderate' | 'high' | 'critical';
      status: 'verified' | 'unverified';
      range: number;
    }
  | {
      id: number;
      longitude: number;
      latitude: number;
      kind: 'safety';
    };

type ClusterSource = GeoJSONSource & {
  getClusterExpansionZoom: (clusterId: number) => Promise<number>;
};

const hasValidCoordinates = (longitude: number, latitude: number) =>
  Number.isFinite(longitude) && Number.isFinite(latitude);

const InteractiveMap = forwardRef<InteractiveMapHandle, object>(
  (props, ref) => {
    const mapRef = useRef<MapRef | null>(null);
    const { caloocanGeoJSON, caloocanOutlineGeoJSON } = useBoundary();
    const [userLocation, setUserLocation] = useState<{
      longitude: number;
      latitude: number;
    } | null>(null);
    const [zoom, setZoom] = useState(11.5);
    const { reportMapPins } = useReportMapPins();
    const { safetyMapPins } = useSafetyMapPins();
    const { activeOverlay, openReport, openSafety } = useMapOverlay();
    const isMobile = useIsMobile();

    const { filters } = useMapFilter();
    const filteredReportMapPins = reportMapPins?.filter((r) =>
      filters.severities.has(r.severity),
    );
    const filteredSafetyMapPins = safetyMapPins?.filter((r) =>
      filters.safetyTypes.has(r.type),
    );

    const combinedPins = useMemo<CombinedPin[]>(
      () => [
        ...(filteredReportMapPins
          ?.filter((report) =>
            hasValidCoordinates(report.longitude, report.latitude),
          )
          .map((report) => ({
            id: report.id,
            longitude: report.longitude,
            latitude: report.latitude,
            kind: 'report' as const,
            severity: report.severity,
            status: report.status,
            range: report.range,
          })) ?? []),
        ...(filteredSafetyMapPins
          ?.filter((safety) =>
            hasValidCoordinates(safety.longitude, safety.latitude),
          )
          .map((safety) => ({
            id: safety.id,
            longitude: safety.longitude,
            latitude: safety.latitude,
            kind: 'safety' as const,
          })) ?? []),
      ],
      [filteredReportMapPins, filteredSafetyMapPins],
    );

    const combinedPinsGeoJson = useMemo(
      () => ({
        type: 'FeatureCollection' as const,
        features: combinedPins.map((pin) => ({
          type: 'Feature' as const,
          geometry: {
            type: 'Point' as const,
            coordinates: [pin.longitude, pin.latitude] as [number, number],
          },
          properties: {
            id: pin.id,
            kind: pin.kind,
          },
        })),
      }),
      [combinedPins],
    );

    const showClusters = zoom < CLUSTER_ZOOM_THRESHOLD + CLUSTER_TO_PIN_BUFFER;
    const showPins = zoom >= CLUSTER_ZOOM_THRESHOLD - PIN_SHOW_EARLY_OFFSET;

    const {
      activePopup,
      openReportPopup,
      openSafetyPopup,
      closePopup,
      nextReport,
      prevReport,
      hasNext,
      hasPrev,
      currentReportIndex,
      total,
      flyToRef,
    } = useMapPopup();

    useEffect(() => {
      flyToRef.current = (loc) => {
        mapRef.current?.flyTo({
          center: [loc.longitude, loc.latitude],
          zoom: Math.max(mapRef.current.getZoom(), 16),
          essential: true,
          padding: isMobile
            ? { top: 0, bottom: 350, left: 0, right: 0 }
            : { top: 250, bottom: 0, left: 0, right: 0 },
        });
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile]);

    // for next and prev panel, fly to the next or prev report
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

    // map controls exposed to parent component
    useImperativeHandle(ref, () => ({
      zoomIn: () => mapRef.current?.zoomIn(),
      zoomOut: () => mapRef.current?.zoomOut(),
      geolocate: () =>
        getUserLocation().then((pos) => {
          if (pos && mapRef.current) {
            const { longitude, latitude } = pos;
            setUserLocation({ longitude, latitude });
            mapRef.current!.flyTo({
              center: [longitude, latitude],
              zoom: 16,
              essential: true,
              padding: { top: 0, bottom: 0, left: 0, right: 0 },
            });
          }
        }),
    }));

    const handleMapClick = (event: MapLayerMouseEvent) => {
      const map = mapRef.current?.getMap();
      if (!map) return;

      const clickedCluster = map
        .queryRenderedFeatures(event.point, {
          layers: ['clusters', 'cluster-count'],
        })
        .find((feature) => feature.properties?.cluster);

      if (!clickedCluster) {
        closePopup();
        return;
      }

      if (clickedCluster.geometry.type !== 'Point') return;

      const clusterIdRaw = clickedCluster.properties?.cluster_id;
      const clusterId = Number(clusterIdRaw);
      if (!Number.isFinite(clusterId)) return;

      const source = map.getSource('all-pins-source') as
        | ClusterSource
        | undefined;
      if (!source || typeof source.getClusterExpansionZoom !== 'function') {
        return;
      }

      source
        .getClusterExpansionZoom(clusterId)
        .then((expansionZoom) => {
          const pointGeometry = clickedCluster.geometry as GeoJSON.Point;
          const [longitude, latitude] = pointGeometry.coordinates;
          const nextZoom = Math.max(
            expansionZoom + CLUSTER_CLICK_EXTRA_ZOOM,
            CLUSTER_ZOOM_THRESHOLD + 0.25,
          );
          map.easeTo({
            center: [longitude, latitude],
            zoom: nextZoom,
            duration: 350,
          });
        })
        .catch(() => {
          // no-op: ignore if source is not ready yet
        });
    };

    return (
      <Map
        id='interactive-map'
        ref={mapRef}
        initialViewState={{
          latitude: 14.69906,
          longitude: 120.99772,
          zoom: 11.5,
        }}
        mapStyle='https://tiles.openfreemap.org/styles/bright'
        attributionControl={false}
        dragRotate={false}
        interactiveLayerIds={['clusters', 'cluster-count']}
        onZoom={(event) => setZoom(event.viewState.zoom)}
        onClick={handleMapClick}
        onMouseMove={(event) => {
          const canvas = mapRef.current?.getMap().getCanvas();
          if (!canvas) return;
          const hoveringCluster = event.features?.some(
            (feature) =>
              feature.layer.id === 'clusters' ||
              feature.layer.id === 'cluster-count',
          );
          canvas.style.cursor = hoveringCluster ? 'pointer' : '';
        }}
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

        {/* Combined cluster source for all map pins */}
        {combinedPins.length > 0 && showClusters && (
          <Source
            id='all-pins-source'
            type='geojson'
            data={combinedPinsGeoJson}
            cluster={true}
            clusterMaxZoom={CLUSTER_ZOOM_THRESHOLD}
            clusterRadius={56}
          >
            <Layer
              id='clusters'
              type='circle'
              filter={['has', 'point_count']}
              paint={{
                'circle-color': '#156CC2',
                'circle-stroke-color': '#FFFFFF',
                'circle-stroke-width': 5,
                'circle-radius': [
                  'step',
                  ['get', 'point_count'],
                  28,
                  10,
                  32,
                  25,
                  36,
                ],
              }}
            />
            <Layer
              id='cluster-count'
              type='symbol'
              filter={['has', 'point_count']}
              layout={{
                'text-field': ['get', 'point_count_abbreviated'],
                'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
                'text-size': 22,
              }}
              paint={{
                'text-color': '#FFFFFF',
              }}
            />
          </Source>
        )}

        {/* Flood report pins */}
        {showPins &&
          filteredReportMapPins
            ?.filter((report) =>
              hasValidCoordinates(report.longitude, report.latitude),
            )
            .map((report) => (
              <Fragment key={report.id}>
                <Marker
                  key={report.id}
                  longitude={report.longitude}
                  latitude={report.latitude}
                  anchor='bottom'
                  onClick={(e) => {
                    e.originalEvent.stopPropagation(); // prevent the map's onClick from firing
                    openReportPopup(report);
                  }}
                >
                  <FloodMarker
                    severity={report.severity}
                    status={report.status}
                  />
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
        {showPins &&
          filteredSafetyMapPins
            ?.filter((safety) =>
              hasValidCoordinates(safety.longitude, safety.latitude),
            )
            .map((safety) => (
              <Marker
                key={safety.id}
                longitude={safety.longitude}
                latitude={safety.latitude}
                anchor='bottom'
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  openSafetyPopup(safety);
                }}
              >
                <SafetyMarker type={safety.type} />
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

        {/* Search-selected location pin */}
        {/*{selectedLocation && (
        <Marker
          longitude={selectedLocation.longitude}
          latitude={selectedLocation.latitude}
          anchor='bottom'
          style={{ pointerEvents: 'none', opacity: 0.8 }} // allow clicks to pass through to the map
        >
          <SearchLocationMarker />
        </Marker>
      )}*/}

        {activePopup?.type === 'report' && (
          <Popup
            longitude={activePopup.report.longitude}
            latitude={activePopup.report.latitude}
            anchor={isMobile ? 'top' : 'bottom'}
            offset={isMobile ? 10 : 50}
            maxWidth='none'
            onClose={closePopup}
            closeOnClick={false}
          >
            <AffectedLocationPopup
              onClose={closePopup}
              reportId={activePopup.report.id}
              onSelectReport={() => {
                openReport(activePopup.report.id);
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

        {activePopup?.type === 'safety' && (
          <Popup
            longitude={activePopup.safety.longitude}
            latitude={activePopup.safety.latitude}
            anchor={isMobile ? 'top' : 'bottom'}
            offset={isMobile ? 10 : 50}
            maxWidth='none'
            onClose={closePopup}
            closeOnClick={false}
          >
            <SafetyLocationPopup
              onClose={closePopup}
              safetyId={activePopup.safety.id}
              onSelectSafety={() => {
                openSafety(activePopup.safety.id);
                closePopup();
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
