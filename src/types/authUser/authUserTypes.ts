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

//signup
export interface SignInType {
  name: string;
  value: string;
}
