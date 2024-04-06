import { ReserveInfo } from '@/types/reserve';
import { supabase } from '../supabase/supabase';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { format, formatDate, parseISO } from 'date-fns';

// 예약 정보 insert api
export const submitReservation = async (reserveInfo: ReserveInfo) => {
  const { classId, userId, reservePrice, reserveQuantity, reserveDate, reserveTime } = reserveInfo;
  const { data: reservationId, error }: PostgrestSingleResponse<{ reserve_id: string }> = await supabase
    .from('reserve')
    .insert([
      {
        user_id: userId,
        class_id: classId,
        reserve_price: reservePrice,
        reserve_quantity: reserveQuantity,
        reserve_date: reserveDate,
        reserve_time: reserveTime,
        reserved_at: new Date()
      }
    ])
    .select('reserve_id') // return값으로 reserve_id만선택
    .single();

  if (error) {
    console.log('예약정보 제출 오류 발생 =>', error);
    return;
  }

  return reservationId.reserve_id;
};

export const newSubmit = async (reserveInfo: ReserveInfo) => {
  console.log(reserveInfo);
  //date 테이블에서 클래스 아이디가일치하고 사용자가 입력한 날짜와 day가 일치하는 date_id 가져와
  const { data: date_id, error: error1 } = await supabase
    .from('date')
    .select('date_id')
    .eq('class_id', reserveInfo.classId)
    .eq('day', formatDate(reserveInfo.reserveDate, 'yyyy-MM-dd'))
    .single();

  if (error1) {
    console.log('date 테이블에서 클래스 아이디가일치하는 date_id 가져와 error', error1);
  }

  console.log(date_id);

  // time 테이블에서 date_id가 일치하는 레코드들 중에서 사용자가 입력한 시간과 times가 일치하는 time id 가져와
  const { data: time_id, error: error2 } = await supabase
    .from('time')
    .select('time_id')
    .eq('date_id', date_id?.date_id)
    .eq('times', `${reserveInfo.reserveTime}:00`)
    .single();

  if (error2) {
    console.log(
      'time 테이블에서 date_id가 일치하는 레코드들 중에서 사용자가 입력한 시간과 times가 일치하는 time id 가져와 error',
      error2
    );

    return;
  }

  console.log(time_id);

  // 그걸 reserve테이블에 time_id로 넣어
  const { classId, userId, reservePrice, reserveQuantity, reserveDate, reserveTime } = reserveInfo;
  const { data, error }: PostgrestSingleResponse<{ reserve_id: string }> = await supabase
    .from('reserve')
    .insert([
      {
        user_id: 'a2260a8a-a1d6-4e37-896c-c6e3c922caec',
        class_id: classId,
        reserve_price: reservePrice,
        reserve_quantity: reserveQuantity,
        reserve_date: reserveDate,
        reserve_time: reserveTime,
        reserved_at: new Date(),
        time_id: time_id?.time_id
      }
    ])
    .select('*') // return값으로 reserve_id만선택
    .single();

  if (error) {
    console.log('insert error', error);
  }

  console.log(data);

  return data?.reserve_id;

  // 그럼 time_id를 알면 date_id를 알수있다
};
