import React from 'react';

const DateTimePicker = () => {
  return (
    <div className="w-2/5 flex flex-col gap-4">
      <div>
        <h1 className="mb-1">날짜 선택</h1>
        <div>달력칸</div>
      </div>
      <div>
        <h1 className="mb-1">시간 선택</h1>
        <div className="flex gap-2">
          <button className="px-4 py-1 text-lg bg-white tracking-wide rounded-lg">14:30</button>
          <button className="px-4 py-1 text-lg bg-pink-200 tracking-wide rounded-lg">16:30</button>
        </div>
      </div>
      <div>
        <h1 className="mb-1">선택하신 수강일</h1>
        <span>2024-03-26 16:00</span>
      </div>
    </div>
  );
};

export default DateTimePicker;
