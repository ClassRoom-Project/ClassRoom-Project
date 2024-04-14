import { addWish, cancelWish } from '@/app/api/wish/wishApi';
import { QueryKeys } from '@/constants/QueryKeys';

import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddWishMutation = () => {
  const queryClient = useQueryClient();
  const addWishMutation = useMutation({
    mutationFn: addWish,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.WISH]
      });
    }
  });

  return addWishMutation;
};

export const useCancelWishMutation = () => {
  const queryClient = useQueryClient();
  const cancelWishMutation = useMutation({
    mutationFn: cancelWish,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.WISH]
      });
    }
  });

  return cancelWishMutation;
};
