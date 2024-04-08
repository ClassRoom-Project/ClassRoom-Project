import { DateList } from './date';

export interface ClassAllType {
  class_id: string;
  user_id: string;
  category: string;
  hashtag: string;
  title: string;
  description: string;
  max_people: number;
  min_people: number;
  location: string;
  price: number;
  date: string[];
  time: string[];
  quantity: number;
  detail_location: string;
  total_time: number;
  image: string[];
  class_type: string;
  difficulty: string;
  active: boolean;
  reserved_count: number;
  reserved_user_id: string[];
}

export interface ClassItem {
  class_id: string;
}

/* 마이페이지(선생님) : 내가 등록한 클래스 보기에서 필요한 데이터 타입 */
export interface MyRegisteredClassType {
  class_id: string;
  user_id: string;
  title: string;
  location: string;
  detail_location: string;
  image: string[];
  active: boolean;
  day: string;
  date_id: string;
  times: string;
}

// 예약 페이지에서 클래스 정보를 보여주기 위한 타입
export type ReserveClassType = {
  classId: string;
  category: string;
  title: string;
  location: string;
  price: number;
  image: string;
  maxPeople: number;
  dates: DateList[];
  reservedCount: number;
};

/* TODO: 예약 카운트 로직 구현 후 삭제 예정 */
// DB에 저장된 클래스 정보 타입
export type DBReserveClassType = {
  class_id: string;
  category: string;
  title: string;
  location: string;
  price: number;
  image: string;
  max_people: number;
  dates: [{ date_id: string; day: string; times: [{ time_id: string; times: string }] }];
  reserved_count: number;
};
