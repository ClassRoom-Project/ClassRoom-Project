import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabase';
import { DBReserveInfo } from '@/types/reserve';

// 예약 정보 조회 api
export const fetchReserveInfo = async (reservationId: string) => {
  const { data, error }: PostgrestSingleResponse<DBReserveInfo> = await supabase
    .from('reserve')
    .select('*')
    .eq('reserve_id', reservationId)
    .single();

  if (error) {
    console.error('예약 정보 불러오기 오류 발생 => ', error);
    return;
  }

  const reserveInfo = {
    reserveId: data.reserve_id,
    classId: data.class_id,
    userId: data.user_id,
    reservePrice: data.reserve_price,
    reserveQuantity: data.reserve_quantity,
    reserveDate: data.reserve_date,
    reserveTime: data.reserve_time
  };

  return reserveInfo;
};
