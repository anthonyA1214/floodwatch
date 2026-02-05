'use client';

import { IconLogout } from '@tabler/icons-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { clearAuth } from '@/utils/auth-utils';
import { useAuth } from '@/contexts/auth-context';

export default function LogoutButton() {
  const router = useRouter();
  const { logout } = useAuth();

  const [isPending, setIsPending] = useState(false);

  async function handleLogout(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsPending(true);

    try {
      // Perform logout logic here, e.g., call an API endpoint to log out
      await logout();

      clearAuth();
      router.replace('/auth/login');
      router.refresh();
    } catch (err) {
      console.error('Logout failed', err);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      style={isPending ? { color: '#9E9E9E' } : {}}
    >
      <IconLogout />
    </button>
  );
}
