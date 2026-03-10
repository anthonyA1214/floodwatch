'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useWeather } from '@/hooks/use-weather';
import { getUserLocation } from '@/lib/utils/get-user-location';
import { getWeatherInfo } from '@/lib/utils/get-weather-icon';
import { IconDroplet, IconWind } from '@tabler/icons-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { format, isToday } from 'date-fns';
import { Separator } from '../ui/separator';
import { toast } from 'sonner';
import { Skeleton } from '../ui/skeleton';

export default function WeatherAccordion() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const pos = await getUserLocation();
        setLocation(pos);
      } catch {
        toast.error(
          'Unable to retrieve your location. Please allow location access and refresh the page to see weather information.',
        );
      }
    };

    fetchLocation();
  }, []);

  const { weather, isLoading } = useWeather(
    location?.latitude ?? null,
    location?.longitude ?? null,
  );

  // current units
  const temperatureUnit = weather?.current_units?.temperature_2m;
  const humidityUnit = weather?.current_units?.relative_humidity_2m;
  const windSpeedUnit = weather?.current_units?.wind_speed_10m;

  // current weather code and day/night info from the API
  const wmoCode = weather?.current?.weather_code;
  const isDay = weather?.current?.is_day === 1;
  const temperature = weather?.current?.temperature_2m;
  const relativeHumidity = weather?.current?.relative_humidity_2m;
  const windSpeed = weather?.current?.wind_speed_10m;

  // daily weather data for the 7-day forecast
  const dailyTimes = weather?.daily?.time ?? [];
  const dailyWmoCodes = weather?.daily?.weather_code;
  const dailyMaxTemps = weather?.daily?.temperature_2m_max ?? [];
  const dailyMinTemps = weather?.daily?.temperature_2m_min ?? [];
  const dailyPrecipitation =
    weather?.daily?.precipitation_probability_max ?? [];

  const maxTempUnit = weather?.daily_units?.temperature_2m_max;
  const minTempUnit = weather?.daily_units?.temperature_2m_min;
  const precipUnit = weather?.daily_units?.precipitation_probability_max;

  const { icon, description } = getWeatherInfo(wmoCode, isDay);

  if (!location || isLoading)
    return (
      <div className='bg-white/80 pointer-events-auto rounded-2xl shadow-lg border px-4 py-3'>
        <div className='flex items-center justify-between w-full'>
          <div className='flex gap-2 items-center'>
            <Skeleton className='w-9 h-9 rounded-full' />
            <div className='flex flex-col gap-1'>
              <Skeleton className='w-16 h-3' />
              <Skeleton className='w-12 h-3' />
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <Skeleton className='w-12 h-3' />
            <Skeleton className='w-12 h-3' />
          </div>
        </div>
      </div>
    );

  if (!weather) return null;

  return (
    <div className='bg-white/80 pointer-events-auto overflow-hidden rounded-2xl shadow-lg border'>
      <Accordion type='single' collapsible>
        <AccordionItem value='item-1'>
          <AccordionTrigger className='flex items-center px-4 py-3 hover:no-underline! shadow-2xs rounded-2xl'>
            <div className='flex items-center justify-between w-full'>
              <div className='flex gap-2'>
                <Image
                  src={`/icons/weather/${icon}.svg`}
                  alt={description}
                  width={36}
                  height={36}
                  unoptimized
                />
                <div className='flex flex-col'>
                  <span className='font-poppins font-semibold text-sm'>
                    {temperature}
                    {temperatureUnit}
                  </span>
                  <span className='text-xs opacity-50'>{description}</span>
                </div>
              </div>

              <div className='flex flex-col text-xs'>
                <div className='flex items-center gap-1 text-blue-400'>
                  <IconDroplet className='w-[1.5em]! h-[1.5em]!' />
                  <span>
                    {relativeHumidity}
                    {humidityUnit}
                  </span>
                </div>

                <div className='flex items-center gap-1 text-slate-400'>
                  <IconWind className='w-[1.5em]! h-[1.5em]!' />
                  <span>
                    {windSpeed}
                    {windSpeedUnit}
                  </span>
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className='flex flex-col gap-2 px-4 py-2'>
            <span className='font-poppins font-semibold text-xs'>
              7-DAY FORECAST
            </span>

            <Separator />

            {dailyTimes.map((time: string, i: number) => {
              const date = new Date(time);
              const dayName = isToday(date) ? 'Today' : format(date, 'EEE');
              const dateLabel = format(date, 'MMM d');
              const { icon: dailyIcon, description: dailyDescription } =
                getWeatherInfo(dailyWmoCodes?.[i], true);

              return (
                <div
                  key={i}
                  className='flex-1 flex items-center py-2 border-b last:border-b-0'
                >
                  <div className='flex-[0.5] flex flex-col'>
                    <span className='font-poppins uppercase font-medium'>
                      {dayName}
                    </span>
                    <span className='font-inter text-xs opacity-50'>
                      {dateLabel}
                    </span>
                  </div>

                  <div className='flex-1 flex items-center gap-2 justify-start'>
                    <div>
                      <Image
                        src={`/icons/weather/${dailyIcon}.svg`}
                        alt={dailyDescription}
                        width={36}
                        height={36}
                        unoptimized
                      />
                    </div>

                    <div className='flex items-center gap-1 text-xs text-blue-400'>
                      <IconDroplet className='w-[1.5em]! h-[1.5em]!' />
                      <span>
                        {dailyPrecipitation[i]}
                        {precipUnit}
                      </span>
                    </div>
                  </div>

                  <div className='flex-1 flex items-center gap-2 justify-start'>
                    <span className='font-poppins font-medium text-orange-400'>
                      {dailyMaxTemps[i]}
                      {maxTempUnit}
                    </span>

                    <span className='opacity-50'>/</span>

                    <span className='opacity-50'>
                      {dailyMinTemps[i]}
                      {minTempUnit}
                    </span>
                  </div>
                </div>
              );
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
