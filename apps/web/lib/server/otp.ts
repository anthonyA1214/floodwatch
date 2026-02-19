import { apiFetchServer } from '../api-fetch-server';

export async function sendOtp() {
  try {
    const res = await apiFetchServer('/auth/change-password/send-otp', {
      method: 'POST',
    });
    return res.json();
  } catch {}
}
