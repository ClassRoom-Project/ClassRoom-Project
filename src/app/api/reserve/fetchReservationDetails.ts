import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabase';
import { reservationDetailsType } from '@/types/reserve';

// 예약 정보 조회 api
// reserve 테이블에서 class_id를 기준으로 class 테이블을 join하여 클래스 title을 가져옴
export const fetchReservationDetails = async (reserveId: string) => {
  const { data, error }: PostgrestSingleResponse<reservationDetailsType> = await supabase
    .from('reserve')
    .select(
      `
  class_id,  reserve_date, reserve_time, reserve_quantity, reserve_price, user_id
  class ( class_id, title )
`
    )
    .eq('reserve_id', reserveId)
    .single();

  if (error) {
    console.log('fetchReservationDetails error =>', error);
    return;
  }

  const reservationDetails = {
    classId: data.class_id,
    reserveDate: data.reserve_date,
    reserveTime: data.reserve_time,
    reserveQuantity: data.reserve_quantity,
    reservePrice: data.reserve_price,
    class: {
      title: data.class.title,
      class_id: data.class.class_id
    }
  };

  return reservationDetails;
};
