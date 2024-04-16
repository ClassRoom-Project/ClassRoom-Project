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
        className="p-4 flex flex-col items-center cursor-pointer hover:text-main-color transition ease-in"
      >
        <SlNote size={30} />
        클래스 등록
      </button>
    </div>
  );
};

export default CreateBtn;
