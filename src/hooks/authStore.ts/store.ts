import { create } from 'zustand';

const useTeacherStore = create<TeacherType>((set) => ({
  isTeacher: true,
  setIsTeacher: (isTeacher: boolean) => set({ isTeacher })
}));

export default useTeacherStore;
