import { getTeacherInfo } from '@/app/api/mypage/user-api';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useQuery } from '@tanstack/react-query';

export const useTeacherInfo = () => {
  const { loginUserId } = useLoginStore();

  const { data: teacherInfo, isPending } = useQuery({
    queryKey: ['updateTeacherInfo', loginUserId],
    queryFn: () => getTeacherInfo(loginUserId),
    enabled: !!loginUserId
  });

  return { teacherInfo, isPending };
};
