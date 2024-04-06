import { create } from 'zustand';

interface UserRoleState {
  isTeacher: boolean;
  setIsTeacher: (value: boolean) => void;
}

export const useUserRoleStore = create<UserRoleState>((set) => ({
  // 새로고침 했을 때, 상태유지하기 : sessionStorage에 값을 넣어서 변하지않게 저장
  isTeacher: sessionStorage.getItem('isTeacher') === 'true',

  setIsTeacher: (value: boolean) => {
    set({ isTeacher: value });
    sessionStorage.setItem('isTeacher', value.toString());
  }
}));
