import { addTeacherInfo, updateUserRole } from '@/app/api/mypage/user-api';
import { noChangedNotify, noInfoNotify } from '@/components/common/Toastify';
import { fields, jobs, koreanBanks } from '@/constants/options';
import { useTeacherInfo } from '@/hooks/useLogin/useTeacherInfo';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useUserRoleStore } from '@/store/mypage/userRoleStore';
import React, { useEffect, useId, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import SelectOption from '../SelectOption';

const AddTeacherInfo = () => {
  const { loginUserId } = useLoginStore();
  const { isTeacher, setIsTeacher } = useUserRoleStore();
  const { teacherInfo, isPending } = useTeacherInfo();
  // console.log('teacherInfo', teacherInfo);

  // 선생님 정보가 담겨있으면 : true => 정보 보여주기
  // 선생님 정보가 없으면(null) : false => 정보 입력하기
  const [isHaveTeacherInfo, setIsHaveTeacherInfo] = useState(false);
  const [selectedJob, setNewSelectedJob] = useState('요리사'); // 직업 선택
  const [selectedField, setSelectedField] = useState('요리/음식'); // 분야 선택
  const [selectedBank, setSelectedBank] = useState('국민은행'); // 은행 선택
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

  // 선생님 정보 등록하기 버튼
  const handleOnClickAddTeacherInfoBtn = async () => {
    if (!selectedJob || !selectedField || !selectedBank || !userAccount || !teacherName || !teacherNumber) {
      noInfoNotify(); // 아무것도 입력되지 않은 경우
      return;
    } else {
      const confirm = window.confirm('선생님 정보를 등록하시겠습니까?');
      if (confirm) {
        addTeacherInfo(
          { selectedJob, selectedField, selectedBank, userAccount, teacherName, teacherNumber },
          loginUserId
        );

        // 수강생에서 선생님으로 전환 로직 추가
        setIsHaveTeacherInfo(true);
        // console.log('data', data);
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
      setIsTeacher(!isTeacher);
    }
  };

  // 계좌번호 앞 6자리 남기고 가리기
  const secretAccount =
    userAccount && userAccount.length > 6 ? userAccount.slice(0, 6) + '*'.repeat(userAccount.length - 6) : userAccount;

  if (isPending) {
    return <div> 로딩중 ... </div>;
  }

  if (!teacherInfo) {
    return <div> 선생님 정보가 없습니다.</div>;
  }
  return (
    <div className="flex flex-col gap-8 justify-center items-center bg-light-purple w-[960px] p-4">
      <p className=" text-center text-text-dark-gray">아래의 해당 정보를 입력하여 강사로 등록해보세요!</p>
      <div className="flex">
        <div className="flex flex-col">
          <div className="p-4 flex flex-col gap-4">
            <p className="text-text-dark-gray font-bold">강사 이름</p>
            <div className="flex flex-col">
              {!isHaveTeacherInfo ? (
                <input
                  type="text"
                  placeholder="본명을 입력해주세요."
                  className="input input-bordered w-[250px] border-point-purple shadow-md"
                  value={teacherName}
                  onChange={handleOnChangeAddTeacherName}
                />
              ) : (
                <p>{teacherName}</p>
              )}
              {isAvailableName ? '' : <p className="font-thin p-2">이름은 한글, 영어 대소문자만 입력 가능합니다.</p>}
            </div>
          </div>
          <div className=" p-4 flex flex-col gap-4">
            <p className="text-text-dark-gray font-bold">휴대폰 번호</p>
            <div className="flex flex-col">
              {!isHaveTeacherInfo ? (
                <input
                  type="text"
                  placeholder="휴대폰 번호를 입력해주세요."
                  className="input input-bordered w-[250px] border-point-purple shadow-md"
                  value={teacherNumber}
                  onChange={handleOnChangeAddTeacherNumber}
                />
              ) : (
                <p>{teacherNumber}</p>
              )}
              {isAvailableNumber ? (
                ''
              ) : (
                <p className="font-thin p-2">휴대폰 번호의 양식에 맞게 입력해주세요(- 제외).</p>
              )}
            </div>
          </div>
        </div>
        <div>
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
          <div className=" p-4 flex flex-col gap-4">
            <p className="text-text-dark-gray font-bold">계좌 정보</p>
            <div className="flex flex-col">
              {!isHaveTeacherInfo ? (
                <input
                  type="text"
                  placeholder="계좌 번호를 입력해주세요."
                  className="input input-bordered w-[250px] border-point-purple shadow-md"
                  value={userAccount}
                  onChange={handleOnChangeAddAccount}
                />
              ) : (
                <p>{secretAccount}</p>
              )}{' '}
              {isAvailableAccount ? '' : <p className="font-thin p-2">계좌번호는 숫자만 입력 가능합니다.</p>}
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 flex gap-4">
        {isHaveTeacherInfo ? (
          <button onClick={handleOnClickMoveToEditTeacherInfoBtn} className="btn bg-dark-purple-color text-white">
            선생님 정보 수정하기
          </button>
        ) : (
          <div>
            <button onClick={handleOnClickAddTeacherInfoBtn} className="btn bg-dark-purple-color text-white">
              선생님 정보 등록하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddTeacherInfo;
