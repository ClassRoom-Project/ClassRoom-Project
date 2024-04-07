'use client';

import useLoginUserId from '@/hooks/useLogin/useLoginUserId';
import useSessionStorageUserEmail from '@/hooks/useLogin/useSessionStorageUserEmail';
import { useReadLoginUserId } from '@/hooks/useLogin/useSetEmailToApi';
import useSetSessionStorage from '@/hooks/useLogin/useSetStorage';
import { useUserStore } from '@/store/userInfoStore';
import { useUserRoleStore } from '@/store/userRoleStore';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import basicProfileImage from '../../../public/profile-image.png';
import { useEffect } from 'react';

export default function LoginState() {
  // const userEmail = useUserEmail();
  // const userEmail = sessionStorage.getItem('userEmail');
  const userEmail = useSessionStorageUserEmail();

  const { userInfo } = useUserStore();

  // console.log('userInfo', userInfo);
  const { isTeacher } = useUserRoleStore();

  const handleLogout = async () => {
    sessionStorage.removeItem('userEmail');
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  // 훅 호출
  useSetSessionStorage();
  useReadLoginUserId(userEmail);
  useLoginUserId({ userEmail });

  // 수강생인지 강사인지 명시적으로 보여주기
  const roleName = isTeacher ? '강사' : '수강생';

  // 프로필 이미지가 없을 때, 기본 프로필 이미지 보여주기
  const profileImage = userInfo?.profile_image ? userInfo?.profile_image : basicProfileImage;

  return (
    <div>
      {userEmail ? (
        <div className="flex items-center">
          {' '}
          <p className="p-4">
            {userInfo?.nickname} <span className="text-point-color font-bold">{roleName}님</span>
          </p>
          <Link href={'/mypage'}>
            <Image
              src={profileImage}
              alt="Profile image"
              className="mr-[5px] rounded-full"
              width={50}
              height={50}
              unoptimized={true}
            />
          </Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Link href="/hello">Login</Link>
      )}
    </div>
  );
}
