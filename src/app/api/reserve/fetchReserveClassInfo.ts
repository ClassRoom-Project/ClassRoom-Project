import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabase';
import { DBReserveClassType } from '@/types/class';

// 예약페이지에서 클래스 정보 불러오는 api
export const fetchReserveClassInfo = async (classId: string) => {
  const { data, error }: PostgrestSingleResponse<DBReserveClassType> = await supabase
    .from('class')
    .select(
      `
      class_id, 
      category, 
      title, 
      location, 
      price, 
      image, 
      max_people, 
      dates: date ( 
        class_id, 
        date_id, 
        day, 
        times: time (time_id, times)
      )
    `
    )
    .eq('class_id', classId)
    .single();

  if (error) {
    console.error('fetchReserveClassInfo 오류 => ', error);
    return;
  }

  // 받아온 data를 카멜케이스로 변환
  const classInfo = {
    classId: data.class_id,
    category: data.category,
    title: data.title,
    location: data.location,
    price: data.price,
    image: data.image,
    maxPeople: data.max_people,
    reservedCount: data.reserved_count,
    dates: data.dates
  };

  return classInfo;
};

// export const newFetch = async (classId: string) => {
//   const { data, error } = await supabase.rpc('get_reserve_class_info', { p_class_id: classId });

//   if (error) {
//     console.error('Error fetching class info', error);
//     return;
//   }

//   return data;
// };
export const newFetch = async (classId: string) => {
  const { data, error }: PostgrestSingleResponse<DBReserveClassType[]> = await supabase.rpc('get_class_info', {
    class_id: classId
  });

  if (error) {
    console.error('Error fetching class info', error);
    return;
  }

  const classInfo = {
    classId: data[0].class_id,
    category: data[0].category,
    title: data[0].title,
    location: data[0].location,
    price: data[0].price,
    image: data[0].image,
    maxPeople: data[0].max_people,
    reservedCount: data[0].reserved_count,
    dates: data[0].dates
  };

  console.log(classInfo);

  return classInfo;
};

// 예약 인원 수 불러오는 api
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
