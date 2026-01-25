export const clearAuth = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('deviceId');
};
