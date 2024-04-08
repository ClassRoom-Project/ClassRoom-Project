import { ReserveInfo } from '@/types/reserve';
import { supabase } from '../supabase/supabase';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

export const insertNewReservation = async (reserveInfo: ReserveInfo) => {
  const { userId, classId, reservePrice, reserveQuantity, timeId } = reserveInfo;

  const { data, error } = await supabase.from('reserve').insert([
    {
      user_id: userId,
      class_id: classId,
      reserve_price: reservePrice,
      reserve_quantity: reserveQuantity,
      time_id: timeId
    }
  ]);

  if (error) {
    console.error('insertNewReservation 오류 =>', error);
    return;
  }

  console.log(data);

  return data;
};
// export const insertNewReservation = async (reserveInfo: ReserveInfo) => {
//   const { data: reservationId, error }: PostgrestSingleResponse<string> = await supabase.rpc('insert_new_reservation', {
//     reserve_info: reserveInfo
//   });

//   if (error) {
//     console.error('insertNewReservation 오류 =>', error);
//     return;
//   }

//   return reservationId;
// };

// 예약 정보 insert api
// export const submitReservation = async (reserveInfo: ReserveInfo) => {
//   const { classId, userId, reservePrice, reserveQuantity, reserveDate, reserveTime } = reserveInfo;
//   const { data: reservationId, error }: PostgrestSingleResponse<{ reserve_id: string }> = await supabase
//     .from('reserve')
//     .insert([
//       {
//         user_id: userId,
//         class_id: classId,
//         reserve_price: reservePrice,
//         reserve_quantity: reserveQuantity,
//         reserve_date: reserveDate,
//         reserve_time: reserveTime,
//         reserved_at: new Date()
//       }
//     ])
//     .select('reserve_id') // return값으로 reserve_id만선택
//     .single();

//   if (error) {
//     console.log('예약정보 제출 오류 발생 =>', error);
//     return;
//   }

//   return reservationId.reserve_id;
// };
