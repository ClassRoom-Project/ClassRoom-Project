import { create } from 'zustand';
import { ClassAllType } from '@/types/class';

//class 정보들 각각 배열에 담는 로직임다
export type ClassStoreType = {
  classInfos: ClassAllType[];
  setClassInfos: (classInfos: ClassAllType[]) => void;
};
export const useClassInfoStore = create<ClassStoreType>((set) => ({
  classInfos: [],

  setClassInfos: (getclassInfos) => {
    set(() => ({
      classInfos: getclassInfos
    }));
  }
}));
