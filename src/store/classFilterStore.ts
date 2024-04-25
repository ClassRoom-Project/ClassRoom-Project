import { create } from 'zustand';
import { ClassFiltersType } from '@/types/classFilter';
type CategoryFilterStore = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

export const useCategoryFilterStore = create<CategoryFilterStore>((set) => ({
  selectedCategory: '',
  setSelectedCategory: (category: string) => set(() => ({ selectedCategory: category }))
}));

type ListFilterStore = {
  ClassFilters: ClassFiltersType;
  setClassFilters: (filters: ClassFiltersType) => void;
};

export const useListFilterStore = create<ListFilterStore>((set) => ({
  ClassFilters: {
    selectedClassType: null,
    selectedLocation: null,
    selectedDifficulty: null,
    selectedPrice: null,
    selectedDayType: null
  },
  setClassFilters: (filters: {}) =>
    set(() => ({
      ClassFilters: filters
    }))
}));

type SearchTitle = {
  selectedTitle: string;
  setSelectedTitle: (title: string) => void;
};

export const useSearchStore = create<SearchTitle>((set) => ({
  selectedTitle: '',
  setSelectedTitle: (title: string) => set(() => ({ selectedTitle: title }))
}));

interface wishStoreType {
  isWishedClass: boolean;
  setIsWishedClass: (isWishedClass: boolean) => void;
}

export const useWishStore = create<wishStoreType>((set) => ({
  isWishedClass: false,
  setIsWishedClass: (isWishedClass: boolean) => set({ isWishedClass })
}));
