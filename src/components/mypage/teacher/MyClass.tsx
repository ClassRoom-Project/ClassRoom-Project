import { GoToClassPost } from '@/components/common/mypage/button';
import Image from 'next/image';
import React from 'react';

const MyClass = () => {
  return (
    <article className="flex gap-4">
      <div className="w-[300px] h-[200px]">
        <Image
          src="/class-sample-img.jpeg"
          alt="클래스 대표 사진"
          width={300}
          height={200}
          className="w-full h-full p-4"
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="flex flex-col p-4">
        <div>
          <p>맛있는 쿠키 만들기 클래스 </p>
          <div className="flex gap-4">
            <span>2024-04-15</span>
            <span>15:00</span>
          </div>
        </div>
        <div className="flex gap-4 m-4">
          <button className="border rounded-xl p-4 w-[150px]  bg-rose-500 text-white">클래스 삭제하기</button>
          <button className="border rounded-xl p-4 w-[150px]">수강생 보기</button>
          <GoToClassPost />
        </div>
      </div>
    </article>
  );
};

export default MyClass;
