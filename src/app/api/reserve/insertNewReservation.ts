import { ReserveInfo } from '@/types/reserve';
import { supabase } from '../supabase/supabase';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

export const insertNewReservation = async (reserveInfo: ReserveInfo) => {
  console.log('insertNewReservation 실행');
  const { reserveId, userId, classId, reservePrice, reserveQuantity, timeId } = reserveInfo;

  const { data, error }: PostgrestSingleResponse<{ reserve_id: string }> = await supabase
    .from('reserve')
    .insert([
      {
        reserve_id: reserveId,
        user_id: userId,
        class_id: classId,
        reserve_price: reservePrice,
        reserve_quantity: reserveQuantity,
        time_id: timeId
      }
    ])
    .select('reserve_id')
    .single();

  if (error) {
    console.error('insertNewReservation 오류 =>', error);
    return;
  }

  return data.reserve_id;
};
