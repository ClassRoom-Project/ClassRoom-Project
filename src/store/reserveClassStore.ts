import { ReserveInfo } from '@/types';
import { create } from 'zustand';

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
  setReserveInfo: ({}) => void;
};

const useReserveClass = create<ReserveStoreType>((set) => ({
  reserveInfo: defaultInitState,

  setReserveInfo: (updateInfo) => {
    set((state) => ({
      reserveInfo: {
        ...state.reserveInfo,
        ...updateInfo
      }
    }));
    console.log(updateInfo);
  }
}));

export default useReserveClass;
