import { addTeacherInfo, updateUserRole } from '@/app/api/mypage/user-api';
import { checkFormValidation, noChangedNotify, noInfoNotify } from '@/components/common/Toastify';
import { fields, jobs, koreanBanks } from '@/constants/options';
import { useTeacherInfo } from '@/hooks/useLogin/useTeacherInfo';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useUserRoleStore } from '@/store/mypage/userRoleStore';
import React, { useEffect, useId, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import SelectOption from '../SelectOption';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InsertTeacherInfo } from '@/types/user';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const AddTeacherInfo = () => {
  const { loginUserId } = useLoginStore();
  const { isTeacher, setIsTeacher } = useUserRoleStore();
  const { teacherInfo, isPending } = useTeacherInfo();
  const router = useRouter();
  const queryClient = useQueryClient();

  // 선생님 정보가 담겨있으면 : true => 정보 보여주기
  // 선생님 정보가 없으면(null) : false => 정보 입력하기
  const [isHaveTeacherInfo, setIsHaveTeacherInfo] = useState(false);
  const [selectedJob, setNewSelectedJob] = useState(''); // 직업 선택
  const [selectedField, setSelectedField] = useState(''); // 분야 선택
  const [selectedBank, setSelectedBank] = useState(''); // 은행 선택
  const [userAccount, setUserAccount] = useState(''); // 계좌 입력
  const [isAvailableAccount, setIsAvailableAccount] = useState(true); // 계좌 숫자만 유효성 검사
  const [teacherName, setTeacherName] = useState(''); // 강사 이름
  const [isAvailableName, setIsAvailableName] = useState(true); // 이름 유효성 검사
  const [teacherNumber, setTeacherNumber] = useState(''); // 강사 휴대폰 번호
  const [isAvailableNumber, setIsAvailableNumber] = useState(true); // 폰 번호 숫자만 유효성 검사

  // id와 htmlFor 연결 => useId 내장 훅 사용
  const jobId = useId();
  const fieldId = useId();
  const bankId = useId();

  useEffect(() => {
    if (teacherInfo && teacherInfo.job) {
      setIsHaveTeacherInfo(true);
      setNewSelectedJob(teacherInfo.job);
      setSelectedField(teacherInfo.field);
      setSelectedBank(teacherInfo.bank);
      setUserAccount(teacherInfo.account);
      setTeacherName(teacherInfo.teacher_name);
      setTeacherNumber(teacherInfo.teacher_number);
    }
  }, [teacherInfo]);

  const handleOnChangeJob = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewSelectedJob(e.target.value);
  };
  const handleOnChangeField = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedField(e.target.value);
  };
  const handleOnChangeSelectedBank = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBank(e.target.value);
  };
  const handleOnChangeAddAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserAccount(value);

    // 계좌번호 숫자만 입력 가능하게 하기 : 정규 표현식 사용 (유효성 검사)
    const accountNoRegExp = /^[0-9]+$/;
    if (accountNoRegExp.test(value)) {
      setIsAvailableAccount(true);
    } else {
      setIsAvailableAccount(false);
    }
  };
  const handleOnChangeAddTeacherName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTeacherName(value);

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
    setTeacherNumber(value);

    // 휴대폰 번호 숫자만 입력 가능하게 하기 : 정규 표현식 사용 (유효성 검사)
    const phoneNumRegExp = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})[0-9]{3,4}[0-9]{5}$/;

    if (phoneNumRegExp.test(value)) {
      setIsAvailableNumber(true);
    } else {
      setIsAvailableNumber(false);
    }
  };

  // 선생님 정보 수정 mutation
  const { mutate: updateTeacherInfo } = useMutation({
    mutationFn: ({
      selectedJob,
      selectedField,
      selectedBank,
      userAccount,
      teacherName,
      teacherNumber
    }: InsertTeacherInfo) =>
      addTeacherInfo(
        { selectedJob, selectedField, selectedBank, userAccount, teacherName, teacherNumber },
        loginUserId
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['updateTeacherInfo']
      });
    }
  });

  // 선생님 정보 등록하기 버튼
  const handleOnClickAddTeacherInfoBtn = async () => {
    if (!selectedJob || !selectedField || !selectedBank || !userAccount || !teacherName || !teacherNumber) {
      noInfoNotify(); // 아무것도 입력되지 않은 경우
      return;
    } else if (!isAvailableName || !isAvailableNumber || !isAvailableAccount) {
      checkFormValidation();
      return;
    } else {
      const confirm = window.confirm('선생님 정보를 등록하시겠습니까?');
      if (confirm) {
        updateTeacherInfo({ selectedJob, selectedField, selectedBank, userAccount, teacherName, teacherNumber });

        // 수강생에서 선생님으로 전환 로직 추가
        setIsHaveTeacherInfo(true);
        return teacherInfo;
      }
    }
  };

  // 선생님 정보 수정하기 버튼 : 선생님으로 전환 && 선생님 마이페이지로 이동
  const handleOnClickMoveToEditTeacherInfoBtn = () => {
    const confirm = window.confirm('선생님으로 전환됩니다. 선생님 마이페이지로 이동하시겠습니까?');
    if (confirm) {
      // 선생님 마이페이지로 이동하는 로직
      updateUserRole(!!isTeacher, loginUserId);
      setIsTeacher(true);
      router.push('teacherMypage?teacherTab=editTeacherInfo');
    }
  };

  // 계좌번호 앞 6자리 남기고 가리기
  const secretAccount =
    userAccount && userAccount.length > 6 ? userAccount.slice(0, 6) + '*'.repeat(userAccount.length - 6) : userAccount;

  if (isPending) {
    return (
      <div className="flex h-auto flex-col items-center justify-center gap-4">
        <LoadingSpinner />
        <p>잠시만 기다려주세요..</p>
      </div>
    );
  }

  if (!teacherInfo) {
    return <div> 선생님 정보가 없습니다.</div>;
  }
  return (
    <div className="mb-16 flex w-full flex-col items-center justify-center gap-6 bg-light-purple py-4 md:mb-0 md:w-full md:justify-items-center md:p-4 lg:w-full">
      <p className="flex items-start pt-4 text-xl font-bold text-dark-purple-color">선생님 정보 등록하기</p>
      {isHaveTeacherInfo ? (
        <p className=" py-4 text-center text-text-dark-gray">
          선생님 정보가 이미 등록되었습니다. <br />
          선생님 마이페이지에서 정보를 수정해주세요.
        </p>
      ) : (
        <p className=" py-4 text-center text-text-dark-gray">아래의 해당 정보를 입력하여 강사로 등록해보세요!</p>
      )}
      <div className="flex justify-center">
        <div className="flex w-full flex-col items-start justify-center gap-4 md:flex-row md:gap-10">
          <div className="flex w-[350px] flex-col items-start justify-center md:items-end">
            <div className="flex flex-col">
              <div className="flex flex-col gap-4 p-4">
                <p className="font-bold text-text-dark-gray">강사 이름</p>
                <div className="flex flex-col">
                  {!isHaveTeacherInfo ? (
                    <input
                      type="text"
                      placeholder="본명을 입력해주세요."
                      className="input input-bordered w-[318px] border-point-purple shadow-md md:w-[200px] lg:w-[250px]"
                      value={teacherName}
                      onChange={handleOnChangeAddTeacherName}
                    />
                  ) : (
                    <p>{teacherName}</p>
                  )}
                  {isAvailableName ? (
                    ''
                  ) : (
                    <p className="w-[318px] p-2 font-thin md:w-[200px] lg:w-[250px]">
                      이름은 한글, 영어 대소문자만 입력 가능합니다.
                    </p>
                  )}
                </div>
              </div>
              <div className=" flex flex-col gap-4 p-4">
                <p className="font-bold text-text-dark-gray">휴대폰 번호</p>
                <div className="flex flex-col">
                  {!isHaveTeacherInfo ? (
                    <input
                      type="text"
                      placeholder="휴대폰 번호를 입력해주세요."
                      className="input input-bordered w-[318px] border-point-purple shadow-md md:w-[200px] lg:w-[250px]"
                      value={teacherNumber}
                      onChange={handleOnChangeAddTeacherNumber}
                    />
                  ) : (
                    <p>{teacherNumber}</p>
                  )}
                  {isAvailableNumber ? (
                    ''
                  ) : (
                    <p className="w-[318px] p-2 font-thin md:w-[200px] lg:w-[250px]">
                      휴대폰 번호의 양식에 맞게 입력해주세요(- 제외).
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-[350px] flex-col">
            <SelectOption
              id={jobId}
              label="직업"
              value={selectedJob}
              onChange={handleOnChangeJob}
              disabled={isHaveTeacherInfo}
              options={jobs}
            />
            <SelectOption
              id={fieldId}
              label="비지니스 분야"
              value={selectedField}
              onChange={handleOnChangeField}
              disabled={isHaveTeacherInfo}
              options={fields}
            />
            <SelectOption
              id={bankId}
              label="은행"
              value={selectedBank}
              onChange={handleOnChangeSelectedBank}
              disabled={isHaveTeacherInfo}
              options={koreanBanks}
            />
            <div className=" flex flex-col gap-4 p-4">
              <p className="font-bold text-text-dark-gray">계좌 정보</p>
              <div className="flex flex-col">
                {!isHaveTeacherInfo ? (
                  <input
                    type="text"
                    placeholder="계좌 번호를 입력해주세요."
                    className="input input-bordered w-full border-point-purple shadow-md md:w-[200px] lg:w-[250px]"
                    value={userAccount}
                    onChange={handleOnChangeAddAccount}
                  />
                ) : (
                  <p>{secretAccount}</p>
                )}{' '}
                {isAvailableAccount ? '' : <p className="p-2 font-thin">계좌번호는 숫자만 입력 가능합니다.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 p-4">
        {isHaveTeacherInfo ? (
          <button
            onClick={handleOnClickMoveToEditTeacherInfoBtn}
            className="btn bg-dark-purple-color text-white hover:bg-white hover:text-dark-purple-color"
          >
            선생님 정보 수정하기
          </button>
        ) : (
          <div>
            <button
              onClick={handleOnClickAddTeacherInfoBtn}
              className="btn bg-dark-purple-color text-white hover:bg-white hover:text-dark-purple-color"
            >
              선생님 정보 등록하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddTeacherInfo;
