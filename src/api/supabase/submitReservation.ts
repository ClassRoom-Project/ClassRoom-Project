import { ReserveInfo } from '@/types';
import { supabase } from './supabase';

export const submitReservation = async (reserveInfo: ReserveInfo) => {
  const { classId, userId, reservePrice, reserveQuantity, reserveDate, reserveTime } = reserveInfo;
  console.log(classId, userId, reservePrice, reserveQuantity, reserveDate, reserveTime);
  const { data, error } = await supabase
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
    .select();

  if (error) {
    console.log(error);
  }
};
