'use client';

import { ReserveClassType } from '@/types/class';
import Image from 'next/image';
import React from 'react';
import defaultClassImage from '../../../public/favicon.ico.png';

const ClassInfo = ({ classInfo }: { classInfo: ReserveClassType }) => {
  return (
    <div className="p-6 pb-12 bg-white mb-6 rounded-md  border border-black border-solid ">
      <p>선택하신 클래스</p>
      <div className="w-full p-4 h-[250px] border border-solid border-black mb-4">사진자리</div>
      <div className="px-2 flex-col flex gap-1">
        <h1 className="font-bold text-xl mb-4">클래스 타이틀</h1>
        <p className="font-bold">
          클래스 유형 : <span className="font-normal">원데이 ㅋㅋ</span>
        </p>
        <p className="font-bold">
          클래스 소요시간 : <span className="font-normal">원데이 ㅋㅋ</span>
        </p>
        <p className="font-bold">
          클래스 난이도 : <span className="font-normal">원데이 ㅋㅋ</span>
        </p>
        <p className="font-bold">
          위치: <span className="font-normal">원데이 ㅋㅋ</span>
        </p>
        <p className="font-bold">
          1인당 수강 금액 : <span className="font-normal">원데이 ㅋㅋ</span>
        </p>
      </div>
    </div>
    // <div className="p-2 gap-2 w-full flex h-28 border border-solid border-black">
    //   {classInfo.image ? (
    //     <Image
    //       width={100}
    //       height={100}
    //       src={classInfo.image}
    //       alt="Class Thumbnail Image"
    //       unoptimized={true} // 추후 수정 필요
    //     />
    //   ) : (
    //     <Image width={100} height={100} src={defaultClassImage} alt="Class Thumbnail Image" />
    //   )}
    //   <div className="flex flex-col">
    //     <p>{`[${classInfo.category}] ${classInfo.title}`}</p>
    //     <p>{classInfo.location}</p>
    //     <p>{classInfo.price.toLocaleString('ko-KR')}원</p>
    //   </div>
    // </div>
  );
};

export default ClassInfo;
