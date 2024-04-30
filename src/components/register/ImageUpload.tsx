'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/app/api/supabase/supabase';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import useRegisterStore from '@/store/registerStore';
import RegisterScheduleStore from '@/store/registerScheduleStore';
import { FiPlusCircle } from 'react-icons/fi';
import { ImageFileWithPreviews } from '@/types/register';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import {
  noDateTimeNotify,
  noLimitImageNotify,
  LimitImageSizeNotify,
  noTotalTimeNotify,
  noCategoryNotify,
  noHashTagNotify,
  noClassContentNotify,
  noClassTitleNotify,
  noClassTypeNotify,
  noClassDiffNotify,
  noMinNumberNotify,
  noPersonnelNotify
} from '@/components/common/Toastify';

interface InitialDataType {
  image: string[];
}

interface ImageUploadProps {
  isEditMode: boolean;
  initialData?: InitialDataType;
  class_Id?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ isEditMode, initialData, class_Id }) => {
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
    personnel,
    price,
    totalTime
  } = useRegisterStore();

  const { selectedDates, schedules } = RegisterScheduleStore();

  const { loginUserId } = useLoginStore();
  const [images, setImages] = useState<ImageFileWithPreviews[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const classId = isEditMode ? class_Id : crypto.randomUUID();
  const noticeId = crypto.randomUUID();
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (initialData && initialData.image && initialData.image.length > 0) {
      const initialImages = initialData.image.map((url) => ({ file: null, preview: url }));
      setImages(initialImages);
    }
  }, [initialData]);

  // 파일 업로드시 업로드 형식에 맞지 않는 이름 변경!
  function cleanFileName(fileName: string) {
    return fileName.replace(/[^a-zA-Z0-9.]/g, '_');
  }

  // supabase storage에 등록한 이미지 업로드
  const uploadFile = async (file: File) => {
    const cleanName = cleanFileName(file.name);
    const filePath = `uploads/${crypto.randomUUID()}/${classId}_${cleanName}`;
    const { data, error } = await supabase.storage.from('classImages').upload(filePath, file);
    if (error) {
      return null;
    } else {
      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/classImages/${data.path}`;
      return url;
    }
  };

  // 이미지 최대 5개까지만 추가할 수 있도록!
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      // 파일 크기 체크
      const fileSize = file.size / (1024 * 1024);
      if (fileSize > 5) {
        LimitImageSizeNotify();
        return;
      }

      if (images.length >= 5) {
        noLimitImageNotify();
        return;
      }
      const preview = URL.createObjectURL(file); // 선택된 파일(file)의 미리보기 URL을 생성!
      const newImages = [...images, { file, preview }];
      setImages(newImages);
    }
  };

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

  // 이미지 삭제 함수
  const handleImageDelete = (index: number) => {
    const newImage = images.filter((_, i) => i !== index);
    setImages(newImage);
  };

  // supabase에 데이터 저장
  const handleSubmit = async () => {
    setIsLoading(true);
    // 카테고리 입력 안했을시
    if (!category) {
      noCategoryNotify();
      setIsLoading(false);
      return;
    }

    // 해시태그 입력 안했을시
    if (subCategory.length === 0) {
      noHashTagNotify();
      setIsLoading(false);
      return;
    }

    // 클래스 설명 입력 안했을시
    if (!classContent) {
      noClassContentNotify();
      setIsLoading(false);
      return;
    }

    // 클래스 타입 선택 안했을시
    if (!classType) {
      noClassTypeNotify();
      setIsLoading(false);
      return;
    }

    // 클래스 제목 입력 안했을시
    if (!classTitle) {
      noClassTitleNotify();
      setIsLoading(false);
      return;
    }

    // 클래스 난이도 선택 안했을시
    if (!difficulty) {
      noClassDiffNotify();
      setIsLoading(false);
      return;
    }

    // 최소 모집 인원 입력 안했을시
    if (!minNumber) {
      noMinNumberNotify();
      setIsLoading(false);
      return;
    }

    // 정원 입력 안했을시
    if (!personnel) {
      noPersonnelNotify();
      setIsLoading(false);
      return;
    }

    // 소요시간 입력 안했을시
    if (!totalTime) {
      noTotalTimeNotify();
      setIsLoading(false);
      return;
    }

    // 날짜 및 시간 입력 안했을시
    const isAnyTimes = schedules.some((schedule) => schedule.times.length === 0);

    if (selectedDates.length === 0 || isAnyTimes) {
      noDateTimeNotify();
      setIsLoading(false);
      return;
    }

    if (!window.confirm('등록하시겠습니까?')) {
      setIsLoading(false);
      return;
    }
    const userId = loginUserId;
    const imageUrls = [];

    // 업로드된 이미지 URL 확인
    for (const image of images) {
      if (image.file) {
        const url = await uploadFile(image.file);
        if (url) {
          imageUrls.push(url);
        }
      } else if (image.preview) {
        imageUrls.push(image.preview);
      }
    }

    // isEditMode가 true일 경우, 기존 데이터 업데이트
    if (isEditMode) {
      const { data, error } = await supabase
        .from('class')
        .update({
          category: category,
          hashtag: subCategory,
          class_type: classType,
          difficulty: difficulty,
          title: classTitle,
          description: classContent,
          quantity: personnel,
          min_people: minNumber,
          price: price,
          location: address,
          detail_location: detailAddress,
          total_time: totalTime,
          image: imageUrls
        })
        .eq('class_id', classId);

      if (error) {
        console.error('error:', error);
        setIsLoading(false);
        return;
      }

      // 선택된 날짜 처리
      for (const date of selectedDates) {
        let dateId;
        // 이미 존재하는 날짜인지 확인
        const { data: existingDateData, error: existingDateError } = await supabase
          .from('date')
          .select('date_id')
          .eq('day', date)
          .eq('class_id', classId)
          .single();

        if (existingDateError || !existingDateData) {
          // 존재하지 않으면 새로운 날짜 추가
          dateId = crypto.randomUUID();
          const { error: dateInsertError } = await supabase
            .from('date')
            .insert([{ date_id: dateId, class_id: classId, day: date }]);
          if (dateInsertError) {
            console.error('date db insert error:', dateInsertError);
          }
        } else {
          // 존재하면 dateId 가져오기
          dateId = existingDateData.date_id;
        }

        // 선택된 시간들에 대해 처리
        const selectedTimes = schedules.find((schedule) => schedule.date === date)?.times;
        if (selectedTimes && selectedTimes.length > 0) {
          for (const time of selectedTimes) {
            const { data: existingTimeData, error: existingTimeError } = await supabase
              .from('time')
              .select('time_id')
              .eq('date_id', dateId)
              .eq('times', time)
              .single();

            if (existingTimeError || !existingTimeData) {
              // 존재하지 않으면 새로운 시간 추가
              const timeId = crypto.randomUUID();
              const { error: timeError } = await supabase
                .from('time')
                .insert([{ time_id: timeId, date_id: dateId, times: time }]);
              if (timeError) {
                console.error('time db upload error:', timeError);
              }
            }
          }
        }
      }

      setIsLoading(false);
      router.push(`/register/completedPage/${classId}`);
      return;
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
        min_people: minNumber,
        price: price,
        location: address,
        detail_location: detailAddress,
        total_time: totalTime,
        image: imageUrls
      }
    ]);

    if (error) {
      console.error('error:', error);
    } else {
      // 알림 데이터 저장
      const notice = `"${classTitle}" 클래스 등록이 완료되었습니다.`;
      const { data: noticeData, error: noticeError } = await supabase.from('notifications').insert([
        {
          notice_id: noticeId,
          user_id: userId,
          class_id: classId,
          notice: notice,
          isread: false,
          created_at: new Date()
        }
      ]);
      if (noticeError) {
        console.error('Error: ', noticeError);
      } else {
        queryClient.invalidateQueries({
          queryKey: ['notifications', userId]
        });
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
          console.error('date db upload error:', dateError);
        } else {
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
                console.error('time db upload error:', timeError);
              }
            }
          }
        }
      }
      setIsLoading(false);
      router.push(`/register/completedPage/${classId}`);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
          <LoadingSpinner />
        </div>
      )}
      <div className="my-4 w-full">
        <div className="flex w-full flex-col">
          <div className="mb-4">
            <label
              htmlFor="image-upload"
              className="cursor-pointer rounded-full border border-[#6C5FF7] bg-[#E3E1FC] p-1 text-sm text-black hover:border-[#6C5FF7] hover:bg-[#CAC6FC]"
            >
              사진추가
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </div>
          <div className="flex flex-wrap">
            {/* 이미지와 빈 박스를 함께 순회하여 표시 */}
            {Array.from({ length: 5 }).map((_, index) =>
              index < images.length ? (
                <div
                  key={index}
                  className="relative ml-2 mt-2 h-[142px] w-[142px]"
                  draggable={true}
                  onDragStart={(event) => handleImageDragStart(index, event)}
                  onDragOver={handleImageDragOver}
                  onDrop={(event) => handleImageDrop(index, event)}
                >
                  <Image
                    src={images[index].preview}
                    alt="uploaded"
                    fill={true}
                    sizes="142px"
                    placeholder="empty"
                    style={{ objectFit: 'cover', borderRadius: '20px' }}
                  />
                  <button
                    className="btn btn-circle btn-xs absolute right-0 top-0 mr-1 mt-1 bg-red-500 text-white"
                    onClick={() => handleImageDelete(index)}
                  >
                    -
                  </button>
                </div>
              ) : (
                <div
                  key={index}
                  className="ml-2 mt-2 h-[142px] w-[142px] rounded-[20px] border-2 border-dashed border-gray-300"
                ></div>
              )
            )}
          </div>
          <div className="mt-12 flex w-full justify-center">
            <div>
              <button
                onClick={handleSubmit}
                className="btn rounded bg-[#6C5FF7] px-4 py-2 text-lg text-white hover:bg-[#4D43B8]"
              >
                <FiPlusCircle size={20} />
                클래스 등록하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageUpload;
