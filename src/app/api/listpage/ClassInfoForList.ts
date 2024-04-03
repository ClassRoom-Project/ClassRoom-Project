import { supabase } from '../supabase/supabase';
import { ClassAllType } from '@/types/class';

// 페이지 번호(page)와 각 페이지당 항목 수(limit)를 인자로 받습니다.
export const getClassForList = async (
  page: number = 1,
  limit: number = 10
): Promise<{ classInfos: ClassAllType[]; nextPage?: number }> => {
  const startIndex = (page - 1) * limit;
  const {
    data: classInfos,
    error,
    count
  } = await supabase
    .from('class')
    .select('*', { count: 'exact' })
    .range(startIndex, startIndex + limit - 1);

  if (error) {
    console.error('클래스 정보들 불러오기 오류 => ', error);
    throw new Error(error.message);
  }

  // 다음 페이지가 있는지 확인하기 위해 총 항목 수를 사용합니다.
  const nextPage = count && startIndex + limit < count ? page + 1 : undefined;

  return { classInfos, nextPage };
};
