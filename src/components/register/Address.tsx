"use client";
import React, { useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';

interface AddressData {
    address: string;
    addressType: string;
    bname: string;
    buildingName: string;
}

const Address = () => {
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  // Daum Postcode Popup을 사용하기 위한 스크립트 URL
  const scriptUrl = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = (data:AddressData) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setAddress(fullAddress); // 주소 상태 업데이트
  };

  const handleOpenPostCode = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <div className='my-1'>
          <div className="flex items-center space-x-2 my-2">
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
                <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700" onClick={handleOpenPostCode}>주소 검색</button>
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
        </div>
  );
}

export default Address;
