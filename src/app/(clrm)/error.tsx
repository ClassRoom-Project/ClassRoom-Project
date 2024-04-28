'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { IoLogoSnapchat } from 'react-icons/io';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="responsiveHeight item-center flex flex-col justify-center text-center">
      <div>
        <IoLogoSnapchat className=" mx-auto mb-4 text-9xl text-button-focus-color" />
        <h2 className="text-2xl font-semibold text-point-purple">
          해당 페이지를 가져오던 중 <br className="lg:hidden" /> 문제가 생겼습니다.
        </h2>
        <p className="mt-4 font-semibold text-gray-500">다시 시도해주세요.</p>
        <p className="mx-auto mt-8 max-w-lg text-xs text-input-border-color">
          Error Message: {error?.message || '없음'}
        </p>
        <div className="mt-8">
          <button
            className="rounded-lg bg-point-purple px-4 py-2.5 text-white hover:bg-button-hover-color hover:shadow-lg"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            다시 시도하기
          </button>
        </div>
      </div>
    </div>
  );
}
