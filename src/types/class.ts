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
  wish: { user_id: string }[];
  wishCount: { user_id: string }[];
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
  category: string;
  difficulty: string;
  total_time: bigint;
  dates: [{ date_id: string; day: string; times: [{ time_id: string; times: string }] }];
}

/* 마이페이지(선생님) : 클래스 등록한 수강생 정보 */
export interface MyClassStudentInfoType {
  user_id: string;
  email: string;
  nickname: string;
  profile_image: string;
  reserve_quantity: bigint;
  reserve_price: bigint;
  reserve_id: string;
}

/* 마이페이지(선생님) : 클래스 등록한 수강생 정보 페이지 -> 해당 클래스 날짜, 시간 등 클래스 정보 보여주기 */
export interface MyClassSingleInfoType {
  times: string;
  day: string;
  title: string;
  description: string;
  price: bigint;
  quantity: bigint;
  min_people: bigint;
  total_time: bigint;
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

// 마이페이지 클래시 위시리스트
export type MyWishClassType = {
  wish_id: string;
  class_id: string;
  user_id: string;
  title: string;
  category: string;
  location: string;
  detail_location: string;
  image: string[];
  quantity: bigint;
  class_type: string;
  difficulty: string;
};

//리스트 디테일 페이지 클래스정보
export interface ListDetailClassInfo {
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
  date: { day: string; date_id: string; class_id: string }[];
  time: string[];
  quantity: number;
  detail_location: string;
  total_time: number;
  image: string[];
  class_type: string;
  difficulty: string;
  active: boolean;
  reserved_count: number;
  wish: { user_id: string }[];
  date_id: string;
  day: string;
  users: {
    teacher_name: string;
    user_id: string;
  };
  reserve: { user_id: string }[];
}
