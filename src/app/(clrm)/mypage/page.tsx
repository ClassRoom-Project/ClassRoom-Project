'use client';

import StudentMyPageTab from '@/components/mypage/student/StudentMyPageTab';
import TeacherMyPageTab from '@/components/mypage/teacher/TeacherMyPageTab';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useUserRoleStore } from '@/store/userRoleStore';

const MyPage = () => {
  const { isTeacher } = useUserRoleStore();
  const { loginUserId } = useLoginStore();
  // console.log('loginUserId', loginUserId);

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
