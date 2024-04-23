import React, { useEffect, useState } from 'react';
import MyWishClassItem from './MyWishClassItem';
import { useQuery } from '@tanstack/react-query';
import { getMyWishClass } from '@/app/api/mypage/my-class-api';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { QueryKeys } from '@/constants/QueryKeys';
import Pagination from '@/components/common/Pagination';
import { useSearchParams } from 'next/navigation';

const MyWishClass = () => {
  const { loginUserId } = useLoginStore();
  const searchParams = useSearchParams();
  const page = searchParams.get('page');

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5; // 한 페이지당 보여줄 포스트의 개수

  const { data: myWishClassList, isPending } = useQuery({
    queryKey: [QueryKeys.WISH_CHECK, loginUserId],
    queryFn: () => getMyWishClass(loginUserId),
    enabled: !!loginUserId
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setCurrentPage(page && parseInt(page) > 0 ? parseInt(page) : 1); // 현재 페이지 업데이트
  }, [page]);

  if (isPending) {
    return <div> 로딩중 ... </div>;
  }

  if (!myWishClassList || myWishClassList.length === 0) {
    return <div> 위시 리스트에 추가한 클래스가 없습니다.</div>;
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = myWishClassList.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <ul className="flex flex-col gap-4 justify-center items-center md:p-4 md:justify-items-center w-full">
      <p className="flex items-start text-xl text-dark-purple-color font-bold md:hidden justify-center">
        클래스 위시리스트
      </p>
      {currentPosts.map((classItem) => (
        <MyWishClassItem key={classItem.class_id} classItem={classItem} />
      ))}
      <Pagination
        totalItems={myWishClassList.length}
        itemCountPerPage={postsPerPage}
        pageCount={5}
        currentPage={page && parseInt(page) > 0 ? parseInt(page) : 1}
        key={page}
      />
    </ul>
  );
};

export default MyWishClass;
