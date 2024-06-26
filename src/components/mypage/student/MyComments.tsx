'use client';

import { fetchClassInfoOnComment } from '@/app/api/mypage/my-comments-api';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useQuery } from '@tanstack/react-query';
import MyCommentItem from './MyCommentItem';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Pagination from '@/components/common/Pagination';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import MoveToTopBtn from '@/components/listpage/MoveToTopBtn';

const MyComments = () => {
  const { loginUserId } = useLoginStore();

  // 페이지네이션
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5; // 한 페이지당 보여줄 포스트의 개수

  // 후기 리스트 불러오기
  const { data: myComments, isPending } = useQuery({
    queryKey: ['comments'],
    queryFn: () => fetchClassInfoOnComment(loginUserId),
    enabled: !!loginUserId
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); // 페이지 이동 시 스크롤 위치 맨 위로 초기화
    setCurrentPage(page && parseInt(page) > 0 ? parseInt(page) : 1); // 현재 페이지 업데이트
  }, [page]);

  if (isPending) {
    return (
      <div className="flex h-auto flex-col items-center justify-center gap-4">
        <LoadingSpinner />
        <p>잠시만 기다려주세요..</p>
      </div>
    );
  }

  if (!myComments || myComments.length === 0) {
    return <div> 내가 작성한 후기가 없습니다.</div>;
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = myComments.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <ul className="mb-24 flex w-full flex-col items-center justify-center gap-4 md:mb-0 md:justify-items-center md:p-4">
      <p className="flex items-start justify-center text-xl font-bold text-dark-purple-color md:hidden">내가 쓴 후기</p>
      {currentPosts.map((comment) => (
        <MyCommentItem key={comment.comment_id} comment={comment} />
      ))}
      <MoveToTopBtn />
      <Pagination
        totalItems={myComments.length}
        itemCountPerPage={postsPerPage}
        pageCount={5}
        currentPage={page && parseInt(page) > 0 ? parseInt(page) : 1}
        key={page}
      />
    </ul>
  );
};

export default MyComments;
