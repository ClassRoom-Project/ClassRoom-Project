'use client';

import MyClassStudentList from '@/components/mypage/teacher/MyClassStudentList';
import { Suspense } from 'react';

const MyClassStudentListPage = () => {
  return (
    <div>
      <Suspense>
        <MyClassStudentList />
      </Suspense>
    </div>
  );
};

export default MyClassStudentListPage;
