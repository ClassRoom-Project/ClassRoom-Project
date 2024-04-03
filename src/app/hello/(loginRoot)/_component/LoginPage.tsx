'use client';

import SocialLogin from '@/components/login/SocialLogin';

export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center w-full">
      <div className="flex flex-col md:flex-row border mx-auto rounded-md w-11/12 md:w-3/4 h-auto md:h-1/2">
        <section className="hidden md:flex h-full w-full md:w-2/5 items-center justify-around bg-[#F0F6FF]">
          <p className="text-xl px-4 text-center">
            클룸에 오신걸 환영합니다!
            <br /> 다양한 원데이 클래스를 체험해보세요!
          </p>
        </section>
        <section className="h-full flex flex-col justify-center items-center w-full md:w-3/5">
          <div className="flex flex-col items-center w-full h-1/2 justify-around">
            <div className="flex flex-col items-center w-full">
              <p className="text-4xl font-bold mb-1 text-point-color">클룸</p>
              <div className="border-t border-gray-300 w-5/6 md:max-w-2xl mx-auto mb-4" />
              <p className="mb-10">로그인 또는 회원가입</p>
              <SocialLogin />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
