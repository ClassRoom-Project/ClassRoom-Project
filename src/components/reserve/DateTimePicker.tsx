'use client';

import { format } from 'date-fns';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DateTimePicker = () => {
  const timeList = ['14:30:00', '16:30:00'];
  const [selectedTime, setSelectedTime] = useState(timeList[0]);

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
  };

  const today = new Date();
  const [date, setDate] = useState<DateType>(today);

  const handleDateChange = (newDate: DateType) => {
    setDate(newDate);
  };

  console.log(format(date as Date, 'yyyy-MM-dd'));

  return (
    <div className="w-2/5 flex flex-col gap-4">
      <div>
        <h1 className="mb-1">날짜 선택</h1>
        <div>
          <Calendar
            defaultView="month"
            onChange={handleDateChange}
            formatDay={(_locale, date) => date.getDate().toString()} // 달력에서 '일' 제거하고 숫자만 보이게
            value={date}
            calendarType="gregory"
            locale="ko-KR"
            next2Label={null}
            prev2Label={null}
          />
        </div>
      </div>
      <div>
        <h1 className="mb-1">시간 선택</h1>
        <div className="flex gap-2">
          {timeList.map((time, index) => {
            return (
              <button
                key={index}
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
        <span>2024-03-26 {selectedTime.slice(0, 5)}</span>
      </div>
    </div>
  );
};

export default DateTimePicker;
