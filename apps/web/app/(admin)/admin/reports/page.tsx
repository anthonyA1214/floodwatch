import ReportStatCards from '@/components/admin/reports/report-stat-cards';
import SearchBar from '@/components/search-bar';
import { Suspense } from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { FloodReportsDto } from '@repo/schemas';

export default function FloodReportsPage() {
  const data: FloodReportsDto[] = [
    {
      id: 1,
      userId: 101,
      name: 'Juan Dela Cruz',
      email: 'juan.delacruz@example.com',
      profilePicture: 'https://i.pravatar.cc/150?img=1',
      severity: 'high',
      status: 'verified',
      description:
        'Flood water reached knee level. Vehicles are struggling to pass.',
      range: 250,
      longitude: 121.0437,
      latitude: 14.676,
      location: 'Commonwealth Avenue, Quezon City',
      image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5',
      reportedAt: new Date().toISOString(),
    },
    {
      id: 2,
      userId: 102,
      name: 'Maria Santos',
      email: 'maria.santos@example.com',
      profilePicture: 'https://i.pravatar.cc/150?img=2',
      severity: 'moderate',
      status: 'unverified',
      description: 'Flooding near the market area, around ankle deep.',
      range: 150,
      longitude: 121.0509,
      latitude: 14.6571,
      location: 'Philcoa Market, Quezon City',
      image: 'https://images.unsplash.com/photo-1600375462888-5f9be0f5a0c5',
      reportedAt: new Date().toISOString(),
    },
    {
      id: 3,
      userId: 103,
      name: 'Carlos Reyes',
      email: 'carlos.reyes@example.com',
      profilePicture: undefined,
      severity: 'critical',
      status: 'verified',
      description: 'Waist-deep flood. Residents are evacuating.',
      range: 400,
      longitude: 121.0605,
      latitude: 14.7006,
      location: 'Tandang Sora Avenue, Quezon City',
      image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21',
      reportedAt: new Date().toISOString(),
    },
    {
      id: 4,
      userId: 104,
      name: 'Angela Cruz',
      email: 'angela.cruz@example.com',
      severity: 'low',
      status: 'unverified',
      description: 'Minor flooding on the roadside after heavy rain.',
      range: 80,
      longitude: 121.0322,
      latitude: 14.6648,
      location: 'Elliptical Road, Quezon City',
      image: undefined,
      reportedAt: new Date().toISOString(),
    },
  ];

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
          <DataTable columns={columns} data={data} />
        </Suspense>

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
