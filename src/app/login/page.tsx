'use client';

import { useRouter } from 'next/navigation';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import { SiNaver } from 'react-icons/si';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center w-full ">
      <div className="flex flex-row border mx-auto rounded-md w-3/4 h-1/2 ">
        <section className="h-full w-2/5 flex items-center justify-around bg-[#F0F6FF]">
          <p className="text-sm">
            클룸에 오신걸 환영합니다!
            <br /> 다양한 원데이 클래스를 체험해보세요!
          </p>
        </section>
        <section className="h-full flex flex-col justify-center items-center w-3/5">
          <form className=" flex flex-col items-center w-full h-1/2 justify-around">
            <p className="text-2xl font-bold ">클룸</p>
            <input placeholder="아이디" className="w-1/2 h-9  border rounded-lg " />
            <input placeholder="비밀번호" className="w-1/2 h-9 border rounded-lg " />
            <button className="bg-black text-white w-1/3 h-9 rounded-lg  ">로그인</button>
          </form>

          <div className="flex flex-row justify-around">
            <p className="text-xs">클룸이 처음이신가요?</p>
            <Link href="/teacher" className="font-bold text-xs hover:color-grey">
              회원가입
            </Link>
          </div>
          <div className="flex flex-row justify-between w-1/3 mt-4">
            <div>
              <FcGoogle className="text-5xl" />
            </div>
            <div className="rounded-full bg-yellow-300 w-12 h-12 relative">
              <RiKakaoTalkFill className="text-yellow-950 absolute text-4xl right-1.5 top-1.5" />
            </div>
            <div className="rounded-full bg-green-500 w-12 h-12 relative">
              <SiNaver className="text-white text-2xl absolute right-3 top-3" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
