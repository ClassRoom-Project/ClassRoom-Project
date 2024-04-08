import { create } from 'zustand';

interface UserRoleState {
  isTeacher: boolean | null;
  setIsTeacher: (value: boolean) => void;
}

export const useUserRoleStore = create<UserRoleState>((set) => ({
  isTeacher: typeof window !== 'undefined' ? sessionStorage.getItem('isTeacher') === 'true' : null,

  setIsTeacher: (value: boolean) => {
    set({ isTeacher: value });
    // null 값이 아닐 때만 sessionStorage에 저장하도록 변경
    if (typeof window !== 'undefined' && value !== null) {
      sessionStorage.setItem('isTeacher', value.toString());
    }
  }
}));
