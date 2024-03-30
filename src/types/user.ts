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

interface AdminType {
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}
