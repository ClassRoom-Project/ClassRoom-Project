"use client";
import React from 'react'
import useRegisterStore from '@/store/registerStore';

const ClassTitle = () => {
    const { classTitle, classType, setClassTitle, setClassType } = useRegisterStore();

    const handleClassTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClassTitle(event.target.value);
    };

    const handleClassTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setClassType(event.target.value);
    };
    
    return (
        <div className='my-2'>
            <div className="flex items-center space-x-4">
                <p className='text-base text-[#3F3F3F] flex-shrink-0 font-bold'>클래스명</p>
                <input 
                    className="form-input px-3 py-2 border-b border-t-0 border-r-0 border-l-0 border-[#D5D5D5] flex-grow min-w-0"
                    type="text" 
                    value={classTitle} 
                    onChange={handleClassTitleChange} 
                    placeholder="클래스명을 입력해주세요"
                />
                <p className='text-base text-[#3F3F3F] flex-shrink-0 font-bold'>클래스타입</p>
                {/* 클래스 타입 드롭다운 */}
                <select 
                    value={classType} 
                    onChange={handleClassTypeChange}
                    className='border border-[#D5D5D5] rounded-md p-2 text-gray-700'
                    >
                    <option value="">온/오프라인</option>
                    <option value="오프라인 클래스">오프라인 클래스</option>
                    <option value="온라인 클래스">온라인 클래스</option>
                </select>
            </div>
        </div>
    )
}

export default ClassTitle;
