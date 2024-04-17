import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useUserRoleStore } from '@/store/mypage/userRoleStore';
import { useRouter } from 'next/navigation';
import React from 'react';
import { GoPerson } from 'react-icons/go';

const MyPageBtn = () => {
  const { isTeacher } = useUserRoleStore();
  const { loginUserId } = useLoginStore();
  const router = useRouter();

  // 임시로 넣어놓고 => mypage에서 접근제한 걸기
  const handleMyPageIconOnClick = () => {
    if (loginUserId) {
      if (isTeacher) {
        router.push('/teacherMypage');
      } else {
        router.push('/studentMypage');
      }
    } else {
      const confirm = window.confirm('로그인 후 이용이 가능합니다. 로그인 페이지로 이동 하시겠습니까?');
      if (confirm) {
        router.push('/hello');
      }
    }
  };
  return (
    <div>
      <button
        onClick={handleMyPageIconOnClick}
        className="py-4 flex flex-col items-center cursor-pointer hover:text-main-color transition ease-in whitespace-nowrap"
      >
        <GoPerson size={30} />
        마이페이지
      </button>
    </div>
  );
};

export default MyPageBtn;
