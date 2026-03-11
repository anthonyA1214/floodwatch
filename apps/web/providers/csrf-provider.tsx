'use client';

import { useEffect } from 'react';

export default function CsrfProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Fetch the CSRF token when the component mounts
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/csrf-token`, {
      credentials: 'include',
    }).catch(() => console.error('Failed to fetch CSRF token'));
  }, []);

  return <>{children}</>;
}
