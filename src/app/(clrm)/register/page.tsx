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
    <div className='p-4'>
      <h1>클래스 등록하기</h1>
      <div className='border p-4'>
        <div className='max-w-md mx-auto sm:max-w-lg lg:max-w-xl'>
          <h1 className='font-bold mt-2'>클래스 기본정보 입력란</h1>
          <hr className='my-4' />
          <Category />
          <HashTag />
          <ClassTitle />
          <ClassContent />
          <ClassTypeDiff />
          <MinMaxNumber />
          <TotalTime />
          <h1 className='font-bold mt-14'>클래스 세부요소 입력란</h1>
          <hr className='my-4' />
          <Address />
          <TimeSelect />
          <h1 className='font-bold mt-14'>클래스 금액</h1>
          <hr className='my-4' />
          <Price />
          <h1 className='font-bold mt-14'>이미지 업로드</h1>
          <hr className='my-4' />
          <p>클래스를 대표할 이미지를 등록해 주세요.</p>
          <div className="flex justify-between items-center pt-2 max-w-md mx-auto sm:max-w-lg lg:max-w-xl">
            <ImageUpload />
          </div>
         </div>
        </div>
      </div>
  );
};

export default RegisterPage;
