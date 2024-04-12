'use client';

import { useSession } from 'next-auth/react';

export default function useUserEmail() {
  const { data: session } = useSession();
  console.log('session 언제 들어옴?', session);

  const userEmail = session?.user?.email || null;
  // console.log('userEmail', userEmail);

  return userEmail;
}
