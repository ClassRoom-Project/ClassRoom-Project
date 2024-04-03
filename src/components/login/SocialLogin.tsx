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
    <div className="flex flex-col items-center justify-center w-4/5 md:w-2/3 lg:w-1/2 h-full mt-3">
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
    </div>
  );
}
