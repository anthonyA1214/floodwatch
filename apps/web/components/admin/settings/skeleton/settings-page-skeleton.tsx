import { Skeleton } from '@/components/ui/skeleton';
import SettingsLeftSkeleton from './settings-left-skeleton';
import SettingsRightSkeleton from './settings-right-skeleton';

export default function SettingsPageSkeleton() {
  return (
    <div className="flex-1 flex flex-col bg-white p-8 rounded-2xl gap-8 min-h-0">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-9 w-28" />
        <Skeleton className="h-4 w-72" />
      </div>

      <div className="grid grid-cols-2 gap-4 h-full">
        <SettingsLeftSkeleton />
        <SettingsRightSkeleton />
      </div>
    </div>
  );
}
