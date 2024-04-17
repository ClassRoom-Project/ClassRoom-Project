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
  console.log(data);
  return (
    <div className="min-w-[1024px] flex flex-col justify-center items-center">
      {data.length > 0 ? (
        <div>
          {data?.map((comment: DetailCommentType) => (
            <CommentsCard key={comment.comment_id} comment={comment} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-40 min-w-[1000px] rounded-lg bg-disable-color shadow-xl w-full font-bold">
          <p>아직 등록된 후기가 없어요</p>
        </div>
      )}
    </div>
  );
};

export default ShowComments;
