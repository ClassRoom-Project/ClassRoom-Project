import StudentMyPage from '@/components/mypage/student/StudentMyPage';
import TeacherMyPage from '@/components/mypage/teacher/TeacherMyPage';

const MyPage = () => {
  // 일단 admin :  teacher = true / student = false 이라고 가정

  const admin = true;
  // const admin = false;

  return (
    <div>
      {/* admin의 boolean 값에 따라 마이페이지 구분*/}
      {admin ? <TeacherMyPage /> : <StudentMyPage />}
    </div>
  );
};

export default MyPage;
