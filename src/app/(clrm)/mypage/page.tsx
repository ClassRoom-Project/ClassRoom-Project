'use client';

import { getUserRole } from '@/app/api/mypage/user-api';
import StudentMyPageTab from '@/components/mypage/student/StudentMyPageTab';
import TeacherMyPageTab from '@/components/mypage/teacher/TeacherMyPageTab';
import { useLoginStore } from '@/store/login/LoginUserIdStore';
import { useUserRoleStore } from '@/store/userRoleStore';
import { useQuery } from '@tanstack/react-query';

const MyPage = () => {
  const { isTeacher } = useUserRoleStore();

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
