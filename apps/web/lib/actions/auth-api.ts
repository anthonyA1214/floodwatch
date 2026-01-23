'use client';

import { api } from '../api';

export async function loginClient(email: string, password: string) {
  const res = await api.post('/auth/login', { email, password });

  return res.data;
}
