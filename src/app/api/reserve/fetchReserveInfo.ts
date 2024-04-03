import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabase';
import { DBReserveInfo } from '@/types/reserve';

// 예약 정보 조회 api
export const fetchReserveInfo = async (reservationId: string) => {
  const { data: reserveInfo, error }: PostgrestSingleResponse<DBReserveInfo> = await supabase
    .from('reserve')
    .select('*')
    .eq('reserve_id', reservationId)
    .single();

  if (error) {
    console.error('예약 정보 불러오기 오류 발생 => ', error);
    return;
  }

  return reserveInfo;
};
