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
      <div className="w-1/3 h-1/2 flex flex-col border bg-opacity-70 justify-center items-center">
        <ul className="steps">
          <li className="step step-primary">step 1</li>
          <li className="step">step 2</li>
          {selectTeacher === 'teacher' && <li className="step">step 3</li>}
        </ul>
        <p>로고</p>
        <input
          type="button"
          name="teacher"
          value="선생님"
          onClick={() => onTeacherSubmit('teacher')}
          className={`mt-5 block w-2/5 border btn btn-outlin py-2 text-center sm:text-sm rounded-md  ${
            selectTeacher === 'teacher' ? 'bg-slate-200' : 'bg-white hover:bg-slate-200'
          }`}
        />
        <input
          type="button"
          name="student"
          value="수강생"
          onClick={() => onTeacherSubmit('student')}
          className={`mt-5 block w-2/5 border btn btn-outlin py-2 text-center sm:text-sm rounded-md ${
            selectTeacher === 'student' ? 'bg-[#F0F6FF]' : 'bg-white hover:bg-slate-200'
          }`}
        />
        {selectTeacher === 'teacher' && (
          <Link href="/moreInfo" className="w-1/3 h-10 btn">
            다음
          </Link>
        )}
        {selectTeacher === 'student' && (
          <Link href="/signin" className="w-1/3 h-10 btn">
            다음
          </Link>
        )}
      </div>
    </div>
  );
}
