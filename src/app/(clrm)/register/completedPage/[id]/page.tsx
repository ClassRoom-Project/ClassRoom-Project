"use client";
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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <FaCheck color="#6C5FF7" size="60" />
      <h1 className="text-xl font-bold mt-4">{title} 클래스가 등록되었습니다.</h1>
      <p className="flex flex-wrap justify-center mt-2 items-center text-center">
        상세한 정보는
        <Link href={`/list/detail/${id}`} passHref>
          <a className="text-base text-[#6C5FF7] ml-1 whitespace-nowrap">내가 등록한 클래스 보기</a>
        </Link>
        에서 확인해주세요.
      </p>
    </div>
  );
};

export default RegistCompletedPage;
