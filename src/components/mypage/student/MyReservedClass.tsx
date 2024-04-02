"use client";

import React, { useEffect, useState } from 'react';
import fetchMyClasses, { cancelReservation } from '@/app/api/mypage/fetchMyClasses';
import Link from 'next/link';
import { ClassItem } from '@/types/register';

const MyReservedClass = () => {
  const [classes, setClasses] = useState<ClassItem[]>([]); // 리액트 쿼리로 개선 가능

  useEffect(() => {
    async function fetchData() {
      const data = await fetchMyClasses('523e4567-e89b-12d3-a456-426614174005'); // 임시 user_id
      const formattedData = data.map((classItem:ClassItem) => ({
        ...classItem,
        image: classItem.image?.replace(/["{}]/g, '') || '' // 잘못된 따옴표 제거
      }));
      setClasses(formattedData || []);
    }
    fetchData();
  }, []);

  // 예약 취소
  const handleCancelReservation = async (reserve_id:string) => {
    if (window.confirm('정말 취소하시겠습니까?')) {
      try {
        await cancelReservation(reserve_id);
        setClasses(classes.filter(classItem => classItem.reserve_id !== reserve_id));
        alert('예약이 취소되었습니다.');
      } catch (error) {
        console.error('예약 취소 중 오류 발생:', error);
        alert('예약 취소 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div>
      {classes.map((classItem) => (
        <article key={classItem.reserve_id} className="flex gap-4">
          <div className="w-[300px] h-[200px]">
            <img
              src={classItem.image || '/class-sample-img.jpeg'}
              alt="클래스 대표 사진"
              width={300}
              height={200}
              className="w-full h-full p-4"
              style={{ objectFit: 'contain' }}
            />
          </div>

          <div className="flex flex-col p-4">
            <section>
              <p>{classItem.title}</p>
              <div className="flex gap-4">
                <span>{classItem.reserve_date}</span>
                <span>{classItem.reserved_at}</span>
              </div>
            </section>
            <section className="flex gap-4 m-4">
              <button className="border rounded-xl p-4 w-[150px] bg-rose-500 text-white" onClick={() => handleCancelReservation(classItem.reserve_id)}>예약 취소하기</button>
              <button className="border rounded-xl p-4 w-[150px]">문의하기</button>
              <Link href={`list/detail/${classItem.class_id}`}>
                <div className="border rounded-xl p-4 w-[150px] cursor-pointer">클래스 보러가기</div>
              </Link>
            </section>
          </div>
        </article>
      ))}
    </div>
  );
};

export default MyReservedClass;
