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
    window.scrollTo(0, 0); // 페이지 이동 시 스크롤 위치 맨 위로 초기화
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
    <div>
      <ul className="flex flex-col align-center max-w-screen-xl">
        {currentPosts.map((classItem) => (
          <MyWishClassItem key={classItem.class_id} classItem={classItem} />
        ))}
        <Pagination
          totalItems={myWishClassList.length}
          itemCountPerPage={postsPerPage}
          pageCount={5}
          currentPage={page && parseInt(page) > 0 ? parseInt(page) : 1}
        />
      </ul>
    </div>
  );
};

export default MyWishClass;
