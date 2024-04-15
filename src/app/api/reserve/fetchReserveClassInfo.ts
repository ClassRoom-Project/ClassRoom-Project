import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabase';
import { ReserveClassType } from '@/types/class';

// 예약페이지에서 클래스 정보 불러오는 api
// TODO: rpc 사용하지 않고 조인으로 바꿔보기
export const fetchReserveClassInfo = async (classId: string) => {
  const { data: classInfo, error }: PostgrestSingleResponse<ReserveClassType[]> = await supabase.rpc(
    'fetch_reserve_class_info',
    { _class_id: classId }
  );
  // .order('times', { ascending: false });
  if (error) {
    console.error('fetchReserveClassInfo 오류 =>', error);
    return;
  }

  return classInfo[0];
};
