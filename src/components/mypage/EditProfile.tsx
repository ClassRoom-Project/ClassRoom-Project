import { userId } from '@/app/mypage/page';
import { UpdateUserInfoType, UserType } from '@/types/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import BasicProfileImage from '../../../public/profile-image.png';
import { CancleButton } from '../common/mypage/buttons';
import { getUserInfo, updateUserInfo } from '@/app/api/mypage/user-api';

const EditProfile = () => {
  const queryClient = useQueryClient();

  const { data: userInfo, isPending }: { data: UserType | undefined; isPending: boolean } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserInfo()
  });

  const [newNickname, setNewNickname] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setNewNickname(userInfo.nickname || '');
      setNewEmail(userInfo.email || '');
      setNewPassword(userInfo.password || '');
      setCheckPassword(userInfo.password || '');
    }
  }, [userInfo]);

  const handleOnChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(e.target.value);
  };
  const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
  };
  const handleOnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };
  const handleOnChangeCheckPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPassword(e.target.value);
  };

  // 유저 정보 수정하기 mutation
  const { mutate: updateUserInfoMutation } = useMutation({
    mutationFn: ({ newNickname, newEmail, newPassword }: UpdateUserInfoType) =>
      updateUserInfo({ newNickname, newEmail, newPassword }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user']
      });
      setIsEditing(false);
    }
  });

  // 수정하기 버튼 -> supabase에 수정한 정보 update
  const handleOnClickEditProfileBtn = () => {
    // 수정된 사항이 없는 경우
    const isNicknameChanged = newNickname !== userInfo?.nickname;
    const isEmailChanged = newEmail !== userInfo?.email;
    const isNewPasswordChanged = newPassword !== userInfo?.password;

    if (!isNicknameChanged && !isEmailChanged && !isNewPasswordChanged) {
      alert('수정 사항이 없습니다.');
      return;
    }

    // 수정된 사항이 있는 경우
    updateUserInfoMutation({ newNickname, newEmail, newPassword });
    alert('프로필 수정이 완료되었습니다.');
  };

  // 취소하기 버튼
  const handleOnClickCancleBtn = () => {
    setIsEditing(false);
    alert('프로필 수정이 취소 되었습니다. ');
  };
  if (isPending) {
    return <div> 로딩중 ... </div>;
  }

  if (!userInfo) {
    return <div> 유저 정보가 없습니다.</div>;
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
            {isEditing ? (
              <input type="text" className="border p-1" value={newNickname} onChange={handleOnChangeNickname} />
            ) : (
              <p>{newNickname}</p>
            )}
          </div>
          <div className="m-4 p-4">
            <p>이메일</p>
            {isEditing ? (
              <input type="text" className="border p-1" value={newEmail} onChange={handleOnChangeEmail} />
            ) : (
              <p>{newEmail}</p>
            )}
          </div>
          <div className="m-4 p-4">
            <p>비밀번호</p>
            {isEditing ? (
              <input type="text" className="border p-1" value={newPassword} onChange={handleOnChangePassword} />
            ) : (
              <p>******</p>
            )}
          </div>
          <div className="m-4 p-4">
            <p>비밀번호 확인</p>
            {isEditing ? (
              <input type="text" className="border p-1" value={checkPassword} onChange={handleOnChangeCheckPassword} />
            ) : (
              <p>******</p>
            )}
          </div>
        </div>
        <div className="m-4 p-4 flex gap-4">
          {isEditing ? (
            <button onClick={handleOnClickEditProfileBtn} className="p-4 border rounded-xl w-[150px]">
              수정 완료
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="p-4 border rounded-xl w-[150px]">
              수정하기
            </button>
          )}
          <button onClick={handleOnClickCancleBtn} className="p-4 border rounded-xl w-[150px]  bg-rose-500 text-white">
            취소하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
