import { checkIsWished, countWish } from '@/app/api/wish/wishApi';
import { QueryKeys } from '@/constants/QueryKeys';
import { useQuery } from '@tanstack/react-query';

export const useCheckIsWishedQuery = ({ userId, classId }: { userId: string | null; classId: string | undefined }) => {
  return useQuery({
    queryKey: [QueryKeys.WISH],
    queryFn: () => checkIsWished({ userId, classId }),
    enabled: !!userId && !!classId
  });
};

export const useCountWishQuery = (classId: string | undefined) => {
  return useQuery({
    queryKey: [QueryKeys.WISH_COUNT],
    queryFn: () => countWish(classId),
    enabled: !!classId
  });
};
