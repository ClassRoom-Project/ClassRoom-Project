'use client';

//yarn add date-fns 설치
import { ko } from 'date-fns/locale';
import React from 'react';
import { DayPicker } from 'react-day-picker';
//이거안해주면 렌더링될때 이상하게뜹니당
import 'react-day-picker/dist/style.css';

const css = `
  .rdp-caption {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .rdp-nav {
    margin: 0; /* Remove default margin */
  }
`;
const bookedStyle = { border: '1px solid ##5373FF', borderRadius: '20%', backgroundColor: '##5373FF', color: 'white' };

export default function App({ classDate }: { classDate: Array<{ day: string; date_id: string; class_id: string }> }) {
  if (!classDate || !Array.isArray(classDate)) {
    return null;
  }

  const bookedDays = classDate?.map((dateStr) => new Date(dateStr.day));
  return (
    <div className="flex flex-col items-center justify-center">
      <style>{css}</style>
      <DayPicker
        locale={ko}
        weekStartsOn={1}
        defaultMonth={bookedDays[0]}
        modifiers={{ booked: bookedDays }}
        modifiersStyles={{ booked: bookedStyle }}
      />
      <p className="mt-2">클래스가 있는 날을 확인하세요</p>
    </div>
  );
}
