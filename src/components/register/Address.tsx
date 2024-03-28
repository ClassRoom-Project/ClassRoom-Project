"use client";
import React, {useState} from 'react'

declare global {
    interface Window {
      daum: any;
    }
}

const Address = () => {
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');

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
        </div>
    )
}

export default Address