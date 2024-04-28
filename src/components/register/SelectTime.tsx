'use client';
import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '@/app/api/supabase/supabase';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import CustomCaption from '../common/CustomCaption';
import RegisterScheduleStore from '@/store/registerScheduleStore';
import '../common/day-picker.css';

interface ScheduleType {
  date: string;
  times: string[];
}

interface InitialDataType {
  schedules?: ScheduleType[];
}

interface SelectTimeProps {
  isEditMode: boolean;
  initialData?: InitialDataType;
  class_Id?: string;
}

const SelectTime: React.FC<SelectTimeProps> = ({ isEditMode, initialData, class_Id }) => {
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
  const handleRemoveDate = async (date: string) => {
    const isConfirmed = window.confirm('해당 일정을 삭제하시겠습니까?');
    if (!isConfirmed) {
      return;
    }

    removeSchedule(date);
    setSelectedDates(selectedDates.filter((d) => d !== date));

    const { data, error } = await supabase
    .from('date')
    .delete()
    .match({ day: date, class_id: class_Id });

    if (error) {
      console.error('Error:', error.message);
    }
  };

  // 선택한 시간 삭제
  const handleRemoveTime = async (date: string, time: string) => {
    removeTimeFromSchedule(date, time);

    const { data: dateData, error: dateError } = await supabase
    .from('date')
    .select('date_id')
    .eq('day', date)
    .eq('class_id', class_Id)
    .single();

    if (dateError) {
      console.error('Error:', dateError.message);
      return;
    }

    const { data: timeData, error: timeError } = await supabase
    .from('time')
    .delete()
    .match({ date_id: dateData.date_id, times: time });

    if (timeError) {
      console.error('Error:', timeError.message);
    }
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

  useEffect(() => {
    // isEditMode가 true이고 initialData가 제공되었을 때 초기화 로직 실행
    if (isEditMode && initialData?.schedules) {
      initialData.schedules.forEach((schedule) => {
        addSchedule(schedule.date); // 날짜 추가
        schedule.times.forEach((time) => {
          addTimeToSchedule(schedule.date, time); // 해당 날짜에 시간 추가
        });
      });
      // 초기화된 날짜를 selectedDates 상태에 설정
      const initialDates = initialData.schedules.map((schedule) => schedule.date);
      setSelectedDates(initialDates);
    }
  }, [isEditMode, initialData, addSchedule, addTimeToSchedule, setSelectedDates]);

  return (
    <div className="my-4">
      <p className="text-sm md:text-base lg:text-base text-[#3F3F3F] flex-shrink-0 font-bold">
        <span className='text-[#d63232] font-bold'>*</span> 
        클래스 일정&시간
      </p>
      <p className="text-sm mt-1 mb-2 text-[#7E7E7E]">
        해당 날짜의 시간을 선택한 후 +버튼을 클릭해야 시간 정보가 추가됩니다
      </p>
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
              disabled={{ before: new Date() }} // 오늘 이전 날짜 비활성화
              fromYear={new Date().getFullYear()}
              toYear={new Date().getFullYear() + 1} // 현재 년도 +1 까지만 navigate
              components={{
                Caption: CustomCaption
              }}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col my-4">
      {selectedDates.map((date, index) => (
        <div key={index} className="flex flex-col gap-2 my-2">
          <div className="flex items-center gap-2">
            <button onClick={() => handleRemoveDate(date)} className="bg-red-500 text-white w-6 h-6 rounded-full">
              -
            </button>
            <p className="flex-none">{date}</p>
            <input type="time" onChange={(e) => setTempTime(e.target.value)} className="flex-none" />
            <button onClick={() => handleAddTime(date)} className="bg-[#6C5FF7] text-white w-6 h-6 rounded-full">
              +
            </button>
          </div>
          <div className="flex flex-row flex-wrap gap-2 justify-start">
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
