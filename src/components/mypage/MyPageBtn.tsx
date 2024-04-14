import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useRouter } from 'next/navigation';
import React from 'react';
import { GoPerson } from 'react-icons/go';

const MyPageBtn = () => {
  const { loginUserId } = useLoginStore();
  const router = useRouter();

  // 임시로 넣어놓고 => mypage에서 접근제한 걸기
  const handleMyPageIconOnClick = () => {
    if (loginUserId) {
      router.push('/mypage');
    } else {
      const confirm = window.confirm('로그인 후 이용이 가능합니다. 로그인 페이지로 이동 하시겠습니까?');
      if (confirm) {
        router.push('/hello');
      }
    }
  };
  return (
    <div>
      <button onClick={handleMyPageIconOnClick} className="p-4 flex flex-col items-center cursor-pointer">
        <GoPerson size={30} />
        MYPAGE
      </button>
    </div>
  );
};

export default MyPageBtn;
