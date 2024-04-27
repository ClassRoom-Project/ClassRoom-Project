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

  // const userEmail = session?.user?.email ?? null;
  const userEmail = session?.user?.email ?? null;

  useSetSessionStorage();
  useReadLoginUserId(userEmail);
  useLoginUserId({ userEmail });

  const handleLogout = async () => {
    sessionStorage.removeItem('userEmail');
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  if (status === 'authenticated') {
    return (
      <div className="relative w-full">
        {userEmail ? (
          <div className="relative h-10 w-full hover:text-button-hover-color">
            <button className="flex w-full items-center justify-start" onClick={handleLogout}>
              <p className="pt-3">로그아웃</p>
            </button>
          </div>
        ) : (
          <Link
            className="btn mr-2 w-16 whitespace-nowrap border-main-color bg-transparent text-sm text-main-color hover:bg-main-color hover:text-white md:mr-[50px] md:w-20 md:text-base"
            href="/hello"
          >
            로그인
          </Link>
        )}
      </div>
    );
  }

  if (status === 'loading') {
    return (
      <div className="btn border border-main-color bg-transparent text-main-color hover:bg-main-color hover:text-white">
        로그인
      </div>
    );
  }
  return (
    <div className="relative w-full">
      {userEmail ? (
        <div className="relative h-10 w-full hover:text-button-hover-color">
          <button className="flex w-full items-center justify-start" onClick={handleLogout}>
            <p className="pt-3">로그아웃</p>
          </button>
        </div>
      ) : (
        <div className="flex w-full justify-end">
          <Link
            className="ms:w-16 btn mr-2 h-10 min-h-10 w-12 whitespace-nowrap border-main-color bg-transparent text-xs text-main-color hover:bg-main-color hover:text-white sm:text-sm md:mr-[50px] md:h-12 md:w-20 md:text-base"
            href="/hello"
          >
            로그인
          </Link>
        </div>
      )}
    </div>
  );
}
