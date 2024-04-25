import TeacherMyPageTab from '@/components/mypage/teacher/TeacherMyPageTab';
import React, { Suspense } from 'react';

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
