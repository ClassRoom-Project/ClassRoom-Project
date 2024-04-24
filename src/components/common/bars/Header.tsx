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
      <div className="fixed left-0 right-0 top-0  z-40 ml-0 flex h-20 w-full items-center justify-between  bg-white md:ml-[50px] md:px-20">
        <div className="ml-0 flex h-full w-full items-center justify-start">
          <div className="relative ml-2  h-10 w-10 rounded-full md:ml-12 md:h-16 md:w-16">
            <Link href="/">
              <Image className="rounded-full" src={Logo} alt="클룸 로고" fill />
            </Link>
          </div>
          <div className="xs:w-1/3 w-4/5  md:w-3/5">
            <Suspense>
              <SearchClass />
            </Suspense>
          </div>
        </div>
        <div className="relative flex w-1/5 items-end justify-end  lg:w-4/5">
          <div className="flex w-full items-center justify-end">
            {userEmail ? (
              <div className="items-en flex justify-end">
                <p className="hidden w-full whitespace-nowrap p-4 lg:block">
                  {userInfo?.nickname} <span className="font-bold text-main-color">{roleName}님</span>
                </p>
              </div>
            ) : null}
            {userEmail ? (
              <div className="mr-[10px] hidden xl:block">
                <Notification />
              </div>
            ) : null}

            {userEmail ? (
              <div className="dropdown dropdown-end dropdown-bottom">
                <div
                  tabIndex={0}
                  role="button"
                  className="relative mr-2 h-10 w-10 rounded-full md:mr-12 md:h-16 md:w-16"
                >
                  <Image
                    src={profileImage}
                    alt="Profile image"
                    className="h-full w-full rounded-full object-cover"
                    fill
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content relative z-[1] flex w-52 flex-col items-center justify-center bg-white shadow-lg"
                >
                  <div className="relative h-10 w-full hover:text-button-hover-color">
                    <button onClick={handleMoveToMypage} className="flex w-full items-center justify-start">
                      <p>마이페이지</p>
                    </button>
                  </div>
                  <div className="w-full">
                    <Suspense fallback={<div>Logout</div>}>
                      <LoginState />
                    </Suspense>
                  </div>
                </ul>
              </div>
            ) : (
              <Suspense fallback={<div>Logout</div>}>
                <LoginState />
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
