import { PostgrestResponse, PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { ClassType } from '@/types';

export const fetchClassInfo = async ({ classId }: { classId: string }) => {
  console.log(classId);
  const { data: classInfo, error }: PostgrestSingleResponse<ClassType> = await supabase
    .from('class')
    .select('class_id, category, title, location, price, image, max_ppl')
    .eq('class_id', classId)
    .single();

  if (error) {
    console.error('클래스 정보 불러오기 오류 => ', error);
    return;
  }

  return classInfo;
};
