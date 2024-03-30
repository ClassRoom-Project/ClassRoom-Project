import Image from 'next/image';
import React, { useState } from 'react';
import { CancleButton, EditButton } from '../common/mypage/buttons';
import { UserType } from '@/types/user';
import { useGetUserInfo } from '@/hooks/mypage/useGetUserInfo';
import BasicProfileImage from '../../../public/profile-image.png';

const EditProfile = () => {
  const userInfo = useGetUserInfo();
  // console.log('userInfo', userInfo);
  const [nickname, setNickname] = useState(userInfo?.nickname);
  const [email, setEmail] = useState(userInfo?.email);
  const [password, setPassword] = useState(userInfo?.password);

  const handleOnChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleOnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  if (!userInfo) {
    return <div>로딩 중...</div>;
  }
  return (
    <div className="flex">
      <div className="flex flex-col items-center p-4 gap-4">
        <Image src={BasicProfileImage} alt="기본 프로필 이미지" width={100} height={100} />
        <button className="border p-2">프로필 이미지 변경</button>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="m-4 p-4 gap-4">
            <p>닉네임</p>
            <input type="text" className="border p-1" value={nickname} onChange={handleOnChangeNickname} />
          </div>
          <div className="m-4 p-4">
            <p>이메일</p>
            <input type="text" className="border p-1" value={email} onChange={handleOnChangeEmail} />
          </div>
          <div className="m-4 p-4">
            <p>비밀번호</p>
            <input type="text" className="border p-1" value={password} onChange={handleOnChangePassword} />
          </div>
          <div className="m-4 p-4">
            <p>비밀번호 확인</p>
            <input type="text" className="border p-1" />
          </div>
        </div>
        <div className="m-4 p-4 flex gap-4">
          <EditButton />
          <CancleButton />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
