import { create } from 'zustand';

interface UserRoleState {
  isTeacher: boolean | null;
  setIsTeacher: (value: boolean) => void;
}

export const useUserRoleStore = create<UserRoleState>((set) => ({
  isTeacher: false,
  setIsTeacher: (value: boolean) => {
    set({ isTeacher: value });
  }
}));
