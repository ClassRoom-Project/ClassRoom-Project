"use client";
import React, {useState} from 'react'

const TotalTime = () => {
    const [totalTime, setTotalTime] = useState('');
    const handleTotalTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTotalTime(event.target.value);
      };
    return (
        <div className="flex items-center space-x-2 my-2">
            <p>소요시간</p>
            <div>
                <input className="form-input px-3 py-2 border rounded flex-grow" type="text" value={totalTime} onChange={handleTotalTimeChange} placeholder="총 소요시간 입력"/>
            </div>
            </div>
    )
}

export default TotalTime