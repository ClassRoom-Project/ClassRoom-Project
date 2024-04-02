import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabase';
import { ReserveClassType } from '@/types/class';
import { ClassType } from 'react';

// 예약페이지 클래스 정보 불러오는 함수 모음
export const fetchReserveClassInfo = async ({ classId }: { classId: string }) => {
  const { data: classInfo, error }: PostgrestSingleResponse<ReserveClassType> = await supabase
    .from('class')
    .select('class_id, category, title, location, price, image, max_ppl, date, time')
    .eq('class_id', classId)
    .single();

  if (error) {
    console.error('클래스 정보 불러오기 오류 => ', error);
    return;
  }

  return classInfo;
};