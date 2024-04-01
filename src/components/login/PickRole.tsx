'use client';

import useNewUserStore from '@/store/authStore.ts/store';
import { RoleType } from '@/types/user';
import Link from 'next/link';
import { useState } from 'react';

interface PickRoleModalProps {
  nextStep: () => void;
  twoNextStep: () => void;
}

export default function PickRoleModal({ nextStep, twoNextStep }: PickRoleModalProps) {
  const setTeacher = useNewUserStore((state) => state.setTeacher);
  const [selectTeacher, setSelectTeacher] = useState<string>('');

  const onTeacherSubmit = (name: RoleType) => {
    const isTeacher = name === 'teacher';
    setTeacher(isTeacher);
    setSelectTeacher(name);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      <div className="flex flex-col items-center p-4 bg-white rounded-lg border w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <p className="text-2xl font-bold ">회원가입</p>
        <ul className="steps w-full mb-4">
          <li className="step step-primary">step 1</li>
          <li className="step">step 2</li>
          {selectTeacher === 'teacher' ? <li className="step">step 3</li> : ''}
        </ul>
        <div className="flex flex-col items-center justify-center w-4/5 md:w-2/3 lg:w-1/2 h-full">
          <input
            type="button"
            name="teacher"
            value="선생님"
            onClick={() => onTeacherSubmit('teacher')}
            className={`${'input-field'}  ${
              selectTeacher === 'teacher' ? 'bg-slate-200' : 'bg-white hover:bg-slate-200'
            }`}
          />
          <input
            type="button"
            name="student"
            value="수강생"
            onClick={() => onTeacherSubmit('student')}
            className={`${'input-field'}  ${
              selectTeacher === 'student' ? 'bg-[#F0F6FF]' : 'bg-white hover:bg-slate-200'
            }`}
          />
          {selectTeacher === 'teacher' ? (
            <button onClick={nextStep} className="button-field">
              다음
            </button>
          ) : (
            <button onClick={twoNextStep} className="button-field">
              다음
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
