'use client';

import { updateUserRole } from '@/app/api/mypage/user-api';
import { supabase } from '@/app/api/supabase/supabase';
import { useLoginStore } from '@/store/login/LoginUserIdStore';
import { useUserRoleStore } from '@/store/userRoleStore';
import { useRouter } from 'next/navigation';
import { TbArrowsExchange } from 'react-icons/tb';

const ConvertBtn = () => {
  const { loginUserId } = useLoginStore();
  // const isTeacherBoolean = useUserRole();

  const { isTeacher, setIsTeacher } = useUserRoleStore();
  const router = useRouter();

  // 전환 버튼
  const handleOnClickChangedRoleBtn = async () => {
    const confirmMessage = isTeacher ? '수강생으로 전환 하시겠습니까?' : '선생님으로 전환 하시겠습니까?';
    const confirm = window.confirm(confirmMessage);

    if (confirm) {
      updateUserRole(!!isTeacher, loginUserId);
      // zustand 스토어 상태 업데이트
      setIsTeacher(!isTeacher);

      // 페이지 새로고침
      router.refresh();
    }
  };

  return (
    <div className="p-4 text-white">
      <button onClick={handleOnClickChangedRoleBtn}>
        <div className="flex flex-col items-center">
          <TbArrowsExchange size={30} />
          <p className="text-xs">{isTeacher ? '수강생으로 전환하기' : '선생님으로 전환하기'}</p>
        </div>
      </button>
    </div>
  );
};

export default ConvertBtn;
