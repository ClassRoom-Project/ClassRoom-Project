import { CurrentReservedCountStoreType, ReserveClassInfoStoreType, ReserveStoreType } from '@/types/reserve';
import { create } from 'zustand';

export const defaultInitState = {
  reserveId: '',
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
  setCurrentReservedCount: (currentReservedCount: number) => set({ currentReservedCount })
}));

export const useReserveClassStore = create<ReserveClassInfoStoreType>((set) => ({
  reserveClassInfo: {
    classId: '',
    category: '',
    title: '',
    location: '',
    image: '',
    difficulty: '',
    classType: '',
    price: 0,
    maxPeople: 0,
    totalTime: 0,
    dates: []
  },
  setReserveClassInfo: (reserveClassInfo) => {
    set(() => ({ reserveClassInfo }));
  }
}));
