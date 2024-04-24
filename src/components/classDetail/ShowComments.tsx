'use client';

import { DetailCommentType } from '@/types/detailComment';
import React from 'react';
import CommentsCard from './CommentsCard';
import { useQuery } from '@tanstack/react-query';
import { getDetailComment } from '@/app/api/classdetail/detailComment';

const ShowComments = ({ classId }: { classId: string | undefined }) => {
  const { data, error, status } = useQuery({
    queryKey: ['getDetailComment'],
    queryFn: () => getDetailComment(classId)
  });
  if (status === 'pending') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="w-[600px]  relative flex flex-col justify-center items-center xl:min-w-[980px] xl:w-full">
      {data.length > 0 ? (
        <div className="w-full flex flex-col">
          {data?.map((comment: DetailCommentType) => (
            <CommentsCard key={comment.comment_id} comment={comment} />
          ))}
        </div>
      ) : (
        <div className="my-20">
          <p>아직 등록된 리뷰가 없어요. 첫 번째 리뷰의 주인공이 되어보세요!</p>
        </div>
      )}
    </div>
  );
};

export default ShowComments;
