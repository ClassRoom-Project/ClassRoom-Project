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
    <div className="flex gap-8">
      <Link href="/" className="btn bg-white border border-point-purple  border-solid w-48 p-4 text-center self-end">
        홈 바로가기
      </Link>
      <button
        onClick={handleCheckClassReservation}
        className="btn bg-point-purple  text-white font-normal w-48 p-4 text-center self-end"
      >
        예약 상세 보기
      </button>
    </div>
  );
};

export default NavigationButtons;
