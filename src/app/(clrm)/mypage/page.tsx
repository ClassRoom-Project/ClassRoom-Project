'use client';
import StudentMyPageTab from '@/components/mypage/student/StudentMyPageTab';
import TeacherMyPageTab from '@/components/mypage/teacher/TeacherMyPageTab';
import { useUserRoleStore } from '@/store/userRoleStore';
import { useEffect, useState } from 'react';

const MyPage = () => {
  const { isTeacher } = useUserRoleStore();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // 서버에서 실행 중인 경우 빈 화면을 반환하거나 다른 처리를 할 수 있습니다.
  }
  return (
    <>
      <div className="w-xl flex ">
        {/* teacher의 boolean 값에 따라 마이페이지 구분*/}
        {isTeacher ? <TeacherMyPageTab /> : <StudentMyPageTab />}
      </div>
    </>
  );
};

export default MyPage;
