import { UpdateProfileImageType, UserInfoType, UserType } from '@/types/user';
import Image from 'next/image';
import { ChangeEvent, ChangeEventHandler, MutableRefObject, useRef, useState } from 'react';
import BasicProfileImage from '../../../public/profile-image.png';
import Link from 'next/link';
import { supabase } from '@/app/api/supabase/supabase';

interface UploadImageType {
  data: Promise<{ data: { path: string }; error: null } | { data: null; error: StorageError }>;
  error: Promise<{ data: { path: string }; error: null } | { data: null; error: StorageError }>;
}
const EditProfileImage = ({ userInfo }: { userInfo: UserType }) => {
  const [updateProfileImage, setUpdateProfileImage] = useState(userInfo.profile_image);

  const fileInput: MutableRefObject<null> = useRef(null);

  // 프로필 이미지 수정 버튼 클릭
  const handleOnClickEditImageBtn = () => {
    fileInput.current.click();
  };

  // 수정된 프로필 이미지 반영
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File = e.target.files[0];
    if (!file) {
      return;
    }

    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setUpdateProfileImage(imgUrl);
    }
  };

  // supabase storage에 프로필 이미지 업로드
  const uploadProfileImage = async (file: File) => {
    const randomUUID = crypto.randomUUID();
    const filePath = `profileImage/${randomUUID}`;
    const { data, error } = await supabase.storage.from('profileImages').upload(filePath, updateProfileImage);
    if (error) {
      console.error('파일 업로드 실패 :', error);
      return null;
    } else {
      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.path}`;
      console.log('url', url);
      return setUpdateProfileImage(url);
    }
  };

  uploadProfileImage(updateProfileImage);
  console.log('updateProfileImage', updateProfileImage);

  // const randomUUID = self.crypto.randomUUID();
  // const filePath = email + randomUUID;
  // const handleUpdateSubmit = async () => {
  //   if (!updateNickName && !updateImage) {
  //     return alert("변경 사항이 없습니다"), setIsOpenModal(false);
  //   }
  //   //둘다 변경했을때
  //   if (updateNickName && updateImage) {
  //     const img = fileInputRef.current.files[0];
  //     const data: any = await uploadImage(img, filePath);
  //     const { data: createPublicUrl } = supabase.storage
  //       .from("profileImage")
  //       .getPublicUrl(data.path);
  //     const imageUrl = createPublicUrl.publicUrl;
  //     const updateData = {
  //       nickname: updateNickName,
  //       profile_img: imageUrl,
  //       email,
  //     };
  //     updateMutate.mutate(updateData);
  //     alert("프로필 수정 완료!");
  //     setUpdateImage("");
  //     setUpdateNickName("");
  //     setIsOpenModal(false);
  //   }

  return (
    <div>
      <div className="flex flex-col items-center p-4 gap-4">
        {/* <Image src={BasicProfileImage} alt="기본 프로필 이미지" width={100} height={100} /> */}
        <Link href="#" onClick={() => fileInput.current.click()}>
          <img src={updateProfileImage} width={100} height={100} alt="프로필 이미지" />
        </Link>
        <input
          type="file"
          name="image_URL"
          id="input-file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInput}
          onChange={handleImage}
        />
        <button className="border p-2" onClick={handleOnClickEditImageBtn}>
          프로필 이미지 변경
        </button>
      </div>
    </div>
  );
};

export default EditProfileImage;
