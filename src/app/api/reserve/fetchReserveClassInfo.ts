import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabase';
import { DBReserveClassType } from '@/types/class';

// 예약페이지 클래스 정보 불러오는 api
export const fetchReserveClassInfo = async (classId: string) => {
  const { data, error }: PostgrestSingleResponse<DBReserveClassType> = await supabase
    .from('class')
    .select('class_id, category, title, location, price, image, max_people, date, time, reserved_count')
    .eq('class_id', classId)
    .single();

  // TODO: return된 data를 카멜케이스로 변환
  if (error) {
    console.error('fetchReserveClassInfo 오류 => ', error);
    return;
  }

  const classInfo = {
    classId: data?.class_id,
    category: data?.category,
    title: data?.title,
    location: data?.location,
    price: data?.price,
    image: data?.image,
    maxPeople: data?.max_people,
    date: data?.date,
    time: data?.time,
    reservedCount: data?.reserved_count
  };

  return classInfo;
};

export const fetchReservedCount = async (classId: string) => {
  const { data: reservedCount, error }: PostgrestSingleResponse<{ reserved_count: number }> = await supabase
    .from('class')
    .select('reserved_count')
    .eq('class_id', classId)
    .single();

  if (error) {
    console.error('fetchReservedCount 오류 => ', error);
    return;
  }

  return reservedCount.reserved_count;
};

// 예약 정보 불러오는 api
// reserve 테이블에서 class_id를 기준으로 class 테이블을 join하여 클래스 title을 가져옴
export const fetchReservationDetails = async (reserveId: string) => {
  const { data, error } = await supabase
    .from('reserve')
    .select(
      `
  class_id,  reserve_date, reserve_time, reserve_quantity, reserve_price,  
  class ( class_id, title )
`
    )
    .eq('reserve_id', reserveId);

  if (error) {
    console.log('join error =>', error);
  }

  return data;
};
