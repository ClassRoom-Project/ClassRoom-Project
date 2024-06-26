import { supabase } from '../supabase/supabase';

type PriceRange = {
  min?: number;
  max?: number;
};
// 페이지 번호(page)와 각 페이지당 항목 수(limit)를 인자로 받아, 페이지네이션된 데이터와 다음 페이지 정보를 반환
export const getClassForList = async (
  page = 1,
  limit = 10,
  selectedCategory = '',
  filters: {
    selectedClassType?: string | null;
    selectedLocation?: string | null;
    selectedDifficulty?: string | null;
    selectedPrice?: PriceRange | null;
    selectedDayType?: string | null;
  },
  //null 값을 지정해줘야 없을때는 필터링을 안한다
  searchQuery: string | null = ''
) => {
  const PageNumber = (page - 1) * limit;

  //필터링하기위해 query를 let으로 바꿔 유연하게 데이터를 필터링할수있도록 지정
  let query = supabase
    .from('class_with_days')
    .select(`*, wish(user_id)`, { count: 'exact' })
    .range(PageNumber, PageNumber + limit - 1); // range란? (a,b) a번째부터 b번째까지의 데이터만 가져오는 메서드 ex 1페이지 0~9 2페이지 10~19

  //검색기능
  if (searchQuery) {
    query = query.like('title', `%${searchQuery}%`);
  }

  if (selectedCategory) {
    query = query.eq('category', selectedCategory);
  }
  if (filters.selectedClassType) {
    query = query.eq('class_type', filters.selectedClassType);
  }

  if (filters.selectedLocation) {
    query = query.textSearch('location', filters.selectedLocation);
  }
  if (filters.selectedDifficulty) {
    query = query.eq('difficulty', filters.selectedDifficulty);
  }
  if (filters.selectedPrice) {
    if (filters.selectedPrice.min !== undefined && filters.selectedPrice.max !== undefined) {
      query = query.gte('price', filters.selectedPrice.min).lte('price', filters.selectedPrice.max);
    }
  }

  if (filters.selectedDayType) {
    const dayArray = filters.selectedDayType === '주말' ? [0, 6] : [1, 2, 3, 4, 5];
    query = query.overlaps('days_of_week', dayArray); // overlaps: 두 배열이 하나 이상의 공통 요소를 가지고 있을 때 true를 반환
  }

  // if (userId) {
  //   query = query.filter('wish.user_id', 'eq', `${userId}`); // wish테이블에서 user_id가 같은 행을 filter해서 클래스 데이터에 추가
  // }

  const { data: classInfos, error, count } = await query;
  if (error) {
    console.error('클래스 정보들 불러오기 오류 => ', error);
    throw new Error(error.message);
  }
  const totalCount = count ?? 0;
  const nextPage = PageNumber + limit < totalCount ? page + 1 : undefined;

  return { classInfos, nextPage }; // classinfo랑 다음페이지를 반환값으로 가져야 무한루프 넥스트페이지를 사용가능
};
