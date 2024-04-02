import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabase';
import { ReserveClassType } from '@/types/class';

// 예약페이지 클래스 정보 불러오는 api
export const fetchReserveClassInfo = async (classId: string) => {
  const { data: classInfo, error }: PostgrestSingleResponse<ReserveClassType> = await supabase
    .from('class')
    .select('class_id, category, title, location, price, image, max_people, date, time, reserved_count')
    .eq('class_id', classId)
    .single();

  // TODO: return된 data를 카멜케이스로 변환

  if (error) {
    console.error('클래스 정보 불러오기 오류 => ', error);
    return;
  }

  return classInfo;
};
