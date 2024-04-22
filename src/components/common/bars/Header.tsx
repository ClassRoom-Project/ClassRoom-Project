'use client';

import LoginState from '@/components/login/LoginState';
import { userInfoStore } from '@/store/mypage/userInfoStore';
import { useUserRoleStore } from '@/store/mypage/userRoleStore';
import Image from 'next/image';
import useSetSessionStorage from '@/hooks/useLogin/useSetStorage';
import { useReadLoginUserId } from '@/hooks/useLogin/useSetEmailToApi';
import useLoginUserId from '@/hooks/useLogin/useLoginUserId';
import Link from 'next/link';
import { PropsWithChildren, Suspense, useEffect } from 'react';
import Notification from '@/components/common/Notification';
import basicProfileImage from '../../../../public/profile-image.png';
import { SearchClass } from './categories/SearchClass';
import Logo from '@/assets/images/Frame 1775.svg';
import { useSession } from 'next-auth/react';
import { getUserInfo } from '@/app/api/mypage/user-api';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useRouter } from 'next/navigation';

const Header = ({ children }: PropsWithChildren) => {
  const { userInfo, setUserInfo } = userInfoStore();
  const { isTeacher } = useUserRoleStore();

  const router = useRouter();

  const { loginUserId } = useLoginStore();
  const userId = loginUserId as string;

  const { data: session, status } = useSession();
  const userEmail = session?.user?.email ?? null;

  //
  useSetSessionStorage();
  useReadLoginUserId(userEmail);
  useLoginUserId({ userEmail });

  // 로그인 시, userInfo 불러오기
  useEffect(() => {
    if (userId) {
      const fetchUserInfo = async () => {
        const userInfoData = await getUserInfo({ userId });
        if (userInfoData !== null) {
          setUserInfo(userInfoData);
        }
      };
      fetchUserInfo();
    }
  }, [userId, setUserInfo]);

  // 수강생인지 강사인지 명시적으로 보여주기
  const roleName = isTeacher === true ? '강사' : '회원';

  //TODO - 간격 맞추기
  // 프로필 이미지가 없을 때, 기본 프로필 이미지 보여주기
  const profileImage = userInfo?.profile_image ? userInfo?.profile_image : basicProfileImage;

  // 마이페이지 이동
  const handleMoveToMypage = () => {
    if (isTeacher) {
      router.push('/teacherMypage');
    } else {
      router.push('/studentMypage');
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-40 bg-white flex p-[15px] w-full justify-between  items-center h-20 border-b-[1px] border-solid border-gray-300 ml-0 md:ml-[100px]">
        <div className="flex items-center ml-0 w-full justify-start xl:ml-20">
          <div className="rounded-full relative w-16 h-16">
            <Link href="/">
              <Image className="rounded-full" src={Logo} alt="클룸 로고" fill />
            </Link>
          </div>
          <div className="w-3/5  xs:1/3">{/* <SearchClass /> */}</div>
        </div>
        <div className="w-2/5 relative flex items-end justify-end xl:mr-48 md:mr-24 lg:w-4/5">
          <div className="flex w-full justify-end items-center">
            {userEmail ? (
              <div className="flex justify-end items-en">
                <p className="p-4 hidden w-full whitespace-nowrap lg:block">
                  {userInfo?.nickname} <span className="text-main-color font-bold">{roleName}님</span>
                </p>
              </div>
            ) : null}
            {userEmail ? (
              <div className="mr-[10px] hidden xl:block">
                <Notification />
              </div>
            ) : null}

            {userEmail ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="w-16 h-16 relative rounded-full m-1">
                  <Image
                    src={profileImage}
                    alt="Profile image"
                    className="w-full h-full rounded-full object-cover"
                    fill
                    unoptimized={true}
                  />
                </div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <div className="border-gray-400 borderb-[1px] border-solid w-52 mb-2">
                    <button onClick={handleMoveToMypage}>마이페이지</button>
                  </div>
                  <div>
                    <Suspense fallback={<div>Logout</div>}>
                      <LoginState />
                    </Suspense>
                  </div>
                </ul>
              </div>
            ) : (
              <Suspense fallback={<div>Logout</div>}>
                <div className="w-full flex justify-end">
                  <LoginState />
                </div>
              </Suspense>
            )}
          </div>
        </div>
      </div>
      <div className="mt-20">{children}</div>
    </>
  );
};

export default Header;
