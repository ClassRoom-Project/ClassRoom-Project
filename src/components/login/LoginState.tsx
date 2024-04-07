'use client';

import useLoginUserId from '@/hooks/useLogin/useLoginUserId';
// import useSessionStorageUserEmail from '@/hooks/useLogin/useSessionStorageUserEmail';
import { useReadLoginUserId } from '@/hooks/useLogin/useSetEmailToApi';
import useSetSessionStorage from '@/hooks/useLogin/useSetStorage';
import useUserEmail from '@/hooks/useLogin/useUserEmail';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export default function LoginState() {
  const userEmail = sessionStorage.getItem('userEmail');

  const handleLogout = async () => {
    sessionStorage.removeItem('userEmail');
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  // 훅 호출
  useSetSessionStorage();
  useReadLoginUserId(userEmail);
  useLoginUserId({ userEmail });

  return <div>{userEmail ? <button onClick={handleLogout}>Logout</button> : <Link href="/hello">Login</Link>}</div>;
}
