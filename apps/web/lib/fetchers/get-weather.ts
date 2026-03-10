import { SWR_KEYS } from '@/lib/constants/swr-keys';

export async function getWeather(lat: number | null, lon: number | null) {
  if (!lat || !lon) return null;

  const res = await fetch(SWR_KEYS.weather(lat, lon));

  if (!res.ok) {
    console.error('WEATHER ERROR:', res.status);
    return null;
  }

  const data = await res.json();
  return data;
}
