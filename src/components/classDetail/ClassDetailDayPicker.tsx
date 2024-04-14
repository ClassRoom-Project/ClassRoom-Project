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
const bookedStyle = { border: '1px solid #6C5FF7', borderRadius: '20%', backgroundColor: '#6C5FF7', color: 'white' };

export default function App({ classDate }: { classDate: string[] }) {
  if (!classDate || classDate.length === 0) {
    return null;
  }

  const bookedDays = classDate?.map((dateStr) => new Date(dateStr));
  return (
    <div className="flex flex-col items-center justify-center">
      <style>{css}</style>
      <DayPicker
        locale={ko}
        weekStartsOn={1}
        defaultMonth={new Date(classDate[0])}
        modifiers={{ booked: bookedDays }}
        modifiersStyles={{ booked: bookedStyle }}
      />
      <p className="mt-2">클래스가 있는 날을 확인하세요</p>
    </div>
  );
}
