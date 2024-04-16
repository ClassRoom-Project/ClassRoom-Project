'use client';
import useRegisterStore from '@/store/registerStore';
import React from 'react';

const HashTag = () => {
  const { setSubCategory } = useRegisterStore();

  const handleSubCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 사용자 입력값에서 영문자, 숫자, 한글만 포함한 해시태그를 추출
    const hashTags = event.target.value.match(/#([a-zA-Z0-9가-힣]+)/g) || [];
    // 해시태그(#) 기호를 제거하여 배열 생성
    const tagsWithoutHash = hashTags.map(tag => tag.slice(1));
    // 배열 상태 업데이트
    setSubCategory(tagsWithoutHash);
  };

  return (
    <div className="my-4">
      <div className="flex items-center space-x-4 my-2">
        <p className="text-base text-[#3F3F3F] flex-shrink-0 font-bold">* 소분류</p>
        <input
          className="form-input px-3 py-2 border-b border-t-0 border-r-0 border-l-0 border-[#D5D5D5] flex-grow min-w-0"
          type="text"
          onChange={handleSubCategoryChange}
          placeholder="해시태그를 입력해주세요(최대 3개까지 입력가능 ex.#태그1 #태그2 #태그3)"
        />
      </div>
    </div>
  );
};

export default HashTag;
