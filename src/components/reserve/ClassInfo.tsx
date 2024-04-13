import { ReserveClassType } from '@/types/class';
import Image from 'next/image';
import React from 'react';
import defaultClassImage from '../../../public/favicon.ico.png';
import { LuClock } from 'react-icons/lu';
import { PiCurrencyKrw } from 'react-icons/pi';
import { GrLocation } from 'react-icons/gr';
import { MdOutlineCategory } from 'react-icons/md';
import { RiUserLocationLine } from 'react-icons/ri';
import { HiOutlineCube } from 'react-icons/hi2';

const ClassInfo = ({ classInfo }: { classInfo: ReserveClassType }) => {
  const classInfoLabels = [
    {
      icon: <RiUserLocationLine className="text-gray-400" />,
      title: `클래스 유형`,
      description: `${classInfo.classType}`
    },
    {
      icon: <MdOutlineCategory className="text-gray-400" />,
      title: '카테고리',
      description: classInfo.category
    },
    {
      icon: <HiOutlineCube className="text-gray-400" />,
      title: '난이도',
      description: classInfo.difficulty
    },
    {
      icon: <LuClock className="text-gray-400" />,
      title: '소요 시간',
      description: `${classInfo.totalTime}시간`
    },
    {
      icon: <GrLocation className="text-gray-400" />,
      title: '위치',
      description: classInfo.location
    },
    {
      icon: <PiCurrencyKrw className="text-gray-400" />,
      title: '1인당 수강 금액',
      description: `${classInfo.price.toLocaleString()}원`
    }
  ];

  return (
    <div className="p-6 bg-white mb-4 rounded-md shadow">
      <h1 className="font-bold text-lg mb-1">선택하신 클래스</h1>
      <div className="w-full relative h-[210px] mb-2 ">
        <Image
          className="rounded-lg"
          fill={true}
          src={classInfo.image}
          alt={classInfo.title}
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="px-2 flex-col flex gap-1">
        <h1 className="font-bold text-xl mb-2">{classInfo.title}</h1>
        <div className="flex flex-col gap-1.5 text-sm">
          {classInfoLabels.map(({ icon, title, description }) => {
            return (
              <div key={title} className="flex items-center gap-1 text-gray-500">
                <div className="font-bold ">{icon}</div>
                <div className="font-bold mr-1">{title}</div>
                <p className="font-normal">{description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ClassInfo;
