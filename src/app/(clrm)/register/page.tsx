import React from 'react';
import Address from '@/components/register/Address';
import ClassContent from '@/components/register/ClassContent';
import ClassTitle from '@/components/register/ClassTitle';
import Price from '@/components/register/Price';
import TimeSelect from '@/components/register/TimeSelect';
import Category from '@/components/register/Category';
import HashTag from '@/components/register/HashTag';
import MinMaxNumber from '@/components/register/MinMaxNumber';
import ClassTypeDiff from '@/components/register/ClassTypeDiff';
import ImageUpload from '@/components/register/ImageUpload';
import TotalTime from '@/components/register/TotalTime';

const RegisterPage = () => {
  return (
    <div className='max-w-4xl mx-auto p-4'>
      <h1 className='text-xl text-[#7E7E7E] font-bold my-2'>클래스 등록하기</h1>
      <div className='border bg-[#FCFCFF] p-4'>
        <div className='p-8'>
          <h1 className='text-lg mt-1'>클래스 기본정보 입력란</h1>
          <hr className='my-4 border-[#4D43B8]' />
          <Category />
          <HashTag />
          <ClassTitle />
          <ClassContent />
          <ClassTypeDiff />
          <MinMaxNumber />
          <TotalTime />

          <h1 className='text-lg mt-14'>클래스 세부요소 입력란</h1>
          <hr className='my-4 border-[#4D43B8]' />
          <Address />
          <TimeSelect />

          <h1 className='text-lg mt-14'>클래스 금액</h1>
          <hr className='my-4 border-[#4D43B8]' />
          <Price />

          <h1 className='text-lg mt-14'>이미지 업로드</h1>
          <hr className='my-4 border-[#4D43B8]' />
          <p className='text'>클래스를 대표할 이미지를 등록해 주세요.</p>
          <div className="flex justify-between items-center pt-2">
            <ImageUpload />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
