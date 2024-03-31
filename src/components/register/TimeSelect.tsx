"use client";
import React, { useState } from 'react'

const TimeSelect = () => {
    const [selectedTime, setSelectedTime] = useState('');

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedTime(event.target.value);
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