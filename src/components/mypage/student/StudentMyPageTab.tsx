'use client';

import EditProfile from '@/components/mypage/EditProfile';
import AddTeacherInfo from '@/components/mypage/student/AddTeacherInfo';
import MyComments from '@/components/mypage/student/MyComments';
import MyReservedClass from '@/components/mypage/student/MyReservedClass';
import MyWishClass from '@/components/mypage/student/MyWishClass';
import { useUserRoleStore } from '@/store/mypage/userRoleStore';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
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
    <div className="lg:w-1440px m-0 w-full max-w-[1440px] p-0  md:my-4 md:py-4">
      {/* md 이상 일 때, 가로 탭 */}
      <div className="hidden w-full flex-row justify-between whitespace-nowrap border-y-2 sm:items-start md:flex md:items-center 2xl:justify-start 2xl:gap-20">
        <div className=" overflow-x-scroll scrollbar-hide">
          <button
            onClick={() => handleOnClickTabBtn('editProfile')}
            className={`whitespace-nowrap p-4 md:text-sm lg:text-lg ${
              activePage === 'editProfile'
                ? 'cursor-pointer border-b-2  border-dark-purple-color font-bold text-dark-purple-color'
                : ''
            }`}
          >
            프로필 수정하기
          </button>

          <button
            onClick={() => handleOnClickTabBtn('reservedClass')}
            className={`whitespace-nowrap p-4 md:text-sm lg:text-lg ${
              activePage === 'reservedClass'
                ? 'cursor-pointer border-b-2 border-dark-purple-color font-bold text-dark-purple-color '
                : ''
            }`}
          >
            내가 예약한 클래스 보기
          </button>

          <button
            onClick={() => handleOnClickTabBtn('myComments')}
            className={`whitespace-nowrap p-4 md:text-sm lg:text-lg  ${
              activePage === 'myComments'
                ? 'cursor-pointer border-b-2  border-dark-purple-color font-bold text-dark-purple-color '
                : ''
            }`}
          >
            내가 쓴 후기 보기
          </button>

          <button
            onClick={() => handleOnClickTabBtn('myWishClass')}
            className={`whitespace-nowrap p-4 md:text-sm lg:text-lg  ${
              activePage === 'myWishClass'
                ? 'cursor-pointer border-b-2  border-dark-purple-color font-bold text-dark-purple-color '
                : ''
            }`}
          >
            클래스 위시리스트
          </button>

          <button
            onClick={() => handleOnClickTabBtn('addTeacherInfo')}
            className={`whitespace-nowrap p-4 md:text-sm lg:text-lg  ${
              activePage === 'addTeacherInfo'
                ? 'cursor-pointer border-b-2  border-dark-purple-color font-bold text-dark-purple-color '
                : ''
            }`}
          >
            선생님 정보 등록하기
          </button>
        </div>
      </div>
      {/* md 미만 일 때, 드롭다운 */}
      <div className="flex w-full px-4 md:hidden">
        <div className="dropdown dropdown-right">
          <div tabIndex={0} role="button" className="m-1" onMouseDown={(e) => checkAndCloseDropDown(e)}>
            <IoMenu size={30} />
          </div>

          <div
            tabIndex={0}
            className={`menu dropdown-content z-[1] flex w-52 flex-col items-start rounded-box bg-base-100 p-2 shadow `}
          >
            <button
              onClick={() => handleDropdownItemClick('editProfile')}
              className={`cursor-pointer text-lg ${activePage === 'editProfile' ? 'font-bold' : ''}`}
            >
              프로필 수정하기
            </button>
            <button
              onClick={() => handleDropdownItemClick('reservedClass')}
              className={`cursor-pointer text-lg ${activePage === 'reservedClass' ? 'font-bold' : ''}`}
            >
              내가 예약한 클래스 보기
            </button>
            <button
              onClick={() => handleDropdownItemClick('myComments')}
              className={`cursor-pointer text-lg ${activePage === 'myComments' ? 'font-bold' : ''}`}
            >
              내가 쓴 후기 보기
            </button>
            <button
              onClick={() => handleDropdownItemClick('myWishClass')}
              className={`cursor-pointer text-lg ${activePage === 'myWishClass' ? 'font-bold' : ''}`}
            >
              클래스 위시리스트
            </button>
            <button
              onClick={() => handleDropdownItemClick('addTeacherInfo')}
              className={`cursor-pointer text-lg ${activePage === 'addTeacherInfo' ? 'font-bold' : ''}`}
            >
              선생님 정보 등록하기
            </button>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-center p-4 md:p-0 md:py-8">
        {activeStudentMyPageTab[activePage]}
      </div>
    </div>
  );
};

export default StudentMyPageTab;
