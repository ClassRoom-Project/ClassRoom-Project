import { create } from 'zustand';

export type ReserveInfo = {
  classId: string;
  userId: string;
  reservePrice: number;
  reserveQuantity: number;
  reserveDate: string;
  reserveTime: string;
};

export const defaultInitState: ReserveInfo = {
  classId: '',
  userId: '',
  reservePrice: 0,
  reserveQuantity: 0,
  reserveDate: '',
  reserveTime: ''
};

export type ReserveStoreType = {
  reserveInfo: ReserveInfo;
  setClassId: (classId: string) => void;
  setDateAndTime: (date: string, time: string) => void;
  setPrice: (price: number) => void;
};

const useReserveClass = create<ReserveStoreType>((set) => ({
  reserveInfo: defaultInitState,
  setClassId: (classId) => {
    set((state) => ({
      reserveInfo: { ...state.reserveInfo, classId: classId }
    }));
    console.log(classId);
  },
  setDateAndTime: (date, time) => {
    set((state) => ({
      reserveInfo: { ...state.reserveInfo, date: date, time: time }
    }));
    console.log(date, time);
  },
  setPrice: (totalPrice) => {
    set((state) => ({
      reserveInfo: { ...state.reserveInfo, reservePrice: totalPrice }
    }));
    console.log(totalPrice);
  }
}));

export default useReserveClass;
