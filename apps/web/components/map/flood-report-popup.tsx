import { useReportDetail } from '@/hooks/use-report-detail';
import {
  IconCircleCheck,
  IconClock,
  IconExclamationCircle,
  IconHelpCircle,
  IconMapPin,
  IconSend,
  IconShieldCheck,
  IconThumbUp,
  IconUsers,
  IconX,
} from '@tabler/icons-react';
import { Separator } from '../ui/separator';
import {
  REPORT_STATUS_COLOR_MAP,
  SEVERITY_COLOR_MAP,
} from '@/lib/utils/get-color-map';
import { format, formatDistanceToNow } from 'date-fns';
import FloodReportPopupSkeleton from './skeletons/flood-report-popup-skeleton';

export default function FloodReportPopup({
  onClose,
  reportId,
  onSelectReport,
}: {
  onClose: () => void;
  reportId: number;
  onSelectReport?: () => void;
}) {
  const { reportDetail, isLoading } = useReportDetail(reportId);

  const formattedTime = reportDetail
    ? format(reportDetail?.reportedAt, 'hh:mm a')
    : '';
  const formattedDate = reportDetail
    ? format(reportDetail?.reportedAt, 'MMMM dd, yyyy')
    : '';

  if (isLoading || !reportDetail) return <FloodReportPopupSkeleton />;

  return (
    <div className="flex flex-col justify-center rounded-2xl overflow-hidden w-[300px] max-h-[70vh] overflow-y-auto">
      {/* header */}
      <div className="flex items-center justify-between bg-[#0066CC] p-3 text-white">
        <span className="font-poppins text-semibold text-sm">FLOOD REPORT</span>
        <button onClick={onClose} className="text-[10px]">
          <IconX className="opacity-70 hover:opacity-100 w-[1.5em]! h-[1.5em]! duration-200" />
        </button>
      </div>
      <div className="flex flex-col bg-white">
        {/* badge and distance to now */}
        <div className="flex flex-row justify-between gap-4 p-3">
          {/* report status */}
          <div
            className="flex items-center rounded-full px-3 py-1 w-fit h-fit"
            style={{
              color: REPORT_STATUS_COLOR_MAP[reportDetail?.status],
              backgroundColor: `${REPORT_STATUS_COLOR_MAP[reportDetail?.status]}25`,
            }}
          >
            <div className="flex items-center gap-1.5 text-xs">
              {reportDetail?.status === 'verified' ? (
                <IconCircleCheck className="w-[1.5em]! h-[1.5em]!" />
              ) : (
                <IconHelpCircle className="w-[1.5em]! h-[1.5em]!" />
              )}
              <span className="font-poppins font-medium">
                {reportDetail?.status.toUpperCase()}
              </span>
            </div>
          </div>

          {/* reported at */}
          <div className="flex items-center text-xs gap-1.5 tabular-nums opacity-50">
            <IconClock className="w-[1.5em]! h-[1.5em]!" />
            {formatDistanceToNow(reportDetail?.reportedAt, {
              addSuffix: true,
            })}
          </div>
        </div>

        <Separator />

        {/* report details */}
        <div className="flex flex-col gap-2 p-3">
          {/* severity level */}
          <div className="flex justify-between gap-2">
            <div className="flex items-center gap-1.5 opacity-50">
              <IconExclamationCircle className="w-[1.5em]! h-[1.5em]!" />
              <span className="font-poppins font-medium">SEVERITY LEVEL</span>
            </div>

            <div
              className="flex items-center rounded-full px-3 py-1 w-fit"
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

          <Separator />

          {/* date & time */}
          <div className="flex justify-between items-start gap-2">
            <div className="flex items-center gap-1.5 lg:gap-2 opacity-50 shrink-0">
              <IconClock className="w-[1.5em]! h-[1.5em]!" />
              <span className="font-poppins font-medium">DATE & TIME</span>
            </div>

            <div className="flex flex-col items-end gap-0.5 text-xs text-right">
              <span>{formattedDate}</span>
              <span className="opacity-50">{formattedTime}</span>
            </div>
          </div>

          <Separator />

          {/* location */}
          <div className="flex justify-between gap-2">
            <div className="flex items-center gap-1.5 opacity-50 h-fit shrink-0">
              <IconMapPin className="w-[1.5em]! h-[1.5em]!" />
              <span className="font-poppins font-medium">LOCATION</span>
            </div>

            <span className="text-right line-clamp-2">
              {reportDetail?.location}
            </span>
          </div>
        </div>

        <Separator />

        {/* credibility and confirm and deny */}
        <div className="flex flex-col text-xs">
          {/* credibility */}
          <div className="flex justify-between items-center p-3">
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
                className="flex items-center justify-center gap-1.5 p-3 
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
                className="flex items-center justify-center gap-1.5 p-3
                  group-hover:-translate-y-0.5 transition-transform duration-200"
              >
                <IconX className="w-[1.5em]! h-[1.5em]!" />
                <span className="font-poppins font-medium">DENY</span>
              </div>
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center p-3 gap-2">
          <button
            className="flex items-center gap-1.5 w-full bg-primary text-primary-foreground hover:bg-primary/90 duration-200 px-4 py-2.5 rounded-lg justify-center"
            onClick={onSelectReport}
          >
            <IconUsers className="w-[1.5em]! h-[1.5em]!" />
            <span className="font-poppins font-medium">COMMUNITY</span>
          </button>

          <button className="flex items-center gap-1.5 w-full bg-secondary text-secondary-foreground hover:bg-secondary/80 duration-200 px-4 py-2.5 rounded-lg justify-center">
            <IconSend className="w-[1.5em]! h-[1.5em]!" />
            <span className="font-poppins font-medium">DIRECTIONS</span>
          </button>
        </div>
      </div>
    </div>
  );
}
