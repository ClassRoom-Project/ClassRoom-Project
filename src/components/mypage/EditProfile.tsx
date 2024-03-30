import { UserType } from '@/types/user';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import BasicProfileImage from '../../../public/profile-image.png';
import { CancleButton, EditButton } from '../common/mypage/buttons';
import { getUserInfo } from '@/api/user-api';
import { useQuery } from '@tanstack/react-query';
import { userId } from '@/app/mypage/page';

const EditProfile = () => {
  const { data: userInfo, isPending }: { data: UserType | undefined; isPending: boolean } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserInfo()
  });

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  useEffect(() => {
    if (userInfo) {
      setNickname(userInfo.nickname || '');
      setEmail(userInfo.email || '');
      setPassword(userInfo.password || '');
      setCheckPassword(userInfo.password || '');
    }
  }, [userInfo]);

  if (isPending) {
    return <div> 로딩중 ... </div>;
  }

  if (!userInfo) {
    return <div> 유저 정보가 없습니다.</div>;
  }

  const handleOnChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleOnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleOnChangeCheckPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPassword(e.target.value);
  };

  const handleOnClickEditProfileBtn = () => {};

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
            <input type="text" className="border p-1" value={checkPassword} onChange={handleOnChangeCheckPassword} />
          </div>
        </div>
        <div className="m-4 p-4 flex gap-4">
          <button onClick={handleOnClickEditProfileBtn} className="p-4 border rounded-xl w-[150px]">
            수정하기
          </button>
          <CancleButton />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
