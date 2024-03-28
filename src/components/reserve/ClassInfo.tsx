import { Class } from '@/types/class';
import Image from 'next/image';
import React from 'react';

const ClassInfo = async ({ classInfo }: { classInfo: Class }) => {
  console.log(classInfo);
  return (
    <div className="p-2 gap-2 w-full flex h-28 border border-solid border-black">
      <Image
        width={100}
        height={100}
        src={classInfo?.image[0] ? classInfo?.image[0] : 'default image'}
        alt="클래스 이미지"
        unoptimized={true}
      />
      <div className="flex flex-col">
        <span>{`[${classInfo?.category}] ${classInfo?.title}`}</span>
        <span>{classInfo?.location}</span>
        <span>{classInfo?.price.toLocaleString('ko-KR')}원</span>
      </div>
    </div>
  );
};

export default ClassInfo;
