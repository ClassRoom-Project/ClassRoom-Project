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
};

const useReserveClass = create<ReserveStoreType>((set) => ({
  reserveInfo: defaultInitState,
  setClassId: (classId) => {
    set((state) => ({
      reserveInfo: { ...state.reserveInfo, classId: classId }
    }));
    console.log(classId);
  }
}));

export default useReserveClass;
