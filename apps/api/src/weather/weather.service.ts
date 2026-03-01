import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

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

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);
  private readonly OPEN_METEO_URL = 'https://api.open-meteo.com/v1/forecast';

  private readonly LATITUDE = 14.6495;
  private readonly LONGITUDE = 120.9679;

  constructor(private readonly httpService: HttpService) {}

  async getWeather() {
    try {
      const response = await firstValueFrom(
        this.httpService.get<any>(this.OPEN_METEO_URL, {
          params: {
            latitude: this.LATITUDE,
            longitude: this.LONGITUDE,
            current:
              'temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code',
            daily:
              'weather_code,temperature_2m_max,temperature_2m_min,relative_humidity_2m_max,wind_speed_10m_max',
            timezone: 'Asia/Manila',
            forecast_days: 7,
          },
        }),
      );

      const current = response.data.current;
      const daily = response.data.daily;

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
    } catch (error) {
      this.logger.error('Failed to fetch weather:', error.message);
      throw error;
    }
  }
}