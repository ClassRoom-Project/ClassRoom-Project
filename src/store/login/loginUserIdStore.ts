import { SetUserLoginIdType } from '@/types/authUser/authUserTypes';
import { create } from 'zustand';

export const useLoginStore = create<SetUserLoginIdType>((set) => ({
  loginUserId: '',
  setLoginUserId: (id: string) => set({ loginUserId: id })
}));
