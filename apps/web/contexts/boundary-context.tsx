'use client';

/**
 * BoundaryContext (FAST: Pre-clipped LiPAD per barangay)
 *
 * Loads on mount:
 * - /geo/caloocan.geojson
 * - /geo/caloocan-outline.geojson
 * - /geo/caloocan-barangay-clean.json
 * - /geo/lipad-by-barangay/index.json   (small map: barangay -> file)
 *
 * On APPLY (only if showBarangayFlood is ON):
 * - fetch /geo/lipad-by-barangay/<file>.geojson
 * - set as clippedFloodGeoJSON (already clipped, ready to draw)
 */

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useMapUI } from '@/contexts/map-ui-context';

type LipadIndexEntry = {
  name: string;
  slug: string;
  file: string;
  candidates?: number;
  clipped?: number;
};

type LipadIndex = Record<string, LipadIndexEntry>; // key = normalized barangay name

type BoundaryContextType = {
  caloocanGeoJSON: GeoJSON.FeatureCollection | null;
  caloocanOutlineGeoJSON: GeoJSON.FeatureCollection | null;

  barangayGeoJSON: GeoJSON.FeatureCollection | null;
  barangayFloodGeoJSON: GeoJSON.FeatureCollection | null;

  // raw detailed no longer needed, but keep for compatibility
  floodGeoJSON: GeoJSON.FeatureCollection | null;

  // already-clipped detailed (loaded per barangay on Apply)
  clippedFloodGeoJSON: GeoJSON.FeatureCollection | null;

  isLoadingGeoJSON: boolean;
  geoJSONError: string | null;

  // Load index once
  isLoadingFloodDetails: boolean; // re-used: "loading LiPAD index / barangay file"
  floodDetailsError: string | null;

  // Loading per-barangay file on Apply
  isClippingFlood: boolean; // re-used: "loading per-barangay overlay"
  clipFloodError: string | null;
};

const BoundaryContext = createContext<BoundaryContextType | null>(null);

