'use client';

import { sumReserveQuantityByTimeId } from '@/app/api/reserve/sumReserveQuantityByTimeId';
import { useCurrentReservedCountStore, useReserveStore } from '@/store/reserveClassStore';
import { DateList } from '@/types/date';
import { convertTimeTo12HourClock } from '@/utils/convertTimeTo12HourClock';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import '../common/day-picker.css';
import CustomCaption from '../common/CustomCaption';
import { useRouter } from 'next/navigation';

const DateTimePicker = ({ classDates }: { classDates: DateList[] }) => {
  const router = useRouter();
  const { setReserveInfo } = useReserveStore();
  const { setCurrentReservedCount } = useCurrentReservedCountStore();
  const [selectedTime, setSelectedTime] = useState(classDates[0].times[0].times);
  const [timeId, setTimeId] = useState(classDates[0].times[0].timeId);
  const today = new Date();
  // const [selectedDate, setSelectedDate] = useState(classDates[0].day);
  const firstAvailableDay = classDates.find(({ day }) => day >= format(new Date(), 'yyyy-MM-dd'))?.day;
  const [selectedDate, setSelectedDate] = useState(firstAvailableDay);

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

  if (!firstAvailableDay) {
    alert('마감된 클래스입니다.');
    router.replace('/');
    return;
  }

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

  const GridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4'
  };

  return (
    <div className="mb-2 flex w-full flex-col items-center justify-center">
      <p className="mb-1 w-full text-left text-lg font-bold">수강일 선택하기</p>
      <div className="min-w-2/3 mb-4 rounded-md p-2 px-4  shadow">
        <DayPicker
          mode="single"
          required
          selected={new Date(selectedDate as string)}
          onSelect={handleDateChange}
          disabled={[{ before: new Date() }, (day) => !availableDays.includes(format(day, 'yyyy-MM-dd'))]}
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
            <div key={dateInfo.dateId} className={`grid ${GridCols[gridColNum]} mb-3 w-full gap-2`}>
              {/* times배열:  각 시간의 고유id와 시간string이 한 쌍인 객체의 배열 */}
              {dateInfo.times.map((timeInfo) => (
                <button
                  key={timeInfo.timeId}
                  onClick={() => handleTimeClick(timeInfo.times, timeInfo.timeId)}
                  className={`btn btn-sm font-normal ${
                    timeInfo.times === selectedTime
                      ? 'bg-point-purple text-white hover:bg-button-hover-color'
                      : 'bg-white hover:border-button-focus-color hover:bg-background-color'
                  } h-[48px] rounded-md border border-solid border-gray-300 tracking-wide `}
                >
                  {convertTimeTo12HourClock(timeInfo.times)}
                </button>
              ))}
            </div>
          );
        })}
      <div className="flex w-full flex-row items-center justify-between rounded-md bg-base-200  px-3 py-2 text-sm">
        <div className="mb-1 font-bold">선택하신 수강일</div>
        <p>{`${selectedDate} ${convertTimeTo12HourClock(selectedTime)} `}</p>
      </div>
    </div>
  );
};

export default DateTimePicker;
