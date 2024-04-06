'use client';

import { supabase } from '@/app/api/supabase/supabase';
import useUserRole from '@/hooks/useUserRole';
import { useLoginStore } from '@/store/login/LoginUserIdStore';
import { useRouter } from 'next/navigation';
import { TbArrowsExchange } from 'react-icons/tb';

interface Type {
  isTeacher: boolean | Element;
}
const ConvertBtn = () => {
  const { loginUserId } = useLoginStore();
  const isTeacherBoolean = useUserRole();

  const router = useRouter();

  // 전환 버튼
  const handleOnClickChangedRoleBtn = async () => {
    if (isTeacherBoolean) {
      const confirm = window.confirm('수강생으로 전환 하시겠습니까?');
      if (confirm) {
        const { data, error } = await supabase
          .from('users')
          .update([{ isTeacher: false }])
          .eq('user_id', loginUserId);
        if (error) {
          console.error(error);
        }
        return data;
      }
      return router.refresh();
    } else {
      const confirm = window.confirm('선생님으로 전환 하시겠습니까?');
      if (confirm) {
        const { data, error } = await supabase
          .from('users')
          .update([{ isTeacher: true }])
          .eq('user_id', loginUserId);
        if (error) {
          console.error(error);
        }
        return data;
      }
      return router.refresh();
    }
  };

  return (
    <div className="p-4">
      {isTeacherBoolean ? (
        <button onClick={handleOnClickChangedRoleBtn}>
          <div className="flex flex-col items-center">
            <TbArrowsExchange size={30} />
            <p className="text-xs">수강생으로 전환하기</p>
          </div>
        </button>
      ) : (
        <button onClick={handleOnClickChangedRoleBtn}>
          <div className="flex flex-col items-center">
            <TbArrowsExchange size={30} />
            <p className="text-xs">선생님으로 전환하기</p>
          </div>
        </button>
      )}
    </div>
  );
};

export default ConvertBtn;
