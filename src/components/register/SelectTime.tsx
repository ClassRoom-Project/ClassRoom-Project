'use client';
import React, { useState, useRef, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import RegisterScheduleStore from '@/store/registerScheduleStore';
import { ko } from 'date-fns/locale';

interface ScheduleType {
  date: string;
  times: string[];
}

interface InitialDataType {
  day?: Date;
  times?: string;
  selectedDates: string[];
  timeData: string[];
  schedules?: ScheduleType[];
}

interface SelectTimeProps {
  isEditMode: boolean;
  initialData?: InitialDataType;
}

const SelectTime: React.FC<SelectTimeProps> = ({ isEditMode, initialData }) => {
  const {
    schedules,
    selectedDates,
    setSelectedDates,
    addSchedule,
    addTimeToSchedule,
    removeSchedule,
    removeTimeFromSchedule
  } = RegisterScheduleStore((state) => state);

  const [isDayPickerOpen, setIsDayPickerOpen] = useState(false);
  const [tempTime, setTempTime] = useState<string>(''); // 임시 시간 상태 추가
  const dayPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEditMode && initialData && initialData.schedules && initialData.schedules.length > 0 && initialData.schedules[0].times.length > 0) {
      setSelectedDates(initialData.selectedDates);
      // 첫 번째 스케줄의 첫 번째 시간을 설정합니다.
      setTempTime(initialData.schedules[0].times[0]);
    }
  }, [initialData, isEditMode, setSelectedDates, setTempTime]);
  
  

  const toggleDatePicker = () => {
    setIsDayPickerOpen(!isDayPickerOpen);
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      // 이미 선택된 날짜인지 확인
      if (selectedDates.includes(formattedDate)) {
        alert('이미 선택한 날짜입니다.');
      } else {
        setSelectedDates([...selectedDates, formattedDate]); // 새로운 날짜를 selectedDates에 추가
        addSchedule(formattedDate); // 새로운 날짜의 스케줄 추가
        setIsDayPickerOpen(false); // DayPicker 닫기
      }
    }
  };

  // 선택한 시간 추가
  const handleAddTime = (date: string) => {
    if (tempTime === '') {
      alert('시간을 선택해주세요.');
    } else {
      addTimeToSchedule(date, tempTime);
      setTempTime('');
    }
  };

  // 선택한 날짜 삭제
  const handleRemoveDate = (date: string) => {
    removeSchedule(date);
    setSelectedDates(selectedDates.filter((d) => d !== date));
  };

  // 선택한 시간 삭제
  const handleRemoveTime = (date: string, time: string) => {
    removeTimeFromSchedule(date, time);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dayPickerRef.current && !dayPickerRef.current.contains(event.target as Node)) {
        setIsDayPickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="my-4">
      <h1 className="font-bold text-[#3F3F3F] mt-6">* 클래스 날짜&시간</h1>
      <p className='text-sm mt-1 mb-2 text-[#7E7E7E]'>*해당 날짜의 시간을 선택한 후 +버튼을 클릭해야 시간 정보가 추가됩니다*</p>
      <div className="relative">
        <button
          onClick={toggleDatePicker}
          className="border border-[#6C5FF7] bg-[#E3E1FC] text-black text-sm p-1 rounded-full hover:bg-[#CAC6FC] hover:border-[#6C5FF7] cursor-pointer"
        >
          일정추가
        </button>
        {isDayPickerOpen && (
          <div ref={dayPickerRef} className="absolute z-10 bg-white border-2 rounded-lg p-4">
            <DayPicker 
              mode="single" 
              onSelect={handleDateSelect} 
              locale={ko} 
              // disableNavigation={true} // 한달단위
            />
          </div>
        )}
      </div>
      <div className="flex flex-col my-4">
        {selectedDates.map((date, index) => (
          <div key={index} className="flex items-center gap-2 my-2">
            <button onClick={() => handleRemoveDate(date)} className="bg-red-500 text-white w-6 h-6 rounded-full">
              -
            </button>
            <p className="flex-none">{date}</p>
            <input type="time" onChange={(e) => setTempTime(e.target.value)} className="flex-none" />
            <button onClick={() => handleAddTime(date)} className="bg-[#6C5FF7] text-white w-6 h-6 rounded-full">
              +
            </button>
            <div className="flex gap-2">
  {schedules
    .find((schedule) => schedule.date === date)
    ?.times.map((time, timeIndex) => (
      <div key={timeIndex} className="flex items-center gap-1 bg-gray-200 p-1 rounded-md">
        <p>{time}</p>
        <button
          onClick={() => handleRemoveTime(date, time)}
          className="bg-red-500 text-white w-6 h-6 rounded-md"
        >
          -
        </button>
      </div>
    ))}
</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectTime;
