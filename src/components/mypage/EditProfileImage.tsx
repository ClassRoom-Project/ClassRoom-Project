import { supabase } from '@/app/api/supabase/supabase';
import Image from 'next/image';
import { ChangeEvent, Dispatch, SetStateAction, useRef } from 'react';
import basicProfileImage from '../../../public/profile-image.png';
import { UserInfoType } from '@/types/user';
import { userInfo } from 'os';

interface EditProfileImageProps {
  newProfileImage: string;
  setNewProfileImage: Dispatch<SetStateAction<string>>;
  isEditing: boolean;
  userInfo: UserInfoType;
}

const EditProfileImage = ({ newProfileImage, setNewProfileImage, isEditing, userInfo }: EditProfileImageProps) => {
  const fileInput = useRef<HTMLInputElement | null>(null);

  // 프로필 이미지 수정 버튼 클릭
  const handleOnClickEditImageBtn = () => {
    fileInput.current?.click();
  };

  // supabase storage에 프로필 이미지 업로드
  const uploadProfileImage = async (file: File) => {
    const randomUUID = crypto.randomUUID();
    const filePath = `profile/${randomUUID}`;
    const { data, error } = await supabase.storage.from('profileImages').upload(filePath, file);
    if (error) {
      console.error('파일 업로드 실패 :', error);
      throw error;
    } else {
      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profileImages/${data.path}`;

      return setNewProfileImage(url);
    }
  };

  // 수정된 프로필 이미지 반영
  const handleOnChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    if (!file) {
      return;
    }

    const maxFileSize = 5 * 1024 * 1024;
    if (file.size > maxFileSize) {
      alert('파일첨부 사이즈는 5MB 이내로 가능합니다.');
      return;
    }

    uploadProfileImage(file);
  };

  // 프로필 이미지가 없을 때, 기본 프로필 이미지 보여주기
  const profileImage = newProfileImage ? newProfileImage || userInfo.profile_image : basicProfileImage;

  return (
    <div>
      <div className="flex flex-col items-center p-4 gap-4 w-[150px] h-[150px] rounded-full">
        <Image
          src={profileImage}
          width={100}
          height={100}
          className="w-full h-full rounded-full object-cover"
          alt="프로필 이미지"
          unoptimized={true}
        />
        <input
          type="file"
          name="image_URL"
          accept="image/*" // 모든 이미지 파일 형식 가능
          style={{
            display: 'none',
            objectFit: 'cover'
          }}
          ref={fileInput}
          onChange={handleOnChangeImage}
        />
      </div>
      {isEditing ? (
        <button
          className="btn p-4 bg-point-purple text-white rounded-full hover:bg-white hover:text-dark-purple-color"
          onClick={handleOnClickEditImageBtn}
        >
          프로필 이미지 변경
        </button>
      ) : (
        ''
      )}
    </div>
  );
};

export default EditProfileImage;
