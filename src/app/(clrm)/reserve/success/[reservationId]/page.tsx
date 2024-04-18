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

type ReserveInfoLabels = {
  icon: React.ReactNode;
  title: string;
  description: string;
}[];

const ReservationCompletePage = ({ params }: { params: { reservationId: string } }) => {
  const reservationid = params.reservationId;
  const { reservationDetails, isError, isLoading } = useFetchReservationDetail(reservationid);
  const [dataSaved, setDataSaved] = useState(false);

  useEffect(() => {
    if (!isLoading && !isError && reservationDetails && !dataSaved) {
      insertNotice(reservationDetails.userId, reservationDetails.classId, reservationDetails.class.title)
        .then((noticeData) => {
          setDataSaved(true);
        })
        .catch((error) => {
          console.error('Failed to save notification:', error);
        });
    }
  }, [isLoading, isError, reservationDetails, dataSaved]);

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
    <div className=" min-w-100vw flex flex-col mx-16 mobile:m-0  md:mx-16 lg:mx-20 sm:bg-gray-600 md:bg-amber-300 lg:bg-400 bg-black">
      <div className="w-full min-h-100vh-header  box-border bg-light-purple  flex justify-center mobile:justify-start mobile:py-2 items-center flex-col text-gray-700">
        <div className=" mobile:w-11/12 lg:w-1/2 xl:min-w-1/2 sm:w-11/12 md:w-3/4  md:min-w-[500px] lg:min-w-[600px]  2xl:w-1/2   justify-center min-h-[600px] bg-white shadow rounded-md items-center flex flex-col px-12 mobile:px-6 pt-12 pb-8">
          {!isLoading && !isError ? (
            <>
              <FiCheckCircle color="#38c557" className="mb-6" size={70} />
              <h1 className="text-2xl font-bold sm:text-xl  text-center md:text-xl xl:text-2xl lg:text-2xl mobile:text-base">
                클래스 예약이 정상적으로 처리되었습니다.
              </h1>
              <div className="divider mx-0 sm:my-4 mobile:my-2"></div>
              <div className="flex flex-col items-center w-full justify-center">
                <div className="flex flex-col bg-base-200 mobile:text-sm sm:w-4/5 md:w-3/4 lg:w-3/5 rounded-lg   py-4 items-center mb-5 gap-2">
                  <p className="text-xl font-bold text-center mx-4 mobile:text-sm sm:text-lg">
                    {reservationDetails?.class.title}
                  </p>
                  <div className="flex gap-4">
                    <p>{reservationDetails?.class.classType} </p>
                    <div className="flex justify-center items-center gap-1"></div>
                  </div>
                </div>
                {/* mobile:ml-4 md:ml-16 lg:ml-20 */}
                <div className="flex flex-col gap-4 font-bold sm:ml-4 w-10/12">
                  {reserveInfoLabels.map(({ icon, title, description }) => (
                    <div key={title} className="flex gap-2 w-full">
                      <div className="flex flex-row gap-2 justify-center items-center">
                        <p className=" text-right">{icon}</p>
                        <p className="mobile:hidden sm:flex">{title}</p>
                      </div>
                      <p className="text-left text-gray-600 font-normal">{description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="divider mb-4 mt-10 mobile:mt-4 mobile:mb-2"></div>
              <NavigationButtons />
            </>
          ) : isError ? (
            <div className="flex flex-col justify-center items-center">
              <RiErrorWarningLine size={100} color="#6C5FF7" />
              <p className="font-bold text-lg mt-5">예약을 완료하는 도중 오류가 발생했습니다. </p>
            </div>
          ) : (
            <div className="flex justify-center flex-col items-center gap-4">
              <span className="loading loading-spinner loading-lg bg-gray-400"></span>
              <p>잠시만 기다려주세요..</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationCompletePage;
