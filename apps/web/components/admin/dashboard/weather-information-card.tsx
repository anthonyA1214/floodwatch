'use client';

import {
  IconCloud,
  IconCloudRain,
  IconSun,
  IconCloudStorm,
} from '@tabler/icons-react';

/* changed: static data adjusted to match the card style in the reference while still showing 7 days */
const WEATHER_FORECAST = [
  {
    id: 'monday',
    day: 'Mon',
    high: '32',
    low: '25',
    rain: '85%',
    rainColor: 'text-red-500',
    icon: IconCloudRain,
    iconColor: 'text-blue-500',
    isActive: true,
  },
  {
    id: 'tuesday',
    day: 'Tue',
    high: '31',
    low: '25',
    rain: '70%',
    rainColor: 'text-red-500',
    icon: IconCloudRain,
    iconColor: 'text-blue-500',
  },
  {
    id: 'wednesday',
    day: 'Wed',
    high: '30',
    low: '24',
    rain: '60%',
    rainColor: 'text-red-500',
    icon: IconCloud,
    iconColor: 'text-slate-400',
  },
  {
    id: 'thursday',
    day: 'Thu',
    high: '29',
    low: '24',
    rain: '45%',
    rainColor: 'text-red-500',
    icon: IconCloudStorm,
    iconColor: 'text-slate-400',
  },
  {
    id: 'friday',
    day: 'Fri',
    high: '30',
    low: '24',
    rain: '50%',
    rainColor: 'text-orange-500',
    icon: IconCloud,
    iconColor: 'text-slate-400',
  },
  {
    id: 'saturday',
    day: 'Sat',
    high: '31',
    low: '25',
    rain: '20%',
    rainColor: 'text-orange-500',
    icon: IconCloud,
    iconColor: 'text-slate-400',
  },
  {
    id: 'sunday',
    day: 'Sun',
    high: '33',
    low: '26',
    rain: '5%',
    rainColor: 'text-green-500',
    icon: IconSun,
    iconColor: 'text-yellow-500',
  },
];

export default function WeatherInformationCard() {
  return (
    /* changed: outer layout now matches the reference with a forecast block on the left and day cards on the right */
    <div className='rounded-2xl border border-slate-200 bg-white p-3 shadow-sm'>
      <div className='grid grid-cols-[auto_repeat(7,minmax(0,1fr))] gap-3'>
        {/* changed: forecast block on the left side */}
        <div className='flex min-w-[120px] items-center border-r border-slate-200 pr-3'>
          <div className='flex items-center gap-2'>
            <IconCloudRain className='h-7 w-7 text-blue-500' stroke={1.8} />
            <div>
              <p className='text-sm font-semibold text-slate-800'>Forecast</p>
              <p className='text-xs text-slate-500'>Caloocan City</p>
            </div>
          </div>
        </div>

        {/* changed: day cards styled closer to the screenshot and still renders all 7 days */}
        {WEATHER_FORECAST.map((weather) => {
          const Icon = weather.icon;

          return (
            <div
              key={weather.id}
              className='flex min-h-[70px] flex-col items-center justify-center rounded-xl border border-slate-200 px-2 py-2 text-center'
            >
              <p
                className={`text-[11px] font-semibold ${
                  weather.isActive ? 'text-blue-600' : 'text-slate-500'
                }`}
              >
                {weather.day}
              </p>

              <div className='mt-1 flex items-center gap-1'>
                <Icon className={`h-4 w-4 ${weather.iconColor}`} stroke={1.8} />

                <div className='flex items-end gap-1 leading-none'>
                  <span className='text-[14px] font-bold text-slate-900'>
                    {weather.high}°
                  </span>
                  <span className='text-[11px] font-medium text-slate-500'>
                    {weather.low}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
