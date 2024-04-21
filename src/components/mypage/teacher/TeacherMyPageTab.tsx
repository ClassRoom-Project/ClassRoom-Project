'use client';

import EditProfile from '@/components/mypage/EditProfile';
import EditTeacherInfo from '@/components/mypage/teacher/EditTeacherInfo';
import MyClass from '@/components/mypage/teacher/MyClass';
import { useUserRoleStore } from '@/store/mypage/userRoleStore';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useMemo, useState } from 'react';

type TeacherTabComponent = {
  [key: string]: React.ReactNode;
};

const TeacherMyPageTab = () => {
  const { isTeacher } = useUserRoleStore();
  const router = useRouter();
  const params = useSearchParams();
  const teacherTab = params.get('teacherTab');

  const [activePage, setActivePage] = useState('editProfile');

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

  return (
    <div className="m-4 p-4 gap-4 flex flex-col items-center">
      <div className="flex flex-row justify-center border-y-2 w-full">
        <p
          onClick={() => handleOnClickTabBtn('editProfile')}
          className={`p-4 text-lg  ${
            activePage === 'editProfile'
              ? 'font-bold cursor-pointer text-dark-purple-color border-b-2 border-dark-purple-color '
              : ''
          }`}
        >
          프로필 수정하기
        </p>
        <p
          onClick={() => handleOnClickTabBtn('editTeacherInfo')}
          className={`p-4 text-lg  ${
            activePage === 'editTeacherInfo'
              ? 'font-bold cursor-pointer text-dark-purple-color border-b-2 border-dark-purple-color '
              : ''
          }`}
        >
          선생님 정보 수정하기
        </p>
        <p
          onClick={() => handleOnClickTabBtn('myClass')}
          className={`p-4 text-lg ${
            activePage === 'myClass'
              ? 'font-bold cursor-pointer text-dark-purple-color border-b-2 border-dark-purple-color '
              : ''
          }`}
        >
          내가 등록한 클래스
        </p>
      </div>
      <div className="m-4 p-4 flex justify-center items-center md:w-[1080px]">{activeTeacherMyPageTab[activePage]}</div>
    </div>
  );
};

export default TeacherMyPageTab;
