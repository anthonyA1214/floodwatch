'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
import { env } from '@/config/env';

export async function redirectIfLoggedIn() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;
  if (token) {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { role?: string };

    if (decoded.role === 'admin') redirect('/admin');
    else redirect('/map');
  }
}

export async function redirectIfNotLoggedIn() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;
  if (!token) redirect('/auth/login');
}

export async function redirectIfNotAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;
  if (!token) redirect('/auth/login');

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { role?: string };

    if (decoded.role !== 'admin') redirect('/');
  } catch {
    redirect('/auth/login');
  }
}
