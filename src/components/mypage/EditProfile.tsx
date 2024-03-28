import Image from 'next/image';
import React from 'react';
import { CancleButton, EditButton } from '../common/mypage/button';

const EditProfile = () => {
  return (
    <div className="flex">
      <div className="flex flex-col items-center p-4 gap-4">
        <Image src="/profile-image.png" alt="기본 프로필 이미지" width={100} height={100} />
        <button className="border p-2">프로필 이미지 변경</button>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="m-4 p-4 gap-4">
            <p>닉네임</p>
            <input type="text" className="border" />
          </div>
          <div className="m-4 p-4">
            <p>이메일</p>
            <input type="text" className="border" />
          </div>
          <div className="m-4 p-4">
            <p>비밀번호</p>
            <input type="text" className="border" />
          </div>
          <div className="m-4 p-4">
            <p>비밀번호 확인</p>
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

export default EditProfile;
