import { create } from 'zustand';

type CategoryFilterStore = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

export const useCategoryFilterStore = create<CategoryFilterStore>((set) => ({
  selectedCategory: '',
  setSelectedCategory: (category: string) => set(() => ({ selectedCategory: category }))
}));

//이렇게 타입을 지정해야 정확한 데이터를 받아올수있다 {} 이것만 쓰면 너무 포괄적이라 x
type ClassFiltersType = {
  selectedClassType?: string | null;
  selectedLocation?: string | null;
  selectedAMPM?: string | null;
  selectedDifficulty?: string | null;
  selectedPrice?: number | null;
};

type ListFilterStore = {
  ClassFilters: ClassFiltersType;
  setClassFilters: (filters: ClassFiltersType) => void;
};

export const useListFilterStore = create<ListFilterStore>((set) => ({
  ClassFilters: {
    selectedClassType: null,
    selectedLocation: null,
    selectedAMPM: null,
    selectedDifficulty: null,
    selectedPrice: null
  },
  setClassFilters: (filters: {}) =>
    set(() => ({
      ClassFilters: filters
    }))
}));
