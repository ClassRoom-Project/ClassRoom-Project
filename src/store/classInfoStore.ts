import { ClassAllType, ListDetailClassInfo } from '@/types/class';
import { create } from 'zustand';

//class 정보들 각각 배열에 담는 로직임다
export type LatestClassInfoType = {
  LatestClassInfos: ClassAllType[];
  setLatestClassInfos: (classInfos: ClassAllType[]) => void;
};
export type BestClassInfoType = {
  BestClassInfos: ClassAllType[];
  setBestClassInfos: (classInfos: ClassAllType[]) => void;
};

export type DetailClassStoreType = {
  classInfo: ListDetailClassInfo | null;
  setClassInfo: (classInfo: ListDetailClassInfo | null) => void;
};

export const useLatestClassInfoStore = create<LatestClassInfoType>((set) => ({
  LatestClassInfos: [],

  setLatestClassInfos: (getClassInfos) => {
    set(() => ({
      LatestClassInfos: getClassInfos
    }));
  }
}));

export const useBestClassInfoStore = create<BestClassInfoType>((set) => ({
  BestClassInfos: [],

  setBestClassInfos: (getClassInfos) => {
    set(() => ({
      BestClassInfos: getClassInfos
    }));
  }
}));

export const useDetailClassInfoStore = create<DetailClassStoreType>((set) => ({
  classInfo: null,
  setClassInfo: (classInfo) => {
    set(() => ({ classInfo }));
  }
}));
