'use client';

import { getTeacherInfo, updateTeacherInfo } from '@/app/api/mypage/user-api';
import { noChangedNotify } from '@/components/common/Toastify';
import { fields, jobs, koreanBanks } from '@/constants/options';
import { useLoginStore } from '@/store/login/LoginUserIdStore';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useId, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import SelectOption from '../SelectOption';
import { useUserStore } from '@/store/userInfoStore';

const EditTeacherInfo = () => {
  const { loginUserId } = useLoginStore();

  const [isEditing, setIsEditing] = useState(false);
  const [isActiveBtn, setIsActiveBtn] = useState(false);
  const [newSelectedJob, setNewSelectedJob] = useState('');
  const [newSelectedField, setNewSelectedField] = useState('');
  const [newSelectedBank, setNewSelectedBank] = useState('');
  const [newAccount, setNewAccount] = useState('');

  const { userInfo } = useUserStore();

  const { data: teacherInfo, isPending } = useQuery({
    queryKey: ['user', loginUserId],
    queryFn: () => getTeacherInfo(loginUserId)
  });

  // id와 htmlFor 연결 => useId 내장 훅 사용
  const jobId = useId();
  const fieldId = useId();
  const bankId = useId();

  // 초기 직업/ 비지니스 분야
  useEffect(() => {
    if (teacherInfo) {
      setNewSelectedJob(teacherInfo.job);
      setNewSelectedField(teacherInfo.field);
      setNewSelectedBank(teacherInfo ? teacherInfo?.bank : '');
      setNewAccount(teacherInfo ? teacherInfo.account : '');
    }
  }, [teacherInfo]);

  const handleOnChangeJob = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewSelectedJob(e.target.value);
  };
  const handleOnChangeField = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewSelectedField(e.target.value);
  };
  const handleOnChangeSelectedBank = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewSelectedBank(e.target.value);
  };
  const handleOnChangeAddAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 계좌번호 숫자만 입력 가능하게 하기 (유효성 검사)
    setNewAccount(value);
  };

  // 수정하기 버튼 -> supabase에 수정한 정보 update
  const handleOnClickEditTeacherInfoBtn = () => {
    // 수정된 사항이 없는 경우
    const isJobChanged = newSelectedJob !== teacherInfo?.job;
    const isFieldChanged = newSelectedField !== teacherInfo?.field;
    const isSelectedBankChanged = newSelectedBank !== teacherInfo?.bank;
    const isAccountChanged = newAccount !== teacherInfo?.account;

    if (!isJobChanged && !isFieldChanged && !isSelectedBankChanged && !isAccountChanged) {
      noChangedNotify(); // react-toastify 사용
      return;
    }

    // 수정된 사항이 있는 경우
    updateTeacherInfo({ newSelectedJob, newSelectedField, newSelectedBank, newAccount }, loginUserId);
    setIsEditing(false);
    alert('선생님 정보 수정이 완료되었습니다.');
  };

  // 취소하기 버튼
  const handleOnClickCancleBtn = () => {
    if (isEditing) {
      const confirm = window.confirm('취소하시겠습니까?');
      if (confirm) {
        setIsEditing(false);
        setIsActiveBtn(false);
      }
    }
  };

  // 계좌번호 앞 6자리 남기고 가리기
  const secretAccount =
    newAccount && newAccount.length > 6 ? newAccount.slice(0, 6) + '*'.repeat(newAccount.length - 6) : newAccount;

  if (isPending) {
    return <div> 로딩중 ... </div>;
  }

  if (!teacherInfo) {
    return <div> 선생님 정보가 없습니다.</div>;
  }

  return (
    <div className="flex">
      <div className="flex flex-col items-center p-4 gap-4">
        <img src={userInfo?.profile_image} alt="기본 프로필 이미지" width={100} height={100} className="rounded-full" />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col">
          <SelectOption
            id={jobId}
            label="직업"
            value={newSelectedJob}
            onChange={handleOnChangeJob}
            disabled={!isEditing}
            options={jobs}
          />
          <SelectOption
            id={fieldId}
            label="비지니스 분야"
            value={newSelectedField}
            onChange={handleOnChangeField}
            disabled={!isEditing}
            options={fields}
          />
          <SelectOption
            id={bankId}
            label="은행"
            value={newSelectedBank}
            onChange={handleOnChangeSelectedBank}
            disabled={!isEditing}
            options={koreanBanks}
          />
          <div className="m-4 p-4 flex gap-4">
            <span>계좌 정보</span>
            {isEditing ? (
              <input
                type="text"
                placeholder="계좌 번호를 입력해주세요."
                className="input input-bordered w-[300px]"
                value={newAccount}
                onChange={handleOnChangeAddAccount}
              />
            ) : (
              <p>{secretAccount}</p>
            )}
          </div>
          <div className="m-4 p-4 flex gap-4">
            <span>총 수익</span>
            {/* <span>어떤 값이 들어 가야 할까요?</span> */}
          </div>
        </div>
        <div className="p-4 flex gap-4">
          {isEditing ? (
            <div>
              <button onClick={handleOnClickEditTeacherInfoBtn} className="btn w-[100px]">
                수정 완료
              </button>
              <ToastContainer />
            </div>
          ) : (
            <button onClick={() => setIsEditing(true)} className="btn w-[100px]">
              수정하기
            </button>
          )}
          <button onClick={handleOnClickCancleBtn} className="btn w-[100px]  bg-point-color text-white">
            취소하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTeacherInfo;
