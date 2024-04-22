'use client';
import React, {useEffect} from 'react';
import useRegisterStore from '@/store/registerStore';

interface InitialDataType {
  minNumber: number;
  personnel: number;
}

interface MinMaxNumberProps {
  isEditMode: boolean;
  initialData?: InitialDataType;
}

const MinMaxNumber:React.FC<MinMaxNumberProps> = ({ isEditMode, initialData }) => {
  const { minNumber, personnel, setMinNumber, setPersonnel } = useRegisterStore();

  useEffect(() => {
    if (isEditMode && initialData) {
      setMinNumber(initialData.minNumber);
      setPersonnel(initialData.personnel);
    }
  }, [isEditMode, initialData, setMinNumber, setPersonnel]);

  const handlePersonnelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value);
    if (isNaN(value) || value < 0) value = 0;
    setPersonnel(value);
  };

  const handleMinNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value);
    if (isNaN(value) || value < 0) value = 0;
    setMinNumber(value);
  };

  return (
    <div className="my-4 flex flex-wrap justify-between items-center">
      <div className="w-full md:w-auto md:flex-1 flex items-center space-x-2 my-2">
        <p className="text-base text-[#3F3F3F] flex-shrink-0 font-bold">* 모집 정원</p>
        <input
          className="form-input px-3 py-2 border border-[#D5D5D5] rounded w-1/3 md:w-1/3"
          type="text"
          value={personnel}
          onChange={handlePersonnelChange}
          placeholder="모집 정원 입력"
        />
      </div>
      <div className="w-full md:w-auto md:flex-1 flex items-center space-x-2 my-2">
        <p className="text-base text-[#3F3F3F] flex-shrink-0 font-bold">* 최소 모집 인원</p>
        <input
          className="form-input px-3 py-2 border border-[#D5D5D5] rounded w-1/3 md:w-1/3"
          type="text"
          value={minNumber}
          onChange={handleMinNumberChange}
          placeholder="최소인원 입력"
        />
      </div>
    </div>
  );
};

export default MinMaxNumber;
