'use client';

import { FcGoogle } from 'react-icons/fc';
import { SiNaver } from 'react-icons/si';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { signIn } from 'next-auth/react';
import { useId, useState } from 'react';
import useNewUserStore from '@/store/authStore.ts/store';
import { SocialType } from '@/types/user';

interface SigninModalProps {
  previousStep: () => void;
  twoPreviousStep: () => void;
}

export default function SignupModal({ previousStep, twoPreviousStep }: SigninModalProps) {
  const [error, setError] = useState('');
  const [emailCheck, setEmailCheck] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { teacher, setNickname, setEmail, setPassword } = useNewUserStore((state) => ({
    teacher: state.teacher,
    setNickname: state.setNickname,
    setEmail: state.setEmail,
    setPassword: state.setPassword
  }));

  const onVaildateFilde = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = e;

    switch (name) {
      case 'nickname':
        setNickname(value);
        break;
      case 'emailCheck':
        setEmail(value);
        break;
      case 'passwordCheck':
        setPassword(value);
        break;
    }

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

  const handleSocialSignin = async (provider: SocialType) => {
    const result = await signIn(provider, { callbackUrl: '/login' });
    if (result?.error) {
      setError(result.error);
    }
  };

  const id = useId();

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      <section className="flex flex-col items-center p-4 bg-white rounded-lg border w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <div className=" flex flex-col items-center w-full ">
          <p className="text-2xl font-bold ">회원가입</p>
          <ul className="steps w-full mb-4">
            <li className="step step-primary">step 1</li>
            <li className="step step-primary">step 2</li>
            {teacher === true ? <li className="step step-primary">step 3</li> : ''}
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
            <input
              id={`${id}-email`}
              name="emailCheck"
              placeholder="이메일을 입력해주세요"
              required
              onChange={onVaildateFilde}
              className="input-field"
            />
            <label htmlFor={`${id}-password`} className="label-field">
              비밀번호
            </label>
            <input
              id={`${id}-password`}
              type="password"
              name="passwordCheck"
              placeholder="비밀번호를 입력해주세요"
              required
              onChange={onVaildateFilde}
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
              onChange={onVaildateFilde}
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
        <div className="flex flex-col items-center justify-center w-4/5 md:w-2/3 lg:w-1/2 h-full">
          <button className="button-field">회원가입</button>
          <div className="flex justify-between items-center w-full mb-3">
            <div
              onClick={() => handleSocialSignin('google')}
              className="rounded-full bg-transparent w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-gray-200"
            >
              <FcGoogle className="w-full h-full" />
            </div>
            <div
              onClick={() => handleSocialSignin('kakao')}
              className="rounded-full bg-yellow-300 w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-yellow-400"
            >
              <RiKakaoTalkFill className="w-3/4 h-3/4 text-yellow-900" />
            </div>
            <div
              onClick={() => handleSocialSignin('naver')}
              className="rounded-full bg-green-500 w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-green-600"
            >
              <SiNaver className="w-2/4 h-2/4 text-white" />
            </div>
          </div>
          {teacher === true ? (
            <button onClick={previousStep} className="button-field">
              이전
            </button>
          ) : (
            <button onClick={twoPreviousStep} className="button-field">
              이전
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
