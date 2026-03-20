'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  IconX,
  IconAlertTriangle,
  IconBan,
  IconCheck,
  IconMessageReport,
  IconCross,
} from '@tabler/icons-react';
import { Separator } from '@/components/ui/separator';

export interface ReportedCommentDialogData {
  id: string;
  reportedUser: {
    name: string;
    email: string;
    profilePicture?: string;
  };
  commentText: string;
  postedOn: string;
  status: 'pending' | 'resolved' | 'dismissed';
  image?: string;
  reportSummary: {
    totalReports: number;
    categories: {
      name: string;
      count: number;
      percentage: number;
    }[];
  };
  reporters: {
    id: string;
    name: string;
    reason: string;
    category: string;
  }[];
}

interface ReportedCommentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: ReportedCommentDialogData;
}

export function ReportedCommentDialog({
  open,
  onOpenChange,
  data,
}: ReportedCommentDialogProps) {
  const statusColorMap = {
    pending: { bg: '#FFA500', text: '#FFA500' },
    resolved: { bg: '#00D69B', text: '#00D69B' },
    dismissed: { bg: '#585858', text: '#585858' },
  };

  const colors = statusColorMap[data.status];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='flex flex-col min-w-[40vw] h-[85vh] p-0 overflow-hidden gap-0 border-0 [&>button]:text-white [&>button]:hover:text-white [&>button]:opacity-70 [&>button]:hover:opacity-100'>
        {/* ── Blue Header with Message Report Icon ── */}
        <DialogHeader className='flex flex-row items-center gap-4 bg-[#0066CC] rounded-b-2xl px-6 py-5 shrink-0'>
          {/* ✅ Report Icon */}
          <div className='flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg'>
            <IconMessageReport className='w-6 h-6 text-white' />
          </div>

          {/* ✅ Text Section */}
          <div className='flex flex-col space-y-0 text-white'>
            <DialogTitle className='font-poppins text-base font-medium'>
              Reported Comment
            </DialogTitle>
            <DialogDescription className='text-sm text-blue-100'>
              {data.postedOn}
            </DialogDescription>
          </div>
        </DialogHeader>

        {/* ── Content Area (Scrollable) ── */}
        <div className='flex-1 min-h-0 overflow-y-auto'>
          <div className='flex flex-col p-6 gap-6'>
            {/* ── Reported User Card ── */}
            <div className='flex flex-col gap-4 bg-white border border-gray-200 rounded-2xl p-6'>
              <span className='font-poppins text-sm font-semibold text-gray-800 uppercase'>
                Reported User
              </span>
              <div className='flex items-center gap-3'>
                <div className='flex-1'>
                  <p className='text-sm font-semibold text-gray-900'>
                    {data.reportedUser.name}
                  </p>
                  <p className='text-xs text-gray-600'>
                    {data.reportedUser.email}
                  </p>
                </div>
                <div
                  className='inline-flex items-center rounded-full px-4 py-2'
                  style={{
                    backgroundColor: `${colors.bg}25`,
                    color: colors.text,
                  }}
                >
                  <span className='text-sm font-semibold capitalize'>
                    {data.status}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            {/* ── Reported Comment Section ── */}
            <div className='flex flex-col gap-4'>
              <span className='font-poppins text-sm font-semibold text-gray-800 uppercase'>
                Reported Comment
              </span>
              <div className='flex flex-col gap-4 bg-gray-50 border border-gray-200 rounded-2xl p-6'>
                <p className='text-sm text-gray-800 leading-relaxed'>
                  {data.commentText}
                </p>
              </div>
            </div>

            {/* ── Report Summary Section ── */}
            <div className='flex flex-col gap-4'>
              <span className='font-poppins text-sm font-semibold text-gray-800 uppercase'>
                Report Summary . {data.reportSummary.totalReports} Total
              </span>
              <div className='flex flex-col gap-4 bg-white border border-gray-200 rounded-2xl p-6'>
                {data.reportSummary.categories.map((category, idx) => (
                  <div key={idx} className='flex flex-col gap-2'>
                    <div className='flex justify-between items-center'>
                      <span className='text-sm font-medium text-gray-700'>
                        {category.name}
                      </span>
                      <span className='text-sm font-semibold text-gray-900'>
                        {category.count}
                      </span>
                    </div>
                    <div className='w-full h-2 bg-gray-200 rounded-full overflow-hidden'>
                      <div
                        className={`h-full ${
                          idx === 0 ? 'bg-[#FF6B6B]' : 'bg-[#FFA500]'
                        }`}
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Reporters Section ── */}
            <div className='flex flex-col gap-4'>
              <span className='font-poppins text-sm font-semibold text-gray-800 uppercase'>
                Reporters ({data.reporters.length})
              </span>
              <div className='flex flex-col gap-3'>
                {data.reporters.map((reporter) => (
                  <div
                    key={reporter.id}
                    className='flex flex-col gap-3 bg-gray-50 border border-gray-200 rounded-2xl p-4'
                  >
                    <div className='flex items-center gap-2'>
                      <span className='font-medium text-gray-900'>
                        {reporter.name}
                      </span>
                      <span
                        className='text-xs rounded-full px-2.5 py-0.5 font-medium'
                        style={{
                          backgroundColor: '#FF6B6B25',
                          color: '#FF6B6B',
                        }}
                      >
                        {reporter.category}
                      </span>
                    </div>
                    <p className='text-xs text-gray-600 leading-relaxed'>
                      &ldquo;{reporter.reason}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer with Action Buttons (NOT Scrollable) ── */}
        <div className='border-t bg-white px-6 py-4 shrink-0'>
          <div className='flex gap-3'>
            <button className='flex-1 px-4 py-3 rounded-lg border-2 border-[#FF9F68] text-[#FF9F68] font-medium hover:bg-[#FF9F68]/5 transition flex items-center justify-center gap-2'>
              <IconAlertTriangle className='w-[1.2em]! h-[1.2em]!' />
              Warn User
            </button>
            <button className='flex-1 px-4 py-3 rounded-lg border-2 border-[#FF6B6B] text-[#FF6B6B] font-medium hover:bg-[#FF6B6B]/5 transition flex items-center justify-center gap-2'>
              <IconBan className='w-[1.2em]! h-[1.2em]!' />
              Ban User
            </button>
            <button className='flex-1 px-4 py-3 rounded-lg border-2 border-gray-400 text-gray-600 font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2'>
              <IconX className='w-[1.2em]! h-[1.2em]!' />
              Dismiss
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
