'use client';

import { getUserInfo } from '@/app/api/mypage/user-api';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useUserRoleStore } from '@/store/mypage/userRoleStore';
import { UserInfoType } from '@/types/user';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// TODO: 유저 정보 불러오기
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
    <div className=" h-[310px] rounded-md flex flex-col bg-white p-6 text-md shadow">
      <div className="mb-4">
        <p className="text-lg font-bold mb-1">연락처</p>
        <p className="text-sm">알림 발송을 위해 계정 정보를 확인해주세요.</p>
      </div>
      {loginUserId ? (
        <>
          <div className="flex flex-col  mb-4 h-[52px] ml-2">
            <p className="font-bold mb-1 text-sm">계정 ID</p>
            <p className="">{userInfo?.email}</p>
          </div>
          <div className="flex flex-col ml-2">
            <p className="font-bold mb-1 text-sm ">이름 (닉네임)</p>
            <p className="">{userInfo?.nickname}</p>
          </div>
          <div className="tooltip mt-auto  text-gray-500" data-tip="마이페이지로 이동합니다">
            <button
              onClick={handleMoveToMypage}
              className="btn w-full btn-ghost border border-solid border-gray-300 hover:bg-background-color hover:border-button-focus-color"
            >
              프로필 수정하기
            </button>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <p className="bg-base-200 text-center py-4 px-6 rounded-md">로그인이 필요합니다</p>
        </div>
      )}
    </div>
  );
};

export default ReserveUserInfo;
