import AskButton from '@/components/chatRooms/AskButton';
import DetailWishButton from '@/components/classDetail/DetailWishButton';
import { ClassAllType, MyWishClassType } from '@/types/class';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BiCategoryAlt } from 'react-icons/bi';
import { GoPersonAdd } from 'react-icons/go';
import { GrLocation } from 'react-icons/gr';
import MyPageWishButton from './MyPageWishButton';

const MyWishClassItem = ({ classItem }: { classItem: MyWishClassType }) => {
  // 이미지 대표사진
  const mainImage = classItem.image && classItem.image.length > 0 ? classItem.image[0] : '이미지 없음';

  return (
    <li className="border-b-2 flex flex-col align-center gap-4 my-4 py-4 w-full md:flex-row justify-center items-center ">
      <div className="flex gap-4 bg-pale-purple w-full flex-col md:flex-row items-center">
        <div className="md:w-[300px] md:h-[200px] w-3/5">
          <Image
            src={mainImage}
            alt="클래스 대표 사진"
            width={300}
            height={200}
            className="w-full h-full p-4"
            style={{ objectFit: 'contain' }}
            unoptimized
          />
        </div>
        <div className="flex flex-col p-4 gap-4 h-full w-full">
          <section className="flex flex-col md:items-start">
            <div className="flex  gap-4 items-center pb-4">
              <p className="font-bold text-xl text-dark-purple-color">{classItem.title}</p>
              {classItem && (
                <MyPageWishButton key={classItem.class_id} classId={classItem.class_id} classItem={classItem} />
              )}
            </div>
            <div className="md:flex gap-4 md:py-4 md:flex-row flex-col ">
              <div className="flex gap-4 py-1">
                <div className="flex items-center p-2 gap-2 border border-point-purple rounded-3xl ">
                  <p className="md:text-base text-xs">난이도 : {classItem?.difficulty}</p>
                </div>
                <div className="flex items-center p-2 gap-2 border border-point-purple rounded-3xl ">
                  <p className="md:text-base text-xs">{classItem?.class_type}</p>
                </div>
              </div>
              <div className="flex gap-4 py-1">
                <div className="flex items-center p-2 gap-2 border border-point-purple rounded-3xl ">
                  <BiCategoryAlt color="#6C5FF7" size="20" />
                  <p className="md:text-base text-xs">카테고리 : {classItem?.category}</p>
                </div>
                <div className="flex items-center p-2 gap-2 border border-point-purple rounded-3xl ">
                  <GoPersonAdd color="#6C5FF7" size="20" />
                  <p className="md:text-base text-xs">수강 인원수 : {String(classItem?.quantity)}명</p>
                </div>
              </div>
            </div>
            <div className="flex gap-4 py-1">
              <div className="inline-flex items-center p-2 gap-2 border border-point-purple rounded-3xl ">
                <GrLocation color="#6C5FF7" size="20" />
                {classItem.location ? (
                  <p className="md:text-base text-xs">
                    위치 : {classItem.location} {classItem.detail_location}
                  </p>
                ) : (
                  <p className="md:text-base text-xs">위치 정보가 없습니다.</p>
                )}
              </div>
            </div>
          </section>
          <section className="flex md:justify-end justify-center gap-4 md:gap-4 p-2 md:right-4 items-center w-full">
            <AskButton
              classId={classItem.class_id}
              makeClassUserId={classItem.user_id}
              buttonStyle="btn md:w-36 w-1/3 hover:bg-transparent text-xs md:text-sm hover:text-text-dark-gray"
            />
            <div className="btn bg-dark-purple-color text-white md:w-36 w-1/3 text-xs md:text-sm whitespace-nowrap hover:bg-transparent hover:text-dark-purple-color">
              <Link href={`reserve?classId=${classItem.class_id}`}>클래스 신청하기</Link>
            </div>
            <div className="btn bg-point-purple text-white md:w-36 w-1/3 text-xs md:text-sm whitespace-nowrap hover:bg-transparent hover:text-point-purple">
              <Link href={`list/detail/${classItem.class_id}`}>클래스 보러가기</Link>
            </div>
          </section>
        </div>
      </div>
    </li>
  );
};

export default MyWishClassItem;
