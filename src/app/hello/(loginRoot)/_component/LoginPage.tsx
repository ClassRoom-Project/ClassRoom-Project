'use client';

import SocialLogin from '@/components/login/SocialLogin';
import Image from 'next/image';
import loginTextLogo from '../../../../assets/images/loginTextImage.svg';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '클룸 LoginPage',
  description: '클룸 소셜 회원가입/로그인 페이지입니다.'
};

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="mx-auto flex  h-full w-full flex-col rounded-md border  md:flex-row ">
        <section className="  hidden w-full flex-col items-center justify-center bg-login-background md:flex md:w-2/5">
          <Image src="/loginLogo.svg" alt="LoginLogoImage" width={250} height={100} priority />
          <p className="mb:text-sm  welcome-message px-4 pt-10 text-center font-semibold text-[#4D43B8] lg:text-3xl">
            클룸에 오신걸 환영합니다!
            <br /> 다양한 원데이 클래스를 체험해보세요!
          </p>
        </section>
        <div className="flex h-full w-full flex-col items-center justify-center md:w-3/5">
          <section className="flex h-full w-full flex-col  items-center  justify-center">
            <div className="flex h-full w-full flex-col items-center justify-center md:h-1/2">
              <div className="flex w-full flex-col items-center justify-center gap-4">
                <Image src={loginTextLogo} alt="LoginLogoImage" width={100} height={100} priority />
                <p className="mx-auto mb-5 flex w-5/6 flex-col items-center border-t border-gray-300 pt-4 text-button-press-color sm:text-sm md:max-w-2xl md:text-xl">
                  로그인 또는 회원가입
                </p>
              </div>
              <div className="mt-5 flex h-2/5 w-full flex-col items-center">
                <div className="flex w-full flex-col items-center">
                  <SocialLogin />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
