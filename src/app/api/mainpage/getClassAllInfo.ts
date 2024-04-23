import { supabase } from '../supabase/supabase';
import { ClassAllType } from '@/types/class';
// 최신순
export const getLatestClassInfo = async (): Promise<ClassAllType[]> => {
  const { data: classInfos, error } = await supabase.from('class').select('*').order('create_at', { ascending: false });

  if (error) {
    console.error('클래스 정보들 불러오기 오류 => ', error);
    return [];
  }

  return classInfos;
};

// 인기순
export const getBestClassInfo = async (): Promise<ClassAllType[]> => {
  const { data: classInfos, error } = await supabase
    .from('class')
    .select('*')
    .order('wish_count', { ascending: false });

  if (error) {
    console.error('클래스 정보들 불러오기 오류 => ', error);
    return [];
  }

  return classInfos;
};