function normalizeName(v: unknown) {
  return String(v ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
}

export function BoundaryProvider({ children }: { children: React.ReactNode }) {
  const { appliedBarangay, applyNonce, showBarangayFlood } = useMapUI();

  const [caloocanGeoJSON, setCaloocanGeoJSON] = useState<GeoJSON.FeatureCollection | null>(null);
  const [caloocanOutlineGeoJSON, setCaloocanOutlineGeoJSON] =
    useState<GeoJSON.FeatureCollection | null>(null);

  const [barangayGeoJSON, setBarangayGeoJSON] = useState<GeoJSON.FeatureCollection | null>(null);
  const [barangayFloodGeoJSON, setBarangayFloodGeoJSON] =
    useState<GeoJSON.FeatureCollection | null>(null);

  // Not used anymore, but kept so your other components/types don’t break
  const [floodGeoJSON, setFloodGeoJSON] = useState<GeoJSON.FeatureCollection | null>(null);

  const [clippedFloodGeoJSON, setClippedFloodGeoJSON] =
    useState<GeoJSON.FeatureCollection | null>(null);

  const [isLoadingGeoJSON, setIsLoadingGeoJSON] = useState(false);
  const [geoJSONError, setGeoJSONError] = useState<string | null>(null);

  // Use these to represent "LiPAD index / per-barangay file load"
  const [isLoadingFloodDetails, setIsLoadingFloodDetails] = useState(false);
  const [floodDetailsError, setFloodDetailsError] = useState<string | null>(null);

  const [isClippingFlood, setIsClippingFlood] = useState(false);
  const [clipFloodError, setClipFloodError] = useState<string | null>(null);

  const [lipadIndex, setLipadIndex] = useState<LipadIndex | null>(null);

  // 1) Base load on mount + load LiPAD index
  useEffect(() => {
    const controller = new AbortController();

    async function fetchJson(path: string) {
      const res = await fetch(path, { signal: controller.signal });
      if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status} ${res.statusText}`);
      return res.json();
    }

    async function loadBase() {
      setIsLoadingGeoJSON(true);
      setGeoJSONError(null);

      // Load LiPAD index (small) in parallel
      setIsLoadingFloodDetails(true);
      setFloodDetailsError(null);

      try {
        const [details, outline, barangays, index] = await Promise.all([
          fetchJson('/geo/caloocan.geojson'),
          fetchJson('/geo/caloocan-outline.geojson'),
          fetchJson('/geo/caloocan-barangay-clean.json'),
          fetchJson('/geo/lipad-by-barangay/index.json'),
        ]);

        setCaloocanGeoJSON(details);
        setCaloocanOutlineGeoJSON(outline);

        setBarangayGeoJSON(barangays);
        setBarangayFloodGeoJSON(barangays);

        setLipadIndex(index);
      } catch (err: any) {
        if (err?.name === 'AbortError') return;

        // If base fails, keep geoJSONError
        // If index fails, keep floodDetailsError
        const msg = err?.message ?? 'Failed to load GeoJSON files';
        console.error('Load failed', err);

        // Heuristic: route error based on URL in message
        if (String(msg).includes('lipad-by-barangay/index.json')) setFloodDetailsError(msg);
        else setGeoJSONError(msg);
      } finally {
        setIsLoadingGeoJSON(false);
        setIsLoadingFloodDetails(false);
      }
    }

    loadBase();
    return () => controller.abort();
  }, []);

  // 2) Apply -> fetch preclipped barangay file
  useEffect(() => {
    if (!applyNonce) return;
    if (!showBarangayFlood) return;
    if (!appliedBarangay) return;

    let cancelled = false;

    setIsClippingFlood(true);
    setClipFloodError(null);

    const run = async () => {
      try {
        if (!lipadIndex) {
          throw new Error('LiPAD index not loaded. Check /geo/lipad-by-barangay/index.json');
        }

        const key = normalizeName(appliedBarangay);
        const entry = lipadIndex[key];

        if (!entry?.file) {
          throw new Error(`No preclipped LiPAD file found for "${appliedBarangay}"`);
        }

        const res = await fetch(`/geo/lipad-by-barangay/${entry.file}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch ${entry.file}: ${res.status} ${res.statusText}`);
        }

        const fc = (await res.json()) as GeoJSON.FeatureCollection;

        if (!cancelled) {
          setClippedFloodGeoJSON(fc);
          // optional: keep floodGeoJSON null to avoid accidental big loads
          setFloodGeoJSON(null);
        }
      } catch (err: any) {
        if (!cancelled) {
          console.error('Failed to load per-barangay LiPAD file', err);
          setClipFloodError(err?.message ?? 'Failed to load per-barangay flood overlay');
          setClippedFloodGeoJSON(null);
        }
      } finally {
        if (!cancelled) setIsClippingFlood(false);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [applyNonce, appliedBarangay, showBarangayFlood, lipadIndex]);

  const value = useMemo(
    () => ({
      caloocanGeoJSON,
      caloocanOutlineGeoJSON,
      barangayGeoJSON,
      barangayFloodGeoJSON,
      floodGeoJSON,
      clippedFloodGeoJSON,
      isLoadingGeoJSON,
      geoJSONError,
      isLoadingFloodDetails,
      floodDetailsError,
      isClippingFlood,
      clipFloodError,
    }),
    [
      caloocanGeoJSON,
      caloocanOutlineGeoJSON,
      barangayGeoJSON,
      barangayFloodGeoJSON,
      floodGeoJSON,
      clippedFloodGeoJSON,
      isLoadingGeoJSON,
      geoJSONError,
      isLoadingFloodDetails,
      floodDetailsError,
      isClippingFlood,
      clipFloodError,
    ],
  );

  return <BoundaryContext.Provider value={value}>{children}</BoundaryContext.Provider>;
}

export function useBoundary() {
  const context = useContext(BoundaryContext);
  if (!context) throw new Error('useBoundary must be used within BoundaryProvider');
  return context;
}