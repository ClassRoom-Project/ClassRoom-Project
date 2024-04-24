import React, { useEffect, useRef, useState } from 'react';
import MyWishClassItem from './MyWishClassItem';
import { useQuery } from '@tanstack/react-query';
import { getMyWishClass } from '@/app/api/mypage/my-class-api';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { QueryKeys } from '@/constants/QueryKeys';
import Pagination from '@/components/common/Pagination';
import { useSearchParams } from 'next/navigation';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import MoveToTopBtn from '@/components/listpage/MoveToTopBtn';

const MyWishClass = () => {
  const { loginUserId } = useLoginStore();
  const searchParams = useSearchParams();
  const page = searchParams.get('page');

  // 위시한 클래스 불러오기
  const { data: myWishClassList, isPending } = useQuery({
    queryKey: [QueryKeys.WISH_CHECK, loginUserId],
    queryFn: () => getMyWishClass(loginUserId),
    enabled: !!loginUserId
  });

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5; // 한 페이지당 보여줄 포스트의 개수
  // const responsiveHeightRef = useRef(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(page && parseInt(page) > 0 ? parseInt(page) : 1); // 현재 페이지 업데이트
  }, [page]);

  // const handleMoveToTop= ()=>{
  //   if(responsiveHeightRef.current){
  //     responsiveHeightRef.current.scrollTop = 0
  //   }
  // }

  if (isPending) {
    return (
      <div className="flex h-auto flex-col  items-center justify-center gap-4">
        <LoadingSpinner />
        <p>잠시만 기다려주세요..</p>
      </div>
    );
  }

  if (!myWishClassList || myWishClassList.length === 0) {
    return <div> 위시 리스트에 추가한 클래스가 없습니다.</div>;
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = myWishClassList.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <ul className="mb-24 flex w-full flex-col items-center justify-center gap-4 md:mb-0 md:justify-items-center md:p-4">
      <p className="flex items-start justify-center text-xl font-bold text-dark-purple-color md:hidden">
        클래스 위시리스트
      </p>
      {currentPosts.map((classItem) => (
        <MyWishClassItem key={classItem.class_id} classItem={classItem} />
      ))}

      <MoveToTopBtn />
      <Pagination
        totalItems={myWishClassList.length}
        itemCountPerPage={postsPerPage}
        pageCount={5}
        currentPage={currentPage}
        key={page}
      />
    </ul>
  );
};

export default MyWishClass;
