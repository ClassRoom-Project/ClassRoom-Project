// interface SignInType {
//   email: string;
//   password: string;
//   checkPassword: string;
// }

//teacher
export interface NewUserType {
  teacher: boolean;
  job?: string | null;
  field?: string | null;
  nickname?: string | null;
  email?: string | null;
  password?: string | null;
  profile_image?: string | null;
  setTeacher: (teacher: boolean) => void;
  setJob: (job: string) => void;
  setField: (field: string) => void;
  setNickname: (nickname: string) => void;
  setEmail: (job: string) => void;
  setPassword: (password: string) => void;
  setProfileImage: (profile_image: string) => void;
}

export interface SessionUserType {
  user: {
    email: string;
    name: string | null;
    image: string | null;
  };
}

//moreinfo

export interface MoreInfoType {
  isJob: string;
  setIsJob: (isJob: string) => void;
  isField: string;
  setIsField: (isField: string) => void;
}

export type JobType = '교사' | '요리사' | '개발자' | '운동선수' | '음악가' | '예술가' | '뷰티';
export const JOBS: JobType[] = ['교사', '요리사', '개발자', '운동선수', '음악가', '예술가', '뷰티'];

export type FieldType = '교육' | '요리' | 'IT' | '스포츠' | '피아니스트' | '공방' | '애견미용';
export const FIELDS: FieldType[] = ['교육', '요리', 'IT', '스포츠', '피아니스트', '공방', '애견미용'];

//signin
export interface SignInType {
  name: string;
  value: string;
}
export interface UserType {
  user_id: string;
  email: string;
  nickname: string;
  password: string;
  teacher: boolean;
  job: string;
  field: string;
  profile_image: string;
}

export interface UpdateUserInfoType {
  newNickname: string;
}

export interface UpdateTeacherInfoType {
  newSelectedJob: string;
  newSelectedField: string;
  selectedBank: string;
  account: string;
}

interface AdminType {
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}
