'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function LoginState() {
  const { data: session } = useSession();
  console.log('--------', session);
  const handleLogoutClick = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  return <div>{session ? <button onClick={handleLogoutClick}>Logout</button> : <Link href="/hello">Login</Link>}</div>;
}
