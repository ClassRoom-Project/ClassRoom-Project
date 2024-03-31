import { GoToClassPost } from '@/components/common/mypage/buttons';
import Image from 'next/image';
import React from 'react';
import MyClassImage from '../../../../public/class-sample-img.jpeg';

const MyComments = () => {
  return (
    <article className="flex  gap-4">
      <div className="w-[300px] h-[200px]">
        <Image
          src={MyClassImage}
          alt="클래스 대표 사진"
          width={300}
          height={200}
          className="w-full h-full p-4"
          style={{ objectFit: 'contain' }}
        />
      </div>

      {/* dummyData로 임시로 넣은 클래스 정보 부분입니다.*/}
      <div className="flex flex-col p-4">
        <section className="flex gap-8">
          <p className="font-bold">맛있는 쿠키 만들기 클래스</p>
          <div className="flex gap-4">
            <span>2024-04-15</span>
            <time>15:00</time>
          </div>
        </section>

        <section className="p-4">
          <textarea name="" placeholder="후기를 작성해봅시다" id="" className="w-[500px] max-h-[100px] border" />
          <div className="flex justify-end gap-4 ">
            <button className="border rounded-xl p-2 w-[50px]">수정</button>
            <button className="border rounded-xl p-2 w-[50px]  bg-rose-500 text-white">삭제</button>
          </div>
        </section>
        <div className=" flex justify-end">
          <GoToClassPost />
        </div>
      </div>
    </article>
  );
};

export default MyComments;
