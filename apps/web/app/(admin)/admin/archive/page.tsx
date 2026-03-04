import { DataTable } from '@/components/shared/data-table';
import SearchBar from '@/components/shared/search-bar';
import { ColumnDef } from '@tanstack/react-table';

export type FloodReportRow = {
  reportId: string;
  dateReported: string;
  location: string;
  severity: 'Critical' | 'High' | 'Moderate' | 'Low';
};

const columns: ColumnDef<FloodReportRow>[] = [
  {
    accessorKey: 'reportId',
    header: 'Report ID',
  },
  {
    accessorKey: 'dateReported',
    header: 'Date Reported',
  },
  {
    accessorKey: 'location',
    header: 'Location',
  },
  {
    accessorKey: 'severity',
    header: 'Severity',
  },
];

export default function ArchiveRecords() {
  const reports: FloodReportRow[] = [
    {
      reportId: 'FR-2026-0001',
      dateReported: '2026-01-25',
      location: 'BARANGAY 176-C',
      severity: 'Critical',
    },
  ];

  return (
    <>
      <div className="flex-1 flex flex-col bg-white ps-8 py-8 rounded-2xl gap-8 min-h-0">
        <div className="space-y-2">
          <h1 className="font-poppins text-3xl font-bold">
            Archive and Records
          </h1>
        </div>

        <SearchBar placeholder="Search archive and records..." />

        {/* IMPORTANT: give this wrapper flex-1 + min-h-0 so the table body can scroll */}
        <div className="flex-1 min-h-0">
          <DataTable columns={columns} data={reports} />
        </div>
      </div>
    </>
  );
}
