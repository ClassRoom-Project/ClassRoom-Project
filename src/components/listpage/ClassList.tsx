'use client';

import { getClassForList } from '@/app/api/listpage/classInfoForList';
import ClassCard from '@/components/main/ClassCard';
import { useClassFilterStore } from '@/store/classFilterStore';
import { ClassAllType } from '@/types/class';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';

//무한 스크롤
function ClassList() {
  const { selectedCategory } = useClassFilterStore();
  const [filteredClasses, setFilteredClasses] = useState<ClassAllType[]>([]);
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
    queryKey: ['infiniteClass'],
    queryFn: ({ pageParam = 1 }) => getClassForList(pageParam, 8), //한페이지당 불러오는 데이터 수 지정
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage //다음페이지로 넘어가는 로직
  });

  useEffect(() => {
    if (!targetRef.current) return;
    //IntersectionObserver 인자 2개를 받는다
    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries);
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

  //flatMap은 모든 페이지에 있는 데이터를 가져와서 하나의 배열로 리턴하는 메서드
  useEffect(() => {
    if (classInfos) {
      const allClasses = classInfos.pages.flatMap((page) => page.classInfos);
      const filtered = selectedCategory
        ? allClasses.filter((classInfo) => classInfo.category === selectedCategory)
        : allClasses;
      setFilteredClasses(filtered);
    }
  }, [classInfos, selectedCategory]);

  return status === 'pending' ? (
    <div className="w-full h-screen text-[#5373FF] flex justify-center items-center">
      <p>로딩중입니다!</p>
    </div>
  ) : status === 'error' ? (
    <div className="w-full h-screen text-[#5373FF] flex justify-center items-center">
      <p>Error: {error.message}</p>
    </div>
  ) : (
    <div className="flex justify-center min-w-full">
      <div className="grid grid-cols-4 min-w-[90px]">
        {filteredClasses.map((classInfos) => (
          <ClassCard key={classInfos.class_id} classInfos={classInfos} />
        ))}{' '}
        {/*여기서 ref값 적용*/}
        <div ref={targetRef} className="h-5"></div>
        {isFetching && !isFetchingNextPage && <p>Loading more...</p>}
      </div>
    </div>
  );
}

export default ClassList;
