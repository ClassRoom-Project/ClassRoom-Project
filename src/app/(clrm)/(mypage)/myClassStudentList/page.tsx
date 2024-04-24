import MyClassStudentPage from '@/components/mypage/teacher/MyClassStudentPage';
import { Suspense } from 'react';

const MyClassStudentListPage = () => {
  return (
    <div className=" responsiveHeight overflow-y-auto h-screen scrollbar-hide">
      <div className="flex justify-center items-center align-middle ">
        <Suspense>
          <MyClassStudentPage />
        </Suspense>
      </div>
    </div>
  );
};

export default MyClassStudentListPage;
