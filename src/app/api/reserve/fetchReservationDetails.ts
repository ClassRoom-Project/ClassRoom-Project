import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabase';
import { DBReservationDetailsType } from '@/types/reserve';

// 예약 정보 조회 api
// reserve 테이블과 class 테이블을 class_id로 inner조인하고, class 테이블에서 title, total_time, location만 선택하여 결과에 포함
// time 테이블을 time_id로 조인
// time테이블에서 time_id가 일치하는 레코드의 date_id로 date 테이블 inner조인하고, date 테이블에서 day만 선택하여 결과에 포함
export const fetchReservationDetails = async (reserveId: string) => {
  const { data, error }: PostgrestSingleResponse<DBReservationDetailsType> = await supabase
    .from('reserve')
    .select(
      `
        reserve_quantity, reserve_price, user_id,
        class(title, total_time, location, class_type),
        time (times, date(day))
  `
    )
    .eq('reserve_id', '4392293f-15e7-471a-8096-1fcd475bbb97')
    .single();

  if (error) {
    console.log('fetchReservationDetails error =>', error);
    throw new Error('fetchReservationDetails error occurred');
  }

  const reservationDetails = {
    classId: data.class_id,
    reserveQuantity: data.reserve_quantity,
    reservePrice: data.reserve_price,
    timeId: data.time_id,
    userId: data.user_id,
    class: {
      title: data.class.title,
      totalTime: data.class.total_time,
      location: data.class.location,
      classType: data.class.class_type
    },
    time: {
      date: { day: data.time.date.day },
      times: data.time.times
    }
  };

  return reservationDetails;
};
