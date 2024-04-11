import { deleteMyComment } from '@/app/api/mypage/my-comments-api';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// 후기 삭제 mutaion
export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  const { loginUserId } = useLoginStore();

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: string) => deleteMyComment(commentId, loginUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments']
      });
    }
  });
  return deleteCommentMutation;
};

// 후기 수정 mutation

//   const { mutate: updateCommentMutation } = useMutation({
//     mutationFn: ({ newContent, commentId }: NewCommentType) => updateMyComment({ newContent, commentId }, loginUserId),
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ['comments']
//       });
//     }
//   });
