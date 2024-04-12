import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabase';
import { DBReserveClassType, ReserveClassType } from '@/types/class';

// 예약페이지에서 클래스 정보 불러오는 api
export const newFetchReserveClassInfo = async (classId: string) => {
  const { data: classInfo, error }: PostgrestSingleResponse<ReserveClassType[]> = await supabase.rpc(
    'fetch_reserve_class_info',
    { _class_id: classId }
  );
  if (error) {
    console.error('newFetchReserveClassInfo 오류 =>', error);
    return;
  }

  return classInfo[0];
};

// /* TODO: 예약 카운트 로직 구현 후 삭제 예정 */
// export const fetchReserveClassInfo = async (classId: string) => {
//   const { data, error }: PostgrestSingleResponse<DBReserveClassType> = await supabase
//     .from('class')
//     .select(
//       `
//       class_id,
//       category,
//       title,
//       location,
//       price,
//       image,
//       max_people,
//       dates: date (
//         class_id,
//         date_id,
//         day,
//         times: time (time_id, times)
//       )
//     `
//     )
//     .eq('class_id', classId)
//     .single();

//   if (error) {
//     console.error('fetchReserveClassInfo 오류 => ', error);
//     return;
//   }

//   // 받아온 data를 카멜케이스로 변환
//   const classInfo = {
//     classId: data.class_id,
//     category: data.category,
//     title: data.title,
//     location: data.location,
//     price: data.price,
//     image: data.image,
//     maxPeople: data.max_people,
//     dates: data.dates
//   };

//   return classInfo;
// };

// /* TODO: 예약 카운트 로직 구현 후 삭제 예정 */
// // 예약 인원 수 불러오는 api
// export const fetchReservedCount = async (classId: string) => {
//   const { data: reservedCount, error }: PostgrestSingleResponse<{ reserved_count: number }> = await supabase
//     .from('class')
//     .select('reserved_count')
//     .eq('class_id', classId)
//     .single();

//   if (error) {
//     console.error('fetchReservedCount 오류 => ', error);
//     return;
//   }

//   return reservedCount.reserved_count;
// };
