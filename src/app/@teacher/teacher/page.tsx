'use client';

import useTeacherStore from '@/hooks/authStore.ts/store';
import Link from 'next/link';

export default function TeachertModal() {
  //state = setIsTeacher함수를 선택해 반환하여 setIsTeacher상태를 업데이트할 수 있게
  const setIsTeacher = useTeacherStore((state) => state.setIsTeacher);

  const onTeacterSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isTeacherValue = e.currentTarget.value === '선생님';
    setIsTeacher(isTeacherValue);
  };

  return (
    <div className="shadow-lg w-full h-full flex bg-black bg-opacity-70 justify-center align-middle items-center ">
      <div className="flex flex-col items-center">
        <p>로고</p>
        <button value="선생님" name="teacher" type="button" onClick={onTeacterSubmit}>
          선생님
        </button>
        <button value="수강생" name="student" type="button" onClick={onTeacterSubmit}>
          수강생
        </button>
        <Link href="/signin">확인</Link>
      </div>
    </div>
  );
}
