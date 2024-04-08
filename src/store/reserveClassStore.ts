import { ReserveStoreType, useCurrentReservedStoreType } from '@/types/reserve';
import { create } from 'zustand';

export const defaultInitState = {
  classId: '',
  userId: '',
  reservePrice: 0,
  reserveQuantity: 0,
  reserveDate: '',
  reserveTime: ''
};

export const useReserveStore = create<ReserveStoreType>((set) => ({
  reserveInfo: defaultInitState,

  setReserveInfo: (updateInfo) => {
    set((state) => ({
      reserveInfo: {
        ...state.reserveInfo,
        ...updateInfo
      }
    }));
  }
}));

export const useCurrentReservedStore = create<useCurrentReservedStoreType>((set) => ({
  currentReservedCount: 0,
  setCurrentReservedCount: (currentReservedCount: number | null | undefined) => set({ currentReservedCount })
}));
