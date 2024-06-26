'use client';

import Head from 'next/head';
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
import { ClassData } from '@/types/editClass';

interface DateItem {
  day: string;
  times: string[];
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
    image: []
  });

  const [dateData, setDateData] = useState<DateItem[]>([]);
  const path = usePathname();
  const classId = path.split('/').pop();

  useEffect(() => {
    const fetchClassData = async () => {
      const { data, error } = await supabase.from('class').select('*').eq('class_id', classId).single();

      if (error) {
        console.error('Error: ', error);
        return;
      }
      setClassData(data);
    };

    const fetchDateAndTimeData = async () => {
      let { data: fetchedDateData, error: dateError } = await supabase
        .from('date')
        .select('date_id, day')
        .eq('class_id', classId);

      if (dateError) {
        console.error('Date Error: ', dateError);
        return;
      }

      // 시간 데이터 가져오기
      let combinedData = [];
      if (fetchedDateData) {
        for (let dateItem of fetchedDateData) {
          let { data: fetchedTimeData, error: timeError } = await supabase
            .from('time')
            .select('time_id, times')
            .eq('date_id', dateItem.date_id);
          if (timeError) {
            console.error('Time Error: ', timeError);
            continue;
          }
          combinedData.push({
            day: dateItem.day,
            times: fetchedTimeData ? fetchedTimeData.map((item) => item.times) : []
          });
        }
      }
      setDateData(combinedData);
    };

    fetchClassData();
    fetchDateAndTimeData();
  }, [classId]);

  return (
    <>
      <Head>
        <title>클룸 클래스 수정 페이지</title>
        <meta name="description" content="등록한 클래스를 수정할 수 있는 페이지입니다." />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <div className="mx-auto max-w-4xl p-4">
        <h1 className="my-2 text-xl font-bold text-[#7E7E7E]">클래스 등록하기</h1>
        <div className="border border-[#FCFCFF] bg-[#FCFCFF] py-4 px-1 sm:px-2 shadow-md">
          <div className="p-4 md:p-6 lg:p-8">
            <h1 className="text-md md:text-lg lg:text-xl mt-1">클래스 기본정보 입력란</h1>
            <hr className="my-4 border-[#4D43B8]" />
            <p className='text-sm mt-1 text-[#4D4D4D]'>* 표시는 필수 입력 항목입니다</p>
            <Category isEditMode={true} initialData={{ category: classData.category }} />
            <HashTag isEditMode={true} initialData={{ subCategory: classData.hashtag }} />
            <ClassTitleType
              isEditMode={true}
              initialData={{ title: classData.title, class_type: classData.class_type }}
            />
            <ClassContent isEditMode={true} initialData={{ classContent: classData.description }} />
            <ClassDiff isEditMode={true} initialData={{ difficulty: classData.difficulty }} />
            <MinMaxNumber
              isEditMode={true}
              initialData={{ minNumber: classData.min_people, personnel: classData.quantity }}
            />
            <TotalTime isEditMode={true} initialData={{ totalTime: classData.total_time }} />

            <h1 className="text-md md:text-lg lg:text-xl mt-16">클래스 세부요소 입력란</h1>
            <hr className="my-4 border-[#4D43B8]" />
            <Address isEditMode={true} initialData={{ address: classData.location, detailAddress: classData.detail_location }} />
            <SelectTime isEditMode={true} initialData={{ schedules: dateData.map(dateItem => ({ date: dateItem.day, times: dateItem.times })) }} class_Id={classId as string}/>

            <h1 className="text-md md:text-lg lg:text-xl mt-16">클래스 금액</h1>
            <hr className="my-4 border-[#4D43B8]" />
            <Price isEditMode={true} initialData={{ price: classData.price }} />

            <h1 className="text-md md:text-lg lg:text-xl mt-16">이미지 업로드</h1>
            <hr className="my-4 border-[#4D43B8]" />
            <p className="text-sm md:text-base lg:text-base text-[#3F3F3F] flex-shrink-0 font-bold">
              <span className='text-[#d63232] font-bold'>*</span> 
              클래스를 대표할 이미지를 등록해 주세요. (최소 1개 이상 등록, 최대 5개 등록 가능){' '}
            </p>
            <p className="mt-1 text-sm text-[#4D4D4D]">
              첫번째 이미지가 대표이미지로 업로드 됩니다. 드래그하여 순서 변경이 가능합니다
            </p>
            <div className="flex items-center justify-between pt-2">
              <ImageUpload isEditMode={true} initialData={{ image: classData.image }} class_Id={classId as string} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterEditPage;
