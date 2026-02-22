'use client'; // ✅ ADDED: needed because we will use React state for the modal

import ReportStatCards from '@/components/reports/report-stat-cards';
import SearchBar from '@/components/search-bar';
import { Suspense, useState } from 'react'; // ✅ ADDED: useState
import { DataTable } from './data-table';
import { columns } from './columns';

// ✅ ADDED: import your modal component (adjust path/name if yours differs)
import ViewReportDialog from '@/components/reports/view-report-modal';

// ✅ ADDED: import FloodReportDto type (adjust if your type location differs)
import type { FloodReportDto } from '@repo/schemas';

// ✅ ADDED: import delete modal (static for now)
import DeleteReportDialog from '@/components/reports/delete-report-modal';

export default function FloodReportsPage() {
  // ✅ ADDED: state for modal open/close
  const [isViewOpen, setIsViewOpen] = useState(false);

  // ✅ ADDED: state for selected report row
  const [selectedReport, setSelectedReport] = useState<FloodReportDto | null>(
    null,
  );

  // ✅ ADDED: state for delete modal open/close
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // ✅ ADDED: state for selected report row (delete)
  const [selectedDeleteReport, setSelectedDeleteReport] =
    useState<FloodReportDto | null>(null);

  const data = [
    {
      id: 1,
      userId: 101,
      name: 'Juan dela Cruz',
      email: 'juan.delacruz@email.com',
      profilePicture: 'https://i.pravatar.cc/150?img=1',
      location: 'Marikina City, Metro Manila',
      severity: 'high' as const,
      status: 'verified' as const,
      description:
        'Flood water reached about 2 meters near the riverbank. Several houses are submerged.',
      range: '500m',
      reportedAt: '2024-11-01T08:30:00Z',
    },
    {
      id: 2,
      userId: 102,
      name: 'Maria Santos',
      email: 'maria.santos@email.com',
      location: 'Pasig City, Metro Manila',
      severity: 'medium' as const,
      status: 'unverified' as const,
      description: 'Street flooding along the main road, knee-deep water.',
      range: '200m',
      reportedAt: '2024-11-01T09:15:00Z',
    },
    {
      id: 3,
      userId: 103,
      name: 'Roberto Reyes',
      email: 'roberto.reyes@email.com',
      profilePicture: 'https://i.pravatar.cc/150?img=3',
      location: 'Cainta, Rizal',
      severity: 'low' as const,
      status: 'verified' as const,
      description: 'Minor flooding in low-lying areas, ankle-deep.',
      reportedAt: '2024-11-01T10:00:00Z',
    },
    {
      id: 4,
      userId: 104,
      name: 'Ana Villanueva',
      email: 'ana.villanueva@email.com',
      location: 'Quezon City, Metro Manila',
      severity: 'high' as const,
      status: 'verified' as const,
      description: 'Flash flood warning. Water rising rapidly near the creek.',
      range: '1km',
      reportedAt: '2024-11-01T11:45:00Z',
    },
    {
      id: 5,
      userId: 105,
      name: 'Carlo Mendoza',
      email: 'carlo.mendoza@email.com',
      profilePicture: 'https://i.pravatar.cc/150?img=5',
      location: 'Valenzuela, Metro Manila',
      severity: 'medium' as const,
      status: 'unverified' as const,
      reportedAt: '2024-11-01T12:30:00Z',
    },
  ] satisfies FloodReportDto[]; // ✅ ADDED: helps TS + ensures selectedReport type matches

  // ✅ ADDED: handler to open modal with clicked row
  function handleViewReport(report: FloodReportDto) {
    setSelectedReport(report);
    setIsViewOpen(true);
  }

  // ✅ ADDED: handler to open delete modal with clicked row
  function handleOpenDelete(report: FloodReportDto) {
    setSelectedDeleteReport(report);
    setIsDeleteOpen(true);
  }

  // ✅ ADDED: static delete confirm (no API call yet)
  function handleConfirmDelete(report: FloodReportDto) {
    // ✅ ADDED: static for now — you’ll connect to Nest API later
    console.log('DELETE CONFIRMED (static):', report.id);
  }

  return (
    <div className="flex-1 flex flex-col bg-white p-8 rounded-2xl gap-8 min-h-0">
      {/* Header */}
      <h1 className="font-poppins text-3xl font-bold">Flood Reports</h1>

      <div className="flex justify-between gap-4">
        <div className="flex-1">
          <SearchBar placeholder="Search flood reports..." />
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0 gap-4">
        <Suspense
          fallback={
            <div className="animate-pulse h-24 bg-gray-200 rounded-lg" />
          }
        >
          <ReportStatCards
            totalCount={0}
            verifiedCount={0}
            unverifiedCount={0}
          />
        </Suspense>

        <Suspense>
          <DataTable
            columns={columns}
            data={data}
            // ✅ ADDED: wire action button (eye icon) to open the modal
            onViewReport={handleViewReport}
            // ✅ ADDED: wire action button (trash icon) to open delete modal
            onDeleteReport={handleOpenDelete}
          />
        </Suspense>

        {/* ✅ ADDED: mount your static modal and feed it the selected report */}
        <ViewReportDialog
          open={isViewOpen}
          onOpenChange={(open: boolean) => {
            setIsViewOpen(open);

            // ✅ ADDED: optional cleanup when closing
            if (!open) setSelectedReport(null);
          }}
          report={selectedReport}
        />

        {/* ✅ ADDED: mount your static delete modal */}
        <DeleteReportDialog
          open={isDeleteOpen}
          onOpenChange={(open: boolean) => {
            setIsDeleteOpen(open);

            // ✅ ADDED: optional cleanup when closing
            if (!open) setSelectedDeleteReport(null);
          }}
          report={selectedDeleteReport}
          // ✅ ADDED: static confirm handler (no API yet)
          onConfirm={handleConfirmDelete}
        />

        {/* <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            Showing {data?.data?.length ?? 0} of {data?.stats?.totalCount ?? 0}{' '}
            reports
          </span>

          <div>
            <ReportPagination
              currentPage={data?.meta?.page ?? 1}
              totalPages={data?.meta?.totalPages ?? 1}
              hasNextPage={data?.meta?.hasNextPage ?? false}
              hasPrevPage={data?.meta?.hasPrevPage ?? false}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
}