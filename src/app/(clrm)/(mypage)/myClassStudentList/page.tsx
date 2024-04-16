import MyClassStudentPage from '@/components/mypage/teacher/MyClassStudentPage';
import { Suspense } from 'react';

const MyClassStudentListPage = () => {
  return (
    <div className="flex justify-center items-center align-middle">
      <Suspense>
        <MyClassStudentPage />
      </Suspense>
    </div>
  );
};

export default MyClassStudentListPage;
