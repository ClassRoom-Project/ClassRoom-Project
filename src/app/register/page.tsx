"use client";
import React, { useState } from 'react';

declare global {
  interface Window {
    daum: any;
  }
}

export default function RegisterPage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [className, setClassName] = useState('');
  const [classContent, setClassContent] = useState('');
  const [personnel, setPersonnel] = useState('');
  const [minNumber, setMinNumber] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // 우편번호 찾기 모달을 여는 함수
  const openPostCode = () => {
    new window.daum.Postcode({
      oncomplete: function(data: any) {
        let fullAddress = data.address;
        let extraAddress = ''; 

        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        setAddress(fullAddress); // 주소 상태 업데이트
      }
    }).open();
  };

  // 스크립트 동적 로드
  const loadPostCode = () => {
    const script = document.createElement('script');
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    document.head.appendChild(script);
  };

  // 컴포넌트 마운트 시 스크립트 로드
  React.useEffect(() => {
    loadPostCode();
  }, []);

  // 카테고리가 변경될 때 실행할 함수
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  // 소분류(해시태그) 입력값이 변경될 때 실행할 함수
  const handleSubCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubCategory(event.target.value);
  };

  const handleClassNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClassName(event.target.value);
  };

  const handleClassContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClassContent(event.target.value);
  };

  const handlePersonnelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPersonnel(event.target.value);
  };

  const handleMinNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinNumber(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  // 시간 변경 핸들러 함수
  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(event.target.value);
  };

  return (
    <div className='p-4'>
      <div className='flex justify-end space-x-4'>
        <div>알림</div>
        <div>프로필</div>
      </div>
      <div className='border p-4 flex flex-col item-center mt-4'>
        <div className='w-full max-w-md'>
          <div className="flex items-center space-x-2">
            <div>
              {/* 카테고리 드롭다운 */}
              <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">카테고리 선택</option>
                <option value="요리">요리</option>
                <option value="공예&공방">공예&공방</option>
                <option value="운동">운동</option>
                <option value="교육">교육</option>
                <option value="악기&음악">악기&음악</option>
                <option value="뷰티">뷰티</option>
                <option value="기타">기타</option>
              </select>
            </div>
            <div>소분류</div>
            <div>
              <input className="form-input px-3 py-2 border rounded flex-grow" type="text" value={subCategory} onChange={handleSubCategoryChange} placeholder="해시태그를 입력해주세요"/>
            </div>
          </div>
        </div>
        <div>클래스명</div>
        <div>
            <input className="form-input px-3 py-2 border rounded flex-grow" type="text" value={className} onChange={handleClassNameChange} placeholder="클래스 제목을 입력해주세요"/>
        </div>
        <div>클래스 설명</div>
        <div>
            <input className="form-input px-3 py-2 border rounded flex-grow" type="text" value={classContent} onChange={handleClassContentChange} placeholder="클래스의 상세 설명을 입력해주세요"/>
        </div>
        <div>
          <div>정원</div>
          <div>
            <input className="form-input px-3 py-2 border rounded flex-grow" type="text" value={personnel} onChange={handlePersonnelChange} placeholder="정원 입력"/>
          </div>
          <div>최소인원</div>
          <div>
            <input className="form-input px-3 py-2 border rounded flex-grow" type="text" value={minNumber} onChange={handleMinNumberChange} placeholder="최소인원 입력"/>
          </div>
        </div>
        <div>가격</div>
        <div>
            <input className="form-input px-3 py-2 border rounded flex-grow" type="text" value={price} onChange={handlePriceChange} placeholder="가격"/>
        </div>
        <div>위치</div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <input
              className="form-input px-3 py-2 border rounded mr-2 max-w-xs"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="주소"
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={openPostCode}>주소 검색</button>
          </div>
        </div>
        <input
            className="form-input px-3 py-2 border rounded mr-2 max-w-xs"
            type="text"
            value={detailAddress}
            onChange={(e) => setDetailAddress(e.target.value)}
            placeholder="상세 주소"
          />
        <div>날짜</div>
        {/* 날짜 달력 api 사용 */}
        <div>시간선택</div>
        <div>
          <input
            type="time"
            value={selectedTime}
            onChange={handleTimeChange}
          />
        </div>
      </div>
      <div className="mt-4">
        <div>이미지 추가 버튼</div>
        <div>이미지</div>
        <button>등록하기</button>
      </div>
    </div>
  );
}
