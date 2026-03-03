import { useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  IconChevronLeft,
  IconCircleCheck,
  IconCircleDashed,
  IconClock,
  IconExclamationMark,
  IconPoint,
  IconSend,
  IconShield,
  IconShieldCheck,
  IconThumbUp,
  IconUser,
  IconX,
} from '@tabler/icons-react';
import { format, formatDistanceToNow } from 'date-fns';

import {
  REPORT_STATUS_COLOR_MAP,
  SEVERITY_COLOR_MAP,
} from '@/lib/utils/get-color-map';
import PostComposer from '@/components/shared/post-composer';
import PostCard from '@/components/shared/post-card';
import { useReportDetail } from '@/hooks/use-report-detail';
import { Separator } from '../ui/separator';
import {
  Avatar as UIAvatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import Avatar from 'boring-avatars';
import { Button } from '../ui/button';
import { ReportedLocationPanelSkeleton } from './skeletons/reported-location-panel-skeleton';

export default function ReportedLocationPanel({
  reportId,
  onClose,
}: {
  reportId: number;
  onClose?: () => void;
}) {
  const { reportDetail, isLoading } = useReportDetail(reportId);

  const scrollRef = useRef<HTMLDivElement>(null);

  // scroll to top when report changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [reportId]);

  if (isLoading) return <ReportedLocationPanelSkeleton />;
  if (!reportDetail) return;

  const formattedTime = reportDetail
    ? format(reportDetail?.reportedAt, 'hh:mm a')
    : '';
  const formattedDate = reportDetail
    ? format(reportDetail?.reportedAt, 'MMMM dd, yyyy')
    : '';

  return (
    <div className="relative w-full h-full bg-white z-50 min-h-0 flex flex-col pointer-events-auto">
      <button
        className="absolute bg-white top-1/2 translate-x-full right-0 h-16 -translate-y-1/2 
        rounded-r-2xl ps-1 py-1 pr-1.5 text-xs z-30 shadow-[4px_0px_6px_-1px_rgba(0,0,0,0.1)]"
        onClick={onClose}
      >
        <IconChevronLeft className="w-[1.5em]! h-[1.5em]!" />
      </button>
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto">
        <div className="aspect-video w-full relative bg-muted shrink-0 ">
          {reportDetail?.image ? (
            <Image
              src={reportDetail.image}
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
          className="flex flex-col p-4 gap-4 border-l-4 shrink-0"
          style={{
            borderLeftColor: SEVERITY_COLOR_MAP[reportDetail?.severity],
          }}
        >
          {/* location name */}
          <h3 className="font-poppins text-lg font-semibold">
            {reportDetail?.location}
          </h3>

          <Separator />

          {/*  */}
          <div className="flex flex-row justify-between gap-4">
            {/* report status */}
            <div
              className="flex items-center rounded-full px-3 py-1 w-fit h-fit"
              style={{
                color: REPORT_STATUS_COLOR_MAP[reportDetail?.status],
                backgroundColor: `${REPORT_STATUS_COLOR_MAP[reportDetail?.status]}25`,
              }}
            >
              <div className="flex items-center gap-2 text-sm">
                {reportDetail?.status === 'verified' ? (
                  <IconCircleCheck className="w-[1.5em]! h-[1.5em]!" />
                ) : (
                  <IconCircleDashed className="w-[1.5em]! h-[1.5em]!" />
                )}
                <span className="font-poppins font-medium">
                  {reportDetail?.status.toUpperCase()} REPORT
                </span>
              </div>
            </div>

            {/* reported at */}
            <div className="flex items-center text-sm gap-2 tabular-nums opacity-50">
              <IconClock className="w-[1.5em]! h-[1.5em]!" />
              {formatDistanceToNow(reportDetail?.reportedAt, {
                addSuffix: true,
              })}
            </div>
          </div>

          {/* details */}
          <div className="flex flex-col border rounded-lg text-sm">
            {/* reported by */}
            <div className="flex justify-between items-center p-4">
              <div className="flex items-center gap-2 opacity-50">
                <IconUser className="w-[1.5em]! h-[1.5em]!" />
                <span className="font-poppins font-medium">REPORTED BY</span>
              </div>

              <div className="flex items-center gap-2">
                <UIAvatar className="size-5">
                  <AvatarImage
                    src={reportDetail?.reporter?.profilePicture || undefined}
                  />
                  <AvatarFallback>
                    <Avatar
                      name={`${reportDetail?.reporter?.name} ${reportDetail?.reporter?.id}`}
                      variant="beam"
                    />
                  </AvatarFallback>
                </UIAvatar>
                <span>{reportDetail?.reporter?.name}</span>
              </div>
            </div>

            <Separator />

            {/* verified by */}
            <div className="flex justify-between items-center p-4">
              <div className="flex items-center gap-2 opacity-50">
                <IconShield className="w-[1.5em]! h-[1.5em]!" />
                <span className="font-poppins font-medium">VERIFIED BY</span>
              </div>

              {reportDetail?.status === 'verified' ? (
                <div className="flex items-center gap-2">
                  <UIAvatar className="size-5">
                    <AvatarImage
                      src={reportDetail?.verifier?.profilePicture || undefined}
                    />
                    <AvatarFallback>
                      <Avatar
                        name={`${reportDetail?.verifier?.name} ${reportDetail?.verifier?.id}`}
                        variant="beam"
                      />
                    </AvatarFallback>
                  </UIAvatar>
                  <span>{reportDetail?.verifier?.name}</span>
                </div>
              ) : (
                <span className="font-poppins opacity-50 italic font-medium">
                  PENDING
                </span>
              )}
            </div>

            <Separator />

            {/* date & time */}
            <div className="flex justify-between items-center p-4">
              <div className="flex items-center gap-2 opacity-50">
                <IconClock className="w-[1.5em]! h-[1.5em]!" />
                <span className="font-poppins font-medium">DATE & TIME</span>
              </div>

              <div className="flex items-center gap-2">
                <span>{formattedDate}</span>
                <IconPoint className="w-[1em]! h-[1em]!" />
                <span>{formattedTime}</span>
              </div>
            </div>

            <Separator />

            {/* severity */}
            <div className="flex justify-between items-center p-4">
              <div className="flex items-center gap-2 opacity-50">
                <IconExclamationMark className="w-[1.5em]! h-[1.5em]!" />
                <span className="font-poppins font-medium">SEVERITY LEVEL</span>
              </div>

              <div
                className="flex items-center rounded-full px-3 py-1"
                style={{
                  color: SEVERITY_COLOR_MAP[reportDetail?.severity],
                  backgroundColor: `${SEVERITY_COLOR_MAP[reportDetail?.severity]}25`,
                }}
              >
                <span className="font-poppins text-xs font-medium">
                  {reportDetail?.severity?.toUpperCase()}
                </span>
              </div>
            </div>

            {/*  */}
          </div>

          {/*  */}
          <div className="flex flex-col border rounded-lg text-sm">
            {/* credibility */}
            <div className="flex justify-between items-center p-4">
              <div className="flex items-center gap-2 opacity-50">
                <IconShieldCheck className="w-[1.5em]! h-[1.5em]!" />
                <span className="font-poppins font-medium">CREDIBILITY</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-poppins font-bold">0%</span>
              </div>
            </div>

            <div className="flex justify-between">
              {/* confirm */}
              <button
                className="w-full text-[#15803D] bg-[#f0fdf4] hover:bg-[#d1fae5] group
                transition-colors duration-200"
              >
                <div
                  className="flex items-center justify-center gap-2 p-4 
                  group-hover:-translate-y-0.5 transition-transform duration-200"
                >
                  <IconThumbUp className="w-[1.5em]! h-[1.5em]!" />
                  <span className="font-poppins font-medium">CONFIRM</span>
                </div>
              </button>

              {/* deny */}
              {/* confirm */}
              <button
                className="w-full text-[#dc2626] bg-[#fef2f2] hover:bg-[#fee2e2] group
                transition-colors duration-200"
              >
                <div
                  className="flex items-center justify-center gap-2 p-4 
                  group-hover:-translate-y-0.5 transition-transform duration-200"
                >
                  <IconX className="w-[1.5em]! h-[1.5em]!" />
                  <span className="font-poppins font-medium">DENY</span>
                </div>
              </button>
            </div>
          </div>

          <Button className="rounded-lg h-12">
            <IconSend className="w-[1.5em]! h-[1.5em]!" />
            <span className="font-poppins font-medium">GET DIRECTIONS</span>
          </Button>
        </div>

        <div className="flex gap-4 text-xs items-center">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="font-poppins font-bold opacity-50">
            COMMUNITY UPDATES
          </span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* comments */}
        <div className="flex flex-col gap-6 p-4">
          <PostComposer />

          <PostCard
            author={{ name: 'Pedro Santos' }}
            content="Volunteers are needed to help with sandbagging efforts in flood-prone areas. Please contact the local barangay office if you can assist."
            timestamp="1 day ago"
            reportCount={2}
          />

          <PostCard
            author={{ name: 'Juan Dela Cruz' }}
            content="Heavy rainfall in Zapote area, its starting to accumulate water. Please be careful if you're heading this way! #Flood"
            imageUrl="/images/before_flood_image.jpg"
            timestamp="2 hrs ago"
            reportCount={3}
          />
        </div>
      </div>
    </div>
  );
}
