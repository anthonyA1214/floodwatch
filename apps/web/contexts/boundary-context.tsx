// ✅ FILE: apps/web/src/contexts/boundary-context.tsx
// FULL UPDATED FILE (drop-in replace)
//
// Fixes included:
// - safe fetchJson() with res.ok check
// - safeNumber() helper so flood_pct is NEVER null/NaN
// - safer area() handling
// - sanity log to prove there are no nullish flood_pct values
// - reuses your existing logic (idle compute, toggle-based, cached in state)

'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import * as turf from '@turf/turf';
import { useMapUI } from '@/contexts/map-ui-context';

type BoundaryContextType = {
  caloocanGeoJSON: GeoJSON.FeatureCollection | null;
  caloocanOutlineGeoJSON: GeoJSON.FeatureCollection | null;

  barangayGeoJSON: GeoJSON.FeatureCollection | null;
  floodGeoJSON: GeoJSON.FeatureCollection | null;

  barangayFloodGeoJSON: GeoJSON.FeatureCollection | null;
  isComputingBarangayFlood: boolean;
  barangayFloodError: string | null;
};

const BoundaryContext = createContext<BoundaryContextType | null>(null);

function isPolyLike(feature: any) {
  const t = feature?.geometry?.type;
  return t === 'Polygon' || t === 'MultiPolygon';
}

function safeNumber(v: unknown, fallback = 0) {
  const n = typeof v === 'number' ? v : Number(v);
  return Number.isFinite(n) ? n : fallback;
}

/**
 * IMPORTANT:
 * Turf v7+ intersect expects a FeatureCollection with >=2 geometries:
 * turf.intersect(turf.featureCollection([a, b]))
 */
function computeFloodPerBarangay(
  barangays: GeoJSON.FeatureCollection,
  flood: GeoJSON.FeatureCollection,
): GeoJSON.FeatureCollection {
  const floodFeatures = (flood.features ?? []).filter(
    (f: any) => f?.geometry && isPolyLike(f),
  ) as any[];

  const features = (barangays.features ?? []).map((bgy: any) => {
    // If barangay feature isn't polygon-like, keep it but force flood_pct = 0 (number)
    if (!bgy?.geometry || !isPolyLike(bgy)) {
      return {
        ...bgy,
        properties: {
          ...(bgy?.properties ?? {}),
          flood_pct: 0,
        },
      };
    }

    // ✅ compute area safely (never throw, never NaN)
    let bgyArea = 0;
    try {
      bgyArea = safeNumber(turf.area(bgy), 0);
    } catch {
      bgyArea = 0;
    }

    let floodedArea = 0;

    for (const f of floodFeatures) {
      try {
        if (turf.booleanDisjoint(bgy, f)) continue;

        const inter = turf.intersect(turf.featureCollection([bgy, f]) as any);
        if (!inter) continue;

        floodedArea += safeNumber(turf.area(inter as any), 0);
      } catch (err) {
        console.warn('Intersect failed for', bgy?.properties?.adm4_en, err);
      }
    }

    const pctRaw = bgyArea > 0 ? (floodedArea / bgyArea) * 100 : 0;
    const pctSafe = safeNumber(Number(pctRaw.toFixed(2)), 0);

    return {
      ...bgy,
      properties: {
        ...(bgy?.properties ?? {}),
        flood_pct: pctSafe, // ✅ ALWAYS a finite number
      },
    };
  });

  // ✅ Sanity + summary logs
  try {
    const pcts = features
      .map((f: any) => f?.properties?.flood_pct)
      .map((v: any) => safeNumber(v, NaN))
      .filter((n: any) => Number.isFinite(n));

    const nullish = features.filter((f: any) => {
      const v = f?.properties?.flood_pct;
      return v == null || !Number.isFinite(Number(v));
    }).length;

    const max = pcts.length ? Math.max(...pcts) : 0;
    const nonZero = pcts.filter((n: number) => n > 0).length;

    console.log('[Flood sanity]', { nullish, total: features.length });
    console.log(
      `[Flood stats] nonZero barangays: ${nonZero}/${pcts.length}, max flood_pct: ${max}`,
    );
  } catch {}

  return { type: 'FeatureCollection', features } as GeoJSON.FeatureCollection;
}

