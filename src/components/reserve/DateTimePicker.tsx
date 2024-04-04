'use client';

import React, { useEffect, useState } from 'react';
import useReserveStore from '@/store/reserveClassStore';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CaptionProps, DayPicker } from 'react-day-picker';
import { convertTimeTo12HourClock } from '@/utils/convertTimeTo12HourClock';
import 'react-day-picker/dist/style.css';
import './day-picker.css';

const DateTimePicker = ({ classDateList, classTimeList }: { classDateList: string[]; classTimeList: string[] }) => {
  const setReserveInfo = useReserveStore((state) => state.setReserveInfo);
  const [selectedTime, setSelectedTime] = useState(classTimeList[0]);
  const [selectedDate, setSelectedDate] = useState<string>(classDateList[0]);
  const today = new Date();

  useEffect(() => {
    setReserveInfo({ reserveDate: selectedDate, reserveTime: selectedTime });
  }, [selectedDate, selectedTime, setReserveInfo]);

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
  };

  /* 데이피커 */
  // 상단의 날짜 레이블 포맷팅 ex) 2024년 4월
  function CustomCaption(props: CaptionProps) {
    return <div className="flex justify-center">{format(props.displayMonth, 'uuuu년 LLLL', { locale: ko })}</div>;
  }

  const handleDateChange = (newDate: Date | undefined) => {
    setSelectedDate(format(newDate as Date, 'yyyy-MM-dd'));
  };

  // 1~31일 배열 생성
  const dayList: number[] = Array.from({ length: 31 }, (_, index) => index + 1);

  // DB에 있는 날짜에서 일자만 따로 생성한 배열 [1, 3, 6]..
  const availableDays = classDateList.map((date) => new Date(date).getDate());

  // 1~31 일중 DB에 있는 날짜를 삭제한 배열 생성
  const nonAvailableDays = dayList.filter((day) => {
    return !availableDays.includes(day);
  });

  // 속성으로 할당할 date 배열 생성
  const nonAvailableDates = nonAvailableDays.map((day) => {
    return new Date(2024, today.getMonth(), day);
  });

  return (
    <div className="w-2/5 flex flex-col gap-4">
      <div>
        <h1 className="mb-1">날짜 선택</h1>
        <div>
          <DayPicker
            mode="single" // 여러 날짜 선택 시 multiple
            required
            disableNavigation
            selected={new Date(selectedDate)}
            onSelect={handleDateChange}
            disabled={nonAvailableDates}
            locale={ko}
            components={{
              Caption: CustomCaption
            }}
          />
        </div>
      </div>
      <div>
        <h1 className="mb-1">시간 선택</h1>
        <div className="flex gap-2">
          {classTimeList.map((time, index) => {
            return (
              <button
                key={classTimeList[index]}
                onClick={() => handleTimeClick(time)}
                className={`px-4 py-1 text-lg ${
                  time === selectedTime ? 'bg-rose-200' : 'bg-white'
                } tracking-wide rounded-lg`}
              >
                {convertTimeTo12HourClock(time)}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <h1 className="mb-1">선택하신 수강일</h1>
        <span>
          {`${selectedDate}`} {convertTimeTo12HourClock(selectedTime)}
        </span>
      </div>
    </div>
  );
};

export default DateTimePicker;
