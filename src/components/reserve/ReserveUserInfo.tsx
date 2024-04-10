'use client';

import { getUserInfo } from '@/app/api/mypage/user-api';
import useLoginUserId from '@/hooks/useLogin/useLoginUserId';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { UserInfoType } from '@/types/user';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

// TODO: 유저 정보 불러오기
const ReserveUserInfo = () => {
  const { loginUserId } = useLoginStore();
  const [userInfo, setUserInfo] = useState<UserInfoType>();
  const router = useRouter();

  useEffect(() => {
    const fetchLoginUserInfo = async () => {
      if (loginUserId) {
        const loginUserInfo = await getUserInfo({ userId: loginUserId });

        if (loginUserInfo) {
          setUserInfo(loginUserInfo);
        }
      }
    };

    fetchLoginUserInfo();
  }, [loginUserId]);

  return (
    <div className="rounded-md h-[280px] flex flex-col bg-white p-6">
      <p className="mb-4 text-lg font-bold ">연락처 입력</p>
      <div className="flex flex-col  mb-4 h-[52px]">
        <p className="font-bold mb-1 ">계정 ID (알림 메일이 발송됩니다.)</p>
        <p>{userInfo?.email}</p>
      </div>
      <div className="flex flex-col">
        <p className="font-bold mb-1">이름 (닉네임)</p>
        <p>{userInfo?.nickname}</p>
      </div>
      <button
        onClick={() => router.push('/mypage')}
        className="btn mt-auto btn-ghost border border-solid border-gray-300 text-gray-500 h-[20px]"
      >
        프로필 수정하기
      </button>
    </div>
  );
};

export default ReserveUserInfo;
