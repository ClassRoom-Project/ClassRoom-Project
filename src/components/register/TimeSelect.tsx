"use client";
import React from 'react'
import useRegisterStore from '@/store/RegisterStore';

const TimeSelect = () => {
    const { selectedTime, setSelectedTime } = useRegisterStore();

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedTime([event.target.value]);
    };

    return (
        <div className="flex items-center space-x-2 my-2">
            <p>시간선택</p>
            <div>
                <input
                type="time"
                value={selectedTime}
                onChange={handleTimeChange}
                />
            </div>
        </div>
    )
}

export default TimeSelect