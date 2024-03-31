import { UserType } from '@/types/user';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import BasicProfileImage from '../../../public/profile-image.png';
import { CancleButton, EditButton } from '../common/mypage/buttons';
import { getUserInfo, updateUserInfo } from '@/api/user-api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { userId } from '@/app/mypage/page';

const EditProfile = () => {
  const { data: userInfo, isPending }: { data: UserType | undefined; isPending: boolean } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserInfo()
  });

  const [newNickname, setNewNickname] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  useEffect(() => {
    if (userInfo) {
      setNewNickname(userInfo.nickname || '');
      setNewEmail(userInfo.email || '');
      setNewPassword(userInfo.password || '');
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
  // const { mutate: updateUserInfoMutation } = useMutation({
  //   mutationFn: ({ newNickname, newEmail, newPassword }: UpdateUserInfoType) =>
  //     updateUserInfo({ newNickname, newEmail, newPassword }),
  //   onSuccess
  // });

  // 수정하기 버튼 -> supabase에 수정한 정보 update
  const handleOnClickEditProfileBtn = () => {
    alert('프로필 정보 수정하기 버튼입니다.');
  };

  //   // 댓글 수정 mutation
  //   const { mutate: updateCommentMutation } = useMutation({
  //     mutationFn: ({ email, id, nextComment }: UpdateCommentType) =>
  //       updateComment({ nextComment, email, id }),
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({
  //         queryKey: ["comments"],
  //       });
  //     },
  //   });

  //     // 수정, 수정완료 버튼 핸들러
  // const handleEditHandler = (id: number) => {
  //   // 수정완료버튼
  //   if (isEdit) {
  //     if (nextComment !== comment.comment) {
  //       const confirm = window.confirm("수정하시겠습니까?");
  //       if (confirm) {
  //         // insert하는 api mutation 호출
  //         updateCommentMutation({ nextComment, email, id });
  //         setIsEdit((prev) => !prev);
  //       }
  //       return;
  //     } else if (nextComment === comment.comment) {
  //       alert("수정사항이 없습니다.");
  //     }
  // };

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
            <input type="text" className="border p-1" value={newNickname} onChange={handleOnChangeNickname} />
          </div>
          <div className="m-4 p-4">
            <p>이메일</p>
            <input type="text" className="border p-1" value={newEmail} onChange={handleOnChangeEmail} />
          </div>
          <div className="m-4 p-4">
            <p>비밀번호</p>
            <input type="text" className="border p-1" value={newPassword} onChange={handleOnChangePassword} />
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
