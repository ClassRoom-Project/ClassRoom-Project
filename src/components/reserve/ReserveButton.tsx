'use client';

import { insertNewReservation } from '@/app/api/reserve/insertNewReservation';
import { sumReserveQuantityByTimeId } from '@/app/api/reserve/sumReserveQuantityByTimeId';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useReserveStore } from '@/store/reserveClassStore';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import { invalidReserve, quantityExceeded, quantityWarning, selectDayWarning } from '../common/Toastify';

type ReserveButtonParams = {
  classId: string;
  title: string;
  maxPeople: number;
};

const ReserveButton = ({ classId, title, maxPeople }: ReserveButtonParams) => {
  const router = useRouter();
  const { loginUserId } = useLoginStore();
  const { setReserveInfo, reserveInfo } = useReserveStore();
  const [isFreeClassReserveLoading, setIsFreeClassReserveLoading] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isMobile = () => {
    if (typeof window !== 'undefined') {
      const { userAgent, maxTouchPoints } = window.navigator; // 유저가 접속한 환경 정보 가져오기
      // MacOS를 실행하는 장치 중에서 터치 가능한 장치를(iPad) 확인
      const isMac = /Macintosh/i.test(userAgent);

      if (isMac && maxTouchPoints > 0) return true; // Macintosh이면서 터치 포인트가 1개 이상인 경우 iPad

      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobi|mobi/i.test(userAgent);
    } else return;
  };

  console.log(isMobile());

  useEffect(() => {
    setReserveInfo({ classId, userId: loginUserId });
    buttonRef.current?.removeAttribute('disabled');
  }, [classId, setReserveInfo, loginUserId]);

  const handleReserveButtonClick = async () => {
    if (!loginUserId) {
      if (window.confirm('로그인이 필요합니다. 로그인하시겠습니까?')) {
        router.push('/hello');
        return;
      } else return;
    }

    if (isMobile()) {
      alert('모바일 환경에서는 테스트 결제를 지원하지 않습니다. 결제 기능을 이용하시려면 PC 버전으로 접속해주세요. 😊');
      return;
    }

    if (reserveInfo.reserveQuantity === 0) {
      setIsFreeClassReserveLoading(false);
      quantityWarning();
      return;
    }

    if (!reserveInfo.timeId) {
      selectDayWarning();
      return;
    }

    // 예약 버튼을 눌렀을 때 count만 fetch해서 한번 더 체크
    const currentReservedQuantity = await sumReserveQuantityByTimeId(reserveInfo.timeId);
    const currentRemainingQuantity = maxPeople - currentReservedQuantity;
    if (currentRemainingQuantity < reserveInfo.reserveQuantity) {
      quantityExceeded();
      router.refresh();
      return;
    }

    // 무료 클래스 결제 없이 바로 예약 처리
    if (
      reserveInfo.reservePrice === 0 &&
      reserveInfo.classId &&
      reserveInfo.reserveQuantity &&
      reserveInfo.timeId &&
      reserveInfo.userId
    ) {
      if (
        window.confirm(
          '해당 클래스는 무료 클래스로 결제 과정 없이 예약됩니다. 예약 정보를 확인하신 후 확인 버튼을 눌러 예약을 완료해 주세요. '
        )
      ) {
        buttonRef.current?.setAttribute('disabled', 'true'); // 버튼을 비활성화하여 다중 제출 방지
        setIsFreeClassReserveLoading(true);

        try {
          const reserveId = await insertNewReservation({
            reserveId: crypto.randomUUID(),
            classId: reserveInfo.classId,
            reservePrice: reserveInfo.reservePrice,
            reserveQuantity: reserveInfo.reserveQuantity,
            timeId: reserveInfo.timeId,
            userId: reserveInfo.userId
          });

          setIsFreeClassReserveLoading(false);
          router.replace(`/reserve/success/${reserveId}`);
          return;
        } catch (error) {
          invalidReserve();
          buttonRef.current?.removeAttribute('disabled');
          console.log('무료 클래스 insertNewReservation 오류', error);
        }
      } else return;
    }

    router.replace(
      `/payment?orderId=${crypto.randomUUID()}&price=${reserveInfo.reservePrice}&classId=${
        reserveInfo.classId
      }&title=${title}&customerKey=${reserveInfo.userId}`
    );
  };

  return (
    <>
      {isFreeClassReserveLoading && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
          <LoadingSpinner />
        </div>
      )}
      <button
        ref={buttonRef}
        className={`btn w-full bg-point-purple tracking-wide text-white hover:bg-button-hover-color ${isFreeClassReserveLoading && 'btn-disabled'}`}
        onClick={handleReserveButtonClick}
      >
        결제하기
      </button>
    </>
  );
};

export default ReserveButton;
