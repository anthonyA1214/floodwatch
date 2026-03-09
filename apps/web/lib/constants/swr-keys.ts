export const SWR_KEYS = {
  me: '/users/me',
  users: '/users',
  reportMapPins: '/reports',
  reportDetail: (reportId: number) => `/reports/${reportId}`,
  reportsAdmin: '/admin/reports',
  safetyLocations: '/safety',
  safetyLocationsAdmin: '/safety/admin',
  news: '/news',
  reportComments: (reportId: number) => `/reports/${reportId}/comments`,
  myVote: (reportId: number) => `/reports/${reportId}/my-vote`,
};
