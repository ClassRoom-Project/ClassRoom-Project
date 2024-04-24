import MyClassStudentPage from '@/components/mypage/teacher/MyClassStudentPage';
import { Suspense } from 'react';

const MyClassStudentListPage = () => {
  return (
    <div className=" responsiveHeight h-screen">
      <div className="flex items-center justify-center align-middle ">
        <Suspense>
          <MyClassStudentPage />
        </Suspense>
      </div>
    </div>
  );
};

export default MyClassStudentListPage;
