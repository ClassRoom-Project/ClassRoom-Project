"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { supabase } from '@/app/api/supabase/supabase';


const RegistCompletedPage = () => {
    // const classId = searchParams.classId;
    // const path = usePathname();
    const [title, setTitle] = useState('');
    const router = useRouter();
    // const params = useSearchParams();
    // const id = params.get('id');
    const path = usePathname();
    const id = path.split('/').pop();

    // const limitParams = params
  
    // classId에 해당하는 title을 가져오는 함수
    const fetchClassTitle = async () => {
      if(!id) return;
      const { data, error } = await supabase
        .from('class') // 'classes'는 테이블 이름입니다. 실제 사용하는 테이블 이름으로 변경해주세요.
        .select('title')
        .eq('class_id', id)
        .single();
  
      if (error) {
        console.error('Error fetching class title', error);
      } else {
        setTitle(data.title);
      }
    };

    useEffect(() => {
        fetchClassTitle();
      }, [id]);
  
    return (
      <div>
        <h2>등록 완료!</h2>
        {title && <p>{title} 클래스가 등록되었습니다. 상세한 정보는 내가 등록한 클래스 보기에서 확인해주세요.</p>}
        <button onClick={() => router.push(`/list/detail/${id}`)}>내가 등록한 클래스 보기</button>
      </div>
    );
  };
  

export default RegistCompletedPage;
