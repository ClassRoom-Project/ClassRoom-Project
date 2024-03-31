'use client';

import useNewUserStore from '@/hooks/authStore.ts/store';
import { FIELDS, JOBS } from '@/types/user';
import { La_Belle_Aurore } from 'next/font/google';
import Link from 'next/link';

export default function MoreInfoModal() {
  const setJob = useNewUserStore((state) => state.setJob);
  const setField = useNewUserStore((state) => state.setField);

  const job = useNewUserStore((state) => state.job);

  console.log('잡', job);

  const handleJobChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setJob(e.target.value);
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setField(e.target.value);
  };
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col items-center p-4 bg-white rounded-lg border w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <p className="text-xl font-bold mb-4">회원가입</p>
        <ul className="steps w-full mb-4">
          <li className="step step-primary">step 1</li>
          <li className="step step-primary">step 2</li>
          <li className="step">step 2</li>
        </ul>
        <div className="flex flex-col w-4/5 md:w-2/3 lg:w-1/2">
          <div className="mb-4">
            <label htmlFor="job" className="label-field">
              직업
            </label>
            <select
              value="job"
              name="job"
              id="job"
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
            <label htmlFor="field" className="label-field">
              전문분야/전공
            </label>
            <select
              value="field"
              name="field"
              id="field"
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
        <Link
          href={'/signin'}
          className="mt-5 block w-2/5 border btn btn-outlin py-2 text-center sm:text-sm rounded-md"
        >
          다음
        </Link>
      </div>
    </div>
  );
}
