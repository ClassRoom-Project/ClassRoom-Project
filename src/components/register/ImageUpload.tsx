'use client';
import React, { DragEvent, useState } from 'react';
import { supabase } from '@/app/api/supabase/supabase';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PlusImage from '../../../public/plusImage.jpg';
import useRegisterStore from '@/store/registerStore';
import RegisterScheduleStore from '@/store/registerScheduleStore';

interface ImageFileWithPreview {
  file: File;
  preview: string;
}

const ImageUpload = () => {
  const {
    category,
    subCategory,
    address,
    detailAddress,
    classContent,
    classTitle,
    classType,
    difficulty,
    minNumber,
    maxNumber,
    personnel,
    price,
    totalTime
  } = useRegisterStore();

  const { selectedDates, schedules } = RegisterScheduleStore();

  const { loginUserId } = useLoginStore();
  const [images, setImages] = useState<ImageFileWithPreview[]>([]);
  const classId = crypto.randomUUID();
  const noticeId = crypto.randomUUID();
  const router = useRouter();

  // 파일 업로드시 업로드 형식에 맞지 않는 이름 변경!
  function cleanFileName(fileName: string) {
    return fileName.replace(/[^a-zA-Z0-9.]/g, '_');
  }

  // supabase storage에 등록한 이미지 업로드
  const uploadFile = async (file: File) => {
    const cleanName = cleanFileName(file.name);
    const filePath = `uploads/${classId}_${cleanName}`;
    console.log('File Path:', filePath);
    const { data, error } = await supabase.storage.from('classImages').upload(filePath, file);
    if (error) {
      console.error('파일 업로드 실패:', error);
      return null;
    } else {
      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/classImages/${data.path}`;
      return url;
    }
  };

  // supabase에 데이터 저장
  const handleSubmit = async () => {
    if (!window.confirm('등록하시겠습니까?')) {
      return;
    }
    const userId = loginUserId;
    const imageUrls = [];

    // 업로드된 이미지 URL 확인
    for (const image of images) {
      const url = await uploadFile(image.file);
      if (url) {
        imageUrls.push(url);
      } else {
        console.error('일부 이미지 업로드에 실패했습니다');
      }
    }

    const { data, error } = await supabase.from('class').insert([
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
        total_time: totalTime,
        image: imageUrls
      }
    ]);

    if (error) {
      console.error('Supabase에 데이터 저장 중 오류 발생:', error);
    } else {
      // 알림 데이터 저장
      const notice = `${classTitle} 클래스 등록이 완료되었습니다.`;
      const { data:noticeData, error:noticeError } = await supabase.from('notifications')
        .insert([
          { notice_id: noticeId, user_id : userId, class_id: classId, notice:notice, isread: false, created_at: new Date() }
        ]);
      if (noticeError) {
        console.error('Error creating notification', noticeError);
      }

      // 각 날짜에 대한 데이터 저장
      for (const date of selectedDates) {
        const dateId = crypto.randomUUID(); // 날짜마다 새로운 ID 생성
        const { data: dateData, error: dateError } = await supabase.from('date').insert([
          {
            date_id: dateId,
            class_id: classId,
            day: date
          }
        ]);
        if (dateError) {
          console.error('date 테이블에 데이터 저장 중 오류 발생:', dateError);
        } else {
          console.log('date 테이블에 데이터 저장 성공:', dateData);
          const selectedTimes = schedules.find((schedule) => schedule.date === date)?.times;

          if (selectedTimes && selectedTimes.length > 0) {
            for (const time of selectedTimes) {
              const timeId = crypto.randomUUID(); // 시간마다 새로운 ID 생성
              const { data: timeData, error: timeError } = await supabase.from('time').insert([
                {
                  time_id: timeId,
                  date_id: dateId,
                  times: time
                }
              ]);
              if (timeError) {
                console.error('time 테이블에 데이터 저장 중 오류 발생:', timeError);
              } else {
                console.log('time 테이블에 데이터 저장 성공:', timeData);
              }
            }
          }
        }
      }

      alert('등록이 완료되었습니다.');
      router.push(`/register/completed/${classId}`);
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

  // // 이미지 맨 앞으로 이동하는 함수
  // const handleMoveToFront = (index: number) => {
  //   const selectedImage = images[index];
  //   const remainingImages = images.filter((_, i) => i !== index);
  //   // 선택된 이미지를 새 배열의 첫번째 요소로 두고 그 뒤에 나머지 애들 붙임
  //   const newImages = [selectedImage, ...remainingImages];
  //   setImages(newImages);
  // };

  // 이미지 순서를 변경하는 함수
  const handleImageDragStart = (index: number, event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('index', index.toString());
  };

  const handleImageDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleImageDrop = (index: number, event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const draggedIndex = parseInt(event.dataTransfer.getData('index'));
    
    // 이미지의 순서 변경
    const updatedImages = [...images];
    const draggedImage = updatedImages[draggedIndex];
    updatedImages.splice(draggedIndex, 1);
    updatedImages.splice(index, 0, draggedImage);
    
    // 변경된 순서를 배열에 반영
    setImages(updatedImages);
  };

  // 이미지 삭제 함수수
  const handleImageDelete = (index: number) => {
    const newImage = images.filter((_, i) => i !== index);
    setImages(newImage);
  };

  return (
    <div className='my-4 w-full'>
      <div className="flex flex-col w-full">
        <div className="flex flex-wrap">
          {/* PlusImage 항상 보이게 변경 */}
          <label htmlFor="image-upload" className="cursor-pointer">
            <Image src={PlusImage} alt="PlusImage" width={120} height={120} unoptimized={true} />
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </label>
          {images.map((image, index) => (
            <div 
              key={index} 
              className="h-[120px] w-[120px] relative ml-2" 
              draggable={true}
              onDragStart={(event) => handleImageDragStart(index, event)}
              onDragOver={handleImageDragOver}
              onDrop={(event) => handleImageDrop(index, event)}
            >
              <Image
                src={image.preview}
                alt="uploaded"
                fill
                className="h-full w-full object-cover rounded-[20px] border"
              />
              {/* <button
                className={`btn btn-circle btn-xs mt-1 mr-1 absolute top-0 right-0 ${
                  index === 0 ? 'bg-blue-500' : 'bg-white-500'
                }`}
                onClick={() => handleMoveToFront(index)}
              >
                🌼
              </button> */}
              <button
                className="btn btn-circle btn-xs mt-1 mr-1 absolute top-0 right-0 bg-red-500 text-white"
                onClick={() => handleImageDelete(index)}
              >
                -
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 w-full flex justify-center">
          <div>
            <button onClick={handleSubmit} className="btn px-4 py-2 bg-[#6C5FF7] text-white rounded hover:bg-[#4D43B8]">
              등록하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
