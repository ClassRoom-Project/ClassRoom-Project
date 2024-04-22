'use client';

import React, { useEffect, useState } from 'react';
import { useCurrentReservedCountStore, useReserveStore } from '@/store/reserveClassStore';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CaptionProps, DayPicker, useNavigation } from 'react-day-picker';
import { convertTimeTo12HourClock } from '@/utils/convertTimeTo12HourClock';
import { DateList } from '@/types/date';
import { sumReserveQuantityByTimeId } from '@/app/api/reserve/sumReserveQuantityByTimeId';
import 'react-day-picker/dist/style.css';
import './day-picker.css'; // dist css 밑에 둬야 적용됨
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';

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

  // DB에서 받아온 day 배열 생성
  const availableDays = classDates.map((dateInfo) => dateInfo.day);

  // 상단의 날짜 레이블 포맷팅 ex) 2024년 4월
  function CustomCaption(props: CaptionProps) {
    const { goToMonth, nextMonth, previousMonth } = useNavigation();
    return (
      <h2 className="flex justify-between">
        <button
          disabled={!previousMonth}
          onClick={() => previousMonth && goToMonth(previousMonth)}
          className="bg-point-purple rounded-full text-white w-6  flex justify-center items-center"
        >
          <IoIosArrowBack size={18} className=" mr-[2px]" />
        </button>
        <div className="flex justify-center font-bold">{format(props.displayMonth, 'uuuu년 LLLL', { locale: ko })}</div>
        <button
          disabled={!nextMonth}
          onClick={() => nextMonth && goToMonth(nextMonth)}
          className="bg-point-purple rounded-full text-white w-6  flex justify-center items-center"
        >
          <IoIosArrowForward size={18} className=" ml-[2px]" />
        </button>
      </h2>
    );
  }

  const GridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4'
  };
  const GridCols2 = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4'
  };

  return (
    <div className="w-full mb-2 flex flex-col justify-center items-center">
      <p className="font-bold text-lg text-left w-full mb-1">수강일 선택하기</p>
      <div className="shadow rounded-md p-2 min-w-2/3 mb-4  px-4">
        <DayPicker
          mode="single"
          required
          selected={new Date(selectedDate)}
          onSelect={handleDateChange}
          disabled={(day) => !availableDays.includes(format(day, 'yyyy-MM-dd'))}
          locale={ko}
          fromYear={new Date().getFullYear()}
          toYear={new Date().getFullYear() + 1}
          components={{
            Caption: CustomCaption
          }}
        />
      </div>

      {classDates
        .filter((dateInfo) => dateInfo.day === selectedDate) // 선택한 날짜의 시간만 filter
        .map((dateInfo) => {
          const gridColNum =
            dateInfo.times.length <= 4 ? '2' : dateInfo.times.length > 4 && dateInfo.times.length <= 6 ? '3' : '4'; // 등록된 시간 개수에 따라 grid 숫자 조절
          return (
            <div key={dateInfo.dateId} className={`grid ${GridCols[gridColNum]} gap-2 w-full mb-3`}>
              {/* times배열:  각 시간의 고유id와 시간string이 한 쌍인 객체의 배열 */}
              {dateInfo.times.map((timeInfo) => (
                <button
                  key={timeInfo.timeId}
                  onClick={() => handleTimeClick(timeInfo.times, timeInfo.timeId)}
                  className={`btn btn-sm font-normal ${
                    timeInfo.times === selectedTime
                      ? 'bg-point-purple text-white hover:bg-button-hover-color'
                      : 'bg-white hover:bg-background-color hover:border-button-focus-color'
                  } tracking-wide rounded-md h-[48px] border-solid border border-gray-300 `}
                >
                  {convertTimeTo12HourClock(timeInfo.times)}
                </button>
              ))}
            </div>
          );
        })}
      <div className="flex flex-row justify-between items-center w-full bg-base-200 rounded-md  text-sm py-2 px-3">
        <div className="mb-1 font-bold">선택하신 수강일</div>
        <p>{`${selectedDate} ${convertTimeTo12HourClock(selectedTime)} `}</p>
      </div>
    </div>
  );
};

export default DateTimePicker;
