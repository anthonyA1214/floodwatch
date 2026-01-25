'use client';

import { api } from '../api';

export async function loginClient(email: string, password: string) {
  const response = await api.post('/auth/login', { email, password });

  return response.data;
}

export async function signupClient(
  first_name: string,
  last_name: string,
  home_address: string,
  email: string,
  password: string,
  confirm_password: string,
) {
  const response = await api.post('/auth/signup', {
    first_name,
    last_name,
    home_address,
    email,
    password,
    confirm_password,
  });

  return response.data;
}
