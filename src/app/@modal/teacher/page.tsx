'use client';

import useNewUserStore from '@/hooks/authStore.ts/store';
import Link from 'next/link';
import { useState } from 'react';

export default function TeacherModal() {
  const setTeacher = useNewUserStore((state) => state.setTeacher);
  const [selectTeacher, setSelectTeacher] = useState<string>('');

  const onTeacherSubmit = (name: string) => {
    const isTeacher = name === 'teacher';
    setTeacher(isTeacher);
    setSelectTeacher(name);
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col items-center p-4 bg-white rounded-lg border w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <p className="text-2xl font-bold ">회원가입</p>
        <ul className="steps">
          <li className="step step-primary">step 1</li>
          <li className="step">step 2</li>
          {selectTeacher === 'teacher' && <li className="step">step 3</li>}
        </ul>
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
        {selectTeacher === 'teacher' && (
          <Link href="/moreInfo" className="button-field">
            다음
          </Link>
        )}
        {selectTeacher === 'student' && (
          <Link href="/signin" className="button-field">
            다음
          </Link>
        )}
      </div>
    </div>
  );
}
