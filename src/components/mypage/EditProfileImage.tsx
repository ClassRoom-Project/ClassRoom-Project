import { supabase } from '@/app/api/supabase/supabase';
import Image from 'next/image';
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react';
import basicProfileImage from '../../../public/profile-image.png';
import { useStartTyping } from 'react-use';
import { UserInfoType } from '@/types/user';

interface EditProfileImageProps {
  newProfileImage: string;
  isEditing: boolean;
  selectedImage: File | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>;
  userInfo: UserInfoType;
}

const EditProfileImage = ({
  newProfileImage,
  isEditing,
  selectedImage,
  setSelectedImage,
  userInfo
}: EditProfileImageProps) => {
  const fileInput = useRef<HTMLInputElement | null>(null);

  // 프로필 이미지 수정 버튼 클릭
  const handleOnClickEditImageBtn = () => {
    fileInput.current?.click();
  };

  // 수정된 프로필 이미지 반영
  const handleOnChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    // console.log('file', file);
    if (file) {
      setSelectedImage(file);
    } else {
      setSelectedImage(null);
    }
  };

  // 프로필 이미지가 없을 때, 기본 프로필 이미지 보여주기
  const profileImage = selectedImage
    ? URL.createObjectURL(selectedImage)
    : newProfileImage || userInfo.profile_image || basicProfileImage;

  return (
    <div>
      <div className="flex flex-col items-center p-4 gap-4">
        <Image
          src={profileImage}
          width={100}
          height={100}
          className="rounded-full"
          alt="프로필 이미지"
          unoptimized={true}
        />
        <input
          type="file"
          name="image_URL"
          accept="image/*" // 모든 이미지 파일 형식 가능
          style={{
            display: 'none'
          }}
          ref={fileInput}
          onChange={handleOnChangeImage}
        />
      </div>
      {isEditing ? (
        <button className="btn p-4 bg-point-color text-white" onClick={handleOnClickEditImageBtn}>
          프로필 이미지 변경
        </button>
      ) : (
        ''
      )}
    </div>
  );
};

export default EditProfileImage;
