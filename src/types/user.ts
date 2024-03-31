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

export type UpdateUserInfoType = Pick<UserType, 'email' | 'nickname' | 'password'>;

interface AdminType {
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}
