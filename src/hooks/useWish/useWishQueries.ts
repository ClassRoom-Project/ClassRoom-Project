import { checkIsWished, countWish } from '@/app/api/wish/wishApi';
import { QueryKeys } from '@/constants/QueryKeys';
import { useQuery } from '@tanstack/react-query';
import { addWish, cancelWish } from '@/app/api/wish/wishApi';

import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCheckIsWishedQuery = ({ userId, classId }: { userId: string | null; classId: string | undefined }) => {
  return useQuery({
    queryKey: [QueryKeys.WISH_CHECK],
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

export const useAddWishMutation = () => {
  const queryClient = useQueryClient();
  const addWishMutation = useMutation({
    mutationFn: addWish,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.WISH_CHECK] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.WISH_COUNT] });
    }
  });

  return addWishMutation;
};

export const useCancelWishMutation = () => {
  const queryClient = useQueryClient();
  const cancelWishMutation = useMutation({
    mutationFn: cancelWish,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.WISH_CHECK] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.WISH_COUNT] });
    }
  });

  return cancelWishMutation;
};
