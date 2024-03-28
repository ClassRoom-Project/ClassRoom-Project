import { fetchClassInfoToReserve } from '@/api/supabase/fetchClassInfo';
import Image from 'next/image';
import React from 'react';

const ClassInfo = async ({ classId }: { classId: string | null }) => {
  console.log(classId);

  // const classInfo = await fetchClassInfoToReserve({ classId });
  // console.log(classInfo);

  return (
    <div className="p-2 gap-2 w-full flex h-28 border border-solid border-black">
      <Image
        width={100}
        height={100}
        src={`https://www.datocms-assets.com/23496/1647375064-sfadf.png?auto=format&fit=max&w=1200`}
        alt="클래스 이미지"
        unoptimized={true}
      />
      <div className="flex flex-col">
        <span>[카테고리] 클래스 이름</span>
        <span>위치</span>
        <span>가격</span>
      </div>
    </div>
  );
};

export default ClassInfo;
