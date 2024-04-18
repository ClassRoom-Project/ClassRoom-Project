import { useUserRoleStore } from '@/store/mypage/userRoleStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const NavigationButtons = () => {
  const { isTeacher, setIsTeacher } = useUserRoleStore();
  const router = useRouter();

  const handleCheckClassReservation = () => {
    if (!isTeacher) {
      router.push('/studentMypage?studentTab=reservedClass');
    } else {
      if (window.confirm('클래스 예약 확인은 수강생 마이페이지에서 가능합니다. 수강생으로 전환하시겠습니까?')) {
        setIsTeacher(false);
        router.push('/studentMypage?studentTab=reservedClass');
      }
    }
  };

  return (
    <div className="flex md:flex md:w-full gap-8 md:justify-center mobile:flex-col mobile:gap-2 sm:flex-col sm:gap-2 sm:w-full mobile:w-full md:flex-row">
      <Link
        href="/"
        className="btn sm:w-full md:w-1/3  lg:w-1/3 mobile:w-full bg-white border border-button-focus-color  border-solid w-38 p-4 text-center self-end hover:bg-background-color hover:border-button-default-color"
      >
        홈 바로가기
      </Link>
      <button
        onClick={handleCheckClassReservation}
        className="btn sm:w-full md:w-1/3 lg:w-1/3 mobile:w-full bg-point-purple  text-white font-normal w-48 p-4 text-center self-end hover:bg-button-hover-color"
      >
        예약 상세 보기
      </button>
    </div>
  );
};

export default NavigationButtons;
