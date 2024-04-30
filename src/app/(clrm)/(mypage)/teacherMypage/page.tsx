import TeacherMyPageTab from '@/components/mypage/teacher/TeacherMyPageTab';
import { Metadata } from 'next';
import React, { Suspense } from 'react';

export const metadata: Metadata = {
  title: '클룸 마이페이지(선생님)',
  description: '클룸 선생님 마이페이지입니다.'
};

const teacherMypage = () => {
  return (
    <div className=" responsiveHeight h-screen">
      <div className="flex items-center justify-center">
        <Suspense>
          <TeacherMyPageTab />
        </Suspense>
      </div>
    </div>
  );
};

export default teacherMypage;
