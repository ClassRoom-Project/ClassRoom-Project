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
    <div className="relative w-full">
      <button
        onClick={handleMyPageIconOnClick}
        className="flex w-full flex-col items-center whitespace-nowrap text-background-color transition ease-in hover:text-main-color md:text-icon-color"
      >
        <GoPerson className="text-4xl sm:text-4xl md:text-4xl" />
        <div className="hidden sm:flex md:sm:flex">마이페이지</div>
      </button>
    </div>
  );
};

export default MyPageBtn;
