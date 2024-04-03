"use client";
import React, { useState } from 'react'
import { supabase } from '@/app/api/supabase/supabase';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import Plus from '../../../public/plus.png';
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
    // const classId = uuidv4();
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
        //   class_id: classId,
          category: category,
          hashtag: subCategory, 
          class_type: classType,
          difficulty: difficulty,
          title: classTitle, 
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
  };
  return (
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
  )
}

export default ImageUpload