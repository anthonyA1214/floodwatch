const ROLE_REDIRECT = {
  admin: '/admin',
  user: '/map',
};

export function getRedirectByRole(frontendURL: string, role: string) {
  return `${frontendURL}${ROLE_REDIRECT[role] ?? '/map'}`;
}
