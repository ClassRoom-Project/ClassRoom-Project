import React from 'react';
import { ClassAllType } from '@/types/class';
import { DetailUserInfoType } from '@/types/user';
import Image from 'next/image';

const ClassDetailLeft = ({
  classData,
  userData
}: {
  classData: ClassAllType | null;
  userData: DetailUserInfoType | null;
}) => {
  return (
    <div className="flex flex-col p-5 justify-center items-center w-[500px] min-h-full border-[#5373FF] border-solid border-[1px]">
      <div className="flex items-start justify-start w-[350px]">
        <div className="w-8 mr-2 h-8">
          <Image
            width={30}
            height={30}
            src={userData?.profile_image && userData?.profile_image.length > 0 ? userData.profile_image[0] : 'no image'}
            alt="profileImage"
            layout="responsive"
            objectFit="cover"
            unoptimized={true}
          ></Image>
        </div>
        <p>{userData?.nickname}</p>
      </div>
      <div className="w-[350px] h-[350px] mt-2 flex bg-black">
        <Image
          width={350}
          height={350}
          src={classData?.image && classData?.image.length > 0 ? classData.image[0] : 'no image'}
          alt="classImage 0"
          layout="responsive"
          objectFit="cover"
          unoptimized={true}
        ></Image>
      </div>
      <div className="w-[350px] h-[50px] flex mt-2 ">
        <div className="w-[50px] h-[50px] flex">
          <Image
            width={50}
            height={50}
            src={classData?.image && classData?.image.length > 0 ? classData.image[1] : 'no image'}
            alt="classImage 1"
            layout="responsive"
            objectFit="cover"
            unoptimized={true}
          ></Image>
        </div>
        <div className="w-[50px] h-[50px] flex ml-[50px]">
          <Image
            width={50}
            height={50}
            src={classData?.image && classData?.image.length > 0 ? classData.image[2] : 'no image'}
            alt="classImage 1"
            layout="responsive"
            objectFit="cover"
            unoptimized={true}
          ></Image>
        </div>
        <div className="w-[50px] h-[50px] flex ml-[50px]">
          <Image
            width={50}
            height={50}
            src={classData?.image && classData?.image.length > 0 ? classData.image[3] : 'no image'}
            alt="classImage 1"
            layout="responsive"
            objectFit="cover"
            unoptimized={true}
          ></Image>
        </div>
        <div className="w-[50px] h-[50px] flex ml-[50px]">
          <Image
            width={50}
            height={50}
            src={classData?.image && classData?.image.length > 0 ? classData.image[4] : 'no image'}
            alt="classImage 1"
            layout="responsive"
            objectFit="cover"
            unoptimized={true}
          ></Image>
        </div>
      </div>
      <div>지도 들어갈 자리</div>
    </div>
  );
};

export default ClassDetailLeft;
