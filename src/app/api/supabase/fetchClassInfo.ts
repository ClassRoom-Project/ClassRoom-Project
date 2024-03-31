import { PostgrestResponse, PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { ClassType } from '@/types';

// 메인페이지, 리스트페이지, 디테일페이지, 예약페이지 유저 정보 불러오는 함수
export const fetchClassInfo = async ({ classId }: { classId: string }) => {
  console.log(classId);
  const { data: classInfo, error }: PostgrestSingleResponse<ClassType> = await supabase
    .from('class')
    .select('*')
    .eq('class_id', classId)
    .single();

  if (error) {
    console.error('클래스 정보 불러오기 오류 => ', error);
    return;
  }

  return classInfo;
};
