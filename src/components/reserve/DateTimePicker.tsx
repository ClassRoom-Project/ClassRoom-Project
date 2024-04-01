'use client';

import useReserveStore from '@/store/reserveClassStore';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import React, { useEffect, useState } from 'react';
import { CaptionProps, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import styles from 'react-day-picker/dist/style.module.css';
// import { SlArrowLeft } from 'react-icons/sl';
// import { SlArrowRight } from 'react-icons/sl';

const css = `
  .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
  background-color: pink; // hover시 배경색
}

.rdp-day_selected,
.rdp-day_selected:focus-visible,
.rdp-day_selected:hover {
  color: var(--rdp-selected-color);
  opacity: 1;
  background-color: black; // 선택시 배경색
}


  .rdp-months {
    justify-content: center;
    border: 1px solid black;
    padding: 10px;
  }

  .rdp {
    margin: 0;
  }
`;

const DateTimePicker = ({ classDateList, classTimeList }: { classDateList: string[]; classTimeList: string[] }) => {
  const setReserveInfo = useReserveStore((state) => state.setReserveInfo);

  const [selectedTime, setSelectedTime] = useState(classTimeList[0]);

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
  };

  // 리액트 데이피커 ------------------------------------------------------------------
  const today = new Date();
  const [selectedDate, setSelected] = useState<string>(format(classDateList[0], 'yyyy-MM-dd'));

  // 날짜 클릭시 set
  const handleDateChange = (newDate: Date | undefined) => {
    setSelected(format(newDate as Date, 'yyyy-MM-dd'));
  };

  // 1~31일 배열 생성
  const dayList: number[] = Array.from({ length: 31 }, (_, index) => index + 1);

  // DB에 있는 날짜에서 일자만 따로 생성한 배열 [1, 3, 6]..
  const availableDays = classDateList.map((item) => new Date(item).getDate());

  // 1~31 일중 DB에 있는 날짜를 삭제한 배열 생성
  const nonAvailableDays = dayList.filter((item) => {
    return !availableDays.includes(item);
  });

  // 속성으로 할당할 date 배열 생성
  const nonAvailableDates = nonAvailableDays.map((day) => {
    return new Date(2024, today.getMonth(), day);
  });

  // 상단의 날짜 레이블 포맷팅 ex) 2024년 4월
  function CustomCaption(props: CaptionProps) {
    return <div className="flex justify-center">{format(props.displayMonth, 'uuuu년 LLLL', { locale: ko })}</div>;
  }

  useEffect(() => {
    setReserveInfo({ reserveDate: selectedDate, reserveTime: selectedTime });
  }, [selectedDate, selectedTime, setReserveInfo]);

  // #region
  // 1년의 배열 만들어서 isSameDay 메서드 사용..?
  // const start = new Date(2024, 0, 1);
  // const end = new Date(2024, 12, 1);
  // let dates = [];

  // for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
  //   dates.push(new Date(date));
  // }

  // console.log(dates);

  // 현재 달 외에 다른날도 보여주려면 날짜별로 date를 따로 생성..?
  // const monthList = classDates.map((item) => new Date(item).getMonth());
  // console.log(new Set(monthList));
  // const nonAvailabelDaysDate = nonAvailableDays.map((day) => {
  //   const list = monthList.map((item) => {
  //     return new Date(2024, item, day);
  //   });
  //   return list;
  // });
  // const nonAvailableDaysDate = nonAvailableDays.flatMap((day) => monthList.map((month) => new Date(2024, month, day)));
  // #endregion

  return (
    <div className="w-2/5 flex flex-col gap-4">
      <div>
        <h1 className="mb-1">날짜 선택</h1>
        <div>
          <style>{css}</style>
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
          {classTimeList.map((time) => {
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
