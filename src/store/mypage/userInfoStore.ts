import { UserInfoType } from '@/types/user';
import { create } from 'zustand';

interface UserStateType {
  userInfo: UserInfoType;
  setUserInfo: (userInfo: UserInfoType) => void;
}

export const defaultInitState: UserInfoType = {
  userId: '',
  nickname: '',
  email: '',
  profile_image: '',
  isTeacher: false
};

export const userInfoStore = create<UserStateType>()((set) => ({
  userInfo: defaultInitState,
  setUserInfo: (userInfo) => {
    set(() => ({ userInfo }));
  }
}));
