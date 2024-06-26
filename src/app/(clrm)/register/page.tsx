import React from 'react';
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
import { Metadata } from "next"

export const metadata: Metadata = {
  title: '클룸 클래스 등록 페이지',
  description: '나만의 클래스 정보를 입력하고 등록할 수 있는 페이지입니다. ',
  icons: {
    icon: '/logo.svg'
  }
};

const RegisterPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-xl text-[#7E7E7E] font-bold my-2">클래스 등록하기</h1>
      <div className="border border-[#FCFCFF] bg-[#FCFCFF] py-4 px-1 sm:px-2 shadow-md">
        <div className="p-4 md:p-6 lg:p-8">
          <h1 className="text-md md:text-lg lg:text-xl mt-1">클래스 기본정보 입력란</h1>
          <hr className="my-4 border-[#4D43B8]" />
          <p className='text-sm mt-1 text-[#4D4D4D]'>* 표시는 필수 입력 항목입니다</p>
          <Category isEditMode={false} />
          <HashTag isEditMode={false} />
          <ClassTitleType isEditMode={false} />
          <ClassContent isEditMode={false} />
          <ClassDiff isEditMode={false} />
          <MinMaxNumber isEditMode={false} />
          <TotalTime isEditMode={false} />

          <h1 className="text-md md:text-lg lg:text-xl mt-16">클래스 세부요소 입력란</h1>
          <hr className="my-4 border-[#4D43B8]" />
          <Address isEditMode={false} />
          <SelectTime isEditMode={false} />

          <h1 className="text-md md:text-lg lg:text-xl mt-16">클래스 금액</h1>
          <hr className="my-4 border-[#4D43B8]" />
          <Price isEditMode={false} />

          <h1 className="text-md md:text-lg lg:text-xl mt-16">이미지 업로드</h1>
          <hr className='my-4 border-[#4D43B8]' />
          <p className="text-sm md:text-base lg:text-base text-[#3F3F3F] flex-shrink-0 font-bold">
            <span className='text-[#d63232] font-bold'>*</span> 
            클래스를 대표할 이미지를 등록해 주세요. (최소 1개 이상 등록, 최대 5개 등록 가능) 
          </p>
          <p className='text-sm mt-1 text-[#4D4D4D]'>첫번째 이미지가 대표이미지로 업로드 됩니다. 드래그하여 순서 변경이 가능합니다</p>
          <div className="flex justify-between items-center pt-2">
            <ImageUpload isEditMode={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
