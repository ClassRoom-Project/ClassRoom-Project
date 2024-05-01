'use client';
import React, { useEffect } from 'react';
import useRegisterStore from '@/store/registerStore';

interface InitialDataType {
  title: string;
  class_type: string;
}

interface ClassTitleTypeProps {
  isEditMode: boolean;
  initialData?: InitialDataType;
}

const ClassTitleType: React.FC<ClassTitleTypeProps> = ({ isEditMode, initialData }) => {
  const { classTitle, classType, setClassTitle, setClassType } = useRegisterStore();

  useEffect(() => {
    if (isEditMode && initialData) {
      setClassTitle(initialData.title);
      setClassType(initialData.class_type);
    }
  }, [isEditMode, initialData, setClassTitle, setClassType]);

  const handleClassTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClassTitle(event.target.value);
  };

  const handleClassTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setClassType(event.target.value);
  };

  return (
    <div className="my-4">
      <div className="flex flex-col md:flex-row md:items-center space-x-0 md:space-x-4 space-y-4 md:space-y-0">
        <p className="text-sm md:text-base lg:text-base text-[#3F3F3F] flex-shrink-0 font-bold">
          <span className='text-[#d63232] font-bold'>*</span> 
          클래스명
        </p>
        <input
            className="form-input px-3 py-2 border-b border-t-0 border-r-0 border-l-0 border-[#D5D5D5] flex-grow min-w-0"
            type="text"
            value={classTitle}
            onChange={handleClassTitleChange}
            placeholder="클래스명을 입력해주세요"
            maxLength={40}
          />
        <label htmlFor="classType" className="text-sm md:text-base lg:text-base text-[#3F3F3F] flex-shrink-0 font-bold">
          <span className='text-[#d63232] font-bold'>*</span> 
          클래스타입
        </label>
        <select
          id="classType"
          value={classType}
          onChange={handleClassTypeChange}
          className="border border-[#D5D5D5] rounded-md p-2 text-gray-700"
        >
          <option value="">온/오프라인 선택</option>
          <option value="오프라인 클래스">오프라인 클래스</option>
          <option value="온라인 클래스">온라인 클래스</option>
        </select>
      </div>
    </div>
  );
};

export default ClassTitleType;