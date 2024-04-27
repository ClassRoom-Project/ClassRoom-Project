'use client';

import { getUserInfo } from '@/app/api/mypage/user-api';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useUserRoleStore } from '@/store/mypage/userRoleStore';
import { UserInfoType } from '@/types/user';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ReserveUserInfo = () => {
  const { loginUserId } = useLoginStore();
  const [userInfo, setUserInfo] = useState<UserInfoType>();
  const router = useRouter();
  const { isTeacher } = useUserRoleStore();

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

  // 마이페이지 이동
  const handleMoveToMypage = () => {
    if (isTeacher) {
      router.push('/teacherMypage');
    } else {
      router.push('/studentMypage');
    }
  };

  return (
    <div className="text-md flex h-full flex-col rounded-md bg-white px-6 py-4 shadow ">
      <div className="mb-4">
        <p className="mb-1 text-lg font-bold">연락처</p>
        <p className="text-sm">알림 발송을 위해 계정 정보를 확인해주세요.</p>
      </div>
      {loginUserId ? (
        <>
          <div className="flex h-32 flex-col justify-center">
            <div className="mb-4 ml-2  flex h-[52px] flex-col">
              <p className="mb-1 text-sm font-bold">계정 ID</p>
              <p className="">{userInfo?.email}</p>
            </div>
            <div className="ml-2 flex flex-col">
              <p className="mb-1 text-sm font-bold ">이름 (닉네임)</p>
              <p className="">{userInfo?.nickname}</p>
            </div>
          </div>
          <div className="tooltip mt-auto  text-gray-500" data-tip="마이페이지로 이동합니다">
            <button
              onClick={handleMoveToMypage}
              className="btn btn-ghost mt-4 w-full border border-solid border-gray-300 hover:border-button-focus-color hover:bg-background-color lg:mt-0"
            >
              프로필 수정하기
            </button>
          </div>
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <p className="rounded-md bg-base-200 px-6 py-4 text-center">로그인이 필요합니다</p>
        </div>
      )}
    </div>
  );
};

export default ReserveUserInfo;
