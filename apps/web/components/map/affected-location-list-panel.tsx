'use client';

import { useMemo, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { IconAlertTriangle } from '@tabler/icons-react';
import AffectedLocationsCard from '@/components/map/affected-locations-card';

type Severity = 'critical' | 'high' | 'moderate' | 'low';

type AffectedLocationItem = {
  severity: Severity;
  location: string;
  message: string;
  reportedAt: string; // ISO string
};

type Props = {
  title?: string;
  items?: AffectedLocationItem[];

  // optional: if you want this panel to be fixed on the left
  className?: string;
};

export default function AffectedLocationListPanel({
  title = 'Affected Locations',
  items,
  className = '',
}: Props) {
  const [level, setLevel] = useState<'all-levels' | Severity>('all-levels');

  const data: AffectedLocationItem[] = items ?? [
    {
      severity: 'critical',
      location: 'Barangay 174',
      message: 'Critical flood warning. Evacuation recommended.',
      reportedAt: '2026-01-28T10:30:00Z',
    },
    {
      severity: 'high',
      location: 'Barangay 174',
      message: 'Flooding at knee level. Road partially impassable.',
      reportedAt: '2026-01-28T11:30:00Z',
    },
    {
      severity: 'low',
      location: 'Barangay 174',
      message: 'Minor flooding. Passable with caution.',
      reportedAt: '2026-01-28T12:23:00Z',
    },
    {
      severity: 'low',
      location: 'Barangay 174',
      message: 'Minor flooding. Passable with caution.',
      reportedAt: '2026-01-28T12:23:00Z',
    },
  ];

  const filtered = useMemo(() => {
    if (level === 'all-levels') return data;
    return data.filter((item) => item.severity === level);
  }, [data, level]);

  return (
    <aside
      className={[
        // left panel feel
        'w-[340px] max-w-[92vw]',
        'bg-white border shadow-lg rounded-xl',
        'overflow-hidden',
        'flex flex-col',
        // height like screenshot panel
        'max-h-[70vh] min-h-0',
        className,
      ].join(' ')}
    >
      {/* Header */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <IconAlertTriangle className="w-5 h-5 text-[#FB2C36]" />
          <h3 className="text-base font-semibold text-[#1f1f1f]">{title}</h3>
        </div>

        <div className="mt-3">
          <Select
            value={level}
            onValueChange={(val) => setLevel(val as 'all-levels' | Severity)}
          >
            <SelectTrigger className="w-full h-10 text-sm text-muted-foreground justify-between">
              <SelectValue placeholder="All Levels" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all-levels">All Levels</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      {/* List */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="p-4 space-y-3">
          {filtered.map((item, index) => (
            <AffectedLocationsCard
              key={`${item.location}-${item.reportedAt}-${index}`}
              severity={item.severity}
              location={item.location}
              message={item.message}
              reportedAt={item.reportedAt}
            />
          ))}

          {filtered.length === 0 ? (
            <div className="text-sm text-muted-foreground py-10 text-center">
              No locations for this level.
            </div>
          ) : null}
        </div>
      </ScrollArea>
    </aside>
  );
}
