'use client';

import useNewUserStore from '@/store/authStore.ts/store';
import { FIELDS, JOBS } from '@/types/user';
import { La_Belle_Aurore } from 'next/font/google';
import Link from 'next/link';
import { useId } from 'react';

interface MoreInfoModalProps {
  nextStep: () => void;
  previousStep: () => void;
}

export default function MoreInfoModal({ nextStep, previousStep }: MoreInfoModalProps) {
  const { setJob, setField, job, field } = useNewUserStore((state) => ({
    setJob: state.setJob,
    setField: state.setField,
    job: state.job,
    field: state.field
  }));

  const handleJobChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setJob(e.target.value);
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setField(e.target.value);
  };

  const id = useId();

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      <div className="flex flex-col items-center p-4 bg-white rounded-lg border w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <p className="text-xl font-bold mb-4">회원가입</p>
        <ul className="steps w-full mb-4">
          <li className="step step-primary">step 1</li>
          <li className="step step-primary">step 2</li>
          <li className="step">step 2</li>
        </ul>
        <div className="flex flex-col w-4/5 md:w-2/3 lg:w-1/2">
          <div className="mb-4">
            <label htmlFor={`${id}-job`} className="label-field">
              직업
            </label>
            <select
              id={`${id}-job`}
              value={job!}
              name="job"
              onChange={handleJobChange}
              className="mt-1 block w-full border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none  focus:border-black sm:text-sm rounded-md"
            >
              <option>직업을 선택해주세요</option>
              {JOBS?.map((job) => (
                <option value={job} key={job}>
                  {job}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={`${id}-field`} className="label-field">
              전문분야/전공
            </label>
            <select
              id={`${id}-field`}
              value={field!}
              name="field"
              onChange={handleFieldChange}
              className="mt-1 block w-full border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none  focus:border-black sm:text-sm rounded-md"
            >
              <option>전문분야/전공을 선택해주세요</option>
              {FIELDS?.map((field) => (
                <option value={field} key={field}>
                  {field}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center w-4/5 md:w-2/3 lg:w-1/2 h-full gap-5 mt-6">
          <button onClick={previousStep} className="button-field ">
            이전
          </button>
          <button onClick={nextStep} className="button-field ">
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
