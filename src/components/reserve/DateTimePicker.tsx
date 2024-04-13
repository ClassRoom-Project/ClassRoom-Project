'use client';

import React, { useEffect, useState } from 'react';
import { useCurrentReservedCountStore, useReserveStore } from '@/store/reserveClassStore';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CaptionProps, DayPicker } from 'react-day-picker';
import { convertTimeTo12HourClock } from '@/utils/convertTimeTo12HourClock';
import { DateList } from '@/types/date';
import { sumReserveQuantityByTimeId } from '@/app/api/reserve/sumReserveQuantityByTimeId';
import 'react-day-picker/dist/style.css';
import './day-picker.css'; // dist css 밑에 둬야 적용됨

const DateTimePicker = ({ classDates }: { classDates: DateList[] }) => {
  const { setReserveInfo } = useReserveStore();
  const { setCurrentReservedCount } = useCurrentReservedCountStore();
  const [selectedTime, setSelectedTime] = useState(classDates[0].times[0].times);
  const [selectedDate, setSelectedDate] = useState(classDates[0].day);
  const [timeId, setTimeId] = useState(classDates[0].times[0].timeId);
  const today = new Date();

  useEffect(() => {
    setReserveInfo({ timeId: timeId });
  }, [selectedDate, selectedTime, timeId, setReserveInfo]);

  useEffect(() => {
    const setInitialReservedCount = async () => {
      const initialReservedCount = await sumReserveQuantityByTimeId(classDates[0].times[0].timeId);

      setCurrentReservedCount(initialReservedCount);
    };
    setInitialReservedCount();
  }, [setCurrentReservedCount, classDates]);

  // 시간 버튼 클릭
  const handleTimeClick = async (times: string, timeId: string) => {
    setSelectedTime(times);
    setTimeId(timeId);

    const currentReservedAmount = await sumReserveQuantityByTimeId(timeId);
    setCurrentReservedCount(currentReservedAmount);
  };

  // 날짜 버튼 클릭
  const handleDateChange = async (newDate: Date | undefined) => {
    const formattedDate = format(newDate as Date, 'yyyy-MM-dd');
    const firstAvailableTime = classDates.find(({ day }) => day === formattedDate)?.times[0];
    setSelectedDate(formattedDate);

    // 일자를 선택했을 때 첫 번째 시간으로 state를 set
    if (firstAvailableTime) {
      const { timeId, times } = firstAvailableTime;
      setSelectedTime(times);
      setTimeId(timeId);

      // 일자를 선택했을 때 첫 번째 시간의 예약 인원수로 setCurrentReservedCount
      const reservedCountOfSelectedDate = await sumReserveQuantityByTimeId(timeId);
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

  // 상단의 날짜 레이블 포맷팅 ex) 2024년 4월
  function CustomCaption(props: CaptionProps) {
    return (
      <div className="flex justify-center font-bold">{format(props.displayMonth, 'uuuu년 LLLL', { locale: ko })}</div>
    );
  }

  return (
    <div className="w-full mb-2">
      <div className="shadow-[0_4px_4px_0_rgba(0,0,0,0.2)] rounded-md py-1 mb-4 ">
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

      <div className="grid grid-cols-2 gap-2 w-full mb-3">
        {classDates
          .filter((dateInfo) => dateInfo.day === selectedDate) // 선택한 날짜의 시간만 filter
          /* times배열:  각 시간의 고유id와 시간string이 한 쌍인 객체의 배열 */
          .map(({ times }) =>
            /* 각 시간의 정보 렌더링 */
            times.map((timeInfo) => (
              <>
                <button
                  key={timeInfo.timeId}
                  onClick={() => handleTimeClick(timeInfo.times, timeInfo.timeId)}
                  className={`btn btn-sm font-normal ${
                    timeInfo.times === selectedTime ? 'bg-point-purple text-white' : 'bg-white'
                  } tracking-wide rounded-md h-[48px] border-solid border border-gray-300`}
                >
                  {convertTimeTo12HourClock(timeInfo.times)}
                </button>
              </>
            ))
          )}
      </div>
      <div className="flex flex-row justify-between items-center w-full bg-base-200 rounded-md  text-sm py-2 px-3">
        <div className="mb-1 font-bold">선택하신 수강일</div>
        <p>
          {`${selectedDate}`} {convertTimeTo12HourClock(selectedTime)}
        </p>
      </div>
    </div>
  );
};

export default DateTimePicker;
