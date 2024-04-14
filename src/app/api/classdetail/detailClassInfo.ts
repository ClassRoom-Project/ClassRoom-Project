import { supabase } from '../supabase/supabase';
import { ClassAllType, ClassItem, ListDetailClassInfo } from '@/types/class';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

//디테일 페이지 클래스 정보 api 함수
export const detailClassInfo = async (classId: string) => {
  const { data, error }: PostgrestSingleResponse<ListDetailClassInfo> = await supabase
    .from('class')
    .select(
      ` class_id,user_id,category,hashtag,title,description,max_people,min_people,
        location,price,quantity,detail_location,total_time,image,class_type,difficulty,
        date (date_id,class_id,day)
      `
    )
    .eq('class_id', classId)
    .single();
  if (error) {
    console.error('Error fetching class details with dates', error);
    return null;
  }

  return data;
}; //generateStaticParams 위한 class_id를 가져오는 함수

export const detailClassIdOnly = async (): Promise<ClassItem[]> => {
  const { data, error } = await supabase.from('class').select('class_id');

  if (error) {
    console.log('클래스 아이디 가져오기 오류 -->', error);
    return [];
  }
  return data;
};
//데이터를 준비하는데 필요
export const detailClassIdAllData = async (): Promise<ClassAllType[]> => {
  const { data: classInfos, error } = await supabase.from('class').select('*').single();

  if (error) {
    console.error('클래스 정보들 불러오기 오류 --> ', error);
    return [];
  }

  return classInfos;
};
