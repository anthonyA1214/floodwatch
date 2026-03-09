'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp, Cloud, Droplets, Wind, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const LATITUDE = 14.6495;
const LONGITUDE = 120.9679;
const OPEN_METEO_URL = 'https://api.open-meteo.com/v1/forecast';

const WMO_CODES: Record<number, string> = {
  0: 'Clear Sky',
  1: 'Mainly Clear',
  2: 'Partly Cloudy',
  3: 'Overcast',
  45: 'Foggy',
  48: 'Icy Fog',
  51: 'Light Drizzle',
  53: 'Drizzle',
  55: 'Heavy Drizzle',
  61: 'Light Rain',
  63: 'Rain',
  65: 'Heavy Rain',
  71: 'Light Snow',
  73: 'Snow',
  75: 'Heavy Snow',
  80: 'Light Showers',
  81: 'Showers',
  82: 'Heavy Showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with Hail',
  99: 'Heavy Thunderstorm',
};

interface DayForecast {
  date: string;
  condition: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  humidity: number;
  windSpeed: number;
}

interface WeatherData {
  current: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    condition: string;
    weatherCode: number;
  };
  forecast: DayForecast[];
}

interface WeatherCardProps {
  compact?: boolean;
}

function getWeatherEmoji(code: number): string {
  if (code === 0 || code === 1) return '☀️';
  if (code === 2) return '⛅';
  if (code === 3) return '☁️';
  if (code >= 45 && code <= 48) return '🌫️';
  if (code >= 51 && code <= 55) return '🌦️';
  if (code >= 61 && code <= 65) return '🌧️';
  if (code >= 71 && code <= 75) return '❄️';
  if (code >= 80 && code <= 82) return '🌦️';
  if (code >= 95) return '⛈️';
  return '🌤️';
}

function formatDay(dateStr: string): { day: string; date: string } {
  const date = new Date(dateStr);
  return {
    day: date.toLocaleDateString('en-US', { weekday: 'short' }),
    date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  };
}

async function fetchWeatherData(): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: String(LATITUDE),
    longitude: String(LONGITUDE),
    current: 'temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code',
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min,relative_humidity_2m_max,wind_speed_10m_max',
    timezone: 'Asia/Manila',
    forecast_days: '7',
  });

  const res = await fetch(`${OPEN_METEO_URL}?${params}`);
  if (!res.ok) throw new Error('Failed to fetch weather');
  const data = await res.json();

  const current = data.current;
  const daily = data.daily;

  return {
    current: {
      temperature: Math.round(current.temperature_2m),
      humidity: current.relative_humidity_2m,
      windSpeed: Math.round(current.wind_speed_10m),
      condition: WMO_CODES[current.weather_code] ?? 'Unknown',
      weatherCode: current.weather_code,
    },
    forecast: daily.time.map((date: string, i: number) => ({
      date,
      condition: WMO_CODES[daily.weather_code[i]] ?? 'Unknown',
      weatherCode: daily.weather_code[i],
      tempMax: Math.round(daily.temperature_2m_max[i]),
      tempMin: Math.round(daily.temperature_2m_min[i]),
      humidity: daily.relative_humidity_2m_max[i],
      windSpeed: Math.round(daily.wind_speed_10m_max[i]),
    })),
  };
}

