import { FcGoogle } from 'react-icons/fc';
import { SiNaver } from 'react-icons/si';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { signIn } from 'next-auth/react';
import { SocialType } from '@/types/authUser/authUserTypes';

export default function SocialLogin() {
  const handleSocialSignin = async (provider: SocialType) => {
    const result = await signIn(provider, { callbackUrl: '/' });
    if (result?.error) {
      console.error(result.error);
    }
  };

  return (
    <section className="flex h-full w-4/5 flex-col text-sm md:w-2/3 md:text-base lg:w-1/2 ">
      <nav className="flex w-full flex-col items-center justify-center ">
        <button
          className="socialIcon-field flex h-1/3 w-full items-center justify-center rounded bg-[#EBF2FF] transition-all hover:border-[#EBF2FF] hover:bg-white"
          onClick={() => handleSocialSignin('google')}
        >
          <div className="flex flex-row items-center justify-center gap-5">
            <span className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-transparent hover:bg-gray-200">
              <FcGoogle className="h-full w-full" />
            </span>
            <p className="flex-grow text-center text-black">구글 로그인하기</p>
          </div>
        </button>
        <button
          className="socialIcon-field flex h-1/3 w-full items-center justify-center rounded bg-yellow-300 transition-all hover:border-yellow-300  hover:bg-white"
          onClick={() => handleSocialSignin('kakao')}
        >
          <div className="flex flex-row items-center justify-center gap-2">
            <span className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-yellow-300">
              <RiKakaoTalkFill className="h-3/4 w-3/4 text-yellow-900" />
            </span>
            <p className="flex-grow text-center text-black">카카오 로그인하기</p>
          </div>
        </button>
        <button
          className="socialIcon-field flex h-1/3 w-full items-center justify-center rounded bg-green-500 transition-all hover:border-[#8ED799]  hover:bg-white"
          onClick={() => handleSocialSignin('naver')}
        >
          <div className="flex flex-row items-center justify-center gap-2">
            <span className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-green-500">
              <SiNaver className="h-2/4 w-2/4 text-white" />
            </span>
            <p className="flex-grow text-center text-black">네이버 로그인하기</p>
          </div>
        </button>
      </nav>
    </section>
  );
}
