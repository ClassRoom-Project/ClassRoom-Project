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
      <div className="fixed top-0 left-0 right-0  z-40 bg-white flex w-full justify-between items-center h-20  ml-0 md:ml-[50px] md:px-20">
        <div className="flex items-center h-full ml-0 w-full justify-start">
          <div className="rounded-full ml-2  w-10 h-10 relative md:w-16 md:h-16 md:ml-12">
            <Link href="/">
              <Image className="rounded-full" src={Logo} alt="클룸 로고" fill />
            </Link>
          </div>
          <div className="w-4/5  xs:w-1/3">
            <Suspense>
              <SearchClass />
            </Suspense>
          </div>
        </div>
        <div className="w-1/5 relative flex items-end justify-end  lg:w-4/5">
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
                <div
                  tabIndex={0}
                  role="button"
                  className="w-10 h-10 mr-4 relative rounded-full md:w-16 md:h-16 md:mr-12"
                >
                  <Image
                    src={profileImage}
                    alt="Profile image"
                    className="w-full h-full rounded-full object-cover"
                    fill
                  />
                </div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 gap-1 shadow bg-base-100 rounded-box w-52">
                  <div className="border-black relative borderb-[1px] border-solid w-52 hover:text-button-hover-color">
                    <button onClick={handleMoveToMypage} className="w-full flex justify-start items-center">
                      <p> 마이페이지</p>
                    </button>
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
