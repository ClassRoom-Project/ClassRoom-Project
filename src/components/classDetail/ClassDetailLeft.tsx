'use client';

import React, { useState } from 'react';
import { ClassAllType } from '@/types/class';
import { DetailUserInfoType } from '@/types/user';
import Image from 'next/image';

//왼쪽 컴포넌트
const ClassDetailLeft = ({
  classData,
  userData
}: {
  classData: ClassAllType | null;
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

  return (
    <div className="flex flex-col p-5 mr-4 justify-center items-center w-[500px] rounded-lg h-[900px] border-[#5373FF] border-solid border-[1px]">
      <div className="flex items-start justify-start w-[350px]">
        <div className="w-8 mr-2 h-8">
          <Image
            width={30}
            height={30}
            src={userData?.profile_image[0] ? userData.profile_image[0] : defaultProfileImageSrc}
            alt="profileImage"
            unoptimized={true}
          ></Image>
        </div>
        <p>{userData?.nickname}</p>
      </div>
      <div className="w-[350px] h-[350px] mt-2 flex bg-black">
        <Image width={350} height={350} src={mainImageSrc} alt="classImage 0" unoptimized={true}></Image>
      </div>
      <div className="w-[350px] h-[50px] flex mt-2">
        <div
          onClick={() => handleThumbnailClick(classData?.image[0] || defaultImageSrc)}
          className="w-[50px] h-[50px] cursor-pointer flex mr-[15px]"
        >
          <Image
            width={50}
            height={50}
            src={classData?.image[0] ? classData.image[0] : defaultImageSrc}
            alt="classImage 0"
            unoptimized={true}
          ></Image>
        </div>

        <div
          onClick={() => handleThumbnailClick(classData?.image[1] || defaultImageSrc)}
          className="w-[50px] h-[50px] cursor-pointer flex mx-[15px]"
        >
          <Image
            width={50}
            height={50}
            src={classData?.image[1] ? classData.image[1] : defaultImageSrc}
            alt="classImage 1"
            unoptimized={true}
          ></Image>
        </div>
        <div
          onClick={() => handleThumbnailClick(classData?.image[2] || defaultImageSrc)}
          className="w-[50px] h-[50px] cursor-pointer flex mx-[15px]"
        >
          <Image
            width={50}
            height={50}
            src={classData?.image[2] ? classData.image[2] : defaultImageSrc}
            alt="classImage 2"
            unoptimized={true}
          ></Image>
        </div>
        <div
          onClick={() => handleThumbnailClick(classData?.image[3] || defaultImageSrc)}
          className="w-[50px] h-[50px] cursor-pointer flex mx-[15px]"
        >
          <Image
            width={50}
            height={50}
            src={classData?.image[3] ? classData.image[3] : defaultImageSrc}
            alt="classImage 3"
            unoptimized={true}
          ></Image>
        </div>
        <div
          onClick={() => handleThumbnailClick(classData?.image[4] || defaultImageSrc)}
          className="w-[50px] h-[50px] cursor-pointer flex ml-[15px]"
        >
          <Image
            width={50}
            height={50}
            src={classData?.image[4] ? classData.image[4] : defaultImageSrc}
            alt="classImage 4"
            unoptimized={true}
          ></Image>
        </div>
      </div>
      <div className="w-[350px] mt-6 h-[350px] text-white bg-black">지도 들어갈 자리</div>
    </div>
  );
};

export default ClassDetailLeft;
