'use client';

import StudentMyPage from '@/components/mypage/student/StudentMyPageTab';
import TeacherMyPage from '@/components/mypage/teacher/TeacherMyPageTab';
import { useGetUserInfo } from '@/hooks/mypage/useGetUserInfo';

const MyPage = () => {
  // 일단 admin :  teacher = true / student = false 이라고 가정

  const { teacher } = useGetUserInfo();
  // console.log('userInfo', userInfo);

  // console.log('isAdmin', isAdmin);

  return (
    <div>
      {/* admin의 boolean 값에 따라 마이페이지 구분*/}
      {teacher ? <TeacherMyPage /> : <StudentMyPage />}
    </div>
  );
};

export default MyPage;
