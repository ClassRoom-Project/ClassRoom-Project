'use client';

import StudentMyPage from '@/components/mypage/student/StudentMyPage';
import TeacherMyPage from '@/components/mypage/teacher/TeacherMyPage';
import { useGetUserInfo } from '@/hooks/mypage/useGetUserInfo';

const MyPage = () => {
  // 일단 admin :  teacher = true / student = false 이라고 가정

  const { admin } = useGetUserInfo();
  // console.log('userInfo', userInfo);

  // console.log('isAdmin', isAdmin);

  return (
    <div>
      {/* admin의 boolean 값에 따라 마이페이지 구분*/}
      {admin ? <TeacherMyPage /> : <StudentMyPage />}
    </div>
  );
};

export default MyPage;
