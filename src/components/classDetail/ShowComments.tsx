'use client';

import { DetailCommentType } from '@/types/detailComment';
import React, { useEffect, useState } from 'react';
import CommentsCard from './CommentsCard';
import { useQuery } from '@tanstack/react-query';
import { getDetailComment } from '@/app/api/classdetail/detailComment';
import Pagination from '../common/Pagination';
import { useSearchParams } from 'next/navigation';

const ShowComments = ({ classId }: { classId: string | undefined }) => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const [currentPage, setCurrentPage] = useState(1);
  const commentPerPage = 5; // 한 페이지에 표시할 댓글 수
  const { data, error, status } = useQuery({
    queryKey: ['getDetailComment', currentPage],
    queryFn: () => getDetailComment(classId, currentPage, commentPerPage)
  });

  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });
    setCurrentPage(page && parseInt(page) > 0 ? parseInt(page) : 1); // 현재 페이지 업데이트
  }, [page, currentPage]);

  if (status === 'pending') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Error: {error.message}</div>;
  }

  const totalItems = (data && data[0]?.total_count) || 0;
  const comments =
    data?.map((item: DetailCommentType) => ({
      comment_id: item.comment_id,
      create_at: item.create_at,
      content: item.content,
      comment_image: item.comment_image,
      star: item.star,
      class_id: item.class_id,
      user_id: item.user_id,
      nickname: item.nickname,
      job: item.job,
      profile_image: item.profile_image
    })) || [];

  return (
    <div className="relative  flex  w-full flex-col items-center justify-center">
      {data?.length > 0 ? (
        <div className="flex w-full flex-col">
          {comments?.map((comment: DetailCommentType) => (
            <div key={comment.comment_id}>
              <CommentsCard comment={comment} />
              <div className="divider m-0"></div>
            </div>
          ))}
          <Pagination
            totalItems={totalItems}
            itemCountPerPage={commentPerPage}
            pageCount={5}
            currentPage={currentPage}
            key={page}
          />
        </div>
      ) : (
        <div className="mb-12 mt-8 flex flex-col items-center justify-center gap-1 text-xs md:text-sm lg:my-20 lg:text-base">
          <p>아직 등록된 후기가 없어요. </p>
          <p>첫 번째 후기의 주인공이 되어보세요!</p>
        </div>
      )}
    </div>
  );
};

export default ShowComments;
