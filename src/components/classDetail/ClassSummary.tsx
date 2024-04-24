import React from 'react';
import ClassDetailBtn from './ClassDetailBtn';
import Image from 'next/image';
import { ListDetailClassInfo } from '@/types/class';
import { DetailUserInfoType } from '@/types/user';
import { RiHashtag, RiUserLocationLine } from 'react-icons/ri';
import { HiOutlineCube } from 'react-icons/hi2';
import { LuClock } from 'react-icons/lu';
import { GrLocation } from 'react-icons/gr';
import { PiCurrencyKrw } from 'react-icons/pi';

const ClassSummary = ({
  classData,
  userData
}: {
  classData: ListDetailClassInfo | null;
  userData: DetailUserInfoType | null;
}) => {
  const defaultProfileImageSrc = '/기본프로필사진.png';
  const hashtagString = classData?.hashtag.map((tag) => {
    return (
      <div key={tag} className="flex items-center text-gray-400">
        <RiHashtag />
        <p>{tag}</p>
      </div>
    );
  });
  const classInfoLabels = [
    {
      icon: <RiUserLocationLine className="text-main-color" />,
      title: `클래스 유형`,
      description: `${classData?.class_type}`
    },
    {
      icon: <HiOutlineCube className="text-main-color" />,
      title: '난이도',
      description: classData?.difficulty
    },
    {
      icon: <LuClock className="text-main-color" />,
      title: '소요 시간',
      description: `${classData?.total_time}시간`
    },
    {
      icon: <GrLocation className="text-main-color" />,
      title: '위치',
      description: classData?.location ? classData?.location : '온라인 클래스'
    },
    {
      icon: <GrLocation className="text-main-color" />,
      title: '정원',
      description: (
        <div>
          최소 {classData?.min_people}명 ~ 최대 {classData?.quantity}명
        </div>
      )
    },
    {
      icon: <PiCurrencyKrw className="text-main-color" />,
      title: '수강 금액',
      description: `${classData?.price.toLocaleString()}원`
    }
  ];

  return (
    <div className="mt-4 w-[45%]">
      <div className="tems-center mb-4 mr-2 flex h-8 gap-2">
        <div className="relative h-8 w-8">
          <Image
            fill={true}
            className="h-full w-full rounded-full object-cover"
            src={userData?.profile_image ? userData.profile_image : defaultProfileImageSrc}
            alt="profileImage"
          />
        </div>
        <p>{classData?.users.teacher_name}</p>
      </div>
      <div className="flex flex-col gap-4 text-text-dark-gray">
        <div className="text-xl font-bold">{classData?.title}</div>
        <div>
          <div className="mb-2">카테고리 : {classData?.category}</div>
          <div className="flex gap-2">{hashtagString}</div>
        </div>
        <div className="flex flex-col gap-5 text-lg">
          {classInfoLabels.map(({ icon, title, description }) => {
            return (
              <div key={title} className="flex items-center gap-2 text-text-dark-gray">
                <div className="font-bold ">{icon}</div>
                <div className={'mr-1 shrink-0 font-bold'}>{title}</div>
                <div className="truncate font-normal">{description}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-10 w-full">
        {classData?.class_id ? (
          <ClassDetailBtn
            classId={classData.class_id}
            makeClassUserId={classData.user_id}
            lastClassDay={classData.date[classData.date.length - 1].day}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ClassSummary;
