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
      <div>
        {userEmail ? (
          <div className="border-border-color relative border-b-[1px] border-solid w-52 mb-2 hover:text-button-hover-color">
            <button className="w-full flex justify-start items-center" onClick={handleLogout}>
              <p>로그아웃</p>
            </button>
          </div>
        ) : (
          <Link href="/hello">로그인</Link>
        )}
      </div>
    );
  }

  if (status === 'loading') {
    return (
      <div className="btn bg-transparent border border-main-color text-main-color hover:bg-main-color hover:text-white">
        로그인
      </div>
    );
  }
  return (
    <div className="w-full flex relative justify-end items-end">
      {userEmail ? (
        <div className="border-border-color relative borderb-[1px] border-solid w-52 mb-2 hover:text-button-hover-color">
          <button className="w-full flex justify-start" onClick={handleLogout}>
            <p>로그아웃</p>
          </button>
        </div>
      ) : (
        <div className="w-full flex justify-end">
          <Link
            className="btn bg-transparent border-main-color text-main-color hover:bg-main-color hover:text-white"
            href="/hello"
          >
            로그인
          </Link>
        </div>
      )}
    </div>
  );
}
