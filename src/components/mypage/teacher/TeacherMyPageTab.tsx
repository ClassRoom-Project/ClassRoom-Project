'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import EditProfile from '../EditProfile';
import EditTeacherInfo from './EditTeacherInfo';
import MyClass from './MyClass';
import { useSearchParam } from 'react-use';

type TeacherTabComponent = {
  [key: string]: React.ReactNode;
};

const TeacherMyPageTab = () => {
  const router = useRouter();
  // const params = useSearchParams();

  const [activePage, setActivePage] = useState('editProfile');

  const activeTeacherMyPageTab: TeacherTabComponent = {
    editProfile: <EditProfile />,
    editTeacherInfo: <EditTeacherInfo />,
    myClass: <MyClass />
  };

  // useEffect(() => {
  //   const { teacherMypage } = router.query;
  //   if (teacherMypage && Object.keys(activeTeacherMyPageTab).includes(teacherMypage as string)) {
  //     setActivePage(teacherMypage as string);
  //   }
  // }, [router]);

  const handleOnClickTabBtn = (tab: string) => {
    if (!tab) {
      console.log('error');
      return;
    }
    setActivePage(tab);
    router.push(`/mypage?teacherMypage=${tab}`);
  };

  return (
    <div className="m-4 p-4 gap-4 flex flex-col items-center w-[1280px]">
      <div className="flex flex-row justify-center border-y-2 w-full">
        <p
          onClick={() => handleOnClickTabBtn('editProfile')}
          className={`p-4  ${
            activePage === 'editProfile'
              ? 'font-bold cursor-pointer text-dark-purple-color border-b-2 border-dark-purple-color '
              : ''
          }`}
        >
          프로필 수정하기
        </p>
        <p
          onClick={() => handleOnClickTabBtn('editTeacherInfo')}
          className={`p-4  ${
            activePage === 'editTeacherInfo'
              ? 'font-bold cursor-pointer text-dark-purple-color border-b-2 border-dark-purple-color '
              : ''
          }`}
        >
          선생님 정보 수정하기
        </p>
        <p
          onClick={() => handleOnClickTabBtn('myClass')}
          className={`p-4 ${
            activePage === 'myClass'
              ? 'font-bold cursor-pointer text-dark-purple-color border-b-2 border-dark-purple-color '
              : ''
          }`}
        >
          내가 등록한 클래스
        </p>
      </div>
      <div className="m-4 p-4">{activeTeacherMyPageTab[activePage]}</div>
    </div>
  );
};

export default TeacherMyPageTab;
