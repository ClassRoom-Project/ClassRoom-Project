"use client";

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { supabase } from '@/app/api/supabase/supabase';
import Address from '@/components/register/Address';
import ClassContent from '@/components/register/ClassContent';
import ClassTitleType from '@/components/register/ClassTitleType';
import Price from '@/components/register/Price';
import SelectTime from '@/components/register/SelectTime';
import Category from '@/components/register/Category';
import HashTag from '@/components/register/HashTag';
import MinMaxNumber from '@/components/register/MinMaxNumber';
import ClassDiff from '@/components/register/ClassDiff';
import ImageUpload from '@/components/register/ImageUpload';
import TotalTime from '@/components/register/TotalTime';

interface ClassData {
  category: string;
  hashtag: string[];
  title: string;
  class_type: string;
  description: string;
  difficulty: string;
  min_people: number;
  quantity: number;
  total_time: number;
  location: string;
  detail_location: string;
  price: number;
  image: string[];
}

const RegisterEditPage = () => {
  const [classData, setClassData] = useState<ClassData>({
    category: '',
    hashtag: [],
    title: '',
    class_type: '',
    description: '',
    difficulty: '',
    min_people: 0,
    quantity: 0,
    total_time: 0,
    location: '',
    detail_location: '',
    price: 0,
    image: [],
  });

  const [dateData, setDateData] = useState<string[]>([]);
  const [timeData, setTimeData] = useState<string[]>([]);

  const path = usePathname();
  const classId = path.split('/').pop();

  useEffect(() => {
    const fetchClassData = async () => {
      const { data, error } = await supabase
        .from('class')
        .select('*')
        .eq('class_id', classId)
        .single();

      if (error) {
        console.error('Error: ', error);
        return;
      }
      console.log("Fetched class data:", data);
      setClassData(data);
    };

    const fetchDateAndTimeData = async () => {
      let { data: fetchedDateData, error: dateError } = await supabase
        .from('date')
        .select('day')
        .eq('class_id', classId);
  
      if (dateError) {
        console.error('Date Error: ', dateError);
        return;
      }

      // 시간 데이터 가져오기
      let { data: fetchedTimeData, error: timeError } = await supabase
        .from('time')
        .select('times')
        .eq('class_id', classId);
  
      if (timeError) {
        console.error('Time Error: ', timeError);
        return;
      }

      // 가져온 데이터를 상태에 저장
      if (fetchedDateData) {
        setDateData(fetchedDateData.map(item => item.day));
      }
      if (fetchedTimeData) {
        setTimeData(fetchedTimeData.map(item => item.times));
      }
    };

    fetchClassData();
    fetchDateAndTimeData();
  }, [classId]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-xl text-[#7E7E7E] font-bold my-2">클래스 등록하기</h1>
      <div className="border border-[#FCFCFF] bg-[#FCFCFF] p-4 shadow-md">
        <div className="p-8">
          <h1 className="text-lg mt-1">클래스 기본정보 입력란</h1>
          <hr className="my-4 border-[#4D43B8]" />
          <Category isEditMode={true} initialData={{ category: classData.category }} />
          <HashTag isEditMode={true} initialData={{ subCategory: classData.hashtag }} />
          <ClassTitleType isEditMode={true} initialData={{ title: classData.title, class_type: classData.class_type }} />
          <ClassContent isEditMode={true} initialData={{ classContent: classData.description }} />
          <ClassDiff isEditMode={true} initialData={{ difficulty: classData.difficulty }} />
          <MinMaxNumber isEditMode={true} initialData={{ minNumber: classData.min_people, personnel: classData.quantity }} />
          <TotalTime isEditMode={true} initialData={{ totalTime: classData.total_time }} />

          <h1 className="text-lg mt-14">클래스 세부요소 입력란</h1>
          <hr className="my-4 border-[#4D43B8]" />
          <Address isEditMode={true} initialData={{ address: classData.location, detailAddress: classData.detail_location }} />
          <SelectTime isEditMode={true} initialData={{ selectedDates: dateData, timeData: timeData }}/>

          <h1 className="text-lg mt-14">클래스 금액</h1>
          <hr className="my-4 border-[#4D43B8]" />
          <Price isEditMode={true} initialData={{ price: classData.price }} />

          <h1 className='text-lg mt-14'>이미지 업로드</h1>
          <hr className='my-4 border-[#4D43B8]' />
          <p className='text-base'>클래스를 대표할 이미지를 등록해 주세요. (최대 5개 등록 가능) </p>
          <p className='text-sm mt-1 text-[#7E7E7E]'>*첫번째 이미지가 대표이미지로 업로드 됩니다. 드래그하여 순서 변경이 가능합니다*</p>
          <div className="flex justify-between items-center pt-2">
            <ImageUpload isEditMode={true} initialData={{ image: classData.image }}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterEditPage;
