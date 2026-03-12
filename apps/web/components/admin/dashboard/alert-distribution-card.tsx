'use client';

import { Pie, PieChart, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/* static chart data matching the screenshot */
const chartData = [
  { label: 'Critical', value: 10, color: '#FF1D1D' },
  { label: 'High', value: 7, color: '#FF7A00' },
  { label: 'Moderate', value: 11, color: '#F2B600' },
  { label: 'Low', value: 15, color: '#1F6FFF' },
];

export function AlertDistributionPieChart() {
  return (
    <Card className='h-full rounded-2xl border border-slate-200 shadow-sm'>
      {/* changed: header aligned to the left like the reference */}
      <CardHeader className='pb-2'>
        <CardTitle className='text-[20px] font-semibold text-slate-700'>
          Alert Distribution
        </CardTitle>
      </CardHeader>

      {/* changed: content uses a 2-column layout for donut + legend */}
      <CardContent className='flex h-full items-center justify-between gap-8 pt-2'>
        {/* changed: donut chart section */}
        <div className='flex items-center justify-center'>
          <PieChart width={320} height={320}>
            <Pie
              data={chartData}
              dataKey='value'
              nameKey='label'
              cx='50%'
              cy='50%'
              innerRadius={70}
              outerRadius={110}
              stroke='none'
            >
              {chartData.map((entry) => (
                <Cell key={entry.label} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </div>

        {/* changed: custom legend section to match screenshot */}
        <div className='flex flex-1 flex-col justify-center gap-6 pe-4'>
          {chartData.map((item) => (
            <div
              key={item.label}
              className='flex items-center justify-between gap-6'
            >
              <div className='flex items-center gap-4'>
                {/* legend color dot */}
                <span
                  className='h-8 w-8 rounded-full'
                  style={{ backgroundColor: item.color }}
                />
                <span className='text-[16px] font-medium text-slate-700'>
                  {item.label}
                </span>
              </div>

              {/* legend value */}
              <span className='text-[16px] font-semibold text-slate-700'>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
