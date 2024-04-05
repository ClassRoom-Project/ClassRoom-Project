import { getUserIdByEmail } from '@/app/api/userEmail/loginUserId';
import { getLoginUserType } from '@/types/authUser/authUserTypes';
import { useQuery } from '@tanstack/react-query';

export function useReadLoginUserId(email: string | null) {
  return useQuery<getLoginUserType, Error>({
    queryKey: ['LoginUserId', { email }],
    queryFn: () => getUserIdByEmail(email!),
    //이메일 존재할때만 쿼리 실행
    enabled: !!email
  });
}
