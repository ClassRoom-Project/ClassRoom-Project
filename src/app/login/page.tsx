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
    <div className="min-h-screen max-h-6xl ">
      <div className="flex flex-row border mx-auto my-auto rounded-md max-w-xl h-1/2">
        <section>
          <p className="text-sm">
            클룸에 오신걸 환영합니다!
            <br /> 다양한 원데이 클래스를 체험해보세요!
          </p>
        </section>
        <section className=" flex flex-col justify-center items-center">
          <div>
            <form>
              <p>클룸</p>
              <div className="flex flex-col">
                <input placeholder="아이디" />
                <input placeholder="비밀번호" />
              </div>
              <button>로그인</button>
            </form>
            <div className="flex flext-row gap-3">
              <p className=" text-xs">클룸이 처음이신가요?</p>
              <button className="d font-bold text-xs hover:color-grey" onClick={openAdminModal}>
                회원가입
              </button>
            </div>
            <div className="flex flex-row w-full justify-between mt-3">
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
          </div>
        </section>
      </div>
    </div>
  );
}
