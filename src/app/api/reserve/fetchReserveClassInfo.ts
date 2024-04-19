import { ReserveClassType } from '@/types/class';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabase';

// 예약페이지에서 클래스 정보 불러오는 api
export const fetchReserveClassInfo = async (classId: string) => {
  const { data: classInfo, error }: PostgrestSingleResponse<ReserveClassType[]> = await supabase.rpc(
    'fetch_reserve_class_info',
    { _class_id: classId }
  );

  if (error) {
    console.error('fetchReserveClassInfo 오류 =>', error);
    throw new Error();
  }

  return classInfo[0];
};
