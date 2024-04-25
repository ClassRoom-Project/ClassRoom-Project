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

const RegisterPage = () => {
  return (
    <div className="responsiveHeight h-screen">
      <div className="mx-auto max-w-4xl overflow-y-auto p-4">
        <h1 className="my-2 text-xl font-bold text-[#7E7E7E]">클래스 등록하기</h1>
        <div className="border border-[#FCFCFF] bg-[#FCFCFF] p-4 shadow-md">
          <div className="p-8">
            <h1 className="mt-1 text-lg">클래스 기본정보 입력란</h1>
            <hr className="my-4 border-[#4D43B8]" />
            <Category isEditMode={false} />
            <HashTag isEditMode={false} />
            <ClassTitleType isEditMode={false} />
            <ClassContent isEditMode={false} />
            <ClassDiff isEditMode={false} />
            <MinMaxNumber isEditMode={false} />
            <TotalTime isEditMode={false} />

            <h1 className="mt-14 text-lg">클래스 세부요소 입력란</h1>
            <hr className="my-4 border-[#4D43B8]" />
            <Address isEditMode={false} />
            <SelectTime isEditMode={false} />

            <h1 className="mt-14 text-lg">클래스 금액</h1>
            <hr className="my-4 border-[#4D43B8]" />
            <Price isEditMode={false} />

            <h1 className="mt-14 text-lg">이미지 업로드</h1>
            <hr className="my-4 border-[#4D43B8]" />
            <p className="text-base">클래스를 대표할 이미지를 등록해 주세요. (최대 5개 등록 가능) </p>
            <p className="mt-1 text-sm text-[#7E7E7E]">
              *첫번째 이미지가 대표이미지로 업로드 됩니다. 드래그하여 순서 변경이 가능합니다*
            </p>
            <div className="flex items-center justify-between pt-2">
              <ImageUpload isEditMode={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
