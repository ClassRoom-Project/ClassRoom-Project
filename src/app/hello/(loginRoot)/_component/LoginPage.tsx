'use client';

import SocialLogin from '@/components/login/SocialLogin';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center w-full">
      <div className="flex flex-col md:flex-row border mx-auto rounded-md w-11/12 md:w-4/5 h-auto ">
        <section className=" flex-col hidden md:flex w-full md:w-2/5 items-center justify-evenly bg-[#F0F6FF]">
          <Image src="/loginLogo.svg" alt="LoginLogoImage" width={200} height={100} priority />
          <p className="px-4  text-center text-[#7D95FF] mb:text-sm lg:text-lg">
            클룸에 오신걸 환영합니다!
            <br /> 다양한 원데이 클래스를 체험해보세요!
          </p>
        </section>
        <section className="h-full flex flex-col w-full md:w-3/5 p-5">
          <div className="flex flex-col w-full items-center gap-4">
            <Image src="/logintext.svg" alt="LoginLogoImage" width={80} height={80} priority />
            <p className="mb-10 text-[#7D95FF] flex flex-col items-center border-t border-gray-300 w-5/6 md:max-w-2xl mx-auto">
              로그인 또는 회원가입
            </p>
          </div>
          <div className="flex flex-col items-center w-full h-4/5 justify-around mt-5">
            <div className="w-full flex flex-col items-center h-auto">
              <SocialLogin />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
