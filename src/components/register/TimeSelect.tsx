"use client";
import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import { DayPicker, SelectMultipleEventHandler } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import useRegisterStore from '@/store/RegisterStore';
import { ko } from 'date-fns/locale';

const TimeSelect = () => {
    const { selectDay, setSelectDay, selectedTime, setSelectedTime } = useRegisterStore();
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false); // 날짜 선택 열림/닫힘 관리
    const dayPickerRef = useRef<HTMLDivElement>(null); // 날짜 선택기의 DOM 참조를 저장
    const dayInputRef = useRef<HTMLInputElement>(null); // 날짜 입력 필드의 DOM 참조를 저장

    // 선택된 시간 배열 업데이트
    const handleTimeChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
        const newTimes = [...selectedTime];
        newTimes[index] = event.target.value;
        setSelectedTime(newTimes);
    };

    // 새로운 시간 입력 필드 추가
    const addTimeField = () => {
        setSelectedTime([...selectedTime, '']);
    };

    // 날짜 달력 열림/닫힘 토글
    const toggleDatePicker = () => {
        setIsDatePickerOpen(!isDatePickerOpen);
    };

    // 선택된 날짜 저장, 입력란(input)에 표시
    const handleDateSelect: SelectMultipleEventHandler = (selectedDate) => {
        // 선택된 날짜가 없는 경우!
        if (!selectedDate) {
            alert('클래스 일정을 선택해주세요');
            return;
        }
    
        // 선택된 날짜 'yyyy-MM-dd' 형식으로 포맷
        const formattedDates = selectedDate.map(date => format(date, 'yyyy-MM-dd'));
        setSelectDay(formattedDates); 

        // dayInputRef 존재할 시, input 필드 값 포맷된 문자열로
        if (dayInputRef.current) {
            dayInputRef.current.value = formattedDates.join(', '); 
        }
        setIsDatePickerOpen(false); // 닫기
    };
    
    // 날짜 달력 바깥쪽 클릭 시 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // 해당 이벤트가 영역 밖이면!
            if (dayPickerRef.current && !dayPickerRef.current.contains(event.target as Node)) {
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
                    ref={dayInputRef}
                    className="form-input px-3 py-2 border rounded mr-2 max-w-xs"
                    type="text"
                    readOnly
                    placeholder="날짜 선택"
                    onClick={toggleDatePicker}
                />
                <button
                    className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700'
                    onClick={toggleDatePicker}
                >날짜 선택</button>
                {isDatePickerOpen && (
                    <div 
                        ref={dayPickerRef} 
                        className="absolute top-full z-10 bg-white rounded border shadow-lg">
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
                <div className='flex'>
                    <p>시간 선택 </p>
                    <button onClick={addTimeField}>+</button>
                </div>
                {selectedTime.map((time, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <input
                            type="time"
                            value={time}
                            onChange={handleTimeChange(index)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TimeSelect;
