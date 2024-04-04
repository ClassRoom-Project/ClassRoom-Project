export interface SessionUserType {
  user: {
    email: string;
    name: string | null;
    image: string | null;
  };
}

export interface CreateNewUserType {
  email: string;
  nickname: string | null;
  image: string | null;
}

//store
export interface NewUserType {
  isTeacher: boolean;
  job?: string | null;
  field?: string | null;
  setTeacher: (teacher: boolean) => void;
  setJob: (job: string) => void;
  setField: (field: string) => void;
}

//PickRole
export type RoleType = 'teacher' | 'student';
export type SocialType = 'google' | 'kakao' | 'naver';

//moreinfo

export interface MoreInfoType {
  isJob: string;
  setIsJob: (isJob: string) => void;
  isField: string;
  setIsField: (isField: string) => void;
}

export type JobType =
  | '요리사'
  | '강사'
  | '개발자'
  | '의사'
  | '디자이너'
  | '변호사'
  | '음악가'
  | '운동선수'
  | '예술가'
  | '비즈니스 전문가'
  | '기타';
export const JOBS: JobType[] = [
  '요리사',
  '강사',
  '개발자',
  '의사',
  '디자이너',
  '변호사',
  '음악가',
  '운동선수',
  '예술가',
  '비즈니스 전문가',
  '기타'
];

export type FieldType =
  | '요리/음식'
  | '교육'
  | 'IT/테크'
  | '의료/건강'
  | '디자인/예술'
  | '법률/변호'
  | '음악/연주'
  | '운동/스포츠'
  | '예술/창작'
  | '경영/컨설팅'
  | '기타';

export const FIELDS: FieldType[] = [
  '요리/음식',
  '교육',
  'IT/테크',
  '의료/건강',
  '디자인/예술',
  '법률/변호',
  '음악/연주',
  '운동/스포츠',
  '예술/창작',
  '경영/컨설팅',
  '기타'
];

//signup
export interface SignInType {
  name: string;
  value: string;
}
