'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';
import { FloodReportRow } from '@/app/(admin)/admin/archive/page';

function SeverityBadge({ severity }: { severity: FloodReportRow['severity'] }) {
  // keep it simple + consistent (pill badges like your screenshot)
  const map: Record<FloodReportRow['severity'], string> = {
    Critical: 'border-red-500 text-red-600',
    High: 'border-orange-500 text-orange-600',
    Moderate: 'border-yellow-500 text-yellow-600',
    Low: 'border-blue-500 text-blue-600',
  };

  return (
    <Badge
      variant="outline"
      className={`rounded-full border-2 px-3 py-1 text-xs font-medium ${map[severity]}`}
    >
      {severity}
    </Badge>
  );
}

export const columns: ColumnDef<FloodReportRow>[] = [
  {
    accessorKey: 'reportId',
    header: 'REPORT ID',
    cell: ({ row }) => (
      <span className="font-medium">{row.original.reportId}</span>
    ),
  },
  {
    accessorKey: 'dateReported',
    header: 'DATE REPORTED',
    cell: ({ row }) => (
      <span className="tabular-nums">{row.original.dateReported}</span>
    ),
  },
  {
    accessorKey: 'location',
    header: 'LOCATION',
    cell: ({ row }) => (
      <span className="uppercase">{row.original.location}</span>
    ),
  },
  {
    accessorKey: 'severity',
    header: 'SEVERITY LEVEL',
    cell: ({ row }) => <SeverityBadge severity={row.original.severity} />,
  },
  {
    id: 'actions',
    header: 'ACTIONS',
    cell: ({ row }) => (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => {
          // TODO: open details modal / route
          console.log('view', row.original.reportId);
        }}
        aria-label={`View report ${row.original.reportId}`}
      >
        <Eye className="h-5 w-5 text-[#0066CC]" />
      </Button>
    ),
  },
];
