"use client";
import React, { useState } from 'react';
import { supabase } from '@/api/supabase/supabase';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { v4 as uuidv4 } from 'uuid';

import Image from 'next/image';
import Plus from '../../../public/plus.png';

interface AddressData {
    address: string;
    addressType: string;
    bname: string;
    buildingName: string;
}

interface ImageFileWithPreview {
  file: File;
  preview: string;
}

const RegisterPage = () => {
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [classType, setClassType] = useState('');
  const [className, setClassName] = useState('');
  const [classContent, setClassContent] = useState('');
  const [personnel, setPersonnel] = useState('');
  const [minNumber, setMinNumber] = useState('');
  const [maxNumber, setMaxNumber] = useState('');
  const [price, setPrice] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [selectDay, setSelectDay] = useState(''); // 달력
  const [selectedTime, setSelectedTime] = useState('');
  const [totalTime, setTotalTime] = useState('');

  const [images, setImages] = useState<ImageFileWithPreview[]>([]);
  const [representativeIndex, setRepresentativeIndex] = useState(-1);

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

  // 파일 업로드시 업로드 형식에 맞지 않는 이름 변경!
  function cleanFileName(fileName:any) {
    return fileName.replace(/[^a-zA-Z0-9.]/g, "_");
  }

  // supabase storage에 등록한 이미지 업로드
  const uploadFile = async (file: File) => {
    const cleanName = cleanFileName(file.name);
    const filePath = `uploads/${uuidv4()}_${cleanName}`;
    const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, file);
    if (error) {
        console.error('파일 업로드 실패:', error);
        return null;
    } else {
        const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.path}`;
        return url;
    }
  }

  // supabase에 데이터 저장
  const handleSubmit = async () => {
    const userId = "223e4567-e89b-12d3-a456-426614174002";
    const classId = uuidv4();
    const imageUrls = [];
    console.log(images);

    for (const image of images) {
      const url = await uploadFile(image.file);
      if(url) {
        imageUrls.push(url);
      } else {
        console.error('일부 이미지 업로드에 실패했습니다');
      }
    }

    console.log('업로드된 이미지 URL들:', imageUrls);

    const { data, error } = await supabase
      .from('class')
      .insert([
        { 
          user_id: userId,
          class_id: classId,
          category: category,
          hashtag: subCategory, 
          class_type: classType,
          difficulty: difficulty,
          title: className, 
          description: classContent,
          quantity: personnel,
          max_ppl: maxNumber,
          min_ppl: minNumber,
          price: price,
          location: address, 
          detailLocation: detailAddress,
          date: null,
          time: selectedTime,
          total_time: totalTime,
          image: imageUrls,
        },
      ]);
    if (error) {
      console.error('Supabase에 데이터 저장 중 오류 발생:', error);
    } else {
      console.log('데이터 저장 성공:', data);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      if (images.length >= 5) {
        alert('최대 5개의 이미지만 추가할 수 있습니다.');
        return;
      }

      const file = event.target.files[0];
      const preview = URL.createObjectURL(file);
      const newImages = [...images, { file, preview }];
      setImages(newImages);
      console.log(newImages);
    }
  };

  // 이미지 맨 앞으로 이동하는 함수 (이 함수를 컴포넌트 안에 추가)
  const handleMoveToFront = (index:number) => {
    const selectedImage = images[index];
    const remainingImages = images.filter((_, i) => i !== index);
    const newImages = [selectedImage, ...remainingImages];
    setImages(newImages);
    setRepresentativeIndex(0);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setCategory(event.target.value);
  };
    
  const handleSubCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSubCategory(event.target.value);
  };

  const handleClassTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setClassType(event.target.value);
  };

  const handleDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(event.target.value);
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

  const handleMaxNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxNumber(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(event.target.value);
  };
  
  const handleTotalTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTotalTime(event.target.value);
  };

  const handleSetRepresentative = (index:any) => {
    setRepresentativeIndex(index);
  };

  return (
    <div className='p-4 w-full sm:p-20 md:p-4 flex flex-col items-center justify-center'>
      <div className="sm:p-20 md:p-4 pl-2 w-full">
        <h1 className='font-extrabold text-xl'>클래스 등록하기</h1>
      </div>
      <div className='border py-6 px-20 flex flex-col item-center justify-center'>

        <div className='w-full max-w-md my-2'>
            <div className="flex items-center space-x-2">
              <div>
                {/* 카테고리 드롭다운 */}
                <select value={category} onChange={handleCategoryChange}>
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
              <p>소분류</p>
              <div>
                <input className="form-input px-3 py-2 border rounded flex-grow" type="text" value={subCategory} onChange={handleSubCategoryChange} placeholder="해시태그를 입력해주세요"/>
              </div>
            </div>
        </div>

        <div className='w-full max-w-md my-2'>
          <div className="flex items-center space-x-2">
            <div>
              {/* 클래스 타입 드롭다운 */}
              <select value={classType} onChange={handleClassTypeChange}>
                <option value="">클래스타입 선택</option>
                <option value="오프라인 클래스">오프라인 클래스</option>
                <option value="온라인 클래스">온라인 클래스</option>
              </select>
            </div>
          </div>
          <div className="flex items-center">
            {/* 난이도 드롭다운 */}
            <select value={difficulty} onChange={handleDifficultyChange}>
              <option value="">난이도 선택</option>
              <option value="입문">입문</option>
              <option value="초급">초급</option>
              <option value="중급">중급</option>
              <option value="고급">고급</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-2 my-2">
            <p>클래스명</p>
            <div>
                <input className="form-input px-3 py-2 border rounded flex-grow" type="text" value={className} onChange={handleClassNameChange} placeholder="클래스 제목을 입력해주세요"/>
            </div>
        </div>

        <div className="flex items-center space-x-2 my-2">
          <p>클래스 설명</p>
          <div>
              <input className="form-input px-3 py-2 border rounded flex-grow" type="text" value={classContent} onChange={handleClassContentChange} placeholder="클래스의 상세 설명을 입력해주세요"/>
          </div>
        </div>

        <div className="flex items-center space-x-2 my-2">
          <p>정원</p>
          <div>
            <input className="form-input px-3 py-2 border rounded flex-grow" type="text" value={personnel} onChange={handlePersonnelChange} placeholder="정원 입력"/>
          </div>
        </div>

        <div className="flex items-center space-x-2 my-2">
          <p>최소인원</p>
          <div>
              <input className="form-input px-3 py-2 border rounded flex-grow" type="text" value={minNumber} onChange={handleMinNumberChange} placeholder="최소인원 입력"/>
          </div>
          <p>최대인원</p>
          <div>
            <input className="form-input px-3 py-2 border rounded flex-grow" type="text" value={maxNumber} onChange={handleMaxNumberChange} placeholder="최대인원 입력"/>
          </div>
        </div>

        <div className="flex items-center space-x-2 my-2">
          <p>소요시간</p>
          <div>
              <input className="form-input px-3 py-2 border rounded flex-grow" type="text" value={totalTime} onChange={handleTotalTimeChange} placeholder="총 소요시간 입력"/>
          </div>
        </div>

        <div className="flex items-center space-x-2 my-2">
          <p>가격</p>
          <div>
              <input className="form-input px-3 py-2 border rounded flex-grow" type="text" value={price} onChange={handlePriceChange} placeholder="가격"/>
          </div>
        </div>
 
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

        <div className='my-1'>
          <p>날짜</p>
          {/* 날짜 달력 api 사용 */}
        </div>

        <div className="flex items-center space-x-2 my-2">
            <p>시간선택</p>
            <div>
                <input
                type="time"
                value={selectedTime}
                onChange={handleTimeChange}
                />
            </div>
        </div>
      </div>

      <div className='mt-2'>
        <div className="flex justify-between items-center pt-2">
        {images.length < 5 && (
          <label htmlFor="image-upload" className="cursor-pointer">
            <Image src={Plus} alt="plus" width={100} height={100} />
            <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
          </label>
        )}
        {images.map((image, index) => (
          <div key={index} className="h-[100px] w-[100px] relative ml-2">
            <Image src={image.preview} alt={`preview ${index}`} layout="fill" objectFit="cover" className='rounded-[20px] border'/>
            <button 
              className={`btn btn-circle btn-xs mt-1 mr-1 absolute top-0 right-0 ${index === 0 ? 'bg-blue-500' : 'bg-white-500'}`} 
              onClick={() => handleMoveToFront(index)}
            >
              🌼
            </button>
          </div>
        ))}
        <button  onClick={handleSubmit} className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">등록하기</button>
        </div>
      </div>

    </div>
  )
}

export default RegisterPage