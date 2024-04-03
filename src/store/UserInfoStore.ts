import { UserInfoType } from '@/types/user';
import { create } from 'zustand';

interface UserState {
  userInfo: UserInfoType | null;
  setUserInfo: (userInfo: UserInfoType) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  userInfo: null,
  setUserInfo: (getUserInfo) => {
    set(() => ({ userInfo: getUserInfo }));
  }
}));
