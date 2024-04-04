"use client";
import React, { useState } from 'react'
import { supabase } from '@/app/api/supabase/supabase';
import useRegisterStore from '../../store/RegisterStore';

interface ImageFileWithPreview {
    file: File;
    preview: string;
}

const ImageUpload = () => {
  const { category, subCategory, address, detailAddress,
      selectDay, classContent, classTitle, classType,
      difficulty, minNumber, maxNumber, personnel,
      price, selectedTime, totalTime
  } = useRegisterStore();

  const [images, setImages] = useState<ImageFileWithPreview[]>([]);
  let classId = crypto.randomUUID();

  // 파일 업로드시 업로드 형식에 맞지 않는 이름 변경!
  function cleanFileName(fileName:string) {
    return fileName.replace(/[^a-zA-Z0-9.]/g, "_");
  }

  // supabase storage에 등록한 이미지 업로드
  const uploadFile = async (file: File) => {
    const cleanName = cleanFileName(file.name);
    const filePath = `uploads/${classId}_${cleanName}`;
    console.log('File Path:', filePath);
    const { data, error } = await supabase.storage
        .from('classImages')
        .upload(filePath, file);
    if (error) {
        console.error('파일 업로드 실패:', error);
        return null;
    } else {
        const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/classImages/${data.path}`;
        return url;
    }
  }

  // supabase에 데이터 저장
  const handleSubmit = async () => {
    if (!window.confirm('등록하시겠습니까?')) {
      return; // 사용자가 취소를 누르면 여기서 함수 종료
    }
    const userId = "223e4567-e89b-12d3-a456-426614174002";
    const imageUrls = [];
    console.log(images);

    // 업로드된 이미지 URL 확인
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
          title: classTitle, 
          description: classContent,
          quantity: personnel,
          max_people: maxNumber,
          min_people: minNumber,
          price: price,
          location: address, 
          detail_location: detailAddress,
          date: selectDay,
          time: selectedTime,
          total_time: totalTime,
          image: imageUrls,
        },
      ]);
    if (error) {
      console.error('Supabase에 데이터 저장 중 오류 발생:', error);
    } else {
      alert('등록이 완료되었습니다.');
      console.log('데이터 저장 성공:', data);
    }
  };

  // 이미지 최대 5개까지만 추가할 수 있도록!
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      if (images.length >= 5) {
        alert('최대 5개의 이미지만 추가할 수 있습니다.');
        return;
      }

      const file = event.target.files[0];
      const preview = URL.createObjectURL(file); // 선택된 파일(file)의 미리보기 URL을 생성!
      const newImages = [...images, { file, preview }];
      setImages(newImages);
      console.log(newImages);
    }
  };

  // 이미지 맨 앞으로 이동하는 함수
  const handleMoveToFront = (index:number) => {
    const selectedImage = images[index];
    const remainingImages = images.filter((_, i) => i !== index); // 선택된 이미지를 새 배열의 첫번째 요소로 두고 그 뒤에 나머지 애들 붙임
    const newImages = [selectedImage, ...remainingImages];
    setImages(newImages);
  };
  return (
    <div className="flex justify-between items-center pt-2">
        {images.length < 5 && (
          <label htmlFor="image-upload" className="cursor-pointer">
            <img src="/plus.png" alt="plus" width={100} height={100} />
            <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
          </label>
        )}
        {images.map((image, index) => (
          <div key={index} className="h-[100px] w-[100px] relative ml-2">
            <img src={image.preview} alt="uploaded" className='h-full w-full object-cover rounded-[20px] border'/>
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
  )
}

export default ImageUpload