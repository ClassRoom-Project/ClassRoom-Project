// export interface LoginUserIdType {
//   loginUserId: string | null;
// }

export interface UserRoleType {
  isTeacher: boolean;
}

// User 프로필 정보 type
export interface UserInfoType {
  email: string;
  nickname: string;
  profile_image: string;
  userId: string;
}

// 선생님 정보 type
export interface TeacherInfoType {
  job: string;
  field: string;
  bank: string;
  account: string;
  teacher_name: string;
  teacher_number: string;
}

// 입력한 선생님 정보 type
export interface InsertTeacherInfo {
  selectedJob: string;
  selectedField: string;
  selectedBank: string;
  userAccount: string;
  teacherName: string;
  teacherNumber: string;
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
  newSelectedBank: string;
  newAccount: string;
  newTeacherName: string;
  newTeacherNumber: string;
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
