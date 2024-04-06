'use client';

import { getUserRole } from '@/app/api/mypage/user-api';
import StudentMyPageTab from '@/components/mypage/student/StudentMyPageTab';
import TeacherMyPageTab from '@/components/mypage/teacher/TeacherMyPageTab';
import { useLoginStore } from '@/store/login/LoginUserIdStore';
import { useQuery } from '@tanstack/react-query';

const MyPage = () => {
  const { loginUserId } = useLoginStore();
  // console.log('loginUserId', loginUserId);

  const { data, isPending } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserRole(loginUserId),
    enabled: !!loginUserId
  });

  // console.log('data', data);

  const isTeacher = data?.isTeacher;

  if (isPending) {
    return <div> 로딩중 ... </div>;
  }

  if (!data) {
    return <div> 유저 정보가 없습니다.</div>;
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
