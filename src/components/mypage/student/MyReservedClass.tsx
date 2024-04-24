'use client';

import fetchMyClasses from '@/app/api/mypage/fetchMyClasses';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useQuery } from '@tanstack/react-query';
import MyReservedClassItem from './MyReservedClassItem';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Pagination from '@/components/common/Pagination';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const MyReservedClass = () => {
  const { loginUserId } = useLoginStore();
  const searchParams = useSearchParams();
  const page = searchParams.get('page');

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5; // 한 페이지당 보여줄 포스트의 개수

  // 예약한 클래스 정보 불러오기
  const { data: reservedClasses, isPending } = useQuery({
    queryKey: ['reserve'],
    queryFn: () => fetchMyClasses(loginUserId),
    enabled: !!loginUserId
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); // 페이지 이동 시 스크롤 위치 맨 위로 초기화
    setCurrentPage(page && parseInt(page) > 0 ? parseInt(page) : 1); // 현재 페이지 업데이트
  }, [page]);

  if (isPending) {
    return (
      <div className="flex flex-col justify-center  items-center gap-4 min-h-100vh-header-default">
        <LoadingSpinner />
        <p>잠시만 기다려주세요..</p>
      </div>
    );
  }

  if (!reservedClasses || reservedClasses.length === 0) {
    return <div> 내가 예약한 클래스가 없습니다.</div>;
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = reservedClasses.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <ul className="flex flex-col gap-4 justify-center items-center md:p-4 md:justify-items-center w-full mb-24 md:mb-0">
      <p className="flex items-start text-xl text-dark-purple-color font-bold md:hidden justify-center">
        내가 예약한 클래스 보기
      </p>
      {currentPosts.map((classItem) => (
        <MyReservedClassItem key={classItem.reserve_id} classItem={classItem} />
      ))}
      <Pagination
        totalItems={reservedClasses.length}
        itemCountPerPage={postsPerPage}
        pageCount={5}
        currentPage={page && parseInt(page) > 0 ? parseInt(page) : 1}
        key={page}
      />
    </ul>
  );
};

export default MyReservedClass;
