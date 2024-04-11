'use client';

import useLoginUserId from '@/hooks/useLogin/useLoginUserId';
import { useReadLoginUserId } from '@/hooks/useLogin/useSetEmailToApi';
import useSetSessionStorage from '@/hooks/useLogin/useSetStorage';
import useSessionStorageUserEmail from '@/hooks/useLogin/useSessionStorageUserEmail';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Suspense } from 'react';

export default function LoginState() {
  const { data: session, status } = useSession();

  const userEmail = session?.user?.email ?? null;

  useSetSessionStorage();
  useReadLoginUserId(userEmail);
  useLoginUserId({ userEmail });

  const handleLogout = async () => {
    sessionStorage.removeItem('userEmail');
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  if (status === 'authenticated') {
    return <div>{userEmail ? <button onClick={handleLogout}>Logout</button> : <Link href="/hello">Login</Link>}</div>;
  }

  if (status === 'loading') {
    return <p>Logout</p>;
  }
  return <div>{userEmail ? <button onClick={handleLogout}>Logout</button> : <Link href="/hello">Login</Link>}</div>;
}