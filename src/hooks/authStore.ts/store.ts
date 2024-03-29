import { create } from 'zustand';

const useAdminStore = create<AdminType>((set) => ({
  isAdmin: true,
  setIsAdmin: (isAdmin: boolean) => set({ isAdmin })
}));

export default useAdminStore;
