import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { ReserveClassType } from '@/types/class';

export const fetchClassInfo = async ({ classId }: { classId: string }) => {
  const { data: classInfo, error }: PostgrestSingleResponse<ReserveClassType> = await supabase
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
