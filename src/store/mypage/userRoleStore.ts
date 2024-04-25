import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserRoleState {
  isTeacher: boolean | null;
  setIsTeacher: (value: boolean) => void;
}

export const useUserRoleStore = create(
  persist<UserRoleState>(
    (set) => ({
      isTeacher: null,
      setIsTeacher: (value: boolean) => {
        set({ isTeacher: value });
      }
    }),
    {
      name: 'userRoleStorage'
    }
  )
);
