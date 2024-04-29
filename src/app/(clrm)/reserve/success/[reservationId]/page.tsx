'use client';

import React, { useEffect, useState } from 'react';
import { invalidReserve } from '@/components/common/Toastify';
import NavigationButtons from '@/components/reserve/reservationComplete/NavigationButtons';
import { useFetchReservationDetail } from '@/hooks/useReserve/useFetchReservationDetail';
import { ReservationDetailsType } from '@/types/reserve';
import { convertTimeTo12HourClock } from '@/utils/convertTimeTo12HourClock';
import { FiCalendar, FiCheckCircle, FiUserPlus, FiWatch } from 'react-icons/fi';
import { GrLocation } from 'react-icons/gr';
import { LuClock } from 'react-icons/lu';
import { PiCurrencyKrw } from 'react-icons/pi';
import { RiErrorWarningLine } from 'react-icons/ri';
import { insertNotice } from '@/app/api/reserve/insertNotice';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useQueryClient } from '@tanstack/react-query';

type ReserveInfoLabels = {
  icon: React.ReactNode;
  title: string;
  description: string;
}[];

const ReservationCompletePage = ({ params }: { params: { reservationId: string } }) => {
  const reservationid = params.reservationId;
  const { reservationDetails, isError, isLoading } = useFetchReservationDetail(reservationid);
  const [dataSaved, setDataSaved] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isLoading && !isError && reservationDetails && !dataSaved) {
      insertNotice(reservationDetails.userId, reservationDetails.classId, reservationDetails.class.title, queryClient)
        .then((noticeData) => {
          setDataSaved(true);
        })
        .catch((error) => {
          console.error('Failed to save notification:', error);
        });
    }
  }, [isLoading, isError, reservationDetails, dataSaved, queryClient]);

  if (isError) {
    invalidReserve();
  }

  // #region
  let reserveInfoLabels: ReserveInfoLabels = [];
  if (reservationDetails) {
    const {
      class: classInfo,
      time: dateInfo,
      reserveQuantity,
      reservePrice
    } = reservationDetails as ReservationDetailsType;
    reserveInfoLabels = [
      {
        icon: <FiUserPlus size={20} color="#8074FF" />,
        title: '신청 인원',
        description: `${reserveQuantity}명`
      },
      {
        icon: <FiCalendar size={20} color="#8074FF" />,
        title: '수강 일자',
        description: `${dateInfo.date.day}`
      },
      {
        icon: <FiWatch size={20} color="#8074FF" />,
        title: '수강 시간',
        description: `${reservationDetails && convertTimeTo12HourClock(dateInfo.times)}`
      },
      {
        icon: <LuClock size={20} color="#8074FF" />,
        title: '소요 시간',
        description: `총 ${classInfo.totalTime}시간`
      },
      {
        icon: <GrLocation size={20} color="#8074FF" />,
        title: '위치',
        description: `${classInfo.location}`
      },

      {
        icon: <PiCurrencyKrw size={20} color="#8074FF" />,
        title: '결제하신 금액',
        description: `${reservePrice.toLocaleString()}원`
      }
    ];
  }

  // #endregion

  return (
    <div className="min-w-100vw lg:bg-400 m-0 flex min-h-100vh-header-default flex-col">
      {!isLoading && !isError ? (
        <>
          <div className="flex min-h-100vh-header-default w-full flex-col items-center justify-center bg-light-purple py-4 pb-20 text-gray-700 md:p-0">
            <div className="flex w-11/12 flex-col items-center justify-center rounded-md bg-white px-6 pb-8 pt-12 shadow sm:px-12 md:w-4/5 md:min-w-[500px] lg:w-1/2 lg:min-w-[600px]">
              <FiCheckCircle color="#38c557" className="mb-4 sm:mb-6 " size={70} />
              <h1 className="text-center text-xl font-bold lg:text-2xl">클래스 예약이 정상적으로 처리되었습니다.</h1>
              <div className="divider mx-0 my-2 sm:my-4"></div>
              <div className="flex w-full flex-col items-center justify-center">
                <div className="mb-5 flex flex-col items-center gap-2 rounded-lg bg-base-200 py-4 text-sm sm:w-4/5 md:w-4/5  lg:w-8/12 ">
                  <p className=" mx-4 text-center text-base  font-bold ">{reservationDetails?.class.title}</p>
                  <div className="flex gap-4">
                    <p>{reservationDetails?.class.classType} </p>
                    <div className="flex items-center justify-center gap-1"></div>
                  </div>
                </div>
                <div className="max-w-10/12 flex w-2/3 flex-col gap-4 truncate font-bold sm:w-8/12 md:w-2/3 lg:w-[45%] lg:min-w-[290px] 2xl:max-w-[500px]">
                  {reserveInfoLabels.map(({ icon, title, description }) => (
                    <div key={title} className="flex w-full gap-2">
                      <div className="flex flex-row items-center justify-center gap-2">
                        <p className="text-right">{icon}</p>
                        <p className="mr-2 hidden flex-shrink-0 sm:flex">{title}</p>
                      </div>
                      <p className={`truncate text-left text-sm font-normal text-gray-600 sm:font-normal md:text-base`}>
                        {description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="divider mb-2 mt-4"></div>
              <NavigationButtons />
            </div>
          </div>
        </>
      ) : isError ? (
        <div className="flex min-h-100vh-header-default flex-col  items-center justify-center gap-4 bg-light-purple">
          <RiErrorWarningLine size={100} color="#6C5FF7" />
          <p className="mt-5 text-lg font-bold">예약을 완료하는 도중 오류가 발생했습니다. </p>
        </div>
      ) : (
        <div className="flex min-h-100vh-header-default flex-col  items-center justify-center gap-4 bg-light-purple">
          <LoadingSpinner />
          <p>잠시만 기다려주세요..</p>
        </div>
      )}
    </div>
  );
};

export default ReservationCompletePage;
