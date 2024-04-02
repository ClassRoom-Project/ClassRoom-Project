'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function RedirectToSignUp() {
  const router = useRouter();
  useEffect(() => {
    router.replace('hellologin/login/signup');
  }, []);
  return null;
}
