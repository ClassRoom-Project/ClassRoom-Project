import Link from 'next/link';

export default function Error() {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      <p>이용에 불편을 드려 죄송합니다. 다시 시도해주세요</p>
      <Link href="/hello" className="button-field">
        다시 시도하기
      </Link>
    </div>
  );
}
