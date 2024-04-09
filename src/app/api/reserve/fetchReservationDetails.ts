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
        class_id, reserve_quantity, reserve_price, time_id, user_id,
        class(title, total_time, location),
        time (times, date!inner(day))
  `
    )
    .eq('reserve_id', reserveId)
    .single();

  console.log(data);

  if (error) {
    console.log('fetchReservationDetails error =>', error);
    return;
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
      classId: data.class.class_id
    },
    time: {
      date: { day: data.time.date.day },
      times: data.time.times,
      dateId: data.time.date_id,
      timeId: data.time.time_id
    }
  };

  return reservationDetails;
};
