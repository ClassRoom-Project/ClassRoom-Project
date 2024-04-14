import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabase';
import { ReserveClassType } from '@/types/class';

// 예약페이지에서 클래스 정보 불러오는 api
export const newFetchReserveClassInfo = async (classId: string) => {
  const { data: classInfo, error }: PostgrestSingleResponse<ReserveClassType[]> = await supabase.rpc(
    'fetch_reserve_class_info',
    { _class_id: classId }
  );
  if (error) {
    console.error('newFetchReserveClassInfo 오류 =>', error);
    return;
  }

  return classInfo[0];
};
