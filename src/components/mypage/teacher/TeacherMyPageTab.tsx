'use client';

import React, { useEffect, useState } from 'react';
import EditTeacherInfo from './EditTeacherInfo';
import EditProfile from '../EditProfile';
import MyClass from './MyClass';
import { usePathname, useRouter } from 'next/navigation';

type TeacherTabComponent = {
  [key: string]: React.ReactNode;
};

const TeacherMyPageTab = () => {
  const router = useRouter();
  // const path = usePathname();
  // console.log('path', path);

  const [activePage, setActivePage] = useState('editProfile');

  const activeTeacherMyPageTab: TeacherTabComponent = {
    editProfile: <EditProfile />,
    editTeacherInfo: <EditTeacherInfo />,
    myClass: <MyClass />
  };

  const handleOnClickTabBtn = (tab: string) => {
    setActivePage(tab);
    router.push(`/mypage?teacherMypage=${tab}`);
  };

  return (
    <div className="m-4 p-4">
      <div className="gap-4">
        <span
          onClick={() => handleOnClickTabBtn('editProfile')}
          className={`p-4 m-4 ${activePage === 'editProfile' ? 'font-bold cursor-pointer' : ''}`}
        >
          프로필 수정하기
        </span>
        <span
          onClick={() => handleOnClickTabBtn('editTeacherInfo')}
          className={`p-4 m-4 ${activePage === 'editTeacherInfo' ? 'font-bold cursor-pointer' : ''}`}
        >
          선생님 정보 수정하기
        </span>
        <span
          onClick={() => handleOnClickTabBtn('myClass')}
          className={`p-4 m-4 ${activePage === 'myClass' ? 'font-bold cursor-pointer' : ''}`}
        >
          내가 등록한 클래스
        </span>
      </div>
      <div className="m-4 p-4">{activeTeacherMyPageTab[activePage]}</div>
    </div>
  );
};

export default TeacherMyPageTab;
