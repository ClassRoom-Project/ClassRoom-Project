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
    <section className="flex flex-col items-center justify-center w-4/5 md:w-2/3 lg:w-1/2 h-full ">
      <nav className="flex flex-col justify-between items-center w-full mb-3 space-y-4">
        <button
          className="socialIcon-field hover:bg-[#EBF2FF] w-full h-1/3 flex items-center py-2 rounded"
          onClick={() => handleSocialSignin('google')}
        >
          <span className="rounded-full bg-transparent w-12 h-10 flex justify-center items-center cursor-pointer hover:bg-gray-200">
            <FcGoogle className="w-full h-full" />
          </span>
          <strong className="text-black flex-grow text-center">구글 로그인하기</strong>
        </button>
        <button
          className="socialIcon-field hover:bg-yellow-300 w-full h-1/3 flex items-center py-2 rounded"
          onClick={() => handleSocialSignin('kakao')}
        >
          <span className="rounded-full bg-yellow-300 w-12 h-10 flex justify-center items-center cursor-pointer">
            <RiKakaoTalkFill className="w-3/4 h-3/4 text-yellow-900" />
          </span>
          <strong className="text-black flex-grow text-center">카카오 로그인하기</strong>
        </button>
        <button
          className="socialIcon-field hover:bg-green-500 w-full h-1/3 flex items-center py-2 rounded"
          onClick={() => handleSocialSignin('naver')}
        >
          <span className="rounded-full bg-green-500 w-12 h-10 flex justify-center items-center cursor-pointer">
            <SiNaver className="w-2/4 h-2/4 text-white" />
          </span>
          <strong className="text-black flex-grow text-center">네이버 로그인하기</strong>
        </button>
      </nav>
    </section>
  );
}