import { DBReserveInfo, ReserveInfo } from '@/types/reserve';
import { supabase } from '../supabase/supabase';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

// 예약 정보 insert api
export const submitReservation = async (reserveInfo: ReserveInfo) => {
  const { classId, userId, reservePrice, reserveQuantity, reserveDate, reserveTime } = reserveInfo;
  const { data: result, error }: PostgrestSingleResponse<DBReserveInfo> = await supabase
    .from('reserve')
    .insert([
      {
        user_id: '523e4567-e89b-12d3-a456-426614174005', // 추후 현재 로그인한 유저 아이디로 수정 필요
        class_id: classId,
        reserve_price: reservePrice,
        reserve_quantity: reserveQuantity,
        reserve_date: reserveDate,
        reserve_time: reserveTime,
        reserved_at: new Date()
      }
    ])
    .select('reserve_id')
    .single();

  if (error) {
    console.log('예약정보 제출 오류 발생 =>', error);
    return;
  }

  console.log(result);

  return result;
};
