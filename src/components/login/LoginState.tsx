'use client';

import useUserEmail from '@/hooks/useLogin/useUserEmail';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function LoginState() {
  const userEmail = useUserEmail();

  const handleLogoutClick = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  return (
    <div>{userEmail ? <button onClick={handleLogoutClick}>Logout</button> : <Link href="/hello">Login</Link>}</div>
  );
}
