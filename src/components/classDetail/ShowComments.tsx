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
    <div className="relative  flex  w-full flex-col items-center justify-center">
      {data.length > 0 ? (
        <div className="flex w-full flex-col">
          {data?.map((comment: DetailCommentType) => (
            <div key={comment.comment_id}>
              <CommentsCard comment={comment} />
              <div className="divider m-0"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="my-10 flex flex-col items-center justify-center gap-1 text-xs lg:my-20 lg:text-base">
          <p>아직 등록된 후기가 없어요. </p>
          <p>첫 번째 후기의 주인공이 되어보세요!</p>
        </div>
      )}
    </div>
  );
};

export default ShowComments;
