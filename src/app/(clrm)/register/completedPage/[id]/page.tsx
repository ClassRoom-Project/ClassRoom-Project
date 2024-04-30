'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/api/supabase/supabase';
import { FaCheck } from 'react-icons/fa';
import Link from 'next/link';

const RegistCompletedPage = () => {
  const [title, setTitle] = useState('');
  const path = usePathname();
  const id = path.split('/').pop();
  const router = useRouter();

  useEffect(() => {
    const fetchClassTitle = async () => {
      if (!id) return;
      const { data, error } = await supabase.from('class').select('title').eq('class_id', id).single();

      if (error) {
        console.error('Error: ', error);
      } else {
        setTitle(data.title);
      }
    };
    fetchClassTitle();

    // 뒤로가기 감지
    window.history.pushState(null, '', window.location.pathname);

    const handleBack = (e: PopStateEvent) => {
      e.preventDefault();
      alert('잘못된 요청입니다.');
      router.push('/');
    };
    window.addEventListener('popstate', handleBack);
    return () => window.removeEventListener('popstate', handleBack);
  }, [id, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <FaCheck color="#6C5FF7" size="60" />
      <h1 className="mt-4 text-xl font-bold">{title} 클래스가 등록되었습니다.</h1>
      <p className="mt-2 flex flex-wrap items-center justify-center text-center">
        상세한 정보는
        <Link href={`/list/detail/${id}`} passHref>
          <p className="ml-1 whitespace-nowrap text-base text-[#6C5FF7]">내가 등록한 클래스 보기</p>
        </Link>
        에서 확인해주세요.
      </p>
    </div>
  );
};

export default RegistCompletedPage;
