'use client';

import { useRouter } from 'next/navigation';
import { IoLogoSnapchat } from 'react-icons/io';

export default function NotFound() {
  const router = useRouter();
  const handleGoMain = () => {
    router.replace('/');
  };
  return (
    <div className=" item-center flex h-screen flex-col justify-center text-center">
      <div>
        <IoLogoSnapchat className=" mx-auto mb-4 text-9xl text-button-focus-color" />
        <h2 className="text-2xl font-semibold text-point-purple lg:text-3xl">Could not find requested resource</h2>
        <p className="mt-4 font-semibold text-gray-500">요청하신 페이지를 찾을 수 없습니다.</p>
        <div className="mt-8">
          <button
            onClick={handleGoMain}
            className="rounded-lg bg-point-purple px-4 py-2.5 text-white hover:bg-button-hover-color hover:shadow-lg"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}
