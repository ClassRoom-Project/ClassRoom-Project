"use client";
import React from 'react'
import useRegisterStore from '@/store/RegisterStore';

const ClassTypeDiff = () => {
    const { classType, difficulty, setClassType, setDifficulty } = useRegisterStore();

    const handleClassTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setClassType(event.target.value);
    };
    
    const handleDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDifficulty(event.target.value);
    };
    return (
        <div className='w-full max-w-md my-2'>
            <div className="flex items-center space-x-2">
                <div>
                {/* 클래스 타입 드롭다운 */}
                <select value={classType} onChange={handleClassTypeChange}>
                    <option value="">클래스타입 선택</option>
                    <option value="오프라인 클래스">오프라인 클래스</option>
                    <option value="온라인 클래스">온라인 클래스</option>
                </select>
                </div>
            </div>
            <div className="flex items-center">
                {/* 난이도 드롭다운 */}
                <select value={difficulty} onChange={handleDifficultyChange}>
                <option value="">난이도 선택</option>
                <option value="입문">입문</option>
                <option value="초급">초급</option>
                <option value="중급">중급</option>
                <option value="고급">고급</option>
                </select>
            </div>
            </div>
    )
}

export default ClassTypeDiff