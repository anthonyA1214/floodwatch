import SearchBar from '@/components/shared/search-bar';
import { DataTable } from './data-table';
import { columns } from './columns';
import { ReportQuery } from '@/lib/types/report-query';
import { getReportsData } from '@/lib/actions/get-reports-data';
import PagePagination from '@/components/shared/page-pagination';
import FloodReportsDataTableWrapper from '@/components/admin/reports/flood-reports-data-table-wrapper';
import SafetyLocationsClient from '@/components/admin/safety/safety-locations-client';
import SafetyStatCards from '@/components/admin/safety/safety-stat-cards';
import StatCardsSkeleton from '@/components/shared/admin/skeleton/stat-cards-skeleton';
import SafetyLocationsDataTableWrapper from '@/components/admin/safety/safety-locations-data-table-wrapper';
import { SafetyLocationsDto } from '@repo/schemas';

export default async function SafetyLocationsPage({
  searchParams,
}: {
  searchParams: ReportQuery;
}) {
  const data: SafetyLocationsDto[] = [
    {
      id: '1',
      latitude: 14.6571,
      longitude: 121.0335,
      type: 'shelter',
      location: 'Barangay 123 Covered Court',
      address: '123 Sampaguita St, Brgy 123, Caloocan City',
      description: 'Temporary evacuation shelter with capacity of 200 people.',
      image: 'https://example.com/images/shelter1.jpg',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      latitude: 14.6508,
      longitude: 121.0284,
      type: 'hospital',
      location: 'Caloocan City Medical Center',
      address: 'A. Mabini St, Caloocan City',
      description: 'Public hospital open 24/7 for emergency response.',
      image: 'https://example.com/images/hospital1.jpg',
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      latitude: 14.6623,
      longitude: 121.0412,
      type: 'shelter',
      location: 'Northville Elementary School',
      address: 'Northville Subdivision, Caloocan City',
      description: 'Designated evacuation site during flooding.',
      image: null,
      createdAt: new Date().toISOString(),
    },
    {
      id: '4',
      latitude: 14.6459,
      longitude: 121.0378,
      type: 'hospital',
      location: 'San Roque General Hospital',
      address: '456 Rizal Ave, Caloocan City',
      description: 'Private hospital with emergency and trauma unit.',
      image: 'https://example.com/images/hospital2.jpg',
      createdAt: new Date().toISOString(),
    },
    {
      id: '5',
      latitude: 14.6694,
      longitude: 121.0256,
      type: 'shelter',
      location: 'Bagong Silang Gymnasium',
      address: 'Phase 5, Bagong Silang, Caloocan City',
      description: null,
      image: null,
      createdAt: new Date().toISOString(),
    },
  ];

  // const params = await searchParams;
  // const data = await getReportsData(params);

  return (
    <SafetyLocationsClient>
      <div className="flex-1 flex flex-col bg-white p-8 rounded-2xl gap-8 min-h-0">
        {/* Header */}
        <h1 className="font-poppins text-3xl font-bold">Safety Locations</h1>

        <div className="flex justify-between gap-4">
          <div className="flex-1">
            <SearchBar placeholder="Search safety locations..." />
          </div>
        </div>

        <div className="flex-1 flex flex-col min-h-0 gap-4">
          <SafetyStatCards
            totalCount={0}
            shelterCount={0}
            hospitalCount={0}
            // totalCount={data?.stats?.totalCount ?? 0}
            // verifiedCount={data?.stats?.verifiedCount ?? 0}
            // unverifiedCount={data?.stats?.unverifiedCount ?? 0}
          />

          <SafetyLocationsDataTableWrapper>
            <DataTable columns={columns} data={data ?? []} />
          </SafetyLocationsDataTableWrapper>

          {/* <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              Showing {data?.data?.length ?? 0} of{' '}
              {data?.stats?.totalCount ?? 0} safety locations
            </span>

            <div>
              <PagePagination
                currentPage={data?.meta?.page ?? 1}
                totalPages={data?.meta?.totalPages ?? 1}
                hasNextPage={data?.meta?.hasNextPage ?? false}
                hasPrevPage={data?.meta?.hasPrevPage ?? false}
              />
            </div>
          </div> */}
        </div>
      </div>
    </SafetyLocationsClient>
  );
}
