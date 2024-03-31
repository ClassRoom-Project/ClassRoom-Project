import { NewUserType } from '@/types/user';
import { create } from 'zustand';

const useNewUserStore = create<NewUserType>((set) => ({
  teacher: true,
  job: null,
  field: null,
  nickname: null,
  email: null,
  password: null,
  profile_image: null,
  setTeacher: (teacher: boolean) => set({ teacher }),
  setJob: (job: string) => set({ job }),
  setField: (field: string) => set({ field }),
  setNickname: (nickname: string) => set({ nickname }),
  setEmail: (email: string) => set({ email }),
  setPassword: (password: string) => set({ password }),
  setProfileImage: (profile_image: string) => set({ profile_image })
}));

export default useNewUserStore;
