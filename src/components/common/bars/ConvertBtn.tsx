'use client';

import { updateUserRole } from '@/app/api/mypage/user-api';
import { useTeacherInfo } from '@/hooks/useLogin/useTeacherInfo';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useUserRoleStore } from '@/store/mypage/userRoleStore';
import { useRouter } from 'next/navigation';
import { TbArrowsExchange } from 'react-icons/tb';

const ConvertBtn = () => {
  const { loginUserId } = useLoginStore();
  const { isTeacher, setIsTeacher } = useUserRoleStore();
  const { teacherInfo, isPending } = useTeacherInfo();

  const job = teacherInfo?.job;
  const field = teacherInfo?.field;
  const bank = teacherInfo?.bank;
  const account = teacherInfo?.account;
  const name = teacherInfo?.teacher_name;
  const number = teacherInfo?.teacher_number;

  const router = useRouter();

  // 전환 버튼
  const handleOnClickChangedRoleBtn = async () => {
    if (job === null && field === null && bank === null && account === null && name === null && number === null) {
      const confirm = window.confirm(
        '입력된 선생님 정보가 없습니다. 마이페이지에서 선생님 정보를 입력해주세요. 마이페이지로 이동 하시겠습니까?'
      );
      if (confirm) {
        router.push(`/studentMypage?studentTab=addTeacherInfo`);
      }
      return;
    } else {
      const confirmMessage = isTeacher ? '수강생으로 전환 하시겠습니까?' : '선생님으로 전환 하시겠습니까?';
      const confirm = window.confirm(confirmMessage);

      if (confirm) {
        updateUserRole(isTeacher, loginUserId);
        // zustand 스토어 상태 업데이트
        setIsTeacher(!isTeacher);

        // 페이지 새로고침
        router.refresh();
      }
    }
  };

  // 로그인 전, 값을 받아오기 전에도 버튼은 그대로 보이게 하되, 로그인 페이지로 이동 유도
  if (isPending) {
    const handler = () => {
      const confirm = window.confirm('로그인 후 이용이 가능합니다. 로그인 페이지로 이동 하시겠습니까?');
      if (confirm) {
        router.push('/hello');
      }
    };

    return (
      <div className="p-4">
        <button onClick={handler}>
          <div className="flex flex-col items-center hover:text-main-color transition ease-in ">
            <TbArrowsExchange size={30} />
            <p className="text-xs ">선생님 전환</p>
          </div>
        </button>
      </div>
    );
  }

  if (!teacherInfo) {
    return <div> 선생님 정보가 없습니다.</div>;
  }
  return (
    <div className="p-4">
      <button onClick={handleOnClickChangedRoleBtn}>
        <div className="flex flex-col items-center justify-center hover:text-main-color transition ease-in w-full">
          <TbArrowsExchange className="text-white md:text-black text-4xl sm:text-4xl md:text-4xl" />
          <p className={`text-xs text-white md:text-xs md:text-black  flex flex-col items-center justify-center`}>
            {isTeacher ? '수강생' : '선생님'}{' '}
            <span className="hidden sm:flex md:sm:flex md:sm:justify-center">전환</span>
          </p>
        </div>
      </button>
    </div>
  );
};

export default ConvertBtn;
