'use client';

import { getTeacherInfo, updateTeacherInfo } from '@/app/api/mypage/user-api';
import { changeInfoNotify, checkFormValidation, noChangedNotify } from '@/components/common/Toastify';
import { fields, jobs, koreanBanks } from '@/constants/options';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useId, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import SelectOption from '../SelectOption';
import { userInfoStore } from '@/store/mypage/userInfoStore';
import Image from 'next/image';
import { UpdateTeacherInfoType } from '@/types/user';

const EditTeacherInfo = () => {
  const { loginUserId } = useLoginStore();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [isActiveBtn, setIsActiveBtn] = useState(false);
  const [newSelectedJob, setNewSelectedJob] = useState('');
  const [newSelectedField, setNewSelectedField] = useState('');
  const [newSelectedBank, setNewSelectedBank] = useState('');
  const [newAccount, setNewAccount] = useState('');
  const [isAvailableAccount, setIsAvailableAccount] = useState(true); // 계좌번호 숫자만 유효성 검사
  const [newTeacherName, setNewTeacherName] = useState('');
  const [isAvailableName, setIsAvailableName] = useState(true); // 이름 유효성 검사
  const [newTeacherNumber, setNewTeacherNumber] = useState('');
  const [isAvailableNumber, setIsAvailableNumber] = useState(true); // 폰 번호 숫자만 유효성 검사

  const { data: teacherInfo, isPending } = useQuery({
    queryKey: ['updateTeacherInfo', loginUserId],
    queryFn: () => getTeacherInfo(loginUserId),
    enabled: !!loginUserId
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
      setNewTeacherName(teacherInfo ? teacherInfo.teacher_name : '');
      setNewTeacherNumber(teacherInfo ? teacherInfo.teacher_number : '');
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
    setNewAccount(value);

    // 계좌번호 숫자만 입력 가능하게 하기 : 정규 표현식 사용 (유효성 검사)
    const accountNo_reg_exp = /^[0-9]+$/;
    if (accountNo_reg_exp.test(value)) {
      setIsAvailableAccount(true);
    } else {
      setIsAvailableAccount(false);
    }
  };
  const handleOnChangeAddTeacherName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewTeacherName(value);

    // 이름 영어 대소문자 & 한글만 허용 : 정규 표현식 사용 (유효성 검사)
    const nameNumRegExp = /^[a-zA-Z가-힣]+$/;

    if (nameNumRegExp.test(value)) {
      setIsAvailableName(true);
    } else {
      setIsAvailableName(false);
    }
  };
  const handleOnChangeAddTeacherNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewTeacherNumber(value);

    // 휴대폰 번호 숫자만 입력 가능하게 하기 : 정규 표현식 사용 (유효성 검사)
    const phoneNumRegExp = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})[0-9]{3,4}[0-9]{5}$/;

    if (phoneNumRegExp.test(value)) {
      setIsAvailableNumber(true);
    } else {
      setIsAvailableNumber(false);
    }
  };

  // 선생님 정보 수정하기 : useMutation
  const { mutate: updateTeacherInfoMutation } = useMutation({
    mutationFn: ({
      newSelectedJob,
      newSelectedField,
      newSelectedBank,
      newAccount,
      newTeacherName,
      newTeacherNumber
    }: UpdateTeacherInfoType) =>
      updateTeacherInfo(
        { newSelectedJob, newSelectedField, newSelectedBank, newAccount, newTeacherName, newTeacherNumber },
        loginUserId
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['updateTeacherInfo']
      });
    }
  });

  // 수정하기 버튼 -> supabase에 수정한 정보 update
  const handleOnClickEditTeacherInfoBtn = () => {
    // 수정된 사항이 없는 경우
    const isJobChanged = newSelectedJob !== teacherInfo?.job;
    const isFieldChanged = newSelectedField !== teacherInfo?.field;
    const isSelectedBankChanged = newSelectedBank !== teacherInfo?.bank;
    const isAccountChanged = newAccount !== teacherInfo?.account;
    const isNameChanged = newTeacherName !== teacherInfo?.teacher_name;
    const isNumberChanged = newTeacherNumber !== teacherInfo?.teacher_number;

    if (
      !isJobChanged &&
      !isFieldChanged &&
      !isSelectedBankChanged &&
      !isAccountChanged &&
      !isNameChanged &&
      !isNumberChanged
    ) {
      noChangedNotify(); // react-toastify 사용
      return;
    } else if (!isAvailableName || !isAvailableNumber || !isAvailableAccount) {
      checkFormValidation();
      return;
    } else {
      // 수정된 사항이 있는 경우
      changeInfoNotify();
      updateTeacherInfoMutation({
        newSelectedJob,
        newSelectedField,
        newSelectedBank,
        newAccount,
        newTeacherName,
        newTeacherNumber
      });
      setIsEditing(false);
    }
  };

  // 취소하기 버튼
  const handleOnClickCancleBtn = () => {
    if (isEditing) {
      const confirm = window.confirm('취소하시겠습니까?');
      if (confirm) {
        setIsEditing(false);
        setIsActiveBtn(false);
        setNewSelectedJob(teacherInfo?.job || '');
        setNewSelectedField(teacherInfo?.field || '');
        setNewSelectedBank(teacherInfo?.bank || '');
        setNewAccount(teacherInfo?.account || '');
        setNewTeacherName(teacherInfo?.teacher_name || '');
        setNewTeacherNumber(teacherInfo?.teacher_number || '');
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
    <div className="flex flex-col gap-8 justify-center items-center bg-light-purple w-[960px] p-4">
      <p className=" text-center text-text-dark-gray">
        회원님이 등록하신 강사 정보입니다. <br />
        수정을 원하시면 아래 정보 수정하기 버튼을 눌러주세요.{' '}
      </p>
      <div className="flex gap-10">
        <div className="flex flex-col">
          <div className="p-4 flex flex-col gap-4">
            <p className="text-text-dark-gray font-bold">강사 이름</p>
            <div className="flex flex-col">
              {isEditing ? (
                <input
                  type="text"
                  placeholder="본명을 입력해주세요."
                  className="input input-bordered w-[250px]  border-point-purple shadow-md"
                  value={newTeacherName}
                  onChange={handleOnChangeAddTeacherName}
                />
              ) : (
                <p>{newTeacherName}</p>
              )}
              {isAvailableName ? '' : <p className="font-thin p-2">이름은 한글, 영어 대소문자만 입력 가능합니다.</p>}
            </div>
          </div>
          <div className="p-4 flex flex-col gap-4">
            <p className="text-text-dark-gray font-bold">휴대폰 번호</p>
            <div className="flex flex-col">
              {isEditing ? (
                <input
                  type="text"
                  placeholder="휴대폰 번호를 입력해주세요."
                  className="input input-bordered w-[250px]  border-point-purple shadow-md"
                  value={newTeacherNumber}
                  onChange={handleOnChangeAddTeacherNumber}
                />
              ) : (
                <p>{newTeacherNumber}</p>
              )}
              {isAvailableNumber ? '' : <p className="font-thin p-2">휴대폰 번호의 양식에 맞게 입력해주세요.</p>}
            </div>
          </div>
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
            <div className="p-4 flex gap-4 flex-col">
              <span className="text-text-dark-gray font-bold">계좌 정보</span>
              <div className="flex flex-col">
                {isEditing ? (
                  <input
                    type="text"
                    placeholder="계좌 번호를 입력해주세요."
                    className="input input-bordered w-[250px] border-point-purple shadow-md"
                    value={newAccount}
                    onChange={handleOnChangeAddAccount}
                  />
                ) : (
                  <p>{secretAccount}</p>
                )}
                {isAvailableAccount ? '' : <p className="font-thin p-2">계좌번호는 숫자만 입력 가능합니다.</p>}
              </div>
            </div>{' '}
            {/* <span>어떤 값이 들어 가야 할까요?</span> */}
            {/* <div className="m-4 p-4 flex gap-4">
              <span>총 수익</span>
            </div> */}
          </div>
        </div>
      </div>
      <div className="p-4 flex gap-4">
        <button onClick={handleOnClickCancleBtn} className="btn w-[100px] ">
          취소하기
        </button>
        {isEditing ? (
          <div>
            <button onClick={handleOnClickEditTeacherInfoBtn} className="btn w-[100px] bg-dark-purple-color text-white">
              수정 완료
            </button>
          </div>
        ) : (
          <button onClick={() => setIsEditing(true)} className="btn w-[100px] bg-dark-purple-color text-white">
            수정하기
          </button>
        )}
      </div>
    </div>
  );
};

export default EditTeacherInfo;
