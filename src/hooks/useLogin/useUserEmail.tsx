'use client';

import { useSession } from 'next-auth/react';

export default function useUserEmail() {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email ?? null;

  return userEmail;
}
