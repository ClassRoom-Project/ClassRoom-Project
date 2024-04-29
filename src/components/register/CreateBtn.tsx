import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SlNote } from 'react-icons/sl';

const CreateBtn = () => {
  const { loginUserId } = useLoginStore();
  const router = useRouter();

  const handleCreateIconOnClick = () => {
    if (loginUserId) {
      router.push('/register');
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
        onClick={handleCreateIconOnClick}
        className="flex w-full flex-col items-center whitespace-nowrap text-background-color transition ease-in hover:text-main-color md:text-icon-color"
      >
        <SlNote className="text-4xl sm:text-4xl md:text-4xl" />
        <div className=" hidden sm:flex md:sm:flex">클래스 등록</div>
      </button>
    </div>
  );
};

export default CreateBtn;
