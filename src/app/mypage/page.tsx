import { getUserRole } from '@/app/api/user-api';
import StudentMyPageTab from '@/components/mypage/student/StudentMyPageTab';
import TeacherMyPageTab from '@/components/mypage/teacher/TeacherMyPageTab';

// 일단 임시로 생성 userId : 로그인한 사람의 user_id => zustand로 전역관리
// 실제 로그인한 사람의 user_id가 들어가야함!
// export const userId = '423e4567-e89b-12d3-a456-426614174004'; // admin : true인 사람 (선생님)
export const userId = '223e4567-e89b-12d3-a456-426614174002'; // admin : false인 사람 (수강생)

const MyPage = async () => {
  // 일단 teacher :  teacher = true / student = false 이라고 가정
  const userRole = await getUserRole({ userId });
  const isTeacher = userRole?.teacher;

  return (
    <div>
      {/* teacher의 boolean 값에 따라 마이페이지 구분*/}
      {!isTeacher ? <TeacherMyPageTab /> : <StudentMyPageTab />}
    </div>
  );
};

export default MyPage;
