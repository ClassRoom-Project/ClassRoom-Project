import TeacherMyPageTab from '@/components/mypage/teacher/TeacherMyPageTab';
import React, { Suspense } from 'react';

const teacherMypage = () => {
  return (
    <div className=" responsiveHeight overflow-y-auto h-screen scrollbar-hide">
      <div className="flex justify-center items-center">
        <Suspense>
          <TeacherMyPageTab />
        </Suspense>
      </div>
    </div>
  );
};

export default teacherMypage;
