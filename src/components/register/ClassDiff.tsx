'use client';
import useRegisterStore from '@/store/registerStore';
import React, {useEffect} from 'react';

interface InitialDataType {
  difficulty: string;
}

interface ClassDiffProps {
  isEditMode: boolean;
  initialData?: InitialDataType;
}

const ClassDiff:React.FC<ClassDiffProps> = ({ isEditMode, initialData }) => {
  const { difficulty, setDifficulty } = useRegisterStore();

  const handleDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(event.target.value);
  };

  useEffect(() => {
    if (isEditMode && initialData) {
      setDifficulty(initialData.difficulty);
    }
  }, [isEditMode, initialData, setDifficulty]);
  
  return (
    <div className="mt-4 md:mt-2 lg:mt-1 mb-4">
      <div className="flex items-center space-x-4">
        <p className="text-sm md:text-base lg:text-base text-[#3F3F3F] flex-shrink-0 font-bold">
          <span className='text-[#d63232] font-bold'>*</span> 
          클래스 난이도
        </p>
        {/* 난이도 드롭다운 */}
        <select
          value={difficulty}
          onChange={handleDifficultyChange}
          className="border border-[#D5D5D5] rounded-md p-2 text-gray-700"
        >
          <option value="">난이도 선택</option>
          <option value="입문">입문</option>
          <option value="초급">초급</option>
          <option value="중급">중급</option>
          <option value="고급">고급</option>
        </select>
      </div>
    </div>
  );
};

export default ClassDiff;
