import { CancleButton, EditButton } from '@/components/common/mypage/button';
import Image from 'next/image';
import React from 'react';

const EditTeacherInfo = () => {
  return (
    <div className="flex">
      <div className="flex flex-col items-center p-4 gap-4">
        <Image src="/profile-image.png" alt="기본 프로필 이미지" width={100} height={100} />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col">
          <form className="m-4 p-4 gap-4">
            <label className="m-4 p-4">직업</label>
            <select name="" id="" className="border w-40">
              <option value="">교사</option>
              <option value="">개발자</option>
              <option value="">예술가</option>
            </select>
          </form>
          <form className="m-4 p-4 gap-4">
            <label className="m-4 p-4">비지니스 분야</label>
            <select name="" id="" className="border w-40">
              <option value="">교육</option>
              <option value="">IT</option>
              <option value="">예술</option>
            </select>
          </form>
          <div className="m-4 p-4 ">
            <span>총 수익</span>
            <input type="text" className="border" />
          </div>
        </div>
        <div className="m-4 p-4">
          <EditButton />
          <CancleButton />
        </div>
      </div>
    </div>
  );
};

export default EditTeacherInfo;
