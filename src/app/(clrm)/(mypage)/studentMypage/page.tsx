import StudentMyPageTab from '@/components/mypage/student/StudentMyPageTab';
import React, { Suspense } from 'react';

const StudentMypage = () => {
  return (
    <div className=" responsiveHeight h-screen">
      <div className="flex justify-center items-center">
        <Suspense>
          <StudentMyPageTab />
        </Suspense>
      </div>
    </div>
  );
};

export default StudentMypage;
