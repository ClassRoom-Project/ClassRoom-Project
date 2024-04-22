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
    <div className="w-[600px] relative flex flex-col justify-center items-center xl:min-w-[980px]">
      {data.length > 0 ? (
        <div className="w-full">
          {data?.map((comment: DetailCommentType) => (
            <CommentsCard key={comment.comment_id} comment={comment} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-40 w-[600px] rounded-lg bg-disable-color shadow-xl font-bold xl:w-[1024px]">
          <p>아직 등록된 후기가 없어요</p>
        </div>
      )}
    </div>
  );
};

export default ShowComments;
