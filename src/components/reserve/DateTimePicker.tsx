'use client';

import React, { useEffect, useState } from 'react';
import { useCurrentReservedStore, useReserveStore } from '@/store/reserveClassStore';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CaptionProps, DayPicker } from 'react-day-picker';
import { convertTimeTo12HourClock } from '@/utils/convertTimeTo12HourClock';
import 'react-day-picker/dist/style.css';
import './day-picker.css';
import { DateList } from '@/types/date';
import { countReservationsByTimeId } from '@/app/api/reserve/countReservationsByTimeId';

const DateTimePicker = ({ classDates }: { classDates: DateList[] }) => {
  const setReserveInfo = useReserveStore((state) => state.setReserveInfo);
  const { setCurrentReservedCount } = useCurrentReservedStore();
  const [selectedTime, setSelectedTime] = useState(classDates[0].times[0].times);
  const [selectedDate, setSelectedDate] = useState(classDates[0].day);
  const [timeId, setTimeId] = useState(classDates[0].times[0].timeId);
  const today = new Date();

  useEffect(() => {
    setReserveInfo({ timeId: timeId });
  }, [selectedDate, selectedTime, timeId]);

  useEffect(() => {
    const setInitialReservedCount = async () => {
      const initialReservedCount = await countReservationsByTimeId(classDates[0].times[0].timeId);
      setCurrentReservedCount(initialReservedCount);
    };
    setInitialReservedCount();
  }, []);

  const handleTimeClick = async (times: string, timeId: string) => {
    setSelectedTime(times);
    setTimeId(timeId);

    const currentReservedAmount = await countReservationsByTimeId(timeId);
    setCurrentReservedCount(currentReservedAmount);
  };

  /* 데이피커 */
  // 상단의 날짜 레이블 포맷팅 ex) 2024년 4월
  function CustomCaption(props: CaptionProps) {
    return <div className="flex justify-center">{format(props.displayMonth, 'uuuu년 LLLL', { locale: ko })}</div>;
  }

  const handleDateChange = async (newDate: Date | undefined) => {
    const formattedDate = format(newDate as Date, 'yyyy-MM-dd');
    const firstAvailableTime = classDates.find(({ day }) => day === formattedDate)?.times[0];
    setSelectedDate(formattedDate);

    // 일자를 선택했을 때 첫 번째 시간으로 state를 set
    if (firstAvailableTime) {
      const { timeId, times } = firstAvailableTime;
      setSelectedTime(times);
      setTimeId(timeId);
    }

    // 일자를 선택했을 때 첫 번째 시간의 예약 인원수로 setCurrentReservedCount
    if (timeId) {
      const reservedCountOfSelectedDate = await countReservationsByTimeId(timeId);
      setCurrentReservedCount(reservedCountOfSelectedDate);
    }
  };

  /* 비활성화할 날짜 배열 생성 */
  // 1~31일 배열 생성
  const dayList: number[] = Array.from({ length: 31 }, (_, index) => index + 1);

  // DB에 있는 날짜에서 일자만 따로 생성한 배열 [1, 3, 6]..
  const availableDays = classDates.map(({ day }) => new Date(day).getDate());

  // 1~31 일중 DB에 있는 날짜를 삭제한 date 배열 생성
  const nonAvailableDays = dayList
    .filter((day) => {
      return !availableDays.includes(day);
    })
    .map((day) => {
      return new Date(2024, today.getMonth(), day);
    });

  return (
    <div className="w-2/5 flex flex-col gap-4">
      <div>
        <h1 className="mb-1">날짜 선택</h1>
        <div>
          <DayPicker
            mode="single"
            required
            disableNavigation
            selected={new Date(selectedDate)}
            onSelect={handleDateChange}
            disabled={nonAvailableDays}
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
          {classDates
            .filter((dateInfo) => dateInfo.day === selectedDate) // 선택한 날짜의 시간만 filter
            /* times배열:  각 시간의 고유id와 시간string이 한 쌍인 객체의 배열 */
            .map(({ times }) =>
              /* 각 시간의 정보 렌더링 */
              times.map((timeInfo) => (
                <button
                  key={timeInfo.timeId}
                  onClick={() => handleTimeClick(timeInfo.times, timeInfo.timeId)}
                  className={`px-4 py-1 text-lg ${
                    timeInfo.times === selectedTime ? 'bg-rose-200' : 'bg-white'
                  } tracking-wide rounded-lg`}
                >
                  {convertTimeTo12HourClock(timeInfo.times)}
                </button>
              ))
            )}
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
