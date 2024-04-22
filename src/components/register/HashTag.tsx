'use client';
import useRegisterStore from '@/store/registerStore';
import React, { useState, useEffect } from 'react';
import { LimitHashTagNotify } from '@/components/common/Toastify';

interface InitialDataType {
  subCategory: string[];
}

interface HashTagProps {
  isEditMode: boolean;
  initialData?: InitialDataType; 
}

const HashTag: React.FC<HashTagProps> = ({ isEditMode, initialData }) => {
  const { setSubCategory } = useRegisterStore();
  const [isLimitNotified, setIsLimitNotified] = useState(false);

  useEffect(() => {
    if (isEditMode && initialData) {
      setSubCategory(initialData.subCategory);
    }
  }, [isEditMode, initialData, setSubCategory]);

  const handleSubCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;
    const hashCount = (inputValue.match(/#/g) || []).length;
  
    if (hashCount > 5) {
      if (!isLimitNotified) {
        LimitHashTagNotify(); // 알림 표시
        setIsLimitNotified(true);
      }
      // #의 개수가 5개를 초과하면 더 이상 입력 받지 않음
      event.target.value = inputValue.slice(0, inputValue.lastIndexOf("#"));
      return;
    } else {
      if (isLimitNotified) {
        setIsLimitNotified(false); // 알림 상태 초기화
      }
    }
  
    const rawHashTags = inputValue.split('#').slice(1);
    const hashTags = rawHashTags.map(tag => tag.trim()).filter(tag => tag !== '');
  
    if (hashTags.length <= 5) {
      setSubCategory(hashTags);
    }
  };  

  return (
    <div className="my-4">
      <div className="flex flex-col sm:flex-row items-start space-x-0 sm:space-x-4 space-y-4 sm:space-y-0 my-2 text-left">
        <p className="text-base text-[#3F3F3F] flex-shrink-0 font-bold">* 소분류</p>
        <input
          className="form-input px-3 py-2 border-b border-t-0 border-r-0 border-l-0 border-[#D5D5D5] flex-grow min-w-0 w-full"
          type="text"
          onChange={handleSubCategoryChange}
          placeholder="해시태그 최대 5개까지 입력가능합니다(ex.#태그1 #태그2 #태그3)"
        />
      </div>
    </div>
  );
};

export default HashTag;
