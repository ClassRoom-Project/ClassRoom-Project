'use client';
import React, {useEffect} from 'react';
import useRegisterStore from '@/store/registerStore';

interface InitialDataType {
  totalTime: number;
}

interface TotalTimeProps {
  isEditMode: boolean;
  initialData?: InitialDataType;
}

const TotalTime:React.FC<TotalTimeProps> = ({isEditMode, initialData}) => {
  const { totalTime, setTotalTime } = useRegisterStore();

  useEffect(() => {
    if (isEditMode && initialData) {
      setTotalTime(initialData.totalTime);
    }
  }, [isEditMode, initialData, setTotalTime]);

  const handleTotalTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value);
    if (isNaN(value) || value < 0) value = 0;
    setTotalTime(value);
  };
  return (
    <div className="flex items-center space-x-2 my-4">
      <p className="text-sm md:text-base lg:text-base text-[#3F3F3F] flex-shrink-0 font-bold">
        <span className='text-[#d63232] font-bold'>*</span> 
        소요시간
      </p>
      <div className="w-1/2 md:w-1/3">
        <input
          className="form-input px-3 py-2 border border-[#D5D5D5] rounded w-1/2"
          type="text"
          value={totalTime}
          onChange={handleTotalTimeChange}
          placeholder="총 소요시간 입력"
        />
      </div>
    </div>
  );
};

export default TotalTime;
