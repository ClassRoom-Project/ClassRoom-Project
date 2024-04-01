import MainLayout from '@/components/common/UserLayout';
import Link from 'next/link';
const page = () => {
  return (
    <>
      <div>Main</div>
      <Link href="/hello">로그인</Link>
    </>
  );
};

export default page;
