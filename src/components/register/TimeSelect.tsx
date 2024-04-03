"use client";
import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import { DayPicker, SelectMultipleEventHandler } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import useRegisterStore from '@/store/RegisterStore';
import { ko } from 'date-fns/locale';

const TimeSelect = () => {
    const { selectDay, setSelectDay, selectedTime, setSelectedTime } = useRegisterStore(); // 여러 날짜 및 시간 선택을 위한 상태
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const datePickerRef = useRef<HTMLDivElement | null>(null);
    const dateInputRef = useRef<HTMLInputElement | null>(null);

    const handleTimeChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
        const newTimes = [...selectedTime];
        newTimes[index] = event.target.value;
        setSelectedTime(newTimes);
    };

    const addTimeField = () => {
        setSelectedTime([...selectedTime, '']); // 새 시간 입력 필드 추가
    };

    const toggleDatePicker = () => {
        setIsDatePickerOpen(!isDatePickerOpen);
    };

    const handleDateSelect: SelectMultipleEventHandler = (selectedDate) => {
        if (!selectedDate || selectedDate.length === 0) {
            alert('클래스 일정 날짜를 선택해주세요');
            return;
        }
    
        const formattedDates = selectedDate.map(date => format(date, 'yyyy-MM-dd'));
        setSelectDay(formattedDates); // 여러 날짜 저장
        if (dateInputRef.current) {
            dateInputRef.current.value = formattedDates.join(', '); // 입력란에 날짜 표시
        }
        setIsDatePickerOpen(false); 
    };
    

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
                setIsDatePickerOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="flex flex-col space-y-4">
            <div className="relative flex items-center space-x-2">
                <p>날짜</p>
                <input
                    ref={dateInputRef}
                    className="form-input px-3 py-2 border rounded mr-2 max-w-xs"
                    type="text"
                    readOnly
                    placeholder="날짜 선택"
                    onClick={toggleDatePicker}
                />
                {isDatePickerOpen && (
                    <div ref={datePickerRef} className="absolute top-full z-10">
                        <DayPicker
                            mode="multiple"
                            selected={selectDay.map(day => new Date(day))}
                            onSelect={handleDateSelect}
                            locale={ko}
                        />
                    </div>
                )}
            </div>
            <div>
                <p>시간 선택</p>
                {selectedTime.map((time, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <input
                            type="time"
                            value={time}
                            onChange={handleTimeChange(index)}
                        />
                    </div>
                ))}
                <button onClick={addTimeField}>시간 추가</button>
            </div>
        </div>
    );
}

export default TimeSelect;
