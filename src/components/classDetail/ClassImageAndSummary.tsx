'use client';

import { ListDetailClassInfo } from '@/types/class';
import { DetailUserInfoType } from '@/types/user';
import * as DOMPurify from 'dompurify';
import Image from 'next/image';
import { useState } from 'react';
import { FiCalendar, FiUserPlus, FiWatch } from 'react-icons/fi';
import { GrLocation } from 'react-icons/gr';
import { HiOutlineCube } from 'react-icons/hi2';
import { LuClock } from 'react-icons/lu';
import { PiCurrencyKrw } from 'react-icons/pi';
import { RiHashtag, RiUserLocationLine } from 'react-icons/ri';
import ClassDetailBtn from './ClassDetailBtn';

const ClassImageAndSummary = ({
  classData,
  userData
}: {
  classData: ListDetailClassInfo | null;
  userData: DetailUserInfoType | null;
}) => {
  const defaultImageSrc = '/noimage.png';
  const defaultProfileImageSrc = '/기본프로필사진.png';

  // 메인 이미지를 스테이트로 변경 -> 메인이미지 바꾸기
  const [mainImageSrc, setMainImageSrc] = useState(classData?.image[0] || defaultImageSrc);

  // 이미지 선택시 해당이미지가 메인이미지로 바뀌는 로직, Todo : 컴포넌트로 리팩토링 예정
  const handleThumbnailClick = (imageSrc: string) => {
    setMainImageSrc(imageSrc);
  };

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
    <div className="w-full bg-pale-purple flex justify-center">
      <div className="w-full flex  p-6 gap-12 justify-between">
        <div className="w-[50%]  border border-solid border-black">
          <div className="w-full h-[350px] relative mt-2 flex bg-black">
            <Image fill src={mainImageSrc} alt="classImage 0"></Image>
          </div>
          <div className="w-full mb-5 h-[50px] flex mt-2">
            <div
              onClick={() => handleThumbnailClick(classData?.image[0] || defaultImageSrc)}
              className="w-[50px] h-[50px] cursor-pointer flex mr-[20px]"
            >
              <Image
                width={50}
                height={50}
                src={classData?.image[0] ? classData.image[0] : defaultImageSrc}
                alt="classImage 0"
              ></Image>
            </div>

            <div
              onClick={() => handleThumbnailClick(classData?.image[1] || defaultImageSrc)}
              className="w-[50px] h-[50px] cursor-pointer flex mx-[20px]"
            >
              <Image
                width={50}
                height={50}
                src={classData?.image[1] ? classData.image[1] : defaultImageSrc}
                alt="classImage 1"
              ></Image>
            </div>
            <div
              onClick={() => handleThumbnailClick(classData?.image[2] || defaultImageSrc)}
              className="w-[50px] h-[50px] cursor-pointer flex mx-[20px]"
            >
              <Image
                width={50}
                height={50}
                src={classData?.image[2] ? classData.image[2] : defaultImageSrc}
                alt="classImage 2"
              ></Image>
            </div>
            <div
              onClick={() => handleThumbnailClick(classData?.image[3] || defaultImageSrc)}
              className="w-[50px] h-[50px] cursor-pointer flex mx-[20px]"
            >
              <Image
                width={50}
                height={50}
                src={classData?.image[3] ? classData.image[3] : defaultImageSrc}
                alt="classImage 3"
              ></Image>
            </div>
            <div
              onClick={() => handleThumbnailClick(classData?.image[4] || defaultImageSrc)}
              className="w-[50px] h-[50px] cursor-pointer flex ml-[20px]"
            >
              <Image
                width={50}
                height={50}
                src={classData?.image[4] ? classData.image[4] : defaultImageSrc}
                alt="classImage 4"
              ></Image>
            </div>
          </div>
        </div>

        <div className="w-[45%] mt-4">
          <div className="flex tems-center mr-2 h-8 gap-2 mb-4">
            <div className="relative w-8 h-8">
              <Image
                fill={true}
                className="rounded-full w-full h-full object-cover"
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
                    <div className={'font-bold mr-1 shrink-0'}>{title}</div>
                    <div className="font-normal truncate">{description}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full mt-10">
            {classData?.class_id ? (
              <ClassDetailBtn
                classId={classData.class_id}
                makeClassUserId={classData.user_id}
                lastClassDay={classData.date[classData.date.length - 1].day}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassImageAndSummary;
