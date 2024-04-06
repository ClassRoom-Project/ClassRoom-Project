import { getUserRole } from '@/app/api/mypage/user-api';
import { useLoginStore } from '@/store/login/LoginUserIdStore';
import { useQuery } from '@tanstack/react-query';

const useUserRole = () => {
  const { loginUserId } = useLoginStore();

  const { data: userRole, isPending } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserRole(loginUserId),
    enabled: !!loginUserId
  });
  // console.log('userRole', userRole);

  if (isPending) {
    return <div> 로딩중 ... </div>;
  }

  if (!userRole) {
    return <div> 유저 정보가 없습니다.</div>;
  }

  return userRole.isTeacher;
};

export default useUserRole;
