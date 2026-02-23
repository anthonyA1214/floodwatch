import { FloodReportsDto } from '@repo/schemas';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  IconArrowBearRight2,
  IconCircleCheck,
  IconCircleDashed,
  IconClock,
  IconUsers,
  IconX,
} from '@tabler/icons-react';
import { formatDistanceToNow } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CommunityTab from '@/components/map/community-tab';
import DirectionTab from '@/components/map/direction-tab';

export default function AffectedLocationsPanel({
  report,
  onClose,
}: {
  report: FloodReportsDto;
  onClose?: () => void;
}) {
  const statusColorMap = {
    verified: '#00D69B',
    unverified: '#FF6900',
  };

  const severityColorMap = {
    critical: '#FB2C36',
    high: '#FF6900',
    moderate: '#F0B204',
    low: '#2B7FFF',
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-white z-49 min-h-0 flex flex-col pointer-events-auto">
      <div className="aspect-video w-full relative bg-muted shrink-0">
        {report?.image ? (
          <Image
            src={report.image}
            alt="Affected location"
            fill
            className="object-cover"
          />
        ) : (
          <Image
            src="/no-data-rafiki.svg"
            alt="No image available"
            fill
            className="object-cover opacity-40"
          />
        )}
      </div>
      <div
        className="flex flex-col bg-accent p-4 gap-4 border-l-4 shrink-0"
        style={{ borderLeftColor: severityColorMap[report?.severity] }}
      >
        {/* row 1 */}
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-poppins text-lg font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
            {report?.location}
          </h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <IconX className="w-[1.5em]! h-[1.5em]!" />
          </Button>
        </div>

        {/* row 3 */}
        <div className="flex flex-row justify-between gap-4">
          {/* reported at */}
          <div className="flex items-center text-sm gap-2 text-gray-600">
            <IconClock className="w-[1.5em]! h-[1.5em]!" />
            {formatDistanceToNow(new Date(report?.reportedAt), {
              addSuffix: true,
            })}
          </div>

          {/* severity level */}
          <div className="flex items-center gap-2 text-gray-600">
            <span className="text-sm">Severity Level:</span>
            <div
              className="flex items-center rounded-full px-3 py-1"
              style={{
                color: severityColorMap[report?.severity],
                backgroundColor: `${severityColorMap[report?.severity]}25`,
              }}
            >
              <span className="text-xs font-medium">
                {report?.severity?.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* row 4 */}
        <div className="flex flex-row justify-between gap-4">
          {/* reported by */}
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <span className="">Reported by:</span>
            <span className="font-medium">{report?.name}</span>
          </div>

          <div
            className="flex items-center rounded-full px-3 py-1 w-fit"
            style={{
              color: statusColorMap[report?.status],
              backgroundColor: `${statusColorMap[report?.status]}25`,
            }}
          >
            <div className="flex items-center gap-2 text-xs">
              {report?.status === 'verified' ? (
                <IconCircleCheck className="w-[1.5em]! h-[1.5em]!" />
              ) : (
                <IconCircleDashed className="w-[1.5em]! h-[1.5em]!" />
              )}
              <span className="flex items-center font-medium">
                {report?.status.toUpperCase()} REPORT
              </span>
            </div>
          </div>
        </div>
      </div>
      <Tabs
        defaultValue="direction"
        className="flex-1 flex flex-col h-full min-h-0 pt-4"
      >
        <div className="w-full border-b shrink-0">
          <TabsList variant="line" className="font-poppins w-full">
            <TabsTrigger
              value="direction"
              className="data-[state=active]:text-[#0066CC] 
                data-[state=active]:after:bg-[#0066CC] text-base"
            >
              <IconArrowBearRight2 />
              Direction
            </TabsTrigger>
            <TabsTrigger
              value="community"
              className="data-[state=active]:text-[#0066CC] 
                data-[state=active]:after:bg-[#0066CC] text-base"
            >
              <IconUsers />
              Community
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent
          value="direction"
          className="flex-1 flex flex-col min-h-0 p-4"
        >
          <DirectionTab report={report} />
        </TabsContent>
        <TabsContent
          value="community"
          className="flex-1 flex flex-col min-h-0 ps-4 py-4"
        >
          <CommunityTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
