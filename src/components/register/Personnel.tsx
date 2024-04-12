'use client';
import React from 'react';
import useRegisterStore from '@/store/registerStore';

const Personnel = () => {
  const { personnel, setPersonnel } = useRegisterStore();

  const handlePersonnelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setPersonnel(value);
  };

  return (
    <div className="flex items-center space-x-2 my-2">
      <p className="text-base flex-shrink-0 font-bold">정원</p>
      <input
        className="form-input px-3 py-2 border rounded flex-grow"
        type="number"
        value={personnel}
        onChange={handlePersonnelChange}
        placeholder="정원 입력"
      />
    </div>
  );
};

export default Personnel;
