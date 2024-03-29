'use client';

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DateTimePicker = () => {
  const timeList = ['14:30:00', '16:30:00'];
  const [selectedTime, setSelectedTime] = useState(timeList[0]);

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
  };

  type ValuePiece = Date | null;

  type Value = ValuePiece | [ValuePiece, ValuePiece];

  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="w-2/5 flex flex-col gap-4">
      <div>
        <h1 className="mb-1">날짜 선택</h1>
        <div>
          <Calendar onChange={onChange} value={value} calendarType="gregory" locale="ko" />
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
