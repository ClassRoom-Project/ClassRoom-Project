import { supabase } from '../supabase/supabase';
import { ClassAllType } from '@/types/class';
// 여러 클래스 정보를 불러오는 함수
//따로 만든 이유 -> single이 단일 정보만 불러오기 때문
export const getClassAllInfo = async (): Promise<ClassAllType[]> => {
  const { data: classInfos, error } = await supabase.from('class').select('*');

  if (error) {
    console.error('클래스 정보들 불러오기 오류 => ', error);
    return [];
  }

  return classInfos;
};
