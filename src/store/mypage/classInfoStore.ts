import { MyRegisteredClassType } from '@/types/class';
import { create } from 'zustand';

interface ClassInfoState {
  myClassInfo: MyRegisteredClassType | null;
  setMyClassInfo: (classInfo: MyRegisteredClassType) => void;
}

export const useMyClassInfoStore = create<ClassInfoState>((set) => ({
  myClassInfo: null,
  setMyClassInfo: (myClassInfo) => set({ myClassInfo })
}));
