'use client';

import { useRouter } from 'next/navigation';
// import LoginModalPage from '../@auth/(.)login/page';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import { SiNaver } from 'react-icons/si';

export default function LoginPage() {
  const router = useRouter();

  const openAdminModal = () => {
    router.push('/admin');
  };

  return (
    <div className="flex h-screen items-center justify-center w-full ">
      <div className="flex flex-row border mx-auto rounded-md w-3/4 h-1/2 ">
        <section className="h-full w-2/5 flex items-center justify-around bg-custom-radial">
          <p className="text-sm">
            클룸에 오신걸 환영합니다!
            <br /> 다양한 원데이 클래스를 체험해보세요!
          </p>
        </section>
        <section className="h-full flex flex-col justify-center items-center w-3/5">
          <form className="flex flex-col  items-center w-full">
            <p className="text-2xl font-bold mb-12">클룸</p>

            <input placeholder="아이디" className="w-1/2 h-9 mt-4 border rounded-lg " />
            <input placeholder="비밀번호" className="w-1/2 h-9 border rounded-lg mt-7" />

            <button className="bg-black text-white w-1/3 h-9 rounded-lg  mt-10">로그인</button>
          </form>
          <div className="flex flex-row gap-3 mt-4">
            <p className="text-xs">클룸이 처음이신가요?</p>
            <button className="font-bold text-xs hover:color-grey" onClick={openAdminModal}>
              회원가입
            </button>
          </div>
          <div className="flex flex-row justify-between mt-6 w-2/5">
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