export function BoundaryProvider({ children }: { children: React.ReactNode }) {
  const { showBarangayFlood } = useMapUI();

  const [caloocanGeoJSON, setCaloocanGeoJSON] =
    useState<GeoJSON.FeatureCollection | null>(null);
  const [caloocanOutlineGeoJSON, setCaloocanOutlineGeoJSON] =
    useState<GeoJSON.FeatureCollection | null>(null);

  const [barangayGeoJSON, setBarangayGeoJSON] =
    useState<GeoJSON.FeatureCollection | null>(null);
  const [floodGeoJSON, setFloodGeoJSON] =
    useState<GeoJSON.FeatureCollection | null>(null);

  const [barangayFloodGeoJSON, setBarangayFloodGeoJSON] =
    useState<GeoJSON.FeatureCollection | null>(null);

  const [isComputingBarangayFlood, setIsComputingBarangayFlood] =
    useState(false);
  const [barangayFloodError, setBarangayFloodError] = useState<string | null>(
    null,
  );

  // ✅ safer fetch: errors are explicit and visible
  useEffect(() => {
    const controller = new AbortController();

    async function fetchJson(path: string) {
      const res = await fetch(path, { signal: controller.signal });
      if (!res.ok) {
        throw new Error(
          `Failed to fetch ${path}: ${res.status} ${res.statusText}`,
        );
      }
      return res.json();
    }

    Promise.all([
      fetchJson('/geo/caloocan.geojson'),
      fetchJson('/geo/caloocan-outline.geojson'),
      fetchJson('/geo/caloocan-barangay-clean.json'),
      fetchJson('/geo/caloocan-flood-data.json'),
    ])
      .then(([details, outline, barangays, flood]) => {
        setCaloocanGeoJSON(details);
        setCaloocanOutlineGeoJSON(outline);
        setBarangayGeoJSON(barangays);
        setFloodGeoJSON(flood);

        console.log('[GeoJSON loaded]', {
          caloocan: details?.features?.length,
          outline: outline?.features?.length,
          barangays: barangays?.features?.length,
          flood: flood?.features?.length,
        });
      })
      .catch((err) => {
        if (err?.name === 'AbortError') return;
        console.error('Failed to load GeoJSON files', err);
        setBarangayFloodError(err?.message ?? 'Failed to load GeoJSON files');
      });

    return () => controller.abort();
  }, []);

  // Lazy compute only when toggle ON (cached)
  useEffect(() => {
    if (!showBarangayFlood) return;
    if (barangayFloodGeoJSON) return;
    if (!barangayGeoJSON || !floodGeoJSON) return;
    if (isComputingBarangayFlood) return;
    if (barangayFloodError) return; // ✅ don't loop compute if already error

    let cancelled = false;
    setIsComputingBarangayFlood(true);
    setBarangayFloodError(null);

    const run = () => {
      try {
        console.log('[Compute flood] starting…', {
          barangays: barangayGeoJSON?.features?.length,
          flood: floodGeoJSON?.features?.length,
        });

        const computed = computeFloodPerBarangay(barangayGeoJSON, floodGeoJSON);
        if (!cancelled) setBarangayFloodGeoJSON(computed);
      } catch (e: any) {
        if (!cancelled) {
          console.error('Failed to compute barangay flood stats', e);
          setBarangayFloodError(e?.message ?? 'Failed to compute flood stats');
        }
      } finally {
        if (!cancelled) setIsComputingBarangayFlood(false);
      }
    };

    const ric = (globalThis as any).requestIdleCallback as
      | ((cb: () => void) => number)
      | undefined;

    let id: number | undefined;

    if (typeof ric === 'function') id = ric(run);
    else id = window.setTimeout(run, 0);

    return () => {
      cancelled = true;
      const cic = (globalThis as any).cancelIdleCallback as
        | ((id: number) => void)
        | undefined;
      if (typeof cic === 'function' && typeof id === 'number') cic(id);
      if (typeof id === 'number') window.clearTimeout(id);
    };
  }, [
    showBarangayFlood,
    barangayFloodGeoJSON,
    barangayGeoJSON,
    floodGeoJSON,
    isComputingBarangayFlood,
    barangayFloodError,
  ]);

  const value = useMemo(
    () => ({
      caloocanGeoJSON,
      caloocanOutlineGeoJSON,
      barangayGeoJSON,
      floodGeoJSON,
      barangayFloodGeoJSON,
      isComputingBarangayFlood,
      barangayFloodError,
    }),
    [
      caloocanGeoJSON,
      caloocanOutlineGeoJSON,
      barangayGeoJSON,
      floodGeoJSON,
      barangayFloodGeoJSON,
      isComputingBarangayFlood,
      barangayFloodError,
    ],
  );

  return (
    <BoundaryContext.Provider value={value}>{children}</BoundaryContext.Provider>
  );
}

export function useBoundary() {
  const context = useContext(BoundaryContext);
  if (!context) throw new Error('useBoundary must be used within BoundaryProvider');
  return context;
}