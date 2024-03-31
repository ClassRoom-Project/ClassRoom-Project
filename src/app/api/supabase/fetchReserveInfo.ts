import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { DBReserveInfo } from '@/types/reserve';

export const fetchReserveInfo = async (reservationId: string) => {
  const { data: reserveInfo, error }: PostgrestSingleResponse<DBReserveInfo> = await supabase
    .from('reserve')
    .select('*')
    .eq('reserve_id', reservationId)
    .single();

  if (error) {
    console.error('예약 정보 불러오기 오류 => ', error);
    return;
  }

  return reserveInfo;
};
