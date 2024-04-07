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
  profile_image: ''
};

export const useUserStore = create<UserStateType>()((set) => ({
  userInfo: defaultInitState,
  setUserInfo: (userInfo) => {
    set(() => ({ userInfo }));
  }
}));
