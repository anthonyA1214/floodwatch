'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Cloud, Droplets, Wind } from 'lucide-react';

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

export default function WeatherCard({ compact = false }: WeatherCardProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4001'}/weather`,
        );
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.error('Failed to fetch weather:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className={`bg-white rounded-2xl shadow-lg p-4 animate-pulse ${compact ? 'w-48' : 'w-72'}`}>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
        <div className="h-8 bg-gray-200 rounded w-1/2" />
      </div>
    );
  }

  if (!weather) return (
    <div className={`bg-white rounded-2xl shadow-lg p-4 text-xs text-red-400 ${compact ? 'w-48' : 'w-72'}`}>
      Weather unavailable
    </div>
  );

  // ─── Compact / mobile ────────────────────────────────────────────────────
  if (compact) {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {!expanded ? (
          <button
            onClick={() => setExpanded(true)}
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 transition-colors"
          >
            <span className="text-xl leading-none">
              {getWeatherEmoji(weather.current.weatherCode)}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold text-gray-800">
                {weather.current.temperature}°C
              </span>
              <span className="text-xs text-gray-400">
                {weather.current.condition}
              </span>
            </div>
            <ChevronDown className="w-3 h-3 text-gray-400 ml-1" />
          </button>
        ) : (
          <div>
            <button
              onClick={() => setExpanded(false)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Cloud className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-semibold text-gray-700">
                  Weather - Caloocan
                </span>
              </div>
              <ChevronUp className="w-4 h-4 text-gray-400" />
            </button>
            <button
              onClick={() => setExpanded(false)}
              className="w-full px-4 pb-4 flex items-start justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">
                  {getWeatherEmoji(weather.current.weatherCode)}
                </span>
                <div className="text-left">
                  <div className="text-3xl font-bold text-gray-800">
                    {weather.current.temperature}°C
                  </div>
                  <div className="text-xs text-gray-500">
                    {weather.current.condition}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Droplets className="w-3 h-3 text-blue-400" />
                  <span>{weather.current.humidity}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <Wind className="w-3 h-3 text-blue-400" />
                  <span>{weather.current.windSpeed} km/h</span>
                </div>
              </div>
            </button>
            <div className="border-t border-gray-100">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                7-Day Forecast
              </div>
              <div className="divide-y divide-gray-50">
                {weather.forecast.map((day) => {
                  const { day: dayName, date } = formatDay(day.date);
                  return (
                    <div key={day.date} className="flex items-center px-4 py-2.5 gap-3">
                      <div className="w-12">
                        <div className="text-xs font-semibold text-gray-700">{dayName}</div>
                        <div className="text-xs text-gray-400">{date}</div>
                      </div>
                      <div className="flex items-center gap-1.5 flex-1">
                        <span className="text-base">{getWeatherEmoji(day.weatherCode)}</span>
                        <span className="text-xs text-gray-600">{day.condition}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-semibold text-gray-700">
                          {day.tempMax}° / {day.tempMin}°
                        </div>
                        <div className="flex items-center justify-end gap-2 text-xs text-gray-400">
                          <span>💧{day.humidity}%</span>
                          <span>💨{day.windSpeed}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ─── Full / desktop ──────────────────────────────────────────────────────
  return (
    <div className="bg-white rounded-2xl shadow-lg w-72 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Cloud className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-semibold text-gray-700">
            Weather - Caloocan
          </span>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>

      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 pb-4 flex items-start justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">
            {getWeatherEmoji(weather.current.weatherCode)}
          </span>
          <div className="text-left">
            <div className="text-3xl font-bold text-gray-800">
              {weather.current.temperature}°C
            </div>
            <div className="text-xs text-gray-500">
              {weather.current.condition}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Droplets className="w-3 h-3 text-blue-400" />
            <span>{weather.current.humidity}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Wind className="w-3 h-3 text-blue-400" />
            <span>{weather.current.windSpeed} km/h</span>
          </div>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-gray-100">
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            7-Day Forecast
          </div>
          <div className="divide-y divide-gray-50">
            {weather.forecast.map((day) => {
              const { day: dayName, date } = formatDay(day.date);
              return (
                <div key={day.date} className="flex items-center px-4 py-2.5 gap-3">
                  <div className="w-12">
                    <div className="text-xs font-semibold text-gray-700">{dayName}</div>
                    <div className="text-xs text-gray-400">{date}</div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-1">
                    <span className="text-base">{getWeatherEmoji(day.weatherCode)}</span>
                    <span className="text-xs text-gray-600">{day.condition}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-semibold text-gray-700">
                      {day.tempMax}° / {day.tempMin}°
                    </div>
                    <div className="flex items-center justify-end gap-2 text-xs text-gray-400">
                      <span>💧{day.humidity}%</span>
                      <span>💨{day.windSpeed}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}