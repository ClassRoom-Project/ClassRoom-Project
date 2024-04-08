"use client";
import React, { useState, useRef, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import RegisterScheduleStore from '@/store/RegisterScheduleStore';
import { ko } from 'date-fns/locale';

const TimeSelect: React.FC = () => {
    const { schedules, selectedDates, setSelectedDates, addSchedule, addTimeToSchedule, removeSchedule, removeTimeFromSchedule } = RegisterScheduleStore(state => state);
    const [isDayPickerOpen, setIsDayPickerOpen] = useState(false);
    const [tempTime, setTempTime] = useState<string>(''); // 임시 시간 상태 추가
    const dayPickerRef = useRef<HTMLDivElement>(null);

    const toggleDatePicker = () => {
        setIsDayPickerOpen(!isDayPickerOpen);
    };

    const handleDateSelect = (selectedDate: Date | undefined) => {
        if (selectedDate) {
            const formattedDate = format(selectedDate, 'yyyy-MM-dd');
            setSelectedDates([...selectedDates, formattedDate]);
            addSchedule(formattedDate);
            setIsDayPickerOpen(false);
        }
    };

    const handleAddTime = (date: string) => {
        if (tempTime === '') {
            alert('시간을 선택해주세요.'); // 시간이 입력되지 않았을 때 경고 메시지 표시
        } else {
            addTimeToSchedule(date, tempTime); // 임시 저장된 시간 사용
            setTempTime(''); // 시간 입력 후 초기화
        }
    };

    // 선택한 날짜 삭제
    const handleRemoveDate = (date:string) => {
        removeSchedule(date);
        setSelectedDates(selectedDates.filter(d => d !== date));
    }
    
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
        <div>
            <div className="relative">
                <button onClick={toggleDatePicker} className="bg-[#4D80FF] text-white p-2 rounded-md hover:bg-blue-700">일정 추가</button>
                {isDayPickerOpen && (
                    <div ref={dayPickerRef} className="absolute z-10 bg-white border-2 rounded-lg p-4">
                        <DayPicker
                            mode="single"
                            onSelect={handleDateSelect}
                            locale={ko}
                        />
                    </div>
                )}
            </div>
            <div className="flex flex-col my-4">
            {selectedDates.map((date, index) => (
                <div key={index} className="flex items-center gap-2 my-2">
                    <button onClick={() => handleRemoveDate(date)} className="bg-red-500 text-white p-1 rounded-md">-</button>
                    <p className="flex-none">{date}</p>
                    <input type="time" onChange={(e) => setTempTime(e.target.value)} className="flex-none" />
                    <button onClick={() => handleAddTime(date)} className="bg-green-500 text-white p-1 rounded-md">+</button>
                    <div className="flex gap-2">
                        {schedules.find(schedule => schedule.date === date)?.times.map((time, timeIndex) => (
                            <div key={timeIndex} className="flex items-center gap-1 bg-gray-200 p-1 rounded-md">
                              <p>{time}</p>
                              <button onClick={() => handleRemoveTime(date, time)} className="bg-red-500 text-white p-1 rounded-md">-</button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
    );
}

export default TimeSelect;
