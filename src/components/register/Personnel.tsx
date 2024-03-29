"use client";
import React, { useState } from 'react'

const Personnel = () => {
  const [personnel, setPersonnel] = useState('');
  const [minNumber, setMinNumber] = useState('');
  const handlePersonnelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPersonnel(event.target.value);
  };
    
  const handleMinNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinNumber(event.target.value);
  };
  return (
    <div className="flex items-center space-x-2 my-2">
        <p>정원</p>
    <div>
        <input className="form-input px-3 py-2 border rounded flex-grow" type="text" value={personnel} onChange={handlePersonnelChange} placeholder="정원 입력"/>
    </div>
    <div>최소인원</div>
        <div>
            <input className="form-input px-3 py-2 border rounded flex-grow" type="text" value={minNumber} onChange={handleMinNumberChange} placeholder="최소인원 입력"/>
        </div>
    </div>
  )
}

export default Personnel