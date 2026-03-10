type WeatherInfo = {
  day: {
    description: string;
    icon: string;
  };
  night: {
    description: string;
    icon: string;
  };
};

export const WMO_WEATHER_ICON_MAP: Record<number, WeatherInfo> = {
  0: {
    day: {
      description: 'Sunny',
      icon: 'clear-day',
    },
    night: {
      description: 'Clear',
      icon: 'clear-night',
    },
  },
  1: {
    day: {
      description: 'Mainly Sunny',
      icon: 'clear-day',
    },
    night: {
      description: 'Mainly Clear',
      icon: 'clear-night',
    },
  },
  2: {
    day: {
      description: 'Partly Cloudy',
      icon: 'partly-cloudy-day',
    },
    night: {
      description: 'Partly Cloudy',
      icon: 'partly-cloudy-night',
    },
  },
  3: {
    day: {
      description: 'Cloudy',
      icon: 'overcast-day',
    },
    night: {
      description: 'Cloudy',
      icon: 'overcast-night',
    },
  },
  45: {
    day: {
      description: 'Foggy',
      icon: 'fog-day',
    },
    night: {
      description: 'Foggy',
      icon: 'fog-night',
    },
  },
  48: {
    day: {
      description: 'Rime Fog',
      icon: 'fog-day',
    },
    night: {
      description: 'Rime Fog',
      icon: 'fog-night',
    },
  },
  51: {
    day: {
      description: 'Light Drizzle',
      icon: 'partly-cloudy-day-drizzle',
    },
    night: {
      description: 'Light Drizzle',
      icon: 'partly-cloudy-night-drizzle',
    },
  },
  53: {
    day: {
      description: 'Drizzle',
      icon: 'partly-cloudy-day-drizzle',
    },
    night: {
      description: 'Drizzle',
      icon: 'partly-cloudy-night-drizzle',
    },
  },
  55: {
    day: {
      description: 'Heavy Drizzle',
      icon: 'drizzle',
    },
    night: {
      description: 'Heavy Drizzle',
      icon: 'drizzle',
    },
  },
  56: {
    day: {
      description: 'Light Freezing Drizzle',
      icon: 'partly-cloudy-day-sleet',
    },
    night: {
      description: 'Light Freezing Drizzle',
      icon: 'partly-cloudy-night-sleet',
    },
  },
  57: {
    day: {
      description: 'Freezing Drizzle',
      icon: 'partly-cloudy-day-sleet',
    },
    night: {
      description: 'Freezing Drizzle',
      icon: 'partly-cloudy-night-sleet',
    },
  },
  61: {
    day: {
      description: 'Light Rain',
      icon: 'partly-cloudy-day-rain',
    },
    night: {
      description: 'Light Rain',
      icon: 'partly-cloudy-night-rain',
    },
  },
  63: {
    day: {
      description: 'Rain',
      icon: 'rain',
    },
    night: {
      description: 'Rain',
      icon: 'rain',
    },
  },
  65: {
    day: {
      description: 'Heavy Rain',
      icon: 'rain',
    },
    night: {
      description: 'Heavy Rain',
      icon: 'rain',
    },
  },
  66: {
    day: {
      description: 'Light Freezing Rain',
      icon: 'partly-cloudy-day-sleet',
    },
    night: {
      description: 'Light Freezing Rain',
      icon: 'partly-cloudy-night-sleet',
    },
  },
  67: {
    day: {
      description: 'Freezing Rain',
      icon: 'sleet',
    },
    night: {
      description: 'Freezing Rain',
      icon: 'sleet',
    },
  },
  71: {
    day: {
      description: 'Light Snow',
      icon: 'partly-cloudy-day-snow',
    },
    night: {
      description: 'Light Snow',
      icon: 'partly-cloudy-night-snow',
    },
  },
  73: {
    day: {
      description: 'Snow',
      icon: 'snow',
    },
    night: {
      description: 'Snow',
      icon: 'snow',
    },
  },
  75: {
    day: {
      description: 'Heavy Snow',
      icon: 'snow',
    },
    night: {
      description: 'Heavy Snow',
      icon: 'snow',
    },
  },
  77: {
    day: {
      description: 'Snow Grains',
      icon: 'snowflake',
    },
    night: {
      description: 'Snow Grains',
      icon: 'snowflake',
    },
  },
  80: {
    day: {
      description: 'Light Showers',
      icon: 'partly-cloudy-day-rain',
    },
    night: {
      description: 'Light Showers',
      icon: 'partly-cloudy-night-rain',
    },
  },
  81: {
    day: {
      description: 'Showers',
      icon: 'rain',
    },
    night: {
      description: 'Showers',
      icon: 'rain',
    },
  },
  82: {
    day: {
      description: 'Heavy Showers',
      icon: 'rain',
    },
    night: {
      description: 'Heavy Showers',
      icon: 'rain',
    },
  },
  85: {
    day: {
      description: 'Light Snow Showers',
      icon: 'partly-cloudy-day-snow',
    },
    night: {
      description: 'Light Snow Showers',
      icon: 'partly-cloudy-night-snow',
    },
  },
  86: {
    day: {
      description: 'Snow Showers',
      icon: 'snow',
    },
    night: {
      description: 'Snow Showers',
      icon: 'snow',
    },
  },
  95: {
    day: {
      description: 'Thunderstorm',
      icon: 'thunderstorms-day',
    },
    night: {
      description: 'Thunderstorm',
      icon: 'thunderstorms-night',
    },
  },
  96: {
    day: {
      description: 'Light Thunderstorms With Hail',
      icon: 'thunderstorms-day-rain',
    },
    night: {
      description: 'Light Thunderstorms With Hail',
      icon: 'thunderstorms-night-rain',
    },
  },
  99: {
    day: {
      description: 'Thunderstorm With Hail',
      icon: 'thunderstorms-day-rain',
    },
    night: {
      description: 'Thunderstorm With Hail',
      icon: 'thunderstorms-night-rain',
    },
  },
};

export function getWeatherInfo(wmoCode: number, isDay: boolean) {
  const weatherInfo = WMO_WEATHER_ICON_MAP[wmoCode];
  if (!weatherInfo) return { icon: 'not-available', description: 'Unknown' };
  return isDay ? weatherInfo.day : weatherInfo.night;
}
