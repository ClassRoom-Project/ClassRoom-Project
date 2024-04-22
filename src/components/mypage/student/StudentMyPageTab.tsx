'use client';

import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import EditProfile from '@/components/mypage/EditProfile';
import MyReservedClass from '@/components/mypage/student/MyReservedClass';
import MyComments from '@/components/mypage/student/MyComments';
import MyWishClass from '@/components/mypage/student/MyWishClass';
import AddTeacherInfo from '@/components/mypage/student/AddTeacherInfo';
import { useUserRoleStore } from '@/store/mypage/userRoleStore';
import { IoMenu } from 'react-icons/io5';

type StudentTabComponent = {
  [key: string]: React.ReactNode;
};

const StudentMyPageTab = () => {
  const { isTeacher } = useUserRoleStore();
  const router = useRouter();
  const params = useSearchParams();
  const studentTab = params.get('studentTab');

  const [activePage, setActivePage] = useState('editProfile');
  const [isOpen, setIsOpen] = useState(false);

  const activeStudentMyPageTab: StudentTabComponent = useMemo(
    () => ({
      editProfile: <EditProfile key="editProfile" />,
      reservedClass: (
        <Suspense>
          <MyReservedClass key="reservedClass" />
        </Suspense>
      ),
      myComments: (
        <Suspense>
          <MyComments key="myComments" />
        </Suspense>
      ),
      myWishClass: (
        <Suspense>
          <MyWishClass key="myWishClass" />
        </Suspense>
      ),
      addTeacherInfo: <AddTeacherInfo key="addTeacherInfo" />
    }),
    []
  );

  useEffect(() => {
    if (isTeacher) {
      router.push('/teacherMypage');
      return;
    }
    if (studentTab && Object.keys(activeStudentMyPageTab).includes(studentTab)) {
      setActivePage(studentTab);
    }
  }, [isTeacher, router, activeStudentMyPageTab, studentTab]);

  const handleOnClickTabBtn = (tab: string) => {
    if (!tab) {
      console.log('error');
      return;
    }
    setActivePage(tab);
    router.push(`/studentMypage?studentTab=${tab}`);
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDropdownItemClick = (tab: string) => {
    handleOnClickTabBtn(tab);
    setIsOpen(false); // 항목을 클릭하면 드롭다운 닫기
  };

  return (
    <div className="w-full h-screen">
      {/* md 이상 일 때, 가로 탭 */}
      <div className="hidden md:flex flex-row md:justify-start gap-20 md:items-center sm:items-start border-y-2 w-full">
        <p
          onClick={() => handleOnClickTabBtn('editProfile')}
          className={`p-4 text-lg ${
            activePage === 'editProfile'
              ? 'font-bold cursor-pointer  text-dark-purple-color border-b-2 border-dark-purple-color  '
              : ''
          }`}
        >
          프로필 수정하기
        </p>
        <p
          onClick={() => handleOnClickTabBtn('reservedClass')}
          className={`p-4 text-lg  ${
            activePage === 'reservedClass'
              ? 'font-bold cursor-pointer text-dark-purple-color border-b-2 border-dark-purple-color '
              : ''
          }`}
        >
          내가 예약한 클래스 보기
        </p>
        <p
          onClick={() => handleOnClickTabBtn('myComments')}
          className={`p-4 text-lg ${
            activePage === 'myComments'
              ? 'font-bold cursor-pointer  text-dark-purple-color border-b-2 border-dark-purple-color '
              : ''
          }`}
        >
          내가 쓴 후기 보기
        </p>
        <p
          onClick={() => handleOnClickTabBtn('myWishClass')}
          className={`p-4 text-lg ${
            activePage === 'myWishClass'
              ? 'font-bold cursor-pointer  text-dark-purple-color border-b-2 border-dark-purple-color '
              : ''
          }`}
        >
          클래스 위시리스트
        </p>
        <p
          onClick={() => handleOnClickTabBtn('addTeacherInfo')}
          className={`p-4 text-lg ${
            activePage === 'addTeacherInfo'
              ? 'font-bold cursor-pointer  text-dark-purple-color border-b-2 border-dark-purple-color '
              : ''
          }`}
        >
          선생님 정보 등록하기
        </p>
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
            <p
              onClick={() => handleDropdownItemClick('editProfile')}
              className={`text-lg cursor-pointer ${activePage === 'editProfile' ? 'font-bold' : ''}`}
            >
              프로필 수정하기
            </p>
            <p
              onClick={() => handleDropdownItemClick('reservedClass')}
              className={`text-lg cursor-pointer ${activePage === 'reservedClass' ? 'font-bold' : ''}`}
            >
              내가 예약한 클래스 보기
            </p>
            <p
              onClick={() => handleDropdownItemClick('myComments')}
              className={`text-lg cursor-pointer ${activePage === 'myComments' ? 'font-bold' : ''}`}
            >
              내가 쓴 후기 보기
            </p>
            <p
              onClick={() => handleDropdownItemClick('myWishClass')}
              className={`text-lg cursor-pointer ${activePage === 'myWishClass' ? 'font-bold' : ''}`}
            >
              클래스 위시리스트
            </p>
            <p
              onClick={() => handleDropdownItemClick('addTeacherInfo')}
              className={`text-lg cursor-pointer ${activePage === 'addTeacherInfo' ? 'font-bold' : ''}`}
            >
              선생님 정보 등록하기
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full p-4 md:py-4 md:p-0">
        {activeStudentMyPageTab[activePage]}
      </div>
    </div>
  );
};

export default StudentMyPageTab;
