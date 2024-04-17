'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import EditProfile from '@/components/mypage/EditProfile';
import MyReservedClass from '@/components/mypage/student/MyReservedClass';
import MyComments from '@/components/mypage/student/MyComments';
import MyWishClass from '@/components/mypage/student/MyWishClass';
import AddTeacherInfo from '@/components/mypage/student/AddTeacherInfo';
import { useUserRoleStore } from '@/store/mypage/userRoleStore';

type StudentTabComponent = {
  [key: string]: React.ReactNode;
};

const StudentMyPageTab = () => {
  const { isTeacher } = useUserRoleStore();
  const router = useRouter();
  const params = useSearchParams();
  const studentTab = params.get('studentTab');

  const [activePage, setActivePage] = useState('editProfile');

  const activeStudentMyPageTab: StudentTabComponent = useMemo(
    () => ({
      editProfile: <EditProfile key="editProfile" />,
      reservedClass: <MyReservedClass key="reservedClass" />,
      myComments: <MyComments key="myComments" />,
      myWishClass: <MyWishClass key="myWishClass" />,
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

  return (
    <div className="m-4 p-4 gap-4 flex flex-col items-center w-[1280px]">
      <div className="flex flex-row justify-center border-y-2 w-full">
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
      <div className="m-4 p-4">{activeStudentMyPageTab[activePage]}</div>
    </div>
  );
};

export default StudentMyPageTab;
