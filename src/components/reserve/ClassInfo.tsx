import { ReserveClassType } from '@/types/class';
import Image from 'next/image';
import { GrLocation } from 'react-icons/gr';
import { HiOutlineCube } from 'react-icons/hi2';
import { LuClock } from 'react-icons/lu';
import { PiCurrencyKrw } from 'react-icons/pi';
import { RiUserLocationLine } from 'react-icons/ri';

const ClassInfo = ({ classInfo }: { classInfo: ReserveClassType }) => {
  const classInfoLabels = [
    {
      icon: <RiUserLocationLine className="text-gray-400" />,
      title: `클래스 유형`,
      description: `${classInfo.classType}`
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
      description: classInfo.location.substring(0, classInfo.location.indexOf('('))
    },
    {
      icon: <PiCurrencyKrw className="text-gray-400" />,
      title: '1인당 수강 금액',
      description: `${classInfo.price.toLocaleString()}원`
    }
  ];

  return (
    <div className="px-5 pb-6 pt-4 bg-white rounded-md shadow">
      <div className="flex justify-between w-full">
        <h1 className="font-bold text-lg mb-1">선택하신 클래스</h1>
      </div>
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
                <div className={'font-bold mr-1 shrink-0'}>{title}</div>
                <p className="font-normal truncate">{description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ClassInfo;
