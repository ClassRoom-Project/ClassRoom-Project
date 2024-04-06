export interface UserType {
  user_id: string;
  email: string;
  nickname: string;
  password: string;
  isTeacher: boolean;
  job: string;
  field: string;
  profile_image: string;
  bank: string;
  account: string;
}

// User 프로필 정보 type
export interface UserInfoType {
  email: string;
  nickname: string;
  password: string;
  profile_image: string;
}

// 수정된 닉네임 type
export interface UpdateUserInfoType {
  newNickname: string;
  newProfileImage: string;
}

// 수정된 선생님 정보 type
export interface UpdateTeacherInfoType {
  newSelectedJob: string;
  newSelectedField: string;
  selectedBank: string;
  account: string;
}

// 수정된 프로필 이미지 url type
export interface UpdateProfileImageType {
  updateProfileImage: string;
}

export interface DetailUserInfoType {
  user_id: string;
  email: string;
  nickname: string;
  profile_image: string;
}
