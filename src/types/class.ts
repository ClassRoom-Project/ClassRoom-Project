import { DateList } from './date';

//데이터 베이스 수정후 수정예정
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
  image: string;
  active: boolean;
  quantity: number;
  class_type: string;
  dates: [{ date_id: string; day: string; times: [{ time_id: string; times: string }] }];
}

/* 마이페이지(선생님) : 클래스 등록한 수강생 정보 */
export interface MyClassStudentInfoType {
  user_id: string;
  email: string;
  nickname: string;
  profile_image: string;
  reserve_quantity: number;
  reserve_price: number;
  reserve_id: string;
}

// 예약 페이지에서 클래스 정보를 보여주기 위한 타입
export type ReserveClassType = {
  classId: string;
  category: string;
  title: string;
  location: string;
  image: string;
  difficulty: string;
  classType: string;
  price: number;
  maxPeople: number;
  totalTime: number;
  dates: DateList[];
};

/* TODO: 예약 카운트 로직 구현 후 삭제 예정 */
// DB에 저장된 클래스 정보 타입
export type DBReserveClassType = {
  class_id: string;
  category: string;
  title: string;
  location: string;
  image: string;
  price: number;
  max_people: number;
  dates: [{ date_id: string; day: string; times: [{ time_id: string; times: string }] }];
};
