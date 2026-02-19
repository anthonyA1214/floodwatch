export const getApiUrl = () => {
  return process.env.NODE_ENV === 'production'
    ? process.env.API_URL
    : process.env.NEXT_PUBLIC_API_URL;
};
