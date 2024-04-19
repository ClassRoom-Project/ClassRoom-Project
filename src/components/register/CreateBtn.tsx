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
    <div>
      <button
        onClick={handleCreateIconOnClick}
        className="flex flex-col items-center text-background-color hover:text-main-color transition ease-in md:text-icon-color whitespace-nowrap"
      >
        <SlNote className="text-4xl sm:text-4xl md:text-4xl" />
        <div className=" hidden sm:flex md:sm:flex">클래스 등록</div>
      </button>
    </div>
  );
};

export default CreateBtn;
