import { addTeacherInfo, updateUserRole } from '@/app/api/mypage/user-api';
import { noChangedNotify, noInfoNotify } from '@/components/common/Toastify';
import { fields, jobs, koreanBanks } from '@/constants/options';
import { useTeacherInfo } from '@/hooks/useLogin/useTeacherInfo';
import { useLoginStore } from '@/store/login/LoginUserIdStore';
import { useUserRoleStore } from '@/store/userRoleStore';
import React, { useEffect, useId, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import SelectOption from '../SelectOption';

const AddTeacherInfo = () => {
  const { loginUserId } = useLoginStore();
  const { isTeacher, setIsTeacher } = useUserRoleStore();
  const { teacherInfo, isPending } = useTeacherInfo();
  console.log('teacherInfo', teacherInfo);
  // const router = useRouter();

  // 선생님 정보가 담겨있으면 : true => 정보 보여주기
  // 선생님 정보가 없으면(null) : false => 정보 입력하기
  const [isHaveTeacherInfo, setIsHaveTeacherInfo] = useState(false);
  const [selectedJob, setNewSelectedJob] = useState('요리사');
  const [selectedField, setSelectedField] = useState('요리/음식');
  const [selectedBank, setSelectedBank] = useState('국민은행');
  const [userAccount, setUserAccount] = useState('');

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

    const sanitizedValue = value.replace(/\D/g, '');
    setUserAccount(sanitizedValue);
  };

  // 계좌번호 숫자만 입력하기
  const handleOnKeyDownInputOnlyNumber = () => {};

  // 선생님 정보 등록하기 버튼
  const handleOnClickAddTeacherInfoBtn = async () => {
    if (!selectedJob || !selectedField || !selectedBank || !userAccount) {
      noInfoNotify(); // 아무것도 입력되지 않은 경우
      return;
    } else {
      const confirm = window.confirm('선생님 정보를 등록하시겠습니까?');
      if (confirm) {
        addTeacherInfo({ selectedJob, selectedField, selectedBank, userAccount }, loginUserId);

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
      updateUserRole(isTeacher, loginUserId);
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
    <div>
      <div className="flex flex-col">
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
        <div className="m-4 p-4 flex gap-4">
          <span>계좌 정보</span>
          {!isHaveTeacherInfo ? (
            <input
              type="text"
              placeholder="계좌 번호를 입력해주세요."
              className="input input-bordered w-[300px]"
              value={userAccount}
              onChange={handleOnChangeAddAccount}
              onKeyDown={handleOnKeyDownInputOnlyNumber}
            />
          ) : (
            <p>{secretAccount}</p>
          )}
        </div>
      </div>
      <div className="p-4 flex gap-4">
        {isHaveTeacherInfo ? (
          <button onClick={handleOnClickMoveToEditTeacherInfoBtn} className="btn bg-point-color text-white">
            선생님 정보 수정하기
          </button>
        ) : (
          <div>
            <button onClick={handleOnClickAddTeacherInfoBtn} className="btn bg-point-color text-white">
              선생님 정보 등록하기
            </button>
            <ToastContainer />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddTeacherInfo;
