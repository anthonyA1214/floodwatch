let memoryAccessToken: string | null = null;

export const setAccessToken = (token: string) => {
  memoryAccessToken = token;
};
export const getAccessToken = () => memoryAccessToken;

export const clearAuth = () => {
  memoryAccessToken = null;
  localStorage.removeItem('deviceId');
};
