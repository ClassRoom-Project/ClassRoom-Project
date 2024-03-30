import { getUser } from '@/api/user-api';
import { UserType } from '@/types/user';
import { useQuery } from '@tanstack/react-query';

// 일단 임시로 생성 userId : 로그인한 사람의 user_id => zustand로 전역관리
// 실제 로그인한 사람의 user_id가 들어가야함!
export const userId = '423e4567-e89b-12d3-a456-426614174004'; // admin : true인 사람 (선생님)
// export const userId = '523e4567-e89b-12d3-a456-426614174005'; // admin : false인 사람 (수강생)

export const useGetUserInfo = () => {
  const { data, isPending }: { data: UserType | undefined; isPending: boolean } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUser()
  });

  if (isPending) {
    return <div> 로딩중 ... </div>;
  }
  if (!data) {
    return <div> 유저 정보가 없습니다.</div>;
  }
  // console.log('data', data);
  return data;
};
