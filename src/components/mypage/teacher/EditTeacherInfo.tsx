import { CancleButton, EditButton } from '@/components/common/mypage/buttons';
import Image from 'next/image';
import React, { useId } from 'react';
import BasicProfileImage from '../../../../public/profile-image.png';
import { FieldType, JobType } from '@/types/user';

const EditTeacherInfo = () => {
  // id와 htmlFor 연결 => useId 내장 훅 사용
  const jobId = useId();
  const fieldId = useId();
  const bankId = useId();

  const jobOptions: JobType[] = ['교사', '요리사', '개발자', '운동선수', '음악가', '예술가', '뷰티'];
  const businessFieldOptions: FieldType[] = ['교육', '요리', 'IT', '스포츠', '피아니스트', '공방', '애견미용'];
  const koreanBanks = [
    '국민은행',
    '우리은행',
    '신한은행',
    '하나은행',
    '기업은행',
    '농협은행',
    'KEB하나은행',
    'SC제일은행',
    '씨티은행',
    'BNK경남은행',
    '광주은행',
    '대구은행',
    '부산은행',
    '전북은행',
    '제주은행',
    '카카오뱅크'
  ];

  return (
    <div className="flex">
      <div className="flex flex-col items-center p-4 gap-4">
        <Image src={BasicProfileImage} alt="기본 프로필 이미지" width={100} height={100} />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col">
          <form className="m-4 p-4 flex gap-4">
            <label id={jobId}>직업</label>
            <select name="job" id={jobId} className="border w-40">
              {jobOptions.map((option) => {
                return (
                  <option value={option} key={option}>
                    {option}
                  </option>
                );
              })}
            </select>
          </form>
          <form className="m-4 p-4 flex gap-4">
            <label id={fieldId}>비지니스 분야</label>
            <select name="businessField" id={fieldId} className="border w-40">
              {businessFieldOptions.map((option) => {
                return (
                  <option value={option} key={option}>
                    {option}
                  </option>
                );
              })}
            </select>
          </form>
          <form className="m-4 p-4 flex gap-4">
            <label id={bankId}>은행</label>
            <select name="job" id={bankId} className="border w-40">
              {koreanBanks.map((bank) => {
                return (
                  <option value={bank} key={bank}>
                    {bank}
                  </option>
                );
              })}
            </select>
          </form>
          <div className="m-4 p-4 flex gap-4">
            <span>계좌 정보</span>
            <input type="text" className="border" />
          </div>
          <div className="m-4 p-4 flex gap-4">
            <span>총 수익</span>
            <input type="text" className="border" />
          </div>
        </div>
        <div className="p-4 flex gap-4">
          <EditButton />
          <CancleButton />
        </div>
      </div>
    </div>
  );
};

export default EditTeacherInfo;
