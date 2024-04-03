'use client';

import { signIn } from 'next-auth/react';
import { useId, useState } from 'react';
import { SocialType } from '@/types/authUser/authUserTypes';
import SocialLogin from './SocialLogin';

interface SigninModalProps {
  previousStep: () => void;
  twoPreviousStep: () => void;
}

export default function SignupModal({ previousStep, twoPreviousStep }: SigninModalProps) {
  const [error, setError] = useState('');
  const [emailCheck, setEmailCheck] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');

  const [sendEmail, setSendEmail] = useState('');

  const onValidateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = e;

    if (name === 'emailCheck') {
      setEmailCheck(value);
      const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_'{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9]+)*$/;
      if (!value?.match(validRegex)) {
        setError('이메일 형식이 올바르지 않습니다.');
      } else {
        setError('');
      }
    }

    if (name === 'passwordCheck') {
      setPasswordCheck(value);
      if (value?.length < 6 || value?.length > 20) {
        setError('비밀번호는 6자리 이상 20자리 이하로 입력해주세요.');
      } else if (confirmPassword?.length > 0 ?? value !== confirmPassword) {
        setError('비밀번호와 비밀번호 확인 값이 다릅니다. 다시 확인해주세요.');
      } else {
        setError('');
      }
    }

    if (name === 'confirmPassword') {
      setConfirmPassword(value);
      if (value?.length < 6 || value?.length > 20) {
        setError('비밀번호는 6자리 이상 20자리 이하로 입력해주세요.');
      } else if (value !== passwordCheck) {
        setError('비밀번호와 비밀번호 확인 값이 다릅니다. 다시 확인해주세요.');
      } else {
        setError('');
      }
    }
  };

  const handleConfirmEmail = async () => {
    const result = await signIn('email', { email: emailCheck, redirect: false });
    if (result?.error) {
      console.log(result.error);
    } else {
      setConfirmEmail('입력하신 이메일 주소로 인증 링크가 포함된 이메일을 발송했습니다.');
    }
  };

  const id = useId();

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
    >
      <section className="flex flex-col items-center p-4 bg-white rounded-lg border w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <div className=" flex flex-col items-center w-full ">
          <p className="text-2xl font-bold ">회원가입</p>
          <ul className="steps w-full mb-4">
            <li className="step step-primary">step 1</li>
            <li className="step step-primary">step 2</li>
          </ul>
          <div className="flex flex-col w-4/5 md:w-2/3 lg:w-1/2">
            <label htmlFor={`${id}-nickname`} className="block text-lg font-medium text-gray-700">
              닉네임
            </label>
            <input
              id={`${id}-nickname`}
              name="nickname"
              placeholder="닉네임을 입력해주세요"
              required
              className="input-field"
            />
            <label htmlFor={`${id}-email`} className="label-field">
              아이디
            </label>
            <div className="flex flex-row relative">
              <input
                id={`${id}-email`}
                name="emailCheck"
                placeholder="이메일을 입력해주세요"
                required
                onChange={onValidateField}
                className="input-field"
              />
              <button
                className="absolute inset-y-0 right-0 flex items-center justify-center px-4 bg-[#5373FF] text-white text-sm rounded-full mt-2 mb-1 mr-1"
                id={`${id}-email`}
                onClick={handleConfirmEmail}
              >
                인증하기
              </button>
            </div>
            {confirmEmail && confirmEmail?.length > 0 ? <div className="text-red-500 text-xs">{confirmEmail}</div> : ''}
            {sendEmail && sendEmail?.length > 0 ? <div className="text-red-500 text-xs">{sendEmail}</div> : ''}
            <label htmlFor={`${id}-password`} className="label-field">
              비밀번호
            </label>
            <input
              id={`${id}-password`}
              type="password"
              name="passwordCheck"
              placeholder="비밀번호를 입력해주세요"
              required
              onChange={onValidateField}
              className="input-field"
            />
            <label htmlFor={`${id}-confirmPassword`} className="label-field">
              비밀번호 재입력
            </label>
            <input
              id={`${id}-confirmPassword`}
              type="password"
              name="confirmPassword"
              placeholder="비밀번호 확인"
              required
              onChange={onValidateField}
              className="input-field"
            />
            {error && error?.length > 0 ? (
              <div>
                <div className="text-red-500 text-xs">{error}</div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <SocialLogin />
        <div className="flex flex-row items-center justify-center w-4/5 md:w-2/3 lg:w-1/2 h-full gap-5">
          {/* {teacher === true ? (
            <button onClick={previousStep} className="button__border-field">
              이전
            </button>
          ) : (
            <button onClick={twoPreviousStep} className="button__border-field">
              이전
            </button>
          )} */}
          <button className="button-field">회원가입</button>
        </div>
      </section>
    </div>
  );
}
