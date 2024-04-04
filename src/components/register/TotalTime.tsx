"use client";
import React from 'react'
import useRegisterStore from '@/store/RegisterStore';

const TotalTime = () => {
    const { totalTime, setTotalTime } = useRegisterStore();

    const handleTotalTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        setTotalTime(value);
      };
    return (
        <div className="flex items-center space-x-2 my-2">
            <p>소요시간</p>
            <div>
                <input className="form-input px-3 py-2 border rounded flex-grow" type="number" value={totalTime} onChange={handleTotalTimeChange} placeholder="총 소요시간 입력"/>
            </div>
        </div>
    )
}

export default TotalTime