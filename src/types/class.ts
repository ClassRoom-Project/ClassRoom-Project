export interface ClassAllType {
  class_id: string;
  user_id: string;
  category: string;
  hashtag: string;
  title: string;
  description: string;
  max_ppl: number;
  min_ppl: number;
  location: string;
  price: number;
  date: string[];
  time: string[];
  quantity: number;
  detailLocation: string;
  total_time: number;
  image: string[];
  class_type: string;
  difficulty: string;
  active: boolean;
}

/* 마이페이지(선생님) : 내가 등록한 클래스 보기에서 필요한 데이터 타입 */
export type MyRegistedClassType = Pick<
  ClassAllType,
  'user_id' | 'class_id' | 'title' | 'location' | 'detailLocation' | 'date' | 'time' | 'image' | 'active'
>;

// 예약 페이지에서 클래스 정보를 보여주기 위한 타입
export type ReserveClassType = Pick<
  ClassAllType,
  'class_id' | 'category' | 'title' | 'location' | 'price' | 'image' | 'max_ppl'
>;