// ─── Shared forecast list ────────────────────────────────────────────────────
function ForecastList({ forecast }: { forecast: DayForecast[] }) {
  return (
    <div className='divide-y divide-border'>
      {forecast.slice(1).map((day) => {
        const { day: dayName, date } = formatDay(day.date);
        return (
          <div key={day.date} className='flex items-center px-5 py-3 gap-3'>
            <div className='w-14 shrink-0'>
              <p className='text-xs font-semibold text-foreground'>{dayName}</p>
              <p className='text-xs text-muted-foreground'>{date}</p>
            </div>
            <div className='flex items-center gap-2 flex-1 min-w-0'>
              <span className='text-lg'>
                {getWeatherEmoji(day.weatherCode)}
              </span>
              <span className='text-xs text-muted-foreground truncate'>
                {day.condition}
              </span>
            </div>
            <div className='text-right shrink-0'>
              <p className='text-xs font-semibold text-foreground'>
                {day.tempMax}° / {day.tempMin}°
              </p>
              <div className='flex items-center justify-end gap-2 text-xs text-muted-foreground'>
                <span>💧{day.humidity}%</span>
                <span>💨{day.windSpeed}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Current conditions summary ──────────────────────────────────────────────
function CurrentConditions({ current }: { current: WeatherData['current'] }) {
  return (
    <div className='flex items-center justify-between px-5 py-4'>
      <div className='flex items-center gap-3'>
        <span className='text-5xl'>{getWeatherEmoji(current.weatherCode)}</span>
        <div>
          <p className='text-4xl font-bold text-foreground tracking-tight'>
            {current.temperature}°C
          </p>
          <p className='text-sm text-muted-foreground'>{current.condition}</p>
        </div>
      </div>
      <div className='flex flex-col gap-1.5'>
        <Badge variant='secondary' className='gap-1.5 text-xs font-normal'>
          <Droplets className='w-3 h-3 text-blue-400' />
          {current.humidity}%
        </Badge>
        <Badge variant='secondary' className='gap-1.5 text-xs font-normal'>
          <Wind className='w-3 h-3 text-blue-400' />
          {current.windSpeed} km/h
        </Badge>
      </div>
    </div>
  );
}

// ─── Mobile Drawer ──────────────────────────────────
function MobileDrawer({
  weather,
  open,
  onOpenChange,
}: {
  weather: WeatherData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [dragY, setDragY] = useState(0);
  const startYRef = useRef<number>(0);
  const draggingRef = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    startYRef.current = e.touches[0].clientY;
    draggingRef.current = true;
    setDragY(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!draggingRef.current) return;
    const delta = e.touches[0].clientY - startYRef.current;
    if (delta > 0) setDragY(delta);
  };

  const handleTouchEnd = () => {
    draggingRef.current = false;
    if (dragY > 80) onOpenChange(false);
    setDragY(0);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => onOpenChange(false)}
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${
          open
            ? 'opacity-30 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer panel */}
      <div
        style={{
          transform: open ? `translateY(${dragY}px)` : 'translateY(100%)',
        }}
        className={`fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-2xl shadow-2xl ${
          dragY === 0 ? 'transition-transform duration-300 ease-out' : ''
        }`}
      >
        {/* Drag handle */}
        <div
          className='flex justify-center pt-3 pb-1 touch-none cursor-grab active:cursor-grabbing'
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className='w-10 h-1 bg-muted-foreground/30 rounded-full' />
        </div>

        {/* Header */}
        <div className='flex items-center justify-between px-5 py-3 border-b'>
          <p className='flex items-center gap-2 text-sm font-semibold text-foreground'>
            <Cloud className='w-4 h-4 text-blue-500' />
            Weather — Caloocan
          </p>
          <Button
            variant='ghost'
            size='icon'
            className='h-7 w-7 rounded-full'
            onClick={() => onOpenChange(false)}
          >
            <X className='w-4 h-4' />
          </Button>
        </div>

        <CurrentConditions current={weather.current} />

        <Separator />

        <p className='px-5 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest'>
          7-Day Forecast
        </p>
        <div className='overflow-y-auto max-h-72 pb-6'>
          <ForecastList forecast={weather.forecast} />
        </div>
      </div>
    </>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function WeatherCard({ compact = false }: WeatherCardProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeatherData()
      .then(setWeather)
      .catch((err) => console.error('Failed to fetch weather:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div
        className={`bg-card rounded-2xl shadow-lg p-4 animate-pulse ${compact ? 'w-full' : 'h-10'}`}
      >
        <div className='h-4 bg-muted rounded w-3/4 mb-3' />
        <div className='h-8 bg-muted rounded w-1/2' />
      </div>
    );
  }

  if (!weather) {
    return (
      <div
        className={`bg-card rounded-2xl shadow-lg p-4 text-xs text-destructive ${compact ? 'w-full' : ''}`}
      >
        Weather unavailable
      </div>
    );
  }

  // ─── Compact / mobile ────────────────────────────────────────────────────
  if (compact) {
    return (
      <>
        <Button
          variant='outline'
          onClick={() => setOpen(true)}
          className='w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-md px-4 py-3 h-auto flex items-center justify-between hover:bg-white transition-colors'
        >
          <div className='flex items-center gap-3'>
            <span className='text-2xl leading-none'>
              {getWeatherEmoji(weather.current.weatherCode)}
            </span>
            <div className='text-left'>
              <p className='text-base font-bold text-foreground leading-tight'>
                {weather.current.temperature}°C
              </p>
              <p className='text-xs text-muted-foreground leading-tight'>
                {weather.current.condition}
              </p>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <span className='flex items-center gap-1 text-xs text-muted-foreground'>
              <Droplets className='w-3.5 h-3.5 text-blue-400' />
              {weather.current.humidity}%
            </span>
            <span className='flex items-center gap-1 text-xs text-muted-foreground'>
              <Wind className='w-3.5 h-3.5 text-blue-400' />
              {weather.current.windSpeed} km/h
            </span>
            <ChevronDown className='w-4 h-4 text-muted-foreground/50' />
          </div>
        </Button>

        <MobileDrawer weather={weather} open={open} onOpenChange={setOpen} />
      </>
    );
  }

  // ─── Desktop Popover ─────────────────────────────────────────────────────
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className='flex items-center gap-2 bg-white shadow-md h-10 px-3 rounded-xl hover:bg-gray-50 whitespace-nowrap'
        >
          <span className='text-lg leading-none'>
            {getWeatherEmoji(weather.current.weatherCode)}
          </span>
          <span className='text-sm font-bold text-foreground'>
            {weather.current.temperature}°C
          </span>
          <span className='text-xs text-muted-foreground'>
            {weather.current.condition}
          </span>
          <Separator orientation='vertical' className='h-4 mx-1' />
          <span className='flex items-center gap-1 text-xs text-muted-foreground'>
            <Droplets className='w-3 h-3 text-blue-400' />
            {weather.current.humidity}%
          </span>
          <span className='flex items-center gap-1 text-xs text-muted-foreground'>
            <Wind className='w-3 h-3 text-blue-400' />
            {weather.current.windSpeed} km/h
          </span>
          {open ? (
            <ChevronUp className='w-3 h-3 text-muted-foreground' />
          ) : (
            <ChevronDown className='w-3 h-3 text-muted-foreground' />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align='start'
        sideOffset={8}
        className='w-72 p-0 rounded-2xl overflow-hidden shadow-lg'
      >
        <div className='px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide border-b'>
          7-Day Forecast
        </div>
        <ForecastList forecast={weather.forecast} />
      </PopoverContent>
    </Popover>
  );
}
