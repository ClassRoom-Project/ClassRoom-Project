import { supabase } from './supabase';

// async function fetchMyClasses(userId:string) {
//   const { data: reserves, error: reservesError } = await supabase
//     .from('reserve')
//     .select('reserved_at, reserve_date, class_id, reserve_id')
//     .eq('user_id', userId)

//   if (reservesError) {
//     console.error(reservesError)
//     return
//   }

//   const classes = [];

//   for (const reserve of reserves) {
//     const { data: classData, error: classError } = await supabase
//       .from('class')
//       .select('image, title')
//       .eq('class_id', reserve.class_id)
//       .limit(1); // 이미지는 0번째 값만 가져오도록 제한

//     if (classError) {
//       console.error(classError)
//       continue;
//     }

//     classes.push({
//       ...reserve,
//       ...classData[0]
//     });
//   }

//   return classes;
// }

export async function fetchMyClasses(userId:string) {
  const { data, error } = await supabase
    .rpc('fetch_my_reserved_classes_for_user', { p_user_id: userId }); // 파라미터 이름을 p_user_id로 변경

  if (error) {
    console.error(error);
    return [];
  }
  return data;
}

// 예약 취소 함수
export async function cancelReservation(reserve_id:string) {
  const { data, error } = await supabase
    .from('reserve')
    .delete()
    .match({ reserve_id: reserve_id });

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

export default fetchMyClasses;
