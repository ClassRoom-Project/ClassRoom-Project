import { supabase } from '../supabase/supabase';
import { ClassAllType, ClassItem } from '@/types/class';

//디테일 페이지 클래스 정보 api 함수
export const detailClassInfo = async (classId: string): Promise<ClassAllType | null> => {
  const { data: classInfos, error } = await supabase.from('class').select('*').eq('class_id', classId).single();

  if (error) {
    console.error('클래스 정보들 불러오기 오류 --> ', error);
    return null;
  }

  return classInfos;
};

//generateStaticParams 위한 class_id를 가져오는 함수

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
