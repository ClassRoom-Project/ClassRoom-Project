export interface UserType {
  user_id: string;
  email: string;
  nickname: string;
  password: string;
  teacher: boolean;
  job: string;
  field: string;
  profile_image: string;
  bank: string;
  account: string;
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
