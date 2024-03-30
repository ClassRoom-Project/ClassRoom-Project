import { CancleButton, EditButton } from '@/components/common/mypage/buttons';
import Image from 'next/image';
import React, { useId } from 'react';
import BasicProfileImage from '../../../../public/profile-image.png';

const EditTeacherInfo = () => {
  // id와 htmlFor 연결 => useId 내장 훅 사용
  const jobId = useId();
  const fieldId = useId();

  const jobOptions = ['교사', '개발자', '예술가'];
  const businessFieldOptions = ['교육', 'IT', '예술'];

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
