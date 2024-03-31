// src/app/components/mypage/student/MyReservedClass.tsx
import { GoToClassPost } from '@/components/common/mypage/buttons';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import MyClassImage from '../../../../public/class-sample-img.jpeg';
import fetchMyClasses from '@/app/api/supabase/fetchMyClasses';

const MyReservedClass = () => {
  const [classes, setClasses] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchMyClasses('523e4567-e89b-12d3-a456-426614174005');
      setClasses(data || []);
    }
    fetchData();
  }, []);

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
              <button className="border rounded-xl p-4 w-[150px] bg-rose-500 text-white">예약 취소하기</button>
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
