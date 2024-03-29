"use client";
import React, { useState } from 'react'

const ClassName = () => {
    const [className, setClassName] = useState('');
    const handleClassNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClassName(event.target.value);
    };
    return (
        <div className="flex items-center space-x-2 my-2">
            <p>클래스명</p>
            <div>
                <input className="form-input px-3 py-2 border rounded flex-grow" type="text" value={className} onChange={handleClassNameChange} placeholder="클래스 제목을 입력해주세요"/>
            </div>
        </div>
    )
}

export default ClassName