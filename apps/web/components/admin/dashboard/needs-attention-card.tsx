'use client';

import { useState } from 'react';
import { IconCircleDot } from '@tabler/icons-react';
import ReportAttentionCard from './report-attention-card';
import ViewFloodReportDialog from './view-flood-report';

export default function NeedsAttentionCard() {
  // added: controls modal visibility
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <div className='h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
        {/* Header */}
        <div className='mb-6 flex items-center gap-2'>
          <IconCircleDot className='h-5 w-5 text-red-500' stroke={2} />

          <h2 className='text-[18px] font-semibold text-slate-700'>
            Needs Attention
            <span className='font-normal text-slate-500'>
              {' '}
              – reports with 10+ community votes
            </span>
          </h2>
        </div>

        {/* Reports container */}
        <div className='space-y-4'>
          {/* added: review click opens modal */}
          <ReportAttentionCard onReview={() => setOpenDialog(true)} />
        </div>
      </div>

      {/* added: static modal shown when openDialog is true */}
      {openDialog && (
        <ViewFloodReportDialog open={openDialog} onOpenChange={setOpenDialog} />
      )}
    </>
  );
}
