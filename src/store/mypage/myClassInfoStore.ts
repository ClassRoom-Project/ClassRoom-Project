import { MyRegisteredClassType } from '@/types/class';
import { create } from 'zustand';

interface ClassInfoState {
  myClassSingleInfo: MyRegisteredClassType | null;
  setMyClassSingleInfo: (myClassSingleInfo: MyRegisteredClassType) => void;
}

export const useMyClassInfoStore = create<ClassInfoState>((set) => ({
  myClassSingleInfo: null,
  setMyClassSingleInfo: (newInfo) => set({ myClassSingleInfo: newInfo })
}));
