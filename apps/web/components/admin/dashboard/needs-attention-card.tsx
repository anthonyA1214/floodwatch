'use client';

import { IconCircleDot } from '@tabler/icons-react';
import ReportAttentionCard from './report-attention-card';

export default function NeedsAttentionCard() {
  return (
    <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
      {/* Header */}
      <div className='flex items-center gap-2 mb-6'>
        <IconCircleDot className='w-5 h-5 text-red-500' stroke={2} />

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
        <ReportAttentionCard />
      </div>
    </div>
  );
}
