'use client';

import { sumReserveQuantityByTimeId } from '@/app/api/reserve/sumReserveQuantityByTimeId';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useReserveStore } from '@/store/reserveClassStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { invalidReserve, quantityWarning, selectDayWarning } from '../common/Toastify';
import { insertNewReservation } from '@/app/api/reserve/insertNewReservation';
import LoadingSpinner from '../common/LoadingSpinner';

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

  useEffect(() => {
    setReserveInfo({ classId, userId: loginUserId });
  }, [classId, setReserveInfo, loginUserId]);

  const handleReserveButtonClick = async () => {
    if (!loginUserId) {
      if (window.confirm('로그인이 필요합니다. 로그인하시겠습니까?')) {
        router.push('/hello');
        return;
      } else return;
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
      alert('정원 초과로 인해 예약할 수 없습니다. ');
      router.refresh();
      return;
    }

    console.log(reserveInfo);

    // 무료 클래스 바로 예약 처리
    if (
      reserveInfo.reservePrice === 0 &&
      reserveInfo.classId &&
      reserveInfo.reserveQuantity &&
      reserveInfo.timeId &&
      reserveInfo.userId
    ) {
      console.log(isFreeClassReserveLoading);
      console.log(reserveInfo);
      console.log('무료클래스 예약할게요??');

      if (
        window.confirm(
          '해당 클래스는 무료 클래스로 결제 과정 없이 예약됩니다. 예약 정보를 확인하신 후 확인 버튼을 눌러 예약을 완료해 주세요. '
        )
      ) {
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
        className={`btn w-full bg-point-purple tracking-wide text-white hover:bg-button-hover-color ${isFreeClassReserveLoading && 'btn-disabled'}`}
        onClick={handleReserveButtonClick}
      >
        결제하기
      </button>
    </>
  );
};

export default ReserveButton;
