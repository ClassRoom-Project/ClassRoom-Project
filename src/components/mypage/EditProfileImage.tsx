import { UpdateProfileImageType, UserType } from '@/types/user';
import Image from 'next/image';
import { useState } from 'react';
import BasicProfileImage from '../../../public/profile-image.png';

interface EditProfileImageProp {
  userInfo: UserType;
}
const EditProfileImage = ({ userInfo }: { userInfo: EditProfileImageProp }) => {
  const [updateProfileImage, setUpdateProfileImage] = useState<UpdateProfileImageType>();
  const handleOnClickEditImageBtn = () => {
    alert('프로필 이미지를 변경합니다.');
  };
  return (
    <div>
      <div className="flex flex-col items-center p-4 gap-4">
        <Image src={BasicProfileImage} alt="기본 프로필 이미지" width={100} height={100} />
        <button className="border p-2" onClick={handleOnClickEditImageBtn}>
          프로필 이미지 변경
        </button>
      </div>
    </div>
  );
};

export default EditProfileImage;
