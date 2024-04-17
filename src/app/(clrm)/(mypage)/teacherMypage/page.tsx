import TeacherMyPageTab from '@/components/mypage/teacher/TeacherMyPageTab';
import React, { Suspense } from 'react';

const teacherMypage = () => {
  return (
    <div className="flex justify-center">
      <Suspense>
        <TeacherMyPageTab />
      </Suspense>
    </div>
  );
};

export default teacherMypage;
