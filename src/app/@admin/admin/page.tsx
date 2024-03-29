'use client';

import useAdminStore from '@/hooks/authStore.ts/store';
import { useRouter } from 'next/navigation';

export default function AdminModal() {
  const router = useRouter();
  //state = setIsAdmin함수를 선택해 반환하여 isAdmin상태를 업데이트할 수 있게
  const setIsAdmin = useAdminStore((state) => state.setIsAdmin);

  const onAdminSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isAdminValue = e.currentTarget.value === '선생님';
    setIsAdmin(isAdminValue);
  };

  const nextLoginModal = () => {
    router.push('/signin');
  };

  return (
    <div className="shadow-lg w-full h-full flex bg-black bg-opacity-70 justify-center align-middle items-center ">
      <div className="flex flex-col items-center">
        <p>로고</p>
        <button value="선생님" name="admin" type="button" onClick={onAdminSubmit}>
          선생님
        </button>
        <button value="수강생" name="admin" type="button" onClick={onAdminSubmit}>
          수강생
        </button>
        <button onClick={nextLoginModal}>확인</button>
      </div>
    </div>
  );
}
