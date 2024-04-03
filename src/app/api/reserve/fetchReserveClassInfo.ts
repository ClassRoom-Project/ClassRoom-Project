import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabase';
import { ReserveClassType } from '@/types/class';
import next from 'next';

// 예약페이지 클래스 정보 불러오는 api
export const fetchReserveClassInfo = async (classId: string) => {
  const { data: classInfo, error }: PostgrestSingleResponse<ReserveClassType> = await supabase
    .from('class')
    .select('class_id, category, title, location, price, image, max_people, date, time, reserved_count')
    .eq('class_id', classId)
    .single();

  // TODO: return된 data를 카멜케이스로 변환

  if (error) {
    console.error('클래스 정보 불러오기 오류 => ', error);
    return;
  }

  return classInfo;
};

export const fetchReservedCount = async (classId: string) => {
  const { data: reservedCount, error }: PostgrestSingleResponse<{ reserved_count: number }> = await supabase
    .from('class')
    .select('reserved_count')
    .eq('class_id', classId)
    .neq('class_id', crypto.randomUUID())
    .single();

  if (error) {
    console.error('fetchReservedCount error => ', error);
    return;
  }

  return reservedCount.reserved_count;
};

// export const fetchReservedCount2 = async (classId: string) => {
//   const response = await fetch(
//     `https://hdurwturhsczrdeugmon.supabase.co/rest/v1/class?select=reserved_count&class_id=eq.${classId}`,
//     {
//       cache: 'no-cache',
//       headers: {
//         'Content-Type': 'application/json'
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//       }
//     }
//   );

//   console.log('--------------------', response, '--------------------');

//   return response;
// };
