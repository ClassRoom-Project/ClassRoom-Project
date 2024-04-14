'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { supabase } from '@/app/api/supabase/supabase';
import { FaCheck } from 'react-icons/fa';
import Link from 'next/link';

const RegistCompletedPage = () => {
  const [title, setTitle] = useState('');
  const path = usePathname();
  const id = path.split('/').pop();

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
  }, [id]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <FaCheck color="#6C5FF7" size="60" />
      <h1 className="text-xl font-bold mt-4">{title} 클래스가 등록되었습니다.</h1>
      <p className="mt-2">
        상세한 정보는
        <Link href={`/list/detail/${id}`} passHref>
          <span className="text-base text-[#6C5FF7] ml-1">내가 등록한 클래스 보기</span>
        </Link>
        에서 확인해주세요.
      </p>
    </div>
  );
};

export default RegistCompletedPage;
