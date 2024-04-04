'use client';

import React, { useState } from 'react';
import EditProfile from '../EditProfile';
import MyComments from './MyComments';
import MyReservedClass from './MyReservedClass';
import { useRouter } from 'next/navigation';
import AddTeacherInfo from './AddTeacherInfo';

type StudentTabComponent = {
  [key: string]: React.ReactNode;
};

const StudentMyPageTab = () => {
  const router = useRouter();

  const [activePage, setActivePage] = useState('editProfile');
  const activeStudentMyPageTab: StudentTabComponent = {
    editProfile: <EditProfile />,
    reservedClass: <MyReservedClass />,
    myComments: <MyComments />,
    addTeacherInfo: <AddTeacherInfo />
  };

  const handleOnClickTabBtn = (tab: string) => {
    setActivePage(tab);
    router.push(`/mypage?studentMypage=${tab}`);
  };

  return (
    <div className="m-4 p-4">
      <div className="gap-4 flex">
        <p
          onClick={() => handleOnClickTabBtn('editProfile')}
          className={`p-4 m-4 ${activePage === 'editProfile' ? 'font-bold cursor-pointer text-point-color ' : ''}`}
        >
          프로필 수정하기
        </p>
        <p
          onClick={() => handleOnClickTabBtn('reservedClass')}
          className={`p-4 m-4  ${activePage === 'reservedClass' ? 'font-bold cursor-pointer text-point-color' : ''}`}
        >
          내가 예약한 클래스 보기
        </p>
        <p
          onClick={() => handleOnClickTabBtn('myComments')}
          className={`p-4 m-4 ${activePage === 'myComments' ? 'font-bold cursor-pointer  text-point-color' : ''}`}
        >
          내가 쓴 댓글 보기
        </p>
        <p
          onClick={() => handleOnClickTabBtn('addTeacherInfo')}
          className={`p-4 m-4 ${activePage === 'addTeacherInfo' ? 'font-bold cursor-pointer text-point-color ' : ''}`}
        >
          선생님 정보 등록하기
        </p>
      </div>
      <div className="m-4 p-4">{activeStudentMyPageTab[activePage]}</div>
    </div>
  );
};

export default StudentMyPageTab;
