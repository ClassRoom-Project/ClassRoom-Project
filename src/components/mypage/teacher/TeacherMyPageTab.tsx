'use client';

import EditProfile from '@/components/mypage/EditProfile';
import EditTeacherInfo from '@/components/mypage/teacher/EditTeacherInfo';
import MyClass from '@/components/mypage/teacher/MyClass';
import { useUserRoleStore } from '@/store/mypage/userRoleStore';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { IoMenu } from 'react-icons/io5';

type TeacherTabComponent = {
  [key: string]: React.ReactNode;
};

const TeacherMyPageTab = () => {
  const { isTeacher } = useUserRoleStore();
  const router = useRouter();
  const params = useSearchParams();
  const teacherTab = params.get('teacherTab');

  const [activePage, setActivePage] = useState('editProfile');
  const [isOpen, setIsOpen] = useState(false);

  const activeTeacherMyPageTab: TeacherTabComponent = useMemo(
    () => ({
      editProfile: <EditProfile key="editProfile" />,
      editTeacherInfo: <EditTeacherInfo key="editTeacherInfo" />,
      myClass: (
        <Suspense>
          <MyClass key="myClass" />
        </Suspense>
      )
    }),
    []
  );

  useEffect(() => {
    if (isTeacher === false) {
      router.push('/studentMypage');
    }
    if (teacherTab && Object.keys(activeTeacherMyPageTab).includes(teacherTab)) {
      setActivePage(teacherTab);
    }
  }, [isTeacher, router, activeTeacherMyPageTab, teacherTab]);

  const handleOnClickTabBtn = (tab: string) => {
    if (!tab) {
      console.log('error');
      return;
    }
    setActivePage(tab);
    router.push(`/teacherMypage?teacherTab=${tab}`);
  };

  const checkAndCloseDropDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    let targetEl = e.currentTarget;
    if (targetEl && targetEl.matches(':focus')) {
      setTimeout(function () {
        targetEl.blur();
      }, 0);
    }
  };

  const handleDropdownItemClick = (tab: string) => {
    handleOnClickTabBtn(tab);
    setIsOpen(false); // 항목을 클릭하면 드롭다운 닫기
  };

  return (
    <div className="lg:w-1440px m-0 w-full max-w-[1440px] p-0 md:my-4 md:py-4">
      {/* md 이상 일 때, 가로 탭 */}
      <div className="hidden w-full flex-row whitespace-nowrap border-b-2 sm:items-start md:flex md:items-center md:justify-start md:gap-10 lg:gap-20">
        <div className="overflow-x-scroll scrollbar-hide">
          <button
            onClick={() => handleOnClickTabBtn('editProfile')}
            className={`relative whitespace-nowrap p-4 md:text-sm lg:text-lg ${
              activePage === 'editProfile'
                ? 'cursor-pointer border-b-2 border-dark-purple-color font-bold text-dark-purple-color'
                : ''
            }`}
          >
            프로필 수정하기
          </button>
          <button
            onClick={() => handleOnClickTabBtn('editTeacherInfo')}
            className={`whitespace-nowrap p-4 md:text-sm lg:text-lg  ${
              activePage === 'editTeacherInfo'
                ? 'cursor-pointer border-b-2 border-dark-purple-color font-bold text-dark-purple-color '
                : ''
            }`}
          >
            선생님 정보 수정하기
          </button>
          <button
            onClick={() => handleOnClickTabBtn('myClass')}
            className={`whitespace-nowrap p-4 md:text-sm lg:text-lg ${
              activePage === 'myClass'
                ? 'cursor-pointer border-b-2 border-dark-purple-color font-bold text-dark-purple-color '
                : ''
            }`}
          >
            내가 등록한 클래스
          </button>
        </div>
      </div>

      {/* md 미만 일 때, 드롭다운 */}
      <div className="flex w-full justify-start px-4 md:hidden">
        <div className="dropdown dropdown-right">
          <div tabIndex={0} role="button" className="m-1" onMouseDown={(e) => checkAndCloseDropDown(e)}>
            <IoMenu size={30} />
          </div>
          <div
            tabIndex={0}
            className={'menu dropdown-content z-[1] flex w-52 flex-col items-start rounded-box bg-base-100 p-2 shadow'}
          >
            <button
              onClick={() => handleDropdownItemClick('editProfile')}
              className={`cursor-pointer text-lg ${activePage === 'editProfile' ? 'font-bold' : ''}`}
            >
              프로필 수정하기
            </button>
            <button
              onClick={() => handleDropdownItemClick('editTeacherInfo')}
              className={`cursor-pointer text-lg ${activePage === 'editTeacherInfo' ? 'font-bold' : ''}`}
            >
              선생님 정보 수정하기
            </button>
            <button
              onClick={() => handleDropdownItemClick('myClass')}
              className={`cursor-pointer text-lg ${activePage === 'myClass' ? 'font-bold' : ''}`}
            >
              내가 등록한 클래스
            </button>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-center p-4 md:p-0 md:py-8">
        {activeTeacherMyPageTab[activePage]}
      </div>
    </div>
  );
};

export default TeacherMyPageTab;
