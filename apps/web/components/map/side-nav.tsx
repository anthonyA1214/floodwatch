'use client';

/**
 * SideNav
 * - Toggle flood overlay
 * - Select barangay + Apply
 * - Shows loading/error for base GeoJSON + LiPAD detailed layer + clipping status
 */

import * as React from 'react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { MapPin } from 'lucide-react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

import { useMapUI } from '@/contexts/map-ui-context';
import { useBoundary } from '@/contexts/boundary-context';

function getBarangayNames(fc: GeoJSON.FeatureCollection | null) {
  if (!fc?.features?.length) return [];
  const names = new Set<string>();

  for (const f of fc.features as any[]) {
    const name = String(f?.properties?.adm4_en ?? '').trim();
    if (name) names.add(name);
  }

  return Array.from(names).sort((a, b) => a.localeCompare(b));
}

export function SideNav() {
  const {
    selectedBarangay,
    setSelectedBarangay,
    showBarangayFlood,
    setShowBarangayFlood,
    apply,
  } = useMapUI();

  const {
    barangayGeoJSON,
    isLoadingGeoJSON,
    geoJSONError,

    isLoadingFloodDetails,
    floodDetailsError,

    isClippingFlood,
    clipFloodError,
  } = useBoundary();

  const barangayNames = React.useMemo(
    () => getBarangayNames(barangayGeoJSON),
    [barangayGeoJSON],
  );

  return (
    <Sidebar className="bg-[#2F327D] border-r">
      <SidebarHeader className="p-0">
        <div className="bg-[#2F327D] text-white px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-white/15 grid place-items-center shrink-0">
              <MapPin className="size-5" />
            </div>
            <h2 className="text-lg font-semibold truncate">Location Filter</h2>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-0">
        <SidebarGroup className="px-4 py-4 space-y-4">
          {/* CITY */}
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground">CITY</p>

            <div className="rounded-xl border bg-muted px-4 py-3 flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Caloocan City</span>

              <span className="size-6 rounded-full bg-primary grid place-items-center">
                <span className="size-2.5 rounded-full bg-white" />
              </span>
            </div>
          </div>

          {/* FLOOD TOGGLE */}
          <div className="rounded-2xl border bg-background p-3 space-y-2">
            <div className="flex items-center justify-between gap-3">
              <Label className="text-sm font-semibold text-foreground">Show Flood (LiPAD)</Label>
              <Switch checked={showBarangayFlood} onCheckedChange={setShowBarangayFlood} />
            </div>

            {/* Base geojson status (barangays etc) */}
            {showBarangayFlood && isLoadingGeoJSON && (
              <p className="text-xs text-muted-foreground">Loading base map data…</p>
            )}

            {showBarangayFlood && geoJSONError && (
              <p className="text-xs text-destructive">{geoJSONError}</p>
            )}

            {/* Detailed LiPAD layer status */}
            {showBarangayFlood && isLoadingFloodDetails && (
              <p className="text-xs text-muted-foreground">
                Loading LiPAD detailed flood layer…
              </p>
            )}

            {showBarangayFlood && floodDetailsError && (
              <p className="text-xs text-destructive">{floodDetailsError}</p>
            )}

            {/* After Apply, clipping may take a moment */}
            {showBarangayFlood && isClippingFlood && (
              <p className="text-xs text-muted-foreground">
                Clipping flood polygons to barangay…
              </p>
            )}

            {showBarangayFlood && clipFloodError && (
              <p className="text-xs text-destructive">{clipFloodError}</p>
            )}
          </div>

          {/* SELECT BARANGAY */}
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground">
              SELECT BARANGAY
            </p>

            <Select
              value={selectedBarangay ?? ''}
              onValueChange={(v) => setSelectedBarangay(v || null)}
            >
              <SelectTrigger className="h-12 w-full rounded-xl">
                <SelectValue
                  placeholder={
                    barangayNames.length
                      ? 'Choose a barangay...'
                      : isLoadingGeoJSON
                        ? 'Loading barangays...'
                        : 'No barangays loaded'
                  }
                />
              </SelectTrigger>

              <SelectContent>
                {barangayNames.map((name) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* APPLY */}
          <Button className="h-12 w-full rounded-xl" onClick={apply} disabled={!selectedBarangay}>
            Apply Filter
          </Button>

          <Separator />

          {/* LEGEND (LiPAD-style) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="h-5 w-1 rounded-full bg-primary" />
              <p className="text-sm font-semibold text-foreground">Flood Depth (LiPAD)</p>
            </div>

            <div className="rounded-2xl border bg-background p-3 space-y-1">
              <LegendRow dotClass="bg-[#991b1b]" label="Very High" />
              <LegendRow dotClass="bg-[#ef4444]" label="High" />
              <LegendRow dotClass="bg-[#fb923c]" label="Medium" />
              <LegendRow dotClass="bg-[#fde047]" label="Low" />
              <LegendRow dotClass="bg-[#cbd5e1]" label="Very Low / Branches" />
            </div>
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

function LegendRow({ dotClass, label }: { dotClass: string; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-muted transition">
      <span className={cn('size-4 rounded-full shrink-0', dotClass)} />
      <span className="text-sm font-medium text-foreground">{label}</span>
    </div>
  );
}