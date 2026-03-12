'use client';

import {
  IconCloud,
  IconCloudRain,
  IconSun,
  IconCloudStorm,
} from '@tabler/icons-react';

/* static weekly weather data (no API yet) */
const WEATHER_FORECAST = [
  { day: 'Monday', temp: '32° • 25°', rain: '85%', icon: IconCloudRain },
  { day: 'Tuesday', temp: '31° • 25°', rain: '70%', icon: IconCloudRain },
  { day: 'Wednesday', temp: '30° • 24°', rain: '60%', icon: IconCloud },
  { day: 'Thursday', temp: '29° • 24°', rain: '45%', icon: IconCloudStorm },
  { day: 'Friday', temp: '30° • 24°', rain: '50%', icon: IconCloud },
  { day: 'Saturday', temp: '31° • 25°', rain: '30%', icon: IconCloud },
  { day: 'Sunday', temp: '33° • 26°', rain: '10%', icon: IconSun },
];

export default function WeatherInformationCard() {
  return (
    /* main weather card container */
    <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4'>
      {/* weekly forecast grid */}
      <div className='grid grid-cols-7 gap-3'>
        {WEATHER_FORECAST.map((weather) => {
          const Icon = weather.icon;

          return (
            /* single day weather item */
            <div
              key={weather.day}
              className='flex flex-col items-center justify-center gap-1 rounded-xl border border-slate-200 px-3 py-3 text-center'
            >
              {/* day name */}
              <p className='text-xs font-semibold text-slate-600'>
                {weather.day}
              </p>

              {/* weather icon */}
              <Icon className='h-6 w-6 text-blue-500' stroke={1.8} />

              {/* temperature */}
              <p className='text-sm font-semibold text-slate-900'>
                {weather.temp}
              </p>

              {/* rain chance */}
              <p className='text-xs text-red-500'>{weather.rain}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
