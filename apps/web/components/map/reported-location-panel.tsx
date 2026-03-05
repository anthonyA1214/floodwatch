import { useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  IconChevronLeft,
  IconCircleCheck,
  IconClock,
  IconExclamationCircle,
  IconHelpCircle,
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
import PostComposer from '@/components/shared/comment-composer';
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
import NoPhotoEmpty from '../shared/no-photo-empty';
import CommentsList from '../shared/comments-list';

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

      {isLoading || !reportDetail ? (
        <ReportedLocationPanelSkeleton />
      ) : (
        <div
          ref={scrollRef}
          id="report-panel-scroll"
          className="flex-1 min-h-0 overflow-y-auto"
        >
          {/* image */}
          <div className="aspect-video w-full relative bg-muted shrink-0 ">
            {reportDetail?.image ? (
              <Image
                src={reportDetail.image}
                alt="Affected location"
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0">
                <NoPhotoEmpty />
              </div>
            )}
          </div>

          <div
            className="flex flex-col p-4 gap-4 border-l-4 shrink-0"
            style={{
              borderLeftColor: SEVERITY_COLOR_MAP[reportDetail?.severity],
            }}
          >
            {/* location name */}
            <h3 className="font-poppins text-base lg:text-lg font-semibold">
              {reportDetail?.location}
            </h3>

            <Separator />

            {/* badge and distance to now */}
            <div className="flex flex-row justify-between gap-4">
              {/* report status */}
              <div
                className="flex items-center rounded-full px-3 py-1 w-fit h-fit"
                style={{
                  color: REPORT_STATUS_COLOR_MAP[reportDetail?.status],
                  backgroundColor: `${REPORT_STATUS_COLOR_MAP[reportDetail?.status]}25`,
                }}
              >
                <div className="flex items-center gap-1.5 lg:gap-2 text-xs lg:text-sm">
                  {reportDetail?.status === 'verified' ? (
                    <IconCircleCheck className="w-[1.5em]! h-[1.5em]!" />
                  ) : (
                    <IconHelpCircle className="w-[1.5em]! h-[1.5em]!" />
                  )}
                  <span className="font-poppins font-medium">
                    {reportDetail?.status.toUpperCase()} REPORT
                  </span>
                </div>
              </div>

              {/* reported at */}
              <div className="flex items-center text-xs lg:text-sm gap-1.5 lg:gap-2 tabular-nums opacity-50">
                <IconClock className="w-[1.5em]! h-[1.5em]!" />
                {formatDistanceToNow(reportDetail?.reportedAt, {
                  addSuffix: true,
                })}
              </div>
            </div>

            {/* details */}
            <div className="flex flex-col border rounded-lg text-xs lg:text-sm">
              {/* reported by */}
              <div className="flex justify-between items-center p-3 lg:p-4">
                <div className="flex items-center gap-1.5 lg:gap-2 opacity-50">
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
              <div className="flex justify-between items-center p-3 lg:p-4">
                <div className="flex items-center gap-1.5 lg:gap-2 opacity-50">
                  <IconShield className="w-[1.5em]! h-[1.5em]!" />
                  <span className="font-poppins font-medium">VERIFIED BY</span>
                </div>

                {reportDetail?.status === 'verified' ? (
                  <div className="flex items-center gap-2">
                    <UIAvatar className="size-5">
                      <AvatarImage
                        src={
                          reportDetail?.verifier?.profilePicture || undefined
                        }
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
              <div className="flex justify-between items-start p-3 lg:p-4">
                <div className="flex items-center gap-1.5 lg:gap-2 opacity-50 shrink-0">
                  <IconClock className="w-[1.5em]! h-[1.5em]!" />
                  <span className="font-poppins font-medium">DATE & TIME</span>
                </div>

                <div className="flex flex-col items-end gap-0.5 text-xs lg:text-sm text-right">
                  <span>{formattedDate}</span>
                  <span className="opacity-50">{formattedTime}</span>
                </div>
              </div>

              <Separator />

              {/* severity */}
              <div className="flex justify-between items-center p-3 lg:p-4">
                <div className="flex items-center gap-1.5 lg:gap-2 opacity-50">
                  <IconExclamationCircle className="w-[1.5em]! h-[1.5em]!" />
                  <span className="font-poppins font-medium">
                    SEVERITY LEVEL
                  </span>
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

            {/* credibility and confirm and deny */}
            <div className="flex flex-col border rounded-lg text-xs lg:text-sm">
              {/* credibility */}
              <div className="flex justify-between items-center p-3 lg:p-4">
                <div className="flex items-center gap-1.5 lg:gap-2 opacity-50">
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
                    className="flex items-center justify-center gap-1.5 lg:gap-2 p-3 lg:p-4 
                  group-hover:-translate-y-0.5 transition-transform duration-200"
                  >
                    <IconThumbUp className="w-[1.5em]! h-[1.5em]!" />
                    <span className="font-poppins font-medium">CONFIRM</span>
                  </div>
                </button>

                {/* deny */}
                <button
                  className="w-full text-[#dc2626] bg-[#fef2f2] hover:bg-[#fee2e2] group
                transition-colors duration-200"
                >
                  <div
                    className="flex items-center justify-center gap-1.5 lg:gap-2 p-3 lg:p-4 
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

          {/*  */}
          <div className="flex gap-4 text-xs items-center px-2 lg:px-0">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="font-poppins font-bold opacity-50">
              COMMUNITY UPDATES
            </span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* comments */}
          <div className="flex flex-col gap-4 p-3 lg:p-4">
            <PostComposer />

            <CommentsList
              reportId={reportId}
              scrollContainerId="report-panel-scroll"
            />
          </div>
        </div>
      )}
    </div>
  );
}
