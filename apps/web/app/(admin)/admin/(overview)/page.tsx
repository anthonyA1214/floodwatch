'use client';

import { AlertDistributionPieChart } from '@/components/admin/dashboard/alert-distribution-card';
import LocationMonitorCard from '@/components/admin/dashboard/location-monitor-card';
import { MonthlyReportsChart } from '@/components/admin/dashboard/monthly-reports-card';
import NeedsAttentionCard from '@/components/admin/dashboard/needs-attention-card';
import StatCard from '@/components/admin/dashboard/stat-card';
import WeatherInformationCard from '@/components/admin/dashboard/weather-information-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { useMe } from '@/hooks/use-me';
import {
  IconAlertTriangle,
  IconBell,
  IconClipboard,
  IconClipboardData,
  IconClock,
  IconFileText,
  IconShield,
} from '@tabler/icons-react';

export default function DashboardPage() {
  const { me, isLoading } = useMe();

  return (
    <div className='flex-1 flex flex-col bg-white ps-8 py-8 rounded-2xl gap-8 min-h-0'>
      {/* Header */}
      <div className='space-y-2'>
        <h1 className='font-poppins text-3xl font-bold'>
          {isLoading ? <Skeleton className='h-9 w-64' /> : `Hello, ${me?.name}`}
        </h1>
        <p>Here&apos;s what is happening with FloodWatch today</p>
      </div>

      <ScrollArea className='flex-1 h-0'>
        <div className='space-y-6 pr-8'>
          {/* Stat Cards Row */}
          <div className='grid grid-cols-4 gap-8'>
            <StatCard
              icon={IconAlertTriangle}
              color='#FF0000'
              label='ACTIVE ALERTS'
              count={1}
            />
            <StatCard
              icon={IconShield}
              color='#00B306'
              label='SAFETY LOCATIONS'
              count={42}
            />
            <StatCard
              icon={IconClipboardData}
              color='#0066FF'
              label='TOTAL REPORTS'
              count={42}
            />
            <StatCard
              icon={IconClock}
              color='#D08700'
              label='PENDING REVIEW'
              count={42}
            />
          </div>

          {/* Weather Row */}
          <WeatherInformationCard />

          {/* Row 1: Box 1 and Box 2 */}
          {/* Row 1: Box 1 and Box 2 */}
          <div className='grid grid-cols-2 gap-8 items-stretch'>
            <div className='h-full'>
              <LocationMonitorCard />
            </div>

            <div className='h-full'>
              <NeedsAttentionCard />
            </div>
          </div>

          {/* Row 2: Box 3 and Box 4 */}
          <div className='grid grid-cols-2 gap-8 items-stretch'>
            <div className='h-full'>
              <MonthlyReportsChart />
            </div>

            <div className='h-full'>
              <AlertDistributionPieChart />
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
