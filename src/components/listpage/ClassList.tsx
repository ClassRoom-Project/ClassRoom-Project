'use client';

import { useCategoryFilterStore, useListFilterStore, useSearchStore } from '@/store/classFilterStore';
import { getClassForList } from '@/app/api/listpage/classInfoForList';
import ClassCard from '@/components/main/ClassCard';
import { ClassAllType } from '@/types/class';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import LoadingSpinner from '../common/LoadingSpinner';
//무한 스크롤
function ClassList() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get('query');
  const { selectedCategory } = useCategoryFilterStore();
  const { ClassFilters } = useListFilterStore();
  const targetRef = useRef<HTMLDivElement>(null);

  const {
    data: classInfos,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status
  } = useInfiniteQuery({
    //키값을 변수로해두면 유즈이펙트 사용할 필요없이 키값이 변경될 때 마다 리액트 쿼리에서 리페칭해옵니다!
    queryKey: ['infiniteClass', selectedCategory, ClassFilters, searchQuery],
    queryFn: ({ pageParam = 1 }) => getClassForList(pageParam, 10, selectedCategory, ClassFilters, searchQuery), //한페이지당 불러오는 데이터 수 지정
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage //다음페이지로 넘어가는 로직
  });

  useEffect(() => {
    if (!targetRef.current) return;
    //IntersectionObserver 인자 2개를 받는다
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.5 // targetRef의 해당수치만큼이 보일 때 콜백이 실행됩니다.
      }
    );
    observer.observe(targetRef.current);
    // 컴포넌트가 언마운트될 때 observer를 정리합니다.
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);
  return status === 'pending' ? (
    <div className="flex h-screen  w-full items-center justify-center">
      <LoadingSpinner />
    </div>
  ) : status === 'error' ? (
    <div className="flex h-screen w-full items-center justify-center text-[#5373FF]">
      <p>Error: {error.message}</p>
    </div>
  ) : (
    <div className="responsive flex w-full items-center justify-center">
      <div className="flex w-full items-center justify-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {classInfos?.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page.classInfos.map((classInfos: ClassAllType) => (
                <div key={classInfos.class_id} className="p-2 md:py-6">
                  <ClassCard classInfos={classInfos} />
                </div>
              ))}
            </React.Fragment>
          ))}
          {/*여기서 ref값 적용*/}
          <div ref={targetRef} className="h-5"></div>
          {isFetching && !isFetchingNextPage && <p>로딩중입니다!</p>}
        </div>
      </div>
    </div>
  );
}

export default ClassList;
