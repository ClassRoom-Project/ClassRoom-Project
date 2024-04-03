'use client';

import useReserveStore from '@/store/reserveClassStore';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import React, { useEffect, useState } from 'react';
import { CaptionProps, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import './day-picker.css';

const DateTimePicker = ({ classDateList, classTimeList }: { classDateList: string[]; classTimeList: string[] }) => {
  const setReserveInfo = useReserveStore((state) => state.setReserveInfo);

  const today = new Date();
  const [selectedTime, setSelectedTime] = useState(classTimeList[0]);
  const [selectedDate, setSelectedDate] = useState<string>(classDateList[0]);

  useEffect(() => {
    setReserveInfo({ reserveDate: selectedDate, reserveTime: selectedTime });
  }, [selectedDate, selectedTime, setReserveInfo]);

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
  };

  // 리액트 데이피커 ------------------------------------------------------------------

  // 날짜 클릭시 set
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

  // 상단의 날짜 레이블 포맷팅 ex) 2024년 4월
  function CustomCaption(props: CaptionProps) {
    return <div className="flex justify-center">{format(props.displayMonth, 'uuuu년 LLLL', { locale: ko })}</div>;
  }

  // 24시간제를 12시간제로 변환하는 함수
  const ConvertTimeTo12HourClock = (classTime: string) => {
    const hour = Number(classTime.slice(0, 2));
    const minute = classTime.slice(2, 5);

    // 시간이 12 초과 (오후)
    if (hour > 12) {
      const pmHour = hour - 12;
      const formatHour = pmHour < 10 ? '0' + pmHour : pmHour;
      return formatHour + minute + ' PM';

      // 시간이 12 미만 (오전) && 00시가 아닐 때
    } else if (hour < 12 && hour !== 0) {
      const amHour = hour;
      const formatHour = amHour < 10 ? '0' + amHour : amHour;
      return formatHour + minute + ' AM';

      // 00시, 12시일 경우
    } else {
      return hour === 0 ? 12 + minute + ' AM' : 12 + minute + ' PM';
    }
  };

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
                {ConvertTimeTo12HourClock(time)}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <h1 className="mb-1">선택하신 수강일</h1>
        <span>
          {`${selectedDate}`} {selectedTime}
        </span>
      </div>
    </div>
  );
};

export default DateTimePicker;
