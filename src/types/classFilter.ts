//이렇게 타입을 지정해야 정확한 데이터를 받아올수있다 {} 이것만 쓰면 너무 포괄적이라 x
type PriceRange = {
  min?: number;
  max?: number;
};

export type ClassFiltersType = {
  selectedClassType?: string | null;
  selectedLocation?: string | null;
  selectedDifficulty?: string | null;
  selectedPrice?: PriceRange | null;
  selectedDayType?: string | null;
};
