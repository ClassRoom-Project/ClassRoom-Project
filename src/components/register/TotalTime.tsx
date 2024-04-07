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
        <div className="flex items-center space-x-2">
            <p className='text-base flex-shrink-0 font-bold'>소요시간</p>
            <div className="w-full">
                <input
                    // 화면 크기에 관계없이 너비가 동적으로 조절되도록 w-full md:w-auto 클래스를 적용
                    className="form-input px-3 py-2 border rounded w-full md:w-auto"
                    type="number"
                    value={totalTime}
                    onChange={handleTotalTimeChange}
                    placeholder="총 소요시간 입력"
                />
            </div>
        </div>
    )
}

export default TotalTime
