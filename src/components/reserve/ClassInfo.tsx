import { ReserveClassType } from '@/types/class';
import Image from 'next/image';
import { GrLocation } from 'react-icons/gr';
import { HiOutlineCube } from 'react-icons/hi2';
import { LuClock } from 'react-icons/lu';
import { PiCurrencyKrw } from 'react-icons/pi';
import { RiUserLocationLine } from 'react-icons/ri';
import NoImage from '@/assets/images/clroom_no_img_purple.png';

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
      description: classInfo.location
        ? classInfo.location.substring(0, classInfo.location.indexOf('('))
        : '온라인 클래스'
    },
    {
      icon: <PiCurrencyKrw className="text-gray-400" />,
      title: '1인당 수강 금액',
      description: classInfo?.price === 0 ? '무료' : `${classInfo?.price.toLocaleString()}원`
    }
  ];

  return (
    <div className=" rounded-md bg-white px-5 pb-6 pt-4 shadow">
      <div className="flex w-full justify-between">
        <h1 className="mb-1 text-lg font-bold">선택하신 클래스</h1>
      </div>
      <div className="relative mb-2 h-[210px] w-full ">
        {classInfo.image ? (
          <Image
            fill={true}
            src={classInfo.image}
            alt={classInfo.title}
            style={{ objectFit: 'cover', borderRadius: '8px' }}
            sizes="(max-width: 768px) 100vw, 40vw"
            priority={true}
          />
        ) : (
          <Image
            className="rounded-lg"
            fill={true}
            src={NoImage}
            alt={classInfo.title}
            style={{ objectFit: 'cover', borderRadius: '8px' }}
            sizes="(max-width: 768px) 80vw, 30vw"
            priority={true}
          />
        )}
      </div>
      <div className="flex flex-col gap-1 px-2">
        <h1 className="mb-2 text-xl font-bold">{classInfo.title}</h1>
        <div className="flex flex-col gap-1.5 text-sm">
          {classInfoLabels.map(({ icon, title, description }) => {
            return (
              <div key={title} className="flex items-center gap-1 text-gray-500">
                <div className="font-bold ">{icon}</div>
                <div className={'mr-1 shrink-0 font-bold'}>{title}</div>
                <p className="truncate font-normal">{description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ClassInfo;
