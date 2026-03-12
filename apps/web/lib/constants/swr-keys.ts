export const SWR_KEYS = {
  me: '/users/me',
  users: '/users',
  reportMapPins: '/reports',
  reportDetail: (reportId: number) => `/reports/${reportId}`,
  reportsAdmin: '/admin/reports',
  safetyMapPins: '/safety',
  safetyDetail: (safetyId: number) => `/safety/${safetyId}`,
  safetyAdmin: '/safety/admin',
  news: '/news',
  reportComments: (reportId: number) => `/reports/${reportId}/comments`,
  myVote: (reportId: number) => `/reports/${reportId}/my-vote`,
  weather: (lat: number, lon: number) =>
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&current=weather_code,temperature_2m,is_day,relative_humidity_2m,wind_speed_10m&timezone=auto`,
};
