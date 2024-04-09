import { ReserveClassType } from '@/types/class';
import Image from 'next/image';
import React from 'react';
import defaultClassImage from '../../../public/favicon.ico.png';

const ClassInfo = ({ classInfo }: { classInfo: ReserveClassType }) => {
  const classInfoLabels = [
    {
      title: '클래스 유형',
      description: `${classInfo.category}`
    },
    {
      title: '카테고리',
      description: `${classInfo.category}`
    },
    {
      title: '소요 시간',
      description: `${classInfo.maxPeople}`
    },
    {
      title: '클래스 난이도',
      description: `${classInfo.category}`
    },
    {
      title: '위치',
      description: `${classInfo.location}`
    },
    {
      title: '1인당 수강 금액',
      description: `${classInfo.price}`
    }
  ];

  return (
    <div className="p-6 pb-8 bg-white mb-4 rounded-md   ">
      <h1 className="font-bold text-lg mb-2">선택하신 클래스</h1>
      <div className="w-full relative h-[250px] mb-4 ">
        <Image
          className="rounded-lg"
          fill={true}
          src={classInfo.image}
          alt={classInfo.title}
          unoptimized={true} // 추후 수정 필요
        />
      </div>
      <div className="px-2 flex-col flex">
        <h1 className="font-bold text-xl mb-4">{classInfo.title}</h1>
        {classInfoLabels.map(({ title, description }) => {
          return (
            <div key={title} className="font-bold">
              <p>
                {title} <span className="font-normal">{description}</span>
              </p>
            </div>
          );
        })}
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
