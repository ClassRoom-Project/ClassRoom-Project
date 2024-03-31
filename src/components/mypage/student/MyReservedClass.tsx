// src/app/components/mypage/student/MyReservedClass.tsx
import { GoToClassPost } from '@/components/common/mypage/buttons';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import MyClassImage from '../../../../public/class-sample-img.jpeg';
import fetchMyClasses from '@/app/api/supabase/fetchMyClasses';
import { cancelReservation } from '@/app/api/supabase/fetchMyClasses'; // 예약 취소 함수 가져오기

const MyReservedClass = () => {
  const [classes, setClasses] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchMyClasses('523e4567-e89b-12d3-a456-426614174005');
      setClasses(data || []);
    }
    fetchData();
  }, []);

  // 예약 취소 핸들러
  const handleCancelReservation = async (reserve_id:string) => {
    if (window.confirm('정말 취소하시겠습니까?')) {
      try {
        await cancelReservation(reserve_id);
        setClasses(classes.filter(classItem => classItem.reserve_id !== reserve_id)); // 삭제된 예약을 상태에서 제거
        alert('예약이 취소되었습니다.'); // 사용자에게 예약 취소 알림
      } catch (error) {
        console.error('예약 취소 중 오류 발생:', error);
        alert('예약 취소 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div>
      {classes.map((classItem, index) => (
        <article key={index} className="flex gap-4">
          <div className="w-[300px] h-[200px]">
            <Image
              src={classItem.image || MyClassImage}
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
              <GoToClassPost />
            </section>
          </div>
        </article>
      ))}
    </div>
  );
};

export default MyReservedClass;
