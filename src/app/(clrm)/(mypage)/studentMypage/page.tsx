import StudentMyPageTab from '@/components/mypage/student/StudentMyPageTab';
import { Metadata } from 'next';
import React, { Suspense } from 'react';

export const metadata: Metadata = {
  title: '클룸 마이페이지(수강생)',
  description: '클룸 수강생 마이페이지입니다.'
};

const StudentMypage = () => {
  return (
    <div className="responsiveHeight h-screen">
      <div className="flex items-center justify-center">
        <Suspense>
          <StudentMyPageTab />
        </Suspense>
      </div>
    </div>
  );
};

export default StudentMypage;
