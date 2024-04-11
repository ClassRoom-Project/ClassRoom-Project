import { CurrentReservedCountStoreType, ReserveStoreType } from '@/types/reserve';
import { create } from 'zustand';

export const defaultInitState = {
  classId: '',
  userId: '',
  reservePrice: 0,
  reserveQuantity: 0,
  reserveDate: '',
  reserveTime: '',
  timeId: ''
};

export const useReserveStore = create<ReserveStoreType>((set) => ({
  reserveInfo: defaultInitState,

  setReserveInfo: (updateInfo) => {
    console.log(defaultInitState);
    set((state) => ({
      reserveInfo: {
        ...state.reserveInfo,
        ...updateInfo
      }
    }));
  }
}));

export const useCurrentReservedCountStore = create<CurrentReservedCountStoreType>((set) => ({
  currentReservedCount: 0,
  setCurrentReservedCount: (currentReservedCount: number | null | undefined) => set({ currentReservedCount })
}));
