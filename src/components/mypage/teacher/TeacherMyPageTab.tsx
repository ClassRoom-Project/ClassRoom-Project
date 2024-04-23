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
      editProfile: <EditProfile />,
      editTeacherInfo: <EditTeacherInfo />,
      myClass: (
        <Suspense>
          <MyClass />
        </Suspense>
      )
    }),
    []
  );

  useEffect(() => {
    if (!isTeacher) {
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

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDropdownItemClick = (tab: string) => {
    handleOnClickTabBtn(tab);
    setIsOpen(false); // 항목을 클릭하면 드롭다운 닫기
  };

  return (
    <div className="w-full h-screen md:my-4 md:py-4 m-0 p-0">
      {/* md 이상 일 때, 가로 탭 */}
      <div className="hidden md:flex flex-row md:justify-start lg:gap-20 md:gap-10 md:items-center sm:items-start w-full border-y-2">
        <button
          onClick={() => handleOnClickTabBtn('editProfile')}
          className={`p-4 lg:text-lg whitespace-nowrap md:text-sm  ${
            activePage === 'editProfile'
              ? 'font-bold cursor-pointer text-dark-purple-color border-b-2 border-dark-purple-color '
              : ''
          }`}
        >
          프로필 수정하기
        </button>
        <button
          onClick={() => handleOnClickTabBtn('editTeacherInfo')}
          className={`p-4 lg:text-lg whitespace-nowrap md:text-sm  ${
            activePage === 'editTeacherInfo'
              ? 'font-bold cursor-pointer text-dark-purple-color border-b-2 border-dark-purple-color '
              : ''
          }`}
        >
          선생님 정보 수정하기
        </button>
        <button
          onClick={() => handleOnClickTabBtn('myClass')}
          className={`p-4 lg:text-lg whitespace-nowrap md:text-sm ${
            activePage === 'myClass'
              ? 'font-bold cursor-pointer text-dark-purple-color border-b-2 border-dark-purple-color '
              : ''
          }`}
        >
          내가 등록한 클래스
        </button>
      </div>

      {/* md 미만 일 때, 드롭다운 */}
      <div className="my-4 py-4 flex w-full justify-start md:hidden">
        <div className="dropdown-right dropdown">
          <div
            tabIndex={0}
            role="button"
            className="m-1"
            onClick={toggleDropdown}
            onKeyDown={(e) => e.key === 'Enter' && toggleDropdown()}
          >
            <IoMenu size={30} />
          </div>
          <div
            tabIndex={0}
            className={`dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 flex flex-col ${
              isOpen ? 'block' : 'hidden'
            }`}
          >
            <button
              onClick={() => handleDropdownItemClick('editProfile')}
              className={`text-lg cursor-pointer ${activePage === 'editProfile' ? 'font-bold' : ''}`}
            >
              프로필 수정하기
            </button>
            <button
              onClick={() => handleDropdownItemClick('editTeacherInfo')}
              className={`text-lg cursor-pointer ${activePage === 'editTeacherInfo' ? 'font-bold' : ''}`}
            >
              선생님 정보 수정하기
            </button>
            <button
              onClick={() => handleDropdownItemClick('myClass')}
              className={`text-lg cursor-pointer ${activePage === 'myClass' ? 'font-bold' : ''}`}
            >
              내가 등록한 클래스
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full p-4 md:py-8 md:p-0">
        {activeTeacherMyPageTab[activePage]}
      </div>
    </div>
  );
};

export default TeacherMyPageTab;
