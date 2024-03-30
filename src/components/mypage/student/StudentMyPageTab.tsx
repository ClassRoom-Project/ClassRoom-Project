'use client';

import React, { useState } from 'react';
import EditProfile from '../EditProfile';
import ReservedClass from './MyReservedClass';
import MyComments from './MyComments';
import MyReservedClass from './MyReservedClass';

const StudentMyPageTab = () => {
  const [activePage, setActivePage] = useState('editProfile');
  const activeTab = { editProfile: <EditProfile />, reservedClass: <MyReservedClass />, myComments: <MyComments /> };

  return (
    <div className="m-4 p-4">
      <div className="gap-4">
        <span
          onClick={() => setActivePage('editProfile')}
          className={`p-4 m-4 ${activePage === 'editProfile' ? 'font-bold cursor-pointer' : ''}`}
        >
          프로필 수정하기
        </span>
        <span
          onClick={() => setActivePage('reservedClass')}
          className={`p-4 m-4 ${activePage === 'reservedClass' ? 'font-bold cursor-pointer' : ''}`}
        >
          내가 예약한 클래스 보기
        </span>
        <span
          onClick={() => setActivePage('myComments')}
          className={`p-4 m-4 ${activePage === 'myComments' ? 'font-bold cursor-pointer' : ''}`}
        >
          내가 쓴 댓글 보기
        </span>
      </div>
      <div className="m-4 p-4">{activeTab[activePage]}</div>
    </div>
  );
};

export default StudentMyPageTab;
