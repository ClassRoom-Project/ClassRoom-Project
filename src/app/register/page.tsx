"use client";
import React, { useState } from 'react';
import CategoryDropdown from '@/components/register/CategoryDropdown';

declare global {
  interface Window {
    daum: any;
  }
}

const page = () => {
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

  // 주소 api : 스크립트 동적 로드
  const loadPostCode = () => {
    const script = document.createElement('script');
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    document.head.appendChild(script);
  };

  // 주소 api : 컴포넌트 마운트 시 스크립트 로드
  React.useEffect(() => {
    loadPostCode();
  }, []);

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

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(event.target.value);
  };

  return (
    <div className='w-[1600px] h-[800px] p-4'>
      <div className='flex justify-end space-x-4'>
        <div>알림</div>
        <div>프로필</div>
      </div>
      <div className='border p-4 flex flex-col item-center mt-4'>
        <CategoryDropdown />
        <div className="flex items-center space-x-2">
          <p>클래스명</p>
          <div>
              <input className="form-input px-3 py-2 border rounded flex-grow" type="text" value={className} onChange={handleClassNameChange} placeholder="클래스 제목을 입력해주세요"/>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <p>클래스 설명</p>
          <div>
              <input className="form-input px-3 py-2 border rounded flex-grow" type="text" value={classContent} onChange={handleClassContentChange} placeholder="클래스의 상세 설명을 입력해주세요"/>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <p>정원</p>
          <div>
            <input className="form-input px-3 py-2 border rounded flex-grow" type="text" value={personnel} onChange={handlePersonnelChange} placeholder="정원 입력"/>
          </div>
          <div>최소인원</div>
          <div>
            <input className="form-input px-3 py-2 border rounded flex-grow" type="text" value={minNumber} onChange={handleMinNumberChange} placeholder="최소인원 입력"/>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <p>가격</p>
          <div>
              <input className="form-input px-3 py-2 border rounded flex-grow" type="text" value={price} onChange={handlePriceChange} placeholder="가격"/>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <p>위치</p>
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

        <div className="flex items-center space-x-2">
          <div>시간선택</div>
          <div>
            <input
              type="time"
              value={selectedTime}
              onChange={handleTimeChange}
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div>이미지 추가 버튼</div>
        <div>이미지</div>
        <button>등록하기</button>
      </div>
    </div>
  )
}

export default page