'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function RedirectToSignUp() {
  const router = useRouter();
  useEffect(() => {
    router.replace('hello/login/signup');
  }, []);
  return null;
}
