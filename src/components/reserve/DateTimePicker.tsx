'use client';

import useReserveStore from '@/store/reserveClassStore';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import React, { useEffect, useState } from 'react';
import { CaptionProps, DateFormatter, DayPicker, useNavigation } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { SlArrowLeft } from 'react-icons/sl';
import { SlArrowRight } from 'react-icons/sl';

const DateTimePicker = ({ classDates, classTimes }: { classDates: string[]; classTimes: string[] }) => {
  const setReserveInfo = useReserveStore((state) => state.setReserveInfo);

  const [selectedTime, setSelectedTime] = useState(classTimes[0]);

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
  };

  // 리액트 데이피커 ------------------------------------------------------------------
  const today = new Date();
  const [selectedDate, setSelected] = useState<string>(format(today, 'yyyy-MM-dd'));

  // 날짜 클릭시
  const handleDateChange = (newDate: Date | undefined) => {
    setSelected(format(newDate as Date, 'yyyy-MM-dd'));
  };

  // 비활성화 할 날짜 배열

  const dayList: number[] = Array.from({ length: 31 }, (_, index) => index);

  // DB에 있는 날짜에서 일자만 따로 생성한 배열
  const dateList = classDates.map((item) => new Date(item).getDate());

  // 1~31 일중 DB에 있는 날짜를 삭제한 배열 생성
  const newList = dayList.filter((item) => {
    return !dateList.includes(item);
  });

  // 속성으로 할당할 date 배열 생성
  const nonAvailableDays = newList.map((day) => {
    return new Date(2024, 3, day);
  });

  const disabledDays = nonAvailableDays;

  // 상단의 날짜 레이블 포맷팅
  const formatCaption: DateFormatter = (Date, options) => {
    return (
      <>
        <span className="mr-1">{format(Date, 'uuuu', { locale: options?.locale })}년</span>
        <span> {format(Date, 'LLLL', { locale: options?.locale })}</span>
      </>
    );
  };

  useEffect(() => {
    setReserveInfo({ reserveDate: selectedDate, reserveTime: selectedTime });
  }, [selectedDate, selectedTime, setReserveInfo]);

  function CustomCaption(props: CaptionProps) {
    const { goToMonth, nextMonth, previousMonth } = useNavigation();
    return (
      <div className="flex justify-between">
        <button disabled={!previousMonth} onClick={() => previousMonth && goToMonth(previousMonth)}>
          <SlArrowLeft size={14} />
        </button>
        {format(props.displayMonth, 'uuuu년 LLLL', { locale: ko })}
        <button disabled={!nextMonth} onClick={() => nextMonth && goToMonth(nextMonth)}>
          <SlArrowRight size={14} />
        </button>
      </div>
    );
  }

  return (
    <div className="w-2/5 flex flex-col gap-4">
      <div>
        <h1 className="mb-1">날짜 선택</h1>
        <div>
          <DayPicker
            mode="single" // 여러 날짜 선택 시 multiple
            required
            selected={new Date(selectedDate)}
            onSelect={handleDateChange}
            fromYear={2024}
            toYear={2024}
            disabled={disabledDays}
            locale={ko}
            formatters={{ formatCaption }}
            components={{
              Caption: CustomCaption
            }}
          />
        </div>
      </div>
      <div>
        <h1 className="mb-1">시간 선택</h1>
        <div className="flex gap-2">
          {classTimes.map((time) => {
            return (
              <button
                key={crypto.randomUUID()}
                onClick={() => handleTimeClick(time)}
                className={`px-4 py-1 text-lg ${
                  time === selectedTime ? 'bg-rose-200' : 'bg-white'
                } tracking-wide rounded-lg`}
              >
                {time.slice(0, 5)}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <h1 className="mb-1">선택하신 수강일</h1>
        <span>
          {`${selectedDate}`} {selectedTime.slice(0, 5)}
        </span>
      </div>
    </div>
  );
};

export default DateTimePicker;
