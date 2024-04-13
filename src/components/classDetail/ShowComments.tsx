'use client';

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
    <div className="min-w-full bg-purple-900">
      {data?.map((comment) => (
        <CommentsCard key={comment.comment_id} comment={comment} />
      ))}
    </div>
  );
};

export default ShowComments;
