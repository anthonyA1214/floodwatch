export const getApiUrl = () => {
  console.log('NODE_ENV:', process.env.NODE_ENV);
  return process.env.NODE_ENV === 'production'
    ? process.env.API_URL
    : process.env.NEXT_PUBLIC_API_URL;
};
