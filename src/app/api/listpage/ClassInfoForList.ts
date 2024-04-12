import { supabase } from '../supabase/supabase';
import { ClassAllType } from '@/types/class';
// 페이지 번호(page)와 각 페이지당 항목 수(limit)를 인자로 받아, 페이지네이션된 데이터와 다음 페이지 정보를 반환
export const getClassForList = async (page = 1, limit = 8) => {
  const PageNumber = (page - 1) * limit;
  const {
    data: classInfos,
    error,
    count
  } = await supabase
    .from('class')
    .select('*', { count: 'exact' })
    .range(PageNumber, PageNumber + limit - 1); // range란? (a,b) a번째부터 b번째까지의 데이터만 가져오는 메서드 ex 1페이지 0~9 2페이지 10~19

  if (error) {
    console.error('클래스 정보들 불러오기 오류 => ', error);
    throw new Error(error.message);
  }
  const totalCount = count ?? 0;
  const nextPage = PageNumber + limit < totalCount ? page + 1 : undefined;

  return { classInfos, nextPage }; // classinfo랑 다음페이지를 반환값으로 가져야 무한루프 넥스트페이지를 사용가능
};
