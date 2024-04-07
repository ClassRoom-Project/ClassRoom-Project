'use client';

import { fetchClassInfoOnComment } from '@/app/api/mypage/my-comments-api';
import { useLoginStore } from '@/store/login/LoginUserIdStore';
import { useQuery } from '@tanstack/react-query';
import MyCommentItem from './MyCommentItem';

const MyComments = () => {
  const { loginUserId } = useLoginStore();
  // 후기 리스트 불러오기
  const { data: myComments, isPending } = useQuery({
    queryKey: ['comments'],
    queryFn: () => fetchClassInfoOnComment(loginUserId),
    enabled: !!loginUserId
  });

  if (isPending) {
    return <div> 로딩중 ... </div>;
  }

  if (!myComments || myComments.length === 0) {
    return <div> 내가 작성한 후기가 없습니다.</div>;
  }

  return (
    <ul className="flex flex-col flex-wrap">
      {myComments.map((comment) => (
        <MyCommentItem key={comment.comment_id} comment={comment} />
      ))}
    </ul>
  );
};

export default MyComments;
