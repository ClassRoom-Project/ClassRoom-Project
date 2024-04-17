import StudentMyPageTab from '@/components/mypage/student/StudentMyPageTab';
import React, { Suspense } from 'react';

const StudentMypage = () => {
  return (
    <div className="flex justify-center">
      <Suspense>
        <StudentMyPageTab />
      </Suspense>
    </div>
  );
};

export default StudentMypage;
