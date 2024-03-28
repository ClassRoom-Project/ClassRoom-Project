import NavigationButtons from '@/components/reserve/reservationComplete/NavigationButtons';
import React from 'react';

const reservationCompletePage = ({ params }: { params: { rid: string } }) => {
  const reservationId = decodeURIComponent(params.rid);
  console.log(reservationId);

  return (
    <div className="w-[1600px] h-[800px]">
      <h1 className="text-xl">예약 완료</h1>
      <div className="w-full h-full bg-gray-200 p-6 flex flex-col justify-between items-center">
        <h1 className="text-xl text-center">예약이 정상적으로 처리되었습니다..</h1>
        <div className="flex flex-col w-1/3 gap-6">
          <div className="flex w-full justify-between gap-4">
            <span className="w-20 text-right">클래스명</span>
            <span className="w-52 text-center">[요리] 쫀득쫀득 스모어쿠키</span>
          </div>
          <div className="flex w-full justify-between gap-4">
            <span className="w-20 text-right">이용 일자</span>
            <span className="w-52 text-center"> 2024-03-26 </span>
          </div>
          <div className="flex w-full justify-between gap-4">
            <span className="w-20 text-right">이용 회차</span>
            <span className="w-52 text-center"> 16:00 (1회차) </span>
          </div>
          <div className="flex w-full justify-between gap-4">
            <span className="w-20 text-right">이용 인원</span>
            <span className="w-52 text-center"> 1 명 </span>
          </div>
          <div className="flex w-full justify-between gap-4">
            <span className="w-20 text-right">이용 금액</span>
            <span className="w-52 text-center"> 50,000원 </span>
          </div>
        </div>
        <NavigationButtons />
      </div>
    </div>
  );
};

export default reservationCompletePage;
