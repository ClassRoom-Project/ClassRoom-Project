import { addWish } from '@/app/api/wish/wish';
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
