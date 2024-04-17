'use client';
import useRegisterStore from '@/store/registerStore';
import React, { useState } from 'react';
import { LimitHashTagNotify } from '@/components/common/Toastify';

const HashTag = () => {
  const { setSubCategory } = useRegisterStore();
  const [isLimitNotified, setIsLimitNotified] = useState(false);

  const handleSubCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;
    const hashCount = (inputValue.match(/#/g) || []).length;

    if (hashCount > 5) {
      if (!isLimitNotified) {
        LimitHashTagNotify(); // 알림 표시
        setIsLimitNotified(true);
      }
      // #의 개수가 5개를 초과하면 더 이상 입력을 받지 않음
      event.target.value = inputValue.slice(0, inputValue.lastIndexOf("#"));
      return; // 추가 처리 방지
    } else {
      if (isLimitNotified) {
        setIsLimitNotified(false); // 알림 상태 초기화
      }
    }

    // 정규식을 통해 해시태그 추출 및 소분류로 설정
    const hashTags = inputValue.match(/#([a-zA-Z0-9가-힣]+)/g) || [];
    if (hashTags.length <= 5) {
      const tagsWithoutHash = hashTags.map(tag => tag.slice(1));
      setSubCategory(tagsWithoutHash);
    }
  };

  return (
    <div className="my-4">
      <div className="flex items-center space-x-4 my-2">
        <p className="text-base text-[#3F3F3F] flex-shrink-0 font-bold">* 소분류</p>
        <input
          className="form-input px-3 py-2 border-b border-t-0 border-r-0 border-l-0 border-[#D5D5D5] flex-grow min-w-0"
          type="text"
          onChange={handleSubCategoryChange}
          placeholder="해시태그를 입력해주세요(최대 5개까지 입력가능 ex.#태그1 #태그2 #태그3)"
        />
      </div>
    </div>
  );
};

export default HashTag;
