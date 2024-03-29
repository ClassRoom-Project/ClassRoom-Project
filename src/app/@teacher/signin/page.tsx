import { FcGoogle } from 'react-icons/fc';
import { SiNaver } from 'react-icons/si';
import { RiKakaoTalkFill } from 'react-icons/ri';

export default function SigninModal() {
  return (
    <div className="min-h-screen max-h-6xl ">
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
  );
}
