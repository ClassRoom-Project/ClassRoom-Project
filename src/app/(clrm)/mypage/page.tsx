'use client';

import { getUserRole } from '@/app/api/mypage/user-api';
import StudentMyPageTab from '@/components/mypage/student/StudentMyPageTab';
import TeacherMyPageTab from '@/components/mypage/teacher/TeacherMyPageTab';
import { useQuery } from '@tanstack/react-query';

// 일단 임시로 생성 userId : 로그인한 사람의 user_id => zustand로 전역관리
// 실제 로그인한 사람의 user_id가 들어가야함!
export const userId = '423e4567-e89b-12d3-a456-426614174004'; // admin : true인 사람 (선생님)
// export const userId = '523e4567-e89b-12d3-a456-426614174005'; // admin : false인 사람 (수강생)
// export const userId = '2d04bf01-5b83-4653-afeb-97d8a65ae158'; // (나)

const MyPage = () => {
  const { data, isPending } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserRole()
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
      <div className="w-xl">
        {/* teacher의 boolean 값에 따라 마이페이지 구분*/}
        {isTeacher ? <TeacherMyPageTab /> : <StudentMyPageTab />}
      </div>
    </>
  );
};

export default MyPage;
