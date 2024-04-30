import MyClassStudentPage from '@/components/mypage/teacher/MyClassStudentPage';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '클룸 예약한 수강생 페이지',
  description: '강사가 등록한 클래스를 예약한 수강생을 확인할 수 있습니다.'
};

const MyClassStudentListPage = () => {
  return (
    <div className="responsiveHeight h-screen">
      <div className="flex items-center justify-center align-middle ">
        <Suspense>
          <MyClassStudentPage />
        </Suspense>
      </div>
    </div>
  );
};

export default MyClassStudentListPage;
