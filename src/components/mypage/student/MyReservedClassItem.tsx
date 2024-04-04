import { cancelReservation } from '@/app/api/mypage/fetchMyClasses';
import { ClassItem } from '@/types/register';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaRegClock, FaRegCalendarCheck } from 'react-icons/fa';
import { GrLocation } from 'react-icons/gr';
import { GoPeople } from 'react-icons/go';
import { BiMoneyWithdraw } from 'react-icons/bi';

const MyReservedClassItem = ({ classItem }: { classItem: ClassItem }) => {
  const [classes, setClasses] = useState<ClassItem[]>([]);

  // console.log('classItem', classItem);

  // 예약 취소 -> useMutation으로 수정?
  const handleCancelReservation = async (reserve_id: string) => {
    if (window.confirm('정말 취소하시겠습니까?')) {
      try {
        await cancelReservation(reserve_id);
        setClasses(classes.filter((classItem) => classItem.reserve_id !== reserve_id));
        alert('예약이 취소되었습니다.');
      } catch (error) {
        console.error('예약 취소 중 오류 발생:', error);
        alert('예약 취소 중 오류가 발생했습니다.');
      }
    }
  };

  // 가격 콤마(,) 넣기
  const formattedPrice = classItem.reserve_price.toLocaleString();

  return (
    <li key={classItem.reserve_id} className="flex gap-4 border-y border-y-pale-color w-xl">
      <div className="w-[300px] h-[200px]">
        <Image
          src={classItem.image && classItem.image.length > 0 ? classItem.image[0] : '이미지 없음'}
          alt="클래스 대표 사진"
          width={300}
          height={200}
          className="w-full h-full p-4"
          style={{ objectFit: 'contain' }}
          unoptimized={true}
        />
      </div>
      <div className="flex flex-col p-4 relative">
        <section>
          <p className="font-bold text-xl text-text-color">{classItem.title}</p>
          <div className="flex gap-4 py-4">
            <div className="flex items-center p-2 gap-2 border border-point-color rounded-3xl">
              <FaRegCalendarCheck color="#5373FF" size="20" />
              <span>날짜 : {classItem.reserve_date}</span>
            </div>
            <div className="flex items-center p-2 gap-2 border border-point-color rounded-3xl ">
              <FaRegClock color="#5373FF" size="20" />
              <span>시간 : {classItem.reserve_time}</span>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="inline-flex items-center p-2 gap-2 border border-point-color rounded-3xl ">
              <GrLocation color="#5373FF" size="20" />
              <span>
                위치 : {classItem.location} {classItem.detail_location}
              </span>
            </div>
            <div className="inline-flex items-center p-2 gap-2 border border-point-color rounded-3xl ">
              <GoPeople color="#5373FF" size="20" />
              <span>신청한 인원 : {classItem.reserve_quantity}</span>
            </div>
            <div className="inline-flex items-center p-2 gap-2 border border-point-color rounded-3xl ">
              <BiMoneyWithdraw color="#5373FF" size="20" />
              <span>신청한 가격 : {formattedPrice}</span>
            </div>
          </div>
        </section>
        <section className="flex gap-4 my-8">
          <button className="btn w-36">문의하기</button>
          <button
            className="btn  bg-point-color text-white w-36"
            onClick={() => handleCancelReservation(classItem.reserve_id)}
          >
            예약 취소하기
          </button>
          <Link href={`list/detail/${classItem.class_id}`}>
            <div className="btn bg-[#A4BEFF] text-white w-36">클래스 보러가기</div>
          </Link>
        </section>
      </div>
    </li>
  );
};

export default MyReservedClassItem;
