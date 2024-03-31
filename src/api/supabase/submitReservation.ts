import { DBReserveInfo, ReserveInfo } from '@/types/reserve';
import { supabase } from './supabase';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

export const submitReservation = async (reserveInfo: ReserveInfo) => {
  const { classId, userId, reservePrice, reserveQuantity, reserveDate, reserveTime } = reserveInfo;
  const { data: result, error }: PostgrestSingleResponse<DBReserveInfo> = await supabase
    .from('reserve')
    .insert([
      {
        user_id: '523e4567-e89b-12d3-a456-426614174005',
        class_id: classId,
        reserve_price: reservePrice,
        reserve_quantity: reserveQuantity,
        reserve_date: reserveDate,
        reserve_time: reserveTime,
        reserved_at: new Date()
      }
    ])
    .select()
    .single();

  if (error) {
    console.log('예약정보 제출 오류 발생 =>', error);
    return;
  }

  return result;
};
