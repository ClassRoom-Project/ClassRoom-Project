import { UpdateProfileImageType, UserInfoType, UserType } from '@/types/user';
import Image from 'next/image';
import { ChangeEvent, ChangeEventHandler, MutableRefObject, useRef, useState } from 'react';
import BasicProfileImage from '../../../public/profile-image.png';
import Link from 'next/link';
import { supabase } from '@/app/api/supabase/supabase';

const EditProfileImage = ({ userInfo }: { userInfo: UserType }) => {
  const [updateProfileImage, setUpdateProfileImage] = useState(userInfo?.profile_image);

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
      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.path}`;
      console.log('url', url);
      return setUpdateProfileImage(url);
    }
  };

  // 수정된 프로필 이미지 반영
  const handleOnChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    if (!file) {
      return;
    }

    const imgUrl = URL.createObjectURL(file);
    setUpdateProfileImage(imgUrl);
    console.log('imgUrl', imgUrl);

    // uploadProfileImage(file);
  };

  return (
    <div>
      <div className="flex flex-col items-center p-4 gap-4">
        <Image
          src={updateProfileImage}
          width={100}
          height={100}
          className="rounded-full"
          alt="프로필 이미지"
          unoptimized={true} // 추후 수정 해야함
        />
        <input
          type="file"
          name="image_URL"
          id="input-file"
          accept="image/*" // 모든 이미지 파일 형식 가능
          style={{
            display: 'none'
          }}
          ref={fileInput}
          onChange={handleOnChangeImage}
        />
      </div>
      <button className="btn p-4 bg-point-color text-white" onClick={handleOnClickEditImageBtn}>
        프로필 이미지 변경
      </button>
    </div>
  );
};

export default EditProfileImage;