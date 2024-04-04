import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabase';
import { DBReserveClassType } from '@/types/class';
import { reservationDetailsType } from '@/types/reserve';

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
