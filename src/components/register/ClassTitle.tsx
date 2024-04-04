"use client";
import React from 'react'
import useRegisterStore from '@/store/RegisterStore';

const ClassTitle = () => {
    const { classTitle, setClassTitle } = useRegisterStore();

    const handleClassTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClassTitle(event.target.value);
    };
    return (
        <div>
            <div className="flex items-center space-x-4">
                <p>클래스명</p>
                <input className="form-input px-3 py-2 border rounded flex-grow" type="text" value={classTitle} onChange={handleClassTitleChange} placeholder="클래스 제목을 입력해주세요"/>
            </div>
        </div>
    )
}

export default ClassTitle