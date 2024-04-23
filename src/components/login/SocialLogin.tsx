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
    <section className="flex flex-col text-sm md:text-base w-4/5 md:w-2/3 lg:w-1/2 h-full ">
      <nav className="flex flex-col justify-center items-center w-full ">
        <button
          className="socialIcon-field bg-[#EBF2FF] w-full h-1/3 flex items-center hover:border-[#EBF2FF] hover:bg-white rounded justify-center"
          onClick={() => handleSocialSignin('google')}
        >
          <div className="flex flex-row items-center justify-center gap-5">
            <span className="rounded-full bg-transparent w-10 h-10 flex justify-center items-center cursor-pointer hover:bg-gray-200">
              <FcGoogle className="w-full h-full" />
            </span>
            <p className="text-black flex-grow text-center">구글 로그인하기</p>
          </div>
        </button>
        <button
          className="socialIcon-field bg-yellow-300 w-full h-1/3 flex items-center hover:border-yellow-300 hover:bg-white rounded justify-center"
          onClick={() => handleSocialSignin('kakao')}
        >
          <div className="flex flex-row items-center justify-center gap-2">
            <span className="rounded-full bg-yellow-300 w-10 h-10 flex justify-center items-center cursor-pointer">
              <RiKakaoTalkFill className="w-3/4 h-3/4 text-yellow-900" />
            </span>
            <p className="text-black flex-grow text-center">카카오 로그인하기</p>
          </div>
        </button>
        <button
          className="socialIcon-field bg-green-500 w-full h-1/3 flex items-center hover:border-[#8ED799] hover:bg-white rounded justify-center"
          onClick={() => handleSocialSignin('naver')}
        >
          <div className="flex flex-row items-center justify-center gap-2">
            <span className="rounded-full bg-green-500 w-10 h-10 flex justify-center items-center cursor-pointer">
              <SiNaver className="w-2/4 h-2/4 text-white" />
            </span>
            <p className="text-black flex-grow text-center">네이버 로그인하기</p>
          </div>
        </button>
      </nav>
    </section>
  );
}
