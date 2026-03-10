type WeatherData = {
  current_units?: {
    temperature_2m: string;
    relative_humidity_2m: string;
    wind_speed_10m: string;
  };
  current?: {
    weather_code: number;
    temperature_2m: number;
    is_day: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
  };
  daily_units?: {
    temperature_2m_max: string;
    temperature_2m_min: string;
    precipitation_probability_max: string;
  };
  daily?: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
  };
};

export function useWeatherData(weather?: WeatherData) {
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

  return {
    current: {
      wmoCode,
      isDay,
      temperature,
      relativeHumidity,
      windSpeed,
    },
    units: {
      temperature: temperatureUnit,
      humidity: humidityUnit,
      windSpeed: windSpeedUnit,
      maxTemp: maxTempUnit,
      minTemp: minTempUnit,
      precipitation: precipUnit,
    },
    daily: {
      times: dailyTimes,
      wmoCodes: dailyWmoCodes,
      maxTemps: dailyMaxTemps,
      minTemps: dailyMinTemps,
      precipitationProbabilities: dailyPrecipitation,
    },
  };
}
