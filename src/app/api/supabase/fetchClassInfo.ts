import { PostgrestResponse, PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { Class } from '@/types/class';

export const fetchClassInfoToReserve = async ({ classId }: { classId: string | null }) => {
  console.log(classId);
  const { data: classInfo, error }: PostgrestSingleResponse<Class> = await supabase
    .from('class')
    .select('class_id, category, title, location, price, image')
    .eq('class_id', classId)
    .single();

  if (error) {
    console.error('클래스 정보 불러오기 오류 => ', error);
    return;
  }

  return classInfo;
};
